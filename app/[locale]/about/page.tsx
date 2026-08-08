import type { Metadata } from "next";
import { SectionHead, PrimaryButton, GhostButton } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "About HISVIA — Chinese Industrial Supply Chain Partner",
  description: "HISVIA connects industrial companies in Russia and CIS countries with verified Chinese manufacturing resources — technical matching, quality control, and export coordination.",
};

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <main className="animate-fade-in-up">
      {/* Hero */}
      <section className="border-b border-line bg-fog py-20">
        <div className="mx-auto max-w-wrap px-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-amber">About HISVIA</p>
          <h1 className="max-w-2xl text-[40px] font-bold leading-[1.15] text-navy">
            Chinese Industrial Supply Chain Partner
          </h1>
          <p className="mt-5 max-w-xl text-[17px] text-graphite">
            We help industrial companies in Russia and CIS countries find, verify, and source from China&apos;s best manufacturers — without building their own procurement team.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-[24px] font-bold text-navy">What HISVIA Does</h2>
              <p className="mt-4 text-[15px] text-graphite leading-relaxed">
                HISVIA acts as a technical sourcing partner — not a trading company. We don&apos;t buy and resell products. 
                We connect you directly with verified Chinese manufacturers who can produce the components you need, 
                handling the technical matching, quality verification, and export coordination that makes cross-border 
                sourcing reliable.
              </p>
            </div>
            <div>
              <h2 className="text-[24px] font-bold text-navy">Who We Serve</h2>
              <ul className="mt-4 space-y-2 text-[15px] text-graphite">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" /> Industrial service companies needing compatible replacement parts</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" /> Equipment distributors expanding their spare parts catalog</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" /> Maintenance departments with occasional specialized part needs</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" /> Rental and mining companies managing multi-brand equipment fleets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="border-t border-line bg-[#F4F6F8] py-16">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="text-[24px] font-bold text-navy">How We&apos;re Different</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3 stagger-children">
            <div className="rounded border border-line bg-white p-6 card-hover">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-amber">01</p>
              <h3 className="text-[16px] font-bold text-navy">Technical Matching</h3>
              <p className="mt-2 text-[13.5px] text-graphite">We review your equipment specifications and match them to manufacturers with proven experience — not just any factory with spare capacity.</p>
            </div>
            <div className="rounded border border-line bg-white p-6 card-hover">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-amber">02</p>
              <h3 className="text-[16px] font-bold text-navy">Quality Verification</h3>
              <p className="mt-2 text-[13.5px] text-graphite">Every manufacturer in our network passes a five-step evaluation: capability review, technical confirmation, sample verification, documentation check, and quality inspection.</p>
            </div>
            <div className="rounded border border-line bg-white p-6 card-hover">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-amber">03</p>
              <h3 className="text-[16px] font-bold text-navy">Long-Term Partnership</h3>
              <p className="mt-2 text-[13.5px] text-graphite">We don&apos;t mark up parts. We build direct manufacturer relationships that give you consistent quality, predictable delivery, and better economics over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="text-[28px] font-bold text-navy">Ready to start sourcing?</h2>
          <p className="mt-3 text-graphite">Submit your equipment details and our technical team responds within 2 business days.</p>
          <div className="mt-6 flex justify-center gap-4">
            <PrimaryButton href={`${base}${routes.request}`}>Submit Requirement →</PrimaryButton>
            <GhostButton href={`${base}${routes.partnershipModel}`}>How Partnership Works</GhostButton>
          </div>
        </div>
      </section>
    </main>
  );
}
