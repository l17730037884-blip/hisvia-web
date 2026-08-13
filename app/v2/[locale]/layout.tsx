import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/locales";
import V2HeaderSimple from "@/components/v2/V2HeaderSimple";
import V2FooterSimple from "@/components/v2/V2FooterSimple";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

const META: Record<Locale, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "HISVIA — China Industrial Supply Chain Partner | Industrial Sourcing",
    description:
      "Describe the industrial part you need. HISVIA structures your requirement, maps Chinese manufacturing capabilities, shows factory evidence, and connects you with verified Chinese manufacturers for sourcing and OEM.",
    ogTitle: "HISVIA — China Industrial Supply Chain Partner",
    ogDesc: "Requirement → Capability → Evidence → Factory → Sourcing. Enter China's industrial supply chain with a structured sourcing request.",
  },
  ru: {
    title: "HISVIA — промышленный партнёр по цепочкам поставок Китая",
    description:
      "Опишите нужную деталь. HISVIA структурирует запрос, определяет производственные возможности Китая, показывает доказательства и связывает с проверенными китайскими производителями.",
    ogTitle: "HISVIA — промышленный партнёр по цепочкам поставок Китая",
    ogDesc: "Запрос → Возможности → Доказательства → Завод → Закупка.",
  },
  zh: {
    title: "HISVIA — 中国工业供应链合作伙伴",
    description:
      "描述您需要的工业零件。HISVIA 结构化理解需求、匹配中国制造能力、展示工厂证据，并为您对接经核验的中国制造商进行采购与 OEM。",
    ogTitle: "HISVIA — 中国工业供应链合作伙伴",
    ogDesc: "需求 → 能力 → 证据 → 工厂 → 采购。从这里进入中国工业供应链。",
  },
};

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const m = META[locale];
  const url = `https://hisvia.com/v2/${locale}`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        en: "https://hisvia.com/v2/en",
        ru: "https://hisvia.com/v2/ru",
        zh: "https://hisvia.com/v2/zh",
        "x-default": "https://hisvia.com/v2/en",
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : locale === "zh" ? "zh_CN" : "en_US",
      siteName: "HISVIA",
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDesc,
    },
  };
}

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HISVIA",
  alternateName: "HISVIA Industrial Supply Chain Partner",
  description: "Industrial sourcing platform connecting global buyers with verified Chinese manufacturers.",
  url: "https://hisvia.com",
};

export default function V2Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  // Mirrors the project's existing locale architecture (see app/[locale]/layout.tsx):
  // a segment-level <html lang={locale}> carries the per-locale language attribute.
  return (
    <html lang={locale}>
      <body>
        <div className="min-h-screen bg-white flex flex-col">
          <V2HeaderSimple locale={locale} />
          <main className="flex-1">{children}</main>
          <V2FooterSimple locale={locale} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
        </div>
      </body>
    </html>
  );
}
