/**
 * HISVIA Market Profiles — Phase 13
 * 6 key overseas markets with demand and supply gap analysis.
 */

import type { MarketOpportunity } from "./partner-types";

export const MARKET_OPPORTUNITIES: MarketOpportunity[] = [
  {
    country: "Russia",
    industry_demand: [
      { industry: "Mining", demand_level: "high", key_products: ["Compressor spare parts", "Hydraulic components", "Industrial filters", "Bearings"], growth_rate_pct: 12 },
      { industry: "Oil & Gas", demand_level: "high", key_products: ["Pipeline valves", "Hydraulic systems", "Compressor packages", "Control valves"], growth_rate_pct: 8 },
      { industry: "Manufacturing", demand_level: "medium", key_products: ["Pneumatic components", "Automation parts", "Mechanical seals"], growth_rate_pct: 5 },
    ],
    supply_gap: {
      local_suppliers: "Limited — mostly European brands with local offices",
      import_dependency: "70% of industrial components imported, sanctions redirected supply chains to Asia",
      price_premium_pct: 40,
      lead_time_weeks: 12,
    },
    china_advantage: {
      price_advantage_pct: 40,
      product_availability: "Full range — compressors, hydraulics, filtration, valves",
      manufacturing_capability: "Xinxiang filters + Suzhou compressors directly match Russian demand",
      key_strengths: ["30-50% cost advantage vs European brands", "Sanctions bypass via direct China sourcing", "Established China-Russia logistics corridors"],
    },
    target_buyers: ["Mining companies", "Oil field service companies", "Compressor service centers", "Industrial distributors"],
    estimated_value: { annual_market_usd: "$500M+", hisvia_target_share_pct: 2, first_year_potential_usd: "$500K-1M" },
    competition_level: "medium",
  },
  {
    country: "Kazakhstan",
    industry_demand: [
      { industry: "Oil & Gas", demand_level: "high", key_products: ["Hydraulic valves", "Pneumatic controls", "Pipeline components", "Compressor parts"], growth_rate_pct: 10 },
      { industry: "Mining", demand_level: "high", key_products: ["Conveyor bearings", "Hydraulic pumps", "Dust collection filters", "Wear parts"], growth_rate_pct: 15 },
      { industry: "Construction", demand_level: "medium", key_products: ["Construction equipment parts", "Hydraulic cylinders", "Pumps"], growth_rate_pct: 8 },
    ],
    supply_gap: {
      local_suppliers: "Very limited — no significant local industrial component manufacturing",
      import_dependency: "90% imported, primarily from Russia, Europe, and increasingly China",
      price_premium_pct: 50,
      lead_time_weeks: 10,
    },
    china_advantage: {
      price_advantage_pct: 45,
      product_availability: "Strong match — Xinjiang/Horgos border direct access to Xinxiang and Ningbo factories",
      manufacturing_capability: "Xinxiang filtration + Ningbo valves + Zhejiang hydraulics = perfect fit",
      key_strengths: ["Geographic proximity via Horgos border", "Belt & Road infrastructure", "Growing Chinese investment in Kazakh industry"],
    },
    target_buyers: ["Oil & gas operators", "Mining companies", "Equipment distributors", "Construction firms"],
    estimated_value: { annual_market_usd: "$200M", hisvia_target_share_pct: 3, first_year_potential_usd: "$300-600K" },
    competition_level: "low",
  },
  {
    country: "UAE",
    industry_demand: [
      { industry: "Manufacturing", demand_level: "high", key_products: ["Industrial pumps", "Valves", "Compressed air systems", "Automation components"], growth_rate_pct: 15 },
      { industry: "Oil & Gas", demand_level: "medium", key_products: ["Pipeline valves", "Control systems", "Hydraulic components"], growth_rate_pct: 5 },
      { industry: "Construction", demand_level: "medium", key_products: ["Construction pumps", "Valves", "Water treatment equipment"], growth_rate_pct: 10 },
    ],
    supply_gap: {
      local_suppliers: "Growing but fragmented — mostly trading companies, few manufacturers",
      import_dependency: "85% imported, UAE is a re-export hub for Middle East and Africa",
      price_premium_pct: 35,
      lead_time_weeks: 8,
    },
    china_advantage: {
      price_advantage_pct: 35,
      product_availability: "Complete industrial catalog — UAE is ideal hub for China-MEA trade",
      manufacturing_capability: "All 8 systems available via HISVIA network",
      key_strengths: ["UAE free zones enable duty-free re-export", "Established China-UAE trade routes", "UAE buyers already comfortable with Chinese products"],
    },
    target_buyers: ["Industrial distributors", "Oil & gas service companies", "Construction contractors", "Trading companies"],
    estimated_value: { annual_market_usd: "$400M+ (including re-export)", hisvia_target_share_pct: 2, first_year_potential_usd: "$400-800K" },
    competition_level: "medium",
  },
  {
    country: "Vietnam",
    industry_demand: [
      { industry: "Manufacturing", demand_level: "high", key_products: ["Pneumatic components", "Automation sensors", "PLCs", "FRL units"], growth_rate_pct: 20 },
      { industry: "Electronics", demand_level: "high", key_products: ["Precision automation", "Sensors", "Control panels"], growth_rate_pct: 18 },
      { industry: "Textile", demand_level: "medium", key_products: ["Compressed air systems", "Pneumatic cylinders", "Valves"], growth_rate_pct: 8 },
    ],
    supply_gap: {
      local_suppliers: "Developing rapidly but still dependent on imports for precision components",
      import_dependency: "75% of industrial automation components imported",
      price_premium_pct: 30,
      lead_time_weeks: 6,
    },
    china_advantage: {
      price_advantage_pct: 30,
      product_availability: "Dongguan automation cluster is 2-hour flight away",
      manufacturing_capability: "Automation, pneumatics, and precision machining — direct match for Vietnam's manufacturing boom",
      key_strengths: ["Geographic proximity — fast logistics", "Vietnam is #1 destination for relocating Chinese factories", "Cross-border trade infrastructure mature"],
    },
    target_buyers: ["Foreign-invested factories", "Vietnamese manufacturers", "Automation integrators", "Industrial park operators"],
    estimated_value: { annual_market_usd: "$300M", hisvia_target_share_pct: 3, first_year_potential_usd: "$300-600K" },
    competition_level: "medium",
  },
  {
    country: "India",
    industry_demand: [
      { industry: "Manufacturing", demand_level: "high", key_products: ["Bearings", "Pumps", "Valves", "Compressor parts", "Filtration"], growth_rate_pct: 15 },
      { industry: "Cement", demand_level: "high", key_products: ["Dust collection filters", "Bearings", "Hydraulic components"], growth_rate_pct: 10 },
      { industry: "Automotive", demand_level: "high", key_products: ["Automation components", "Pneumatic systems", "Precision parts"], growth_rate_pct: 12 },
    ],
    supply_gap: {
      local_suppliers: "Growing domestic manufacturing but quality gaps in precision components",
      import_dependency: "50% imported for high-end industrial components",
      price_premium_pct: 25,
      lead_time_weeks: 8,
    },
    china_advantage: {
      price_advantage_pct: 25,
      product_availability: "Massive scale — Indian demand volumes match Chinese production capacity",
      manufacturing_capability: "Bearings (Ningbo), filtration (Xinxiang), pumps (Suzhou) all directly relevant",
      key_strengths: ["Complementary manufacturing — China precision + India scale", "Growing bilateral trade despite political friction", "Indian importers actively seeking China alternatives to European brands"],
    },
    target_buyers: ["Manufacturing plants", "Cement companies", "Automotive suppliers", "Industrial distributors"],
    estimated_value: { annual_market_usd: "$800M+", hisvia_target_share_pct: 1, first_year_potential_usd: "$300-500K" },
    competition_level: "high",
  },
  {
    country: "Uzbekistan",
    industry_demand: [
      { industry: "Mining", demand_level: "high", key_products: ["Mining equipment parts", "Hydraulic systems", "Conveyor components", "Filters"], growth_rate_pct: 20 },
      { industry: "Oil & Gas", demand_level: "medium", key_products: ["Pipeline valves", "Compressor parts", "Hydraulic pumps"], growth_rate_pct: 10 },
      { industry: "Textile", demand_level: "high", key_products: ["Compressed air systems", "Pneumatic components", "Spare parts"], growth_rate_pct: 15 },
    ],
    supply_gap: {
      local_suppliers: "Almost none — one of the least developed industrial supply chains in the region",
      import_dependency: "95% imported, mainly from Russia, Turkey, and increasingly China",
      price_premium_pct: 60,
      lead_time_weeks: 14,
    },
    china_advantage: {
      price_advantage_pct: 50,
      product_availability: "Greenfield opportunity — first-mover advantage in multiple categories",
      manufacturing_capability: "All HISVIA supplier regions can serve Uzbekistan via Kazakhstan corridor",
      key_strengths: ["First-mover advantage — almost no Chinese industrial suppliers active", "Belt & Road priority country", "Uzbek government actively courting Chinese manufacturing investment"],
    },
    target_buyers: ["State-owned mining companies", "Textile conglomerates", "Oil & gas operators", "New industrial park developers"],
    estimated_value: { annual_market_usd: "$150M (fast growing)", hisvia_target_share_pct: 5, first_year_potential_usd: "$200-500K" },
    competition_level: "low",
  },
];

export function getMarketByCountry(country: string): MarketOpportunity | undefined {
  return MARKET_OPPORTUNITIES.find(
    (m) => m.country.toLowerCase() === country.toLowerCase()
  );
}

export function getMarketCount(): number {
  return MARKET_OPPORTUNITIES.length;
}

export function getHighOpportunityMarkets(): MarketOpportunity[] {
  return MARKET_OPPORTUNITIES.filter((m) => m.competition_level === "low");
}
