const DEFAULT_SITE_URL = "https://www.hisvia.com";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? DEFAULT_SITE_URL;
  if (!raw) return DEFAULT_SITE_URL;
  try {
    const normalized = raw.startsWith("http") ? raw : `https://${raw.replace(/^\/+/, "")}`;
    const u = new URL(normalized);
    if (u.protocol !== "https:" && u.protocol !== "http:") return DEFAULT_SITE_URL;
    if (!u.hostname || u.hostname.includes(" ") || u.hostname === "[sensitive]") return DEFAULT_SITE_URL;
    return u.origin.replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

export const BRAND: Record<"ru" | "en", string> = {
  en: "Planetary Engineering Co., Ltd.",
  ru: "ООО «Планетарная Инженерия»",
};
