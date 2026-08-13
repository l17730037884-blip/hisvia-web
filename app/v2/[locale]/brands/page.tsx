import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/locales";
import { getBrandGroups, getProductFamilies } from "@/lib/content-v2/asset-selector";
import V2BrandsExperience from "@/components/v2/V2BrandsExperience";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

export const metadata: Metadata = {
  title: "Brands & Replacement — HISVIA",
  description:
    "Compatible industrial replacement components sourced from qualified Chinese manufacturers. Cross-reference compressor, hydraulic, pump, and automation brands.",
};

export default function BrandsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const groups = getBrandGroups();
  const families = getProductFamilies();

  return (
    <V2BrandsExperience
      locale={locale}
      groups={groups}
      families={families}
    />
  );
}
