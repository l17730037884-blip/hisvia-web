import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/locale";

/** 标题: `${pageName} | ${brand}` (锁定 seo-blueprint.json 模式)。 */
export function pageTitle(locale: Locale, pageName: string): string {
  return `${pageName} | ${BRAND[locale]}`;
}

/** 描述模式: 与 seo-blueprint.json metaDescriptionPattern 一致。 */
export function pageDescription(locale: Locale, pageName: string): string {
  return locale === "ru"
    ? `${pageName} — официальная информация ООО «Планетарная Инженерия» (прецизионные редукторы AGV).`
    : `${pageName} — official information from Planetary Engineering Co., Ltd. (AGV precision reducers).`;
}

export function canonicalUrl(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${clean === "/" ? "" : clean}`;
}

/** hreflang: ru/en + x-default → /ru（默认语言已改为俄语）。 */
export function languageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: canonicalUrl(locale, path),
    languages: {
      ru: canonicalUrl("ru", path),
      en: canonicalUrl("en", path),
      "x-default": canonicalUrl("ru", path),
    },
  };
}
