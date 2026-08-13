/**
 * HISVIA Regional Partner Intelligence Types — Phase 13
 * Overseas partner → China supply chain matching.
 */

import type { SystemType } from "../types";

// ============================================================
// Regional Partner Profile
// ============================================================

export interface RegionalPartnerProfile {
  partner_id: string;
  country: string;
  region: string;
  city: string;
  market_type: MarketType;
  industries: string[];
  customer_types: CustomerType[];
  local_network: LocalNetwork;
  sales_capability: SalesCapability;
  technical_background: TechnicalBackground;
  existing_business: ExistingBusiness;
  preferred_categories: SystemType[];
}

export type MarketType =
  | "emerging_industrial"   // Growing manufacturing sector
  | "resource_extraction"   // Mining, oil & gas focused
  | "infrastructure_build"  // Construction, power, water
  | "mature_manufacturing"  // Established industrial base
  | "trade_hub";            // Re-export / distribution center

export type CustomerType =
  | "industrial_plants"
  | "mining_companies"
  | "oil_gas_operators"
  | "construction_firms"
  | "distributors"
  | "service_centers"
  | "oem_manufacturers"
  | "government_procurement";

export interface LocalNetwork {
  years_in_market: number;
  active_customers: string;
  industry_associations: string[];
  trade_show_participation: boolean;
}

export interface SalesCapability {
  team_size: number;
  languages: string[];
  annual_revenue_usd: string;
  sales_channels: SalesChannel[];
}

export type SalesChannel =
  | "direct_sales"
  | "distributor_network"
  | "online_platform"
  | "trade_shows"
  | "government_bidding";

export interface TechnicalBackground {
  has_engineers: boolean;
  engineer_count: number;
  service_capability: boolean;
  spare_parts_inventory: boolean;
  installation_support: boolean;
}

export interface ExistingBusiness {
  product_categories: string[];
  annual_import_volume: string;
  current_suppliers: string;
  pain_points: string[];
}

// ============================================================
// Market Opportunity
// ============================================================

export interface MarketOpportunity {
  country: string;
  industry_demand: IndustryDemand[];
  supply_gap: SupplyGap;
  china_advantage: ChinaAdvantage;
  target_buyers: string[];
  estimated_value: EstimatedValue;
  competition_level: "low" | "medium" | "high";
}

export interface IndustryDemand {
  industry: string;
  demand_level: "high" | "medium" | "low";
  key_products: string[];
  growth_rate_pct: number;
}

export interface SupplyGap {
  local_suppliers: string;
  import_dependency: string;
  price_premium_pct: number;
  lead_time_weeks: number;
}

export interface ChinaAdvantage {
  price_advantage_pct: number;
  product_availability: string;
  manufacturing_capability: string;
  key_strengths: string[];
}

export interface EstimatedValue {
  annual_market_usd: string;
  hisvia_target_share_pct: number;
  first_year_potential_usd: string;
}

// ============================================================
// Opportunity Score
// ============================================================

export interface OpportunityScore {
  demand_score: number;       // 0-25
  supply_gap_score: number;   // 0-25
  china_advantage_score: number; // 0-20
  competition_score: number;  // 0-15
  partner_fit_score: number;  // 0-15
  total: number;              // 0-100
  level: "HIGH" | "MEDIUM" | "LOW";
}

// ============================================================
// Partner Match Result
// ============================================================

export interface PartnerMatch {
  partner: RegionalPartnerProfile;
  opportunity: MarketOpportunity;
  score: OpportunityScore;
  recommended_categories: SystemType[];
  recommended_buyer_scenarios: string[];
  supplier_network: string[];
  revenue_model: RevenueModel;
}

// ============================================================
// Revenue Model
// ============================================================

export interface RevenueModel {
  primary_model: RevenueModelType;
  secondary_models: RevenueModelType[];
  commission_structure: string;
  estimated_first_year_revenue: string;
  partnership_path: PartnershipPath;
}

export type RevenueModelType =
  | "lead_referral"         // Refer buyers → earn commission
  | "project_commission"    // Close deals → earn project %
  | "supplier_development"  // Develop local supply → earn retainer
  | "regional_exclusivity"  // Exclusive territory → higher margin
  | "joint_venture";        // Co-invest in local entity

export type PartnershipPath =
  | "trial_period"          // 3-month trial with low commitment
  | "graduated_commission"  // Scale commission with volume
  | "milestone_based"       // Earn equity/shares at milestones
  | "direct_partnership";   // Full partnership from day 1
