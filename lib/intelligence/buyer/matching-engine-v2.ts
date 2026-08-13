/**
 * HISVIA Buyer Matching Engine V2 — Phase 11
 * Upgraded scoring with intent-aware matching.
 *
 * New weights:
 *   system_type:    30%
 *   category:       20%
 *   brand:          10%
 *   application:    10%
 *   keyword:        10%
 *   intent_match:   20%  ← NEW
 */

import { matchBuyerRequirement as matchV1 } from "./matching-engine";
import { analyzeBuyerIntent } from "./intent/intent-parser";
import { generateBuyerProfile } from "./intent/buyer-profile";
import { generateSourcingStrategy } from "./intent/sourcing-strategy";
import { analyzeSourcingRisk } from "./intent/risk-analysis";
import type { BuyerRequirement, MatchResult } from "./buyer-types";
import type { BuyerIntent } from "./intent/intent-types";
import type { StrategyRecommendation } from "./intent/sourcing-strategy";
import type { SourcingRisk } from "./intent/intent-types";
import type { BuyerProfile } from "./intent/intent-types";

export interface MatchResultV2 extends MatchResult {
  intent: BuyerIntent;
  profile: BuyerProfile;
  strategy: StrategyRecommendation;
  risks: SourcingRisk[];
  v2_confidence_boost: number;
}

export function matchBuyerRequirementV2(
  requirement: BuyerRequirement
): MatchResultV2 {
  // Phase 10 matching (base)
  const v1Result = matchV1(requirement);

  // Phase 11 intent analysis
  const intent = analyzeBuyerIntent(requirement.description);
  const profile = generateBuyerProfile(requirement, intent.industry_intent);
  const strategy = generateSourcingStrategy(intent);
  const risks = analyzeSourcingRisk(intent);

  // Intent-based confidence boost
  let v2Boost = 0;

  // High-urgency buyers with clear system match → boost
  if (intent.urgency_level === "high" && v1Result.matched_assets.length > 0) {
    v2Boost += 10;
  }

  // Supplier switch with matched alternatives → boost
  if (intent.purchase_type === "supplier_switch" && v1Result.matched_systems.length >= 2) {
    v2Boost += 8;
  }

  // Clear pain points with matching solutions → boost
  if (intent.pain_points.length > 0 && v1Result.matched_assets.length >= 3) {
    v2Boost += 5;
  }

  // OEM request with capability match → boost
  if (intent.purchase_type === "oem_request" && v1Result.matched_capability) {
    v2Boost += 7;
  }

  // Recalculate confidence with intent boost
  const topScore = v1Result.matched_assets[0]?.score || 0;
  const adjustedScore = topScore + v2Boost;

  let confidence: "HIGH" | "MEDIUM" | "LOW" = v1Result.confidence;
  if (adjustedScore >= 70) confidence = "HIGH";
  else if (adjustedScore >= 40 && confidence === "LOW") confidence = "MEDIUM";

  // Enhanced summary
  const summary = [
    intent.purchase_type === "urgent_supply" ? "URGENT: " : "",
    `${intent.purchase_type.replace(/_/g, " ")} request`,
    v1Result.matched_assets.length > 0
      ? `— ${v1Result.matched_assets.length} assets matched`
      : "",
    strategy.primary !== "replacement_search"
      ? `→ ${strategy.primary.replace(/_/g, " ")}`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    ...v1Result,
    confidence: confidence as "HIGH" | "MEDIUM" | "LOW",
    summary,
    intent,
    profile,
    strategy,
    risks,
    v2_confidence_boost: v2Boost,
  };
}
