import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [];
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/products", priority: 0.8 },
    { path: "/products/planetary-reducer", priority: 0.7 },
    { path: "/technology", priority: 0.6 },
    { path: "/certifications", priority: 0.6 },
    { path: "/applications", priority: 0.5 },
    { path: "/customization", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];
  for (const locale of LOCALES) {
    for (const { path, priority } of staticPaths) {
      pages.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority,
      });
    }
  }
  return pages;
}
