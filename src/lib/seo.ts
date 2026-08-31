import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/locale";
import { LOCALES } from "@/lib/locale";

/** 标题: `${pageName} | ${brand}` (锁定 seo-blueprint.json 模式)。 */
export function pageTitle(locale: Locale, pageName: string): string {
  return `${pageName} | ${BRAND[locale]}`;
}

/** 9 种语言的 meta description 模式:
 *  与 seo-blueprint.json metaDescriptionPattern 一致,但每语言独立工业 B2B 语境文案,
 *  禁止简单复制英文 SEO 文案到其他语言。 */
const DESCRIPTION_TEMPLATES: Record<Locale, (pageName: string) => string> = {
  "zh-CN": (n) => `${n} — 蚌埠市行星工程机械有限公司官方信息(AGV 精密减速机/行星减速器专业制造商)。`,
  en: (n) => `${n} — official information from Planetary Engineering Co., Ltd. (AGV precision reducers).`,
  ru: (n) => `${n} — официальная информация ООО «Планетарная Инженерия» (прецизионные редукторы AGV).`,
  tr: (n) => `${n} — Planetary Mühendislik A.Ş. resmî bilgisi (AGV hassas redüktörler).`,
  es: (n) => `${n} — información oficial de Planetary Engineering S.L. (reductores de precisión AGV).`,
  ar: (n) => `${n} — معلومات رسمية من شركة بلانيتاري للهندسة (مخفضات AGV عالية الدقة).`,
  de: (n) => `${n} — offizielle Informationen der Planetary Engineering GmbH (AGV-Präzisionsgetriebe).`,
  fr: (n) => `${n} — informations officielles de Planetary Engineering S.A.R.L. (réducteurs de précision AGV).`,
  pl: (n) => `${n} — informacje oficjalne firmy Planetary Engineering Sp. z o.o. (reduktory precyzyjne AGV).`,
};

export function pageDescription(locale: Locale, pageName: string): string {
  return DESCRIPTION_TEMPLATES[locale](pageName);
}

export function canonicalUrl(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${clean === "/" ? "" : clean}`;
}

/** hreflang: 全部 9 种 locale + x-default → /ru(默认语言俄语,与历史部署一致)。 */
export function languageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = canonicalUrl(l, path);
  }
  languages["x-default"] = canonicalUrl("ru", path);
  return {
    canonical: canonicalUrl(locale, path),
    languages,
  };
}
