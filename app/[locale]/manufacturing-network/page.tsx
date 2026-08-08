import type { Metadata } from "next";
import { SectionHead, PrimaryButton } from "@/components/ui";
import { manufacturingRegions, evalSteps } from "@/lib/manufacturing";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Verified Chinese Manufacturing Network — HISVIA",
  description: "Four specialized manufacturing regions across China — Xinxiang, Ningbo, Dongguan, Suzhou — each with verified capabilities for industrial component production.",
};

export default function ManufacturingNetworkPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <main className="mx-auto max-w-wrap px-6 py-16">
      <SectionHead
        kicker="Verified Network"
        title="Chinese Manufacturing Network"
        description="Four specialized industrial regions — every manufacturer evaluated through a five-step verification process before being added to our network."
      />

      {/* Regions */}
      <div className="mb-14 grid gap-6 sm:grid-cols-2">
        {manufacturingRegions.map((r) => (
          <div key={r.name} className="rounded border border-line bg-white p-6">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-amber">{r.specialization}</p>
            <h2 className="text-[20px] font-bold text-navy">{r.name}</h2>
            <ul className="mt-3 space-y-1.5">
              {r.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-[13px] text-graphite">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Evaluation Process */}
      <div className="mb-12">
        <h2 className="mb-6 text-[24px] font-bold text-navy">How Manufacturers Are Evaluated</h2>
        <div className="space-y-3">
          {evalSteps.map((e) => (
            <div key={e.step} className="flex items-start gap-4 rounded border border-line bg-white p-5">
              <span className="mt-0.5 shrink-0 font-mono text-[15px] font-bold text-amber">{e.step}</span>
              <div>
                <p className="text-[14px] font-semibold text-navy">{e.title}</p>
                <p className="mt-0.5 text-[13px] text-graphite">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <PrimaryButton href={`${base}${routes.request}`}>Source From Our Network →</PrimaryButton>
      </div>
    </main>
  );
}
