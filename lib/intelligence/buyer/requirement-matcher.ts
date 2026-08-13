/**
 * HISVIA Requirement Matcher
 * Matches ParsedRequirement against individual assets.
 */

import type { AssetIntelligence, SystemType } from "../types";
import type { ParsedRequirement, AssetMatch } from "./buyer-types";
import { calculateBuyerScore } from "./buyer-score";

export function matchAsset(
  parsed: ParsedRequirement,
  asset: AssetIntelligence
): AssetMatch | null {
  const score = calculateBuyerScore(parsed, asset);

  // Minimum threshold: need at least 15 points to be a match
  if (score.total < 15) return null;

  const reasons: string[] = [];
  if (score.system_score >= 20) reasons.push("system_type match");
  if (score.category_score >= 10) reasons.push("category match");
  if (score.brand_score >= 10) reasons.push("brand match");
  if (score.application_score >= 5) reasons.push("industry match");
  if (score.keyword_score >= 3) reasons.push("keyword match");

  return {
    asset_id: asset.asset_id,
    score: score.total,
    match_reasons: reasons,
  };
}

export function rankAssets(
  parsed: ParsedRequirement,
  assets: AssetIntelligence[]
): AssetMatch[] {
  const matches: AssetMatch[] = [];
  for (const asset of assets) {
    const match = matchAsset(parsed, asset);
    if (match) matches.push(match);
  }
  // Sort by score descending
  matches.sort((a, b) => b.score - a.score);
  return matches;
}

export function getTopAssets(
  parsed: ParsedRequirement,
  assets: AssetIntelligence[],
  topN: number = 5
): AssetMatch[] {
  return rankAssets(parsed, assets).slice(0, topN);
}
