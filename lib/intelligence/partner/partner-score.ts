/**
 * HISVIA Partner Scoring
 * Evaluates partner quality based on profile completeness and capability.
 */

import type { RegionalPartnerProfile } from "./partner-types";

export function calculatePartnerScore(partner: RegionalPartnerProfile): {
  score: number;
  level: "A" | "B" | "C";
  strengths: string[];
  gaps: string[];
} {
  let score = 0;
  const strengths: string[] = [];
  const gaps: string[] = [];

  // Market experience (0-25)
  if (partner.local_network.years_in_market >= 10) { score += 25; strengths.push("10+ years market experience"); }
  else if (partner.local_network.years_in_market >= 5) { score += 15; strengths.push("5+ years experience"); }
  else { score += 5; gaps.push("Limited market experience (<5 years)"); }

  // Sales capability (0-25)
  if (partner.sales_capability.team_size >= 10) { score += 25; strengths.push("Large sales team"); }
  else if (partner.sales_capability.team_size >= 5) { score += 18; strengths.push("Established sales team"); }
  else { score += 8; gaps.push("Small sales team"); }

  // Technical capability (0-20)
  if (partner.technical_background.has_engineers && partner.technical_background.service_capability) {
    score += 20; strengths.push("Full technical + service capability");
  } else if (partner.technical_background.has_engineers) {
    score += 12; strengths.push("Engineering capability");
  } else {
    score += 3; gaps.push("No technical engineers");
  }

  // Network & reach (0-15)
  if (partner.local_network.industry_associations.length >= 2) { score += 15; strengths.push("Strong industry network"); }
  else if (partner.local_network.industry_associations.length >= 1) { score += 8; }
  else { score += 2; gaps.push("Limited industry connections"); }

  // Business readiness (0-15)
  if (partner.technical_background.spare_parts_inventory) { score += 8; strengths.push("Has spare parts inventory"); }
  if (partner.local_network.trade_show_participation) { score += 7; strengths.push("Trade show active"); } else { gaps.push("No trade show presence"); }

  let level: "A" | "B" | "C" = "C";
  if (score >= 75) level = "A";
  else if (score >= 50) level = "B";

  return { score, level, strengths, gaps };
}
