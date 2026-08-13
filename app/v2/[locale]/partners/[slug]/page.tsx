import { notFound } from "next/navigation";
import type { Locale } from "@/lib/locales";
import { getPartnerTypes } from "@/lib/content-v2/content-loader";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import V2PartnersExperience from "@/components/v2/V2PartnersExperience";

/* ============================================================
   /v2/[locale]/partners/[slug] — A-system page (Phase 12)
   Curated factory imagery only (partner_network _docx assets
   are intentionally excluded). Cooperation data is real
   (partner-pages.json); no fabricated partner claims.
   ============================================================ */

const HERO_BY_PARTNER: Record<string, string> = {
  distributor: "asset-bffdca5e",
  service_center: "asset-b3fe41a2",
  regional_agent: "asset-68a3b048",
};

export default function V2PartnerPage({ params }: { params: { locale: Locale; slug: string } }) {
  const partner = getPartnerTypes().find((p) => p.id === params.slug || p.route.endsWith(`/${params.slug}`));
  if (!partner) return notFound();

  return (
    <V2PartnersExperience
      locale={params.locale}
      partner={partner}
      allTypes={getPartnerTypes()}
      heroAsset={resolveAsset(HERO_BY_PARTNER[partner.id])}
    />
  );
}
