import { SectionHead, PrimaryButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Industry } from "@/lib/industries";
import { cases } from "@/lib/cases";

const flowSteps = [
  { n: "01", title: "Customer Demand", body: "Partner submits equipment details and technical requirements." },
  { n: "02", title: "Technical Analysis", body: "HISVIA reviews specifications and identifies matching solutions." },
  { n: "03", title: "Manufacturer Matching", body: "Suitable Chinese manufacturers are identified from our network." },
  { n: "04", title: "Quality Confirmation", body: "Samples, documentation, and specifications are verified." },
  { n: "05", title: "Purchase Coordination", body: "Ordering, production tracking, and communication are managed." },
  { n: "06", title: "Delivery", body: "Export documentation and logistics coordinated to destination." },
];

export default function IndustryPage({ industry, locale }: { industry: Industry; locale: string }) {
  const base = `/${locale}`;
  const relatedCase = cases[0];

  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker="Industrial Applications" title={industry.name} description={industry.problem} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="max-w-2xl border-l-2 border-amber bg-fog px-6 py-5 text-[14px] text-graphite">
            <strong className="text-navy">What HISVIA provides: </strong>
            {industry.solution}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-8 font-mono text-xs uppercase tracking-wide text-steel">Partnership Process</p>
          <div className="flex flex-col border-y border-line md:flex-row">
            {flowSteps.map((s) => (
              <div key={s.n} className="flex-1 border-b border-line bg-white p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 card-hover">
                <div className="mb-2.5 font-mono text-[11px] text-amber">{s.n}</div>
                <h3 className="mb-2 text-[14px] font-semibold leading-snug text-navy">{s.title}</h3>
                <p className="text-[12px] text-graphite">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedCase && (
        <section className="py-16">
          <div className="mx-auto max-w-wrap px-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-wide text-steel">Representative Example</p>
            <a href={`${base}${routes.case(relatedCase.slug)}`} className="block border border-line bg-white p-8 hover:bg-fog">
              <h3 className="mb-2 text-lg font-bold text-navy">{relatedCase.title}</h3>
              <p className="text-sm text-graphite">{relatedCase.challenge}</p>
              <span className="mt-3 inline-block font-mono text-[11.5px] text-amber">Read the example →</span>
            </a>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-fog py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">
            Ready to talk through your {industry.name.toLowerCase()} sourcing needs?
          </h2>
          <div>
            <div className="mb-2.5">
              <PrimaryButton href={`${base}${routes.submitRequirement}`}>Submit Industrial Requirement →</PrimaryButton>
            </div>
            <div className="font-mono text-xs text-steel">partner@hisvia.com</div>
          </div>
        </div>
      </section>
    </>
  );
}
