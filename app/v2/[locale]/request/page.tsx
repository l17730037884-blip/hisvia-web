import type { Locale } from "@/lib/locales";
import V2RequestExperience from "@/components/v2/V2RequestExperience";

/* ============================================================
   /v2/[locale]/request — the single sourcing workflow

   Owns the entire procurement experience:
   ENTRY → UNDERSTAND → EXPLORE → EVIDENCE → VERIFY → CONNECT.

   The brand homepage (/v2/[locale]) is a separate component
   (V2HomepageBrand) and never renders this workflow.
   RFQ submission posts to /api/rfq (real database write).
   ============================================================ */

export default function V2RequestPage({ params }: { params: { locale: Locale } }) {
  return <V2RequestExperience locale={params.locale} />;
}
