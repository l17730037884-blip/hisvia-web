import type { Locale } from "@/lib/locales";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import V2InfoPageExperience from "@/components/v2/V2InfoPageExperience";
import type { InfoSection } from "@/components/v2/V2InfoPageExperience";

/* ============================================================
   /v2/[locale]/how-we-work
   Composition: Sourcing path (steps) → Never-do (dark statement)
   不同 section 类型 + 深色 statement，避免重复编辑式布局。
   ============================================================ */

const HERO = "asset-9d813928"; // factory interior-028

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "How We Work", ru: "Как мы работаем", zh: "合作方式" },
  heroTitle: { en: "From requirement to verified production", ru: "От запроса до проверенного производства", zh: "从需求到经验证的生产" },
  heroDesc: {
    en: "A structured sourcing path in five steps — requirement, manufacturing route, factory verification, quality control and export. People and evidence at every step.",
    ru: "Структурированный путь закупки из пяти шагов: потребность, производственный маршрут, проверка завода, контроль качества и экспорт. На каждом шаге — люди и доказательства.",
    zh: "五步结构化采购路径——需求、制造路径、工厂验证、质量管控与出口。每一步都有人与证据。",
  },
  heroCta: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" },
  heroCta2: { en: "See verification standard", ru: "Стандарт проверки", zh: "查看验证标准" },
  stepsEyebrow: { en: "The sourcing path", ru: "Путь закупки", zh: "采购路径" },
  stepsTitle: { en: "Five steps, one accountable partner", ru: "Пять шагов — один ответственный партнёр", zh: "五个步骤，一个负责的伙伴" },
  s1t: { en: "Requirement Understanding", ru: "Понимание потребности", zh: "需求理解" },
  s1d: {
    en: "You describe the part, application, material, quantity and certification needs in plain language. We structure the requirement into product category, industry, process and verification criteria.",
    ru: "Вы описываете деталь, применение, материал, количество и требования к сертификации простым языком. Мы структурируем запрос: категория, отрасль, процесс и критерии проверки.",
    zh: "您用自然语言描述零件、应用、材料、数量与认证要求。我们将需求结构化为产品类别、行业、工艺与验证标准。",
  },
  s2t: { en: "Manufacturing Route Identification", ru: "Определение производственного маршрута", zh: "制造路径识别" },
  s2d: {
    en: "We map which Chinese manufacturing capabilities and regions can produce it — CNC machining, casting, forging, assembly or OEM — and where the strongest factory clusters are.",
    ru: "Мы определяем, какие производственные возможности и регионы Китая могут это изготовить — ЧПУ, литьё, ковка, сборка или OEM — и где находятся сильнейшие кластеры заводов.",
    zh: "我们识别哪些中国制造能力与区域可以生产——CNC 加工、铸造、锻造、装配或 OEM——以及最强的工厂集群在哪里。",
  },
  s3t: { en: "Factory Capability Verification", ru: "Проверка возможностей завода", zh: "工厂能力验证" },
  s3d: {
    en: "We shortlist factories by equipment, certifications and similar export products — with evidence: photos, documents and past production references, never unsupported claims.",
    ru: "Мы формируем шорт-лист заводов по оборудованию, сертификатам и похожей экспортной продукции — с доказательствами: фото, документы и прошлые поставки, без голословных заявлений.",
    zh: "我们按设备、认证与同类出口产品筛选工厂——并附证据：照片、文件与历史生产记录，绝无空口声明。",
  },
  s4t: { en: "Quality Control", ru: "Контроль качества", zh: "质量管控" },
  s4d: {
    en: "Material certificates, in-process inspection, sample orders and third-party inspection before bulk production. Quality is documented at every stage.",
    ru: "Сертификаты на материалы, промежуточный контроль, пробные заказы и сторонняя инспекция перед серийным производством. Качество фиксируется на каждом этапе.",
    zh: "材料证书、过程检验、样品订单与批量生产前的第三方检验。每个阶段的质量都有文件记录。",
  },
  s5t: { en: "Export Coordination", ru: "Экспортное сопровождение", zh: "出口协调" },
  s5d: {
    en: "Export documentation, consolidated shipping and delivery follow-up to your destination — FOB/CIF to Russia, Central Asia, the Middle East and Southeast Asia.",
    ru: "Экспортная документация, консолидированная отгрузка и сопровождение доставки — FOB/CIF в Россию, Центральную Азию, Ближний Восток и Юго-Восточную Азию.",
    zh: "出口单证、拼箱运输与到货跟进——FOB/CIF 发往俄罗斯、中亚、中东与东南亚。",
  },
  noEyebrow: { en: "What we never do", ru: "Чего мы не делаем", zh: "我们绝不做的事" },
  noTitle: { en: "No shortcuts between requirement and evidence", ru: "Никаких сокращений между запросом и доказательствами", zh: "需求与证据之间没有捷径" },
  no1: {
    en: "No supplier list without verification evidence.",
    ru: "Никаких списков поставщиков без доказательств проверки.",
    zh: "没有验证证据，不出供应商名单。",
  },
  no2: {
    en: "No automatic matching that skips human engineering review.",
    ru: "Никакого автоматического подбора в обход инженерной проверки человеком.",
    zh: "没有绕过人工工程评审的自动匹配。",
  },
  no3: {
    en: "No shipment without documentation and inspection records.",
    ru: "Никаких отгрузок без документации и протоколов инспекции.",
    zh: "没有单证与检验记录，不发运。",
  },
  ctaKicker: { en: "Start here", ru: "Начните здесь", zh: "从这里开始" },
  ctaTitle: { en: "Begin with step one — describe the requirement", ru: "Начните с первого шага — опишите потребность", zh: "从第一步开始——描述需求" },
  ctaDesc: {
    en: "The fastest way to a verified factory shortlist is a clear requirement. Tell us what you need and we take it from there.",
    ru: "Самый быстрый путь к шорт-листу проверенных заводов — чёткая потребность. Опишите её, и мы продолжим.",
    zh: "获得验证工厂短名单的最快方式是清晰的需求。告诉我们您的需求，其余交给我们。",
  },
  ctaBtn: { en: "Submit a Request →", ru: "Отправить запрос →", zh: "提交需求 →" },
  ctaNote: { en: "Free · No obligation · Verified suppliers · EN / RU / ZH", ru: "Бесплатно · Без обязательств · Проверенные поставщики · EN / RU / ZH", zh: "免费 · 无义务 · 验证供应商 · EN / RU / ZH" },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

export default function V2HowWeWorkPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const v2 = `/v2/${locale}`;

  const sections: InfoSection[] = [
    {
      type: "steps",
      eyebrow: t("stepsEyebrow"),
      title: t("stepsTitle"),
      steps: [
        { title: t("s1t"), desc: t("s1d") },
        { title: t("s2t"), desc: t("s2d") },
        { title: t("s3t"), desc: t("s3d") },
        { title: t("s4t"), desc: t("s4d") },
        { title: t("s5t"), desc: t("s5d") },
      ],
    },
    {
      type: "statement",
      eyebrow: t("noEyebrow"),
      title: t("noTitle"),
      items: [t("no1"), t("no2"), t("no3")],
      bg: "night",
    },
  ];

  return (
    <V2InfoPageExperience
      locale={locale}
      heroKicker={t("kicker")}
      heroTitle={t("heroTitle")}
      heroDesc={t("heroDesc")}
      heroAsset={resolveAsset(HERO)}
      heroCta={{ label: t("heroCta"), href: `${v2}/request` }}
      heroCta2={{ label: t("heroCta2"), href: `${v2}/verification` }}
      sections={sections}
      cta={{
        kicker: t("ctaKicker"),
        title: t("ctaTitle"),
        desc: t("ctaDesc"),
        label: t("ctaBtn"),
        href: `${v2}/request`,
        note: t("ctaNote"),
      }}
    />
  );
}
