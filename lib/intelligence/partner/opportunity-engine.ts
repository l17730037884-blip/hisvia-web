/**
 * HISVIA Opportunity Engine
 * Calculates market opportunity scores for partner-country matching.
 *
 * Scoring (0-100):
 *   Demand Size:      25%
 *   Supply Gap:       25%
 *   China Advantage:  20%
 *   Competition Gap:  15%
 *   Partner Fit:      15%
 */

import { getMarketByCountry } from "./market-profile";
import { FACTORIES } from "../supplier/factory-profile";
import type { RegionalPartnerProfile, MarketOpportunity, OpportunityScore } from "./partner-types";

export function calculateOpportunityScore(
  partner: RegionalPartnerProfile,
  opportunity: MarketOpportunity
): OpportunityScore {
  // 1. Demand Size (0-25)
  let demand_score = 0;
  const highDemandIndustries = opportunity.industry_demand.filter(
    (d) => d.demand_level === "high"
  );
  demand_score = Math.min(highDemandIndustries.length * 8 + 1, 25);

  // 2. Supply Gap (0-25)
  let supply_gap_score = 0;
  const premium = opportunity.supply_gap.price_premium_pct;
  if (premium >= 50) supply_gap_score = 25;
  else if (premium >= 35) supply_gap_score = 20;
  else if (premium >= 20) supply_gap_score = 15;
  else supply_gap_score = 10;

  // 3. China Advantage (0-20)
  let china_advantage_score = 0;
  const priceAdv = opportunity.china_advantage.price_advantage_pct;
  if (priceAdv >= 40) china_advantage_score += 10;
  else if (priceAdv >= 25) china_advantage_score += 7;
  else china_advantage_score += 5;

  // Count matching factories for partner's preferred categories
  const matchingFactories = partner.preferred_categories.flatMap((cat) =>
    FACTORIES.filter((f) => f.system_capability.includes(cat))
  ).length;
  if (matchingFactories >= 5) china_advantage_score += 10;
  else if (matchingFactories >= 3) china_advantage_score += 7;
  else china_advantage_score += 4;
  china_advantage_score = Math.min(china_advantage_score, 20);

  // 4. Competition Gap (0-15)
  let competition_score = 0;
  if (opportunity.competition_level === "low") competition_score = 15;
  else if (opportunity.competition_level === "medium") competition_score = 8;
  else competition_score = 3;

  // 5. Partner Fit (0-15)
  let partner_fit_score = 0;
  if (partner.local_network.years_in_market >= 10) partner_fit_score += 5;
  else if (partner.local_network.years_in_market >= 5) partner_fit_score += 3;
  if (partner.sales_capability.team_size >= 5) partner_fit_score += 4;
  if (partner.technical_background.has_engineers) partner_fit_score += 3;
  if (partner.technical_background.service_capability) partner_fit_score += 3;
  partner_fit_score = Math.min(partner_fit_score, 15);

  const total = demand_score + supply_gap_score + china_advantage_score + competition_score + partner_fit_score;

  let level: "HIGH" | "MEDIUM" | "LOW" = "LOW";
  if (total >= 70) level = "HIGH";
  else if (total >= 45) level = "MEDIUM";

  return {
    demand_score,
    supply_gap_score,
    china_advantage_score,
    competition_score,
    partner_fit_score,
    total,
    level,
  };
}
