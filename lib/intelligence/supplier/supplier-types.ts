/**
 * HISVIA Supplier Intelligence Types — Phase 12
 * Chinese factory/supplier capability profiles.
 */

import type { SystemType } from "../types";

// ============================================================
// Factory Profile
// ============================================================

export interface FactoryProfile {
  factory_id: string;
  company_name: string;
  location: string;
  region: string;
  industry: string;
  system_capability: SystemType[];
  product_capability: string[];
  manufacturing_process: ManufacturingProcess[];
  equipment_capability: string[];
  certifications: Certification[];
  export_experience: ExportExperience;
  production_capacity: ProductionCapacity;
  quality_control: QualityControl;
  lead_time: LeadTime;
  moq: MOQ;
}

export type ManufacturingProcess =
  | "cnc_machining"
  | "casting"
  | "forging"
  | "stamping"
  | "injection_molding"
  | "welding"
  | "assembly"
  | "testing"
  | "surface_treatment"
  | "customization";

export interface Certification {
  name: string;
  body: string;
  valid_until?: string;
}

export interface ExportExperience {
  years: number;
  top_markets: string[];
  export_volume_pct: number;
}

export interface ProductionCapacity {
  monthly_units: string;
  factory_size_sqm: number;
  employee_count: number;
  shifts_per_day: number;
}

export interface QualityControl {
  has_inspection_lab: boolean;
  inspection_methods: string[];
  defect_rate: string;
  iso_certified: boolean;
}

export interface LeadTime {
  sample_days: number;
  production_days: number;
  express_available: boolean;
}

export interface MOQ {
  standard_units: number;
  negotiable: boolean;
  sample_order_available: boolean;
}

// ============================================================
// Capability Profile (aggregated)
// ============================================================

export interface CapabilityProfile {
  systems_covered: SystemType[];
  total_products: number;
  manufacturing_processes: ManufacturingProcess[];
  certification_count: number;
  export_markets: string[];
  avg_lead_time_days: number;
  avg_moq: number;
}

// ============================================================
// Supplier Score
// ============================================================

export interface SupplierScore {
  capability_score: number;   // 0-35
  product_score: number;      // 0-25
  quality_score: number;      // 0-15
  export_score: number;       // 0-15
  delivery_score: number;     // 0-10
  total: number;              // 0-100
  level: "HIGH" | "MEDIUM" | "LOW";
}

// ============================================================
// Supplier Risk
// ============================================================

export interface SupplierRisk {
  type: string;
  level: "high" | "medium" | "low";
  description: string;
  mitigation: string;
}

// ============================================================
// Match Result
// ============================================================

export interface SupplierMatch {
  factory: FactoryProfile;
  score: SupplierScore;
  matching_reasons: string[];
  risks: SupplierRisk[];
}
