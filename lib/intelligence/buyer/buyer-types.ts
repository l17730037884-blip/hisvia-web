/**
 * HISVIA Buyer Intelligence Engine — Types
 * Phase 10: Buyer requirement → China supply chain matching
 */

import type { SystemType } from "../types";

// ============================================================
// Buyer Requirement
// ============================================================

export interface BuyerRequirement {
  id: string;
  country: string;
  industry: string;
  system_type: SystemType | null;
  product_category: string | null;
  brand: string | null;
  part_number: string | null;
  application: string;
  quantity: string;
  urgency: "low" | "medium" | "high";
  description: string;
}

// ============================================================
// Parsed Requirement (from natural language)
// ============================================================

export interface ParsedRequirement {
  system_type: SystemType | null;
  system_confidence: number;
  category: string | null;
  category_confidence: number;
  brand: string | null;
  brand_confidence: number;
  industry: string | null;
  industry_confidence: number;
  keywords: string[];
  raw_description: string;
}

// ============================================================
// Match Result
// ============================================================

export interface AssetMatch {
  asset_id: string;
  score: number;
  match_reasons: string[];
}

export interface SystemMatch {
  system_type: SystemType;
  score: number;
  asset_count: number;
  procurement_scenarios: string[];
}

export interface MatchResult {
  requirement: BuyerRequirement;
  parsed: ParsedRequirement;
  matched_systems: SystemMatch[];
  matched_assets: AssetMatch[];
  matched_capability: {
    supplier_type: string;
    export_potential: string;
    industry_scope: string[];
  } | null;
  seo_pages: string[];
  confidence: "HIGH" | "MEDIUM" | "LOW";
  summary: string;
}

// ============================================================
// Buyer Score (how good a match is)
// ============================================================

export interface BuyerScore {
  system_score: number;    // 0-40
  category_score: number;  // 0-25
  brand_score: number;     // 0-15
  application_score: number; // 0-10
  keyword_score: number;   // 0-10
  total: number;           // 0-100
}
