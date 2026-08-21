export type Locale = "ru" | "en";

export const LOCALES: Locale[] = ["ru", "en"];

export const DEFAULT_LOCALE: Locale = "ru";

export function isLocale(value: string | undefined): value is Locale {
  return value === "ru" || value === "en";
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function prefix(locale: Locale): string {
  return locale === "ru" ? "RU" : "EN";
}
