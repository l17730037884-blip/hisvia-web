/**
 * HISVIA Intelligence Section
 * Phase 8 Pilot — Dynamic content driven by Asset Intelligence Registry.
 *
 * Reads system-data + registry-loader to render:
 * - Compatible brands
 * - Equipment categories with assets
 * - Applications / industry scope
 * - Buyer procurement problems
 * - CTA to submit-requirement
 */

import { SectionHead, PrimaryButton } from "./ui";
import { routes } from "@/lib/routes";
import { pageT } from "@/lib/page-translations";
import type { Locale } from "@/lib/locales";
import type { SystemType } from "@/lib/intelligence/types";

// Intelligence layer imports
import { getSystemPage } from "@/lib/intelligence/system-data";
import { getProcurementScenariosBySystem } from "@/lib/intelligence/procurement-data";
import { getSeoLandingPagesBySystem } from "@/lib/intelligence/seo-data";

interface Props {
  locale: Locale;
  systemType: SystemType;
}

export default function IntelligenceSection({ locale, systemType }: Props) {
  const base = `/${locale}`;
  const t = pageT[locale];
  const d = t.detail;

  // Load intelligence data
  const sysPage = getSystemPage(systemType);
  if (!sysPage) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-wrap px-8">
          <p className="text-steel">Intelligence data not available for {systemType}.</p>
        </div>
      </section>
    );
  }

  const { page, heroAssets, supportAssets } = sysPage;
  const procurementScenarios = getProcurementScenariosBySystem(systemType);
  const seoPages = getSeoLandingPagesBySystem(systemType);

  // Extract unique brands from assets
  const allAssets = [...heroAssets, ...supportAssets];
  const brands = [...new Set(
    allAssets
      .map((a) => a.industrial_classification.brand)
      .filter(Boolean) as string[]
  )];

  // Extract categories from assets
  const categories = [...new Set(
    allAssets
      .map((a) => a.industrial_classification.category)
      .filter(Boolean) as string[]
  )];

  // Extract industry scope from first asset's capability data
  const industryScope = allAssets[0]?.supplier_capability.industry_scope || [];
  const exportPotential = allAssets[0]?.supplier_capability.export_potential || "";

  // Map asset IDs to image paths (use original_path from registry)
  const getImagePath = (assetId: string) => {
    const asset = allAssets.find((a) => a.asset_id === assetId);
    return asset?.asset_source.original_path || null;
  };

  return (
    <>
      {/* Compatible Brands */}
      {brands.length > 0 && (
        <section className="border-b border-line py-12">
          <div className="mx-auto max-w-wrap px-8">
            <SectionHead
              kicker={d.compatibleLabel}
              title={d.supportedEquipment}
              description={`${brands.length} compatible brands supported: ${brands.join(", ")}.`}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand) => {
                const brandAssets = allAssets.filter(
                  (a) => a.industrial_classification.brand === brand
                );
                return (
                  <div
                    key={brand}
                    className="rounded border border-line bg-white p-4 card-hover"
                  >
                    <p className="text-sm font-semibold text-navy">{brand}</p>
                    <p className="mt-1 text-[12px] text-steel">
                      {brandAssets.length} asset{brandAssets.length > 1 ? "s" : ""} available
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {brandAssets.slice(0, 3).map((a) => (
                        <span
                          key={a.asset_id}
                          className="rounded bg-[#F4F6F8] px-2 py-0.5 font-mono text-[10px] text-graphite"
                        >
                          {a.industrial_classification.category || "component"}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Equipment Categories */}
      {categories.length > 0 && (
        <section className="border-b border-line py-12 bg-[#F9FAFB]">
          <div className="mx-auto max-w-wrap px-8">
            <SectionHead
              kicker={d.commonComponents}
              title={d.componentCategories}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map((cat) => {
                const catAssets = allAssets.filter(
                  (a) => a.industrial_classification.category === cat
                );
                return (
                  <div
                    key={cat}
                    className="rounded border border-line bg-white p-4 card-hover"
                  >
                    <p className="text-sm font-semibold text-navy">{cat}</p>
                    <p className="mt-1 text-[12px] text-steel">
                      {catAssets.length} asset{catAssets.length > 1 ? "s" : ""}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {catAssets.map((a) => (
                        <span
                          key={a.asset_id}
                          className="rounded bg-[#F4F6F8] px-2 py-0.5 font-mono text-[10px] text-graphite"
                        >
                          {a.asset_id.slice(-8)}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Applications / Industry Scope */}
      {industryScope.length > 0 && (
        <section className="border-b border-line py-12">
          <div className="mx-auto max-w-wrap px-8">
            <SectionHead
              kicker={d.applications}
              title={d.industrialApps}
              description={exportPotential ? exportPotential : undefined}
            />
            <div className="flex flex-wrap gap-2">
              {industryScope.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-amber/30 bg-amber/5 px-4 py-1.5 text-[13px] font-medium text-amber"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Buyer Problems / Procurement */}
      {procurementScenarios.length > 0 && (
        <section className="border-b border-line py-12 bg-[#F9FAFB]">
          <div className="mx-auto max-w-wrap px-8">
            <SectionHead
              kicker={d.challenge}
              title={d.needReplacement}
              description={d.needReplacementDesc}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {procurementScenarios.map((ps) => (
                <div
                  key={ps.scenario.request_type}
                  className="rounded border border-line bg-white p-5 card-hover"
                >
                  <p className="mb-2 text-[11px] font-mono uppercase tracking-wide text-steel">
                    {ps.scenario.request_type.replace(/_/g, " ")}
                  </p>
                  <p className="text-[14px] font-medium text-navy leading-relaxed">
                    {ps.scenario.buyer_problem}
                  </p>
                  <p className="mt-2 text-[12px] text-steel">
                    {ps.scenario.related_assets.length} related assets →
                    {" "}
                    <span className="text-amber">{ps.scenario.solution_page}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO landing pages */}
      {seoPages.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-wrap px-8">
            <SectionHead
              kicker="SEO"
              title="Industry Application Pages"
            />
            <div className="flex flex-wrap gap-2">
              {seoPages.slice(0, 8).map((sp) => (
                <span
                  key={sp.page.url_slug}
                  className="rounded border border-line bg-white px-3 py-1 text-[12px] text-steel"
                >
                  {sp.page.page_title}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-line bg-navy py-14">
        <div className="mx-auto max-w-wrap px-8 text-center">
          <h2 className="mb-4 text-[24px] font-bold text-white">
            {d.readyToTalk}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-[15px] text-[#C9D2DA]">
            {page.procurement_keywords.slice(0, 3).join(" · ")}
          </p>
          <PrimaryButton href={`${base}${routes.request}`} variant="inverted">
            {d.submitIndustrialBtn}
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
