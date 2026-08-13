import type { Locale } from "@/lib/locales";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import factoryTrust from "@/data/content-v2/factory-trust.json";
import V2InfoPageExperience from "@/components/v2/V2InfoPageExperience";
import type { InfoSection } from "@/components/v2/V2InfoPageExperience";

/* ============================================================
   /v2/[locale]/for-factories
   Composition: Why join (numbered) → Requirements (numbered, 2×2)
                → How verified (split reverse, image)
   3 个不同 section + 不同 bg，避免重复编辑式布局。
   面向中国制造商；/oem 仍是买家侧 OEM 页面。
   ============================================================ */

const HERO = "asset-34898492"; // factory interior-018
const SPLIT = "asset-6d61b770"; // factory interior-012

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "For Factories", ru: "Заводам", zh: "工厂合作" },
  heroTitle: { en: "Join the HISVIA manufacturing network", ru: "Присоединяйтесь к производственной сети HISVIA", zh: "加入 HISVIA 制造网络" },
  heroDesc: {
    en: "HISVIA brings structured overseas demand to verified Chinese manufacturers — technical requirements, engineering context and export coordination, not price-only RFQs.",
    ru: "HISVIA приводит структурированный зарубежный спрос проверенным китайским производителям: технические требования, инженерный контекст и экспортное сопровождение — а не только запросы о цене.",
    zh: "HISVIA 为经核验的中国制造商带来结构化的海外需求——技术要求、工程背景与出口协调，而不仅是比价询盘。",
  },
  heroCta: { en: "Partner with HISVIA", ru: "Стать партнёром", zh: "申请合作" },
  joinEyebrow: { en: "Why join", ru: "Зачем присоединяться", zh: "为何加入" },
  joinTitle: { en: "Overseas buyer opportunities", ru: "Возможности зарубежных покупателей", zh: "海外买家机会" },
  join1: {
    en: "Structured requirements with product, application and certification context — less back-and-forth, more qualified orders.",
    ru: "Структурированные запросы с контекстом продукта, применения и сертификации — меньше переписки, больше целевых заказов.",
    zh: "带产品、应用与认证上下文的结构化需求——更少来回沟通，更多合格订单。",
  },
  join2: {
    en: "Buyers in Russia, Central Asia, the Middle East and Southeast Asia across 8 industrial systems.",
    ru: "Покупатели из России, Центральной Азии, Ближнего Востока и Юго-Восточной Азии по 8 промышленным системам.",
    zh: "覆盖 8 大工业系统的俄罗斯、中亚、中东与东南亚买家。",
  },
  join3: {
    en: "Your capability is presented with evidence — equipment, certifications and similar products — not a directory listing.",
    ru: "Ваши возможности представлены с доказательствами: оборудование, сертификаты и аналогичная продукция — а не просто строка в каталоге.",
    zh: "以证据展示您的制造能力——设备、认证与同类产品——而非目录里的一行名单。",
  },
  reqEyebrow: { en: "Requirements", ru: "Требования", zh: "合作要求" },
  reqTitle: { en: "What a HISVIA partner factory has", ru: "Что должно быть у завода-партнёра HISVIA", zh: "HISVIA 合作工厂应具备什么" },
  req1: {
    en: "Own factory with real production equipment — no trading companies posing as manufacturers.",
    ru: "Собственный завод с реальным производственным оборудованием — без торговых компаний под видом производителей.",
    zh: "自有工厂与真实生产设备——不接受贸易公司冒充制造商。",
  },
  req2: {
    en: "Stable production and an on-time delivery record.",
    ru: "Стабильное производство и подтверждённая дисциплина сроков поставки.",
    zh: "稳定的生产与按时交付记录。",
  },
  req3: {
    en: "A quality system — ISO 9001 or equivalent — with documented in-process and final inspection.",
    ru: "Система качества — ISO 9001 или аналог — с документированным контролем в процессе и на выходе.",
    zh: "质量体系——ISO 9001 或同等标准——具备文件化的过程与成品检验。",
  },
  req4: {
    en: "Export capability: documentation, export packaging and shipping experience.",
    ru: "Экспортные возможности: документация, экспортная упаковка и опыт отгрузок.",
    zh: "出口能力：单证、出口包装与发运经验。",
  },
  verEyebrow: { en: "How HISVIA verifies you", ru: "Как HISVIA вас проверяет", zh: "HISVIA 如何验证工厂" },
  verTitle: { en: "Verification before any buyer introduction", ru: "Проверка до представления покупателю", zh: "向买家推荐前先验证" },
  verDesc: {
    en: "Factories are verified against the same standards we publish to buyers. Capability, quality system, documentation and export readiness — reviewed on site and with evidence.",
    ru: "Заводы проверяются по тем же стандартам, которые мы публикуем для покупателей: возможности, система качества, документация и экспортная готовность — на месте и с доказательствами.",
    zh: "工厂按我们向买家公开的同一标准验证：能力、质量体系、单证与出口准备——实地审查并附证据。",
  },
  ctaKicker: { en: "Apply", ru: "Заявка", zh: "申请" },
  ctaTitle: { en: "Tell us about your factory", ru: "Расскажите о вашем заводе", zh: "介绍您的工厂" },
  ctaDesc: {
    en: "Send your capability summary, certifications and export history. Our team reviews applications against the published requirements.",
    ru: "Отправьте описание возможностей, сертификаты и экспортную историю. Команда рассмотрит заявку по опубликованным требованиям.",
    zh: "发送您的能力简介、认证与出口记录。团队将按公开要求审核申请。",
  },
  ctaBtn: { en: "Contact the partnership team →", ru: "Связаться с командой партнёрства →", zh: "联系合作团队 →" },
  ctaNote: { en: "Factory applications reviewed in EN / RU / ZH", ru: "Заявки заводов рассматриваются на EN / RU / ZH", zh: "工厂申请支持 EN / RU / ZH 审核" },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

export default function V2ForFactoriesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const v2 = `/v2/${locale}`;

  const sections: InfoSection[] = [
    {
      type: "numbered",
      eyebrow: t("joinEyebrow"),
      title: t("joinTitle"),
      items: [t("join1"), t("join2"), t("join3")],
    },
    {
      type: "numbered",
      eyebrow: t("reqEyebrow"),
      title: t("reqTitle"),
      items: [t("req1"), t("req2"), t("req3"), t("req4")],
      bg: "paperD",
    },
    {
      type: "split",
      eyebrow: t("verEyebrow"),
      title: t("verTitle"),
      desc: t("verDesc"),
      bullets: (factoryTrust.trust_signals.buyer_protections || []).slice(0, 3),
      asset: resolveAsset(SPLIT),
      reverse: true,
    },
  ];

  return (
    <V2InfoPageExperience
      locale={locale}
      heroKicker={t("kicker")}
      heroTitle={t("heroTitle")}
      heroDesc={t("heroDesc")}
      heroAsset={resolveAsset(HERO)}
      heroCta={{ label: t("heroCta"), href: `${v2}/contact` }}
      sections={sections}
      cta={{
        kicker: t("ctaKicker"),
        title: t("ctaTitle"),
        desc: t("ctaDesc"),
        label: t("ctaBtn"),
        href: `${v2}/contact`,
        note: t("ctaNote"),
      }}
    />
  );
}
