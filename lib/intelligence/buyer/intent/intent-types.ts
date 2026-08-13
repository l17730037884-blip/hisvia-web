/**
 * HISVIA Buyer Intent Types — Phase 11
 * Industrial procurement intent analysis layer.
 */

// ============================================================
// Purchase Type
// ============================================================

export type PurchaseType =
  | "replacement"        // Replacing worn/broken parts
  | "new_purchase"       // First-time equipment purchase
  | "cost_reduction"     // Seeking lower-cost alternatives
  | "supplier_switch"    // Switching from current supplier
  | "oem_request"        // Custom/OEM manufacturing request
  | "urgent_supply";     // Emergency/expedited need

// ============================================================
// Industry Intent
// ============================================================

export type IndustryIntent =
  | "mining"
  | "oil_gas"
  | "manufacturing"
  | "food_beverage"
  | "pharmaceutical"
  | "chemical"
  | "construction"
  | "power_generation"
  | "automotive"
  | "marine"
  | "textile"
  | "cement"
  | "steel"
  | "electronics"
  | "water_treatment"
  | "general_industrial";

// ============================================================
// Pain Points
// ============================================================

export type PainPoint =
  | "high_price"          // Current supplier too expensive
  | "supply_unstable"     // Inconsistent supply/delivery
  | "obsolete_equipment"  // Can't find parts for old equipment
  | "quality_problem"     // Current parts failing prematurely
  | "delivery_problem"    // Long lead times
  | "single_source"       // Only one supplier, need backup
  | "certification_gap"   // Need certified/approved parts
  | "technical_support";  // Need engineering help

// ============================================================
// Decision Factors
// ============================================================

export type DecisionFactor =
  | "price"               // Lowest total cost
  | "quality"             // Part quality and reliability
  | "certification"       // ISO/CE/ASME certification
  | "lead_time"           // Fast delivery
  | "customization"       // Custom specifications
  | "brand_compatibility" // Must match existing brand
  | "technical_support"   // Engineering consultation
  | "payment_terms";      // Favorable payment conditions

// ============================================================
// Sourcing Strategy
// ============================================================

export type SourcingStrategy =
  | "direct_factory"      // Go direct to manufacturer
  | "replacement_search"  // Find compatible replacement
  | "oem_customization"   // Custom manufacturing
  | "multi_supplier"      // Compare multiple suppliers
  | "urgent_fulfillment"  // Expedited supply chain
  | "long_term_partner";  // Strategic partnership

// ============================================================
// Sourcing Risk
// ============================================================

export interface SourcingRisk {
  type: string;
  level: "high" | "medium" | "low";
  description: string;
  mitigation: string;
}

// ============================================================
// Buyer Intent (full)
// ============================================================

export interface BuyerIntent {
  purchase_type: PurchaseType;
  purchase_type_confidence: number;
  industry_intent: IndustryIntent;
  industry_confidence: number;
  pain_points: PainPoint[];
  decision_factors: DecisionFactor[];
  recommended_strategies: SourcingStrategy[];
  risks: SourcingRisk[];
  urgency_level: "low" | "medium" | "high";
  estimated_budget_tier: "small" | "medium" | "large";
}

// ============================================================
// Buyer Profile
// ============================================================

export interface BuyerProfile {
  country: string;
  buyer_type: "distributor" | "end_user" | "oem" | "service_company" | "trader";
  industry_focus: IndustryIntent[];
  typical_order_size: "small" | "medium" | "large";
  certification_required: boolean;
  preferred_communication: "email" | "wechat" | "whatsapp" | "phone";
}
