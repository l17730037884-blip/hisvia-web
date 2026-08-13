import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/locales";
import V2ReplacementExperience from "@/components/v2/V2ReplacementExperience";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

export const metadata: Metadata = {
  title: "Replacement Solutions — HISVIA",
  description:
    "Cross-reference original industrial equipment against compatible replacement components manufactured to your specifications by qualified Chinese manufacturers.",
};

export default function ReplacementPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return <V2ReplacementExperience locale={locale} />;
}
