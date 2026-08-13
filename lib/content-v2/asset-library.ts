/**
 * HISVIA Asset Library V2 — Unified Consumer API
 *
 * THE ONLY entry point for image asset resolution.
 * All pages MUST use this API. Direct JSON reads or path lookups are forbidden.
 *
 * Usage:
 *   import { getAssetForSlot, getAssetsForSection, getPageAssets, queryAssets } from "@/lib/content-v2/asset-library";
 */

import libraryData from "@/assets/asset-library-v2.json";
import type {
  AssetEntry,
  AssetLibrary,
  AssetQuery,
  SlotRequest,
  SlotResult,
  SlotRule,
  SectionMapping,
  RejectedCandidate,
  SlotDebugInfo,
} from "./types";

// ============================================================
// Singleton — load once
// ============================================================

const LIBRARY: AssetLibrary = libraryData as unknown as AssetLibrary;

const assetById = new Map<string, AssetEntry>();
const assetByAlias = new Map<string, string>(); // alias → canonical_id
const assetsBySection = new Map<string, AssetEntry[]>();
const assetsByPage = new Map<string, AssetEntry[]>();
const slotRuleByKey = new Map<string, SlotRule>(); // "page:slot" → rule

(function init() {
  for (const asset of LIBRARY.assets) {
    assetById.set(asset.asset_id, asset);
    if (asset.aliases) {
      for (const alias of asset.aliases) {
        assetByAlias.set(alias, asset.asset_id);
      }
    }
    // Index by allowed_sections
    if (asset.allowed_sections) {
      for (const sec of asset.allowed_sections) {
        const list = assetsBySection.get(sec) || [];
        list.push(asset);
        assetsBySection.set(sec, list);
      }
    }
    // Index by recommended_pages
    if (asset.recommended_pages) {
      for (const page of asset.recommended_pages) {
        const list = assetsByPage.get(page) || [];
        list.push(asset);
        assetsByPage.set(page, list);
      }
    }
  }
  for (const rule of LIBRARY.slot_rules) {
    const key = `${rule.page}:${rule.slot}`;
    slotRuleByKey.set(key, rule);
  }
})();

// ============================================================
// Public: resolve asset by ID or alias
// ============================================================

export function resolveAsset(idOrAlias: string): AssetEntry | null {
  const direct = assetById.get(idOrAlias);
  if (direct) return direct;
  const canonicalId = assetByAlias.get(idOrAlias);
  if (canonicalId) return assetById.get(canonicalId) || null;
  return null;
}

export function resolveAlias(imgId: string): string | null {
  return assetByAlias.get(imgId) || null;
}

// ============================================================
// SCORING ENGINE
// ============================================================

interface ScoredAsset {
  asset: AssetEntry;
  score: number;
  breakdown: {
    slot_match: number;
    role_match: number;
    quality_bonus: number;
    priority_bonus: number;
    hero_bonus: number;
    total: number;
  };
}

function scoreAsset(
  asset: AssetEntry,
  slot: string,
  page: string,
  _preferredRoles: VisualRoleSet
): ScoredAsset {
  const config = getSlotConfig(page, slot);
  const preferredRoles = config.preferred_roles;
  let slotMatch = 0;
  let roleMatch = 0;
  let qualityBonus = 0;
  let priorityBonus = 0;
  let heroBonus = 0;

  // 1. Slot match (config-driven weight) — resolve section compatibility
  const slotMax = config.slot_match_weight;
  const slotMid = Math.floor(slotMax * 0.6);
  const slotMin = Math.floor(slotMax * 0.25);

  // Check: direct match, suffix match (e.g. hero matches hero_support), page match
  const allowed = asset.allowed_sections || [];
  const isDirectMatch = allowed.includes(slot);
  const isSuffixMatch = allowed.some(s => s.startsWith(slot + "_") || s.endsWith("_" + slot));
  const isPageRec = asset.recommended_pages?.includes(page);
  const isForbidden = asset.forbidden_sections?.includes(slot);

  if (isDirectMatch || isSuffixMatch) {
    slotMatch = slotMax;
  } else if (isPageRec) {
    slotMatch = slotMid;
  } else if (!isForbidden) {
    slotMatch = slotMin;
  }

  // 2. Visual role match (config-driven weight)
  if (preferredRoles.has(asset.visual_role)) {
    roleMatch = config.role_match_weight;
  } else if (asset.derived_roles?.some((r: string) => preferredRoles.has(r))) {
    // derived_roles match (e.g. hero_candidate matching preferred role)
    roleMatch = Math.floor(config.role_match_weight * 0.8);
  }

  // 3. Quality bonus (config-driven weight)
  const qs = asset.quality_score || 0;
  const qualMax = config.quality_weight;
  if (qs >= 80) qualityBonus = qualMax;
  else if (qs >= 60) qualityBonus = Math.floor(qualMax * 0.7);
  else if (qs >= 40) qualityBonus = Math.floor(qualMax * 0.35);

  // 4. Priority bonus (config-driven weight)
  const pri = asset.priority || 0;
  const priMax = config.priority_weight;
  if (pri >= 4) priorityBonus = priMax;
  else if (pri >= 3) priorityBonus = Math.floor(priMax * 0.7);
  else if (pri >= 2) priorityBonus = Math.floor(priMax * 0.4);

  // 5. Hero suitability bonus (config-driven weight)
  const hs = asset.hero_suitability || 0;
  const heroMax = config.hero_suitability_weight;
  if (hs >= 80) heroBonus = heroMax;
  else if (hs >= 60) heroBonus = Math.floor(heroMax * 0.6);
  else if (hs >= 40) heroBonus = Math.floor(heroMax * 0.2);

  // 6. Brand penalty: deprioritize brand-logo/brand-machine images for hero/trust slots
  let brandPenalty = 0;
  const hasBrandLabel = !!asset.brand;
  const isBrandImage = asset.asset_type === "brand_machine" || !!(asset.path && asset.path.includes("/_brand/"));
  const isBrandMachinePath = !!(asset.path && (asset.path.includes("brand-machine") || asset.path.includes("/_final/")));
  if (isBrandImage || (hasBrandLabel && isBrandMachinePath)) {
    if (slot === "hero") brandPenalty = -Math.floor(slotMax * 0.55);
    else if (slot === "factory.trust" || slot === "trust_section") brandPenalty = -Math.floor(slotMax * 0.35);
  }

  const total = Math.max(0, slotMatch + roleMatch + qualityBonus + priorityBonus + heroBonus + brandPenalty);

  return {
    asset,
    score: total,
    breakdown: { slot_match: slotMatch, role_match: roleMatch, quality_bonus: qualityBonus, priority_bonus: priorityBonus, hero_bonus: heroBonus, total },
  };
}

// ============================================================
// SLOT → ROLE mapping
// ============================================================

type VisualRoleSet = Set<string>;

// ============================================================
// SLOT-SPECIFIC SCORING CONFIG
// ============================================================

interface SlotScoringConfig {
  preferred_roles: VisualRoleSet;
  required_derived_roles: string[];
  min_quality: number | null;        // null = no minimum
  min_hero_suitability: number | null;
  slot_match_weight: number;         // 0-40
  role_match_weight: number;         // 0-30
  quality_weight: number;            // 0-20
  hero_suitability_weight: number;   // 0-15
  priority_weight: number;           // 0-10
}

const SLOT_SCORING: Record<string, SlotScoringConfig> = {
  // Hero: strict quality gate, heavy hero_suitability weight
  "homepage.hero": {
    preferred_roles: new Set(["hero_main", "hero_support", "trust_evidence", "factory_proof", "manufacturing_strength"]),
    required_derived_roles: ["hero_candidate"],
    min_quality: 70,
    min_hero_suitability: 50,
    slot_match_weight: 30,
    role_match_weight: 20,
    quality_weight: 20,
    hero_suitability_weight: 20,
    priority_weight: 10,
  },
  // Solution banner: system showcase, moderate hero weight
  "solution.banner": {
    preferred_roles: new Set(["system_showcase", "solution_application"]),
    required_derived_roles: ["banner_candidate"],
    min_quality: 50,
    min_hero_suitability: 30,
    slot_match_weight: 25,
    role_match_weight: 25,
    quality_weight: 20,
    hero_suitability_weight: 15,
    priority_weight: 15,
  },
  // Factory trust: trust evidence, factory proof
  "factory.trust": {
    preferred_roles: new Set(["trust_evidence", "factory_proof", "manufacturing_strength"]),
    required_derived_roles: [],
    min_quality: 40,
    min_hero_suitability: null,
    slot_match_weight: 35,
    role_match_weight: 30,
    quality_weight: 15,
    hero_suitability_weight: 5,
    priority_weight: 15,
  },
};

// Generic fallback slot config
const DEFAULT_SLOT: SlotScoringConfig = {
  preferred_roles: new Set(["system_showcase", "trust_evidence"]),
  required_derived_roles: [],
  min_quality: null,
  min_hero_suitability: null,
  slot_match_weight: 40,
  role_match_weight: 30,
  quality_weight: 15,
  priority_weight: 10,
  hero_suitability_weight: 5,
};

function getSlotConfig(page: string, slot: string): SlotScoringConfig {
  const key = `${page}.${slot}`;
  return SLOT_SCORING[key] || DEFAULT_SLOT;
}

// Legacy — keep for backward compat
const SLOT_ROLE_PREFERENCE: Record<string, VisualRoleSet> = {
  hero: new Set(["hero_main", "hero_support"]),
  hero_support: new Set(["hero_support", "hero_main"]),
  solution_cards: new Set(["system_showcase", "solution_application"]),
  system_section: new Set(["system_showcase", "technical_detail"]),
  factory_gallery: new Set(["factory_proof", "trust_evidence", "manufacturing_strength"]),
  trust_section: new Set(["trust_evidence", "customer_trust", "factory_proof"]),
  manufacturing: new Set(["manufacturing_strength", "factory_proof"]),
  brand_section: new Set(["brand_partner", "system_showcase"]),
  technical: new Set(["technical_detail"]),
  partner: new Set(["brand_partner", "trust_evidence"]),
  oem: new Set(["manufacturing_strength", "factory_proof"]),
  capability: new Set(["manufacturing_strength", "factory_proof", "solution_application"]),
};

function getPreferredRoles(slot: string): VisualRoleSet {
  return SLOT_ROLE_PREFERENCE[slot] || new Set(["system_showcase", "trust_evidence"]);
}

// ============================================================
// API 1: getAssetForSlot
// ============================================================

export function getAssetForSlot(request: SlotRequest): SlotResult {
  const { page, slot, purpose, excludeIds = [], count = 1, debug = false } = request;
  const excludeSet = new Set(excludeIds);

  // Find matching slot rule
  const ruleKey = `${page}:${slot}`;
  const rule = slotRuleByKey.get(ruleKey);

  // Collect candidates: all assets not forbidden for this slot
  const slotConfig = getSlotConfig(page, slot);
  const candidates: AssetEntry[] = [];
  for (const asset of LIBRARY.assets) {
    if (excludeSet.has(asset.asset_id)) continue;

    // Check forbidden sections
    if (asset.forbidden_sections?.includes(slot)) continue;

    // Check derived_roles requirement for hero slots
    if (slotConfig.required_derived_roles.length > 0) {
      const hasRole = slotConfig.required_derived_roles.some(r => asset.derived_roles?.includes(r));
      if (!hasRole) continue;
    }

    // Quality gate
    if (slotConfig.min_quality != null && (asset.quality_score || 0) < slotConfig.min_quality) continue;

    // If slot rule has forbidden types, check those
    if (rule?.forbidden_visual_types?.length) {
      if (rule.forbidden_visual_types.includes(asset.asset_type)) continue;
    }

    candidates.push(asset);
  }

  if (candidates.length === 0) {
    return { status: "empty", asset: null, score: 0, candidates: [] };
  }

  // Score and sort
  const preferredRoles = slotConfig.preferred_roles;
  const scored = candidates
    .map(a => scoreAsset(a, slot, page, preferredRoles))
    .sort((a, b) => b.score - a.score);

  const selected = scored.slice(0, count);
  const rejected: RejectedCandidate[] = debug
    ? scored.slice(count).map(s => ({
        asset_id: s.asset.asset_id,
        filename: s.asset.filename,
        reason: `score=${s.score} (slot=${s.breakdown.slot_match} role=${s.breakdown.role_match} qual=${s.breakdown.quality_bonus} pri=${s.breakdown.priority_bonus})`,
        score: s.score,
      }))
    : [];

  const best = selected[0];

  const debugInfo: SlotDebugInfo | undefined = debug && best
    ? {
        total_candidates: candidates.length,
        rejected: rejected.slice(0, 20),
        scoring: best.breakdown,
      }
    : undefined;

  return {
    status: best ? "found" : "empty",
    asset: best?.asset || null,
    score: best?.score || 0,
    candidates: selected.map(s => s.asset),
    debug: debugInfo,
  };
}

// ============================================================
// API 2: getAssetsForSection
// ============================================================

export function getAssetsForSection(section: string, limit?: number): AssetEntry[] {
  const sectionMapping = LIBRARY.section_map.find(m => m.section === section);

  // Priority: section_map assets first, then allowed_sections match
  const result: AssetEntry[] = [];
  const seen = new Set<string>();

  if (sectionMapping) {
    for (const sm of sectionMapping.assets) {
      if (!sm.asset_id) continue;
      const asset = resolveAsset(sm.asset_id);
      if (asset && !seen.has(asset.asset_id)) {
        seen.add(asset.asset_id);
        result.push(asset);
      }
    }
  }

  // Supplement with assets that have this section in allowed_sections
  const bySection = assetsBySection.get(section) || [];
  for (const asset of bySection) {
    if (!seen.has(asset.asset_id)) {
      seen.add(asset.asset_id);
      result.push(asset);
    }
  }

  return limit ? result.slice(0, limit) : result;
}

// ============================================================
// API 3: getPageAssets
// ============================================================

export function getPageAssets(page: string): Record<string, AssetEntry[]> {
  const result: Record<string, AssetEntry[]> = {};

  // Find all slot rules for this page
  for (const rule of LIBRARY.slot_rules) {
    if (rule.page === page || rule.page.startsWith(page)) {
      const slotResult = getAssetForSlot({ page, slot: rule.slot });
      if (slotResult.asset) {
        result[rule.slot] = slotResult.candidates.slice(0, 4);
      }
    }
  }

  // If no slot rules, use recommended_pages index
  if (Object.keys(result).length === 0) {
    const byPage = assetsByPage.get(page) || [];
    if (byPage.length > 0) {
      result["default"] = byPage.slice(0, 8);
    }
  }

  return result;
}

// ============================================================
// API 4: queryAssets
// ============================================================

export function queryAssets(query: AssetQuery): AssetEntry[] {
  let results = [...LIBRARY.assets];

  // --- Filters ---
  if (query.asset_type) {
    const types = Array.isArray(query.asset_type) ? query.asset_type : [query.asset_type];
    results = results.filter(a => types.includes(a.asset_type));
  }

  if (query.visual_role) {
    const roles = Array.isArray(query.visual_role) ? query.visual_role : [query.visual_role];
    results = results.filter(a => roles.includes(a.visual_role));
  }

  if (query.brand) {
    results = results.filter(a => a.brand === query.brand);
  }

  if (query.system_type) {
    results = results.filter(a => a.system_type === query.system_type);
  }

  if (query.category) {
    results = results.filter(a => a.category === query.category);
  }

  if (query.min_quality != null) {
    results = results.filter(a => (a.quality_score || 0) >= query.min_quality!);
  }

  if (query.min_hero_suitability != null) {
    results = results.filter(a => (a.hero_suitability || 0) >= query.min_hero_suitability!);
  }

  if (query.transparent_background === true) {
    results = results.filter(a => a.is_transparent === true);
  }

  if (query.has_cutout === true) {
    results = results.filter(a => a.has_cutout === true);
  }

  if (query.allowed_section) {
    results = results.filter(a => a.allowed_sections?.includes(query.allowed_section!));
  }

  if (query.forbidden_section) {
    results = results.filter(a => !a.forbidden_sections?.includes(query.forbidden_section!));
  }

  if (query.recommended_page) {
    results = results.filter(a => a.recommended_pages?.includes(query.recommended_page!));
  }

  if (query.composition) {
    const comps = Array.isArray(query.composition) ? query.composition : [query.composition];
    results = results.filter(a => comps.includes(a.composition!));
  }

  if (query.excludeIds) {
    const excludeSet = new Set(query.excludeIds);
    results = results.filter(a => !excludeSet.has(a.asset_id));
  }

  // --- Sort ---
  const sortBy = query.sort_by || "quality_score";
  results.sort((a, b) => {
    switch (sortBy) {
      case "quality_score":
        return (b.quality_score || 0) - (a.quality_score || 0);
      case "hero_suitability":
        return (b.hero_suitability || 0) - (a.hero_suitability || 0);
      case "priority":
        return (b.priority || 0) - (a.priority || 0);
      case "slot_match":
        // Sort by number of allowed_sections (broader usability = higher)
        return (b.allowed_sections?.length || 0) - (a.allowed_sections?.length || 0);
      default:
        return 0;
    }
  });

  // --- Limit ---
  if (query.limit) {
    results = results.slice(0, query.limit);
  }

  return results;
}

// ============================================================
// Convenience: get all assets
// ============================================================

export function getAllAssets(): AssetEntry[] {
  return LIBRARY.assets;
}

export function getAssetCount(): number {
  return LIBRARY.total_assets;
}

export function getSlotRules(): SlotRule[] {
  return LIBRARY.slot_rules;
}

export function getSectionMappings(): SectionMapping[] {
  return LIBRARY.section_map;
}
