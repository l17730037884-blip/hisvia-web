export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bengbu-planetary.example"
).replace(/\/+$/, "");

export const BRAND: Record<"ru" | "en", string> = {
  en: "Bengbu Planetary Engineering Machinery Co., Ltd.",
  ru: "Бэнбу Планетарное Машиностроительное Предприятие",
};
