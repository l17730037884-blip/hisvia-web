/**
 * HISVIA Supplier Scoring Engine
 * Calculates 0-100 match quality score between buyer requirement and factory.
 *
 * Weights:
 *   Capability match:  35%
 *   Product match:     25%
 *   Quality system:    15%
 *   Export capability: 15%
 *   Delivery:          10%
 */

import type { FactoryProfile, SupplierScore } from "./supplier-types";
import type { BuyerRequirement } from "../buyer/buyer-types";

export function calculateSupplierScore(
  factory: FactoryProfile,
  requirement: BuyerRequirement
): SupplierScore {
  // 1. Capability match (0-35)
  let capability_score = 0;
  if (requirement.system_type) {
    const sysMatch = factory.system_capability.includes(requirement.system_type as any);
    if (sysMatch) capability_score = 35;
    else {
      // Partial: check if any system overlaps
      const reqSystem = requirement.system_type;
      const overlap = factory.system_capability.some((s) => {
        // Adjacent systems (e.g., Air Compressor ↔ Industrial Filtration)
        const adjacent: Record<string, string[]> = {
          "Air Compressor Systems": ["Industrial Filtration"],
          "Industrial Filtration": ["Air Compressor Systems", "Hydraulic Systems"],
          "Hydraulic Systems": ["Valves & Flow Control", "Mechanical Transmission"],
          "Pneumatic Automation": ["Industrial Automation & Control"],
        };
        return (adjacent[reqSystem] || []).includes(s) || (adjacent[s] || []).includes(reqSystem);
      });
      if (overlap) capability_score = 15;
    }
  }

  // 2. Product match (0-25)
  let product_score = 0;
  const desc = requirement.description.toLowerCase();
  const matchedProducts = factory.product_capability.filter((p) => {
    const words = p.toLowerCase().split(/[\s/]+/);
    return words.some((w) => w.length > 3 && desc.includes(w));
  });
  product_score = Math.min(matchedProducts.length * 8, 25);

  // 3. Quality system (0-15)
  let quality_score = 0;
  if (factory.quality_control.iso_certified) quality_score += 8;
  if (factory.certifications.length >= 2) quality_score += 4;
  if (factory.quality_control.has_inspection_lab) quality_score += 3;
  quality_score = Math.min(quality_score, 15);

  // 4. Export capability (0-15)
  let export_score = 0;
  if (factory.export_experience.years >= 10) export_score += 6;
  else if (factory.export_experience.years >= 5) export_score += 3;
  if (factory.export_experience.export_volume_pct >= 50) export_score += 5;
  if (factory.export_experience.top_markets.length >= 3) export_score += 4;
  export_score = Math.min(export_score, 15);

  // 5. Delivery (0-10)
  let delivery_score = 0;
  if (factory.lead_time.production_days <= 15) delivery_score += 5;
  else if (factory.lead_time.production_days <= 25) delivery_score += 3;
  if (factory.lead_time.express_available) delivery_score += 3;
  if (factory.moq.sample_order_available) delivery_score += 2;
  delivery_score = Math.min(delivery_score, 10);

  const total = capability_score + product_score + quality_score + export_score + delivery_score;

  let level: "HIGH" | "MEDIUM" | "LOW" = "LOW";
  if (total >= 70) level = "HIGH";
  else if (total >= 45) level = "MEDIUM";

  return {
    capability_score,
    product_score,
    quality_score,
    export_score,
    delivery_score,
    total,
    level,
  };
}
