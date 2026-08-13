/**
 * HISVIA Page Mapper
 * Maps website-content layers → Next.js App Router routes.
 *
 * This is a READ-ONLY mapping layer. It does not modify pages.
 * Use these functions in page.tsx server components to fetch data.
 */

import type { SystemType } from "./types";

// ============================================================
// Route Definitions
// ============================================================

/** System solution pages → /solutions/[slug] */
export const SOLUTION_ROUTES: Record<SystemType, string> = {
  "Air Compressor Systems": "/solutions/compressed-air-systems",
  "Hydraulic Systems": "/solutions/hydraulic-systems",
  "Pneumatic Automation": "/solutions/pneumatic-automation",
  "Industrial Filtration": "/solutions/industrial-filtration",
  "Pumps & Fluid Handling": "/solutions/pumps-fluid-handling",
  "Valves & Flow Control": "/solutions/valves-flow-control",
  "Mechanical Transmission": "/solutions/mechanical-transmission",
  "Industrial Automation & Control": "/solutions/automation-control",
};

/** System type → procurement RFQ route */
export function getProcurementRoute(systemType: SystemType): string {
  const solutionRoute = SOLUTION_ROUTES[systemType];
  return `${solutionRoute}#rfq`;
}

/** SEO industry landing pages → /industries/[slug] */
export function getIndustryRoute(industrySlug: string): string {
  return `/industries/${industrySlug}`;
}

/** Capability pages */
export const CAPABILITY_ROUTES = {
  manufacturingNetwork: "/manufacturing-network",
  factoryNetwork: "/manufacturing-network/factories",
  qualityControl: "/manufacturing-network/quality",
  about: "/about",
} as const;

/** Global procurement/RFQ page */
export const PROCUREMENT_HUB_ROUTE = "/submit-requirement";

// ============================================================
// Page Data Requirements
// ============================================================

/**
 * Defines which data each route type needs.
 * Use to fetch only required data in server components.
 */

export interface RouteDataRequirements {
  route: string;
  needsSystemPages: boolean;
  needsProcurementScenarios: boolean;
  needsSeoPages: boolean;
  needsFactoryAssets: boolean;
  systemTypes: SystemType[];
}

export function getRouteRequirements(route: string): RouteDataRequirements {
  // Solution page → needs system data + procurement + SEO
  for (const [st, r] of Object.entries(SOLUTION_ROUTES)) {
    if (route.startsWith(r)) {
      return {
        route,
        needsSystemPages: true,
        needsProcurementScenarios: true,
        needsSeoPages: true,
        needsFactoryAssets: false,
        systemTypes: [st as SystemType],
      };
    }
  }

  // Industry page → needs SEO + system assets
  if (route.startsWith("/industries/")) {
    return {
      route,
      needsSystemPages: true,
      needsProcurementScenarios: false,
      needsSeoPages: true,
      needsFactoryAssets: false,
      systemTypes: [],
    };
  }

  // Manufacturing network → needs capability + factory assets
  if (route.startsWith("/manufacturing-network")) {
    return {
      route,
      needsSystemPages: true,
      needsProcurementScenarios: false,
      needsSeoPages: false,
      needsFactoryAssets: true,
      systemTypes: [],
    };
  }

  // RFQ hub → needs procurement scenarios
  if (route === PROCUREMENT_HUB_ROUTE) {
    return {
      route,
      needsSystemPages: false,
      needsProcurementScenarios: true,
      needsSeoPages: false,
      needsFactoryAssets: false,
      systemTypes: [],
    };
  }

  // Default
  return {
    route,
    needsSystemPages: false,
    needsProcurementScenarios: false,
    needsSeoPages: false,
    needsFactoryAssets: false,
    systemTypes: [],
  };
}

// ============================================================
// Page Mapping Summary
// ============================================================

export interface PageMappingSummary {
  solutionPages: number;
  industryPages: number;
  capabilityPages: number;
  procurementHub: boolean;
  totalRoutes: number;
}

export function getPageMappingSummary(): PageMappingSummary {
  return {
    solutionPages: Object.keys(SOLUTION_ROUTES).length,
    industryPages: 34, // from Phase 6 seo-pages.json
    capabilityPages: 3, // manufacturing-network, factory-network, quality
    procurementHub: true,
    totalRoutes: 8 + 34 + 3 + 1,
  };
}
