import { SectionHead, PrimaryButton, GhostButton, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";
import { messages } from "@/lib/messages";

export function generateMetadata({ params }: { params: { locale: string } }) {
  return messages[params.locale as Locale].meta;
}

const domainMeta = [
  { href: routes.solutions.compressors, photo: "industrial screw air compressor machine inside a manufacturing plant, realistic photograph, industrial environment" },
  { href: routes.solutions.compressorParts, photo: "precision machined metal compressor spare parts arranged on a workshop bench, realistic photograph, top down view" },
  { href: routes.solutions.pumps, photo: "industrial centrifugal pump on a factory floor with steel piping, realistic photograph" },
  { href: routes.solutions.hydraulics, photo: "chrome hydraulic cylinder and control valves industrial components close up, realistic photograph" },
  { href: routes.solutions.valves, photo: "industrial steel ball valves and pipe fittings arranged on a workshop bench, realistic photograph, macro detail" },
  { href: routes.solutions.automation, photo: "industrial automation control panel with PLC modules and wiring, realistic photograph, manufacturing" },
  { href: routes.solutions.mechanical, photo: "industrial ball bearings and mechanical seals arranged on a workbench, realistic photograph, macro detail" },
  { href: routes.solutions.consumables, photo: "stacks of industrial filters and consumable supplies on warehouse shelves, realistic photograph" },
];

export default function Home({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  const t = messages[params.locale];
  const domains = t.domains.items.map((d, i) => ({ ...d, ...domainMeta[i] }));

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="border-b border-line hero-gradient">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-14 pt-22 md:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-in-up">
              <p className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-steel">
                <span className="h-px w-6 bg-amber" /> {t.hero.kicker}
              </p>
              <h1 className="max-w-xl text-[44px] font-bold leading-[1.15] text-navy">
                {t.hero.h1}
              </h1>
              <p className="mt-5 max-w-md text-[17px] text-graphite leading-relaxed">
                {t.hero.p}
              </p>
              <div className="mt-8 flex gap-3.5">
                <PrimaryButton href={`${base}${routes.submitRequirement}`}>
                  {t.hero.primaryBtn}
                </PrimaryButton>
                <GhostButton href={`${base}${routes.howWeWork}`}>
                  {t.hero.ghostBtn}
                </GhostButton>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <PlaceholderPhoto
                caption={t.hero.statLabel}
                prompt="industrial engineer in safety helmet and uniform servicing a large air compressor unit on a factory floor, realistic photograph, industrial lighting, blue tones"
                alt={t.hero.h1}
                imageSize="portrait_4_3"
                className="aspect-[4/5] min-h-[420px] card-elevated"
              />
              <div className="inspection-tag mt-4 w-[220px] md:absolute md:-left-9 md:bottom-14 md:mt-0 animate-float-subtle">
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-steel">
                  {t.hero.statLabel}
                </div>
                <div className="font-display text-[26px] font-bold leading-none text-navy stat-number">
                  {t.hero.statValue}
                </div>
                <div className="mt-1 text-xs text-graphite">{t.hero.statDesc}</div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4 stagger-children">
            {t.hero.benefits.map((b) => (
              <div
                key={b.title}
                className="group border-r border-line py-6 pl-0.5 pr-3 last:border-r-0 transition-all duration-300 hover:bg-amber/[0.04] hover:pl-1.5"
              >
                <div className="font-display text-lg font-bold text-navy group-hover:text-amber transition-colors duration-300">
                  {b.title}
                </div>
                <div className="mt-1 max-w-[180px] text-[12.5px] text-graphite">
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* ===== THREE ENTRY CARDS ===== */}
      <section className="section-white py-20">
        <div className="mx-auto max-w-wrap px-8">
          <div className="mb-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-amber">
              Find Solutions Faster
            </p>
            <h2 className="text-[30px] font-bold text-navy">
              Three ways to source industrial components
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-3 stagger-children">
            <a href={`${base}${routes.parts}`} className="group block rounded-sm border border-line bg-white p-8 card-depth">
              <span className="text-3xl">⚙️</span>
              <h3 className="mt-5 text-[18px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">
                Browse by Part
              </h3>
              <p className="mt-3 text-[14px] text-graphite leading-relaxed">
                Find replacement components organized by category.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] text-amber transition-all duration-300 group-hover:gap-2.5">
                View all parts →
              </span>
            </a>
            <a href={`${base}${routes.brands}`} className="group block rounded-sm border border-line bg-white p-8 card-depth">
              <span className="text-3xl">🏭</span>
              <h3 className="mt-5 text-[18px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">
                Browse by Brand
              </h3>
              <p className="mt-3 text-[14px] text-graphite leading-relaxed">
                Find compatible parts for your equipment brand.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] text-amber transition-all duration-300 group-hover:gap-2.5">
                View all brands →
              </span>
            </a>
            <a href={`${base}${routes.industries}`} className="group block rounded-sm border border-line bg-white p-8 card-depth">
              <span className="text-3xl">🏗️</span>
              <h3 className="mt-5 text-[18px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">
                Browse by Industry
              </h3>
              <p className="mt-3 text-[14px] text-graphite leading-relaxed">
                Find solutions matched to your industry.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] text-amber transition-all duration-300 group-hover:gap-2.5">
                View all industries →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section className="border-y border-line section-stripe py-20">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker={t.howWeWork.kicker}
            title={t.howWeWork.title}
            description={t.howWeWork.desc}
          />
          <div className="grid gap-5 sm:grid-cols-4 stagger-children">
            {t.howWeWork.steps.map((s) => (
              <div
                key={s.title}
                className="group rounded-sm border border-line bg-white p-6 card-hover"
              >
                <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber text-[11px] font-bold text-white">
                  {s.n}
                </span>
                <h3 className="text-[15px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">
                  {s.title}
                </h3>
                <p className="mt-2 text-[12.5px] text-graphite">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POSITIONING ===== */}
      <section className="section-white py-20">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker={t.positioning.kicker}
            title={t.positioning.title}
          />
          <div className="stagger-children max-w-3xl space-y-4">
            {t.positioning.nots.map((note) => (
              <div key={note} className="flex gap-4 rounded-sm border border-line bg-white p-5 card-hover">
                <span className="mt-0.5 shrink-0 text-amber">✦</span>
                <p className="text-[14px] text-graphite">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPATIBLE SOLUTIONS ===== */}
      <section className="border-y border-line section-cool py-20">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker="Compatible Replacement Solutions"
            title="Sourcing for Atlas Copco, Kaeser, Ingersoll Rand, Sullair, Gardner Denver, and Hitachi equipment."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3 stagger-children">
            {[1,2,3].map(i => (
              <a key={i} href={`${base}${routes.brands}`} className="group rounded-sm border border-line bg-white p-7 card-hover">
                <PlaceholderPhoto
                  caption="Compatible parts"
                  prompt="compatible industrial replacement parts for compressor equipment displayed on clean workshop surface, realistic photograph, product photography"
                  alt="Compatible parts"
                  imageSize="landscape_4_3"
                  className="aspect-[4/3] border-0"
                  interactive
                />
                <h3 className="mt-5 text-[15px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">
                  OEM-Compatible Components
                </h3>
                <p className="mt-2 text-[13px] text-graphite">
                  Precision-machined replacement parts that match OEM specifications.
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIAL DOMAINS ===== */}
      <section className="section-white py-20">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.domains.kicker} title={t.domains.title} />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="flex flex-col gap-4 sm:flex-row sm:min-h-[420px] md:min-h-[460px]"
              >
                {domains.slice(rowIdx * 4, rowIdx * 4 + 4).map((d) => (
                  <div
                    key={d.n}
                    className="group relative flex min-h-[168px] flex-col justify-between bg-white border border-line card-hover
                      sm:flex-1 sm:min-w-0
                      sm:hover:flex-[2]"
                  >
                    <div>
                      <PlaceholderPhoto
                        caption={d.title}
                        prompt={d.photo}
                        imageSize="landscape_4_3"
                        className="aspect-[4/3] border-x-0 border-t-0"
                        interactive
                      />
                      <div className="p-7 pt-4">
                        <div className="font-mono text-[11px] text-steel">{d.n}</div>
                        <h3 className="my-3.5 text-base font-semibold text-navy transition-colors duration-300 group-hover:text-amber">
                          {d.title}
                        </h3>
                        <p className="text-[13px] text-graphite">{d.body}</p>
                      </div>
                    </div>
                    <a
                      href={`${base}${d.href}`}
                      className="mb-3.5 ml-7 inline-flex items-center gap-1 font-mono text-[11.5px] text-amber transition-all duration-300 hover:gap-2"
                    >
                      {t.domains.viewSolution} →
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="grid grid-cols-1 border-t border-line md:grid-cols-2">
        <div className="border-b border-line p-12 md:border-b-0 md:border-r section-warm">
          <SectionHead
            kicker={t.trust.qc.kicker}
            title={t.trust.qc.title}
            description={t.trust.qc.desc}
          />
          <ul className="stagger-children">
            {t.trust.qc.items.map((s, i) => (
              <li
                key={s}
                className="group flex gap-3 border-t border-line/50 py-3.5 text-[13.5px] first:border-t-0 transition-all duration-300 hover:bg-amber/[0.04] hover:pl-1"
              >
                <span className="mt-0.5 font-mono text-xs text-amber shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-graphite">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-12 section-white">
          <SectionHead
            kicker={t.trust.supply.kicker}
            title={t.trust.supply.title}
            description={t.trust.supply.desc}
          />
          <PlaceholderPhoto
            caption={t.trust.supply.title}
            prompt="wide shot of a modern Chinese manufacturing factory floor with production lines and machinery, realistic photograph, industrial facility"
            alt={t.trust.supply.title}
            imageSize="landscape_16_9"
            className="aspect-[16/9] min-h-[380px] card-elevated img-zoom"
          />
        </div>
      </section>

      {/* ===== COMPATIBLE SOLUTIONS ===== */}
      <section className="border-t border-line section-cool py-14">
        <div className="mx-auto flex max-w-wrap flex-wrap items-center justify-between gap-6 px-8">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wide text-steel">
              {t.compatible.label}
            </p>
            <h3 className="max-w-lg text-xl font-bold text-navy">
              {t.compatible.heading}
            </h3>
          </div>
          <GhostButton href={`${base}${routes.compatibleSolutions}`}>
            {t.compatible.cta}
          </GhostButton>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="border-t border-line section-warm py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">
            {t.cta.heading}
          </h2>
          <div>
            <div className="mb-2.5">
              <PrimaryButton href={`${base}${routes.submitRequirement}`}>
                {t.cta.btn}
              </PrimaryButton>
            </div>
            <div className="font-mono text-xs text-steel">{t.cta.email}</div>
          </div>
        </div>
      </section>
    </>
  );
}
