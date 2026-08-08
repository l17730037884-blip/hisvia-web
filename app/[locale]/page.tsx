import { SectionHead, PrimaryButton, GhostButton, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";
import { messages } from "@/lib/messages";

export function generateMetadata({ params }: { params: { locale: string } }) {
  return messages[params.locale as Locale].meta;
}

// 领域卡片的路由与配图 prompt（与语言无关）
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
      {/* HERO */}
      <section className="border-b border-line bg-fog">
        <div className="mx-auto max-w-wrap px-8">
          <div className="grid grid-cols-1 gap-14 pt-22 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-steel">
                <span className="h-px w-6 bg-amber" /> {t.hero.kicker}
              </p>
              <h1 className="max-w-xl text-[44px] font-bold leading-[1.15] text-navy">{t.hero.h1}</h1>
              <p className="mt-5 max-w-md text-[17px] text-graphite">{t.hero.p}</p>
              <div className="mt-8 flex gap-3.5">
                <PrimaryButton href={`${base}${routes.submitRequirement}`}>{t.hero.primaryBtn}</PrimaryButton>
                <GhostButton href={`${base}${routes.howWeWork}`}>{t.hero.ghostBtn}</GhostButton>
              </div>
            </div>
            <div className="relative">
              <PlaceholderPhoto
                caption={t.hero.statLabel}
                prompt="industrial engineer in safety helmet and uniform servicing a large air compressor unit on a factory floor, realistic photograph, industrial lighting, blue tones"
                alt={t.hero.h1}
                imageSize="portrait_4_3"
                className="aspect-[4/5] min-h-[420px]"
              />
              <div className="inspection-tag mt-4 w-[220px] md:absolute md:-left-9 md:bottom-14 md:mt-0">
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-steel">{t.hero.statLabel}</div>
                <div className="font-display text-[26px] font-bold leading-none text-navy">{t.hero.statValue}</div>
                <div className="mt-1 text-xs text-graphite">{t.hero.statDesc}</div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4">
            {t.hero.benefits.map((b) => (
              <div key={b.title} className="border-r border-line py-6 pl-0.5 last:border-r-0">
                <div className="font-display text-lg font-bold text-navy">{b.title}</div>
                <div className="mt-1 max-w-[180px] text-[12.5px] text-graphite">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASE 3: Three Entry Cards */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-wrap px-8">
          <div className="mb-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-amber">Find Solutions Faster</p>
            <h2 className="text-[30px] font-bold text-navy">Three ways to source industrial components</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: By Brand */}
            <a href={`/${params.locale}/brands`} className="group rounded border border-line bg-white p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-amber/10 font-mono text-lg text-amber">01</div>
              <h3 className="text-[18px] font-bold text-navy group-hover:text-amber">Find by Equipment Brand</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Atlas Copco","Kaeser","Ingersoll Rand","Sullair","Gardner Denver","Hitachi"].map(b => (
                  <span key={b} className="rounded bg-[#F4F6F8] px-2 py-0.5 font-mono text-[11px] text-graphite">{b}</span>
                ))}
              </div>
              <span className="mt-4 inline-block text-[13px] font-medium text-amber">Explore Brands →</span>
            </a>
            {/* Card 2: By Component */}
            <a href={`/${params.locale}/parts`} className="group rounded border border-line bg-white p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-amber/10 font-mono text-lg text-amber">02</div>
              <h3 className="text-[18px] font-bold text-navy group-hover:text-amber">Find by Component</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Filters","Separators","Valves","Seals","Hydraulics","Mechanical"].map(b => (
                  <span key={b} className="rounded bg-[#F4F6F8] px-2 py-0.5 font-mono text-[11px] text-graphite">{b}</span>
                ))}
              </div>
              <span className="mt-4 inline-block text-[13px] font-medium text-amber">Explore Parts →</span>
            </a>
            {/* Card 3: Submit Requirement */}
            <a href={`/${params.locale}/request`} className="group rounded border border-line bg-white p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-amber/10 font-mono text-lg text-amber">03</div>
              <h3 className="text-[18px] font-bold text-navy group-hover:text-amber">Submit Technical Requirement</h3>
              <p className="mt-2 text-[13px] text-graphite">Upload equipment photos, nameplate, drawings, or part numbers. Technical response within 2 business days.</p>
              <span className="mt-4 inline-block text-[13px] font-medium text-amber">Submit Request →</span>
            </a>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="bg-navy/[0.1] py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.positioning.kicker} title={t.positioning.title} />
          <div className="mb-10 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {t.positioning.nots.map((nt) => (
              <div key={nt} className="flex items-center gap-3 bg-white px-5.5 py-6">
                <span className="font-mono text-base text-steel">✕</span>
                <span className="text-[14.5px] text-graphite">{nt}</span>
              </div>
            ))}
          </div>
          <p className="max-w-3xl border-t border-line pt-2 font-display text-[26px] font-semibold leading-snug text-navy">
            {t.positioning.statement.lead}
            <span className="text-amber">{t.positioning.statement.h1}</span>
            {t.positioning.statement.mid}
            <span className="text-amber">{t.positioning.statement.h2}</span>
            {t.positioning.statement.tail}
          </p>
        </div>
      </section>

      {/* PARTNER BENEFITS */}
      <section className="py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.partnerBenefits.kicker} title={t.partnerBenefits.title} description={t.partnerBenefits.desc} />
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {t.partnerBenefits.blocks.map((b, i) => {
              const partnerHref = [routes.partners.serviceCenters, routes.partners.distributors, routes.partners.regionalPartners][i];
              return (
                <div key={b.label} className="bg-white p-8">
                  <div className="font-mono text-[11px] text-steel">{b.label}</div>
                  <h3 className="my-3 text-lg font-bold text-navy">{b.heading}</h3>
                  <ul>
                    {b.bullets.map((bl) => (
                      <li key={bl} className="border-t border-line py-2.5 pl-4 text-[13.5px] text-graphite first:border-t-0">
                        {bl}
                      </li>
                    ))}
                  </ul>
                  <GhostButton href={`${base}${partnerHref}`}>{b.cta}</GhostButton>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-t border-line bg-fog py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.howWeWork.kicker} title={t.howWeWork.title} description={t.howWeWork.desc} />
          <div className="flex flex-col border-y border-line md:flex-row">
            {t.howWeWork.steps.map((s, i) => (
              <div key={s.n} className="relative flex-1 border-b border-line p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <div className="mb-2.5 font-mono text-[11px] text-amber">{s.n}</div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug text-navy">{s.title}</h3>
                <p className="text-[12.5px] text-graphite">{s.body}</p>
                {i < t.howWeWork.steps.length - 1 && (
                  <span className="absolute right-[-11px] top-6 hidden bg-fog text-line md:block">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING CAPABILITY */}
      <section className="py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.manufacturing.kicker} title={t.manufacturing.title} description={t.manufacturing.desc} />
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {t.manufacturing.items.map((c, i) => (
              <div key={c.title} className="min-h-[140px] bg-white p-7">
                <div className="font-mono text-[11px] text-amber">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="my-2 text-[15.5px] font-semibold text-navy">{c.title}</h3>
                <p className="text-[12.5px] text-graphite">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <GhostButton href={`${base}${routes.manufacturingCapability}`}>{t.manufacturing.cta}</GhostButton>
          </div>
        </div>
      </section>

      {/* INDUSTRIAL DOMAINS */}
      <section className="border-y border-line bg-fog py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.domains.kicker} title={t.domains.title} />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, rowIdx) => (
              <div key={rowIdx} className="flex flex-col gap-4 sm:flex-row sm:min-h-[420px] md:min-h-[460px]">
                {domains.slice(rowIdx * 4, rowIdx * 4 + 4).map((d) => (
                  <div
                    key={d.n}
                    className="group relative flex min-h-[168px] flex-col justify-between bg-white transition-[flex,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ease-out
                      sm:flex-1 sm:min-w-0
                      sm:hover:flex-[2]"
                  >
                    <div>
                      <PlaceholderPhoto caption={d.title} prompt={d.photo} imageSize="landscape_4_3" className="aspect-[4/3] border-x-0 border-t-0" interactive />
                      <div className="p-7 pt-4">
                        <div className="font-mono text-[11px] text-steel">{d.n}</div>
                        <h3 className="my-3.5 text-base font-semibold text-navy">{d.title}</h3>
                        <p className="text-[13px] text-graphite">{d.body}</p>
                      </div>
                    </div>
                    <a href={`${base}${d.href}`} className="mb-3.5 ml-7 inline-block font-mono text-[11.5px] text-amber">
                      {t.domains.viewSolution}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="grid grid-cols-1 border-t border-line md:grid-cols-2">
        <div className="border-b border-line p-12 md:border-b-0 md:border-r">
          <SectionHead kicker={t.trust.qc.kicker} title={t.trust.qc.title} description={t.trust.qc.desc} />
          <ul>
            {t.trust.qc.items.map((s, i) => (
              <li key={s} className="flex gap-3 border-t border-line py-3 text-[13.5px] first:border-t-0">
                <span className="font-mono text-xs text-amber">{String(i + 1).padStart(2, "0")}</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-12">
          <SectionHead kicker={t.trust.supply.kicker} title={t.trust.supply.title} description={t.trust.supply.desc} />
          <PlaceholderPhoto
            caption={t.trust.supply.title}
            prompt="wide shot of a modern Chinese manufacturing factory floor with production lines and machinery, realistic photograph, industrial facility"
            alt={t.trust.supply.title}
            imageSize="landscape_16_9"
            className="aspect-[16/9] min-h-[380px]"
          />
        </div>
      </section>

      {/* COMPATIBLE SOLUTIONS TEASER */}
      <section className="border-t border-line py-14">
        <div className="mx-auto flex max-w-wrap flex-wrap items-center justify-between gap-6 px-8">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wide text-steel">{t.compatible.label}</p>
            <h3 className="max-w-lg text-xl font-bold text-navy">{t.compatible.heading}</h3>
          </div>
          <GhostButton href={`${base}${routes.compatibleSolutions}`}>{t.compatible.cta}</GhostButton>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-fog py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-10 px-8">
          <h2 className="max-w-lg text-[30px] font-bold leading-snug text-navy">{t.cta.heading}</h2>
          <div>
            <div className="mb-2.5">
              <PrimaryButton href={`${base}${routes.submitRequirement}`}>{t.cta.btn}</PrimaryButton>
            </div>
            <div className="font-mono text-xs text-steel">{t.cta.email}</div>
          </div>
        </div>
      </section>
    </>
  );
}
