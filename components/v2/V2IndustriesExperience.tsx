"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/locales";
import type { AssetEntry } from "@/lib/content-v2/types";
import { PremiumCTA } from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, ACCENT, NIGHT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   V2 Industries — Industry Immersion Page (主指令 §11)

   不再复用首页 IndustrialHero。专属叙事结构：
   1. Immersion Hero — 全屏行业现场视觉
   2. The Problem — 买家痛点(大字编辑式)
   3. Equipment in the Field — 现场设备
   4. When Equipment Fails — 维护/故障需求
   5. Components You Need — 所需部件
   6. HISVIA Systems — 服务该行业的系统
   7. Manufacturing Capabilities — 制造能力
   8. Evidence — 质量验证
   9. Request — CTA

   目标："我是矿业采购，我终于看到我的问题。"
   ============================================================ */

interface IndustryData {
  id: string;
  title: string;
  buyer_pain_point: string;
  relevant_systems: string[];
  typical_equipment: string[];
  sourcing_priorities: string[];
}

interface V2IndustriesExperienceProps {
  locale: Locale;
  industry: IndustryData;
  heroAsset: AssetEntry | null;
  challengeAsset: AssetEntry | null;
  evidenceAsset: AssetEntry | null;
  qualitySystems: string[];
  exportCapability: string[];
  regions: Array<{ region: string; specialization: string[]; description: string }>;
  solutionLinks: Array<{ label: string; href: string }>;
  capabilities: Array<{ name: string; description: string }>;
}

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Industry Immersion · China Supply", ru: "Погружение в отрасль · Китай", zh: "行业沉浸 · 中国供应" },
  heroCta: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" },
  heroCta2: { en: "See the problem", ru: "В чем проблема", zh: "查看痛点" },
  probEyebrow: { en: "The Problem", ru: "Проблема", zh: "问题" },
  probTitle: { en: "What buyers in this industry actually face", ru: "С чем сталкиваются покупатели в этой отрасли", zh: "该行业买家真正面对的" },
  eqEyebrow: { en: "Equipment in the Field", ru: "Оборудование на объекте", zh: "现场设备" },
  eqTitle: { en: "Equipment this industry runs on", ru: "Оборудование, на котором работает отрасль", zh: "该行业运行的设备" },
  failEyebrow: { en: "When Equipment Fails", ru: "Когда оборудование ломается", zh: "当设备故障时" },
  failTitle: { en: "Maintenance & replacement needs", ru: "Потребности в обслуживании и замене", zh: "维护与更换需求" },
  compEyebrow: { en: "Components You Need", ru: "Нужные компоненты", zh: "所需部件" },
  compTitle: { en: "From our library, mapped to this industry", ru: "Из нашей базы — для этой отрасли", zh: "来自图库，匹配该行业" },
  compDesc: { en: "These are the component families our network manufactures for this industry. Each links to a verified system.", ru: "Это семейства компонентов, которые наша сеть производит для этой отрасли.", zh: "这些是我们的网络为该行业制造的部件族，每个链接到验证系统。" },
  sysEyebrow: { en: "HISVIA Systems", ru: "Системы HISVIA", zh: "HISVIA 系统" },
  sysTitle: { en: "Systems that serve this industry", ru: "Системы, обслуживающие отрасль", zh: "服务该行业的系统" },
  capEyebrow: { en: "Manufacturing Capabilities", ru: "Производственные возможности", zh: "制造能力" },
  capTitle: { en: "Capabilities behind the supply", ru: "Возможности за поставкой", zh: "供应背后的能力" },
  evEyebrow: { en: "Evidence", ru: "Доказательства", zh: "验证" },
  evTitle: { en: "Verified network, every industry", ru: "Проверенная сеть — для каждой отрасли", zh: "验证网络，每个行业" },
  evDesc: { en: "Published network-level standards apply to every industry. Per-factory documents are collected during sourcing.", ru: "Опубликованные сетевые стандарты действуют для каждой отрасли.", zh: "公开网络级标准适用于每个行业。" },
  ctaKicker: { en: "Start Sourcing", ru: "Начать закупку", zh: "开始采购" },
  ctaTitle: { en: "Source parts for this industry from verified manufacturers", ru: "Закупите детали для этой отрасли у проверенных заводов", zh: "从验证制造商采购该行业零件" },
  ctaDesc: { en: "Describe your requirement in plain language. Our team responds with a structured sourcing path.", ru: "Опишите потребность — команда ответит планом закупки.", zh: "用自然语言描述您的需求，团队将回复结构化采购路径。" },
  ctaBtn: { en: "Submit a Request →", ru: "Отправить запрос →", zh: "提交需求 →" },
  ctaNote: { en: "Free · No obligation · Verified suppliers", ru: "Бесплатно · Без обязательств", zh: "免费 · 无义务 · 验证供应商" },
};

function heroImageSrc(asset: AssetEntry | null | undefined): string | null {
  if (!asset) return null;
  return asset.path || null;
}

export default function V2IndustriesExperience(props: V2IndustriesExperienceProps) {
  const { locale, industry, heroAsset, challengeAsset, evidenceAsset, qualitySystems, solutionLinks, capabilities } = props;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const requestHref = `/v2/${locale}/request`;

  const heroImg = heroImageSrc(heroAsset);
  const challengeImg = heroImageSrc(challengeAsset);
  const evidenceImg = heroImageSrc(evidenceAsset);

  const V2PREMIUM_CSS = ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}";

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* ===================================================
          1 — IMMERSION HERO (全屏行业现场视觉)
          专属：不同于首页配件Hero和Solutions系统Hero
          =================================================== */}
      <section className="v2premium relative flex min-h-screen flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2PREMIUM_CSS }} />
        {heroImg && (
          <div className="absolute inset-0">
            <img src={heroImg} alt={industry.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,19,21,0.3) 0%, rgba(16,19,21,0.15) 35%, rgba(16,19,21,0.8) 85%, rgba(16,19,21,0.95) 100%)" }} />
          </div>
        )}
        {!heroImg && <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1e22 0%, #101315 100%)" }} />}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 md:px-10 pb-20 pt-40">
          <motion.div {...reveal} className="mono flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase" }}>
            <span className="inline-block h-px w-10" style={{ background: ACCENT }} />
            {t("kicker")}
          </motion.div>
          <motion.h1 {...reveal} transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="display mt-6 max-w-[1100px] text-[clamp(40px,7vw,96px)] font-semibold leading-[0.95] tracking-[-0.045em]" style={{ color: PAPER }}>
            {industry.title}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="mt-8 max-w-[640px] text-[16px] leading-relaxed" style={{ color: "#C6C9CB" }}>
            {industry.buyer_pain_point}
          </motion.p>
          <motion.div {...reveal} transition={{ duration: 1, delay: 0.35, ease: EASE }} className="mt-10 flex flex-wrap gap-4">
            <a href={requestHref} className="display px-9 py-4 text-[14.5px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>{t("heroCta")}</a>
            <a href="#problem" className="mono border px-6 py-4 text-[10.5px] tracking-[0.16em] uppercase text-white/90 transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.3)" }}>{t("heroCta2")}</a>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          2 — THE PROBLEM (大字编辑式叙事)
          =================================================== */}
      <section id="problem" className="v2premium scroll-mt-16 border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2PREMIUM_CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-20 lg:py-32">
          <motion.p {...reveal} className="mono" style={{ fontSize: 9, letterSpacing: "0.28em", color: ACCENT, textTransform: "uppercase" }}>{t("probEyebrow")}</motion.p>
          <motion.h2 {...reveal} transition={{ duration: 0.9, ease: EASE }}
            className="display mt-6 max-w-[1200px] text-[clamp(28px,4.5vw,64px)] font-semibold leading-[1.05] tracking-[-0.04em]" style={{ color: INK }}>
            {t("probTitle")}
          </motion.h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <motion.p {...reveal} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="text-[clamp(17px,1.8vw,22px)] leading-[1.5] font-medium" style={{ color: INK }}>
              {industry.buyer_pain_point}
            </motion.p>
            {challengeImg && (
              <motion.div {...reveal} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} className="group overflow-hidden">
                <img src={challengeImg} alt="Industry challenge" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          3 — EQUIPMENT IN THE FIELD
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
        <style dangerouslySetInnerHTML={{ __html: V2PREMIUM_CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("eqEyebrow")}</motion.p>
          <motion.h2 {...reveal} className="display mt-4 text-[clamp(26px,3vw,44px)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: INK }}>{t("eqTitle")}</motion.h2>
          <div className="mt-10 border-t" style={{ borderColor: LINE }}>
            {industry.typical_equipment.slice(0, 8).map((eq, i) => (
              <motion.div key={eq} {...reveal} transition={{ duration: 0.5, delay: 0.03 * i, ease: EASE }}
                className="group flex items-baseline gap-5 border-b py-5 transition-colors hover:bg-[#EFEEE6]" style={{ borderColor: LINE }}>
                <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="display flex-1 text-[clamp(15px,1.4vw,20px)] font-medium tracking-[-0.01em] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: INK }}>{eq}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          4 — WHEN EQUIPMENT FAILS (维护/故障需求)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: NIGHT, background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2PREMIUM_CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("failEyebrow")}</motion.p>
          <motion.h2 {...reveal} className="display mt-4 max-w-[820px] text-[clamp(28px,3.4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: PAPER }}>{t("failTitle")}</motion.h2>
          <div className="mt-12 grid gap-px md:grid-cols-2" style={{ background: "#2A2E31" }}>
            {industry.sourcing_priorities.slice(0, 6).map((p, i) => (
              <motion.div key={p} {...reveal} transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }} className="p-7" style={{ background: NIGHT }}>
                <span className="mono text-[10px] tracking-[0.22em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="display mt-3 text-[clamp(16px,1.5vw,21px)] font-medium leading-snug tracking-[-0.02em]" style={{ color: PAPER }}>{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          5 — COMPONENTS YOU NEED + 6 — HISVIA SYSTEMS
          合并：部件族→系统链接
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2PREMIUM_CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[720px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("compEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("compTitle")}</motion.h2>
            <motion.p {...reveal} className="mt-5 max-w-[560px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("compDesc")}</motion.p>
          </div>
          <div className="mt-12 border-t" style={{ borderColor: LINE }}>
            {solutionLinks.map((s, i) => (
              <motion.a key={s.label} href={s.href} {...reveal} transition={{ duration: 0.5, delay: 0.03 * i, ease: EASE }}
                className="group flex items-center justify-between gap-6 border-b py-6 transition-colors hover:bg-[#EFEEE6]" style={{ borderColor: LINE }}>
                <div className="flex items-center gap-5">
                  <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="mono text-[9px] tracking-[0.16em] uppercase" style={{ color: ACCENT }}>{t("sysEyebrow")}</p>
                    <p className="display mt-1 text-[clamp(16px,1.5vw,21px)] font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: INK }}>{s.label}</p>
                  </div>
                </div>
                <span className="display shrink-0 text-[18px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: FAINT }}>→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          7 — MANUFACTURING CAPABILITIES
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
        <style dangerouslySetInnerHTML={{ __html: V2PREMIUM_CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("capEyebrow")}</motion.p>
          <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3vw,46px)] font-semibold leading-[1.03] tracking-[-0.03em]" style={{ color: INK }}>{t("capTitle")}</motion.h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {capabilities.slice(0, 6).map((c, i) => (
              <motion.div key={c.name} {...reveal} transition={{ duration: 0.6, delay: 0.06 * i, ease: EASE }} className="border-t-2 pt-6" style={{ borderColor: ACCENT }}>
                <span className="mono text-[10px] tracking-[0.22em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-2 text-[19px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{c.name}</h3>
                <p className="mt-3 text-[13px] leading-relaxed" style={{ color: DIM }}>{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          8 — EVIDENCE
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2PREMIUM_CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("evEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3vw,46px)] font-semibold leading-[1.03] tracking-[-0.03em]" style={{ color: INK }}>{t("evTitle")}</motion.h2>
              <motion.p {...reveal} className="mt-5 max-w-[480px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("evDesc")}</motion.p>
              <motion.div {...reveal} className="mt-8 border-t" style={{ borderColor: LINE }}>
                {qualitySystems.map((q, i) => (
                  <div key={q} className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: LINE }}>
                    <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[15px] font-medium tracking-[-0.01em]" style={{ color: INK }}>{q}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            {evidenceImg && (
              <motion.div {...reveal} className="group overflow-hidden">
                <img src={evidenceImg} alt="Evidence" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          9 — CTA
          =================================================== */}
      <PremiumCTA
        locale={locale}
        kicker={t("ctaKicker")}
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        ctaLabel={t("ctaBtn")}
        href={requestHref}
        note={t("ctaNote")}
      />
    </main>
  );
}
