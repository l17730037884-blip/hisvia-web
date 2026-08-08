import { notFound } from "next/navigation";
import { SectionHead, PrimaryButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import { cases, getCase } from "@/lib/cases";
import type { Locale } from "@/lib/locales";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getCase(params.slug);
  if (!c) return {};
  return { title: `${c.title} — HISVIA`, description: c.result };
}

export default function CaseDetail({ params }: { params: { locale: Locale; slug: string } }) {
  const c = getCase(params.slug);
  if (!c) notFound();
  const base = `/${params.locale}`;

  return (
    <>
      <section className="border-b border-line bg-fog py-16">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker="Representative Example" title={c.title} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            <div className="bg-white p-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-steel">Challenge</p>
              <p className="text-sm text-graphite">{c.challenge}</p>
            </div>
            <div className="bg-white p-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-steel">HISVIA Solution</p>
              <p className="text-sm text-graphite">{c.solution}</p>
            </div>
            <div className="bg-white p-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-steel">Result</p>
              <p className="text-sm text-graphite">{c.result}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-fog py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">Have a similar requirement?</h2>
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
