import type { Metadata } from "next";
import { PrimaryButton, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";

const flow = [
  { n: "01", t: "Submit Requirement", d: "Share equipment model, part specifications, photos, and quantity requirements through our request form." },
  { n: "02", t: "Technical Analysis", d: "Our team reviews specifications, identifies compatible replacement options, and confirms technical feasibility." },
  { n: "03", t: "Manufacturer Matching", d: "We shortlist verified Chinese manufacturers with proven experience producing your required components." },
  { n: "04", t: "Quality Confirmation", d: "Samples, material certifications, and dimensional reports are reviewed before production approval." },
  { n: "05", t: "Production & Inspection", d: "We track production progress, conduct pre-shipment inspection, and verify packaging and labeling." },
  { n: "06", t: "Export & Delivery", d: "Export documentation, customs clearance, and logistics coordination to your destination." },
];

export const metadata: Metadata = { title: "How We Work — HISVIA", description: "Six-step industrial sourcing process." };

export default function HowWeWorkPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  const t = pageT[params.locale].howWeWork;
  return (
    <main className="animate-fade-in-up">
      <section className="border-b border-line hero-gradient py-20">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center">
              <p className="mb-3 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-amber"><span className="h-px w-6 bg-amber" /> {t.kicker}</p>
              <h1 className="max-w-lg text-[40px] font-bold leading-[1.15] text-navy">{t.h1}</h1>
              <p className="mt-5 max-w-lg text-[17px] text-graphite">{t.p}</p>
            </div>
            <PlaceholderPhoto caption="Process" prompt="industrial engineers reviewing technical specifications at modern office, realistic photograph, professional lighting" alt="How we work" imageSize="landscape_4_3" className="aspect-[4/3] min-h-[300px] rounded-sm card-elevated" />
          </div>
        </div>
      </section>
      <section className="py-16 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="space-y-0 stagger-children">
            {flow.map((step, i) => (
              <div key={step.n} className="group flex gap-5 border-b border-line/60 py-7 transition-all duration-300 hover:bg-amber/[0.03] hover:pl-1">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber text-[11px] font-bold text-white">{i+1}</span>
                <div><h3 className="text-[17px] font-bold text-navy">{step.t}</h3><p className="mt-1.5 max-w-2xl text-[14px] text-graphite">{step.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-line section-warm py-16 text-center">
        <div className="mx-auto max-w-wrap px-8">
          <PrimaryButton href={`${base}${routes.request}`}>{pageT[params.locale].common.submitReqBtn}</PrimaryButton>
        </div>
      </section>
    </main>
  );
}
