/**
 * HISVIA Asset Intelligence Registry Loader
 * Reads asset-intelligence.json and provides typed query functions.
 *
 * Data source: data/asset-pipeline/intelligence-registry/asset-intelligence.json
 */

import registryData from "@/data/asset-pipeline/intelligence-registry/asset-intelligence.json";
import type {
  AssetIntelligence,
  SystemType,
  PlacementRole,
} from "./types";

// ============================================================
// Internal index
// ============================================================

const registry = registryData as AssetIntelligence[];

const byId = new Map<string, AssetIntelligence>();
const bySystem = new Map<SystemType, AssetIntelligence[]>();
const factoryAssets: AssetIntelligence[] = [];
const unclassifiedAssets: AssetIntelligence[] = [];

for (const asset of registry) {
  byId.set(asset.asset_id, asset);

  const st = asset.industrial_classification.system_type;
  if (st) {
    const list = bySystem.get(st) || [];
    list.push(asset);
    bySystem.set(st, list);
  } else if (asset.industrial_classification.asset_type === "factory") {
    factoryAssets.push(asset);
  } else {
    unclassifiedAssets.push(asset);
  }
}

// ============================================================
// Public API
// ============================================================

/** Get total number of assets in registry */
export function getAssetCount(): number {
  return registry.length;
}

/** Get all system types that have assets */
export function getAvailableSystems(): SystemType[] {
  return Array.from(bySystem.keys());
}

/** Get a single asset by ID */
export function getAssetById(assetId: string): AssetIntelligence | undefined {
  return byId.get(assetId);
}

/** Get all assets for a given system type */
export function getAssetsBySystem(systemType: SystemType): AssetIntelligence[] {
  return bySystem.get(systemType) || [];
}

/** Get assets by category within a system */
export function getAssetsByCategory(
  systemType: SystemType,
  category: string
): AssetIntelligence[] {
  const assets = bySystem.get(systemType) || [];
  return assets.filter(
    (a) => a.industrial_classification.category === category
  );
}

/** Get all assets with a specific confidence level */
export function getAssetsByConfidence(
  level: AssetIntelligence["status"]["confidence_level"]
): AssetIntelligence[] {
  return registry.filter((a) => a.status.confidence_level === level);
}

/** Get all factory scene assets */
export function getFactoryAssets(): AssetIntelligence[] {
  return factoryAssets;
}

/** Get all unclassified assets (not factory, not system-assigned) */
export function getUnclassifiedAssets(): AssetIntelligence[] {
  return unclassifiedAssets;
}

/** Get hero assets for a system (first 2, prefer branded) */
export function getHeroAssets(systemType: SystemType): AssetIntelligence[] {
  const assets = bySystem.get(systemType) || [];
  const branded = assets.filter((a) => a.industrial_classification.brand);
  const unbranded = assets.filter((a) => !a.industrial_classification.brand);
  return [...branded, ...unbranded].slice(0, 2);
}

/** Get assets by placement role */
export function getAssetsByPlacement(
  role: PlacementRole,
  systemType?: SystemType
): AssetIntelligence[] {
  // Placement logic mirrors Phase 6 asset-placement.json
  if (role === "factory_trust") return factoryAssets;
  if (role === "needs_review") return unclassifiedAssets;

  if (!systemType) {
    // Return all assets for this role across systems
    const results: AssetIntelligence[] = [];
    for (const [st, assets] of bySystem) {
      if (role === "hero") {
        results.push(...getHeroAssets(st));
      } else if (role === "system_section") {
        results.push(...assets.slice(0, 4));
      } else {
        results.push(...assets);
      }
    }
    return results;
  }

  const assets = bySystem.get(systemType) || [];
  if (role === "hero") return getHeroAssets(systemType);
  if (role === "system_section") return assets.slice(0, 4);
  return assets;
}

/** Check if registry loaded successfully */
export function isRegistryLoaded(): boolean {
  return registry.length > 0;
}

/** Get all matching asset IDs cross-referenced against the registry */
export function validateAssetIds(ids: string[]): {
  found: string[];
  missing: string[];
} {
  const found: string[] = [];
  const missing: string[] = [];
  for (const id of ids) {
    if (byId.has(id)) {
      found.push(id);
    } else {
      missing.push(id);
    }
  }
  return { found, missing };
}

/** Get registry statistics */
export function getRegistryStats() {
  const systems = getAvailableSystems();
  return {
    total: registry.length,
    classified: registry.filter((a) => a.industrial_classification.system_type).length,
    factory: factoryAssets.length,
    unclassified: unclassifiedAssets.length,
    systems: systems.length,
    systemDistribution: Object.fromEntries(
      systems.map((s) => [s, (bySystem.get(s) || []).length])
    ),
    confidenceDistribution: {
      HIGH: registry.filter((a) => a.status.confidence_level === "HIGH").length,
      MEDIUM: registry.filter((a) => a.status.confidence_level === "MEDIUM").length,
      LOW: registry.filter((a) => a.status.confidence_level === "LOW").length,
    },
  };
}

// Re-export types for convenience
export type { AssetIntelligence, SystemType, PlacementRole };
