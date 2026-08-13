import { notFound } from "next/navigation";
import type { Locale } from "@/lib/locales";
import { getIndustryPages, getCapabilities } from "@/lib/content-v2/content-loader";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import factoryTrust from "@/data/content-v2/factory-trust.json";
import V2IndustriesExperience from "@/components/v2/V2IndustriesExperience";

/* ============================================================
   /v2/[locale]/industries/[slug] — premium industry page (Phase 16)

   Deterministic asset mapping: no asset-legacy, no brand
   machines, no repeated factory imagery across industries.
   ============================================================ */

const HERO_BY_INDUSTRY: Record<string, string> = {
  mining: "asset-001ac56b",
  "oil-gas": "asset-4e27eb29",
  manufacturing: "asset-168d3d4b",
  construction: "asset-2ab9f600",
  "water-treatment": "asset-0eab6868",
};

const CHALLENGE_BY_INDUSTRY: Record<string, string> = {
  mining: "asset-8c67285d",
  "oil-gas": "asset-d6cf3a86",
  manufacturing: "asset-fe73fcf5",
  construction: "asset-b1480bad",
  "water-treatment": "asset-594f98db",
};

const EVIDENCE_BY_INDUSTRY: Record<string, string> = {
  mining: "asset-61c7fb6a",
  "oil-gas": "asset-bffdca5e",
  manufacturing: "asset-efa33112",
  construction: "asset-b3188b36",
  "water-treatment": "asset-b3fe41a2",
};

const SOLUTION_ROUTES: Record<string, string> = {
  "Air Compressor Systems": "/solutions/compressors",
  "Hydraulic Systems": "/solutions/hydraulic",
  "Pumps & Fluid Handling": "/solutions/pumps",
  "Valves & Flow Control": "/solutions/valves",
  "Industrial Filtration": "/solutions/filtration",
  "Pneumatic Automation": "/solutions/automation",
  "Mechanical Transmission": "/solutions/mechanical-transmission",
  "Industrial Automation & Control": "/solutions/automation-control",
};

export default function V2IndustryPage({ params }: { params: { locale: Locale; slug: string } }) {
  const industry = getIndustryPages().find((i) => i.id === params.slug || i.route.endsWith(`/${params.slug}`));
  if (!industry) return notFound();

  const heroAsset = resolveAsset(HERO_BY_INDUSTRY[industry.id]);
  const challengeAsset = resolveAsset(CHALLENGE_BY_INDUSTRY[industry.id]);
  const evidenceAsset = resolveAsset(EVIDENCE_BY_INDUSTRY[industry.id]);

  const solutionLinks = industry.relevant_systems
    .map((sys) => {
      const route = SOLUTION_ROUTES[sys];
      return route ? { label: sys, href: `/v2/${params.locale}${route}` } : null;
    })
    .filter(Boolean) as Array<{ label: string; href: string }>;

  const capabilities = getCapabilities().map((c) => ({ name: c.name, description: c.description }));

  return (
    <V2IndustriesExperience
      locale={params.locale}
      industry={industry}
      heroAsset={heroAsset}
      challengeAsset={challengeAsset}
      evidenceAsset={evidenceAsset}
      qualitySystems={factoryTrust.trust_signals.quality_systems}
      exportCapability={factoryTrust.trust_signals.export_capability}
      regions={factoryTrust.manufacturing_network.regions}
      solutionLinks={solutionLinks}
      capabilities={capabilities}
    />
  );
}
