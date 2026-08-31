import type { Locale } from "@/lib/locale";

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

/** 各语言下的品牌法人名(本地 B2B 语境,法人实体名保留当地形态)。 */
export const BRAND: Record<Locale, string> = {
  "zh-CN": "蚌埠市行星工程机械有限公司",
  en: "Planetary Engineering Co., Ltd.",
  ru: "ООО «Планетарная Инженерия»",
  tr: "Planetary Mühendislik A.Ş.",
  es: "Planetary Engineering S.L.",
  ar: "شركة بلانيتاري للهندسة ذ.م.م.",
  de: "Planetary Engineering GmbH",
  fr: "Planetary Engineering S.A.R.L.",
  pl: "Planetary Engineering Sp. z o.o.",
};
