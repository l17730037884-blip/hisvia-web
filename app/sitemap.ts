import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { locales } from "@/lib/locales";
import { routes } from "@/lib/routes";
import { brands } from "@/lib/brands";
import { industries } from "@/lib/industries";
import { cases } from "@/lib/cases";

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
  // Phase 2 new routes
  routes.brands,
  routes.industries,
  routes.manufacturingNetwork,
  routes.cases,
  routes.request,
];

// Dynamic brand pages
const brandRoutes = brands.map((b) => `/brands/${b.slug}`);
// Dynamic industry pages
const industryRoutes = industries.map((i) => `/industries/${i.slug}`);
// Dynamic case pages
const caseRoutes = cases.map((c) => `/cases/${c.slug}`);

const allRoutes = [...subRoutes, ...brandRoutes, ...industryRoutes, ...caseRoutes];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    });
  });

  allRoutes.forEach((route) => {
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
