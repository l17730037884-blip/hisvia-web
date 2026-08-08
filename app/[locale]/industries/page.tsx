import { SectionHead } from "@/components/ui";
import { routes } from "@/lib/routes";
import { industries } from "@/lib/industries";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Industrial Applications — HISVIA",
  description: "How HISVIA supports compressor service companies, mining maintenance, industrial distributors, factory maintenance, and rental equipment companies.",
};

export default function IndustriesIndex({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Industrial Applications"
            title="Sourcing support built around how you actually work."
            description="Find the scenario closest to yours."
          />
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {industries.map((i) => (
              <a key={i.slug} href={`${base}${routes.industry(i.slug)}`} className="bg-white p-8 hover:bg-fog">
                <h3 className="mb-2 text-lg font-bold text-navy">{i.name}</h3>
                <p className="text-sm text-graphite">{i.problem}</p>
                <span className="mt-3 inline-block font-mono text-[11.5px] text-amber">Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
