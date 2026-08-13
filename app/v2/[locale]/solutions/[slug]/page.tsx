import { notFound } from "next/navigation";
import type { Locale } from "@/lib/locales";
import { getSystemPageByRoute, getAllSystemSlugs, getCapabilities, getIndustryPages } from "@/lib/content-v2/content-loader";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import factoryTrust from "@/data/content-v2/factory-trust.json";
import V2SolutionsExperience from "@/components/v2/V2SolutionsExperience";
import SolutionsCompressorsV3 from "@/components/v3-pages/solutions-compressors-v3";
import SolutionsHydraulicV3 from "@/components/v3-pages/solutions-hydraulic-v3";
import SolutionsPumpsV3 from "@/components/v3-pages/solutions-pumps-v3";
import SolutionsValvesV3 from "@/components/v3-pages/solutions-valves-v3";
import SolutionsFiltrationV3 from "@/components/v3-pages/solutions-filtration-v3";
import SolutionsAutomationV3 from "@/components/v3-pages/solutions-automation-v3";
import SolutionsMechanicalTransmissionV3 from "@/components/v3-pages/solutions-mechanical-transmission-v3";
import SolutionsAutomationControlV3 from "@/components/v3-pages/solutions-automation-control-v3";

/* ============================================================
   /v2/[locale]/solutions/[slug] — premium system page (Phase 16)

   Deterministic asset mapping: no asset-legacy, no brand
   machines, no repeated factory imagery across systems.
   ============================================================ */

const HERO_BY_SYSTEM: Record<string, string> = {
  "Air Compressor Systems": "asset-d5851861",
  "Hydraulic Systems": "asset-25d04982",
  "Pumps & Fluid Handling": "asset-74235ce1",
  "Valves & Flow Control": "asset-1ebf3f69",
  "Industrial Filtration": "asset-f374417e",
  "Pneumatic Automation": "asset-8f49bdc0",
  "Mechanical Transmission": "asset-68a3b048",
  "Industrial Automation & Control": "asset-cdedf3f7",
};

const CAP_IMAGES_BY_SYSTEM: Record<string, string> = {
  "Air Compressor Systems": "asset-3a31624e",
  "Hydraulic Systems": "asset-c6af8e1a",
  "Pumps & Fluid Handling": "asset-2665de88",
  "Valves & Flow Control": "asset-89ce62c8",
  "Industrial Filtration": "asset-4a71b054",
  "Pneumatic Automation": "asset-aae60e67",
  "Mechanical Transmission": "asset-2d750c23",
  "Industrial Automation & Control": "asset-088bd61e",
};

const VERIFY_BY_SYSTEM: Record<string, string> = {
  "Air Compressor Systems": "asset-b493dcab",
  "Hydraulic Systems": "asset-1f615d88",
  "Pumps & Fluid Handling": "asset-bcf7cf58",
  "Valves & Flow Control": "asset-d1bdbaa9",
  "Industrial Filtration": "asset-5767ab83",
  "Pneumatic Automation": "asset-d83d5def",
  "Mechanical Transmission": "asset-47f4ff1d",
  "Industrial Automation & Control": "asset-7cf5509e",
};

const ROUTE_BY_SYSTEM: Record<string, string[]> = {
  "Air Compressor Systems": ["cnc_machining", "casting_forging", "assembly_testing"],
  "Hydraulic Systems": ["cnc_machining", "casting_forging", "surface_treatment"],
  "Pumps & Fluid Handling": ["casting_forging", "cnc_machining", "quality_control"],
  "Valves & Flow Control": ["casting_forging", "cnc_machining", "surface_treatment"],
  "Industrial Filtration": ["cnc_machining", "surface_treatment", "quality_control"],
  "Pneumatic Automation": ["cnc_machining", "assembly_testing", "surface_treatment"],
  "Mechanical Transmission": ["cnc_machining", "casting_forging", "quality_control"],
  "Industrial Automation & Control": ["cnc_machining", "assembly_testing", "quality_control"],
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }, { locale: "ru" }].flatMap(({ locale }) =>
    getAllSystemSlugs().map(({ slug }) => ({ locale, slug }))
  );
}

export default function V2SystemPage({ params }: { params: { locale: Locale; slug: string } }) {
  const route = `/solutions/${params.slug}`;
  const systemPage = getSystemPageByRoute(route);
  if (!systemPage) return notFound();

  // Phase V3 migration batches: compressors (1) + hydraulic (2) + pumps/valves (3) + filtration/automation/mechanical-transmission/automation-control (4)
  // render V3. All other systems keep V2SolutionsExperience untouched.
  if (params.slug === "compressors") {
    return <SolutionsCompressorsV3 locale={params.locale} />;
  }
  if (params.slug === "hydraulic") {
    return <SolutionsHydraulicV3 locale={params.locale} />;
  }
  if (params.slug === "pumps") {
    return <SolutionsPumpsV3 locale={params.locale} />;
  }
  if (params.slug === "valves") {
    return <SolutionsValvesV3 locale={params.locale} />;
  }
  if (params.slug === "filtration") {
    return <SolutionsFiltrationV3 locale={params.locale} />;
  }
  if (params.slug === "automation") {
    return <SolutionsAutomationV3 locale={params.locale} />;
  }
  if (params.slug === "mechanical-transmission") {
    return <SolutionsMechanicalTransmissionV3 locale={params.locale} />;
  }
  if (params.slug === "automation-control") {
    return <SolutionsAutomationControlV3 locale={params.locale} />;
  }

  const heroAsset = resolveAsset(HERO_BY_SYSTEM[systemPage.system_type]);
  const verifyAsset = resolveAsset(VERIFY_BY_SYSTEM[systemPage.system_type]);
  const routeIds = ROUTE_BY_SYSTEM[systemPage.system_type] || [];
  const routeCapabilities = getCapabilities().filter((c) => routeIds.includes(c.id));
  const capImageId = CAP_IMAGES_BY_SYSTEM[systemPage.system_type];
  const capAssets = Object.fromEntries(
    routeCapabilities.map((c) => [c.id, resolveAsset(capImageId)])
  );

  return (
    <V2SolutionsExperience
      locale={params.locale}
      page={systemPage}
      capabilities={getCapabilities()}
      industries={getIndustryPages().map((i) => ({ id: i.id, title: i.title }))}
      heroAsset={heroAsset}
      capAssets={capAssets}
      verifyAsset={verifyAsset}
      qualitySystems={factoryTrust.trust_signals.quality_systems}
      exportCapability={factoryTrust.trust_signals.export_capability}
      regions={factoryTrust.manufacturing_network.regions}
      routeCapabilities={routeCapabilities}
    />
  );
}
