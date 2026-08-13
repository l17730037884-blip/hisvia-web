"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/locales";
import type { AssetEntry } from "@/lib/content-v2/types";
import { PremiumCTA } from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, LINE_D, ACCENT, NIGHT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   V2 Partners — Partnership Network (主指令 §8: 独立结构)

   不再使用 EditorialHero。专属结构：
   1. Partnership Hero — 全屏深色(不复用 EditorialHero)
   2. Partnership Models — 3种合作类型横向选择器
   3. Value Proposition — 大字编号列表(非卡片)
   4. Requirements + Onboarding — 双栏(非重复section)
   5. Business Model — 数据面板(收入/投资/支持)
   6. CTA
   ============================================================ */

interface PartnerTypeData {
  id: string;
  route: string;
  title: string;
  target_audience: string;
  value_proposition: string[];
  requirements: string[];
  onboarding_process: string[];
  business_model?: {
    model_type?: string;
    revenue_sources?: string[];
    investment_required?: string;
    support_provided?: string[];
    note?: string;
  };
}

interface V2PartnersExperienceProps {
  locale: Locale;
  partner: PartnerTypeData;
  allTypes: PartnerTypeData[];
  heroAsset: AssetEntry | null;
}

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Partnership Network · Distributor / Service / Agent", ru: "Партнёрская сеть · Дистрибьютор / Сервис / Агент", zh: "合作网络 · 经销商 / 服务 / 代理" },
  heroCta: { en: "Become a Partner", ru: "Стать партнёром", zh: "成为合作伙伴" },
  heroCta2: { en: "See partnership models", ru: "Модели партнёрства", zh: "查看合作模式" },
  modelEyebrow: { en: "Partnership Models", ru: "Модели партнёрства", zh: "合作模式" },
  modelTitle: { en: "Three ways to partner with HISVIA", ru: "Три способа сотрудничества с HISVIA", zh: "与 HISVIA 合作的三种方式" },
  modelDesc: { en: "Each model serves a different position in the industrial supply chain. Choose the one that matches your capability and market.", ru: "Каждая модель занимает своё место в промышленной цепочке поставок. Выберите подходящую вашим возможностям и рынку.", zh: "每种模式在工业供应链中占据不同位置。选择与您的能力和市场匹配的模式。" },
  valEyebrow: { en: "Value Proposition", ru: "Ценностное предложение", zh: "价值主张" },
  valTitle: { en: "Why partners work with HISVIA", ru: "Почему партнёры работают с HISVIA", zh: "合作伙伴为何选择 HISVIA" },
  reqEyebrow: { en: "Requirements", ru: "Требования", zh: "要求" },
  reqTitle: { en: "What we look for", ru: "Что мы ищем", zh: "我们寻找什么" },
  onbEyebrow: { en: "Onboarding", ru: "Подключение", zh: "入驻流程" },
  onbTitle: { en: "How the partnership begins", ru: "Как начинается партнёрство", zh: "合作如何开始" },
  bmEyebrow: { en: "Business Model", ru: "Бизнес-модель", zh: "商业模式" },
  bmTitle: { en: "How the partnership works commercially", ru: "Как партнёрство работает коммерчески", zh: "合作如何商业运作" },
  bmRevenue: { en: "Revenue sources", ru: "Источники дохода", zh: "收入来源" },
  bmInvest: { en: "Investment required", ru: "Требуемые инвестиции", zh: "所需投资" },
  bmSupport: { en: "Support provided", ru: "Предоставляемая поддержка", zh: "提供的支持" },
  bmNote: { en: "Note", ru: "Примечание", zh: "注意" },
  ctaKicker: { en: "Partnership", ru: "Партнёрство", zh: "合作" },
  ctaTitle: { en: "Become a HISVIA partner", ru: "Станьте партнёром HISVIA", zh: "成为 HISVIA 合作伙伴" },
  ctaDesc: { en: "Tell us about your market and capabilities. Our team responds with a cooperation model.", ru: "Расскажите о вашем рынке и возможностях — команда ответит моделью сотрудничества.", zh: "介绍您的市场与能力，团队将回复合作模式。" },
  ctaBtn: { en: "Become a Partner →", ru: "Стать партнёром →", zh: "成为合作伙伴 →" },
  current: { en: "Current", ru: "Текущий", zh: "当前" },
  view: { en: "View", ru: "Смотреть", zh: "查看" },
};

export default function V2PartnersExperience(props: V2PartnersExperienceProps) {
  const { locale, partner, allTypes, heroAsset } = props;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const requestHref = `/v2/${locale}/request`;
  const heroImg = heroAsset?.path || null;
  const bm = partner.business_model;

  const V2CSS = ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}";

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* ===================================================
          1 — PARTNERSHIP HERO (专属全屏深色)
          =================================================== */}
      <section className="v2premium relative flex min-h-[70vh] flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        {heroImg && (
          <div className="absolute inset-0">
            <img src={heroImg} alt={partner.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,19,21,0.5) 0%, rgba(16,19,21,0.35) 40%, rgba(16,19,21,0.9) 100%)" }} />
          </div>
        )}
        {!heroImg && <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1e22 0%, #101315 100%)" }} />}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 md:px-10 pb-16 pt-32">
          <motion.div {...reveal} className="mono flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase" }}>
            <span className="inline-block h-px w-10" style={{ background: ACCENT }} />
            {t("kicker")}
          </motion.div>
          <motion.h1 {...reveal} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="display mt-5 max-w-[1000px] text-[clamp(34px,5vw,68px)] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ color: "#F3F2EC" }}>
            {partner.title}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-[680px] text-[15.5px] leading-relaxed" style={{ color: "#C6C9CB" }}>
            {partner.target_audience}
          </motion.p>
          <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mt-8">
            <a href={requestHref} className="display inline-block px-8 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>{t("heroCta")}</a>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          2 — PARTNERSHIP MODELS (3种合作类型选择器)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[760px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("modelEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("modelTitle")}</motion.h2>
            <motion.p {...reveal} className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("modelDesc")}</motion.p>
          </div>
          <div className="mt-12 border-t" style={{ borderColor: LINE }}>
            {allTypes.map((pt, i) => {
              const active = pt.id === partner.id;
              return (
                <motion.a
                  key={pt.id}
                  {...reveal}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                  href={`/v2/${locale}${pt.route}`}
                  className="group grid gap-4 border-b py-8 transition-colors hover:bg-[#EFEEE6] md:grid-cols-[80px_1fr_auto] md:items-center md:gap-8"
                  style={{ borderColor: LINE, background: active ? PAPER_D : "transparent" }}
                >
                  <span className="mono text-[11px] tracking-[0.2em]" style={{ color: active ? ACCENT : FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="display text-[clamp(18px,1.7vw,26px)] font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: INK }}>{pt.title}</h3>
                    <p className="mt-2 max-w-[640px] text-[13.5px] leading-relaxed" style={{ color: DIM }}>{pt.target_audience}</p>
                  </div>
                  <span className="mono text-[10px] tracking-[0.14em] uppercase" style={{ color: active ? ACCENT : DIM }}>
                    {active ? t("current") : t("view")} →
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          3 — VALUE PROPOSITION (大字编号列表)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("valEyebrow")}</motion.p>
          <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("valTitle")}</motion.h2>
          <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {partner.value_proposition.map((vp, i) => (
              <motion.div key={vp} {...reveal} transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                className="border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                <span className="mono text-[10px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="display mt-2 text-[clamp(15px,1.4vw,19px)] font-medium leading-snug tracking-[-0.01em]" style={{ color: INK }}>{vp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          4 — REQUIREMENTS + ONBOARDING (双栏)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Requirements */}
            <div>
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("reqEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(24px,2.6vw,38px)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: INK }}>{t("reqTitle")}</motion.h2>
              <div className="mt-8 border-t" style={{ borderColor: LINE_D }}>
                {partner.requirements.map((r, i) => (
                  <motion.div key={r} {...reveal} transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                    className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: LINE_D }}>
                    <span className="mono text-[10px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                    <p className="display text-[14.5px] font-medium tracking-[-0.01em]" style={{ color: INK }}>{r}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Onboarding */}
            <div>
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("onbEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(24px,2.6vw,38px)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: INK }}>{t("onbTitle")}</motion.h2>
              <div className="mt-8 border-t" style={{ borderColor: LINE_D }}>
                {partner.onboarding_process.map((step, i) => (
                  <motion.div key={step} {...reveal} transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                    className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: LINE_D }}>
                    <span className="mono text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                    <p className="display text-[14.5px] font-medium tracking-[-0.01em]" style={{ color: INK }}>{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          5 — BUSINESS MODEL (数据面板)
          =================================================== */}
      {bm && (
        <section className="v2premium border-y" style={{ borderColor: NIGHT, background: NIGHT }}>
          <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
          <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("bmEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(26px,2.8vw,42px)] font-semibold leading-[1.03] tracking-[-0.03em]" style={{ color: "#F3F2EC" }}>{t("bmTitle")}</motion.h2>

            <div className="mt-12 grid gap-px lg:grid-cols-3" style={{ background: "#2A2E31" }}>
              {/* Revenue */}
              {bm.revenue_sources && bm.revenue_sources.length > 0 && (
                <div className="p-7" style={{ background: NIGHT }}>
                  <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("bmRevenue")}</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {bm.revenue_sources.map((r) => (
                      <li key={r} className="flex items-baseline gap-2.5 text-[13px] leading-relaxed" style={{ color: "#E0E0DC" }}>
                        <span className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-1px]" style={{ background: ACCENT }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Investment */}
              <div className="p-7" style={{ background: NIGHT }}>
                <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("bmInvest")}</p>
                <p className="display mt-4 text-[15px] font-medium leading-snug" style={{ color: "#F3F2EC" }}>{bm.investment_required}</p>
                {bm.support_provided && bm.support_provided.length > 0 && (
                  <div className="mt-6 border-t pt-5" style={{ borderColor: "#2A2E31" }}>
                    <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: "#6E7377" }}>{t("bmSupport")}</p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {bm.support_provided.map((s) => (
                        <li key={s} className="text-[12px] leading-relaxed" style={{ color: "#9FA3A6" }}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Model type + note */}
              <div className="p-7" style={{ background: NIGHT }}>
                {bm.model_type && (
                  <>
                    <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: "#6E7377" }}>Model</p>
                    <p className="display mt-2 text-[15px] font-semibold tracking-[-0.01em]" style={{ color: "#F3F2EC" }}>{bm.model_type}</p>
                  </>
                )}
                {bm.note && (
                  <div className="mt-6 border-l-2 pl-4" style={{ borderColor: ACCENT }}>
                    <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("bmNote")}</p>
                    <p className="mt-2 text-[12px] leading-relaxed" style={{ color: "#9FA3A6" }}>{bm.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          6 — CTA
          =================================================== */}
      <PremiumCTA
        locale={locale}
        kicker={t("ctaKicker")}
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        ctaLabel={t("ctaBtn")}
        href={requestHref}
        note={allTypes.map((p) => p.title).join(" · ")}
      />
    </main>
  );
}
