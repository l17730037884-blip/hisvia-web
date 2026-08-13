/**
 * HISVIA Sourcing Risk Analysis
 * Identifies and rates supply chain risks for each buyer scenario.
 */

import type { BuyerIntent, SourcingRisk } from "./intent-types";

const RISK_MATRIX: {
  condition: (intent: BuyerIntent) => boolean;
  risk: SourcingRisk;
}[] = [
  {
    condition: (i) => i.pain_points.includes("single_source"),
    risk: {
      type: "brand_dependency",
      level: "high",
      description: "Single supplier dependency creates supply disruption risk",
      mitigation: "Qualify 2-3 alternative manufacturers with equivalent capability",
    },
  },
  {
    condition: (i) => i.decision_factors.includes("certification"),
    risk: {
      type: "certification_gap",
      level: "medium",
      description: "Not all Chinese manufacturers hold international certifications",
      mitigation: "Pre-screen for ISO 9001, CE marking, ASME certification before quoting",
    },
  },
  {
    condition: (i) => i.urgency_level === "high",
    risk: {
      type: "quality_vs_speed",
      level: "high",
      description: "Rushed orders risk incomplete QC — urgent ≠ quality compromise",
      mitigation: "Use pre-vetted express-capable suppliers; accept 10-15% price premium",
    },
  },
  {
    condition: (i) => i.estimated_budget_tier === "small",
    risk: {
      type: "moq_mismatch",
      level: "medium",
      description: "Small trial orders may not meet factory minimum order quantity",
      mitigation: "Negotiate sample terms; consolidate with other buyer orders if possible",
    },
  },
  {
    condition: (i) => i.purchase_type === "oem_request",
    risk: {
      type: "ip_protection",
      level: "medium",
      description: "Custom designs require IP protection when sharing with manufacturers",
      mitigation: "Use NDA before sharing drawings; consider splitting production across suppliers",
    },
  },
  {
    condition: (i) => i.industry_intent === "pharmaceutical" || i.industry_intent === "food_beverage",
    risk: {
      type: "regulatory_compliance",
      level: "high",
      description: "Food/pharma applications require strict material traceability and FDA/GMP compliance",
      mitigation: "Require full material certification, FDA registration, or GMP documentation",
    },
  },
  {
    condition: () => true,
    risk: {
      type: "logistics_complexity",
      level: "low",
      description: "International shipping involves customs, duties, and documentation",
      mitigation: "Use experienced freight forwarders; prepare HS codes and commercial invoice in advance",
    },
  },
];

export function analyzeSourcingRisk(intent: BuyerIntent): SourcingRisk[] {
  return RISK_MATRIX
    .filter((entry) => entry.condition(intent))
    .map((entry) => entry.risk);
}
