/**
 * HISVIA SEO Production Integration — Phase 15
 * Bridges website-content layer to Next.js pages.
 *
 * Reads: data/asset-pipeline/website-content/*.json
 * NEVER modifies source data.
 */

import systemPagesRaw from "@/data/asset-pipeline/website-content/system-pages.json";
import seoPagesRaw from "@/data/asset-pipeline/website-content/seo-pages.json";
import procurementPagesRaw from "@/data/asset-pipeline/website-content/procurement-pages.json";
import capabilityPagesRaw from "@/data/asset-pipeline/website-content/capability-pages.json";
import { getSystemPageData, getAssetsBySystem } from "./production-registry";

// ============================================================
// Types
// ============================================================

export interface SeoPageData {
  page_title: string;
  target_keyword: string;
  industry_intent: string;
  asset_count: number;
  related_systems: string[];
}

export interface SystemPageData {
  system_type: string;
  page_role: string;
  hero_assets: string[];
  support_assets: string[];
  asset_count: number;
  procurement_keywords: string[];
  brands: string[];
  categories: string[];
}

export interface ProcurementPageData {
  buyer_problem: string;
  solution_page: string;
  request_type: string;
  related_systems: string[];
}

export interface CapabilityPageData {
  capability_type: string;
  factory_usage: string;
  trust_role: string;
  asset_count: number;
}

// ============================================================
// System Pages
// ============================================================

export function getSystemPages(): SystemPageData[] {
  const raw = systemPagesRaw as Record<string, unknown>[];
  return raw.map((sp) => {
    const sysType = sp.system_type as string;
    const prod = getSystemPageData(sysType);
    return {
      system_type: sysType,
      page_role: (sp.page_role as string) || "system_overview",
      hero_assets: (sp.hero_assets as string[]) || [],
      support_assets: (sp.support_assets as string[]) || [],
      asset_count: prod.assetCount,
      procurement_keywords: (sp.procurement_keywords as string[]) || [],
      brands: prod.brands.slice(0, 10),
      categories: prod.categories,
    };
  });
}

export function getSystemPageByType(systemType: string): SystemPageData | null {
  return getSystemPages().find((s) => s.system_type === systemType) || null;
}

export function getSystemsForSolutions(): string[] {
  return getSystemPages().map((s) => s.system_type);
}

// ============================================================
// SEO Pages
// ============================================================

export function getSeoPages(): SeoPageData[] {
  const raw = seoPagesRaw as Record<string, unknown>[];
  return raw.map((sp) => ({
    page_title: (sp.page_title as string) || "",
    target_keyword: (sp.target_keyword as string) || "",
    industry_intent: (sp.industry_intent as string) || "",
    asset_count: Array.isArray(sp.related_assets) ? (sp.related_assets as string[]).length : 0,
    related_systems: [],
  }));
}

export function getSeoKeywordsBySystem(systemType: string): string[] {
  const sysPage = getSystemPageByType(systemType);
  return sysPage?.procurement_keywords || [];
}

// ============================================================
// Procurement Pages
// ============================================================

export function getProcurementScenarios(): ProcurementPageData[] {
  const raw = procurementPagesRaw as Record<string, unknown>[];
  return raw.map((pp) => ({
    buyer_problem: (pp.buyer_problem as string) || "",
    solution_page: (pp.solution_page as string) || "",
    request_type: (pp.request_type as string) || "",
    related_systems: [],
  }));
}

// ============================================================
// Capability Pages
// ============================================================

export function getCapabilityPages(): CapabilityPageData[] {
  const raw = capabilityPagesRaw as Record<string, unknown>[];
  return raw.map((cp) => ({
    capability_type: (cp.capability_type as string) || "",
    factory_usage: (cp.factory_usage as string) || "",
    trust_role: (cp.trust_role as string) || "",
    asset_count: Array.isArray(cp.assets) ? (cp.assets as string[]).length : 0,
  }));
}

// ============================================================
// Page mapping: website-content → Next.js routes
// ============================================================

export interface PageMapping {
  route: string;
  pageType: "system" | "seo" | "procurement" | "capability";
  systemType?: string;
  keyword?: string;
  assetCount: number;
  active: boolean;
}

export function getPageMappings(): PageMapping[] {
  const mappings: PageMapping[] = [];

  // System pages → /solutions/*
  for (const sp of getSystemPages()) {
    const slug = sp.system_type
      .toLowerCase()
      .replace(/\s+&\s+/g, "-and-")
      .replace(/\s+/g, "-");
    mappings.push({
      route: `/solutions/${slug}`,
      pageType: "system",
      systemType: sp.system_type,
      assetCount: sp.asset_count,
      active: sp.asset_count > 0,
    });
  }

  // SEO pages → /industries/*
  for (const seo of getSeoPages()) {
    const slug = seo.target_keyword.toLowerCase().replace(/\s+/g, "-");
    mappings.push({
      route: `/industries/${slug}`,
      pageType: "seo",
      keyword: seo.target_keyword,
      assetCount: seo.asset_count,
      active: true,
    });
  }

  // Procurement pages → /applications/*
  for (const pp of getProcurementScenarios()) {
    const slug = pp.request_type.toLowerCase().replace(/\s+/g, "-");
    mappings.push({
      route: `/applications/${slug}`,
      pageType: "procurement",
      assetCount: 0,
      active: true,
    });
  }

  return mappings;
}

// ============================================================
// Summary
// ============================================================

export function getSeoIntegrationSummary(): {
  systemPagesCount: number;
  seoPagesCount: number;
  procurementPagesCount: number;
  capabilityPagesCount: number;
  totalActivePages: number;
  allSystemsCovered: boolean;
} {
  const mappings = getPageMappings();
  return {
    systemPagesCount: getSystemPages().length,
    seoPagesCount: getSeoPages().length,
    procurementPagesCount: getProcurementScenarios().length,
    capabilityPagesCount: getCapabilityPages().length,
    totalActivePages: mappings.filter((m) => m.active).length,
    allSystemsCovered: getSystemPages().length >= 8,
  };
}
