"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { PremiumCTA } from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, ACCENT, NIGHT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   V2 Replacement — Cross-reference Process (主指令 §5)

   不再使用旧 Tailwind 类。专属结构：
   1. Replacement Hero — 全屏深色 + 交叉参考定位
   2. The Process — 4阶段垂直时间线(Identify→Cross-reference→Sample→Produce)
   3. Important Note — 兼容性声明
   4. CTA
   ============================================================ */

interface V2ReplacementExperienceProps {
  locale: Locale;
}

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Replacement Solutions · Cross-reference Process", ru: "Решения по замене · Кросс-референс", zh: "替代方案 · 交叉参考流程" },
  title: { en: "Send the original. Receive the compatible replacement.", ru: "Отправьте оригинал. Получите совместимый аналог.", zh: "发送原厂件。获得兼容替代。" },
  desc: { en: "Send the original part number, photo, or sample. HISVIA structures the requirement, matches a qualified manufacturer, and delivers compatible replacement components — without implying official brand authorization.", ru: "Отправьте оригинальный номер детали, фото или образец. HISVIA структурирует запрос, подбирает проверенного производителя и поставляет совместимые аналоги — без указания на официальную авторизацию бренда.", zh: "发送原厂零件号、照片或样品。HISVIA 结构化理解需求，匹配合格制造商，交付兼容替代部件 — 不暗示品牌官方授权。" },
  heroCta: { en: "Submit a replacement request", ru: "Отправить запрос на замену", zh: "提交替代需求" },
  back: { en: "All brands", ru: "Все бренды", zh: "全部品牌" },
  procEyebrow: { en: "The Process", ru: "Процесс", zh: "流程" },
  procTitle: { en: "Four stages from original part to compatible replacement", ru: "Четыре этапа от оригинала до аналога", zh: "从原厂件到兼容替代的四个阶段" },
  noteTitle: { en: "Important", ru: "Важно", zh: "重要提示" },
  note: { en: "Brand names are referenced for compatibility identification only. HISVIA does not imply official brand authorization, distribution, or partnership with the brands listed.", ru: "Названия брендов указаны только для идентификации совместимости. HISVIA не подразумевает официальную авторизацию, дистрибуцию или партнёрство с указанными брендами.", zh: "品牌名称仅用于兼容性识别。HISVIA 不暗示与所列品牌的官方授权、经销或合作关系。" },
  ctaKicker: { en: "Start Here", ru: "Начните здесь", zh: "从这里开始" },
  ctaTitle: { en: "Ready to find your replacement?", ru: "Готовы найти аналог?", zh: "准备好寻找替代品了吗？" },
  ctaDesc: { en: "Share the part number, photo, or sample. We respond with a manufacturing path.", ru: "Укажите номер, фото или образец — мы ответим производственным планом.", zh: "提供零件号、照片或样品，我们将回复制造路径。" },
  ctaBtn: { en: "Submit a Replacement Request →", ru: "Отправить запрос →", zh: "提交替代需求 →" },
};

const STEPS = [
  {
    num: "01",
    en: { t: "Identify", d: "Share the original part number, drawing, photo, or physical sample. The more information you provide, the more precise the match." },
    ru: { t: "Идентификация", d: "Оригинальный номер, чертёж, фото или образец. Чем больше данных — тем точнее подбор." },
    zh: { t: "识别", d: "提供原厂零件号、图纸、照片或样品。信息越详细，匹配越精准。" },
  },
  {
    num: "02",
    en: { t: "Cross-reference", d: "We map the specifications — dimensions, material, tolerance, application — to a qualified Chinese manufacturer with matching capability." },
    ru: { t: "Кросс-референс", d: "Мы сопоставляем спецификации — размеры, материал, допуск, применение — с проверенным производителем нужной компетенции." },
    zh: { t: "交叉参考", d: "我们将规格 — 尺寸、材料、公差、应用 — 匹配到具备对应能力的合格中国制造商。" },
  },
  {
    num: "03",
    en: { t: "Sample", d: "A first article is produced for your quality approval. Dimensional report, material certificate, and functional check before bulk production." },
    ru: { t: "Образец", d: "Первый образец — на ваше согласование. Размерный отчёт, сертификат на материал, функциональная проверка перед партией." },
    zh: { t: "打样", d: "首件生产，经您质量确认。尺寸报告、材料证书、功能检查后量产。" },
  },
  {
    num: "04",
    en: { t: "Produce & Ship", d: "Production with agreed quality program. Pre-shipment inspection, export documentation, and consolidated shipping to your destination." },
    ru: { t: "Производство", d: "Производство по согласованной программе качества. Предотгрузочная проверка, экспортная документация, консолидированная отгрузка." },
    zh: { t: "生产发货", d: "按既定质量程序生产。发货前检验、出口文件、集运至您的目的地。" },
  },
];

export default function V2ReplacementExperience(props: V2ReplacementExperienceProps) {
  const { locale } = props;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const v2 = `/v2/${locale}`;
  const requestHref = `${v2}/request`;

  const V2CSS = ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}";

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* ===================================================
          1 — REPLACEMENT HERO
          =================================================== */}
      <section className="v2premium relative flex min-h-[60vh] flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1e22 0%, #101315 100%)" }} />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 md:px-10 pb-16 pt-32">
          <motion.div {...reveal} className="mb-6">
            <Link href={`${v2}/brands`} className="mono text-[9.5px] tracking-[0.16em] uppercase transition-opacity hover:opacity-65" style={{ color: "#8A8E91" }}>
              ← {t("back")}
            </Link>
          </motion.div>
          <motion.div {...reveal} className="mono flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase" }}>
            <span className="inline-block h-px w-10" style={{ background: ACCENT }} />
            {t("kicker")}
          </motion.div>
          <motion.h1 {...reveal} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="display mt-5 max-w-[1100px] text-[clamp(34px,5vw,68px)] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ color: "#F3F2EC" }}>
            {t("title")}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-[680px] text-[15.5px] leading-relaxed" style={{ color: "#C6C9CB" }}>
            {t("desc")}
          </motion.p>
          <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mt-8">
            <a href={requestHref} className="display inline-block px-8 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>{t("heroCta")}</a>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          2 — THE PROCESS (4阶段垂直时间线)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[760px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("procEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("procTitle")}</motion.h2>
          </div>

          <div className="mt-16 grid gap-0 lg:grid-cols-2 lg:gap-12">
            {STEPS.map((s, i) => {
              const stageT = locale === "ru" ? s.ru : locale === "zh" ? s.zh : s.en;
              return (
                <motion.div
                  key={s.num}
                  {...reveal}
                  transition={{ duration: 0.6, delay: 0.08 * i, ease: EASE }}
                  className="border-b py-10 lg:py-12"
                  style={{ borderColor: LINE }}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="mono text-[clamp(40px,5vw,64px)] font-semibold leading-none tracking-[-0.02em]" style={{ color: FAINT }}>{s.num}</span>
                    <div className="flex-1">
                      <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("procEyebrow")}</p>
                      <h3 className="display mt-2 text-[clamp(22px,2.4vw,34px)] font-semibold tracking-[-0.03em]" style={{ color: INK }}>{stageT.t}</h3>
                    </div>
                  </div>
                  <p className="mt-5 max-w-[440px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{stageT.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          3 — IMPORTANT NOTE (兼容性声明)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="border-l-2 pl-8" style={{ borderColor: ACCENT }}>
            <motion.p {...reveal} className="mono" style={{ fontSize: 9, letterSpacing: "0.22em", color: ACCENT, textTransform: "uppercase" }}>{t("noteTitle")}</motion.p>
            <motion.p {...reveal} className="display mt-4 max-w-[860px] text-[clamp(16px,1.6vw,22px)] font-medium leading-[1.5] tracking-[-0.01em]" style={{ color: INK }}>
              {t("note")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===================================================
          4 — CTA
          =================================================== */}
      <PremiumCTA
        locale={locale}
        kicker={t("ctaKicker")}
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        ctaLabel={t("ctaBtn")}
        href={requestHref}
        note={t("note")}
      />
    </main>
  );
}
