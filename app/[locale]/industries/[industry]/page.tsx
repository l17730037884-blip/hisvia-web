import { notFound } from "next/navigation";
import IndustryPage from "@/components/IndustryPage";
import { industries, getIndustry } from "@/lib/industries";
import type { Locale } from "@/lib/locales";

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export function generateMetadata({ params }: { params: { industry: string } }) {
  const industry = getIndustry(params.industry);
  if (!industry) return {};
  return {
    title: `${industry.name} — China Sourcing Partner — HISVIA`,
    description: industry.solution,
  };
}

export default function Page({ params }: { params: { locale: Locale; industry: string } }) {
  const industry = getIndustry(params.industry);
  if (!industry) notFound();
  return <IndustryPage industry={industry} locale={params.locale} />;
}
