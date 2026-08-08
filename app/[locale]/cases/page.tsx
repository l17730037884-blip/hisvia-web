import { SectionHead } from "@/components/ui";
import { routes } from "@/lib/routes";
import { cases } from "@/lib/cases";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Representative Examples — HISVIA",
  description: "Representative sourcing examples showing how HISVIA matches Russian industrial partners with Chinese manufacturing resources.",
};

export default function CasesIndex({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Representative Examples"
            title="How sourcing requests like these get resolved."
            description="These are representative examples of the kind of requirement HISVIA handles, not case studies of a specific named client."
          />
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-px border border-line bg-line">
            {cases.map((c) => (
              <a key={c.slug} href={`${base}${routes.case(c.slug)}`} className="bg-white p-8 hover:bg-fog">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-steel">Representative Example</p>
                <h3 className="mb-2 text-lg font-bold text-navy">{c.title}</h3>
                <span className="font-mono text-[11.5px] text-amber">Read the example →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
