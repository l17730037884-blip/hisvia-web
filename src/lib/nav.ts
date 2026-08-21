import navJson from "@/data/nav.generated.json";
import type { Locale } from "@/lib/locale";

export type NavItem = { key: string; cn: string; en: string; ru: string };
export type NavPage = {
  pageId: string;
  route: string;
  name: string;
  status: string;
  assetIds: string[];
};

type NavFile = { nav: NavItem[]; pages: NavPage[] };

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

export function getNavItems(locale: Locale): { key: string; label: string; href: string }[] {
  return NAV.map((item) => ({
    key: item.key,
    label: locale === "ru" ? item.ru : item.en,
    href: `/${locale}${ROUTES[item.key] ?? ""}`,
  }));
}

export function getNavPages(): NavPage[] {
  return PAGES;
}
