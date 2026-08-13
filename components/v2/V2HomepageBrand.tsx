"use client";

import { motion } from "framer-motion";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import { getBrandGroups } from "@/lib/content-v2/asset-selector";
import { getCapabilities, getIndustryPages, getSystemPages } from "@/lib/content-v2/content-loader";
import type { Locale } from "@/lib/locales";
import factoryTrust from "@/data/content-v2/factory-trust.json";
import {
  IndustrialHero, TrustBar, CapabilityShowcase, ProcessTimeline,
  IndustryCard, EvidencePanel, FactoryProof, PremiumCTA,
} from "./V2PremiumKit";
import { PAPER, PAPER_D, INK, NIGHT, LINE, ACCENT, DIM, FAINT, EASE, reveal } from "./V2BrandKit";

/* ============================================================
   HISVIA PREMIUM BRAND HOMEPAGE — /v2/[locale] (Phase 16)

   S1 Industrial hero (full-bleed photography + data strip)
   S2 Trust bar
   S3 Capability system (left rail / right evidence panel)
   S4 Manufacturing process timeline
   S5 Industry solutions (large alternating image blocks)
   S6 Verification (photography + four proof steps)
   S7 Factory partnership
   S8 Final CTA

   Images: resolved via resolveAsset() only. No asset-legacy,
   no brand-contaminated photos, no repeated factory imagery.
   Sourcing workflow lives at /v2/[locale]/request — not here.
   ============================================================ */

const CAP_IMAGES: Record<string, string> = {
  cnc_machining: "asset-c3096c22",
  casting_forging: "asset-647a46db",
  assembly_testing: "asset-6970a009",
  surface_treatment: "asset-b4a0ed1e",
  oem_customization: "asset-adf54709",
  quality_control: "asset-34dd3644",
  export_logistics: "asset-f0a855b0",
  reverse_engineering: "asset-ce82e729",
};

const PROCESS_IMAGES: Record<string, string> = {
  material: "asset-5ad2252d",
  machining: "asset-58e35d4d",
  assembly: "asset-898ea511",
  inspection: "asset-8150685f",
  export: "asset-367fe641",
};

/* ============================================================
   Industries 5卡配图：用户骂"5张都是工厂外景"→ 现在改为真实内景（用户明确禁止用工厂外景头图）
   Mining / Oil&Gas / Manufacturing / Construction / WaterTreatment
   ============================================================ */
const INDUSTRY_IMAGES: Record<string, string> = {
  mining: "asset-481a1fdf",              // Top 366KB production_line interior
  "oil-gas": "asset-19cd714a",           // 359KB 生产车间
  manufacturing: "asset-fed3f8c3",       // 342KB production line
  construction: "asset-a3b8cc78",        // 251KB interior
  "water-treatment": "asset-c2db9d21",   // 245KB interior
};

/* ============================================================
   HERO 9 张透明配件（part-* 前缀、高质量≥90KB≥750px、四角真透明无白边，大型整机0张，Top size descending）
   用户明确要求：Hero 只放配件透明PNG，绝不放大型整机。
   ============================================================ */
const HERO_CUTOUTS = [
  "asset-e82582ef",   // 1151KB 1500×1500 part-valve-5（巨幅主图用，第1顺位）
  "asset-a2b6c351",   // 763KB 1024 part-pump-6
  "asset-b4673cfa",   // 512KB 900  part-automation-6
  "asset-91f2bf53",   // 343KB 800  part-oilsep-0
  "asset-d45ff077",   // 327KB 750  part-oilsep-1
  "asset-bd8385fb",   // 308KB 750  part-oilsep-2
  "asset-48f1c96b",   // 292KB 750  part-oilsep-5
  "asset-344e002d",   // 242KB 750  part-pump-0
  "asset-772d7d00",   // 230KB 800  part-sensor-1
];

const VERIFY_IMAGE = "asset-4837429a";    // 验证区 替换为真 interior
const PARTNERSHIP_IMAGE = "asset-e8786ea4";  // 工厂合作区 替换为真 production_line interior

const CAPABILITIES = getCapabilities();
const INDUSTRIES = getIndustryPages();
const SYSTEMS = getSystemPages();
const BRAND_GROUPS = getBrandGroups();
const REGIONS = factoryTrust.manufacturing_network.regions;
const TRUST = factoryTrust.trust_signals;

const DICT: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "China Industrial Supply Chain Partner", ru: "Китайский партнёр по промышленным цепочкам поставок", zh: "中国工业供应链合作伙伴" },
  h1: { en: "Your Gateway to China's Industrial Manufacturing Network", ru: "Ваш путь к промышленному производству Китая", zh: "通往中国工业制造网络的大门" },
  sub: {
    en: "HISVIA connects global industrial buyers with verified Chinese manufacturers — engineering-matched capability, factory verification, and export execution under one partnership.",
    ru: "HISVIA связывает мировых промышленных покупателей с проверенными китайскими производителями: инженерный подбор, проверка заводов и экспорт — в одном партнёрстве.",
    zh: "HISVIA 连接全球工业买家与经核验的中国制造商——工程匹配、工厂验证与出口执行，一站式合作伙伴。",
  },
  heroCta: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" },
  heroCta2: { en: "Explore Manufacturing Capabilities", ru: "Производственные возможности", zh: "探索制造能力" },
  heroCaption: { en: "Inspection lab — verified manufacturing evidence", ru: "Лаборатория контроля — проверенные производственные данные", zh: "检测实验室——经核验的制造证据" },
  statCaps: { en: "manufacturing capabilities", ru: "производственных возможностей", zh: "制造能力" },
  statClusters: { en: "manufacturing clusters", ru: "производственных кластера", zh: "制造集群" },
  statRegions: { en: "export regions", ru: "региона экспорта", zh: "出口区域" },
  statTerms: { en: "export terms", ru: "условия экспорта", zh: "出口条款" },
  trustQuality: { en: "Quality system", ru: "Система качества", zh: "质量体系" },
  trustMaterial: { en: "Material certificates", ru: "Сертификаты материалов", zh: "材质证书" },
  trustInspect: { en: "Third-party inspection", ru: "Независимый контроль", zh: "第三方检测" },
  trustSample: { en: "Buyer protection", ru: "Защита покупателя", zh: "买家保障" },
  capEyebrow: { en: "Capability System", ru: "Система возможностей", zh: "能力体系" },
  capTitle: { en: "Eight manufacturing capabilities, verified in China", ru: "Восемь производственных возможностей — проверены в Китае", zh: "八项制造能力，经中国验证" },
  capDesc: {
    en: "Every capability is served by factory clusters with published verification standards. Select a capability to see its process, materials and quality evidence.",
    ru: "Каждая возможность обеспечена кластерами заводов с опубликованными стандартами проверки. Выберите возможность, чтобы увидеть процесс, материалы и доказательства качества.",
    zh: "每项能力均由具备公开验证标准的工厂集群提供。选择能力，查看工艺、材料与质量证据。",
  },
  capProcess: { en: "Process", ru: "Процесс", zh: "工艺" },
  capTolerance: { en: "Tolerance", ru: "Допуск", zh: "公差" },
  capMaterials: { en: "Materials", ru: "Материалы", zh: "材料" },
  capBatch: { en: "Batch size", ru: "Размер партии", zh: "批量" },
  capQuality: { en: "Network quality standards", ru: "Сетевые стандарты качества", zh: "网络质量标准" },
  capCta: { en: "Explore capability network →", ru: "Сеть возможностей →", zh: "探索能力网络 →" },
  procEyebrow: { en: "Manufacturing Process", ru: "Производственный процесс", zh: "制造流程" },
  procTitle: { en: "From drawing to export — one controlled chain", ru: "От чертежа до экспорта — одна управляемая цепочка", zh: "从图纸到出口——一条受控链路" },
  procNote: { en: "Six stages · published network standards", ru: "Шесть этапов · опубликованные стандарты", zh: "六个环节 · 公开网络标准" },
  stepDesign: { en: "Design", ru: "Проектирование", zh: "设计" },
  stepDesignD: { en: "Requirement, drawing and material specification are fixed before sourcing starts.", ru: "Требование, чертёж и спецификация материала фиксируются до начала закупки.", zh: "需求、图纸与材料规范在采购开始前即被确认。" },
  stepMaterial: { en: "Material", ru: "Материал", zh: "材料" },
  stepMaterialD: { en: "Steel, stainless, aluminum and engineering plastics with EN 10204 certificates.", ru: "Сталь, нержавейка, алюминий и инженерные пластики с сертификатами EN 10204.", zh: "碳钢、不锈钢、铝与工程塑料，附 EN 10204 证书。" },
  stepMachining: { en: "Machining", ru: "Механообработка", zh: "加工" },
  stepMachiningD: { en: "CNC turning, milling and grinding to ±0.01mm tolerances.", ru: "Токарная и фрезерная обработка с ЧПУ до ±0,01 мм.", zh: "CNC 车削、铣削与磨削，公差至 ±0.01mm。" },
  stepAssembly: { en: "Assembly", ru: "Сборка", zh: "装配" },
  stepAssemblyD: { en: "Complete system assembly with in-house test benches.", ru: "Полная сборка систем с собственными испытательными стендами.", zh: "整机装配与厂内测试台。" },
  stepInspection: { en: "Inspection", ru: "Контроль", zh: "检测" },
  stepInspectionD: { en: "In-process SPC and final QC with calibrated measurement equipment.", ru: "Пооперационный контроль и финальная проверка на калиброванном оборудовании.", zh: "过程统计控制与校准设备终检。" },
  stepExport: { en: "Export", ru: "Экспорт", zh: "出口" },
  stepExportD: { en: "FOB/CIF shipping with export documentation and container supervision.", ru: "Отгрузка FOB/CIF с экспортной документацией и контролем контейнера.", zh: "FOB/CIF 发运，附出口文件与装箱监督。" },
  indEyebrow: { en: "Industry Solutions", ru: "Отраслевые решения", zh: "行业解决方案" },
  indTitle: { en: "Industries we supply from China", ru: "Отрасли, которые мы снабжаем из Китая", zh: "我们从中国供应的行业" },
  indPain: { en: "Buyer challenge", ru: "Задача покупателя", zh: "买家痛点" },
  indSystems: { en: "Relevant systems", ru: "Соответствующие системы", zh: "相关系统" },
  indCta: { en: "View industry supply →", ru: "Снабжение отрасли →", zh: "查看行业供应 →" },
  evEyebrow: { en: "Verification", ru: "Проверка", zh: "验证体系" },
  evTitle: { en: "How we verify Chinese factories", ru: "Как мы проверяем китайские заводы", zh: "我们如何验证中国工厂" },
  evDesc: {
    en: "Published network-level standards. Per-factory documents are collected during sourcing — never claimed before verification.",
    ru: "Опубликованные сетевые стандарты. Документы заводов собираются в процессе закупки — без заявлений до проверки.",
    zh: "网络级标准公开。工厂级文件在采购过程中收集——未经验证不作声称。",
  },
  fpEyebrow: { en: "For Chinese Factories", ru: "Китайским заводам", zh: "面向中国工厂" },
  fpTitle: { en: "Join a network built for export", ru: "Вступите в сеть, созданную для экспорта", zh: "加入为出口而建的制造网络" },
  fpDesc: {
    en: "HISVIA brings qualified overseas buyers to Chinese manufacturers with real requirements, verification standards, and export execution.",
    ru: "HISVIA приводит квалифицированных зарубежных покупателей к китайским производителям: реальные запросы, стандарты проверки и экспортное сопровождение.",
    zh: "HISVIA 为具备条件的中国制造商对接真实海外采购需求、验证标准与出口执行。",
  },
  fpPoint1: { en: "Overseas buyer demand across five industries", ru: "Спрос зарубежных покупателей в пяти отраслях", zh: "覆盖五个行业的海外买家需求" },
  fpPoint2: { en: "Capability verification against published standards", ru: "Проверка возможностей по опубликованным стандартам", zh: "按公开标准进行能力验证" },
  fpPoint3: { en: "Export documentation and logistics coordination", ru: "Экспортные документы и координация логистики", zh: "出口文件与物流协调" },
  fpPoint4: { en: "Sample-first, verification-first process", ru: "Сначала образцы, потом проверка", zh: "先打样、先验证的流程" },
  fpCta: { en: "Partner with HISVIA", ru: "Стать партнёром", zh: "成为合作伙伴" },
  fpNote: { en: "Own factory · quality system · export capability", ru: "Собственный завод · система качества · экспорт", zh: "自有工厂 · 质量体系 · 出口能力" },
  ctaKicker: { en: "Start Sourcing", ru: "Начать закупку", zh: "开始采购" },
  ctaTitle: { en: "Tell us what you need. We map the manufacturing path.", ru: "Опишите потребность — мы построим производственный маршрут.", zh: "告诉我们您的需求，我们为您匹配制造路径。" },
  ctaDesc: {
    en: "Describe your requirement in plain language. Our team responds with a structured sourcing path and a verified factory shortlist.",
    ru: "Опишите потребность простым языком — команда ответит планом закупки и шорт-листом проверенных заводов.",
    zh: "用自然语言描述您的需求，团队将回复结构化采购路径与验证工厂短名单。",
  },
  ctaBtn: { en: "Start your sourcing request →", ru: "Начать запрос →", zh: "开始采购请求 →" },
  ctaNote: { en: "Free · No obligation · Verified suppliers · EN / RU / ZH", ru: "Бесплатно · Без обязательств · Проверенные поставщики · EN / RU / ZH", zh: "免费 · 无义务 · 验证供应商 · EN / RU / ZH" },
  sysEyebrow: { en: "Industrial Systems", ru: "Промышленные системы", zh: "工业系统" },
  sysTitle: { en: "Eight industrial systems, sourced and verified in China", ru: "Восемь промышленных систем — из Китая с проверкой", zh: "八大工业系统，中国采购与验证" },
  sysDesc: {
    en: "From compressed air to hydraulic power — each system maps to real manufacturing clusters, compatible brands, and replacement components already in our library.",
    ru: "От сжатого воздуха до гидравлики — каждая система привязана к реальным кластерам, совместимым брендам и компонентам-аналогам в нашей базе.",
    zh: "从压缩空气到液压动力——每个系统对应真实制造集群、兼容品牌及库内替代部件。",
  },
  sysBrands: { en: "compatible brands", ru: "совместимых брендов", zh: "兼容品牌" },
  sysCta: { en: "Explore all systems →", ru: "Все системы →", zh: "探索全部系统 →" },
  brandEyebrow: { en: "Brands & Replacement", ru: "Бренды и аналоги", zh: "品牌与替代" },
  brandTitle: { en: "Compatible replacement components from qualified Chinese manufacturers", ru: "Совместимые аналоги от проверенных заводов Китая", zh: "来自合格中国制造商的兼容替代部件" },
  brandDesc: {
    en: "Our library covers industrial brands across compressor, hydraulic, pump, and automation families. We source compatible replacement parts engineered to OEM specifications — never claiming official dealership.",
    ru: "Наша база охватывает бренды в области компрессоров, гидравлики, насосов и автоматики. Мы поставляем совместимые аналоги по спецификациям OEM — без претензий на официальное дилерство.",
    zh: "我们的图库覆盖压缩机、液压、泵、自动化等品牌族。我们提供按 OEM 规格制造的兼容替代部件——绝不声称官方代理。",
  },
  brandParts: { en: "parts", ru: "деталей", zh: "部件" },
  brandCta: { en: "Browse all brands & replacement →", ru: "Все бренды и аналоги →", zh: "浏览全部品牌与替代 →" },
  brandNote: { en: "Compatible · not official dealer · engineered to spec", ru: "Совместимо · не дилер · по спецификации", zh: "兼容 · 非官方代理 · 按规格制造" },
};

function makeT(locale: Locale) {
  return (k: string) => DICT[k]?.[locale] ?? DICT[k]?.en ?? k;
}

export default function V2HomepageBrand({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const requestHref = `/v2/${locale}/request`;
  const capNetworkHref = `/v2/${locale}/capability-network`;

  const heroAsset = resolveAsset("asset-9d813928");
  const capAssets = Object.fromEntries(
    Object.entries(CAP_IMAGES).map(([id, assetId]) => [id, resolveAsset(assetId)])
  );
  const processSteps = [
    { label: t("stepDesign"), desc: t("stepDesignD"), asset: null },
    { label: t("stepMaterial"), desc: t("stepMaterialD"), asset: resolveAsset(PROCESS_IMAGES.material) },
    { label: t("stepMachining"), desc: t("stepMachiningD"), asset: resolveAsset(PROCESS_IMAGES.machining) },
    { label: t("stepAssembly"), desc: t("stepAssemblyD"), asset: resolveAsset(PROCESS_IMAGES.assembly) },
    { label: t("stepInspection"), desc: t("stepInspectionD"), asset: resolveAsset(PROCESS_IMAGES.inspection) },
    { label: t("stepExport"), desc: t("stepExportD"), asset: resolveAsset(PROCESS_IMAGES.export) },
  ];

  return (
    <main className="relative min-h-screen overflow-x-clip" style={{ background: PAPER }}>
      {/* S1 — HERO */}
      <IndustrialHero
        locale={locale}
        kicker={t("kicker")}
        title={t("h1")}
        sub={t("sub")}
        asset={heroAsset}
        heroAccessories={HERO_CUTOUTS.map((id) => resolveAsset(id))}
        cta={{ label: t("heroCta"), href: requestHref }}
        ctaSecondary={{ label: t("heroCta2"), href: "#capabilities" }}
        caption={t("heroCaption")}
        stats={[
          { v: String(CAPABILITIES.length), l: t("statCaps") },
          { v: String(REGIONS.length), l: t("statClusters") },
          { v: "4", l: t("statRegions") },
          { v: "FOB / CIF", l: t("statTerms") },
        ]}
      />

      {/* S2 — TRUST BAR */}
      <TrustBar
        items={[
          { v: "ISO 9001:2015", l: t("trustQuality") },
          { v: "EN 10204 3.1 / 3.2", l: t("trustMaterial") },
          { v: "SGS · BV · TÜV", l: t("trustInspect") },
          { v: "Sample-first", l: t("trustSample") },
        ]}
      />

      {/* S3 — CAPABILITY SYSTEM */}
      <div id="capabilities" className="scroll-mt-16">
        <CapabilityShowcase
          locale={locale}
          capabilities={CAPABILITIES}
          capAssets={capAssets}
          qualitySystems={TRUST.quality_systems}
          ctaHref={capNetworkHref}
          labels={{
            eyebrow: t("capEyebrow"),
            title: t("capTitle"),
            desc: t("capDesc"),
            process: t("capProcess"),
            tolerance: t("capTolerance"),
            materials: t("capMaterials"),
            batch: t("capBatch"),
            quality: t("capQuality"),
            cta: t("capCta"),
          }}
        />
      </div>

      {/* S4 — MANUFACTURING PROCESS */}
      <ProcessTimeline steps={processSteps} eyebrow={t("procEyebrow")} title={t("procTitle")} note={t("procNote")} />

      {/* S4.5 — INDUSTRIAL SYSTEMS OVERVIEW (主指令 §6: 系统发现入口) */}
      <section className="v2sub border-b" style={{ borderColor: LINE, background: PAPER }}>
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("sysEyebrow")}</motion.p>
              <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("sysTitle")}</motion.h2>
              <motion.p {...reveal} className="mt-5 max-w-[440px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("sysDesc")}</motion.p>
              <motion.a {...reveal} href={capNetworkHref} className="mono mt-8 inline-block border-b pb-1 text-[10.5px] tracking-[0.18em] uppercase transition-opacity hover:opacity-65" style={{ borderColor: INK, color: INK }}>{t("sysCta")}</motion.a>
            </div>
            <div className="lg:col-span-7">
              <div className="border-t" style={{ borderColor: LINE }}>
                {SYSTEMS.map((s, i) => (
                  <motion.a
                    key={s.route}
                    href={`/v2/${locale}${s.route}`}
                    {...reveal}
                    transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                    className="group flex items-center gap-5 border-b py-[18px] transition-colors hover:bg-[#EFEEE6]"
                    style={{ borderColor: LINE }}
                  >
                    <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1 min-w-0">
                      <p className="display text-[clamp(15px,1.4vw,20px)] font-semibold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: INK }}>{s.system_type}</p>
                      <p className="mono mt-1 text-[9px] tracking-[0.16em] uppercase" style={{ color: DIM }}>{(s.compatible_brands || []).length} {t("sysBrands")}</p>
                    </div>
                    <span className="display shrink-0 text-[18px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: FAINT }}>→</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S5 — INDUSTRY SOLUTIONS */}
      <section className="border-b" style={{ borderColor: NIGHT, background: NIGHT }}>
        <div className="mx-auto w-full max-w-[1500px] px-6 pt-20 md:px-10 lg:pt-28">
          <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("indEyebrow")}</motion.p>
          <motion.h2 {...reveal} className="display mt-4 max-w-[820px] text-[clamp(30px,3.4vw,54px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: PAPER }}>{t("indTitle")}</motion.h2>
        </div>
        <div className="mx-auto mt-14 w-full max-w-[1500px]" style={{ borderColor: "#2A2E31", borderTopWidth: 1 }}>
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard
              key={ind.id}
              locale={locale}
              index={i}
              title={ind.title}
              pain={ind.buyer_pain_point}
              systems={ind.relevant_systems}
              href={`/v2/${locale}/industries/${ind.id}`}
              asset={resolveAsset(INDUSTRY_IMAGES[ind.id])}
              labels={{ pain: t("indPain"), systems: t("indSystems"), cta: t("indCta") }}
            />
          ))}
        </div>
      </section>

      {/* S5.5 — BRANDS & REPLACEMENT DISCOVERY (主指令 §5: 品牌发现入口) */}
      <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER_D }}>
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 py-14 lg:py-20">
          <div className="max-w-[760px]">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{t("brandEyebrow")}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(28px,3.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>{t("brandTitle")}</motion.h2>
            <motion.p {...reveal} className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{t("brandDesc")}</motion.p>
          </div>
          <div className="mt-12 border-t" style={{ borderColor: LINE }}>
            {BRAND_GROUPS.map((g, i) => {
              const totalParts = g.brands.reduce((s, b) => s + b.count, 0);
              return (
                <motion.div
                  key={g.domain}
                  {...reveal}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                  className="group grid gap-4 border-b py-6 lg:grid-cols-[260px_1fr] lg:gap-8"
                  style={{ borderColor: LINE }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: FAINT }}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="display text-[clamp(15px,1.4vw,20px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{g.domain}</p>
                      <p className="mono mt-1 text-[9px] tracking-[0.16em] uppercase" style={{ color: DIM }}>{g.brands.length} brands · {totalParts} {t("brandParts")}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:pl-6 lg:border-l" style={{ borderColor: LINE }}>
                    {g.brands.slice(0, 8).map((b) => (
                      <span key={b.name} className="mono text-[10.5px] tracking-[0.04em]" style={{ color: DIM }}>{b.name}</span>
                    ))}
                    {g.brands.length > 8 && <span className="mono text-[10.5px]" style={{ color: FAINT }}>+{g.brands.length - 8}</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <motion.a {...reveal} href={`/v2/${locale}/brands`} className="mono inline-block border-b pb-1 text-[10.5px] tracking-[0.18em] uppercase transition-opacity hover:opacity-65" style={{ borderColor: INK, color: INK }}>{t("brandCta")}</motion.a>
            <motion.p {...reveal} className="mono text-[9px] tracking-[0.16em] uppercase" style={{ color: FAINT }}>{t("brandNote")}</motion.p>
          </div>
        </div>
      </section>

      {/* S6 — VERIFICATION */}
      <EvidencePanel
        locale={locale}
        asset={resolveAsset(VERIFY_IMAGE)}
        clusters={REGIONS.length}
        qualitySystems={TRUST.quality_systems}
        exportCapability={TRUST.export_capability}
        buyerProtections={TRUST.buyer_protections}
        labels={{ eyebrow: t("evEyebrow"), title: t("evTitle"), desc: t("evDesc") }}
      />

      {/* S7 — FACTORY PARTNERSHIP */}
      <FactoryProof
        locale={locale}
        asset={resolveAsset(PARTNERSHIP_IMAGE)}
        points={[t("fpPoint1"), t("fpPoint2"), t("fpPoint3"), t("fpPoint4")]}
        cta={{ label: t("fpCta"), href: `/v2/${locale}/for-factories` }}
        labels={{ eyebrow: t("fpEyebrow"), title: t("fpTitle"), desc: t("fpDesc"), note: t("fpNote") }}
      />

      {/* S8 — FINAL CTA */}
      <PremiumCTA
        locale={locale}
        kicker={t("ctaKicker")}
        title={t("ctaTitle")}
        desc={t("ctaDesc")}
        ctaLabel={t("ctaBtn")}
        href={requestHref}
        note={t("ctaNote")}
      />

      <div className="border-t" style={{ borderColor: LINE }}>
        <p className="mono mx-auto w-full max-w-[1500px] px-6 py-4 text-[8.5px] tracking-[0.2em] uppercase" style={{ color: FAINT }}>
          HISVIA · {t("kicker")} · {t("ctaNote")}
        </p>
      </div>
    </main>
  );
}
