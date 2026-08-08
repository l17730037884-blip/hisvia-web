import type { Metadata } from "next";
import { SectionHead, PrimaryButton, GhostButton, PlaceholderPhoto } from "@/components/ui";
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
      {/* ===== HERO — with image ===== */}
      <section className="border-b border-line hero-gradient">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-12 py-20 md:grid-cols-[1fr_1fr] md:py-24">
            <div className="flex flex-col justify-center">
              <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-amber">
                <span className="h-px w-6 bg-amber" /> About HISVIA
              </p>
              <h1 className="max-w-lg text-[42px] font-bold leading-[1.12] text-navy">
                Chinese Industrial Supply Chain Partner
              </h1>
              <p className="mt-5 max-w-lg text-[17px] text-graphite leading-relaxed">
                We help industrial companies in Russia and CIS countries find, verify, and source from 
                China&apos;s best manufacturers — without building their own procurement team.
              </p>
              <div className="mt-7 flex gap-3.5">
                <PrimaryButton href={`${base}${routes.request}`}>
                  Submit Requirement →
                </PrimaryButton>
                <GhostButton href={`${base}${routes.partnershipModel}`}>
                  How Partnership Works
                </GhostButton>
              </div>
            </div>
            <div className="relative">
              <PlaceholderPhoto
                caption="Industrial manufacturing partnership"
                prompt="modern industrial manufacturing facility with engineers reviewing technical drawings at a meeting table, blue and steel tones, realistic corporate photograph, professional atmosphere"
                alt="HISVIA industrial partnership"
                imageSize="landscape_4_3"
                className="aspect-[4/3] min-h-[340px] rounded-sm card-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="py-20 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
            <div>
              <PlaceholderPhoto
                caption="Quality inspection process"
                prompt="quality control inspector in white coat examining precision industrial parts with caliper in a clean workshop, realistic photograph, bright even lighting"
                alt="Quality inspection"
                imageSize="portrait_4_3"
                className="aspect-[4/5] min-h-[380px] rounded-sm card-depth img-zoom"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-[28px] font-bold text-navy leading-tight">
                Why HISVIA Exists
              </h2>
              <p className="mt-5 text-[15.5px] text-graphite leading-relaxed">
                HISVIA was founded to bridge the gap between industrial companies seeking reliable 
                Chinese manufacturing partners and the vast network of specialized factories across China. 
                We&apos;re not a trading company — we&apos;re a technical sourcing partner that makes 
                cross-border manufacturing relationships work.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 stagger-children">
                <div className="rounded-sm border border-line bg-white p-6 card-hover">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber">01</p>
                  <h3 className="text-[15px] font-bold text-navy">Technical Matching</h3>
                  <p className="mt-2 text-[13px] text-graphite">
                    We review your equipment specs and match manufacturers with proven experience — not just any factory with spare capacity.
                  </p>
                </div>
                <div className="rounded-sm border border-line bg-white p-6 card-hover">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber">02</p>
                  <h3 className="text-[15px] font-bold text-navy">Quality Verification</h3>
                  <p className="mt-2 text-[13px] text-graphite">
                    Five-step evaluation: capability review, technical confirmation, sample verification, documentation check, quality inspection.
                  </p>
                </div>
                <div className="rounded-sm border border-line bg-white p-6 card-hover">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber">03</p>
                  <h3 className="text-[15px] font-bold text-navy">Long-Term Partnership</h3>
                  <p className="mt-2 text-[13px] text-graphite">
                    We build direct manufacturer relationships that give you consistent quality and better economics over time — no markup on parts.
                  </p>
                </div>
                <div className="rounded-sm border border-line bg-white p-6 card-hover">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber">04</p>
                  <h3 className="text-[15px] font-bold text-navy">Export Coordination</h3>
                  <p className="mt-2 text-[13px] text-graphite">
                    Full export documentation, logistics coordination, and customs clearance — we handle the complexity of cross-border trade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO WE SERVE ===== */}
      <section className="border-y border-line section-stripe py-20">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-14 md:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHead
                kicker="Who We Serve"
                title="Built for Industrial Companies That Need Reliability"
              />
              <div className="grid gap-4 sm:grid-cols-2 stagger-children">
                {[
                  { title: "Service Companies", desc: "Industrial maintenance providers needing compatible replacement parts for multi-brand equipment fleets." },
                  { title: "Distributors", desc: "Equipment distributors expanding their spare parts catalog with competitively sourced components." },
                  { title: "End Users", desc: "Factories, mining operations, and rental companies managing diverse equipment from multiple manufacturers." },
                  { title: "OEM Partners", desc: "Original equipment manufacturers seeking qualified Chinese component suppliers for their production lines." },
                ].map((item, i) => (
                  <div key={item.title} className="rounded-sm border border-line bg-white p-6 card-hover">
                    <span className="num-badge mb-3">{i + 1}</span>
                    <h3 className="text-[15px] font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-[13px] text-graphite">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <PlaceholderPhoto
                caption="Industrial partnership"
                prompt="diverse group of industrial engineers and technicians collaborating in a modern factory setting, realistic corporate photograph, warm industrial lighting"
                alt="Who we serve"
                imageSize="portrait_4_3"
                className="aspect-[4/5] min-h-[420px] rounded-sm card-depth img-zoom"
              />
              <div className="rounded-sm border border-line/60 bg-white p-6 card-hover">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber mb-2">Key Fact</p>
                <p className="text-[14px] text-graphite leading-relaxed">
                  Over <strong className="text-navy">80%</strong> of our clients come through industry referrals — 
                  because when your production depends on the right parts arriving on time, 
                  you only work with partners you absolutely trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW WE'RE DIFFERENT ===== */}
      <section className="py-20 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-14 md:grid-cols-[1fr_1fr]">
            <PlaceholderPhoto
              caption="Manufacturing network"
              prompt="aerial view of modern Chinese industrial manufacturing park with multiple factory buildings, clean environment, blue sky, realistic corporate photograph"
              alt="Manufacturing network"
              imageSize="landscape_4_3"
              className="aspect-[4/3] min-h-[320px] rounded-sm card-elevated img-zoom"
            />
            <div>
              <h2 className="text-[28px] font-bold text-navy leading-tight">
                What Makes HISVIA Different
              </h2>
              <ul className="mt-7 space-y-0 stagger-children">
                {[
                  { title: "Not a Trading Company", desc: "We don't buy and resell. You connect directly with verified manufacturers while we handle the technical and logistical coordination." },
                  { title: "Engineer-Led Sourcing", desc: "Our team speaks engineering, not just procurement. We understand your equipment specifications and match them precisely." },
                  { title: "Verified Network", desc: "Every manufacturer passes our 5-step evaluation before entering our network. We continuously monitor quality and delivery performance." },
                  { title: "Full Transparency", desc: "You know which factory is producing your parts, their certifications, and their track record. No hidden markups or intermediaries." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4 border-b border-line/50 py-5 first:border-t transition-colors duration-300 hover:bg-amber/[0.02] hover:pl-1">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                    <div>
                      <h3 className="text-[15px] font-bold text-navy">{item.title}</h3>
                      <p className="mt-1 text-[13.5px] text-graphite">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="border-t border-line section-warm py-20 text-center">
        <div className="mx-auto max-w-wrap px-8">
          <h2 className="text-[32px] font-bold text-navy">
            Ready to Start Sourcing?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] text-graphite">
            Submit your equipment details and our technical team responds within 2 business days with a sourcing assessment.
          </p>
          <div className="mt-7 flex justify-center gap-4">
            <PrimaryButton href={`${base}${routes.request}`}>
              Submit Requirement →
            </PrimaryButton>
            <GhostButton href={`${base}${routes.contact}`}>
              Contact Us
            </GhostButton>
          </div>
        </div>
      </section>
    </main>
  );
}
