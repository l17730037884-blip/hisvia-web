/**
 * HISVIA Procurement Page Data Provider
 * Maps procurement-pages.json + registry → typed procurement scenarios.
 */

import procurementData from "@/data/asset-pipeline/website-content/procurement-pages.json";
import { getAssetById, validateAssetIds } from "./registry-loader";
import { getSystemPageBySlug } from "./system-data";
import type {
  ProcurementPage,
  ProcurementScenarioData,
} from "./types";

const procurementPages = procurementData as ProcurementPage[];

/**
 * Get all procurement scenarios with resolved assets.
 */
export function getAllProcurementScenarios(): ProcurementScenarioData[] {
  return procurementPages.map((scenario) => {
    const assets = scenario.related_assets
      .map((id) => getAssetById(id))
      .filter(Boolean) as NonNullable<ReturnType<typeof getAssetById>>[];

    const slug = scenario.solution_page.replace(/^\//, "");
    const systemPage = getSystemPageBySlug(slug);

    return {
      scenario,
      assets,
      systemPage: systemPage?.page || null,
    };
  });
}

/**
 * Get procurement scenarios for a specific system type.
 */
export function getProcurementScenariosBySystem(
  systemType: string
): ProcurementScenarioData[] {
  return getAllProcurementScenarios().filter((ps) =>
    ps.scenario.related_systems.includes(systemType as any)
  );
}

/**
 * Get procurement scenarios by request type.
 */
export function getProcurementScenariosByType(
  requestType: string
): ProcurementScenarioData[] {
  return getAllProcurementScenarios().filter(
    (ps) => ps.scenario.request_type === requestType
  );
}

/**
 * Get all unique request types.
 */
export function getAllRequestTypes(): string[] {
  return [...new Set(procurementPages.map((p) => p.request_type))];
}

/**
 * Validate all asset references in procurement pages.
 */
export function validateProcurementAssets(): {
  total: number;
  found: number;
  missing: string[];
} {
  const allIds = new Set<string>();
  for (const pp of procurementPages) {
    for (const id of pp.related_assets) allIds.add(id);
  }
  const { found, missing } = validateAssetIds(Array.from(allIds));
  return { total: allIds.size, found: found.length, missing };
}
