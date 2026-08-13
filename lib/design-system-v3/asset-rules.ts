/**
 * lib/design-system-v3/asset-rules.ts
 * V3 asset rule engine — wraps the existing asset resolver; adds
 * "is this asset allowed here" judgments. No re-implementation of
 * resolveAsset(); fields follow the real lib/content-v2/types.ts.
 */
import { resolveAsset, queryAssets, getAllAssets } from "@/lib/content-v2/asset-library";
import type { AssetEntry as RealAssetEntry } from "@/lib/content-v2/types";

export type AssetEntry = RealAssetEntry;

export interface AssetRuleViolation {
  asset_id: string;
  rule: "quality_below_threshold" | "forbidden_role" | "role_mismatch" | "cross_page_limit" | "in_page_duplicate";
  detail: string;
}

const HERO_QUALITY_FLOOR = 70;

/** Hero asset must pass: derived hero_candidate signal + quality >= 70 + not forbidden for hero. */
export function validateHeroAsset(asset: AssetEntry): AssetRuleViolation[] {
  const violations: AssetRuleViolation[] = [];

  if (!asset.derived_roles?.includes("hero_candidate")) {
    violations.push({
      asset_id: asset.asset_id,
      rule: "role_mismatch",
      detail: `derived_roles=${JSON.stringify(asset.derived_roles ?? null)}，Hero 位置要求含 hero_candidate`,
    });
  }
  if (asset.quality_score === null || asset.quality_score === undefined || asset.quality_score < HERO_QUALITY_FLOOR) {
    violations.push({
      asset_id: asset.asset_id,
      rule: "quality_below_threshold",
      detail: `quality_score=${asset.quality_score ?? null}，低于 Hero 要求的 ${HERO_QUALITY_FLOOR}`,
    });
  }
  if (asset.forbidden_sections?.includes("hero")) {
    violations.push({
      asset_id: asset.asset_id,
      rule: "forbidden_role",
      detail: "资产元数据 forbidden_sections 包含 hero，不可用于任何 Hero 位置",
    });
  }
  return violations;
}

/** Pick the first hero-compliant candidate; throw instead of silently falling back. */
export function selectHeroAsset(candidates: AssetEntry[]): AssetEntry {
  for (const candidate of candidates) {
    if (validateHeroAsset(candidate).length === 0) return candidate;
  }
  throw new Error(
    `[design-system-v3] 候选池中没有任何资产通过 Hero 规则（hero_candidate, quality>=70, forbidden_sections!=hero）。` +
      `候选 asset_id: ${candidates.map((c) => c.asset_id).join(", ") || "(空)"}`
  );
}

/** Cross-page limit: one asset_id may appear on at most 2 pages. */
export function checkCrossPageLimit(
  assetId: string,
  pageRegistry: Record<string, string[]>
): AssetRuleViolation | null {
  const usedIn = Object.entries(pageRegistry).filter(([, ids]) => ids.includes(assetId));
  if (usedIn.length > 2) {
    return {
      asset_id: assetId,
      rule: "cross_page_limit",
      detail: `被 ${usedIn.length} 个页面引用（上限 2）：${usedIn.map(([p]) => p).join(", ")}`,
    };
  }
  return null;
}

/** Zero in-page duplicates. */
export function checkInPageDuplicate(assetIdsOnPage: string[]): AssetRuleViolation[] {
  const seen = new Set<string>();
  const violations: AssetRuleViolation[] = [];
  for (const id of assetIdsOnPage) {
    if (seen.has(id)) {
      violations.push({ asset_id: id, rule: "in_page_duplicate", detail: "同一页面内重复引用" });
    }
    seen.add(id);
  }
  return violations;
}

/** Brand-labelled assets may only render inside a brand context. */
export function assertBrandContextOnly(asset: AssetEntry, contextIsBrandPage: boolean) {
  if (asset.brand && !contextIsBrandPage) {
    throw new Error(
      `[design-system-v3] asset-${asset.asset_id} 带 brand="${asset.brand}"，` +
        `但当前渲染上下文不是品牌语境页面。禁止品牌资产脱离品牌语境使用。`
    );
  }
}

export { resolveAsset, queryAssets, getAllAssets };
