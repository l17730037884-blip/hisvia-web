"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { PremiumCTA } from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, DIM, FAINT, LINE, LINE_D, ACCENT, NIGHT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   V2 Brands & Replacement — Brand Discovery (主指令 §5, §6)

   不再使用旧 Tailwind 类(bg-white, text-navy等)。
   专属结构：
   1. Brands Hero — 全屏深色 + 兼容替代定位声明
   2. By Brand — 品牌组编辑列表(非卡片墙)
   3. By Product Family — 产品族网格(简洁链接)
   4. Replacement Statement — 清晰声明(非官方授权)
   5. CTA
   ============================================================ */

interface BrandGroupData {
  domain: string;
  system: string;
  brands: { name: string; count: number }[];
}

interface ProductFamilyData {
  family: string;
  count: number;
  cutoutCount: number;
}

interface V2BrandsExperienceProps {
  locale: Locale;
  groups: BrandGroupData[];
  families: ProductFamilyData[];
}

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Brands & Replacement · Compatible Components", ru: "Бренды и аналоги · Совместимые компоненты", zh: "品牌与替代 · 兼容部件" },
  title: { en: "Find the brand. Source the compatible replacement.", ru: "Найдите бренд. Подберите совместимый аналог.", zh: "找到品牌。采购兼容替代。" },
  desc: { en: "Compatible industrial replacement components, sourced from qualified Chinese manufacturers. HISVIA is an independent supply partner — not an authorized distributor of the brands listed below.", ru: "Совместимые промышленные аналоги от проверенных китайских производителей. HISVIA — независимый партнёр, не авторизованный дистрибьютор указанных брендов.", zh: "来自合格中国制造商的兼容工业替代部件。HISVIA 是独立供应链合作伙伴，并非下列品牌的授权经销商。" },
  brandEyebrow: { en: "By Brand", ru: "По бренду", zh: "按品牌" },
  brandTitle: { en: "Brand groups in our asset library", ru: "Бренд-группы в нашей базе", zh: "资产库中的品牌组" },
  familyEyebrow: { en: "By Product Family", ru: "По семейству продуктов", zh: "按产品族" },
  familyTitle: { en: "Component families we source", ru: "Семейства компонентов", zh: "我们采购的部件族" },
  replEyebrow: { en: "Replacement Solutions", ru: "Решения по замене", zh: "替代方案" },
  replTitle: { en: "Cross-reference original equipment against compatible alternatives", ru: "Сопоставьте оригинальное оборудование с совместимыми аналогами", zh: "将原厂设备与兼容替代品交叉参考" },
  replDesc: { en: "Send the original part number, photo, or sample. We structure the requirement, match a qualified manufacturer, and deliver compatible replacement components.", ru: "Отправьте оригинальный номер, фото или образец. Мы структурируем запрос, подбираем производителя и поставляем совместимые аналоги.", zh: "发送原厂零件号、照片或样品。我们结构化理解需求，匹配制造商，交付兼容替代部件。" },
  replCta: { en: "Request a cross-reference →", ru: "Запросить подбор →", zh: "申请交叉参考 →" },
  note: { en: "Brand names are referenced for compatibility identification only. HISVIA does not imply official brand authorization.", ru: "Названия брендов указаны только для идентификации совместимости. HISVIA не подразумевает официальную авторизацию бренда.", zh: "品牌名称仅用于兼容性识别。HISVIA 不暗示品牌官方授权。" },
  groups: { en: "groups", ru: "групп", zh: "个品牌组" },
  families: { en: "families", ru: "семейств", zh: "个产品族" },
  assets: { en: "assets", ru: "активов", zh: "资产" },
  cutouts: { en: "cutouts", ru: "вырезов", zh: "透明图" },
  view: { en: "View →", ru: "Подробнее →", zh: "查看 →" },
  ctaKicker: { en: "Start Here", ru: "Начните здесь", zh: "从这里开始" },
  ctaTitle: { en: "Looking for a specific brand or part?", ru: "Ищете конкретный бренд или деталь?", zh: "在寻找特定品牌或零件？" },
  ctaDesc: { en: "Tell us the brand, part number, or application. We respond with a sourcing path.", ru: "Укажите бренд, номер детали или применение — мы ответим путём закупки.", zh: "告诉我们品牌、零件号或应用，我们将回复采购路径。" },
  ctaBtn: { en: "Submit a Request →", ru: "Отправить запрос →", zh: "提交需求 →" },
};

export default function V2BrandsExperience(props: V2BrandsExperienceProps) {
  const { locale, groups, families } = props;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const v2 = `/v2/${locale}`;
  const requestHref = `${v2}/request`;

  const V2CSS = ".v2premium .mono{font-family:ui-monospace,Menlo,monospace;}.v2premium .display{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}.v2premium *{box-sizing:border-box;margin:0;padding:0;}.v2premium img{display:block;}";

  // Calculate total parts across all brand groups
  const totalParts = groups.reduce((s, g) => s + g.brands.reduce((bs, b) => bs + b.count, 0), 0);

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* ===================================================
          1 — BRANDS HERO (专属全屏深色 + 兼容替代定位)
          =================================================== */}
      <section className="v2premium relative flex min-h-[70vh] flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1e22 0%, #101315 100%)" }} />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 md:px-10 pb-16 pt-32">
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
          <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mt-8 flex flex-wrap gap-4">
            <a href={`${v2}/brands/replacement`} className="display px-8 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>{t("replCta")}</a>
          </motion.div>
          {/* Stats strip */}
          <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.4, ease: EASE }} className="mt-12 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { v: String(groups.length), l: t("groups") },
                { v: String(families.length), l: t("families") },
                { v: String(totalParts), l: t("assets") },
                { v: "8", l: "systems" },
              ].map((s) => (
                <div key={s.l} className="border-r px-6 py-5 last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <p className="display text-[clamp(20px,2.2vw,32px)] font-semibold tracking-[-0.02em]" style={{ color: "#F3F2EC" }}>{s.v}</p>
                  <p className="mono mt-1 text-[8.5px] tracking-[0.2em] uppercase" style={{ color: "#8A8E91" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          2 — BY BRAND (品牌组编辑列表，非卡片墙)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[760px]">
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("brandEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("brandTitle")}</motion.h2>
            </div>
            <motion.p {...reveal} className="mono text-[9px] tracking-[0.18em] uppercase" style={{ color: FAINT }}>
              {groups.length} {t("groups")}
            </motion.p>
          </div>

          <div className="mt-12 border-t" style={{ borderColor: LINE }}>
            {groups.map((g, i) => {
              const totalInGroup = g.brands.reduce((s, b) => s + b.count, 0);
              return (
                <motion.div
                  key={g.system}
                  {...reveal}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                  className="group grid gap-4 border-b py-8 transition-colors hover:bg-[#EFEEE6] lg:grid-cols-[260px_1fr_auto] lg:gap-8"
                  style={{ borderColor: LINE }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="display text-[clamp(16px,1.5vw,22px)] font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: INK }}>{g.domain}</p>
                      <p className="mono mt-1 text-[9px] tracking-[0.16em] uppercase" style={{ color: DIM }}>{g.brands.length} brands · {totalInGroup} {t("assets")}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:pl-6 lg:border-l" style={{ borderColor: LINE_D }}>
                    {g.brands.slice(0, 10).map((b) => (
                      <span key={b.name} className="mono text-[11px] tracking-[0.04em]" style={{ color: DIM }}>
                        {b.name}
                        <span className="ml-1 text-[9px]" style={{ color: FAINT }}>{b.count}</span>
                      </span>
                    ))}
                    {g.brands.length > 10 && <span className="mono text-[11px]" style={{ color: FAINT }}>+{g.brands.length - 10}</span>}
                  </div>
                  <Link
                    href={`${v2}/brands?group=${encodeURIComponent(g.system)}`}
                    className="mono shrink-0 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-65"
                    style={{ color: INK }}
                  >
                    {t("view")}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          3 — BY PRODUCT FAMILY (产品族网格，简洁链接)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[760px]">
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("familyEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("familyTitle")}</motion.h2>
            </div>
            <motion.p {...reveal} className="mono text-[9px] tracking-[0.18em] uppercase" style={{ color: FAINT }}>
              {families.length} {t("families")}
            </motion.p>
          </div>
          <div className="mt-10 grid gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ background: LINE_D }}>
            {families.map((f, i) => (
              <motion.div key={f.family} {...reveal} transition={{ duration: 0.4, delay: 0.03 * i, ease: EASE }}>
                <Link
                  href={`${v2}/brands?family=${encodeURIComponent(f.family)}`}
                  className="group flex h-full flex-col p-5 transition-colors"
                  style={{ background: PAPER }}
                >
                  <span className="mono text-[9px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                  <p className="display mt-2 text-[15px] font-semibold capitalize tracking-[-0.01em] transition-transform duration-300 group-hover:translate-x-1" style={{ color: INK }}>{f.family}</p>
                  <p className="mono mt-2 text-[9px] tracking-[0.14em] uppercase" style={{ color: DIM }}>
                    {f.count} {t("assets")} · {f.cutoutCount} {t("cutouts")}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          4 — REPLACEMENT STATEMENT (清晰声明)
          =================================================== */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
        <style dangerouslySetInnerHTML={{ __html: V2CSS }} />
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-20">
            <div>
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("replEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(26px,2.8vw,42px)] font-semibold leading-[1.03] tracking-[-0.03em]" style={{ color: INK }}>{t("replTitle")}</motion.h2>
              <motion.p {...reveal} className="mt-5 max-w-[560px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("replDesc")}</motion.p>
              <motion.div {...reveal} className="mt-8 border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                <p className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: ACCENT }}>Important</p>
                <p className="mt-2 max-w-[520px] text-[13px] leading-relaxed" style={{ color: DIM }}>{t("note")}</p>
              </motion.div>
            </div>
            <div className="border p-8" style={{ borderColor: LINE_D, background: PAPER_D }}>
              <p className="display text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.05] tracking-[-0.02em]" style={{ color: INK }}>
                {locale === "ru" ? "Кросс-референс" : locale === "zh" ? "交叉参考" : "Cross-reference"}
              </p>
              <p className="mono mt-3 text-[9px] tracking-[0.2em] uppercase" style={{ color: FAINT }}>
                {locale === "ru" ? "4-этапный процесс" : locale === "zh" ? "4步流程" : "4-step process"}
              </p>
              <Link
                href={`${v2}/brands/replacement`}
                className="display mt-6 inline-block border-b pb-1 text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-65"
                style={{ borderColor: INK, color: INK }}
              >
                {t("replCta")}
              </Link>
            </div>
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
        note={t("note")}
      />
    </main>
  );
}
