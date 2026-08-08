// 顺序即优先级：俄语为第一语言，英语第二，中文仅作内部校验
export const locales = ["ru", "en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeLabel: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  zh: "ZH",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
