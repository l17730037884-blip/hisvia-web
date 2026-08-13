/**
 * HISVIA Asset Intelligence Registry — TypeScript Types
 * Phase 7: Website Intelligence Data Layer
 *
 * Mirrors the JSON schema from:
 *   data/asset-pipeline/intelligence-registry/registry-schema-v1.json
 */

// ============================================================
// Asset Intelligence (full registry entry)
// ============================================================

export interface AssetSource {
  original_path: string | null;
  cutout_path: string | null;
  asset_relationship: string;
}

export interface VisionLayer {
  visible_object: string[];
  visible_features: string[];
  industrial_clues: string[];
  visible_brand: string[];
  image_condition: string;
}

export interface IndustrialClassification {
  asset_type: "equipment" | "component" | "factory" | "consumable" | "unknown";
  system_type: SystemType | null;
  category: string | null;
  subcategory: string | null;
  brand: string | null;
  confidence: number;
  reasoning: string;
  risk_level: "low" | "medium" | "high" | "unknown";
}

export interface SupplyIntelligence {
  buyer_need: string;
  purchase_keywords: string[];
  replacement_scenarios: string[];
  compatible_equipment: string[];
  buyer_questions: string[];
}

export interface SupplierCapability {
  supplier_type: string | null;
  manufacturing_capability: string[];
  industry_scope: string[];
  export_potential: string;
}

export interface SeoLayer {
  seo_topic: string;
  buyer_search_terms: string[];
  landing_pages: string[];
}

export interface AssetStatus {
  review_status: "ready" | "needs_review" | "pending";
  confidence_level: "HIGH" | "MEDIUM" | "LOW";
}

export interface AssetIntelligence {
  asset_id: string;
  asset_source: AssetSource;
  vision: VisionLayer;
  industrial_classification: IndustrialClassification;
  supply_intelligence: SupplyIntelligence;
  supplier_capability: SupplierCapability;
  seo: SeoLayer;
  status: AssetStatus;
}

// ============================================================
// System Types (8 fixed, from taxonomy-v1.json)
// ============================================================

export type SystemType =
  | "Air Compressor Systems"
  | "Hydraulic Systems"
  | "Pneumatic Automation"
  | "Industrial Filtration"
  | "Pumps & Fluid Handling"
  | "Valves & Flow Control"
  | "Mechanical Transmission"
  | "Industrial Automation & Control";

export const ALL_SYSTEM_TYPES: SystemType[] = [
  "Air Compressor Systems",
  "Hydraulic Systems",
  "Pneumatic Automation",
  "Industrial Filtration",
  "Pumps & Fluid Handling",
  "Valves & Flow Control",
  "Mechanical Transmission",
  "Industrial Automation & Control",
];

// ============================================================
// Website Content Types (from website-content/*.json)
// ============================================================

export interface SystemPage {
  system_type: SystemType;
  url_slug: string;
  page_role: string;
  asset_count: number;
  hero_assets: string[];
  support_assets: string[];
  procurement_keywords: string[];
  confidence: "HIGH" | "MIXED";
}

export interface CapabilityPage {
  capability_type: string;
  title: string;
  description: string;
  systems?: SystemCapabilityRef[];
  factory_count?: number;
  factory_brands?: string[];
  assets?: string[];
  systems_covered?: string[];
  trust_role: string;
  usage?: string;
}

export interface SystemCapabilityRef {
  system_type: SystemType;
  supplier_type: string | null;
  asset_count: number;
  export_potential: string;
}

export interface ProcurementPage {
  buyer_problem: string;
  related_systems: SystemType[];
  related_assets: string[];
  solution_page: string;
  request_type: string;
}

export interface SeoPage {
  page_title: string;
  url_slug: string;
  target_keyword: string;
  system_type: SystemType | null;
  related_assets: string[];
  industry_intent: string;
}

// ============================================================
// Asset Placement
// ============================================================

export type PlacementRole =
  | "hero"
  | "system_section"
  | "product_support"
  | "factory_trust"
  | "seo_thumbnail"
  | "needs_review";

export interface AssetPlacement {
  asset_id: string;
  system_type: SystemType | null;
  brand: string | null;
  confidence: AssetStatus["confidence_level"];
  placement_role: PlacementRole;
  target_page: string | null;
}

// ============================================================
// Query Result Types
// ============================================================

export interface SystemPageData {
  page: SystemPage;
  heroAssets: AssetIntelligence[];
  supportAssets: AssetIntelligence[];
  procurementScenarios: ProcurementPage[];
  seoLandingPages: SeoPage[];
}

export interface ProcurementScenarioData {
  scenario: ProcurementPage;
  assets: AssetIntelligence[];
  systemPage: SystemPage | null;
}

export interface SeoLandingData {
  page: SeoPage;
  assets: AssetIntelligence[];
}
