import type { Metadata } from "next";
import { PrimaryButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Quality Control — HISVIA",
  description: "Five-step manufacturer evaluation: capability review, technical confirmation, sample verification, documentation check, and quality inspection.",
};

const checks = [
  { n: "01", t: "Production Capability Review", d: "Factory audit: equipment list, production capacity, quality certifications, and key customer references." },
  { n: "02", t: "Technical Capability Confirmation", d: "Engineering review: drawings, tolerances, material specifications, and testing capabilities." },
  { n: "03", t: "Sample Verification", d: "First-article inspection, dimensional report, material certification, and surface treatment verification." },
  { n: "04", t: "Documentation Check", d: "ISO certificates, export licenses, material traceability records, and test reports." },
  { n: "05", t: "Quality Inspection", d: "Pre-shipment inspection, packaging check, labeling verification, and loading supervision." },
];

export default function QCPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line bg-fog py-20">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber">Quality Control</p>
          <h1 className="max-w-2xl text-[40px] font-bold leading-[1.15] text-navy">Every Manufacturer Verified Before You Order</h1>
          <p className="mt-5 max-w-xl text-[17px] text-graphite">Five evaluation steps before any manufacturer enters our network. We don&apos;t just forward inquiries — we qualify production capability.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="space-y-3 stagger-children">
            {checks.map((c) => (
              <div key={c.n} className="flex items-start gap-5 rounded border border-line bg-white p-5 card-hover">
                <span className="mt-0.5 shrink-0 font-mono text-[15px] font-bold text-amber">{c.n}</span>
                <div>
                  <p className="text-[15px] font-semibold text-navy">{c.t}</p>
                  <p className="mt-1 text-[13px] text-graphite">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 text-center">
        <PrimaryButton href={`${base}${routes.manufacturingNetwork}`}>View Manufacturing Network →</PrimaryButton>
      </section>
    </main>
  );
}
