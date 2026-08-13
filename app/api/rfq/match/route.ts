/**
 * HISVIA RFQ Matching API — Phase 15
 * POST /api/rfq/match
 *
 * Buyer submits requirement → engine matches against intelligence registry.
 * No auto-quote. No supply promises.
 */

import { NextResponse } from "next/server";
import { matchBuyerRequirement } from "@/lib/intelligence/buyer/matching-engine";
import { parseRequirement } from "@/lib/intelligence/buyer/requirement-parser";
import { getAssetsBySystem, getAvailableSystems } from "@/lib/intelligence/registry-loader";
import type { BuyerRequirement, MatchResult } from "@/lib/intelligence/buyer/buyer-types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const country = String(body.country || "").trim();
    const description = String(body.description || body.message || "").trim();

    if (!country && !description) {
      return NextResponse.json(
        { error: "Country and description are required" },
        { status: 400 }
      );
    }

    // Build requirement
    const requirement: BuyerRequirement = {
      id: `RFQ-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      country: country || "Unknown",
      industry: String(body.industry || "").trim(),
      system_type: body.system_type || null,
      product_category: String(body.product_category || "").trim() || null,
      brand: String(body.brand || body.equipmentBrand || "").trim() || null,
      part_number: String(body.partNumber || body.part_number || "").trim() || null,
      application: String(body.application || "").trim(),
      quantity: String(body.quantity || "").trim(),
      urgency: ["low", "medium", "high"].includes(body.urgency) ? body.urgency : "medium",
      description,
    };

    // Run matching engine
    const result: MatchResult = matchBuyerRequirement(requirement);

    // Parse description for additional insights
    const parsed = description ? parseRequirement(description) : null;

    // Build recommendations (no auto-quote)
    const recommendations = result.matched_systems.slice(0, 3).map((sys) => ({
      system: sys.system_type,
      matchScore: sys.score,
      assetCount: sys.asset_count,
      procurementScenarios: sys.procurement_scenarios.slice(0, 3),
    }));

    // Identify missing information
    const missingInfo: string[] = [];
    if (!requirement.brand) missingInfo.push("brand");
    if (!requirement.part_number) missingInfo.push("part_number");
    if (!requirement.quantity) missingInfo.push("quantity");
    if (!requirement.industry) missingInfo.push("industry");

    return NextResponse.json({
      rfq_id: requirement.id,
      status: "analyzed",
      parsed_requirement: parsed
        ? {
            system_type: parsed.system_type,
            system_confidence: parsed.system_confidence,
            category: parsed.category,
            brand: parsed.brand,
            industry: parsed.industry,
            keywords: parsed.keywords,
          }
        : null,
      matched_systems: recommendations,
      matched_assets_count: result.matched_assets.length,
      top_matches: result.matched_assets.slice(0, 5).map((m) => ({
        asset_id: m.asset_id,
        score: m.score,
        reasons: m.match_reasons,
      })),
      missing_information: missingInfo,
      capability_match: result.matched_capability
        ? {
            supplier_type: result.matched_capability.supplier_type,
            export_potential: result.matched_capability.export_potential,
          }
        : null,
      disclaimer:
        "This is an automated analysis. HISVIA does not auto-quote or guarantee supply. A specialist will review your request.",
    });
  } catch (error) {
    console.error("[RFQ Match Error]", error);
    return NextResponse.json(
      { error: "Internal analysis failed. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  const systems = getAvailableSystems();
  return NextResponse.json({
    status: "ok",
    available_systems: systems.length,
    systems: systems,
    phase: 15,
  });
}
