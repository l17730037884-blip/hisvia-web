import type { Locale } from "@/lib/locales";
import { resolveAsset } from "@/lib/content-v2/asset-library";
import oemData from "@/data/content-v2/oem-protection.json";
import V2OemExperience from "@/components/v2/V2OemExperience";

/* ============================================================
   /v2/[locale]/oem — Engineering Journey (主指令 §13)

   不再使用 EditorialHero。专属结构：
   Drawing → Prototype → Sampling → Production → Inspection → Evidence

   资产全部来自 _factory 组（industrial_scene / trust_evidence），
   无随机选择，无 brand machine，无 _docx。
   ============================================================ */

const HERO = "asset-4063867b"; // factory-interior-008 — production line at scale

// Engineering Journey stages — each stage has a curated real photo
const JOURNEY_ASSETS: Record<string, string> = {
  drawing: "asset-f1127f84",       // factory-interior-020 — engineering / CNC setup
  prototype: "asset-3d283734",     // factory-interior-032 — first article / assembly
  sampling: "asset-6970a009",      // factory-interior-005 — sampling / measurement
  production: "asset-b3188b36",    // factory-interior-034 — bulk production
  inspection: "asset-efa33112",    // factory-interior-033 — inspection / quality
};

const EVIDENCE_GALLERY = [
  "asset-2d750c23",   // factory-interior-044 — inspection detail
  "asset-088bd61e",   // factory-interior-030 — export / warehouse
  "asset-c3096c22",   // factory-interior-001 — CNC machining
  "asset-647a46db",   // factory-interior-003 — casting / forging
  "asset-6d61b770",   // factory-interior-007 — assembly line
  "asset-34898492",   // factory-interior-009 — quality lab
];

export default function V2OemPage({ params }: { params: { locale: Locale } }) {
  const resolve = (id?: string) => (id ? resolveAsset(id) : null);

  const journeyAssets = Object.fromEntries(
    Object.entries(JOURNEY_ASSETS).map(([k, id]) => [k, resolve(id)])
  );
  const evidenceAssets = EVIDENCE_GALLERY.map(resolve).filter(Boolean) as NonNullable<
    ReturnType<typeof resolve>
  >[];

  return (
    <V2OemExperience
      locale={params.locale}
      title={oemData.page.title}
      positioning={oemData.page.positioning}
      ipTitle={oemData.ip_protection.title}
      ipDescription={oemData.ip_protection.description}
      measures={oemData.ip_protection.measures}
      capabilities={oemData.custom_manufacturing.capabilities}
      buyerPath={oemData.buyer_path}
      heroAsset={resolve(HERO)}
      journeyAssets={journeyAssets}
      evidenceAssets={evidenceAssets}
    />
  );
}
