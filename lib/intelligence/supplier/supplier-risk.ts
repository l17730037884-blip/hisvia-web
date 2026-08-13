/**
 * HISVIA Supplier Risk Analyzer
 * Identifies risks for each factory-buyer match.
 */

import type { FactoryProfile, SupplierRisk } from "./supplier-types";
import type { BuyerRequirement } from "../buyer/buyer-types";

export function analyzeSupplierRisk(
  factory: FactoryProfile,
  requirement: BuyerRequirement
): SupplierRisk[] {
  const risks: SupplierRisk[] = [];

  // Certification gap
  if (requirement.industry === "Pharmaceutical" || requirement.industry === "Food & Beverage") {
    const hasGMP = factory.certifications.some((c) =>
      c.name.includes("GMP") || c.name.includes("FDA")
    );
    if (!hasGMP) {
      risks.push({
        type: "certification_missing",
        level: "high",
        description: `Factory lacks GMP/FDA certification required for ${requirement.industry}`,
        mitigation: "Request material traceability documentation; consider factory with pharma/food certification",
      });
    }
  }

  if (requirement.industry === "Oil & Gas") {
    const hasAPI = factory.certifications.some((c) =>
      c.name.includes("API") || c.name.includes("ASME")
    );
    if (!hasAPI) {
      risks.push({
        type: "certification_missing",
        level: "medium",
        description: "Oil & Gas application may require API/ASME certification",
        mitigation: "Verify if API certification is contractually required; check alternative standards",
      });
    }
  }

  // Export experience gap
  const buyerCountry = requirement.country.toLowerCase();
  const hasExportToRegion = factory.export_experience.top_markets.some((m) => {
    const regionMap: Record<string, string[]> = {
      russia: ["Russia", "CIS", "Europe"],
      kazakhstan: ["CIS", "Russia", "Central Asia"],
      uae: ["Middle East"],
      vietnam: ["Southeast Asia"],
      india: ["India", "South Asia"],
      brazil: ["South America", "Americas"],
      nigeria: ["Africa"],
      turkey: ["Middle East", "Europe"],
      mexico: ["Americas"],
      indonesia: ["Southeast Asia"],
      germany: ["Europe"],
      egypt: ["Middle East", "Africa"],
      "south africa": ["Africa"],
      uk: ["Europe"],
      usa: ["Americas"],
    };
    const regions = regionMap[buyerCountry] || [buyerCountry];
    return regions.some((r) => m.includes(r));
  });

  if (!hasExportToRegion && factory.export_experience.years < 3) {
    risks.push({
      type: "export_unknown",
      level: "medium",
      description: `Limited export experience to ${requirement.country} region`,
      mitigation: "Request export references; start with small trial order",
    });
  }

  // Capacity risk
  if (requirement.urgency === "high" && factory.lead_time.production_days > 25) {
    risks.push({
      type: "capacity_unknown",
      level: "high",
      description: `Factory lead time (${factory.lead_time.production_days} days) may not meet urgent timeline`,
      mitigation: "Ask about express production slot availability; consider factory with shorter lead time",
    });
  }

  // Quality risk
  if (requirement.description.toLowerCase().includes("premium") ||
      requirement.description.toLowerCase().includes("high quality") ||
      requirement.description.toLowerCase().includes("certified")) {
    if (!factory.quality_control.iso_certified) {
      risks.push({
        type: "quality_unknown",
        level: "high",
        description: "Buyer requires high quality but factory lacks ISO certification",
        mitigation: "Request third-party inspection report; verify with reference customers",
      });
    }
  }

  // MOQ risk
  const qtyStr = requirement.quantity.toLowerCase();
  const isSmallOrder = qtyStr.includes("sample") || qtyStr.includes("trial") ||
    qtyStr.includes("1") || qtyStr.includes("few") || qtyStr.includes("small");
  if (isSmallOrder && !factory.moq.sample_order_available && factory.moq.standard_units > 20) {
    risks.push({
      type: "moq_conflict",
      level: "medium",
      description: `Buyer wants small order but factory MOQ is ${factory.moq.standard_units} units`,
      mitigation: "Negotiate sample terms or consolidate with other buyer orders",
    });
  }

  return risks;
}
