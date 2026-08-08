import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { locales } from "@/lib/locales";
import { routes } from "@/lib/routes";

// 所有子页面路由（不含首页，首页单独处理）
const subRoutes: string[] = [
  routes.about,
  routes.partnershipModel,
  routes.howWeWork,
  routes.qualityControl,
  routes.manufacturingCapability,
  routes.compatibleSolutions,
  routes.supplyChainNetwork,
  routes.faq,
  routes.contact,
  routes.submitRequirement,
  routes.solutions.compressors,
  routes.solutions.compressorParts,
  routes.solutions.pumps,
  routes.solutions.hydraulics,
  routes.solutions.valves,
  routes.solutions.automation,
  routes.solutions.mechanical,
  routes.solutions.consumables,
  routes.partners.serviceCenters,
  routes.partners.distributors,
  routes.partners.regionalPartners,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // 各语言首页（最高优先级）
  locales.forEach((locale) => {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    });
  });

  // 各语言子页面
  subRoutes.forEach((route) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  return entries;
}
