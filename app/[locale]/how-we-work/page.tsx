import type { Metadata } from "next";
import { PrimaryButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "How We Work — HISVIA",
  description: "Six-step industrial sourcing process: requirement submission, technical analysis, manufacturer matching, quality confirmation, purchase coordination, and delivery.",
};

const flow = [
  { n: "01", t: "Submit Requirement", d: "Share equipment model, part specifications, photos, and quantity requirements through our request form." },
  { n: "02", t: "Technical Analysis", d: "Our team reviews specifications, identifies compatible replacement options, and confirms technical feasibility." },
  { n: "03", t: "Manufacturer Matching", d: "We shortlist verified Chinese manufacturers with proven experience producing your required components." },
  { n: "04", t: "Quality Confirmation", d: "Samples, material certifications, and dimensional reports are reviewed before production approval." },
  { n: "05", t: "Production & Inspection", d: "We track production progress, conduct pre-shipment inspection, and verify packaging and labeling." },
  { n: "06", t: "Export & Delivery", d: "Export documentation, customs clearance, and logistics coordination to your destination." },
];

export default function HowWeWorkPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line bg-fog py-20">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber">How We Work</p>
          <h1 className="max-w-2xl text-[40px] font-bold leading-[1.15] text-navy">From Requirement to Delivery — In Six Steps</h1>
          <p className="mt-5 max-w-xl text-[17px] text-graphite">A structured process that replaces the complexity of managing Chinese suppliers yourself. Technical matching, not blind forwarding.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="space-y-3 stagger-children">
            {flow.map((f) => (
              <div key={f.n} className="flex items-start gap-5 rounded border border-line bg-white p-5 card-hover">
                <span className="mt-0.5 shrink-0 font-mono text-[15px] font-bold text-amber">{f.n}</span>
                <div>
                  <p className="text-[15px] font-semibold text-navy">{f.t}</p>
                  <p className="mt-1 text-[13px] text-graphite">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 text-center">
        <PrimaryButton href={`${base}${routes.request}`}>Submit Your Requirement →</PrimaryButton>
      </section>
    </main>
  );
}
