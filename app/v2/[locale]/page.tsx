import type { Locale } from "@/lib/locales";
import V2HomepageBrand from "@/components/v2/V2HomepageBrand";

/* ============================================================
   /v2/[locale] homepage — brand homepage

   Responsibilities (only): Brand · Capability · Trust ·
   Manufacturing process · Industries · Cooperation model · CTA.

   The sourcing workflow (ENTRY → UNDERSTAND → EXPLORE → EVIDENCE
   → VERIFY → CONNECT) lives exclusively at /v2/[locale]/request
   via V2RequestExperience — never rendered on this page.
   ============================================================ */

export default function V2HomePage({ params }: { params: { locale: Locale } }) {
  return <V2HomepageBrand locale={params.locale} />;
}
