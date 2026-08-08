import { notFound } from "next/navigation";
import BrandPage from "@/components/BrandPage";
import { brands, getBrand } from "@/lib/brands";
import type { Locale } from "@/lib/locales";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: { brand: string; locale: string } }) {
  const brand = getBrand(params.brand);
  if (!brand) return {};
  const seriesNames = brand.series.map((s) => s.name).join(", ");
  return {
    title: `${brand.name} Compatible Replacement Parts — HISVIA`,
    description: `Source compatible replacement parts for ${brand.name} equipment from verified Chinese manufacturers. Supported: ${seriesNames}.`,
  };
}

export default function Page({ params }: { params: { locale: Locale; brand: string } }) {
  const brand = getBrand(params.brand);
  if (!brand) notFound();
  return <BrandPage brand={brand} locale={params.locale} />;
}
