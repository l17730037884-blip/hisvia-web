/**
 * HISVIA Partner Matcher
 * Matches regional partners → market opportunities → supplier network.
 */

import { getMarketByCountry } from "./market-profile";
import { calculateOpportunityScore } from "./opportunity-engine";
import { FACTORIES } from "../supplier/factory-profile";
import { generateRevenueModel } from "./partner-revenue-model";
import type { RegionalPartnerProfile, PartnerMatch } from "./partner-types";
import type { SystemType } from "../types";

export function matchPartnerOpportunity(
  partner: RegionalPartnerProfile
): PartnerMatch | null {
  const opportunity = getMarketByCountry(partner.country);
  if (!opportunity) return null;

  const score = calculateOpportunityScore(partner, opportunity);

  // Recommended categories: partner's preferred + market demand overlap
  const demandProducts = opportunity.industry_demand.flatMap((d) => d.key_products);
  const recommendedCats: SystemType[] = [];
  for (const cat of partner.preferred_categories) {
    const factories = FACTORIES.filter((f) => f.system_capability.includes(cat));
    const hasDemand = factories.some((f) =>
      f.product_capability.some((p) =>
        demandProducts.some((dp) => p.toLowerCase().includes(dp.toLowerCase().split(" ")[0]))
      )
    );
    if (factories.length > 0) recommendedCats.push(cat);
  }

  // Recommended buyer scenarios
  const scenarios: string[] = [];
  if (recommendedCats.some((c) => c === "Air Compressor Systems")) {
    scenarios.push("Compressor spare parts replacement");
  }
  if (recommendedCats.some((c) => c === "Industrial Filtration")) {
    scenarios.push("Filter element recurring supply");
  }
  if (recommendedCats.some((c) => c === "Hydraulic Systems")) {
    scenarios.push("Hydraulic component repair & replacement");
  }
  if (recommendedCats.some((c) => c === "Mechanical Transmission")) {
    scenarios.push("Bearing & seal bulk supply");
  }
  if (recommendedCats.length >= 3) {
    scenarios.push("Multi-category industrial supply partnership");
  }

  // Supplier network
  const suppliers = new Set<string>();
  for (const cat of recommendedCats) {
    for (const f of FACTORIES) {
      if (f.system_capability.includes(cat)) {
        suppliers.add(`${f.company_name} (${f.location})`);
      }
    }
  }

  // Revenue model
  const revenueModel = generateRevenueModel(partner, opportunity, score);

  return {
    partner,
    opportunity,
    score,
    recommended_categories: recommendedCats,
    recommended_buyer_scenarios: scenarios,
    supplier_network: Array.from(suppliers).slice(0, 6),
    revenue_model: revenueModel,
  };
}
