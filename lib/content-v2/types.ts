/**
 * HISVIA Asset Library V2 — Types
 * Canonical type definitions shared across the asset system.
 */

// ============================================================
// Asset Entry (matches asset-library-v2.json schema)
// ============================================================

export type AssetType =
  | "brand_machine"
  | "brand_component"
  | "equipment_machine"
  | "component_part"
  | "factory_exterior"
  | "factory_interior"
  | "production_line"
  | "worker_operation"
  | "warehouse_logistics"
  | "laboratory"
  | "technical_component"
  | "industrial_scene";

export type VisualRole =
  | "hero_main"
  | "hero_support"
  | "system_showcase"
  | "trust_evidence"
  | "factory_proof"
  | "manufacturing_strength"
  | "solution_application"
  | "brand_partner"
  | "technical_detail"
  | "customer_trust";

export type CompositionType =
  | "full_bleed"
  | "wide_banner"
  | "standard_landscape"
  | "square"
  | "portrait"
  | "product_centered"
  | "detail_closeup";

export interface AssetEntry {
  asset_id: string;
  filename: string;
  path: string;
  source_group: string;
  aliases?: string[];

  // Technology
  width?: number;
  height?: number;
  format: string;
  file_size_kb?: number;
  is_transparent?: boolean;
  has_cutout?: boolean;
  cutout_path?: string | null;

  // Visual
  asset_type: AssetType;
  visual_role: VisualRole;
  composition?: CompositionType;

  // Quality
  quality_score?: number | null;
  hero_suitability?: number | null;

  // Placement
  allowed_sections?: string[];
  forbidden_sections?: string[];
  recommended_pages?: string[];
  component_usage?: string[];
  priority?: number | null;
  usage?: string;

  // Business
  industrial_message?: string;
  buyer_perception?: string;
  buyer_stage?: string[];
  buyer_need?: string;
  purchase_keywords?: string[];
  commercial_value?: string;

  // Brand/System
  brand?: string | null;
  system_type?: string | null;
  category?: string | null;
  subcategory?: string | null;

  // Verification
  source_registries: string[];
  ai_classified: boolean;
  ai_confidence?: number | null;
  verified_by: string;
  review_status?: string | null;
  derived_roles?: string[];
}

// ============================================================
// Alias Map
// ============================================================

export interface AliasEntry {
  canonical_id: string;
  filename: string;
  img_id: string | null;
  legacy_paths: string[];
  source_registries: string[];
}

// ============================================================
// Slot Rules (from visual-placement-engine)
// ============================================================

export interface SlotRule {
  slot: string;
  page: string;
  purpose: string;
  allowed_visual_types?: string[];
  forbidden_visual_types?: string[];
  min_quality?: number;
  min_width?: number;
}

// ============================================================
// Section Mapping (from homepage-v2)
// ============================================================

export interface SectionMappingAsset {
  asset_id: string | null;
  role: string | null;
  score: number | null;
}

export interface SectionMapping {
  section: string;
  title: string;
  assets: SectionMappingAsset[];
}

// ============================================================
// API Input Types
// ============================================================

export interface SlotRequest {
  page: string;
  slot: string;
  purpose?: string;
  excludeIds?: string[];
  count?: number;
  debug?: boolean;
}

export interface AssetQuery {
  asset_type?: AssetType | AssetType[];
  visual_role?: VisualRole | VisualRole[];
  brand?: string;
  system_type?: string;
  category?: string;
  min_quality?: number;
  min_hero_suitability?: number;
  transparent_background?: boolean;
  has_cutout?: boolean;
  allowed_section?: string;
  forbidden_section?: string;
  recommended_page?: string;
  composition?: CompositionType | CompositionType[];
  sort_by?: "quality_score" | "hero_suitability" | "priority" | "slot_match";
  limit?: number;
  excludeIds?: string[];
}

// ============================================================
// API Output Types
// ============================================================

export interface SlotResult {
  status: "found" | "fallback" | "empty";
  asset: AssetEntry | null;
  score: number;
  candidates: AssetEntry[];
  debug?: SlotDebugInfo;
}

export interface SlotDebugInfo {
  total_candidates: number;
  rejected: RejectedCandidate[];
  scoring: {
    slot_match: number;
    role_match: number;
    quality_bonus: number;
    priority_bonus: number;
    total: number;
  };
}

export interface RejectedCandidate {
  asset_id: string;
  filename: string;
  reason: string;
  score: number;
}

// ============================================================
// Asset Library Top-Level
// ============================================================

export interface AssetLibrary {
  version: string;
  generated_at: string;
  total_assets: number;
  migration_map: AliasEntry[];
  assets: AssetEntry[];
  slot_rules: SlotRule[];
  section_map: SectionMapping[];
}
