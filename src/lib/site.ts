export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hisvia.com"
).replace(/\/+$/, "");

export const BRAND: Record<"ru" | "en", string> = {
  en: "Planetary Engineering Co., Ltd.",
  ru: "ООО «Планетарная Инженерия»",
};
