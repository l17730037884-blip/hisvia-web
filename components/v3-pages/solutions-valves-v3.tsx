/**
 * components/v3-pages/solutions-valves-v3.tsx
 * V3 production page — /v2/[locale]/solutions/valves (migration batch 3).
 * Template parity with solutions-compressors-v3.tsx /
 * solutions-valves-v3.tsx (same Hero/DataPanel/Evidence/
 * ProcessTimeline/CTA structure, zero component changes). All asset ids
 * and counts are real Valves & Flow Control data from assets/asset-library-v2.json,
 * cross-checked with asset-intelligence.json system axis.
 */
import type { Locale } from "@/lib/locales";
import { getSystemPageByRoute, getCapabilities } from "@/lib/content-v2/content-loader";
import { resolveAsset, getAllAssets } from "@/lib/design-system-v3/asset-rules";
import {
  V3Hero, V3DataPanel, V3ProcessTimeline, V3Section, V3AssetGrid, V3EvidencePanel, V3CTA, V3SpecCallout, V3MegaMenu,
} from "@/components/design-system-v3";
import { LINE, INK, INK_DIM, MONO } from "@/lib/design-system-v3/tokens";

const ROUTE_CAPABILITIES = ["casting_forging", "cnc_machining", "surface_treatment"];

/** Real valves capability-evidence assets (asset-intelligence.json + library system_showcase pool). */
const CAP_EVIDENCE_ID = "asset-89ce62c8";
const CAP_GRID_IDS = ["asset-f0e95dba", "asset-7b19d020", "asset-eda7e5af"];
/** One distinct real asset per manufacturing-route step (no in-page reuse). */
const STEP_ASSET_BY_CAPABILITY: Record<string, string> = {"casting_forging": "asset-88539c3d", "cnc_machining": "asset-7aec301e", "surface_treatment": "asset-b98e3e27"};
const VERIFY_ASSET_ID = "asset-d1bdbaa9";
/** Real library entry whose own metadata forbids hero use — surfaced via spec callout. */
const FORBIDDEN_HERO_ID = "asset-1ebf3f69";

const LABELS: Record<Locale, {
  eyebrow: string;
  title: string;
  description: (count: number) => string;
  overview: string;
  route: string;
  evidence: string;
  applications: string;
  verification: string;
  cta: string;
  ctaNote: string;
  brandsNote: string;
}> = {
  en: {
    eyebrow: "System · Valves & Flow Control",
    title: "Valve Manufacturing Route",
    description: (count) =>
      `${count} library assets. The system page leads with an engineering datasheet, not a scene photo — capability, materials, verification and route first.`,
    overview: "System Overview",
    route: "Manufacturing Route",
    evidence: "Manufacturing Capability Evidence",
    applications: "Typical Applications",
    verification: "Quality Verification",
    cta: "Submit a Request",
    ctaNote: "Structured sourcing request → evidence → verified Chinese manufacturers.",
    brandsNote: "see Brands axis",
  },
  ru: {
    eyebrow: "Система · Клапаны и управление потоками",
    title: "Маршрут производства клапанов",
    description: (count) =>
      `${count} активов библиотеки. Страница системы начинается с инженерной таблицы данных, а не со сцены — сначала возможности, материалы, проверка и маршрут.`,
    overview: "Обзор системы",
    route: "Маршрут производства",
    evidence: "Подтверждение производственных возможностей",
    applications: "Типовые применения",
    verification: "Проверка качества",
    cta: "Отправить запрос",
    ctaNote: "Структурированный запрос → доказательства → проверенные заводы Китая.",
    brandsNote: "см. ось Brands",
  },
  zh: {
    eyebrow: "系统 · 阀门与流量控制",
    title: "阀门制造路径",
    description: (count) =>
      `${count} 个资产库条目。系统页首屏是工程数据表，而不是场景图——先看能力、材料、验证与制造路径。`,
    overview: "系统概览",
    route: "制造路径",
    evidence: "制造能力证据",
    applications: "典型应用",
    verification: "质量验证",
    cta: "提交需求",
    ctaNote: "结构化采购需求 → 证据 → 经核验的中国制造商。",
    brandsNote: "见 Brands 轴",
  },
};

export default function SolutionsValvesV3({ locale }: { locale: Locale }) {
  const t = LABELS[locale];
  const system = getSystemPageByRoute("/solutions/valves");
  if (!system) return null;

  const routeCapabilities = getCapabilities().filter((c) => ROUTE_CAPABILITIES.includes(c.id));
  const capEvidence = resolveAsset(CAP_EVIDENCE_ID);
  const capAssets = CAP_GRID_IDS.map((id) => resolveAsset(id)).filter(
    (a): a is NonNullable<typeof a> => a !== null
  );
  const verifyAsset = resolveAsset(VERIFY_ASSET_ID);
  const verifyAssets = verifyAsset ? [verifyAsset] : [];

  // Real library count (system_type axis) — 81, cross-checked with
  // asset-intelligence.json systems._summary["Valves & Flow Control"].
  const systemAssetCount = getAllAssets().filter((a) => a.system_type === system.system_type).length;

  const forbiddenHero = resolveAsset(FORBIDDEN_HERO_ID);

  const steps: import("@/components/design-system-v3").V3ProcessStep[] = routeCapabilities.map((c) => ({
    id: c.id,
    title: c.name,
    assetId: STEP_ASSET_BY_CAPABILITY[c.id],
    detail: c.description,
  }));
  steps.push({
    id: "verification",
    title: t.verification,
    assetId: "asset-74f3219e",
    qualityScore: verifyAsset?.quality_score ?? null,
  });

  return (
    <div className="v3-scope v3-page-root">
      <V3MegaMenu locale={locale} />

      <V3Hero
        variant="datasheet"
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description(systemAssetCount)}
        copyAddon={
          forbiddenHero ? (
            <V3SpecCallout
              assetId={forbiddenHero.asset_id}
              filename={forbiddenHero.filename}
              quality={forbiddenHero.quality_score}
              role="hero"
              validation={{
                ok: false,
                note: `metadata: forbidden=${(forbiddenHero.forbidden_sections ?? []).join(",")} — this image is not used as a hero`,
              }}
            />
          ) : null
        }
      >
        <V3DataPanel
          rows={[
            { key: "System Type", value: system.system_type },
            { key: "Route Slug", value: system.route },
            { key: "Industrial System Assets", value: systemAssetCount },
            {
              key: "Compatible Brands",
              value: `${system.compatible_brands.length} (${t.brandsNote})`,
            },
          ]}
          evidenceAssetId={CAP_EVIDENCE_ID}
          evidenceCaption={`${CAP_EVIDENCE_ID} · capability · q=${capEvidence?.quality_score ?? "—"}`}
        />
      </V3Hero>

      <V3Section eyebrow="Route" title={t.route}>
        <V3ProcessTimeline steps={steps} />
      </V3Section>

      <V3Section eyebrow="Capability evidence" title={t.evidence}>
        <V3AssetGrid assets={capAssets} columns={3} />
      </V3Section>

      <V3Section eyebrow="Applications" title={t.applications}>
        <ul className="grid gap-3 md:grid-cols-2">
          {system.typical_applications.map((app) => (
            <li
              key={app}
              className="px-4 py-3"
              style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.03em", borderLeft: `2px solid ${INK}`, color: INK }}
            >
              {app}
            </li>
          ))}
        </ul>
      </V3Section>

      <V3Section eyebrow="Evidence" title={t.verification}>
        <V3EvidencePanel title={t.verification} assets={verifyAssets} />
      </V3Section>

      <section className="mx-auto max-w-[1240px] px-6 pb-20 md:px-10">
        <div className="flex flex-col items-start gap-5 border-t pt-12" style={{ borderColor: LINE }}>
          <V3CTA href={`/v2/${locale}/request`} label={t.cta} />
          <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: INK_DIM, textTransform: "uppercase" }}>
            {t.ctaNote}
          </p>
        </div>
      </section>
    </div>
  );
}
