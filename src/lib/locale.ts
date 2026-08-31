/**
 * Locale 类型与工具函数。
 *
 * 支持的 9 种语言:
 *   zh-CN — 中文(简体)
 *   en    — English
 *   ru    — Русский
 *   tr    — Türkçe
 *   es    — Español
 *   ar    — العربية(RTL)
 *   de    — Deutsch
 *   fr    — Français
 *   pl    — Polski
 *
 * 默认语言 ru(与历史部署一致,首页 "/" → "/ru")。
 */
export type Locale =
  | "zh-CN"
  | "en"
  | "ru"
  | "tr"
  | "es"
  | "ar"
  | "de"
  | "fr"
  | "pl";

export const LOCALES: Locale[] = [
  "zh-CN",
  "en",
  "ru",
  "tr",
  "es",
  "ar",
  "de",
  "fr",
  "pl",
];

export const DEFAULT_LOCALE: Locale = "ru";

/** locale → 大写前缀(用于 contentId 命名,如 "RU-P01-H01"、"ZH-CN-P01-H01")。 */
const PREFIX_MAP: Record<Locale, string> = {
  "zh-CN": "ZH-CN",
  en: "EN",
  ru: "RU",
  tr: "TR",
  es: "ES",
  ar: "AR",
  de: "DE",
  fr: "FR",
  pl: "PL",
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value) && (LOCALES as string[]).includes(value as string);
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function prefix(locale: Locale): string {
  return PREFIX_MAP[locale];
}

/** RTL 语言集合(目前只有阿拉伯语)。 */
const RTL_LOCALES: ReadonlySet<Locale> = new Set<Locale>(["ar"]);

/** 判断 locale 是否需要 RTL(从右到左)布局。 */
export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.has(locale);
}

/** 返回 html dir 属性值("ltr" 或 "rtl")。 */
export function htmlDir(locale: Locale): "ltr" | "rtl" {
  return isRTL(locale) ? "rtl" : "ltr";
}

/** locale → BCP 47 语言标签(用于 <html lang> 与 OG locale)。 */
const HTML_LANG_MAP: Record<Locale, string> = {
  "zh-CN": "zh-CN",
  en: "en",
  ru: "ru",
  tr: "tr",
  es: "es",
  ar: "ar",
  de: "de",
  fr: "fr",
  pl: "pl",
};

export function htmlLang(locale: Locale): string {
  return HTML_LANG_MAP[locale];
}

/** locale → OG/social metadata 用的语言区域(如 "ru_RU"、"en_US")。 */
const OG_LOCALE_MAP: Record<Locale, string> = {
  "zh-CN": "zh_CN",
  en: "en_US",
  ru: "ru_RU",
  tr: "tr_TR",
  es: "es_ES",
  ar: "ar_AE",
  de: "de_DE",
  fr: "fr_FR",
  pl: "pl_PL",
};

export function ogLocale(locale: Locale): string {
  return OG_LOCALE_MAP[locale];
}
