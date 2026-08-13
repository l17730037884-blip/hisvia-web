/**
 * HISVIA Buyer Score Calculator
 * Computes match quality score (0-100) for asset-buyer matching.
 *
 * Weights:
 *   system_type match:  40%
 *   category match:      25%
 *   brand match:         15%
 *   application match:   10%
 *   keyword match:       10%
 */

import type { ParsedRequirement, BuyerScore } from "./buyer-types";
import type { AssetIntelligence } from "../types";

export function calculateBuyerScore(
  parsed: ParsedRequirement,
  asset: AssetIntelligence
): BuyerScore {
  let system_score = 0;
  let category_score = 0;
  let brand_score = 0;
  let application_score = 0;
  let keyword_score = 0;

  const cls = asset.industrial_classification;
  const cap = asset.supplier_capability;

  // System type match (0-40)
  if (parsed.system_type && cls.system_type === parsed.system_type) {
    system_score = 40 * parsed.system_confidence;
  }

  // Category match (0-25)
  if (parsed.category && cls.category) {
    const catLower = cls.category.toLowerCase();
    const parsedCatLower = parsed.category.toLowerCase();
    if (
      catLower.includes(parsedCatLower) ||
      parsedCatLower.includes(catLower)
    ) {
      category_score = 25 * parsed.category_confidence;
    }
  }

  // Brand match (0-15)
  if (parsed.brand && cls.brand) {
    if (cls.brand.toLowerCase().includes(parsed.brand.toLowerCase())) {
      brand_score = 15 * parsed.brand_confidence;
    }
  }

  // Application/industry match (0-10)
  if (parsed.industry && cap.industry_scope.length > 0) {
    const indLower = parsed.industry.toLowerCase();
    const match = cap.industry_scope.some((s) =>
      s.toLowerCase().includes(indLower)
    );
    if (match) {
      application_score = 10 * parsed.industry_confidence;
    }
  }

  // Keyword match in asset metadata (0-10)
  if (parsed.keywords.length > 0) {
    const allText = [
      ...asset.vision.visible_object,
      ...asset.vision.visible_features,
      ...asset.vision.industrial_clues,
      ...asset.supply_intelligence.purchase_keywords,
    ]
      .join(" ")
      .toLowerCase();

    let kwMatches = 0;
    for (const kw of parsed.keywords) {
      if (allText.includes(kw.toLowerCase())) kwMatches++;
    }
    keyword_score = Math.min((kwMatches / parsed.keywords.length) * 10, 10);
  }

  return {
    system_score: Math.round(system_score),
    category_score: Math.round(category_score),
    brand_score: Math.round(brand_score),
    application_score: Math.round(application_score),
    keyword_score: Math.round(keyword_score),
    total:
      Math.round(system_score) +
      Math.round(category_score) +
      Math.round(brand_score) +
      Math.round(application_score) +
      Math.round(keyword_score),
  };
}
