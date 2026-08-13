import { notFound } from "next/navigation";
import IndustryPage from "@/components/IndustryPage";
import { industries, getIndustry } from "@/lib/industries";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: { params: { industry: string; locale: string } }) {
  const industry = getIndustry(params.industry);
  if (!industry) return {};
  const d = pageT[params.locale as Locale].detail;
  return {
    title: `${industry.name} — HISVIA`,
    description: `${d.whatWeProvide} ${industry.solution}`.slice(0, 160),
  };
}

export default function Page({ params }: { params: { locale: Locale; industry: string } }) {
  const industry = getIndustry(params.industry);
  if (!industry) notFound();
  return <IndustryPage industry={industry} locale={params.locale} />;
}
