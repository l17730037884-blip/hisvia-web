"use client";

import { motion } from "framer-motion";
import type { AssetEntry } from "@/lib/content-v2/types";
import V2EditorialHero from "./V2EditorialHero";
import V2SectionHead from "./V2SectionHead";
import V2EditorialCTA from "./V2EditorialCTA";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, LINE_D, ACCENT, BRAND_CSS, reveal, EASE } from "./V2BrandKit";

/* ============================================================
   V2BrandPage — editorial renderer for brand IA pages
   (About, How We Work, For Factories, Verification, Contact).

   Renders ONLY with the frozen A-system kit:
   V2EditorialHero · V2SectionHead · V2EditorialCTA · V2BrandKit.
   No new visual system, no cards, no dashboards.
   ============================================================ */

export interface BrandListSection {
  type: "list";
  eyebrow: string;
  title: string;
  desc?: string;
  items: string[];
  twoCol?: boolean;
}

export interface BrandStepsSection {
  type: "steps";
  eyebrow: string;
  title: string;
  desc?: string;
  steps: Array<{ title: string; desc: string }>;
}

export interface BrandSplitSection {
  type: "split";
  eyebrow: string;
  title: string;
  desc?: string;
  bullets: string[];
  asset: AssetEntry | null;
  reverse?: boolean;
}

export interface BrandLinksSection {
  type: "links";
  eyebrow: string;
  title: string;
  desc?: string;
  items: Array<{ label: string; href: string; note?: string }>;
}

export type BrandSection = BrandListSection | BrandStepsSection | BrandSplitSection | BrandLinksSection;

interface V2BrandPageProps {
  kicker: string;
  heroTitle: string;
  heroDesc: string;
  heroAsset?: AssetEntry | null;
  heroCta?: { label: string; href: string };
  sections: BrandSection[];
  cta: { eyebrow: string; title: string; desc?: string; label: string; href: string; note?: string };
}

export default function V2BrandPage({ kicker, heroTitle, heroDesc, heroAsset, heroCta, sections, cta }: V2BrandPageProps) {
  return (
    <main className="v2sub relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_CSS }} />

      <V2EditorialHero kicker={kicker} title={heroTitle} description={heroDesc} asset={heroAsset} cta={heroCta} />

      {sections.map((section, idx) => {
        const tone = idx % 2 === 0 ? PAPER : PAPER_D;
        return (
          <section key={`${section.eyebrow}-${idx}`} className="border-b py-16 lg:py-24" style={{ borderColor: LINE, background: tone }}>
            <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
              {section.type === "list" && (
                <>
                  <V2SectionHead eyebrow={section.eyebrow} title={section.title} desc={section.desc} />
                  <div className={`mt-10 border-t ${section.twoCol ? "grid gap-x-12 md:grid-cols-2" : ""}`} style={{ borderColor: LINE_D }}>
                    {section.items.map((item, i) => (
                      <motion.div key={item} {...reveal} transition={{ duration: 0.6, delay: 0.02 * i, ease: EASE }}
                        className="flex items-baseline gap-5 border-b py-5" style={{ borderColor: LINE_D }}>
                        <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                        <p className="display text-[16px] font-medium leading-snug tracking-[-0.01em]" style={{ color: INK }}>{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {section.type === "steps" && (
                <>
                  <V2SectionHead eyebrow={section.eyebrow} title={section.title} desc={section.desc} />
                  <div className="mt-10 border-t" style={{ borderColor: LINE_D }}>
                    {section.steps.map((step, i) => (
                      <motion.div key={step.title} {...reveal} transition={{ duration: 0.6, delay: 0.03 * i, ease: EASE }}
                        className="grid gap-3 border-b py-7 md:grid-cols-[120px_1fr] md:gap-10" style={{ borderColor: LINE_D }}>
                        <span className="mono text-[11px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <p className="display text-[19px] font-semibold leading-snug tracking-[-0.015em]" style={{ color: INK }}>{step.title}</p>
                          <p className="mt-2 max-w-[640px] text-[14px] leading-relaxed" style={{ color: DIM }}>{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {section.type === "split" && (
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={section.reverse ? "lg:order-2" : ""}>
                    <V2SectionHead eyebrow={section.eyebrow} title={section.title} desc={section.desc} />
                    <ul className="mt-8 flex flex-col gap-3">
                      {section.bullets.map((b) => (
                        <li key={b} className="display flex items-baseline gap-2.5 text-[14px] font-medium leading-snug tracking-[-0.01em]" style={{ color: INK }}>
                          <span className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-1px]" style={{ background: ACCENT }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <motion.div {...reveal} className={`aspect-[4/3] overflow-hidden border lg:min-h-[420px] ${section.reverse ? "lg:order-1" : ""}`} style={{ borderColor: LINE_D }}>
                    {section.asset ? (
                      <img src={section.asset.path} alt={section.asset.filename} className="h-full w-full object-cover" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
                    ) : (
                      <div className="flex h-full w-full items-end px-6 py-6" style={{ background: PAPER_D }}>
                        <p className="mono text-[10px] tracking-[0.18em] uppercase" style={{ color: FAINT }}>{section.eyebrow}</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {section.type === "links" && (
                <>
                  <V2SectionHead eyebrow={section.eyebrow} title={section.title} desc={section.desc} />
                  <div className="mt-10 grid gap-4 md:grid-cols-2">
                    {section.items.map((item, i) => (
                      <motion.a key={item.href} {...reveal} transition={{ duration: 0.6, delay: 0.02 * i, ease: EASE }} href={item.href}
                        className="group border px-6 py-6 transition-colors" style={{ borderColor: LINE_D, background: "#fff" }}>
                        <p className="display text-[16px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>
                          {item.label} <span style={{ color: ACCENT }}>→</span>
                        </p>
                        {item.note && <p className="mt-2 text-[13px] leading-relaxed" style={{ color: DIM }}>{item.note}</p>}
                      </motion.a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}

      <V2EditorialCTA eyebrow={cta.eyebrow} title={cta.title} desc={cta.desc} ctaLabel={cta.label} href={cta.href} note={cta.note} />
    </main>
  );
}
