/**
 * HISVIA SEO Page Data Provider
 * Maps seo-pages.json + registry → typed SEO landing page view models.
 */

import seoPagesData from "@/data/asset-pipeline/website-content/seo-pages.json";
import capabilityData from "@/data/asset-pipeline/website-content/capability-pages.json";
import { getAssetById, getFactoryAssets, validateAssetIds } from "./registry-loader";
import type {
  SeoPage,
  SeoLandingData,
  CapabilityPage,
  SystemType,
} from "./types";

const seoPages = seoPagesData as SeoPage[];
const capabilityPages = capabilityData as CapabilityPage[];

// ============================================================
// SEO Landing Pages
// ============================================================

/**
 * Get all SEO landing pages with resolved assets.
 */
export function getAllSeoLandingPages(): SeoLandingData[] {
  return seoPages.map((page) => {
    const assets = page.related_assets
      .map((id) => getAssetById(id))
      .filter(Boolean) as NonNullable<ReturnType<typeof getAssetById>>[];

    return { page, assets };
  });
}

/**
 * Get SEO landing pages for a specific system type.
 */
export function getSeoLandingPagesBySystem(
  systemType: SystemType
): SeoLandingData[] {
  return getAllSeoLandingPages().filter(
    (sp) => sp.page.system_type === systemType
  );
}

/**
 * Get all unique target keywords.
 */
export function getAllTargetKeywords(): string[] {
  return [...new Set(seoPages.map((p) => p.target_keyword).filter(Boolean))];
}

// ============================================================
// Capability Pages (About Us / Trust)
// ============================================================

/**
 * Get all capability pages.
 */
export function getCapabilityPages(): CapabilityPage[] {
  return capabilityPages;
}

/**
 * Get the factory trust page with resolved factory assets.
 */
export function getFactoryTrustPage(): {
  page: CapabilityPage;
  assets: ReturnType<typeof getFactoryAssets>;
} | null {
  const page = capabilityPages.find(
    (p) => p.capability_type === "factory_network"
  );
  if (!page) return null;
  return { page, assets: getFactoryAssets() };
}

/**
 * Get the manufacturing network page.
 */
export function getManufacturingNetworkPage(): CapabilityPage | null {
  return (
    capabilityPages.find(
      (p) => p.capability_type === "manufacturing_network"
    ) || null
  );
}

// ============================================================
// Validation
// ============================================================

/**
 * Validate all asset references in SEO pages.
 */
export function validateSeoAssets(): {
  total: number;
  found: number;
  missing: string[];
} {
  const allIds = new Set<string>();
  for (const sp of seoPages) {
    for (const id of sp.related_assets) allIds.add(id);
  }
  const { found, missing } = validateAssetIds(Array.from(allIds));
  return { total: allIds.size, found: found.length, missing };
}

/**
 * Validate all asset references in capability pages.
 */
export function validateCapabilityAssets(): {
  total: number;
  found: number;
  missing: string[];
} {
  const allIds = new Set<string>();
  for (const cp of capabilityPages) {
    if (cp.assets) {
      for (const id of cp.assets) allIds.add(id);
    }
  }
  const { found, missing } = validateAssetIds(Array.from(allIds));
  return { total: allIds.size, found: found.length, missing };
}
