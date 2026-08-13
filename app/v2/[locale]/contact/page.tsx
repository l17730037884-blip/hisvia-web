import type { Locale } from "@/lib/locales";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import V2InfoPageExperience from "@/components/v2/V2InfoPageExperience";
import type { InfoSection } from "@/components/v2/V2InfoPageExperience";

/* ============================================================
   /v2/[locale]/contact
   Composition: Business paths (links) → Response (statement)
   不同 section 类型，避免重复编辑式布局。每条路径落到真实页面。
   ============================================================ */

const T: Record<string, { en: string; ru: string; zh: string }> = {
  kicker: { en: "Contact", ru: "Контакты", zh: "联系我们" },
  heroTitle: { en: "One entry, the right team", ru: "Один вход — нужная команда", zh: "一个入口，对接到正确的团队" },
  heroDesc: {
    en: "Buyers, factories and partners reach HISVIA through the channels below. Each path is answered by the team that owns it.",
    ru: "Покупатели, заводы и партнёры связываются с HISVIA через каналы ниже. На каждый путь отвечает профильная команда.",
    zh: "买家、工厂与合作伙伴可通过以下渠道联系 HISVIA，每条路径由对应团队答复。",
  },
  heroCta: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" },
  bizEyebrow: { en: "Business inquiry", ru: "Деловой запрос", zh: "业务咨询" },
  bizTitle: { en: "Choose your path", ru: "Выберите путь", zh: "选择您的路径" },
  bizDesc: {
    en: "Start with the channel that matches your goal — every request lands with the responsible team.",
    ru: "Начните с канала, соответствующего вашей цели, — каждый запрос попадает к ответственной команде.",
    zh: "从与您的目标匹配的渠道开始——每个请求都会到达负责团队。",
  },
  l1: { en: "Submit a sourcing request", ru: "Отправить запрос на закупку", zh: "提交采购需求" },
  l1n: {
    en: "For buyers — describe the part, quantity and certification needs. You get a structured sourcing path in EN / RU / ZH.",
    ru: "Для покупателей — опишите деталь, количество и требования к сертификации. Вы получите структурированный путь закупки на EN / RU / ZH.",
    zh: "买家适用——描述零件、数量与认证要求，您将收到 EN / RU / ZH 的结构化采购路径。",
  },
  l2: { en: "Factory partnership", ru: "Партнёрство для заводов", zh: "工厂合作" },
  l2n: {
    en: "For manufacturers — send capability summary, certifications and export history. Reviewed against published requirements.",
    ru: "Для производителей — отправьте описание возможностей, сертификаты и экспортную историю. Заявка рассматривается по опубликованным требованиям.",
    zh: "制造商适用——发送能力简介、认证与出口记录，按公开要求审核。",
  },
  l3: { en: "OEM & IP protection", ru: "OEM и защита интеллектуальной собственности", zh: "OEM 与知识产权保护" },
  l3n: {
    en: "How HISVIA protects drawings, specifications and confidentiality in OEM manufacturing.",
    ru: "Как HISVIA защищает чертежи, спецификации и конфиденциальность при OEM-производстве.",
    zh: "HISVIA 如何在 OEM 生产中保护图纸、规格与机密信息。",
  },
  l4: { en: "Verification & quality", ru: "Проверка и качество", zh: "验证与质量" },
  l4n: {
    en: "The published verification standards for the whole manufacturing network.",
    ru: "Опубликованные стандарты проверки для всей производственной сети.",
    zh: "整个制造网络公开的验证标准。",
  },
  respEyebrow: { en: "Response", ru: "Ответ", zh: "答复" },
  respTitle: { en: "What happens after you write to us", ru: "Что происходит после обращения", zh: "联系我们之后会发生什么" },
  resp1: {
    en: "Requests are reviewed by the sourcing team — not by a chatbot.",
    ru: "Запросы рассматривает команда по закупкам — не чат-бот.",
    zh: "需求由采购团队审核——不是聊天机器人。",
  },
  resp2: {
    en: "We respond with a structured sourcing path or clarification questions.",
    ru: "Мы отвечаем структурированным путём закупки или уточняющими вопросами.",
    zh: "我们回复结构化采购路径或澄清问题。",
  },
  resp3: {
    en: "Free · No obligation · Verified suppliers · EN / RU / ZH.",
    ru: "Бесплатно · Без обязательств · Проверенные поставщики · EN / RU / ZH.",
    zh: "免费 · 无义务 · 验证供应商 · EN / RU / ZH。",
  },
  ctaKicker: { en: "Start here", ru: "Начните здесь", zh: "从这里开始" },
  ctaTitle: { en: "Start your sourcing request", ru: "Начните запрос на закупку", zh: "开始您的采购请求" },
  ctaDesc: {
    en: "The request form is the fastest channel to a verified factory shortlist.",
    ru: "Форма запроса — самый быстрый путь к шорт-листу проверенных заводов.",
    zh: "需求表单是获得验证工厂短名单的最快渠道。",
  },
  ctaBtn: { en: "Submit a Request →", ru: "Отправить запрос →", zh: "提交需求 →" },
  ctaNote: { en: "Free · No obligation · Verified suppliers · EN / RU / ZH", ru: "Бесплатно · Без обязательств · Проверенные поставщики · EN / RU / ZH", zh: "免费 · 无义务 · 验证供应商 · EN / RU / ZH" },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

export default function V2ContactPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = (k: string) => T[k]?.[locale] ?? T[k]?.en ?? k;
  const v2 = `/v2/${locale}`;

  const sections: InfoSection[] = [
    {
      type: "links",
      eyebrow: t("bizEyebrow"),
      title: t("bizTitle"),
      desc: t("bizDesc"),
      links: [
        { label: t("l1"), href: `${v2}/request`, note: t("l1n") },
        { label: t("l2"), href: `${v2}/for-factories`, note: t("l2n") },
        { label: t("l3"), href: `${v2}/oem`, note: t("l3n") },
        { label: t("l4"), href: `${v2}/verification`, note: t("l4n") },
      ],
    },
    {
      type: "statement",
      eyebrow: t("respEyebrow"),
      title: t("respTitle"),
      items: [t("resp1"), t("resp2"), t("resp3")],
      bg: "paperD",
    },
  ];

  return (
    <V2InfoPageExperience
      locale={locale}
      heroKicker={t("kicker")}
      heroTitle={t("heroTitle")}
      heroDesc={t("heroDesc")}
      heroCta={{ label: t("heroCta"), href: `${v2}/request` }}
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
