/**
 * HISVIA V2 Asset Resolver — Phase 19
 * Resolves asset_id → real image path for V2 components.
 */

import assetsRaw from "@/data/asset-pipeline/cutout-library/assets-v2.json";
import { getAssetPlacement, getAssetsBySystem, getAssetsByPage } from "./content-loader";
import type { AssetPlacement } from "./content-loader";

// ============================================================
// Internal asset lookup
// ============================================================

const assetMap = new Map<string, { path: string; cutout: string | null; filename: string }>();

for (const a of assetsRaw as Record<string, unknown>[]) {
  const id = a.id as string;
  const ci = a.cutout_info as Record<string, unknown> | undefined;
  assetMap.set(id, {
    path: (a.path as string) || "",
    cutout: (ci?.path as string) || null,
    filename: (a.original_filename as string) || "",
  });
}

// ============================================================
// Resolved asset type
// ============================================================

export interface ResolvedAsset {
  asset_id: string;
  image_url: string;
  cutout_url: string | null;
  filename: string;
  placement: AssetPlacement | null;
  exists: boolean;
}

// ============================================================
// Public API
// ============================================================

export function resolveAsset(assetId: string): ResolvedAsset | null {
  const asset = assetMap.get(assetId);
  if (!asset || !asset.path) return null;

  return {
    asset_id: assetId,
    image_url: asset.path,
    cutout_url: asset.cutout,
    filename: asset.filename,
    placement: getAssetPlacement(assetId),
    exists: true,
  };
}

export function resolvePlacement(placement: AssetPlacement): ResolvedAsset | null {
  return resolveAsset(placement.asset_id);
}

export function getHeroImage(systemType: string): ResolvedAsset | null {
  const assets = getAssetsBySystem(systemType);
  const hero = assets.find((a) => a.usage === "hero");
  if (hero) return resolvePlacement(hero);

  // Fallback: first asset for the system
  if (assets.length > 0) return resolvePlacement(assets[0]);
  return null;
}

export function getSectionImages(systemType: string): ResolvedAsset[] {
  const assets = getAssetsBySystem(systemType);
  return assets
    .filter((a) => a.usage !== "hero")
    .map(resolvePlacement)
    .filter((r): r is ResolvedAsset => r !== null);
}

export function getPageImages(page: string): ResolvedAsset[] {
  const assets = getAssetsByPage(page);
  return assets
    .map(resolvePlacement)
    .filter((r): r is ResolvedAsset => r !== null);
}

export function getAllResolvedAssets(): ResolvedAsset[] {
  const results: ResolvedAsset[] = [];
  for (const [id] of assetMap) {
    const resolved = resolveAsset(id);
    if (resolved) results.push(resolved);
  }
  return results;
}

export function getAssetsWithCutout(): ResolvedAsset[] {
  const results: ResolvedAsset[] = [];
  for (const [id, asset] of assetMap) {
    if (asset.cutout) {
      results.push({
        asset_id: id,
        image_url: asset.path,
        cutout_url: asset.cutout,
        filename: asset.filename,
        placement: getAssetPlacement(id),
        exists: true,
      });
    }
  }
  return results;
}

export function assetExists(assetId: string): boolean {
  const asset = assetMap.get(assetId);
  return !!(asset && asset.path);
}

export function getAssetCount(): number {
  return assetMap.size;
}

export function getAssetWithCutoutCount(): number {
  let count = 0;
  for (const [, asset] of assetMap) {
    if (asset.cutout) count++;
  }
  return count;
}
