import type { Locale } from "@/lib/locales";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import companyProfile from "@/data/content-v2/company-profile.json";
import factoryTrust from "@/data/content-v2/factory-trust.json";
import V2InfoPageExperience from "@/components/v2/V2InfoPageExperience";
import type { InfoSection } from "@/components/v2/V2InfoPageExperience";

const HERO = "asset-3e6d4bdc";
const SPLIT = "asset-4a71b054";

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "About HISVIA", ru: "О HISVIA", zh: "关于 HISVIA" },
  heroTitle: { en: "China Industrial Supply Chain Partner", ru: "Партнёр по промышленной цепочке поставок Китая", zh: "中国工业供应链合作伙伴" },
  heroCta: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" },
  whoEyebrow: { en: "Who HISVIA is", ru: "Кто мы", zh: "我们是谁" },
  whoTitle: { en: "A sourcing partner, not a platform", ru: "Партнёр по закупкам, а не платформа", zh: "采购伙伴，而非平台" },
  who1: { en: "An industrial supply chain partner for overseas companies sourcing in China — not an e-commerce marketplace.", ru: "Партнёр по промышленной цепочке поставок для зарубежных компаний, закупающих в Китае, — а не торговая площадка.", zh: "为海外企业在华采购服务的工业供应链伙伴——不是电商市场。" },
  who2: { en: "One team across engineering matching, factory verification, quality control and export execution.", ru: "Одна команда: инженерный подбор, проверка заводов, контроль качества и экспортное сопровождение.", zh: "一支团队覆盖工程匹配、工厂验证、质量管控与出口执行。" },
  who3: { en: "We work on the buyer's problem — replacement parts, alternative supply, OEM production or spare parts chains.", ru: "Мы решаем задачу покупателя: запасные части, альтернативные поставки, OEM-производство или цепочки запчастей.", zh: "我们解决买家的实际问题——替换零件、替代供应、OEM 生产或备件供应链。" },
  whyEyebrow: { en: "Why HISVIA exists", ru: "Зачем мы существуем", zh: "HISVIA 为何存在" },
  whyTitle: { en: "Bridging global demand and China's manufacturing ecosystem", ru: "Мост между мировым спросом и производственной экосистемой Китая", zh: "连接全球需求与中国制造生态" },
  why1: { en: "Buyers need reliable access to China's manufacturing resources without navigating them alone.", ru: "Покупателям нужен надёжный доступ к производственным ресурсам Китая без самостоятельной навигации по ним.", zh: "买家需要可靠地触达中国制造资源，而不必独自摸索。" },
  why2: { en: "Factories need structured overseas demand — technical requirements, verification and export readiness.", ru: "Заводам нужен структурированный зарубежный спрос: технические требования, проверка и готовность к экспорту.", zh: "工厂需要结构化的海外需求——技术要求、验证与出口准备。" },
  why3: { en: "Downtime costs more than parts. We shorten the path from requirement to verified production.", ru: "Простой стоит дороже деталей. Мы сокращаем путь от запроса до проверенного производства.", zh: "停机成本高于零件成本。我们缩短从需求到经验证生产的路径。" },
  accessEyebrow: { en: "China manufacturing access", ru: "Доступ к производству Китая", zh: "触达中国制造" },
  accessTitle: { en: "Eight industrial systems, verified on the ground", ru: "Восемь промышленных систем, проверенных на месте", zh: "八项工业系统，实地验证" },
  accessDesc: { en: "Air compressors, hydraulics, pumps, valves, filtration, pneumatic automation, mechanical transmission and automation control — served by verified factory clusters in Zhejiang, Shanghai/Jiangsu and Guangdong.", ru: "Компрессоры, гидравлика, насосы, клапаны, фильтрация, пневмоавтоматика, механические передачи и автоматизация — с проверенными кластерами заводов в Чжэцзяне, Шанхае/Цзянсу и Гуандуне.", zh: "空压机、液压、泵、阀门、过滤、气动自动化、机械传动与自动化控制——由浙江、上海/江苏、广东的经核验工厂集群服务。" },
  modelEyebrow: { en: "Connection model", ru: "Модель взаимодействия", zh: "连接模式" },
  modelTitle: { en: "Buyer + Factory, under one partnership", ru: "Покупатель + завод — в одном партнёрстве", zh: "买家 + 工厂，同一伙伴关系" },
  model1: { en: "Buyers describe the requirement in plain language — material, quantity, tolerance, certification.", ru: "Покупатель описывает потребность простым языком: материал, количество, допуски, сертификация.", zh: "买家用自然语言描述需求——材料、数量、公差、认证。" },
  model2: { en: "HISVIA maps the manufacturing capability and shortlists verified factories with evidence.", ru: "HISVIA определяет производственные возможности и формирует шорт-лист проверенных заводов с доказательствами.", zh: "HISVIA 匹配制造能力并出具带证据的验证工厂短名单。" },
  model3: { en: "Samples, inspection and export documentation carry the order to your destination.", ru: "Образцы, инспекция и экспортная документация доводят заказ до вашего получателя.", zh: "打样、检验与出口单证将订单送达您的目的地。" },
  ctaKicker: { en: "Start here", ru: "Начните здесь", zh: "从这里开始" },
  ctaTitle: { en: "Tell us what you need from China", ru: "Расскажите, что вам нужно из Китая", zh: "告诉我们您需要从中国采购什么" },
  ctaDesc: { en: "Describe your part or system in plain language. Our team responds with a structured sourcing path and verified factory shortlist.", ru: "Опишите деталь или систему простым языком — команда ответит планом закупки и шорт-листом проверенных заводов.", zh: "用自然语言描述您的零件或系统，团队将回复结构化采购路径与验证工厂短名单。" },
  ctaBtn: { en: "Submit a Request →", ru: "Отправить запрос →", zh: "提交需求 →" },
  ctaNote: { en: "Free · No obligation · Verified suppliers · EN / RU / ZH", ru: "Бесплатно · Без обязательств · Проверенные поставщики · EN / RU / ZH", zh: "免费 · 无义务 · 验证供应商 · EN / RU / ZH" },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

export default function V2AboutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const requestHref = `/v2/${locale}/request`;

  const heroDesc = locale === "zh" && companyProfile.company.description_zh
    ? companyProfile.company.description_zh
    : locale === "ru" && companyProfile.company.description_ru
    ? companyProfile.company.description_ru
    : companyProfile.company.description;

  const sections: InfoSection[] = [
    { type: "numbered", eyebrow: t("whoEyebrow"), title: t("whoTitle"), items: [t("who1"), t("who2"), t("who3")] },
    { type: "numbered", eyebrow: t("whyEyebrow"), title: t("whyTitle"), items: [t("why1"), t("why2"), t("why3")], bg: "paperD" },
    { type: "split", eyebrow: t("accessEyebrow"), title: t("accessTitle"), desc: t("accessDesc"), bullets: factoryTrust.trust_signals.quality_systems.slice(0, 3), asset: resolveAsset(SPLIT) },
    { type: "steps", eyebrow: t("modelEyebrow"), title: t("modelTitle"), steps: [
      { title: t("model1"), desc: "" },
      { title: t("model2"), desc: "" },
      { title: t("model3"), desc: "" },
    ], bg: "paperD" },
  ];

  return (
    <V2InfoPageExperience
      locale={locale}
      heroKicker={t("kicker")}
      heroTitle={t("heroTitle")}
      heroDesc={heroDesc}
      heroAsset={resolveAsset(HERO)}
      heroCta={{ label: t("heroCta"), href: requestHref }}
      sections={sections}
      cta={{ kicker: t("ctaKicker"), title: t("ctaTitle"), desc: t("ctaDesc"), label: t("ctaBtn"), href: requestHref, note: t("ctaNote") }}
    />
  );
}
