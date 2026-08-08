import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead, PrimaryButton } from "@/components/ui";
import { partCategories } from "@/lib/parts";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Industrial Replacement Parts Database — HISVIA",
  description: "Find compatible replacement components for compressors, hydraulics, mechanical systems, and industrial consumables from verified Chinese manufacturers.",
};

export function generateStaticParams() {
  return [];
}

export default function PartsPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <main className="mx-auto max-w-wrap px-6 py-16">
      <SectionHead
        kicker="Parts Database"
        title="Industrial Replacement Components"
        description="Browse by component category. Every part sourced from verified Chinese manufacturers with technical matching and quality verification."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {partCategories.map((c) => (
          <Link key={c.slug} href={`${base}/parts/${c.slug}`} className="group rounded border border-line bg-white p-6 transition-shadow hover:shadow-md">
            <h2 className="text-[18px] font-bold text-navy group-hover:text-amber">{c.name}</h2>
            <p className="mt-2 text-[13px] text-graphite">{c.tagline}</p>
            <span className="mt-3 inline-block text-[12px] font-medium text-amber">Browse components →</span>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center">
        <PrimaryButton href={`${base}${routes.request}`}>Submit Technical Requirement →</PrimaryButton>
      </div>
    </main>
  );
}
