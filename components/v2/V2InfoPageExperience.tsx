"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import type { AssetEntry } from "@/lib/content-v2/types";
import { PremiumCTA } from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, LINE_D, ACCENT, NIGHT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   V2 Info Page — Flexible info page with unique composition
   (主指令 §8: 每种页面类型必须有自己的composition)

   不再使用 V2BrandPage/V2EditorialHero(重复的左文字+右图片模式)。
   专属结构：
   1. Info Hero — 全屏深色(不复用 EditorialHero)
   2. Flexible Sections — 每个section有独立布局
   3. CTA

   Section types:
   - "numbered": 大编号列表(border-l accent)
   - "steps": 垂直时间线(编号+标题+描述)
   - "split": 图文并排(image + text)
   - "links": 链接卡片列表
   - "statement": 大字声明
   - "data": 数据网格
   ============================================================ */

export interface InfoSection {
  type: "numbered" | "steps" | "split" | "links" | "statement" | "data";
  eyebrow?: string;
  title?: string;
  desc?: string;
  items?: string[];
  steps?: { title: string; desc: string }[];
  links?: { label: string; href: string; note?: string }[];
  asset?: AssetEntry | null;
  reverse?: boolean;
  bg?: "paper" | "paperD" | "night";
  bullets?: string[];
  data?: { label: string; value: string }[];
}

interface V2InfoPageExperienceProps {
  locale: Locale;
  heroKicker: string;
  heroTitle: string;
  heroDesc: string;
  heroAsset?: AssetEntry | null;
  heroCta?: { label: string; href: string };
  heroCta2?: { label: string; href: string };
  sections: InfoSection[];
  cta: {
    kicker: string;
    title: string;
    desc: string;
    label: string;
    href: string;
    note?: string;
  };
}

const V2CSS = ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}";

function bgFor(bg?: string): string {
  if (bg === "night") return NIGHT;
  if (bg === "paperD") return PAPER_D;
  return PAPER;
}

export default function V2InfoPageExperience(props: V2InfoPageExperienceProps) {
  const { locale, heroKicker, heroTitle, heroDesc, heroAsset, heroCta, heroCta2, sections, cta } = props;
  const heroImg = heroAsset?.path || null;

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* ===================================================
          1 — INFO HERO (专属全屏深色)
          =================================================== */}
      <section className="v2premium relative flex min-h-[60vh] flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        {heroImg && (
          <div className="absolute inset-0">
            <img src={heroImg} alt={heroTitle} className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,19,21,0.5) 0%, rgba(16,19,21,0.35) 40%, rgba(16,19,21,0.9) 100%)" }} />
          </div>
        )}
        {!heroImg && <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1e22 0%, #101315 100%)" }} />}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 md:px-10 pb-16 pt-32">
          <motion.div {...reveal} className="mono flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase" }}>
            <span className="inline-block h-px w-10" style={{ background: ACCENT }} />
            {heroKicker}
          </motion.div>
          <motion.h1 {...reveal} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="display mt-5 max-w-[1100px] text-[clamp(34px,5vw,68px)] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ color: "#F3F2EC" }}>
            {heroTitle}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-[680px] text-[15.5px] leading-relaxed" style={{ color: "#C6C9CB" }}>
            {heroDesc}
          </motion.p>
          {(heroCta || heroCta2) && (
            <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mt-8 flex flex-wrap gap-4">
              {heroCta && (
                <a href={heroCta.href} className="display px-8 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>{heroCta.label}</a>
              )}
              {heroCta2 && (
                <a href={heroCta2.href} className="mono border px-6 py-3.5 text-[10.5px] tracking-[0.16em] uppercase text-white/90 transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.3)" }}>{heroCta2.label}</a>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===================================================
          2 — FLEXIBLE SECTIONS
          =================================================== */}
      {sections.map((s, i) => {
        const bg = bgFor(s.bg);
        const isDark = s.bg === "night";
        const textColor = isDark ? "#F3F2EC" : INK;
        const dimColor = isDark ? "#9FA3A6" : DIM;
        const faintColor = isDark ? "#6E7377" : FAINT;
        const lineColor = isDark ? "#2A2E31" : LINE;

        return (
          <section key={i} className="v2premium border-b" style={{ borderColor: isDark ? NIGHT : LINE, background: bg }}>
            <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
            <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">

              {/* NUMBERED — 大编号列表 */}
              {s.type === "numbered" && (
                <>
                  {s.eyebrow && (
                    <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{s.eyebrow}</motion.p>
                  )}
                  {s.title && (
                    <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: textColor }}>{s.title}</motion.h2>
                  )}
                  {s.desc && (
                    <motion.p {...reveal} className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed" style={{ color: dimColor }}>{s.desc}</motion.p>
                  )}
                  <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
                    {s.items?.map((item, j) => (
                      <motion.div key={j} {...reveal} transition={{ duration: 0.5, delay: 0.04 * j, ease: EASE }}
                        className="border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                        <span className="mono text-[10px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{String(j + 1).padStart(2, "0")}</span>
                        <p className="display mt-2 text-[clamp(15px,1.4vw,19px)] font-medium leading-snug tracking-[-0.01em]" style={{ color: textColor }}>{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {/* STEPS — 垂直时间线 */}
              {s.type === "steps" && (
                <>
                  {s.eyebrow && (
                    <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{s.eyebrow}</motion.p>
                  )}
                  {s.title && (
                    <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: textColor }}>{s.title}</motion.h2>
                  )}
                  {s.desc && (
                    <motion.p {...reveal} className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed" style={{ color: dimColor }}>{s.desc}</motion.p>
                  )}
                  <div className="mt-12 border-t" style={{ borderColor: lineColor }}>
                    {s.steps?.map((step, j) => (
                      <motion.div key={j} {...reveal} transition={{ duration: 0.5, delay: 0.04 * j, ease: EASE }}
                        className="grid gap-3 border-b py-6 md:grid-cols-[80px_280px_1fr] md:gap-6" style={{ borderColor: lineColor }}>
                        <span className="mono text-[11px] tracking-[0.2em]" style={{ color: faintColor }}>{String(j + 1).padStart(2, "0")}</span>
                        <h3 className="display text-[clamp(15px,1.4vw,20px)] font-semibold tracking-[-0.02em]" style={{ color: textColor }}>{step.title}</h3>
                        <p className="text-[13.5px] leading-relaxed" style={{ color: dimColor }}>{step.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {/* SPLIT — 图文并排 */}
              {s.type === "split" && (
                <div className={`grid gap-6 lg:grid-cols-2 lg:gap-12 ${s.reverse ? "lg:grid-flow-dense" : ""}`}>
                  <div className={`flex flex-col justify-center ${s.reverse ? "lg:col-start-2" : ""}`}>
                    {s.eyebrow && (
                      <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{s.eyebrow}</motion.p>
                    )}
                    {s.title && (
                      <motion.h2 {...reveal} className="display mt-4 text-[clamp(26px,2.8vw,42px)] font-semibold leading-[1.03] tracking-[-0.03em]" style={{ color: textColor }}>{s.title}</motion.h2>
                    )}
                    {s.desc && (
                      <motion.p {...reveal} className="mt-5 max-w-[520px] text-[14.5px] leading-relaxed" style={{ color: dimColor }}>{s.desc}</motion.p>
                    )}
                    {s.bullets && s.bullets.length > 0 && (
                      <div className="mt-8 border-t" style={{ borderColor: lineColor }}>
                        {s.bullets.map((b, j) => (
                          <motion.div key={j} {...reveal} transition={{ duration: 0.4, delay: 0.04 * j, ease: EASE }}
                            className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: lineColor }}>
                            <span className="mono text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>{String(j + 1).padStart(2, "0")}</span>
                            <p className="display text-[14px] font-medium tracking-[-0.01em]" style={{ color: textColor }}>{b}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`overflow-hidden border ${s.reverse ? "lg:col-start-1 lg:row-start-1" : ""}`} style={{ borderColor: isDark ? "#2A2E31" : LINE_D }}>
                    {s.asset ? (
                      <img src={s.asset.path} alt={s.asset.filename} className="aspect-[4/3] w-full object-cover" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center" style={{ background: isDark ? "#1a1e22" : PAPER_D }}>
                        <span className="mono text-[8px] uppercase" style={{ color: faintColor }}>HISVIA</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LINKS — 链接卡片列表 */}
              {s.type === "links" && (
                <>
                  {s.eyebrow && (
                    <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{s.eyebrow}</motion.p>
                  )}
                  {s.title && (
                    <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: textColor }}>{s.title}</motion.h2>
                  )}
                  {s.desc && (
                    <motion.p {...reveal} className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed" style={{ color: dimColor }}>{s.desc}</motion.p>
                  )}
                  <div className="mt-12 border-t" style={{ borderColor: lineColor }}>
                    {s.links?.map((link, j) => (
                      <motion.a key={j} {...reveal} transition={{ duration: 0.5, delay: 0.04 * j, ease: EASE }}
                        href={link.href}
                        className="group grid gap-4 border-b py-8 transition-colors hover:bg-[#EFEEE6] md:grid-cols-[80px_1fr_auto] md:items-center md:gap-8"
                        style={{ borderColor: lineColor }}>
                        <span className="mono text-[11px] tracking-[0.2em]" style={{ color: faintColor }}>{String(j + 1).padStart(2, "0")}</span>
                        <div>
                          <h3 className="display text-[clamp(16px,1.5vw,22px)] font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: textColor }}>{link.label}</h3>
                          {link.note && <p className="mt-2 max-w-[640px] text-[13.5px] leading-relaxed" style={{ color: dimColor }}>{link.note}</p>}
                        </div>
                        <span className="mono text-[10px] tracking-[0.14em] uppercase" style={{ color: dimColor }}>→</span>
                      </motion.a>
                    ))}
                  </div>
                </>
              )}

              {/* STATEMENT — 大字声明 */}
              {s.type === "statement" && (
                <div className="border-l-2 pl-8" style={{ borderColor: ACCENT }}>
                  {s.eyebrow && (
                    <motion.p {...reveal} className="mono" style={{ fontSize: 9, letterSpacing: "0.22em", color: ACCENT, textTransform: "uppercase" }}>{s.eyebrow}</motion.p>
                  )}
                  {s.title && (
                    <motion.p {...reveal} className="display mt-4 max-w-[860px] text-[clamp(16px,1.6vw,22px)] font-medium leading-[1.5] tracking-[-0.01em]" style={{ color: textColor }}>{s.title}</motion.p>
                  )}
                  {s.items && s.items.length > 0 && (
                    <div className="mt-8 grid gap-x-12 gap-y-4 md:grid-cols-2">
                      {s.items.map((item, j) => (
                        <motion.div key={j} {...reveal} transition={{ duration: 0.4, delay: 0.04 * j, ease: EASE }}
                          className="flex items-baseline gap-3">
                          <span className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-1px]" style={{ background: ACCENT }} />
                          <p className="text-[14px] leading-relaxed" style={{ color: dimColor }}>{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* DATA — 数据网格 */}
              {s.type === "data" && (
                <>
                  {s.eyebrow && (
                    <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{s.eyebrow}</motion.p>
                  )}
                  {s.title && (
                    <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: textColor }}>{s.title}</motion.h2>
                  )}
                  <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: lineColor }}>
                    {s.data?.map((d, j) => (
                      <motion.div key={j} {...reveal} transition={{ duration: 0.4, delay: 0.04 * j, ease: EASE }}
                        className="p-6" style={{ background: bg }}>
                        <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: faintColor }}>{d.label}</p>
                        <p className="display mt-2 text-[clamp(18px,1.8vw,24px)] font-semibold tracking-[-0.02em]" style={{ color: textColor }}>{d.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* ===================================================
          3 — CTA
          =================================================== */}
      <PremiumCTA
        locale={locale}
        kicker={cta.kicker}
        title={cta.title}
        desc={cta.desc}
        ctaLabel={cta.label}
        href={cta.href}
        note={cta.note}
      />
    </main>
  );
}
