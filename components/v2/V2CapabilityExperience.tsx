"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/locales";
import type { AssetEntry } from "@/lib/content-v2/types";
import type { CapabilityItem } from "@/lib/content-v2/content-loader";
import { PremiumCTA } from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, LINE_D, ACCENT, NIGHT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   V2 Capability Network — Manufacturing Capability Map (主指令 §12)

   不再复用首页 IndustrialHero。禁止卡片墙。
   交互式渐进缩小探索器：
   用户选择 Capability → Process → Material → Tolerance →
   Application → Factory Evidence → Request

   1. Capability Hero — 大图 + 定位 + 统计
   2. Capability Map — 交互式探索器(左能力列表 + 右详情面板)
   3. Process Gallery — 真实制造照片
   4. Factory Evidence — 区域 + 照片
   5. Quality System — 标准
   6. CTA
   ============================================================ */

function parseCapability(desc: string) {
  const process = desc.split("Tolerances")[0].trim().replace(/\.$/, "");
  const tolerance = desc.match(/Tolerances to ([^.]*?mm)\.?/);
  const materials = desc.match(/Materials: ([^.]*?\.)/);
  const batch = desc.match(/Batch sizes[^.]*\./);
  return {
    process,
    tolerance: tolerance ? `${tolerance[1]}mm` : "",
    materials: materials ? materials[1] : "",
    batch: batch ? batch[0] : "",
  };
}

function heroImageSrc(asset: AssetEntry | null | undefined): string | null {
  if (!asset) return null;
  return asset.path || null;
}

interface RegionItem {
  region: string;
  specialization: string[];
  description: string;
}

interface V2CapabilityExperienceProps {
  locale: Locale;
  title: string;
  positioning: string;
  heroAsset: AssetEntry | null;
  capabilities: CapabilityItem[];
  capAssets: Record<string, AssetEntry | null>;
  galleryAssets: AssetEntry[];
  regionAssets: Record<string, AssetEntry | null>;
  regions: RegionItem[];
  qualitySystems: string[];
  exportCapability: string[];
}

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Manufacturing Capability Map · China", ru: "Карта производственных возможностей · Китай", zh: "制造能力地图 · 中国" },
  heroCta: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" },
  heroCta2: { en: "Open the map", ru: "Открыть карту", zh: "打开能力地图" },
  mapEyebrow: { en: "Capability Map", ru: "Карта возможностей", zh: "能力地图" },
  mapTitle: { en: "Select a capability. Narrow your sourcing.", ru: "Выберите возможность. Сузьте поиск.", zh: "选择能力，缩小采购范围。" },
  mapDesc: { en: "Each capability reveals its process, materials, tolerance and applications — so you can decide if it matches your requirement before requesting.", ru: "Каждая возможность раскрывает процесс, материалы, допуски и применения — чтобы решить, подходит ли она, до запроса.", zh: "每项能力展示其工艺、材料、公差与应用——帮您在询价前判断是否匹配需求。" },
  mapProcess: { en: "Process", ru: "Процесс", zh: "工艺" },
  mapTolerance: { en: "Tolerance", ru: "Допуск", zh: "公差" },
  mapMaterials: { en: "Materials", ru: "Материалы", zh: "材料" },
  mapBatch: { en: "Batch size", ru: "Размер партии", zh: "批量" },
  mapUsage: { en: "Applications", ru: "Применения", zh: "应用" },
  mapCta: { en: "Request this capability →", ru: "Запросить →", zh: "询价该能力 →" },
  mapSelect: { en: "Select a capability from the left to see details", ru: "Выберите возможность слева", zh: "从左侧选择能力查看详情" },
  galEyebrow: { en: "Process Gallery", ru: "Галерея процессов", zh: "工艺画廊" },
  galTitle: { en: "Manufacturing evidence, not stock photography", ru: "Производственные доказательства, а не сток", zh: "制造证据，而非图库图片" },
  evEyebrow: { en: "Factory Evidence", ru: "Доказательства заводов", zh: "工厂证据" },
  evTitle: { en: "Where the capability lives", ru: "Где находятся возможности", zh: "能力所在" },
  qaEyebrow: { en: "Quality System", ru: "Система качества", zh: "质量体系" },
  qaTitle: { en: "Network standards for every order", ru: "Сетевые стандарты для каждого заказа", zh: "每个订单的网络级标准" },
  qaExport: { en: "Export execution", ru: "Экспортное сопровождение", zh: "出口执行" },
  ctaKicker: { en: "Start Sourcing", ru: "Начать закупку", zh: "开始采购" },
  ctaTitle: { en: "Find the manufacturing capability you need", ru: "Найдите нужные возможности", zh: "找到您需要的制造能力" },
  ctaDesc: { en: "Describe your requirement. We map it to a verified manufacturing path.", ru: "Опишите потребность — мы подберём проверенный путь.", zh: "描述您的需求，我们将匹配验证的制造路径。" },
  ctaBtn: { en: "Submit a Request →", ru: "Отправить запрос →", zh: "提交需求 →" },
  ctaNote: { en: "Verified suppliers · EN / RU / ZH", ru: "Проверенные поставщики · EN / RU / ZH", zh: "验证供应商 · EN / RU / ZH" },
};

export default function V2CapabilityExperience(props: V2CapabilityExperienceProps) {
  const { locale, title, positioning, heroAsset, capabilities, capAssets, galleryAssets, regionAssets, regions, qualitySystems, exportCapability } = props;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const requestHref = `/v2/${locale}/request`;

  const heroImg = heroImageSrc(heroAsset);
  const [selectedCap, setSelectedCap] = useState<string>(capabilities[0]?.id ?? "");
  const cap = capabilities.find((c) => c.id === selectedCap);
  const parsed = cap ? parseCapability(cap.description) : null;
  const capImg = cap ? capAssets[cap.id] : null;

  const V2CSS = ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}.v2premium .no-scrollbar::-webkit-scrollbar{display:none;}.v2premium .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}";

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* ===================================================
          1 — CAPABILITY HERO (专属，不复用 IndustrialHero)
          =================================================== */}
      <section className="v2premium relative flex min-h-[80vh] flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        {heroImg && (
          <div className="absolute inset-0">
            <img src={heroImg} alt={title} className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,19,21,0.45) 0%, rgba(16,19,21,0.3) 40%, rgba(16,19,21,0.85) 100%)" }} />
          </div>
        )}
        {!heroImg && <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1e22 0%, #101315 100%)" }} />}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 md:px-10 pb-16 pt-32">
          <motion.div {...reveal} className="mono flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase" }}>
            <span className="inline-block h-px w-10" style={{ background: ACCENT }} />
            {t("kicker")}
          </motion.div>
          <motion.h1 {...reveal} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="display mt-5 max-w-[1000px] text-[clamp(36px,5.5vw,76px)] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ color: PAPER }}>
            {title}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-[680px] text-[15.5px] leading-relaxed" style={{ color: "#C6C9CB" }}>
            {positioning}
          </motion.p>
          <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mt-8 flex flex-wrap gap-4">
            <a href={requestHref} className="display px-8 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>{t("heroCta")}</a>
            <a href="#capability-map" className="mono border px-6 py-3.5 text-[10.5px] tracking-[0.16em] uppercase text-white/90 transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.3)" }}>{t("heroCta2")}</a>
          </motion.div>
        </div>
        <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 md:grid-cols-4" style={{ background: "rgba(255,255,255,0.08)" }}>
            {[
              { v: String(capabilities.length), l: t("mapEyebrow") },
              { v: String(regions.length), l: t("evEyebrow") },
              { v: "ISO 9001", l: t("qaEyebrow") },
              { v: "FOB / CIF", l: t("qaExport") },
            ].map((s) => (
              <div key={s.l} className="px-6 py-5 md:px-8 md:py-6 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="display text-[clamp(20px,2.2vw,32px)] font-semibold tracking-[-0.02em]" style={{ color: PAPER }}>{s.v}</p>
                <p className="mono mt-1 text-[8.5px] tracking-[0.2em] uppercase" style={{ color: "#8A8E91" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          2 — CAPABILITY MAP (交互式渐进缩小探索器)
          主指令 §12: 禁止卡片墙，必须真正状态变化
          =================================================== */}
      <section id="capability-map" className="v2premium scroll-mt-16 border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[720px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("mapEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("mapTitle")}</motion.h2>
            <motion.p {...reveal} className="mt-5 max-w-[560px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("mapDesc")}</motion.p>
          </div>

          <div className="mt-12 grid gap-0 lg:grid-cols-[300px_1fr] lg:gap-12">
            {/* 左侧：能力列表 (可选) */}
            <div className="lg:sticky lg:top-16 lg:self-start">
              <div className="border-t" style={{ borderColor: LINE }}>
                {capabilities.map((c, i) => {
                  const active = c.id === selectedCap;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCap(c.id)}
                      onMouseEnter={() => setSelectedCap(c.id)}
                      className="group flex w-full items-center gap-4 border-b py-4 text-left transition-colors"
                      style={{ borderColor: LINE, background: active ? PAPER_D : "transparent" }}
                    >
                      <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: active ? ACCENT : FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="display flex-1 text-[clamp(14px,1.3vw,18px)] font-semibold tracking-[-0.02em] transition-transform duration-300"
                        style={{ color: active ? INK : DIM, transform: active ? "translateX(4px)" : "none" }}>
                        {c.name}
                      </span>
                      <span className="display text-[14px] transition-opacity" style={{ color: active ? ACCENT : "transparent" }}>→</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 右侧：详情面板 (渐进缩小) */}
            <div className="mt-8 lg:mt-0 min-h-[400px]">
              <AnimatePresence mode="wait">
                {cap && parsed && (
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {/* 能力名 + 图 */}
                    <div className="flex items-baseline gap-4">
                      <span className="mono text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(capabilities.findIndex(c => c.id === cap.id) + 1).padStart(2, "0")}</span>
                      <h3 className="display text-[clamp(22px,2.4vw,34px)] font-semibold tracking-[-0.03em]" style={{ color: INK }}>{cap.name}</h3>
                    </div>

                    {capImg && (
                      <div className="mt-5 overflow-hidden border" style={{ borderColor: LINE }}>
                        <img src={capImg.path} alt={cap.name} className="aspect-[16/8] w-full object-cover" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
                      </div>
                    )}

                    {/* Process */}
                    <div className="mt-8 border-t" style={{ borderColor: LINE }}>
                      <p className="mono border-b py-3 text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT, borderColor: LINE }}>{t("mapProcess")}</p>
                      <p className="py-4 text-[14.5px] leading-relaxed" style={{ color: DIM }}>{parsed.process}.</p>
                    </div>

                    {/* Tolerance + Batch */}
                    <div className="grid gap-px sm:grid-cols-2" style={{ background: LINE }}>
                      {parsed.tolerance && (
                        <div className="p-5" style={{ background: PAPER }}>
                          <p className="mono text-[9px] tracking-[0.2em] uppercase" style={{ color: FAINT }}>{t("mapTolerance")}</p>
                          <p className="display mt-2 text-[clamp(18px,1.8vw,24px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{parsed.tolerance}</p>
                        </div>
                      )}
                      {parsed.batch && (
                        <div className="p-5" style={{ background: PAPER }}>
                          <p className="mono text-[9px] tracking-[0.2em] uppercase" style={{ color: FAINT }}>{t("mapBatch")}</p>
                          <p className="display mt-2 text-[14px] font-medium leading-snug" style={{ color: INK }}>{parsed.batch.replace(/^Batch sizes[^:]*:\s*/, "")}</p>
                        </div>
                      )}
                    </div>

                    {/* Materials */}
                    {parsed.materials && (
                      <div className="mt-6 border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                        <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("mapMaterials")}</p>
                        <p className="mt-2 text-[14px] leading-relaxed" style={{ color: INK }}>{parsed.materials}</p>
                      </div>
                    )}

                    {/* Applications / Usage */}
                    {cap.usage && (
                      <div className="mt-6">
                        <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("mapUsage")}</p>
                        <p className="mt-2 text-[14px] leading-relaxed" style={{ color: DIM }}>{cap.usage}</p>
                      </div>
                    )}

                    {/* CTA */}
                    <a href={requestHref} className="display mt-8 inline-block px-7 py-3.5 text-[13.5px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>
                      {t("mapCta")}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3 — PROCESS GALLERY (真实制造照片)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: NIGHT, background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[760px]">
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("galEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: PAPER }}>{t("galTitle")}</motion.h2>
            </div>
            <motion.p {...reveal} className="mono max-w-[280px] text-[9px] leading-relaxed tracking-[0.18em] uppercase" style={{ color: "#6E7377" }}>
              {galleryAssets.length} process photographs · real manufacturing
            </motion.p>
          </div>
          <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible lg:pb-0">
            {galleryAssets.map((a, i) => (
              <motion.div key={a.asset_id} {...reveal} transition={{ duration: 0.55, delay: 0.04 * i, ease: EASE }}
                className="group w-[220px] shrink-0 snap-start lg:w-auto">
                <div className="overflow-hidden" style={{ background: "#1B1F22" }}>
                  <img src={a.path} alt={a.filename} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.9) contrast(1.06)" }} />
                </div>
                <div className="mt-2 flex items-center justify-between border-b pb-2" style={{ borderColor: "#2A2E31" }}>
                  <span className="mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "#8B8F93" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="mono text-[8.5px] tracking-[0.18em] uppercase" style={{ color: ACCENT }}>HISVIA</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          4 — FACTORY EVIDENCE
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("evEyebrow")}</motion.p>
          <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: INK }}>{t("evTitle")}</motion.h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {regions.map((r, i) => {
              const img = regionAssets[r.region];
              return (
                <motion.div key={r.region} {...reveal} transition={{ duration: 0.6, delay: 0.06 * i, ease: EASE }} className="group">
                  <div className="overflow-hidden border" style={{ borderColor: LINE_D }}>
                    {img ? (
                      <img src={img.path} alt={img.filename} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center" style={{ background: PAPER_D }}>
                        <span className="mono text-[8px] uppercase" style={{ color: FAINT }}>{r.region}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="display text-[22px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{r.region}</h3>
                    <span className="mono text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: DIM }}>{r.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.specialization.map((sp) => (
                      <span key={sp} className="mono border px-2.5 py-1 text-[8.5px] tracking-[0.06em] uppercase" style={{ borderColor: LINE_D, color: DIM }}>{sp}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          5 — QUALITY SYSTEM
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("qaEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(26px,2.8vw,42px)] font-semibold leading-[1.03] tracking-[-0.03em]" style={{ color: INK }}>{t("qaTitle")}</motion.h2>
              <motion.div {...reveal} className="mt-8 border-t" style={{ borderColor: LINE_D }}>
                {qualitySystems.map((q, i) => (
                  <div key={q} className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: LINE_D }}>
                    <span className="mono shrink-0 text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                    <p className="display text-[14px] font-medium leading-snug tracking-[-0.01em]" style={{ color: INK }}>{q}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="lg:pl-12">
              <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: FAINT }}>{t("qaExport")}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {exportCapability.map((item) => (
                  <li key={item} className="flex items-baseline gap-3 text-[13.5px] leading-relaxed" style={{ color: DIM }}>
                    <span className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-1px]" style={{ background: ACCENT }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                <p className="display text-[16px] font-semibold leading-snug tracking-[-0.01em]" style={{ color: INK }}>
                  {regions.map((r) => r.region).join(" · ")}
                </p>
                <p className="mono mt-2 text-[8.5px] tracking-[0.2em] uppercase" style={{ color: FAINT }}>Manufacturing clusters</p>
              </div>
            </div>
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
        note={t("ctaNote")}
      />
    </main>
  );
}
