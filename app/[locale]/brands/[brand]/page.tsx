import { notFound } from "next/navigation";
import BrandPage from "@/components/BrandPage";
import { brands, getBrand } from "@/lib/brands";
import type { Locale } from "@/lib/locales";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export function generateMetadata({ params }: { params: { brand: string } }) {
  const brand = getBrand(params.brand);
  if (!brand) return {};
  return {
    title: `${brand.name} Replacement Parts China — HISVIA`,
    description: `Compatible replacement parts for ${brand.name} equipment, sourced from verified Chinese manufacturers. Supported series: ${brand.series.join(", ")}.`,
  };
}

export default function Page({ params }: { params: { locale: Locale; brand: string } }) {
  const brand = getBrand(params.brand);
  if (!brand) notFound();
  return <BrandPage brand={brand} locale={params.locale} />;
}
