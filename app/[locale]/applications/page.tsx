import Link from "next/link";
import type { Metadata } from "next";
import { SectionHead } from "@/components/ui";
import { applications } from "@/lib/applications";
import type { Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Industrial Supply Chain Solutions By Application — HISVIA",
  description: "Targeted sourcing solutions for compressor service, industrial distributors, mining maintenance, rental equipment, and factory maintenance.",
};

export default function ApplicationsPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <main className="mx-auto max-w-wrap px-6 py-16">
      <SectionHead kicker="Applications" title="Industrial Sourcing Solutions" description="Targeted approaches for different industrial roles — each with specific pain points addressed and measurable outcomes." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((a) => (
          <Link key={a.slug} href={`${base}/applications/${a.slug}`} className="group rounded border border-line bg-white p-6 transition-shadow hover:shadow-md">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-amber">{a.audience}</p>
            <h2 className="text-[17px] font-bold text-navy group-hover:text-amber">{a.name}</h2>
            <p className="mt-2 text-[12.5px] text-graphite line-clamp-3">{a.solution}</p>
            <span className="mt-3 inline-block text-[12px] font-medium text-amber">View solution →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
