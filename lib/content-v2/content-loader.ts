/**
 * HISVIA V2 Content Loader — Phase 17
 * READ-ONLY data access layer for data/content-v2/*.json
 */

import companyRaw from "@/data/content-v2/company-profile.json";
import systemsRaw from "@/data/content-v2/system-pages.json";
import capabilityRaw from "@/data/content-v2/capability-pages.json";
import industryRaw from "@/data/content-v2/industry-pages.json";
import partnerRaw from "@/data/content-v2/partner-pages.json";
import seoRaw from "@/data/content-v2/seo-pages.json";
import placementRaw from "@/data/content-v2/asset-expansion/asset-placement-v2.json";
import homepageRaw from "@/data/content-v2/homepage-v2.json";

// ============================================================
// Types
// ============================================================

export interface CompanyProfile {
  version: string;
  company: {
    name: string;
    tagline: string;
    positioning: string;
    description: string;
    founding_principle: string;
    description_zh?: string;
    description_ru?: string;
    tagline_zh?: string;
    tagline_ru?: string;
  };
  value_proposition: {
    for_buyers: { title: string; points: string[] };
    for_suppliers: { title: string; points: string[] };
    for_partners: { title: string; points: string[] };
  };
  what_we_are_not: string[];
  industrial_systems_covered: string[];
  key_brands_experience: string[];
  target_markets: { region: string; demand: string }[];
  asset_count: number;
}

export interface SystemPage {
  system_type: string;
  route: string;
  industry_problem: string;
  supply_capability: string;
  typical_applications: string[];
  compatible_brands: string[];
  sourcing_scenarios: string[];
  related_asset_ids: string[];
  asset_count: number;
}

export interface CapabilityItem {
  id: string;
  name: string;
  description: string;
  asset_ids: string[];
  usage: string;
}

export interface CapabilityPage {
  page: {
    route: string;
    title: string;
    subtitle: string;
    positioning: string;
    capabilities: CapabilityItem[];
  };
}

export interface IndustryPage {
  id: string;
  route: string;
  title: string;
  buyer_pain_point: string;
  relevant_systems: string[];
  typical_equipment: string[];
  sourcing_priorities: string[];
}

export interface PartnerType {
  id: string;
  route: string;
  title: string;
  target_audience: string;
  value_proposition: string[];
  requirements: string[];
  onboarding_process: string[];
}

export interface SeoPage {
  id: string;
  route: string;
  page_title: string;
  target_keyword: string;
  buyer_intent: string;
  related_system: string;
  related_asset_ids: string[];
  buyer_search_terms: string[];
  content_focus: string;
}

export interface AssetPlacement {
  asset_id: string;
  system_type: string;
  page: string;
  usage: "hero" | "system_section" | "technical" | "factory_trust" | "seo_thumbnail" | "capability";
  description: string;
}

// ============================================================
// Company Profile
// ============================================================

export function getCompanyProfile(): CompanyProfile {
  return companyRaw as unknown as CompanyProfile;
}

// ============================================================
// System Pages
// ============================================================

export function getSystemPages(): SystemPage[] {
  return (systemsRaw as unknown as { systems: SystemPage[] }).systems;
}

export function getSystemPage(systemType: string): SystemPage | null {
  return getSystemPages().find((s) => s.system_type === systemType) || null;
}

export function getSystemPageByRoute(route: string): SystemPage | null {
  return getSystemPages().find((s) => s.route === route) || null;
}

export function getSystemPageBySlug(slug: string): SystemPage | null {
  return getSystemPages().find((s) => s.route.endsWith(`/${slug}`)) || null;
}

export function getSystemRouteByType(systemType: string): string {
  const page = getSystemPage(systemType);
  return page ? page.route : `/solutions/${systemType.toLowerCase().replace(/\s+/g, "-")}`;
}

// ============================================================
// Capability Pages
// ============================================================

export function getCapabilityPage(): CapabilityPage {
  return capabilityRaw as unknown as CapabilityPage;
}

export function getCapabilities(): CapabilityItem[] {
  return getCapabilityPage().page.capabilities;
}

// ============================================================
// Industry Pages
// ============================================================

export function getIndustryPages(): IndustryPage[] {
  return (industryRaw as unknown as { industries: IndustryPage[] }).industries;
}

export function getIndustryPage(id: string): IndustryPage | null {
  return getIndustryPages().find((i) => i.id === id) || null;
}

// ============================================================
// Partner Pages
// ============================================================

export function getPartnerTypes(): PartnerType[] {
  return (partnerRaw as unknown as { partner_types: PartnerType[] }).partner_types;
}

export function getPartnerType(id: string): PartnerType | null {
  return getPartnerTypes().find((p) => p.id === id) || null;
}

// ============================================================
// SEO Pages
// ============================================================

export function getSeoPages(): SeoPage[] {
  return (seoRaw as unknown as { seo_pages: SeoPage[] }).seo_pages;
}

export function getSeoPage(id: string): SeoPage | null {
  return getSeoPages().find((s) => s.id === id) || null;
}

export function getSeoPageByRoute(route: string): SeoPage | null {
  return getSeoPages().find((s) => s.route === route) || null;
}

export function getSeoPagesBySystem(systemType: string): SeoPage[] {
  return getSeoPages().filter((s) => s.related_system === systemType || s.related_system === "All" || s.related_system === "Multiple");
}

// ============================================================
// Asset Placement
// ============================================================

export function getAssetPlacements(): AssetPlacement[] {
  return (placementRaw as unknown as { placements: AssetPlacement[] }).placements;
}

export function getAssetPlacement(assetId: string): AssetPlacement | null {
  return getAssetPlacements().find((p) => p.asset_id === assetId) || null;
}

export function getAssetsByPage(page: string): AssetPlacement[] {
  return getAssetPlacements().filter((p) => p.page === page);
}

export function getAssetsBySystem(systemType: string): AssetPlacement[] {
  return getAssetPlacements().filter((p) => p.system_type === systemType);
}

export function getAssetsByUsage(usage: string): AssetPlacement[] {
  return getAssetPlacements().filter((p) => p.usage === usage);
}

export function getHeroAsset(systemType: string): AssetPlacement | null {
  return getAssetPlacements().find((p) => p.system_type === systemType && p.usage === "hero") || null;
}

export function getAssetPlacementRules(): string[] {
  return (placementRaw as unknown as { rules: string[] }).rules;
}


// ============================================================
// System Count
// ============================================================

export function getSystemCount(): Record<string, number> {
  const placements = getAssetPlacements();
  const counts: Record<string, number> = {};
  for (const system of getSystemPages()) {
    const systemAssets = placements.filter((p) => p.system_type === system.system_type);
    counts[system.system_type] = systemAssets.length;
  }
  return counts;
}

// ============================================================
// Combined queries
// ============================================================

export function getSystemPageWithAssets(systemType: string): {
  page: SystemPage | null;
  hero: AssetPlacement | null;
  sections: AssetPlacement[];
  allAssets: AssetPlacement[];
} {
  return {
    page: getSystemPage(systemType),
    hero: getHeroAsset(systemType),
    sections: getAssetsBySystem(systemType).filter((p) => p.usage !== "hero"),
    allAssets: getAssetsBySystem(systemType),
  };
}

export function getAllSystemSlugs(): { slug: string; system_type: string }[] {
  return getSystemPages().map((s) => ({
    slug: s.route.split("/").pop() || "",
    system_type: s.system_type,
  }));
}

export function getAllIndustrySlugs(): { slug: string; id: string }[] {
  return getIndustryPages().map((i) => ({
    slug: i.route.split("/").pop() || i.id,
    id: i.id,
  }));
}

export function getAllPartnerSlugs(): { slug: string; id: string }[] {
  return getPartnerTypes().map((p) => ({
    slug: p.route.split("/").pop() || p.id,
    id: p.id,
  }));
}

// ============================================================
// Homepage V2 (Phase 26)
// ============================================================

export interface HomepageHeroAsset {
  asset_id: string;
  role: "hero_main" | "hero_backup";
  score: number;
  asset_type: string;
  path: string;
}

export interface HomepageSystemAsset {
  asset_id: string;
  display_system: string;
  brand: string;
  path: string;
}

export interface HomepageFactoryAsset {
  asset_id: string;
  asset_type: string;
  path: string;
}

export interface HomepageOemAsset {
  asset_id: string;
  asset_type: string;
  brand: string;
  path: string;
}

export interface HomepagePartnerAsset {
  asset_id: string;
  asset_type: string;
  path: string;
}

export type HomepageAsset = HomepageHeroAsset | HomepageSystemAsset | HomepageFactoryAsset | HomepageOemAsset | HomepagePartnerAsset;

export interface HomepageSection {
  title: string;
  count: number;
  assets: HomepageAsset[];
}

export interface HomepageHeroSection {
  title: string;
  count: number;
  assets: HomepageHeroAsset[];
}

export interface HomepageSystemSection {
  title: string;
  count: number;
  assets: HomepageSystemAsset[];
}

export interface HomepageFactorySection {
  title: string;
  count: number;
  assets: HomepageFactoryAsset[];
}

export interface HomepageOemSection {
  title: string;
  count: number;
  assets: HomepageOemAsset[];
}

export interface HomepagePartnerSection {
  title: string;
  count: number;
  assets: HomepagePartnerAsset[];
}

export interface HomepageV2Data {
  version: string;
  sections: {
    hero: HomepageHeroSection;
    system_network: HomepageSystemSection;
    factory_trust: HomepageFactorySection;
    capability: HomepageFactorySection;
    oem_process: HomepageOemSection;
    partner_network: HomepagePartnerSection;
  };
}

export function getHomepageSections(): HomepageV2Data {
  return homepageRaw as unknown as HomepageV2Data;
}

export function getHomepageHeroAssets(): HomepageHeroAsset[] {
  return getHomepageSections().sections.hero.assets;
}

export function getHomepageSystemAssets(): HomepageSystemAsset[] {
  return getHomepageSections().sections.system_network.assets;
}

export function getHomepageFactoryTrustAssets(): HomepageFactoryAsset[] {
  return getHomepageSections().sections.factory_trust.assets;
}

export function getHomepageCapabilityAssets(): HomepageFactoryAsset[] {
  return getHomepageSections().sections.capability.assets;
}

export function getHomepageOemAssets(): HomepageOemAsset[] {
  return getHomepageSections().sections.oem_process.assets;
}

export function getHomepagePartnerAssets(): HomepagePartnerAsset[] {
  return getHomepageSections().sections.partner_network.assets;
}

export function getHomepageTotalAssets(): number {
  const sections = getHomepageSections().sections;
  return Object.values(sections).reduce((sum, s) => sum + s.count, 0);
}

export function getHomepageUniqueAssetIds(): string[] {
  const sections = getHomepageSections().sections;
  const ids = new Set<string>();
  for (const section of Object.values(sections)) {
    for (const asset of section.assets) {
      ids.add(asset.asset_id);
    }
  }
  return Array.from(ids);
}
