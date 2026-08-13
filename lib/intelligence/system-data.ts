/**
 * HISVIA System Page Data Provider
 * Maps system-pages.json + registry → typed system page view models.
 */

import systemPagesData from "@/data/asset-pipeline/website-content/system-pages.json";
import {
  getAssetById,
  getAssetsBySystem,
  getHeroAssets,
  validateAssetIds,
} from "./registry-loader";
import type {
  SystemPage,
  SystemPageData,
  SystemType,
  ProcurementPage,
  SeoPage,
} from "./types";

const systemPages = systemPagesData as SystemPage[];

// Index
const bySystem = new Map<SystemType, SystemPage>();
for (const sp of systemPages) {
  bySystem.set(sp.system_type, sp);
}

/**
 * Get a system page by system type name.
 * Returns the page config + resolved hero/support assets.
 */
export function getSystemPage(systemType: SystemType): SystemPageData | null {
  const page = bySystem.get(systemType);
  if (!page) return null;

  const heroAssets = page.hero_assets
    .map((id) => getAssetById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getAssetById>>[];

  const supportAssets = page.support_assets
    .map((id) => getAssetById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getAssetById>>[];

  return {
    page,
    heroAssets,
    supportAssets,
    procurementScenarios: [],
    seoLandingPages: [],
  };
}

/**
 * Get all system pages with their assets resolved.
 */
export function getAllSystemPages(): SystemPageData[] {
  return systemPages
    .map((sp) => getSystemPage(sp.system_type))
    .filter(Boolean) as SystemPageData[];
}

/**
 * Get system page by URL slug.
 */
export function getSystemPageBySlug(slug: string): SystemPageData | null {
  const page = systemPages.find((sp) => sp.url_slug === slug);
  if (!page) return null;
  return getSystemPage(page.system_type);
}

/**
 * Get all procurement keywords aggregated across systems.
 */
export function getAllProcurementKeywords(): string[] {
  const all: string[] = [];
  for (const sp of systemPages) {
    all.push(...sp.procurement_keywords);
  }
  return [...new Set(all)];
}

/**
 * Enrich a system page with procurement scenarios.
 */
export function enrichWithProcurement(
  systemData: SystemPageData,
  scenarios: ProcurementPage[]
): SystemPageData {
  const related = scenarios.filter((s) =>
    s.related_systems.includes(systemData.page.system_type)
  );
  return { ...systemData, procurementScenarios: related };
}

/**
 * Enrich a system page with SEO landing pages.
 */
export function enrichWithSeo(
  systemData: SystemPageData,
  seoPages: SeoPage[]
): SystemPageData {
  const related = seoPages.filter(
    (s) => s.system_type === systemData.page.system_type
  );
  return { ...systemData, seoLandingPages: related };
}

/**
 * Validate all asset references in system pages.
 */
export function validateSystemPageAssets(): {
  total: number;
  found: number;
  missing: string[];
} {
  const allIds = new Set<string>();
  for (const sp of systemPages) {
    for (const id of sp.hero_assets) allIds.add(id);
    for (const id of sp.support_assets) allIds.add(id);
  }
  const { found, missing } = validateAssetIds(Array.from(allIds));
  return { total: allIds.size, found: found.length, missing };
}
