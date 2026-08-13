/**
 * HISVIA Buyer Matching Engine
 * Orchestrates: requirement parsing → asset matching → supply chain mapping.
 *
 * Main entry point: matchBuyerRequirement()
 */

import {
  getAssetsBySystem,
  getAvailableSystems,
  getRegistryStats,
} from "../registry-loader";
import { getProcurementScenariosBySystem } from "../procurement-data";
import { getSeoLandingPagesBySystem } from "../seo-data";
import { parseRequirement } from "./requirement-parser";
import { rankAssets } from "./requirement-matcher";
import type { SystemType } from "../types";
import type {
  BuyerRequirement,
  MatchResult,
  SystemMatch,
} from "./buyer-types";

export function matchBuyerRequirement(
  requirement: BuyerRequirement
): MatchResult {
  // Step 1: Parse natural language description
  const parsed = parseRequirement(requirement.description);

  // Use explicit fields if provided, fallback to parsed
  const effectiveSystem = requirement.system_type || parsed.system_type;
  const effectiveBrand = requirement.brand || parsed.brand;
  const effectiveIndustry = requirement.industry || parsed.industry;

  // Override parsed with explicit fields
  const enrichedParsed = {
    ...parsed,
    system_type: effectiveSystem,
    brand: effectiveBrand,
    industry: effectiveIndustry,
  };

  // Step 2: Match against all classified assets
  const allSystems = getAvailableSystems();
  const allAssets = allSystems.flatMap((s) => getAssetsBySystem(s));

  const matchedAssets = rankAssets(enrichedParsed, allAssets);

  // Step 3: Rank systems by match quality
  const systemScores: SystemMatch[] = allSystems
    .map((st) => {
      const systemAssets = getAssetsBySystem(st);
      const sysMatches = matchedAssets.filter((m) => {
        const asset = allAssets.find((a) => a.asset_id === m.asset_id);
        return asset?.industrial_classification.system_type === st;
      });
      const avgScore =
        sysMatches.length > 0
          ? Math.round(
              sysMatches.reduce((sum, m) => sum + m.score, 0) /
                sysMatches.length
            )
          : 0;

      const scenarios = getProcurementScenariosBySystem(st);
      const scenarioTypes = scenarios.map((s) => s.scenario.request_type);

      return {
        system_type: st,
        score: avgScore,
        asset_count: systemAssets.length,
        procurement_scenarios: scenarioTypes,
      };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // Step 4: Capability match
  let matchedCapability = null;
  if (effectiveSystem) {
    const sysAssets = getAssetsBySystem(effectiveSystem);
    if (sysAssets.length > 0) {
      const cap = sysAssets[0].supplier_capability;
      matchedCapability = {
        supplier_type: cap.supplier_type || "Industrial Supplier",
        export_potential: cap.export_potential,
        industry_scope: cap.industry_scope,
      };
    }
  }

  // Step 5: SEO pages
  const seoPages = effectiveSystem
    ? getSeoLandingPagesBySystem(effectiveSystem).map((s) => s.page.page_title)
    : [];

  // Step 6: Determine confidence
  const topScore = matchedAssets[0]?.score || 0;
  let confidence: "HIGH" | "MEDIUM" | "LOW" = "LOW";
  if (topScore >= 60) confidence = "HIGH";
  else if (topScore >= 30) confidence = "MEDIUM";

  // Step 7: Generate summary
  const summary = confidence === "HIGH"
    ? `Strong match: ${matchedAssets.length} assets found for ${effectiveSystem || "general industrial"} supply.`
    : confidence === "MEDIUM"
    ? `Partial match: ${matchedAssets.length} potential assets. Refine your requirement for better results.`
    : `Limited match. Please provide more specific equipment details.`;

  return {
    requirement,
    parsed: enrichedParsed,
    matched_systems: systemScores,
    matched_assets: matchedAssets.slice(0, 10),
    matched_capability: matchedCapability,
    seo_pages: seoPages,
    confidence,
    summary,
  };
}
