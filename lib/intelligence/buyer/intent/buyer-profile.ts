/**
 * HISVIA Buyer Profile Generator
 * Infers buyer type and preferences from requirement data.
 */

import type { BuyerProfile, IndustryIntent } from "./intent-types";
import type { BuyerRequirement } from "../buyer-types";

const COUNTRY_PROFILES: Record<string, Partial<BuyerProfile>> = {
  russia: { buyer_type: "distributor", preferred_communication: "email", certification_required: true },
  kazakhstan: { buyer_type: "distributor", preferred_communication: "whatsapp" },
  uae: { buyer_type: "trader", preferred_communication: "whatsapp", certification_required: true },
  vietnam: { buyer_type: "end_user", preferred_communication: "wechat" },
  india: { buyer_type: "distributor", preferred_communication: "whatsapp" },
  brazil: { buyer_type: "distributor", preferred_communication: "email", certification_required: true },
  nigeria: { buyer_type: "distributor", preferred_communication: "whatsapp" },
  turkey: { buyer_type: "end_user", preferred_communication: "whatsapp", certification_required: true },
  mexico: { buyer_type: "end_user", preferred_communication: "email" },
  indonesia: { buyer_type: "distributor", preferred_communication: "whatsapp" },
  germany: { buyer_type: "oem", preferred_communication: "email", certification_required: true },
  uk: { buyer_type: "distributor", preferred_communication: "email", certification_required: true },
  usa: { buyer_type: "distributor", preferred_communication: "email", certification_required: true },
  south_africa: { buyer_type: "distributor", preferred_communication: "whatsapp" },
  egypt: { buyer_type: "trader", preferred_communication: "whatsapp" },
};

export function generateBuyerProfile(
  requirement: BuyerRequirement,
  industryIntent: IndustryIntent
): BuyerProfile {
  const country = requirement.country.toLowerCase().replace(/\s+/g, "_");
  const countryProfile = COUNTRY_PROFILES[country] || {
    buyer_type: "distributor" as const,
    preferred_communication: "email" as const,
  };

  const qty = requirement.quantity.toLowerCase();
  let orderSize: "small" | "medium" | "large" = "medium";
  if (qty.includes("sample") || qty.includes("trial") || qty.includes("1") || qty.includes("few")) {
    orderSize = "small";
  } else if (qty.includes("container") || qty.includes("bulk") || qty.includes("ton")) {
    orderSize = "large";
  }

  return {
    country: requirement.country,
    buyer_type: countryProfile.buyer_type || "distributor",
    industry_focus: [industryIntent],
    typical_order_size: orderSize,
    certification_required: countryProfile.certification_required || false,
    preferred_communication: countryProfile.preferred_communication || "email",
  };
}
