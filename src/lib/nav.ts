import navJson from "@/data/nav.generated.json";
import type { Locale } from "@/lib/locale";

type RawNavItem = {
  key: string;
  cn: string; // 老字段(中文原文,等同 zh-CN)
  en: string;
  ru: string;
  "zh-CN"?: string;
  tr?: string;
  es?: string;
  ar?: string;
  de?: string;
  fr?: string;
  pl?: string;
};

export type NavItem = { key: string; cn: string; en: string; ru: string };
export type NavPage = {
  pageId: string;
  route: string;
  name: string;
  status: string;
  assetIds: string[];
};

type NavFile = { nav: RawNavItem[]; pages: NavPage[] };

const NAV = (navJson as NavFile).nav;
const PAGES = (navJson as NavFile).pages;

/** nav key → 站点路径(不含语言前缀)。 */
const ROUTES: Record<string, string> = {
  nav_home: "/",
  nav_about: "/about",
  nav_products: "/products",
  nav_technology: "/technology",
  nav_certifications: "/certifications",
  nav_applications: "/applications",
  nav_customization: "/customization",
  nav_contact: "/contact",
};

/** 按 locale 查找 nav 项 label:
 *  优先显式 locale 字段(如 item.tr / item.es);
 *  zh-CN fallback 到老 cn 字段;
 *  最终 fallback 到 en(永不空)。 */
function labelOf(item: RawNavItem, locale: Locale): string {
  const direct = (item as Record<string, string | undefined>)[locale];
  if (direct) return direct;
  if (locale === "zh-CN") return item.cn || item.en;
  return item.en;
}

export function getNavItems(locale: Locale): { key: string; label: string; href: string }[] {
  return NAV.map((item) => ({
    key: item.key,
    label: labelOf(item, locale),
    href: `/${locale}${ROUTES[item.key] ?? ""}`,
  }));
}

export function getNavPages(): NavPage[] {
  return PAGES;
}
