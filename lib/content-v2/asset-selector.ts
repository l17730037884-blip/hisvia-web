/**
 * HISVIA Asset Selector V2 — Deterministic, curated asset selection.
 *
 * THE replacement for Math.random / performance.now() / fixed-seed strategies.
 *
 * Principles (per MASTER DIRECTIVE):
 *   - Asset library is the single source of truth.
 *   - Selection is DETERMINISTIC: same (section, seed) → same assets, every render.
 *     Different sections use different seeds, so a page never repeats an image.
 *   - Selection is CURATED by metadata (asset_type, visual_role, system_type,
 *     category, brand, allowed_sections, quality_score, hero_suitability).
 *   - No Math.random, no Date.now(), no performance.now() anywhere in this file.
 *
 * Usage:
 *   import {
 *     getHeroCutouts, selectForSection, selectBySystem, selectByBrand,
 *     selectByFamily, selectCapabilityEvidence, selectForIndustry,
 *     getBrandGroups, getIndustrialSystems, getProductFamilies,
 *   } from "@/lib/content-v2/asset-selector";
 */

import { getAllAssets, resolveAsset } from "./asset-library";
import type { AssetEntry, AssetType, VisualRole } from "./types";

// ============================================================
// Deterministic seed + pick
// ============================================================

/** FNV-1a hash → uint32. Stable across runs and JS engines for the same input. */
export function hashSeed(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 PRNG seeded by a uint32 — deterministic sequence. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface PickOptions<T = AssetEntry> {
  /** Number of assets to return. */
  count: number;
  /** Stable seed string (e.g. "homepage:hero", "mining:equipment"). */
  seed: string;
  /** If set, picked assets will have distinct values for this key (best effort). */
  distinctBy?: (a: T) => string | undefined;
  /** Asset ids to exclude (already used elsewhere on the page). */
  excludeIds?: string[];
}

/**
 * Deterministically pick `count` items from `items`.
 * Selection is stable: same (items, count, seed) → same result.
 */
export function pickDeterministic<T extends { asset_id?: string }>(
  items: T[],
  opts: PickOptions<T>
): T[] {
  if (items.length === 0) return [];
  const n = Math.min(opts.count, items.length);
  const rng = mulberry32(hashSeed(opts.seed));
  const exclude = new Set(opts.excludeIds ?? []);

  // Pool of indices not yet excluded
  const pool: number[] = [];
  for (let i = 0; i < items.length; i++) {
    const id = items[i].asset_id;
    if (id && exclude.has(id)) continue;
    pool.push(i);
  }
  if (pool.length === 0) return [];

  const picked: T[] = [];
  const usedDistinct = new Set<string>();
  const usedIdx = new Set<number>();

  // Seed-derived start offset: different seeds begin walking the (quality-sorted)
  // pool from different positions, so different seeds yield different — but still
  // quality-respecting and deterministic — selections.
  const startOffset = pool.length > 0 ? Math.floor(rng() * pool.length) : 0;

  // Pass 1: honor distinctBy — walk from startOffset (wrapping), collect distinct
  if (opts.distinctBy) {
    for (let step = 0; step < pool.length && picked.length < n; step++) {
      const idx = pool[(startOffset + step) % pool.length];
      if (usedIdx.has(idx)) continue;
      const item = items[idx];
      const key = opts.distinctBy(item);
      if (key && usedDistinct.has(key)) continue;
      picked.push(item);
      usedIdx.add(idx);
      if (key) usedDistinct.add(key);
    }
  }

  // Pass 2: fill remaining slots with deterministic random draw
  while (picked.length < n && pool.length > usedIdx.size) {
    const remaining = pool.filter((i) => !usedIdx.has(i));
    if (remaining.length === 0) break;
    const r = rng();
    const pick = remaining[Math.floor(r * remaining.length)];
    picked.push(items[pick]);
    usedIdx.add(pick);
    const dk = opts.distinctBy?.(items[pick]);
    if (dk) usedDistinct.add(dk);
  }

  return picked;
}

// ============================================================
// Asset URL resolution — prefer transparent cutout when present
// ============================================================

export function assetImageUrl(asset: AssetEntry | null): string | null {
  if (!asset) return null;
  if (asset.cutout_path) return asset.cutout_path;
  return asset.path;
}

// ============================================================
// Filters (curated by metadata)
// ============================================================

export interface AssetFilter {
  asset_type?: AssetType | AssetType[];
  visual_role?: VisualRole | VisualRole[];
  brand?: string;
  system_type?: string;
  category?: string;
  is_transparent?: boolean;
  has_cutout?: boolean;
  allowed_section?: string;
  forbidden_section?: string;
  recommended_page?: string;
  min_quality?: number;
  min_hero_suitability?: number;
  // keep only "part-like" assets (component parts / brand components), not whole machines
  partsOnly?: boolean;
  // exclude whole-machine / brand-machine visuals
  excludeMachines?: boolean;
}

/** Normalize brand name (case-insensitive dedupe). */
export function normalizeBrand(brand: string | null | undefined): string | null {
  if (!brand) return null;
  const b = brand.trim();
  if (!b) return null;
  return b.charAt(0).toUpperCase() + b.slice(1);
}

function matchesFilter(asset: AssetEntry, f: AssetFilter): boolean {
  if (f.asset_type) {
    const t = Array.isArray(f.asset_type) ? f.asset_type : [f.asset_type];
    if (!t.includes(asset.asset_type)) return false;
  }
  if (f.visual_role) {
    const r = Array.isArray(f.visual_role) ? f.visual_role : [f.visual_role];
    if (!r.includes(asset.visual_role)) return false;
  }
  if (f.brand) {
    const want = f.brand.toLowerCase();
    if ((asset.brand || "").toLowerCase() !== want) return false;
  }
  if (f.system_type && asset.system_type !== f.system_type) return false;
  if (f.category && asset.category !== f.category) return false;
  if (f.is_transparent === true && asset.is_transparent !== true) return false;
  if (f.has_cutout === true && asset.has_cutout !== true) return false;
  if (f.allowed_section && !asset.allowed_sections?.includes(f.allowed_section)) return false;
  if (f.forbidden_section && asset.forbidden_sections?.includes(f.forbidden_section)) return false;
  if (f.recommended_page && !asset.recommended_pages?.includes(f.recommended_page)) return false;
  if (f.min_quality != null && (asset.quality_score || 0) < f.min_quality) return false;
  if (f.min_hero_suitability != null && (asset.hero_suitability || 0) < f.min_hero_suitability) return false;

  if (f.partsOnly) {
    if (asset.asset_type !== "component_part" && asset.asset_type !== "brand_component") return false;
  }
  if (f.excludeMachines) {
    if (asset.asset_type === "brand_machine" || asset.asset_type === "equipment_machine") return false;
  }
  return true;
}

export function queryCurated(filter: AssetFilter, sort: "quality" | "hero" | "priority" = "quality"): AssetEntry[] {
  const all = getAllAssets();
  const out = all.filter((a) => matchesFilter(a, filter));
  out.sort((a, b) => {
    if (sort === "hero") return (b.hero_suitability || 0) - (a.hero_suitability || 0);
    if (sort === "priority") return (b.priority || 0) - (a.priority || 0);
    return (b.quality_score || 0) - (a.quality_score || 0);
  });
  return out;
}

// ============================================================
// HERO — transparent cutout accessories, deterministic + diverse
// ============================================================

/**
 * Real quality signal for cutouts.
 * NOTE: quality_score / hero_suitability are mostly unpopulated in the library,
 * so we derive a signal from dimensions + file size. Assets with known
 * dimensions rank above those without; among known dims, larger area × filesize wins.
 */
export function heroSignal(a: AssetEntry): number {
  const w = a.width || 0;
  const h = a.height || 0;
  const fsz = a.file_size_kb || 0;
  if (w && h) {
    // known dimensions: area × filesize (strongest signal)
    return 1_000_000 + w * h * Math.max(1, Math.log10(fsz || 1));
  }
  // unknown dimensions: rank by filesize only (penalized)
  return Math.max(0, fsz);
}

export interface HeroCutoutOptions {
  count?: number;
  seed?: string;
  excludeIds?: string[];
  /** Restrict to these product family categories (e.g. ["valve","pump"]). */
  families?: string[];
  /** Minimum file size in KB (default 80 — drops tiny/low-res cutouts). */
  minFileSizeKb?: number;
}

/**
 * Deterministic, high-quality transparent PNG cutouts for the hero.
 * Diversified across product families so the hero shows a real cross-section
 * of the catalog (not 3 valves, not the same image twice).
 *
 * Selection criteria (grounded in real asset metadata):
 *   - has_cutout === true and cutout_path present (is_transparent is unreliable)
 *   - asset_type === component_part (NO whole machines / brand machines)
 *   - file_size_kb >= minFileSizeKb (drops low-res cutouts)
 *   - ranked by heroSignal (dimensions × filesize), then picked deterministically
 */
export function getHeroCutouts(opts: HeroCutoutOptions = {}): AssetEntry[] {
  const {
    count = 5,
    seed = "homepage:hero",
    excludeIds = [],
    families,
    minFileSizeKb = 80,
  } = opts;

  let pool = getAllAssets().filter(
    (a) =>
      a.has_cutout === true &&
      !!a.cutout_path &&
      a.asset_type === "component_part" &&
      (a.file_size_kb || 0) >= minFileSizeKb
  );

  if (families && families.length > 0) {
    const want = new Set(families);
    pool = pool.filter((a) => a.category && want.has(a.category));
  }

  pool.sort((a, b) => heroSignal(b) - heroSignal(a));

  // Premium tier: keep only the strongest candidates so seed-based rotation
  // never drops into low-quality territory. Tier size grows with requested
  // count but is capped to the available pool.
  const tierSize = Math.min(pool.length, Math.max(count * 4, 20));
  const tier = pool.slice(0, tierSize);

  return pickDeterministic(tier, {
    count,
    seed,
    excludeIds,
    distinctBy: (a) => a.category || a.asset_id,
  });
}

// ============================================================
// SECTION — deterministic curated picks for a page section
// ============================================================

export interface SectionPickOptions {
  section: string;
  /** Stable seed (e.g. "solutions:compressor:architecture"). */
  seed: string;
  count?: number;
  excludeIds?: string[];
  filter?: AssetFilter;
}

export function selectForSection(opts: SectionPickOptions): AssetEntry[] {
  const { section, seed, count = 3, excludeIds, filter } = opts;
  const f: AssetFilter = { allowed_section: section, ...(filter || {}) };
  let pool = queryCurated(f, "quality");
  if (pool.length === 0) {
    // Fallback: drop section constraint, keep other filters
    const { allowed_section: _drop, ...rest } = f;
    pool = queryCurated(rest, "quality");
  }
  return pickDeterministic(pool, { count, seed, excludeIds, distinctBy: (a) => a.asset_id });
}

// ============================================================
// SYSTEM — assets for an industrial system page
// ============================================================

export function selectBySystem(
  systemType: string,
  opts: { seed: string; count?: number; excludeIds?: string[]; partsOnly?: boolean }
): AssetEntry[] {
  const pool = queryCurated(
    { system_type: systemType, partsOnly: opts.partsOnly },
    "quality"
  );
  return pickDeterministic(pool, {
    count: opts.count ?? 4,
    seed: opts.seed,
    excludeIds: opts.excludeIds,
    distinctBy: (a) => a.category || a.asset_id,
  });
}

// ============================================================
// BRAND — assets for a brand page (normalized, case-insensitive)
// ============================================================

export function selectByBrand(
  brand: string,
  opts: { seed: string; count?: number; excludeIds?: string[] }
): AssetEntry[] {
  const pool = queryCurated({ brand }, "quality");
  return pickDeterministic(pool, {
    count: opts.count ?? 4,
    seed: opts.seed,
    excludeIds: opts.excludeIds,
    distinctBy: (a) => a.asset_id,
  });
}

// ============================================================
// PRODUCT FAMILY — assets for a family (compressor, pump, valve, …)
// ============================================================

export function selectByFamily(
  category: string,
  opts: { seed: string; count?: number; excludeIds?: string[]; partsOnly?: boolean }
): AssetEntry[] {
  const pool = queryCurated({ category, partsOnly: opts.partsOnly }, "quality");
  return pickDeterministic(pool, {
    count: opts.count ?? 4,
    seed: opts.seed,
    excludeIds: opts.excludeIds,
    distinctBy: (a) => a.asset_id,
  });
}

// ============================================================
// CAPABILITY — manufacturing capability evidence (factory / process / inspection)
// ============================================================

export function selectCapabilityEvidence(
  opts: { seed: string; count?: number; excludeIds?: string[] }
): AssetEntry[] {
  const pool = queryCurated(
    {
      asset_type: ["factory_interior", "factory_exterior", "production_line", "worker_operation", "laboratory"],
      visual_role: ["trust_evidence", "factory_proof", "manufacturing_strength"],
    },
    "quality"
  );
  return pickDeterministic(pool, {
    count: opts.count ?? 4,
    seed: opts.seed,
    excludeIds: opts.excludeIds,
    distinctBy: (a) => a.asset_type,
  });
}

// ============================================================
// INDUSTRY — map an industry to systems/keywords (no industry field in assets)
// ============================================================

const INDUSTRY_SYSTEM_MAP: Record<string, string[]> = {
  mining: ["Hydraulic Systems", "Mechanical Transmission", "Pumps & Fluid Handling", "Industrial Filtration"],
  "oil-gas": ["Pumps & Fluid Handling", "Valves & Flow Control", "Air Compressor Systems"],
  manufacturing: ["Air Compressor Systems", "Automation Systems", "Mechanical Transmission"],
  construction: ["Hydraulic Systems", "Pumps & Fluid Handling", "Mechanical Transmission"],
  "water-treatment": ["Pumps & Fluid Handling", "Industrial Filtration", "Valves & Flow Control"],
};

export function selectForIndustry(
  industryId: string,
  opts: { seed: string; count?: number; excludeIds?: string[] }
): AssetEntry[] {
  const systems = INDUSTRY_SYSTEM_MAP[industryId] || [];
  const pool = systems.length
    ? getAllAssets().filter((a) => a.system_type && systems.includes(a.system_type))
    : getAllAssets();
  pool.sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0));
  return pickDeterministic(pool, {
    count: opts.count ?? 5,
    seed: opts.seed,
    excludeIds: opts.excludeIds,
    distinctBy: (a) => a.system_type || a.asset_id,
  });
}

// ============================================================
// TAXONOMY — derived maps for navigation & discovery
// ============================================================

export interface BrandGroup {
  domain: string;        // "Compressor Brands"
  system: string;        // associated industrial system
  brands: { name: string; count: number }[];
}

const SYSTEM_DOMAIN_LABEL: Record<string, string> = {
  "Air Compressor Systems": "Compressor Brands",
  "Hydraulic Systems": "Hydraulic Brands",
  "Pumps & Fluid Handling": "Pump Brands",
  "Automation Systems": "Automation Brands",
  "Valves & Flow Control": "Valve Brands",
  "Industrial Filtration": "Filtration Brands",
  "Mechanical Transmission": "Transmission Brands",
  "Manufacturing Capability": "Manufacturing Partners",
};

/** Brand groups derived from real assets, case-insensitive dedup. */
export function getBrandGroups(): BrandGroup[] {
  const all = getAllAssets();
  // bySystem: system -> (lowerKey -> {display, count})
  const bySystem = new Map<string, Map<string, { display: string; count: number }>>();
  for (const a of all) {
    if (!a.brand || !a.system_type) continue;
    const sys = a.system_type;
    if (!bySystem.has(sys)) bySystem.set(sys, new Map());
    const key = a.brand.toLowerCase();
    const display = normalizeBrand(a.brand) || a.brand;
    const existing = bySystem.get(sys)!.get(key);
    if (existing) {
      existing.count++;
      // Prefer the display form with more uppercase letters (preserves "KUKA", "Atlas Copco")
      const upperDisplay = (display.match(/[A-Z]/g) || []).length;
      const upperExisting = (existing.display.match(/[A-Z]/g) || []).length;
      if (upperDisplay > upperExisting) existing.display = display;
    } else {
      bySystem.get(sys)!.set(key, { display, count: 1 });
    }
  }
  const groups: BrandGroup[] = [];
  for (const [sys, brandMap] of bySystem) {
    const brands = [...brandMap.values()]
      .map(({ display, count }) => ({ name: display, count }))
      .sort((a, b) => b.count - a.count);
    groups.push({
      domain: SYSTEM_DOMAIN_LABEL[sys] || `${sys} Brands`,
      system: sys,
      brands,
    });
  }
  return groups.sort((a, b) => b.brands.length - a.brands.length);
}

export interface IndustrialSystemSummary {
  system: string;
  count: number;
  brandCount: number;
}

/** Industrial systems present in the asset library (excluding capability-only). */
export function getIndustrialSystems(): IndustrialSystemSummary[] {
  const all = getAllAssets();
  const map = new Map<string, { count: number; brands: Set<string> }>();
  for (const a of all) {
    if (!a.system_type || a.system_type === "Unclassified") continue;
    if (!map.has(a.system_type)) map.set(a.system_type, { count: 0, brands: new Set() });
    const e = map.get(a.system_type)!;
    e.count++;
    if (a.brand) e.brands.add(normalizeBrand(a.brand)!);
  }
  return [...map.entries()]
    .map(([system, e]) => ({ system, count: e.count, brandCount: e.brands.size }))
    .sort((a, b) => b.count - a.count);
}

export interface ProductFamilySummary {
  family: string;
  count: number;
  cutoutCount: number;
}

/** Product families (categories) with transparent-cutout availability. */
export function getProductFamilies(): ProductFamilySummary[] {
  const all = getAllAssets();
  const map = new Map<string, { count: number; cutout: number }>();
  for (const a of all) {
    if (!a.category || a.category === "factory") continue;
    if (!map.has(a.category)) map.set(a.category, { count: 0, cutout: 0 });
    const e = map.get(a.category)!;
    e.count++;
    if (a.has_cutout) e.cutout++;
  }
  return [...map.entries()]
    .map(([family, e]) => ({ family, count: e.count, cutoutCount: e.cutout }))
    .sort((a, b) => b.count - a.count);
}

// ============================================================
// Resolve helpers
// ============================================================

export function resolveAssetImage(idOrAlias: string): { asset: AssetEntry | null; url: string | null } {
  const asset = resolveAsset(idOrAlias);
  return { asset, url: assetImageUrl(asset) };
}

export function resolveMany(ids: string[]): AssetEntry[] {
  return ids
    .map((id) => resolveAsset(id))
    .filter((a): a is AssetEntry => !!a);
}
