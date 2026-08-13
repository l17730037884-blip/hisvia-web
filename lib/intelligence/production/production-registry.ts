/**
 * HISVIA Production Registry — Phase 15
 * READ-ONLY bridge from assets-v2.json to production query format.
 *
 * Source: data/asset-pipeline/cutout-library/assets-v2.json (755 assets)
 * Augmented with: intelligence-registry/asset-intelligence.json (49 classified assets)
 * NEVER writes back.
 */

import assetsRaw from "@/data/asset-pipeline/cutout-library/assets-v2.json";
import intelligenceRaw from "@/data/asset-pipeline/intelligence-registry/asset-intelligence.json";

// ============================================================
// Production Asset Type
// ============================================================

export interface ProductionAsset {
  id: string;
  original_filename: string;
  image: string;
  cutout: string | null;
  system_type: string;
  category: string;
  subcategory: string;
  brand: string;
  application: string[];
  procurement: {
    buyer_need: string;
    purchase_keywords: string[];
    replacement_scenarios: string[];
  };
  supplier_relation: {
    supplier_type: string;
    manufacturing_capability: string[];
    industry_scope: string[];
  };
  seo: {
    seo_topic: string;
    buyer_search_terms: string[];
  };
  confidence: number;
  status: string;
  asset_type: string;
}

// ============================================================
// Build intelligence lookup (49 classified assets → system_type)
// ============================================================

const intelMap = new Map<string, Record<string, unknown>>();
for (const entry of intelligenceRaw as Record<string, unknown>[]) {
  const aid = entry.asset_id as string;
  if (aid) intelMap.set(aid, entry);
}

// ============================================================
// Internal: parse raw asset-v2 record → ProductionAsset
// ============================================================

function parseAsset(raw: Record<string, unknown>): ProductionAsset {
  const im = (raw.industrial_metadata as Record<string, unknown>) || {};
  const ci = (raw.cutout_info as Record<string, unknown>) || {};
  const seoRaw = (raw.seo_metadata as Record<string, unknown>) || {};
  const assetId = (raw.id as string) || "";

  // Augment with intelligence registry data if available
  const intel = intelMap.get(assetId);
  const ic = (intel?.industrial_classification as Record<string, unknown>) || {};
  const si = (intel?.supply_intelligence as Record<string, unknown>) || {};
  const sc = (intel?.supplier_capability as Record<string, unknown>) || {};
  const seoIntel = (intel?.seo as Record<string, unknown>) || {};

  // Prefer intelligence registry classification, fallback to assets-v2 metadata
  const systemType =
    (ic.system_type as string) ||
    (im.system_type as string) ||
    "";

  const category =
    (ic.category as string) ||
    (im.category as string) ||
    (raw.category as string) ||
    "";

  return {
    id: assetId,
    original_filename: (raw.original_filename as string) || "",
    image: (raw.path as string) || "",
    cutout: (ci.path as string) || null,
    system_type: systemType,
    category: category,
    subcategory: (ic.subcategory as string) || (im.subcategory as string) || "",
    brand: (ic.brand as string) || (im.brand as string) || (raw.brand as string) || "",
    application: (si.replacement_scenarios as string[])
      || (raw.recommended_usage as string[])
      || [],
    procurement: {
      buyer_need: (si.buyer_need as string) || "",
      purchase_keywords: (si.purchase_keywords as string[]) || [],
      replacement_scenarios: (si.replacement_scenarios as string[]) || [],
    },
    supplier_relation: {
      supplier_type: (sc.supplier_type as string) || "",
      manufacturing_capability: (sc.manufacturing_capability as string[]) || [],
      industry_scope: (sc.industry_scope as string[]) || [],
    },
    seo: {
      seo_topic: (seoIntel.seo_topic as string) || (seoRaw.seo_topic as string) || "",
      buyer_search_terms: (seoIntel.buyer_search_terms as string[])
        || (seoRaw.buyer_search_terms as string[])
        || [],
    },
    confidence: (ic.confidence as number) || (raw.confidence as number) || (im.confidence as number) || 0,
    status: (raw.status as string) || (raw.asset_status as string) || "",
    asset_type: (ic.asset_type as string) || (raw.asset_type as string) || "",
  };
}

// ============================================================
// In-memory index
// ============================================================

const assetList = (assetsRaw as Record<string, unknown>[]).map(parseAsset);

// Indexes
const byId = new Map<string, ProductionAsset>();
const bySystem = new Map<string, ProductionAsset[]>();
const byCategory = new Map<string, ProductionAsset[]>();
const byBrand = new Map<string, ProductionAsset[]>();

for (const a of assetList) {
  byId.set(a.id, a);

  const sys = a.system_type || "uncategorized";
  if (!bySystem.has(sys)) bySystem.set(sys, []);
  bySystem.get(sys)!.push(a);

  const cat = a.category || "uncategorized";
  if (!byCategory.has(cat)) byCategory.set(cat, []);
  byCategory.get(cat)!.push(a);

  const brd = a.brand || "unknown";
  if (!byBrand.has(brd)) byBrand.set(brd, []);
  byBrand.get(brd)!.push(a);
}

// ============================================================
// Public Query API (READ-ONLY)
// ============================================================

export function getAssetById(id: string): ProductionAsset | undefined {
  return byId.get(id);
}

export function getAssetsBySystem(systemType: string): ProductionAsset[] {
  return bySystem.get(systemType) || [];
}

export function getAssetsByCategory(category: string): ProductionAsset[] {
  return byCategory.get(category) || [];
}

export function getAssetsByBrand(brand: string): ProductionAsset[] {
  return byBrand.get(brand) || [];
}

export function getAllAssets(): ProductionAsset[] {
  return [...assetList];
}

export function getAssetCount(): number {
  return assetList.length;
}

export function getSystemTypes(): string[] {
  const types = [...bySystem.keys()].filter(
    (k) => k !== "uncategorized" && k !== ""
  );
  // Ensure the 8 canonical system types are always present
  const canonical = [
    "Air Compressor Systems",
    "Hydraulic Systems",
    "Pneumatic Automation",
    "Industrial Filtration",
    "Pumps & Fluid Handling",
    "Valves & Flow Control",
    "Mechanical Transmission",
    "Industrial Automation & Control",
  ];
  for (const c of canonical) {
    if (!types.includes(c)) types.push(c);
  }
  return types;
}

export function getSystemCount(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const sys of getSystemTypes()) {
    const assets = bySystem.get(sys);
    counts[sys] = assets ? assets.length : 0;
  }
  return counts;
}

export function getCategoryCount(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [cat, assets] of byCategory) {
    if (cat && cat !== "uncategorized") {
      counts[cat] = assets.length;
    }
  }
  return counts;
}

export function getBrandCount(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [brd, assets] of byBrand) {
    if (brd && brd !== "unknown") {
      counts[brd] = assets.length;
    }
  }
  return counts;
}

export function getAssetsWithCutout(): ProductionAsset[] {
  return assetList.filter((a) => a.cutout !== null && a.cutout !== "");
}

export function searchAssets(query: string): ProductionAsset[] {
  const q = query.toLowerCase();
  return assetList.filter(
    (a) =>
      a.original_filename.toLowerCase().includes(q) ||
      a.system_type.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.brand.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q)
  );
}

export function getProcurementAssets(): ProductionAsset[] {
  return assetList.filter(
    (a) =>
      a.system_type !== "" &&
      a.category !== "" &&
      a.asset_type !== "factory" &&
      a.asset_type !== "scene"
  );
}

export function getSystemPageData(systemType: string): {
  system: string;
  assetCount: number;
  assets: ProductionAsset[];
  brands: string[];
  categories: string[];
} {
  const assets = getAssetsBySystem(systemType);
  // Also include uncategorized assets that might match by category/brand
  const brands = [...new Set(assets.map((a) => a.brand).filter(Boolean))];
  const categories = [...new Set(assets.map((a) => a.category).filter(Boolean))];

  return {
    system: systemType,
    assetCount: assets.length,
    assets,
    brands,
    categories,
  };
}

export function getRegistrySummary(): {
  totalAssets: number;
  systemCount: number;
  categoryCount: number;
  brandCount: number;
  assetsWithCutout: number;
  assetsClassified: number;
  assetsUnclassified: number;
} {
  const classified = assetList.filter(
    (a) => a.system_type !== "" && a.system_type !== "uncategorized"
  ).length;
  return {
    totalAssets: assetList.length,
    systemCount: getSystemTypes().length,
    categoryCount: Object.keys(getCategoryCount()).length,
    brandCount: Object.keys(getBrandCount()).length,
    assetsWithCutout: getAssetsWithCutout().length,
    assetsClassified: classified,
    assetsUnclassified: assetList.length - classified,
  };
}
