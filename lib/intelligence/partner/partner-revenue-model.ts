/**
 * HISVIA Partner Revenue Model Generator
 * Recommends revenue structure based on partner profile and opportunity.
 */

import type {
  RegionalPartnerProfile,
  MarketOpportunity,
  OpportunityScore,
  RevenueModel,
  RevenueModelType,
  PartnershipPath,
} from "./partner-types";

export function generateRevenueModel(
  partner: RegionalPartnerProfile,
  opportunity: MarketOpportunity,
  score: OpportunityScore
): RevenueModel {
  // Determine primary model
  let primary: RevenueModelType;
  let secondary: RevenueModelType[] = [];
  let path: PartnershipPath;

  if (partner.sales_capability.team_size >= 10 && score.total >= 70) {
    primary = "regional_exclusivity";
    secondary = ["project_commission", "supplier_development"];
    path = "direct_partnership";
  } else if (score.total >= 60) {
    primary = "project_commission";
    secondary = ["lead_referral", "supplier_development"];
    path = "graduated_commission";
  } else if (partner.technical_background.service_capability) {
    primary = "supplier_development";
    secondary = ["project_commission"];
    path = "milestone_based";
  } else {
    primary = "lead_referral";
    secondary = ["project_commission"];
    path = "trial_period";
  }

  // Commission structure
  let commission = "";
  if (primary === "lead_referral") {
    commission = "3-5% of first order value for qualified leads that convert";
  } else if (primary === "project_commission") {
    commission = "5-10% project commission + 2% ongoing for repeat orders";
  } else if (primary === "regional_exclusivity") {
    commission = "8-15% margin share with annual minimum volume commitment";
  } else if (primary === "supplier_development") {
    commission = "Monthly retainer + 3-5% on volume above baseline";
  } else {
    commission = "Negotiable based on volume and category";
  }

  // Revenue estimate
  const targetShare = opportunity.estimated_value.hisvia_target_share_pct;
  const firstYearRev = opportunity.estimated_value.first_year_potential_usd;

  return {
    primary_model: primary,
    secondary_models: secondary,
    commission_structure: commission,
    estimated_first_year_revenue: firstYearRev,
    partnership_path: path,
  };
}
