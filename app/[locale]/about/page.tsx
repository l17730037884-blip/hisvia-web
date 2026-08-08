import type { Metadata } from "next";
import { SectionHead, PrimaryButton, GhostButton, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "About HISVIA — Industrial Supply Chain Partner in China",
  description: "HISVIA connects industrial companies with verified manufacturers across China. Technical matching, quality control, and export handled by engineers, not middlemen.",
};

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  return (
    <main className="animate-fade-in-up">
      {/* ===== HERO ===== */}
      <section className="border-b border-line hero-gradient">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-12 py-20 md:grid-cols-[1fr_1fr] md:py-24">
            <div className="flex flex-col justify-center">
              <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-amber">
                <span className="h-px w-6 bg-amber" /> About HISVIA
              </p>
              <h1 className="max-w-lg text-[42px] font-bold leading-[1.12] text-navy">
                We find the right factory. You focus on your business.
              </h1>
              <p className="mt-5 max-w-lg text-[17px] text-graphite leading-relaxed">
                HISVIA was built by engineers who spent years sourcing industrial components from China. 
                We know which factories can actually deliver — and we verify them before you place an order. 
                No trade company markup. No blind forwarding of inquiries.
              </p>
              <div className="mt-7 flex gap-3.5">
                <PrimaryButton href={`${base}${routes.request}`}>
                  Submit Requirement →
                </PrimaryButton>
                <GhostButton href={`${base}${routes.partnershipModel}`}>
                  How It Works
                </GhostButton>
              </div>
            </div>
            <PlaceholderPhoto
              caption="Factory floor inspection"
              prompt="engineers reviewing technical specifications with factory manager on a manufacturing floor, realistic photograph, natural lighting, candid moment"
              alt="HISVIA factory inspection"
              imageSize="landscape_4_3"
              className="aspect-[4/3] min-h-[340px] rounded-sm card-elevated"
            />
          </div>
        </div>
      </section>

      {/* ===== WHY HISVIA ===== */}
      <section className="py-20 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
            <PlaceholderPhoto
              caption="Quality inspection"
              prompt="inspector examining precision metal parts with measurement tools in a workshop, realistic photograph, natural industrial lighting"
              alt="Quality inspection"
              imageSize="portrait_4_3"
              className="aspect-[4/5] min-h-[380px] rounded-sm card-depth img-zoom"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-[28px] font-bold text-navy leading-tight">
                We started HISVIA because sourcing from China shouldn't be this hard
              </h2>
              <p className="mt-5 text-[15.5px] text-graphite leading-relaxed">
                Every year, companies spend months chasing quotes from factories that may or may not 
                actually make the part they need. They overpay for samples that never arrive. They deal 
                with quality issues because nobody checked before shipping. We fix this.
              </p>
              <p className="mt-4 text-[15.5px] text-graphite leading-relaxed">
                Our team has boots on the ground in China's manufacturing provinces. We visit factories, 
                check their production lines, verify their certifications, and only then connect them 
                with companies that need what they make.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 stagger-children">
                {[
                  { n: "01", t: "Engineer-led", d: "Our team speaks your technical language. We match specs, not keywords." },
                  { n: "02", t: "Factory-verified", d: "Every supplier is visited and checked before they enter our network." },
                  { n: "03", t: "No markup", d: "You pay factory price. We earn through transparent service fees, not hidden margins." },
                  { n: "04", t: "End-to-end", d: "From spec review to customs clearance — we handle the entire chain." },
                ].map((item) => (
                  <div key={item.n} className="rounded-sm border border-line bg-white p-5 card-hover">
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-amber">{item.n}</p>
                    <h3 className="text-[14px] font-bold text-navy">{item.t}</h3>
                    <p className="mt-1.5 text-[12.5px] text-graphite">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO WE WORK WITH ===== */}
      <section className="border-y border-line section-stripe py-20">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-14 md:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHead
                kicker="Who We Work With"
                title="Industrial companies that need parts, not problems"
              />
              <div className="grid gap-4 sm:grid-cols-2 stagger-children">
                {[
                  { title: "Service Companies", desc: "Equipment maintenance providers who need compatible parts faster and cheaper than OEM channels." },
                  { title: "Distributors", desc: "Parts distributors expanding their catalog with competitively sourced, verified components." },
                  { title: "End Users", desc: "Factories, mines, and rental fleets operating multi-brand equipment across remote sites." },
                  { title: "OEM Partners", desc: "Equipment makers seeking qualified Chinese component suppliers for their production." },
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
                caption="On-site factory visit"
                prompt="engineer in safety vest walking through a Chinese manufacturing workshop with production machinery, realistic candid photograph"
                alt="Factory visit"
                imageSize="portrait_4_3"
                className="aspect-[4/5] min-h-[420px] rounded-sm card-depth img-zoom"
              />
              <div className="rounded-sm border border-line/60 bg-white p-6 card-hover">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber mb-2">From experience</p>
                <p className="text-[14px] text-graphite leading-relaxed">
                  Most of our clients come from industry referrals. When downtime costs thousands per hour, 
                  you don't experiment with unverified suppliers. Our clients stick with us because the parts 
                  arrive on spec and on time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT'S DIFFERENT ===== */}
      <section className="py-20 section-white">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid gap-14 md:grid-cols-[1fr_1fr]">
            <PlaceholderPhoto
              caption="Manufacturing network"
              prompt="modern Chinese industrial manufacturing facility with organized production floor, clean environment, realistic photograph, natural light"
              alt="Manufacturing network"
              imageSize="landscape_4_3"
              className="aspect-[4/3] min-h-[320px] rounded-sm card-elevated img-zoom"
            />
            <div>
              <h2 className="text-[28px] font-bold text-navy leading-tight">
                Not a trading company. Not a directory. Something in between.
              </h2>
              <ul className="mt-7 space-y-0 stagger-children">
                {[
                  { title: "We don't resell", desc: "You contract directly with the factory. We handle the technical coordination, quality checks, and logistics — not the markup." },
                  { title: "We verify, not just list", desc: "Every factory in our network has been visited. We've seen their production lines, checked their certifications, and verified their output." },
                  { title: "Engineers, not salespeople", desc: "When you send a specification, an engineer reviews it — not a sales rep reading from a catalog. If it can't be made to spec, we tell you upfront." },
                  { title: "One relationship, not dozens", desc: "You don't need separate contacts for compressors, hydraulics, and consumables. One point of contact across all categories." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4 border-b border-line/50 py-5 first:border-t transition-all duration-300 hover:bg-amber/[0.02] hover:pl-1">
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
          <h2 className="text-[30px] font-bold text-navy">
            Send us your specs. We'll tell you if we can help.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-graphite">
            No obligation. No spam. An engineer reviews your requirement and responds within 2 business days 
            with a practical assessment.
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
