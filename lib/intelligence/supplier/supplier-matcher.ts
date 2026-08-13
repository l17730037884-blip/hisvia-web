/**
 * HISVIA Supplier Matcher
 * Orchestrates: requirement → factory matching → scoring → risk.
 *
 * Main entry: matchSuppliers()
 */

import { FACTORIES } from "./factory-profile";
import { calculateSupplierScore } from "./supplier-score";
import { analyzeSupplierRisk } from "./supplier-risk";
import type { BuyerRequirement } from "../buyer/buyer-types";
import type { SupplierMatch } from "./supplier-types";

export function matchSuppliers(
  requirement: BuyerRequirement
): SupplierMatch[] {
  const matches: SupplierMatch[] = [];

  for (const factory of FACTORIES) {
    const score = calculateSupplierScore(factory, requirement);

    // Only include factories with some capability match
    if (score.capability_score < 5 && score.product_score < 5) continue;

    const risks = analyzeSupplierRisk(factory, requirement);

    const reasons: string[] = [];
    if (score.capability_score >= 20) reasons.push("system_capability_match");
    if (score.product_score >= 15) reasons.push("product_match");
    if (score.quality_score >= 10) reasons.push("quality_certified");
    if (score.export_score >= 10) reasons.push("export_experienced");
    if (score.delivery_score >= 7) reasons.push("fast_delivery");
    if (factory.moq.sample_order_available) reasons.push("sample_order_ok");

    matches.push({
      factory,
      score,
      matching_reasons: reasons,
      risks,
    });
  }

  // Sort by total score descending
  matches.sort((a, b) => b.score.total - a.score.total);

  return matches;
}

export function getTopSuppliers(
  requirement: BuyerRequirement,
  topN: number = 5
): SupplierMatch[] {
  return matchSuppliers(requirement).slice(0, topN);
}
