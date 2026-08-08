import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { locales } from "@/lib/locales";
import { routes } from "@/lib/routes";
import { brands } from "@/lib/brands";
import { industries } from "@/lib/industries";
import { cases } from "@/lib/cases";
import { partCategories } from "@/lib/parts";
import { applications } from "@/lib/applications";

const subRoutes: string[] = [
  routes.about, routes.partnershipModel, routes.howWeWork,
  routes.qualityControl, routes.manufacturingCapability, routes.manufacturingNetwork,
  routes.compatibleSolutions, routes.supplyChainNetwork,
  routes.faq, routes.contact, routes.submitRequirement,
  routes.solutions.compressors, routes.solutions.compressorParts,
  routes.solutions.pumps, routes.solutions.hydraulics,
  routes.solutions.valves, routes.solutions.automation,
  routes.solutions.mechanical, routes.solutions.consumables,
  routes.partners.serviceCenters, routes.partners.distributors,
  routes.partners.regionalPartners,
  routes.brands, routes.parts, routes.industries, routes.applications,
  routes.cases, routes.request,
];

const brandRoutes = brands.map((b) => `/brands/${b.slug}`);
const partRoutes = partCategories.map((c) => `/parts/${c.slug}`);
const industryRoutes = industries.map((i) => `/industries/${i.slug}`);
const appRoutes = applications.map((a) => `/applications/${a.slug}`);
const caseRoutes = cases.map((c) => `/cases/${c.slug}`);

const allRoutes = [...subRoutes, ...brandRoutes, ...partRoutes, ...industryRoutes, ...appRoutes, ...caseRoutes];

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
