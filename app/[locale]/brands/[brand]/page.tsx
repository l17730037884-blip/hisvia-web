import { notFound } from "next/navigation";
import BrandPage from "@/components/BrandPage";
import { brands, getBrand } from "@/lib/brands";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: { brand: string; locale: string } }) {
  const brand = getBrand(params.brand);
  if (!brand) return {};
  const d = pageT[params.locale as Locale].detail;
  const seriesNames = brand.series.map((s) => s.name).join(", ");
  return {
    title: `${brand.name} ${d.brandHeroSuffix} — HISVIA`,
    description: `${brand.tagline} ${seriesNames}.`,
  };
}

export default function Page({ params }: { params: { locale: Locale; brand: string } }) {
  const brand = getBrand(params.brand);
  if (!brand) notFound();
  return <BrandPage brand={brand} locale={params.locale} />;
}
