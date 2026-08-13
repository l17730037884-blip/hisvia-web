import type { Locale } from "@/lib/locales";
import { getCapabilityPage } from "@/lib/content-v2/content-loader";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import factoryTrust from "@/data/content-v2/factory-trust.json";
import V2CapabilityExperience from "@/components/v2/V2CapabilityExperience";

/* ============================================================
   /v2/[locale]/capability-network — premium capability showcase
   center (Phase 16). No asset-legacy, no brand machines, no
   repeated factory imagery.
   ============================================================ */

const HERO = "asset-3e6d4bdc"; // interior-035 — capability at scale, quality 94

const CAP_IMAGES: Record<string, string> = {
  cnc_machining: "asset-c3096c22",
  casting_forging: "asset-647a46db",
  assembly_testing: "asset-6970a009",
  surface_treatment: "asset-b4a0ed1e",
  oem_customization: "asset-adf54709",
  quality_control: "asset-34dd3644",
  export_logistics: "asset-f0a855b0",
  reverse_engineering: "asset-ce82e729",
};

const GALLERY_IMAGES = [
  "asset-fedb1a7f",
  "asset-4063867b",
  "asset-6d61b770",
  "asset-34898492",
  "asset-f1127f84",
  "asset-3d283734",
];

const REGION_IMAGES: Record<string, string> = {
  Zhejiang: "asset-d7c25888",
  Guangdong: "asset-bdaa0de2",
  "Shanghai / Jiangsu": "asset-aa3bc26f",
};

export default function V2CapabilityPage({ params }: { params: { locale: Locale } }) {
  const page = getCapabilityPage();

  const capAssets = Object.fromEntries(
    Object.entries(CAP_IMAGES).map(([id, assetId]) => [id, resolveAsset(assetId)])
  );
  const galleryAssets = GALLERY_IMAGES.map(resolveAsset).filter(Boolean) as NonNullable<ReturnType<typeof resolveAsset>>[];
  const regionAssets = Object.fromEntries(
    Object.entries(REGION_IMAGES).map(([region, assetId]) => [region, resolveAsset(assetId)])
  );

  return (
    <V2CapabilityExperience
      locale={params.locale}
      title={page.page.title}
      positioning={page.page.positioning}
      heroAsset={resolveAsset(HERO)}
      capabilities={page.page.capabilities}
      capAssets={capAssets}
      galleryAssets={galleryAssets}
      regionAssets={regionAssets}
      regions={factoryTrust.manufacturing_network.regions}
      qualitySystems={factoryTrust.trust_signals.quality_systems}
      exportCapability={factoryTrust.trust_signals.export_capability}
    />
  );
}
