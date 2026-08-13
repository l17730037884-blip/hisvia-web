import type { Locale } from "@/lib/locales";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import factoryTrust from "@/data/content-v2/factory-trust.json";
import V2InfoPageExperience from "@/components/v2/V2InfoPageExperience";
import type { InfoSection } from "@/components/v2/V2InfoPageExperience";

const HERO = "asset-61c7fb6a";

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Verification", ru: "Проверка", zh: "验证体系" },
  heroTitle: { en: "Every factory, verified before you meet it", ru: "Каждый завод проверен до знакомства с вами", zh: "每家工厂在您接触前都经过验证" },
  heroDesc: { en: "HISVIA publishes one verification standard for the whole network — capability, quality system, documentation, inspection and export readiness. The same standard buyers see is the standard factories pass.", ru: "HISVIA публикует единый стандарт проверки для всей сети: возможности, система качества, документация, инспекция и экспортная готовность. Заводы проходят тот же стандарт, который видят покупатели.", zh: "HISVIA 为整个网络发布统一验证标准——能力、质量体系、单证、检验与出口准备。买家看到的标准就是工厂通过的标准。" },
  heroCta: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" },
  stepsEyebrow: { en: "Verification Standard", ru: "Стандарт проверки", zh: "验证标准" },
  stepsTitle: { en: "Five-stage factory verification", ru: "Пятиэтапная проверка заводов", zh: "五阶段工厂验证" },
  s1t: { en: "Capability verification", ru: "Проверка возможностей", zh: "能力验证" },
  s1d: { en: "The factory can do what the buyer needs. Equipment, processes and similar export products matched to the requirement before any introduction.", ru: "Завод умеет то, что нужно покупателю. Оборудование, процессы и аналогичная экспортная продукция сопоставляются с потребностью до представления.", zh: "工厂能做买家需要的事。推荐前将设备、工艺与同类出口产品与需求匹配。" },
  s2t: { en: "Quality system", ru: "Система качества", zh: "质量体系" },
  s2d: { en: "Published quality standards, checked on site. ISO 9001 or equivalent with documented in-process and final inspection.", ru: "Опубликованные стандарты качества, проверенные на месте. ISO 9001 или аналог с документированным контролем.", zh: "公开质量标准，实地核查。ISO 9001 或同等标准，具备文件化检验。" },
  s3t: { en: "Documentation", ru: "Документация", zh: "单证文件" },
  s3d: { en: "No claim without a document. Material certificates, export documentation and production records collected and shared before decisions.", ru: "Никаких заявлений без документов. Сертификаты на материалы, экспортная документация и производственные записи передаются покупателю до принятия решений.", zh: "没有文件，就没有声明。材料证书、出口单证与生产记录在决策前收集并提供。" },
  s4t: { en: "Inspection", ru: "Инспекция", zh: "检验" },
  s4d: { en: "Inspection before bulk production. Material certificates, in-process inspection, sample orders and third-party inspection.", ru: "Инспекция до серийного производства. Сертификаты на материалы, промежуточный контроль, пробные заказы и сторонняя инспекция.", zh: "批量生产前检验。材料证书、过程检验、样品订单与第三方检验。" },
  s5t: { en: "Export readiness", ru: "Экспортная готовность", zh: "出口准备" },
  s5d: { en: "The goods reach your destination. Export documentation, consolidated shipping and delivery follow-up — FOB/CIF to Russia, Central Asia, the Middle East and Southeast Asia.", ru: "Товар доходит до получателя. Экспортная документация, консолидированная отгрузка и сопровождение доставки — FOB/CIF в Россию, Центральную Азию, Ближний Восток и Юго-Восточную Азию.", zh: "货物送达目的地。出口单证、拼箱运输与到货跟进——FOB/CIF 发往俄罗斯、中亚、中东与东南亚。" },
  noEyebrow: { en: "What we never do", ru: "Чего мы не делаем", zh: "我们绝不做的事" },
  noTitle: { en: "No shortcuts between requirement and evidence", ru: "Никаких сокращений между запросом и доказательствами", zh: "需求与证据之间没有捷径" },
  no1: { en: "No supplier list without verification evidence.", ru: "Никаких списков поставщиков без доказательств проверки.", zh: "没有验证证据，不出供应商名单。" },
  no2: { en: "No automatic matching that skips human engineering review.", ru: "Никакого автоматического подбора в обход инженерной проверки человеком.", zh: "没有绕过人工工程评审的自动匹配。" },
  no3: { en: "No shipment without documentation and inspection records.", ru: "Никаких отгрузок без документации и протоколов инспекции.", zh: "没有单证与检验记录，不发运。" },
  ctaKicker: { en: "Start here", ru: "Начните здесь", zh: "从这里开始" },
  ctaTitle: { en: "Ask for a verified shortlist", ru: "Запросите проверенный шорт-лист", zh: "索取经验证的短名单" },
  ctaDesc: { en: "Describe your requirement. We respond with the matching capability and factory evidence — the same verification standards published on this page.", ru: "Опишите потребность. Мы ответим подходящими возможностями и доказательствами по заводам — по стандартам проверки с этой страницы.", zh: "描述您的需求。我们将回复匹配的能力与工厂证据——采用本页公开的同一验证标准。" },
  ctaBtn: { en: "Submit a Request →", ru: "Отправить запрос →", zh: "提交需求 →" },
  ctaNote: { en: "Real network data — no fictional factories", ru: "Реальные данные сети — без вымышленных заводов", zh: "真实网络数据——无虚构工厂" },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

export default function V2VerificationPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const requestHref = `/v2/${locale}/request`;

  const sections: InfoSection[] = [
    { type: "steps", eyebrow: t("stepsEyebrow"), title: t("stepsTitle"), steps: [
      { title: t("s1t"), desc: t("s1d") },
      { title: t("s2t"), desc: t("s2d") },
      { title: t("s3t"), desc: t("s3d") },
      { title: t("s4t"), desc: t("s4d") },
      { title: t("s5t"), desc: t("s5d") },
    ]},
    { type: "statement", eyebrow: t("noEyebrow"), title: t("noTitle"), items: [t("no1"), t("no2"), t("no3")], bg: "night" },
  ];

  return (
    <V2InfoPageExperience
      locale={locale}
      heroKicker={t("kicker")}
      heroTitle={t("heroTitle")}
      heroDesc={t("heroDesc")}
      heroAsset={resolveAsset(HERO)}
      heroCta={{ label: t("heroCta"), href: requestHref }}
      sections={sections}
      cta={{ kicker: t("ctaKicker"), title: t("ctaTitle"), desc: t("ctaDesc"), label: t("ctaBtn"), href: requestHref, note: t("ctaNote") }}
    />
  );
}
