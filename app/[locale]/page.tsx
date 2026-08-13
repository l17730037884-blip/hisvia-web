import { SectionHead, PrimaryButton, GhostButton, PlaceholderPhoto } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/locales";
import { messages } from "@/lib/messages";
import { pageT } from "@/lib/page-translations";

export function generateMetadata({ params }: { params: { locale: string } }) {
  return messages[params.locale as Locale].meta;
}

const domainMeta = [
  { href: routes.solutions.compressors, photo: "/photos/raw/pixabay-compressor-new.jpg" },
  { href: routes.solutions.compressorParts, photo: "/photos/raw/pixabay-compressor-mechanics.jpg" },
  { href: routes.solutions.pumps, photo: "/photos/raw/pixabay-industrial-pump.jpg" },
  { href: routes.solutions.hydraulics, photo: "/photos/raw/pixabay-hydraulic-system.jpg" },
  { href: routes.solutions.valves, photo: "/photos/raw/pixabay-industrial-valve.jpg" },
  { href: routes.solutions.automation, photo: "/photos/raw/automation-plc-1.jpg" },
  { href: routes.solutions.mechanical, photo: "/photos/raw/pixabay-bearing.jpg" },
  { href: routes.solutions.consumables, photo: "/photos/raw/pixabay-industrial-filter.jpg" },
];

const brandTags = ["Atlas Copco","Kaeser","Ingersoll Rand","Sullair","Gardner Denver","Hitachi"];
const partTags = ["Filters","Separators","Valves","Seals","Hydraulics","Mechanical"];

const manufacturingPhotos = [
  "/photos/raw/ingersoll-rand-gear.jpg",
  "/photos/raw/pixabay-pneumatics.jpg",
  "/photos/raw/metal-casting-1.jpg",
  "/photos/raw/injection-molding-1.jpg",
  "/photos/raw/air-compressor-air-filter.jpg",
  "/photos/raw/bearing-2.jpg",
];

export default function Home({ params }: { params: { locale: Locale } }) {
  const base = `/${params.locale}`;
  const t = messages[params.locale];
  const h = pageT[params.locale].home;
  const domains = t.domains.items.map((d, i) => ({ ...d, ...domainMeta[i] }));

  return (
    <>
      {/* ===== HERO — full-bleed widescreen image ===== */}
      <section className="relative min-h-[560px] overflow-hidden border-b border-line md:min-h-[680px]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/photos/raw/pixabay-supply-chain.jpg"
            alt={t.hero.h1}
            className="h-full w-full object-cover"
          />
          {/* Dark gradient overlay for text readability (left side) */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 mx-auto max-w-wrap px-6 pt-20 pb-28 md:px-8 md:pt-28 md:pb-36">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-amber">
              <span className="h-px w-6 bg-amber" /> {t.hero.kicker}
            </p>
            <h1 className="text-[36px] font-bold leading-[1.15] text-white md:text-[52px]">
              {t.hero.h1}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] text-white/80 leading-relaxed md:text-[18px]">
              {t.hero.p}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <PrimaryButton href={`${base}${routes.submitRequirement}`}>
                {t.hero.primaryBtn}
              </PrimaryButton>
              <GhostButton href={`${base}${routes.howWeWork}`} variant="inverted">
                {t.hero.ghostBtn}
              </GhostButton>
            </div>
          </div>

          {/* Floating stat tag */}
          <div className="inspection-tag mt-12 w-[220px] animate-float md:absolute md:bottom-20 md:right-8 md:mt-0">
            <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-amber">
              {t.hero.statLabel}
            </div>
            <div className="font-display text-[26px] font-bold leading-none text-white stat-number">
              {t.hero.statValue}
            </div>
            <div className="mt-1 text-xs text-white/70">{t.hero.statDesc}</div>
          </div>
        </div>

        {/* Benefits strip at bottom of hero */}
        <div className="relative z-10 border-t border-white/10 bg-navy/40 backdrop-blur-sm">
          <div className="mx-auto max-w-wrap px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 stagger-children">
              {t.hero.benefits.map((b) => (
                <div
                  key={b.title}
                  className="group border-r border-white/10 py-5 pl-0.5 pr-3 last:border-r-0 transition-colors duration-300 hover:bg-amber/[0.08]"
                >
                  <div className="font-display text-base font-bold text-white group-hover:text-amber transition-colors duration-300 md:text-lg">
                    {b.title}
                  </div>
                  <div className="mt-1 max-w-[180px] text-[11.5px] text-white/70 md:text-[12.5px]">
                    {b.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="trust-strip py-10">
        <div className="mx-auto max-w-wrap px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <span className="trust-badge-pill">{h.trustBar.badge}</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">
              HISVIA · Verified Network · CN→RU/CIS
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 stagger-children">
            {h.trustBar.items.map((it) => (
              <div key={it.label} className="trust-stat">
                <div className="trust-stat-value font-display text-[40px] font-bold leading-none">
                  {it.value}
                </div>
                <div className="mt-2 text-[13px] font-semibold text-white">{it.label}</div>
                <div className="mt-0.5 text-[11.5px] text-white/55 leading-snug">{it.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THREE ENTRY CARDS ===== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-6 md:px-8">
          <div className="mb-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-amber">
              {h.entryKicker}
            </p>
            <h2 className="text-[30px] font-bold text-navy">
              {h.entryTitle}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 stagger-children">
            {/* Card 1: By Brand */}
            <a href={`/${params.locale}/brands`} className="group rounded border border-line bg-white p-6 card-hover">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-amber/10 font-mono text-lg text-amber transition-all duration-300 group-hover:bg-amber group-hover:text-white">
                01
              </div>
              <h3 className="text-[18px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">
                {h.entryByBrand}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {brandTags.map(b => (
                  <span key={b} className="tag-chip rounded px-2.5 py-1 font-mono text-[11px] text-graphite">
                    {b}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-amber transition-all duration-300 group-hover:gap-2.5">
                {h.entryByBrandExplore} <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </a>
            {/* Card 2: By Component */}
            <a href={`/${params.locale}/parts`} className="group rounded border border-line bg-white p-6 card-hover">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-amber/10 font-mono text-lg text-amber transition-all duration-300 group-hover:bg-amber group-hover:text-white">
                02
              </div>
              <h3 className="text-[18px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">
                {h.entryByComponent}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {partTags.map(b => (
                  <span key={b} className="tag-chip rounded px-2.5 py-1 font-mono text-[11px] text-graphite">
                    {b}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-amber transition-all duration-300 group-hover:gap-2.5">
                {h.entryByComponentExplore} <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </a>
            {/* Card 3: Submit Requirement */}
            <a href={`/${params.locale}/request`} className="group rounded border border-line bg-white p-6 card-hover">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-amber/10 font-mono text-lg text-amber transition-all duration-300 group-hover:bg-amber group-hover:text-white">
                03
              </div>
              <h3 className="text-[18px] font-bold text-navy transition-colors duration-300 group-hover:text-amber">
                {h.entrySubmit}
              </h3>
              <p className="mt-2 text-[13px] text-graphite leading-relaxed">
                {h.entrySubmitDesc}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-amber transition-all duration-300 group-hover:gap-2.5">
                {h.entrySubmitExplore} <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== POSITIONING ===== */}
      <section className="section-stripe bg-dots py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead kicker={t.positioning.kicker} title={t.positioning.title} />
          <div className="mb-10 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3 stagger-children">
            {t.positioning.nots.map((nt) => (
              <div
                key={nt}
                className="flex items-center gap-3 bg-white px-5.5 py-6 transition-all duration-300 hover:bg-amber/[0.02] hover-lift"
              >
                <span className="font-mono text-base text-steel/60 transition-colors duration-300 group-hover:text-amber">✕</span>
                <span className="text-[14.5px] text-graphite">{nt}</span>
              </div>
            ))}
          </div>
          <p className="max-w-3xl border-l-2 border-amber border-t border-line bg-white px-7 py-6 font-display text-[26px] font-semibold leading-snug text-navy shadow-[0_2px_16px_-6px_rgba(14,42,74,0.10)]">
            {t.positioning.statement.lead}
            <span className="text-amber">{t.positioning.statement.h1}</span>
            {t.positioning.statement.mid}
            <span className="text-amber">{t.positioning.statement.h2}</span>
            {t.positioning.statement.tail}
          </p>
        </div>
      </section>

      {/* ===== PARTNER BENEFITS ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-wrap px-8">
          <SectionHead
            kicker={t.partnerBenefits.kicker}
            title={t.partnerBenefits.title}
            description={t.partnerBenefits.desc}
          />
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3 stagger-children">
            {t.partnerBenefits.blocks.map((b, i) => {
              const partnerHref = [
                routes.partners.serviceCenters,
                routes.partners.distributors,
                routes.partners.regionalPartners,
              ][i];
              return (
                <div
                  key={b.label}
                  className="group bg-white p-8 transition-colors duration-300 hover:bg-amber/[0.02]"
                >
                  <div className="font-mono text-[11px] text-steel">{b.label}</div>
                  <h3 className="my-3 text-lg font-bold text-navy group-hover:text-amber transition-colors duration-300">
                    {b.heading}
                  </h3>
                  <ul>
                    {b.bullets.map((bl) => (
                      <li
                        key={bl}
                        className="border-t border-line py-2.5 pl-4 text-[13.5px] text-graphite first:border-t-0"
                      >
                        {bl}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <GhostButton href={`${base}${partnerHref}`}>{b.cta}</GhostButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BRAND WALL ===== */}
      <section className="border-y border-line bg-fog/40 py-20">
        <div className="mx-auto max-w-wrap px-8">
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <SectionHead
                kicker={h.brandWall.kicker}
                title={h.brandWall.title}
              />
            </div>
            <p className="text-[13.5px] text-graphite leading-relaxed md:pb-2">
              {h.brandWall.desc}
            </p>
          </div>
          <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6 stagger-children">
            {brandTags.map((b) => (
              <a
                key={b}
                href={`${base}/brands/${b.toLowerCase().replace(/\s+/g, "-")}`}
                className="brand-wall-cell group"
              >
                <span className="brand-wall-compatible-tag">{h.brandWall.badge}</span>
                <span className="brand-wall-name">{b}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section className="border-t border-line section-stripe py-16 md:py-24">
        <div className="mx-auto max-w-wrap px-6 md:px-8">
          <SectionHead
            kicker={t.howWeWork.kicker}
            title={t.howWeWork.title}
            description={t.howWeWork.desc}
          />
          <PlaceholderPhoto
            caption={t.howWeWork.title}
            prompt="industrial logistics coordination"
            alt={t.howWeWork.title}
            imageSize="landscape_16_9"
            className="mb-8 aspect-[16/9] min-h-[300px] rounded-sm card-elevated img-zoom"
            src="/photos/raw/atlas-copco-spare-parts.jpg"
          />
          <div className="flex flex-col border-y border-line md:flex-row stagger-children">
            {t.howWeWork.steps.map((s, i) => (
              <div
                key={s.n}
                className="group relative flex-1 border-b border-line p-6 transition-colors duration-300 hover:bg-amber/[0.03] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <div className="mb-2.5 font-mono text-[11px] text-amber">{s.n}</div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug text-navy group-hover:text-amber transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-[12.5px] text-graphite">{s.body}</p>
                {i < t.howWeWork.steps.length - 1 && (
                  <span className="absolute right-[-11px] top-6 hidden text-line/50 md:block text-lg">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MANUFACTURING CAPABILITY ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-wrap px-6 md:px-8">
          <SectionHead
            kicker={t.manufacturing.kicker}
            title={t.manufacturing.title}
            description={t.manufacturing.desc}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 stagger-children">
            {t.manufacturing.items.map((c, i) => {
              const m = h.mfgMetrics[i];
              return (
                <div
                  key={c.title}
                  className="group overflow-hidden rounded-sm border border-line bg-white card-hover"
                >
                  <div className="relative">
                    <PlaceholderPhoto
                      caption={c.title}
                      prompt={`manufacturing ${c.title}`}
                      alt={c.title}
                      imageSize="landscape_4_3"
                      className="aspect-[16/10] border-0 rounded-0 img-zoom"
                      src={manufacturingPhotos[i]}
                    />
                    <span className="verified-badge absolute left-3 top-3 backdrop-blur-sm">
                      {h.mfgVerified}
                    </span>
                  </div>
                  <div className="p-5 md:p-7">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[11px] text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-steel/70">
                        CN · Audited
                      </span>
                    </div>
                    <h3 className="my-2 text-[15.5px] font-semibold text-navy group-hover:text-amber transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="text-[12.5px] text-graphite">{c.body}</p>
                    <div className="mt-4">
                      <div className="mfg-metric-row">
                        <span className="mfg-metric-label">Lead</span>
                        <span className="mfg-metric-value">{m.lead}</span>
                      </div>
                      <div className="mfg-metric-row">
                        <span className="mfg-metric-label">Capacity</span>
                        <span className="mfg-metric-value">{m.capacity}</span>
                      </div>
                      <div className="mfg-metric-row">
                        <span className="mfg-metric-label">Material</span>
                        <span className="mfg-metric-value">{m.material}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <GhostButton href={`${base}${routes.manufacturingCapability}`}>
              {t.manufacturing.cta}
            </GhostButton>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIAL DOMAINS ===== */}
      <section className="border-y border-line hero-gradient py-20 md:py-24">
        <div className="mx-auto max-w-wrap px-6 md:px-8">
          <SectionHead kicker={t.domains.kicker} title={t.domains.title} />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-2 gap-3 md:flex md:flex-row md:gap-4 md:min-h-[440px]"
              >
                {domains.slice(rowIdx * 4, rowIdx * 4 + 4).map((d) => (
                  <div
                    key={d.n}
                    className="group relative flex flex-col justify-between bg-white border border-line card-hover
                      md:flex-1 md:min-w-0
                      md:hover:flex-[2] md:transition-all md:duration-500 md:ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    <div>
                      <PlaceholderPhoto
                        caption={d.title}
                        prompt={`${d.title} industrial`}
                        imageSize="landscape_4_3"
                        className="aspect-[4/3] border-x-0 border-t-0"
                        interactive
                        src={d.photo}
                      />
                      <div className="p-4 pt-3 md:p-7 md:pt-4">
                        <div className="font-mono text-[11px] text-steel">{d.n}</div>
                        <h3 className="my-2 md:my-3.5 text-sm font-semibold text-navy transition-colors duration-300 group-hover:text-amber md:text-base">
                          {d.title}
                        </h3>
                        <p className="text-[12px] text-graphite md:text-[13px]">{d.body}</p>
                      </div>
                    </div>
                    <a
                      href={`${base}${d.href}`}
                      className="mb-3 ml-4 md:mb-3.5 md:ml-7 inline-flex items-center gap-1 font-mono text-[11px] text-amber transition-all duration-300 hover:gap-2 md:text-[11.5px]"
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
        <div className="border-b border-line p-12 md:border-b-0 md:border-r">
          <SectionHead
            kicker={t.trust.qc.kicker}
            title={t.trust.qc.title}
            description={t.trust.qc.desc}
          />
          <ul className="stagger-children">
            {t.trust.qc.items.map((s, i) => (
              <li
                key={s}
                className="group flex gap-3 border-t border-line py-3 text-[13.5px] first:border-t-0 transition-colors duration-300 hover:bg-amber/[0.02] hover:pl-1"
              >
                <span className="mt-0.5 font-mono text-xs text-amber shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-graphite">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 md:p-12">
          <SectionHead
            kicker={t.trust.supply.kicker}
            title={t.trust.supply.title}
            description={t.trust.supply.desc}
          />
          <PlaceholderPhoto
            caption={t.trust.supply.title}
            prompt="Chinese manufacturing factory floor"
            alt={t.trust.supply.title}
            imageSize="landscape_16_9"
            className="aspect-[16/9] min-h-[380px] img-zoom"
            src="/photos/raw/pixabay-factory-tools.jpg"
          />
        </div>
      </section>

      {/* ===== COMPATIBLE SOLUTIONS ===== */}
      <section className="border-t border-line py-14">
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

      {/* ===== BY THE NUMBERS ===== */}
      <section className="border-t border-line section-stripe py-16 md:py-24">
        <div className="mx-auto max-w-wrap px-6 md:px-8">
          <SectionHead
            kicker={h.byNumbers.kicker}
            title={h.byNumbers.title}
            description={h.byNumbers.desc}
          />
          <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-4 stagger-children">
            {h.byNumbers.items.map((it) => (
              <div
                key={it.label}
                className="numbers-block"
                style={{ ["--target-pct" as string]: `${it.pct}%` }}
              >
                <div className="numbers-value">{it.value}</div>
                <div className="mt-3 text-[13px] font-semibold text-navy">{it.label}</div>
                <div className="mt-4 numbers-bar-track">
                  <div className="numbers-bar-fill" style={{ width: `${it.pct}%` }} />
                </div>
                <div className="mt-2 font-mono text-[10.5px] uppercase tracking-wide text-steel">
                  {it.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="border-t border-line hero-gradient py-16 md:py-22">
        <div className="mx-auto flex max-w-wrap flex-wrap items-end justify-between gap-8 px-6 md:gap-10 md:px-8">
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
