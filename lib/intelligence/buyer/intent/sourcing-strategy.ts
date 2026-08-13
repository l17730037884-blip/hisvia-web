/**
 * HISVIA Sourcing Strategy Generator
 * Maps buyer intent → recommended sourcing path.
 */

import type { BuyerIntent, SourcingStrategy } from "./intent-types";

export interface StrategyRecommendation {
  primary: SourcingStrategy;
  alternatives: SourcingStrategy[];
  approach: string;
  timeline: string;
  key_actions: string[];
}

const STRATEGY_PLAYBOOK: Record<SourcingStrategy, Omit<StrategyRecommendation, "primary" | "alternatives">> = {
  direct_factory: {
    approach: "Connect directly with verified Chinese manufacturers",
    timeline: "2-4 weeks from inquiry to first shipment",
    key_actions: [
      "Identify 2-3 manufacturers with matching capability",
      "Request factory audit report or arrange video tour",
      "Negotiate directly on price, MOQ, and payment terms",
      "Arrange pre-shipment inspection",
    ],
  },
  replacement_search: {
    approach: "Find compatible replacement parts from alternative suppliers",
    timeline: "1-3 weeks for sample qualification",
    key_actions: [
      "Submit part number/specification for cross-reference matching",
      "Request technical datasheet and material certificate",
      "Order samples for fitment testing",
      "Confirm compatibility before bulk order",
    ],
  },
  oem_customization: {
    approach: "Custom manufacturing to your specifications",
    timeline: "4-8 weeks from drawing to prototype",
    key_actions: [
      "Share technical drawings, 3D models, or sample part",
      "Define material, tolerance, and surface treatment requirements",
      "Review prototype and provide feedback",
      "Finalize production timeline and QC plan",
    ],
  },
  multi_supplier: {
    approach: "Compare multiple suppliers on price, quality, and terms",
    timeline: "2-3 weeks for supplier comparison",
    key_actions: [
      "Send identical RFQ to 3-5 qualified suppliers",
      "Compare quotes on total cost (product + shipping + duties)",
      "Evaluate supplier capability and certifications",
      "Select best-fit supplier and negotiate",
    ],
  },
  urgent_fulfillment: {
    approach: "Expedited sourcing with pre-vetted ready-stock suppliers",
    timeline: "24-72 hours for stock confirmation, 3-7 days express shipping",
    key_actions: [
      "Check ready-stock availability with partner suppliers",
      "Confirm express shipping option (DHL/FedEx/UPS)",
      "Prioritize suppliers with existing export documentation",
      "Accept slight price premium for speed",
    ],
  },
  long_term_partner: {
    approach: "Strategic partnership for ongoing supply and support",
    timeline: "4-12 weeks for partnership setup",
    key_actions: [
      "Conduct factory audit (on-site or virtual)",
      "Negotiate annual framework agreement with pricing tiers",
      "Set up quality assurance protocol and inspection schedule",
      "Establish direct communication channel with factory engineer",
    ],
  },
};

export function generateSourcingStrategy(
  intent: BuyerIntent
): StrategyRecommendation {
  const primary = intent.recommended_strategies[0] || "replacement_search";
  const alternatives = intent.recommended_strategies.slice(1, 3);

  const playbook = STRATEGY_PLAYBOOK[primary];

  return {
    primary,
    alternatives,
    ...playbook,
  };
}
