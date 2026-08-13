"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/locales";
import type { AssetEntry } from "@/lib/content-v2/types";
import { PremiumCTA } from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, LINE_D, ACCENT, NIGHT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   V2 OEM — Engineering Journey (主指令 §13)

   禁止普通 Hero。专属叙事结构：
   Drawing → Prototype → Sampling → Production → Inspection → Evidence

   1. Engineering Hero — 全屏深色工业视觉(不复用 EditorialHero)
   2. The Engineering Journey — 5阶段交错叙事(每阶段大图+编号+描述)
   3. IP Protection — 措施网格(独立视觉处理)
   4. Custom Manufacturing Capabilities — 交互列表(非重复section)
   5. Evidence Gallery — 横向真实制造照片
   6. CTA
   ============================================================ */

interface JourneyAssetMap {
  drawing?: AssetEntry | null;
  prototype?: AssetEntry | null;
  sampling?: AssetEntry | null;
  production?: AssetEntry | null;
  inspection?: AssetEntry | null;
}

interface V2OemExperienceProps {
  locale: Locale;
  title: string;
  positioning: string;
  ipTitle: string;
  ipDescription: string;
  measures: string[];
  capabilities: Array<{ id: string; name: string; description: string }>;
  buyerPath: Array<{ step: number; title: string; description: string }>;
  heroAsset: AssetEntry | null;
  journeyAssets: JourneyAssetMap;
  evidenceAssets: AssetEntry[];
}

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Engineering Journey · OEM & Custom Manufacturing", ru: "Инженерный путь · OEM и кастомное производство", zh: "工程旅程 · OEM 与定制制造" },
  heroCta: { en: "Start OEM Inquiry", ru: "Начать OEM запрос", zh: "发起 OEM 咨询" },
  heroCta2: { en: "See the journey", ru: "Посмотреть путь", zh: "查看旅程" },
  heroNote: { en: "Confidential · Your designs stay yours", ru: "Конфиденциально · Ваши разработки остаются вашими", zh: "保密 · 您的设计始终归您所有" },
  jEyebrow: { en: "The Engineering Journey", ru: "Инженерный путь", zh: "工程旅程" },
  jTitle: { en: "From drawing to delivered part — every stage documented", ru: "От чертежа до готовой детали — каждый этап задокументирован", zh: "从图纸到交付零件 — 每个阶段都有记录" },
  jDesc: { en: "An OEM engagement is not a transaction. It is a structured engineering process where your design moves through defined stages — each with its own quality gate before the next begins.", ru: "OEM-сотрудничество — это не сделка. Это структурированный инженерный процесс, где ваш дизайн проходит определённые этапы — каждый со своим контрольным качеством перед следующим.", zh: "OEM 合作不是交易，而是一个结构化的工程流程，您的设计经过明确阶段 — 每个阶段在进入下一步前都有质量关卡。" },
  ipEyebrow: { en: "IP Protection", ru: "Защита ИС", zh: "知识产权保护" },
  ipTitle: { en: "Your designs stay yours", ru: "Ваши разработки остаются вашими", zh: "您的设计始终归您所有" },
  capEyebrow: { en: "Custom Manufacturing", ru: "Кастомное производство", zh: "定制制造" },
  capTitle: { en: "Capabilities beyond standard catalog", ru: "Возможности вне стандартного каталога", zh: "超越标准目录的能力" },
  evEyebrow: { en: "Evidence", ru: "Доказательства", zh: "证据" },
  evTitle: { en: "Real manufacturing, not stock photography", ru: "Реальное производство, а не сток", zh: "真实制造，而非图库图片" },
  ctaKicker: { en: "Start Here", ru: "Начните здесь", zh: "从这里开始" },
  ctaTitle: { en: "Start your confidential OEM inquiry", ru: "Начните конфиденциальный OEM запрос", zh: "开始您的保密 OEM 咨询" },
  ctaDesc: { en: "Describe your part or product. Our team responds with a structured manufacturing path.", ru: "Опишите деталь или продукт — команда ответит планом производства.", zh: "描述您的零件或产品，团队将回复结构化制造路径。" },
  ctaBtn: { en: "Start OEM Inquiry →", ru: "Начать OEM запрос →", zh: "发起 OEM 咨询 →" },
};

const STAGES = [
  {
    key: "drawing",
    num: "01",
    en: { t: "Drawing & Engineering", d: "Your drawings, specifications, and quality requirements are reviewed under NDA. Our engineering team matches the right manufacturing process — CNC, casting, forging, or hybrid — before any metal is cut." },
    ru: { t: "Проектирование и чертежи", d: "Ваши чертежи, спецификации и требования к качеству рассматриваются под NDA. Наша инженерная команда подбирает правильный производственный процесс — ЧПУ, литьё, ковка или гибрид — до начала работ." },
    zh: { t: "图纸与工程", d: "在 NDA 下审查您的图纸、规格和质量要求。我们的工程团队在任何切削之前匹配合适的制造工艺 — CNC、铸造、锻造或混合工艺。" },
  },
  {
    key: "prototype",
    num: "02",
    en: { t: "Prototype", d: "First article produced from your drawings. Material verification, dimensional check, and functional review. You approve the prototype before any production tooling is committed." },
    ru: { t: "Прототип", d: "Перый образец по вашим чертежам. Проверка материала, размеров и функциональности. Вы утверждаете прототип до запуска производственной оснастки." },
    zh: { t: "原型", d: "根据您的图纸生产首件。材料验证、尺寸检查和功能评审。您在投入生产工装之前批准原型。" },
  },
  {
    key: "sampling",
    num: "03",
    en: { t: "Sampling & Approval", d: "A small batch is produced using the committed tooling. FAI (First Article Inspection) report is generated. Your quality approval is required before bulk production begins." },
    ru: { t: "Сэмплинг и утверждение", d: "Небольшая партия производится на утверждённой оснастке. Формируется отчёт FAI. Ваше одобрение качества требуется до начала серийного производства." },
    zh: { t: "取样与批准", d: "使用已确定的工装生产小批量。生成 FAI（首件检验）报告。批量生产前需要您的质量批准。" },
  },
  {
    key: "production",
    num: "04",
    en: { t: "Production", d: "Bulk production runs with the agreed quality program — PPAP, in-process inspection, and traceability from raw material to finished part. Your tooling is dedicated to your orders." },
    ru: { t: "Производство", d: "Серийное производство по согласованной программе качества — PPAP, межоперационный контроль и прослеживаемость от сырья до готовой детали. Ваша оснастка закреплена за вашими заказами." },
    zh: { t: "生产", d: "按约定的质量计划进行批量生产 — PPAP、过程检验和从原材料到成品零件的可追溯性。您的工装专用于您的订单。" },
  },
  {
    key: "inspection",
    num: "05",
    en: { t: "Inspection & Export", d: "Pre-shipment inspection with full documentation — dimensional reports, material certificates, COO. Export packing, documentation, and logistics handled as part of the partnership." },
    ru: { t: "Контроль и экспорт", d: "Предотгрузочная проверка с полной документацией — размерные отчёты, сертификаты на материал, COO. Экспортная упаковка, документация и логистика — как часть партнёрства." },
    zh: { t: "检验与出口", d: "发货前检验，附完整文档 — 尺寸报告、材料证书、原产地证明。出口包装、文件和物流作为合作的一部分。" },
  },
];

export default function V2OemExperience(props: V2OemExperienceProps) {
  const { locale, title, positioning, ipTitle, ipDescription, measures, capabilities, heroAsset, journeyAssets, evidenceAssets } = props;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const requestHref = `/v2/${locale}/request`;
  const heroImg = heroAsset?.path || null;

  const V2CSS = ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}.v2premium .no-scrollbar::-webkit-scrollbar{display:none;}.v2premium .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}";

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* ===================================================
          1 — ENGINEERING HERO (专属全屏深色，不复用 EditorialHero)
          =================================================== */}
      <section className="v2premium relative flex min-h-[80vh] flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        {heroImg && (
          <div className="absolute inset-0">
            <img src={heroImg} alt={title} className="h-full w-full object-cover" />
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
            className="display mt-5 max-w-[1100px] text-[clamp(36px,5.5vw,76px)] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ color: "#F3F2EC" }}>
            {title}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-[680px] text-[15.5px] leading-relaxed" style={{ color: "#C6C9CB" }}>
            {positioning}
          </motion.p>
          <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mt-8 flex flex-wrap gap-4">
            <a href={requestHref} className="display px-8 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>{t("heroCta")}</a>
            <a href="#journey" className="mono border px-6 py-3.5 text-[10.5px] tracking-[0.16em] uppercase text-white/90 transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.3)" }}>{t("heroCta2")}</a>
          </motion.div>
          <motion.p {...reveal} transition={{ duration: 0.9, delay: 0.4, ease: EASE }} className="mono mt-6 text-[9px] tracking-[0.22em] uppercase" style={{ color: "#8A8E91" }}>
            {t("heroNote")}
          </motion.p>
        </div>
      </section>

      {/* ===================================================
          2 — THE ENGINEERING JOURNEY (5阶段交错叙事)
          主指令 §13: Drawing → Prototype → Sampling → Production → Inspection
          =================================================== */}
      <section id="journey" className="v2premium scroll-mt-16" style={{ background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[760px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("jEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("jTitle")}</motion.h2>
            <motion.p {...reveal} className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("jDesc")}</motion.p>
          </div>

          {/* Stages — alternating left/right with large images */}
          <div className="mt-16 flex flex-col gap-0">
            {STAGES.map((s, i) => {
              const asset = journeyAssets[s.key as keyof JourneyAssetMap];
              const reverse = i % 2 === 1;
              const stageT = locale === "ru" ? s.ru : locale === "zh" ? s.zh : s.en;
              return (
                <motion.div
                  key={s.key}
                  {...reveal}
                  transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE }}
                  className="grid gap-6 border-b py-12 lg:grid-cols-2 lg:gap-12 lg:py-16"
                  style={{ borderColor: LINE }}
                >
                  {/* Image */}
                  <div className={`overflow-hidden border ${reverse ? "lg:order-2" : ""}`} style={{ borderColor: LINE_D }}>
                    {asset ? (
                      <img src={asset.path} alt={asset.filename} className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center" style={{ background: PAPER_D }}>
                        <span className="mono text-[8px] uppercase" style={{ color: FAINT }}>{s.num}</span>
                      </div>
                    )}
                  </div>
                  {/* Text */}
                  <div className={`flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`}>
                    <div className="flex items-baseline gap-4">
                      <span className="mono text-[clamp(32px,4vw,56px)] font-semibold leading-none tracking-[-0.02em]" style={{ color: FAINT }}>{s.num}</span>
                      <span className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("jEyebrow")}</span>
                    </div>
                    <h3 className="display mt-4 text-[clamp(22px,2.6vw,36px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ color: INK }}>{stageT.t}</h3>
                    <p className="mt-4 max-w-[520px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{stageT.d}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          3 — IP PROTECTION (措施网格，独立视觉处理)
          =================================================== */}
      <section className="v2premium border-y" style={{ borderColor: NIGHT, background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("ipEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(26px,2.8vw,42px)] font-semibold leading-[1.03] tracking-[-0.03em]" style={{ color: "#F3F2EC" }}>{ipTitle}</motion.h2>
              <motion.p {...reveal} className="mt-5 max-w-[440px] text-[14px] leading-relaxed" style={{ color: "#9FA3A6" }}>{ipDescription}</motion.p>
            </div>
            <div className="grid gap-px sm:grid-cols-2" style={{ background: "#2A2E31" }}>
              {measures.map((m, i) => (
                <motion.div key={m} {...reveal} transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                  className="p-6" style={{ background: NIGHT }}>
                  <span className="mono text-[10px] tracking-[0.22em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                  <p className="display mt-3 text-[14px] font-medium leading-snug tracking-[-0.01em]" style={{ color: "#E0E0DC" }}>{m}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          4 — CUSTOM MANUFACTURING CAPABILITIES (交互列表)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[720px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("capEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("capTitle")}</motion.h2>
          </div>
          <div className="mt-12 border-t" style={{ borderColor: LINE }}>
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.id}
                {...reveal}
                transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                className="group grid gap-3 border-b py-6 transition-colors hover:bg-[#EFEEE6] md:grid-cols-[80px_240px_1fr] md:gap-6"
                style={{ borderColor: LINE }}
              >
                <span className="mono text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-[clamp(16px,1.5vw,22px)] font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: INK }}>{cap.name}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: DIM }}>{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          5 — EVIDENCE GALLERY (横向真实制造照片)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[760px]">
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("evEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: INK }}>{t("evTitle")}</motion.h2>
            </div>
            <motion.p {...reveal} className="mono max-w-[280px] text-[9px] leading-relaxed tracking-[0.18em] uppercase" style={{ color: FAINT }}>
              {evidenceAssets.length} photographs · real manufacturing
            </motion.p>
          </div>
          <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible lg:pb-0">
            {evidenceAssets.map((a, i) => (
              <motion.div key={a.asset_id} {...reveal} transition={{ duration: 0.55, delay: 0.04 * i, ease: EASE }}
                className="group w-[220px] shrink-0 snap-start lg:w-auto">
                <div className="overflow-hidden border" style={{ borderColor: LINE_D, background: PAPER }}>
                  <img src={a.path} alt={a.filename} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.9) contrast(1.06)" }} />
                </div>
                <div className="mt-2 flex items-center justify-between border-b pb-2" style={{ borderColor: LINE_D }}>
                  <span className="mono text-[9px] tracking-[0.2em] uppercase" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="mono text-[8.5px] tracking-[0.18em] uppercase" style={{ color: ACCENT }}>HISVIA</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
        note={t("heroNote")}
      />
    </main>
  );
}
