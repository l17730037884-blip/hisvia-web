"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/locales";
import type { AssetEntry } from "@/lib/content-v2/types";
import type { CapabilityItem } from "@/lib/content-v2/content-loader";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import { PremiumCTA } from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, LINE_D, ACCENT, NIGHT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   V2 Solutions — System Intelligence Page (主指令 §10)

   不再复用首页 IndustrialHero。专属结构：
   1. System Hero — 大图 + 工业问题 + 规格条
   2. System Architecture — 7阶段交互探索器
      System → Component → Process → Material →
      Manufacturer → Quality → Application
   3. Compatible Brands — 非官方代理声明
   4. China Supply — 制造区域
   5. CTA
   ============================================================ */

interface SystemData {
  system_type: string;
  industry_problem: string;
  supply_capability: string;
  typical_applications: string[];
  compatible_brands: string[];
  sourcing_scenarios: string[];
  related_asset_ids?: string[];
}

interface RegionItem {
  region: string;
  specialization: string[];
  description: string;
}

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

function componentImageSrc(asset: AssetEntry | null | undefined): string | null {
  if (!asset) return null;
  return asset.cutout_path || asset.path || null;
}

interface V2SolutionsExperienceProps {
  locale: Locale;
  page: SystemData;
  capabilities: CapabilityItem[];
  industries: Array<{ id: string; title: string }>;
  heroAsset: AssetEntry | null;
  capAssets: Record<string, AssetEntry | null>;
  verifyAsset: AssetEntry | null;
  qualitySystems: string[];
  exportCapability: string[];
  regions: RegionItem[];
  routeCapabilities: CapabilityItem[];
}

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Industrial System · China Supply", ru: "Промышленная система · Китай", zh: "工业系统 · 中国供应" },
  heroCta: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" },
  heroCta2: { en: "Explore architecture", ru: "Архитектура системы", zh: "探索系统架构" },
  archEyebrow: { en: "System Architecture", ru: "Архитектура системы", zh: "系统架构" },
  archTitle: { en: "Explore this system end to end", ru: "Изучите систему от начала до конца", zh: "从头到尾探索该系统" },
  archDesc: { en: "Follow the chain from system definition to field application. Each stage reveals real manufacturing data from our verified network.", ru: "Проследите цепочку от системы до применения. Каждый этап — реальные данные с проверенных заводов.", zh: "沿链条从系统定义到现场应用逐步探索。每个阶段展示来自验证网络的真实制造数据。" },
  stageSystem: { en: "System", ru: "Система", zh: "系统" },
  stageComponent: { en: "Component", ru: "Компонент", zh: "部件" },
  stageProcess: { en: "Process", ru: "Процесс", zh: "工艺" },
  stageMaterial: { en: "Material", ru: "Материал", zh: "材料" },
  stageManufacturer: { en: "Manufacturer", ru: "Производитель", zh: "制造商" },
  stageQuality: { en: "Quality", ru: "Качество", zh: "质量" },
  stageApplication: { en: "Application", ru: "Применение", zh: "应用" },
  sysSupply: { en: "Supply capability", ru: "Возможности поставки", zh: "供应能力" },
  sysProblem: { en: "Industrial problem", ru: "Промышленная проблема", zh: "工业问题" },
  compTitle: { en: "Related components in library", ru: "Связанные компоненты в базе", zh: "库内相关部件" },
  compEmpty: { en: "Components are mapped during sourcing", ru: "Компоненты определяются при закупке", zh: "部件在采购过程中匹配" },
  procTitle: { en: "Manufacturing processes", ru: "Производственные процессы", zh: "制造工艺" },
  procTolerance: { en: "Tolerance", ru: "Допуск", zh: "公差" },
  procMaterials: { en: "Materials", ru: "Материалы", zh: "材料" },
  procBatch: { en: "Batch", ru: "Партия", zh: "批量" },
  matTitle: { en: "Engineering materials", ru: "Инженерные материалы", zh: "工程材料" },
  mfrTitle: { en: "Manufacturing clusters", ru: "Производственные кластеры", zh: "制造集群" },
  mfrSpec: { en: "Specialization", ru: "Специализация", zh: "专长" },
  qualTitle: { en: "Quality systems & standards", ru: "Системы качества и стандарты", zh: "质量体系与标准" },
  appTitle: { en: "Where this system operates", ru: "Где работает эта система", zh: "该系统的运行场景" },
  brandEyebrow: { en: "Compatible Brands", ru: "Совместимые бренды", zh: "兼容品牌" },
  brandTitle: { en: "Brands served by compatible replacement", ru: "Бренды — совместимые аналоги", zh: "兼容替代品牌" },
  brandNote: { en: "Compatible replacement components · not official dealer · engineered to OEM specifications", ru: "Совместимые аналоги · не официальный дилер · по спецификациям OEM", zh: "兼容替代部件 · 非官方代理 · 按 OEM 规格制造" },
  cnEyebrow: { en: "China Supply Network", ru: "Сеть поставок из Китая", zh: "中国供应网络" },
  cnTitle: { en: "Where this system is manufactured", ru: "Где производится эта система", zh: "该系统在中国的制造布局" },
  cnExport: { en: "Export execution", ru: "Экспортное сопровождение", zh: "出口执行" },
  ctaKicker: { en: "Start Sourcing", ru: "Начать закупку", zh: "开始采购" },
  ctaTitle: { en: "Source this system from verified manufacturers", ru: "Закупите эту систему у проверенных производителей", zh: "从验证制造商采购该系统" },
  ctaDesc: { en: "Describe your requirement in plain language. Our team responds with a structured sourcing path.", ru: "Опишите потребность — команда ответит планом закупки.", zh: "用自然语言描述您的需求，团队将回复结构化采购路径。" },
  ctaBtn: { en: "Submit a Request →", ru: "Отправить запрос →", zh: "提交需求 →" },
  ctaNote: { en: "Free · No obligation · Verified suppliers", ru: "Бесплатно · Без обязательств", zh: "免费 · 无义务 · 验证供应商" },
};

export default function V2SolutionsExperience(props: V2SolutionsExperienceProps) {
  const { locale, page, heroAsset, qualitySystems, exportCapability, regions, routeCapabilities } = props;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const requestHref = `/v2/${locale}/request`;

  const heroImg = heroImageSrc(heroAsset);

  // Resolve related component assets
  const componentAssets = (page.related_asset_ids || [])
    .map((id) => resolveAsset(id))
    .filter((a): a is AssetEntry => !!a && !!componentImageSrc(a));

  // Parse materials
  const materialItems = Array.from(new Set(
    routeCapabilities.map((c) => parseCapability(c.description).materials).filter(Boolean)
  ));

  // System Architecture stages
  const stages = [
    { key: "system", label: t("stageSystem"), n: "01" },
    { key: "component", label: t("stageComponent"), n: "02" },
    { key: "process", label: t("stageProcess"), n: "03" },
    { key: "material", label: t("stageMaterial"), n: "04" },
    { key: "manufacturer", label: t("stageManufacturer"), n: "05" },
    { key: "quality", label: t("stageQuality"), n: "06" },
    { key: "application", label: t("stageApplication"), n: "07" },
  ];
  const [activeStage, setActiveStage] = useState("system");

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* ===================================================
          1 — SYSTEM INTELLIGENCE HERO
          专属：大图 + 暗色叠加 + 系统名 + 工业问题 + 规格条
          不复用首页 IndustrialHero
          =================================================== */}
      <section className="v2premium relative flex min-h-[88vh] flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}" }} />
        {/* 大图背景 */}
        {heroImg && (
          <div className="absolute inset-0">
            <img src={heroImg} alt={page.system_type} className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,19,21,0.55) 0%, rgba(16,19,21,0.4) 40%, rgba(16,19,21,0.85) 100%)" }} />
          </div>
        )}
        {!heroImg && <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1e22 0%, #101315 100%)" }} />}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] flex-1 flex flex-col justify-end px-6 md:px-10 pb-16 pt-32">
          <motion.div {...reveal} className="mono flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase" }}>
            <span className="inline-block h-px w-10" style={{ background: ACCENT }} />
            {t("kicker")}
          </motion.div>
          <motion.h1 {...reveal} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="display mt-5 max-w-[1000px] text-[clamp(36px,5.5vw,76px)] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ color: PAPER }}>
            {page.system_type}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-[680px] text-[15.5px] leading-relaxed" style={{ color: "#C6C9CB" }}>
            {page.industry_problem}
          </motion.p>
          <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mt-8 flex flex-wrap gap-4">
            <a href={requestHref} className="display px-8 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>{t("heroCta")}</a>
            <a href="#architecture" className="mono border px-6 py-3.5 text-[10.5px] tracking-[0.16em] uppercase text-white/90 transition-colors hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.3)" }}>{t("heroCta2")}</a>
          </motion.div>
        </div>

        {/* 规格条 */}
        <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 md:grid-cols-4" style={{ background: "rgba(255,255,255,0.08)" }}>
            {[
              { v: String(routeCapabilities.length), l: t("stageProcess") },
              { v: String(page.compatible_brands.length), l: t("brandEyebrow") },
              { v: String(regions.length), l: t("cnEyebrow") },
              { v: "ISO 9001", l: t("stageQuality") },
            ].map((s) => (
              <div key={s.l} className="px-6 py-6 md:px-8 md:py-7 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="display text-[clamp(22px,2.4vw,34px)] font-semibold tracking-[-0.02em]" style={{ color: PAPER }}>{s.v}</p>
                <p className="mono mt-1 text-[8.5px] tracking-[0.2em] uppercase" style={{ color: "#8A8E91" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          2 — SYSTEM ARCHITECTURE (交互式7阶段探索器)
          主指令 §10: System → Component → Process →
          Material → Manufacturer → Quality → Application
          =================================================== */}
      <section id="architecture" className="v2premium scroll-mt-16 border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}" }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[720px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("archEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("archTitle")}</motion.h2>
            <motion.p {...reveal} className="mt-5 max-w-[560px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("archDesc")}</motion.p>
          </div>

          <div className="mt-12 grid gap-0 lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* 左侧 sticky 导航 */}
            <div className="lg:sticky lg:top-16 lg:self-start">
              <div className="border-t" style={{ borderColor: LINE }}>
                {stages.map((s) => {
                  const active = s.key === activeStage;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setActiveStage(s.key)}
                      onMouseEnter={() => setActiveStage(s.key)}
                      className="group flex w-full items-center gap-4 border-b py-4 text-left transition-colors"
                      style={{ borderColor: LINE, background: active ? PAPER_D : "transparent" }}
                    >
                      <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: active ? ACCENT : FAINT }}>{s.n}</span>
                      <span className="display flex-1 text-[clamp(14px,1.3vw,18px)] font-semibold tracking-[-0.02em] transition-transform duration-300"
                        style={{ color: active ? INK : DIM, transform: active ? "translateX(4px)" : "none" }}>
                        {s.label}
                      </span>
                      <span className="display text-[14px] transition-opacity" style={{ color: active ? ACCENT : "transparent" }}>→</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 右侧内容面板 */}
            <div className="mt-8 lg:mt-0 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {/* SYSTEM */}
                  {activeStage === "system" && (
                    <div className="flex flex-col gap-8">
                      <div>
                        <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("sysProblem")}</p>
                        <p className="display mt-3 text-[clamp(18px,1.8vw,24px)] font-medium leading-snug tracking-[-0.02em]" style={{ color: INK }}>{page.industry_problem}</p>
                      </div>
                      <div>
                        <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("sysSupply")}</p>
                        <p className="mt-3 text-[14.5px] leading-relaxed" style={{ color: DIM }}>{page.supply_capability}</p>
                      </div>
                      {page.sourcing_scenarios.length > 0 && (
                        <div>
                          <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{locale === "zh" ? "采购场景" : locale === "ru" ? "Сценарии" : "Sourcing scenarios"}</p>
                          <ul className="mt-4 flex flex-col gap-2.5">
                            {page.sourcing_scenarios.slice(0, 5).map((sc) => (
                              <li key={sc} className="flex items-baseline gap-3 text-[13.5px] leading-relaxed" style={{ color: DIM }}>
                                <span className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-1px]" style={{ background: ACCENT }} />
                                {sc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* COMPONENT */}
                  {activeStage === "component" && (
                    <div>
                      <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("compTitle")}</p>
                      {componentAssets.length > 0 ? (
                        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                          {componentAssets.slice(0, 6).map((a) => {
                            const src = componentImageSrc(a);
                            if (!src) return null;
                            return (
                              <div key={a.asset_id} className="group relative overflow-hidden border" style={{ borderColor: LINE, background: a.cutout_path ? PAPER_D : INK, aspectRatio: "1 / 1" }}>
                                <img src={src} alt={a.filename} className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-105" />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="mt-4 text-[14px] leading-relaxed" style={{ color: DIM }}>{t("compEmpty")}</p>
                      )}
                    </div>
                  )}

                  {/* PROCESS */}
                  {activeStage === "process" && (
                    <div>
                      <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("procTitle")}</p>
                      <div className="mt-5 border-t" style={{ borderColor: LINE }}>
                        {routeCapabilities.slice(0, 5).map((c, i) => {
                          const p = parseCapability(c.description);
                          return (
                            <div key={c.id} className="border-b py-5" style={{ borderColor: LINE }}>
                              <div className="flex items-baseline gap-4">
                                <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                                <div className="flex-1">
                                  <p className="display text-[clamp(16px,1.5vw,21px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{c.name}</p>
                                  <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: DIM }}>{p.process}</p>
                                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
                                    {p.tolerance && <span className="mono text-[10px] tracking-[0.06em]" style={{ color: FAINT }}>{t("procTolerance")}: {p.tolerance}</span>}
                                    {p.batch && <span className="mono text-[10px] tracking-[0.06em]" style={{ color: FAINT }}>{t("procBatch")}: {p.batch.replace(/^Batch sizes[^:]*:\s*/, "")}</span>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* MATERIAL */}
                  {activeStage === "material" && (
                    <div>
                      <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("matTitle")}</p>
                      <div className="mt-5 border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                        {materialItems.length > 0 ? (
                          <ul className="flex flex-col gap-3">
                            {materialItems.map((m) => (
                              <li key={m} className="mono text-[12px] tracking-[0.04em] leading-relaxed" style={{ color: INK }}>{m}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="display text-[clamp(18px,2vw,26px)] font-semibold leading-snug" style={{ color: INK }}>
                            {locale === "zh" ? "碳钢 · 不锈钢 · 铝 · 黄铜 · 工程塑料" : locale === "ru" ? "Сталь · Нержавейка · Алюминий · Латунь · Пластики" : "Carbon steel · Stainless · Aluminum · Brass · Engineering plastics"}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* MANUFACTURER */}
                  {activeStage === "manufacturer" && (
                    <div>
                      <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("mfrTitle")}</p>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {regions.slice(0, 6).map((r, i) => (
                          <div key={r.region} className="border p-5" style={{ borderColor: LINE, background: PAPER_D }}>
                            <span className="mono text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                            <p className="display mt-2 text-[17px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{r.region}</p>
                            <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: DIM }}>{r.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {r.specialization.slice(0, 3).map((sp) => (
                                <span key={sp} className="mono border px-2 py-0.5 text-[8.5px] tracking-[0.06em] uppercase" style={{ borderColor: LINE_D, color: DIM }}>{sp}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* QUALITY */}
                  {activeStage === "quality" && (
                    <div>
                      <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("qualTitle")}</p>
                      <div className="mt-5 border-t" style={{ borderColor: LINE }}>
                        {qualitySystems.map((q, i) => (
                          <div key={q} className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: LINE }}>
                            <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                            <span className="display text-[15px] font-medium tracking-[-0.01em]" style={{ color: INK }}>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* APPLICATION */}
                  {activeStage === "application" && (
                    <div>
                      <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>{t("appTitle")}</p>
                      <div className="mt-5 border-t" style={{ borderColor: LINE }}>
                        {page.typical_applications.slice(0, 8).map((app, i) => (
                          <div key={app} className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: LINE }}>
                            <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                            <span className="display text-[15px] font-medium leading-snug tracking-[-0.01em]" style={{ color: INK }}>{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          3 — COMPATIBLE BRANDS (主指令 §5: 品牌发现 + 非官方声明)
          =================================================== */}
      {page.compatible_brands.length > 0 && (
        <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
          <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("brandEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(26px,2.8vw,44px)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: INK }}>{t("brandTitle")}</motion.h2>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {page.compatible_brands.map((b) => (
                <span key={b} className="mono border px-4 py-2 text-[10px] tracking-[0.1em] uppercase" style={{ borderColor: LINE_D, color: INK }}>{b}</span>
              ))}
            </div>
            <p className="mono mt-6 text-[9px] tracking-[0.16em] uppercase" style={{ color: FAINT }}>{t("brandNote")}</p>
          </div>
        </section>
      )}

      {/* ===================================================
          4 — CHINA SUPPLY NETWORK
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: NIGHT, background: NIGHT }}>
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[720px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("cnEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3vw,46px)] font-semibold leading-[1.03] tracking-[-0.03em]" style={{ color: PAPER }}>{t("cnTitle")}</motion.h2>
          </div>
          <div className="mt-12 grid gap-px md:grid-cols-3" style={{ background: "#2A2E31" }}>
            {regions.map((r, i) => (
              <motion.div key={r.region} {...reveal} transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }} className="p-7" style={{ background: NIGHT }}>
                <span className="mono text-[10px] tracking-[0.22em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-[20px] font-semibold tracking-[-0.02em]" style={{ color: PAPER }}>{r.region}</h3>
                <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "#9A9EA1" }}>{r.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {r.specialization.slice(0, 3).map((sp) => (
                    <span key={sp} className="mono border px-2.5 py-1 text-[8.5px] tracking-[0.06em] uppercase" style={{ borderColor: "#3A3F43", color: "#C6C9CB" }}>{sp}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 border-t pt-8" style={{ borderColor: "#2A2E31" }}>
            <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: "#6E7377" }}>{t("cnExport")}</p>
            <ul className="mt-4 grid gap-x-10 gap-y-2.5 md:grid-cols-2">
              {exportCapability.map((item) => (
                <li key={item} className="flex items-baseline gap-2.5 text-[13px]" style={{ color: "#A9ADB0" }}>
                  <span className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-1px]" style={{ background: ACCENT }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================
          5 — CTA
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
