/**
 * Asset grid with in-page duplicate and brand-context checks at render
 * time (dev throws). Hairline grid per prototype .card-row. V3 tokens only.
 */
import { LINE, PANEL, INK_DIM, MONO } from "@/lib/design-system-v3/tokens";
import { AssetEntry, checkInPageDuplicate } from "@/lib/design-system-v3/asset-rules";
import { assetImageUrl } from "@/lib/content-v2/asset-selector";

interface V3AssetGridProps {
  assets: AssetEntry[];
  columns?: 3 | 4;
  brandContext?: boolean;
}

export function V3AssetGrid({ assets, columns = 4, brandContext = false }: V3AssetGridProps) {
  if (process.env.NODE_ENV !== "production") {
    const dupViolations = checkInPageDuplicate(assets.map((a) => a.asset_id));
    if (dupViolations.length > 0) {
      throw new Error(`[V3AssetGrid] 页内重复资产：${dupViolations.map((v) => v.asset_id).join(", ")}`);
    }
    if (!brandContext) {
      const brandAssets = assets.filter((a) => a.brand);
      if (brandAssets.length > 0) {
        throw new Error(
          `[V3AssetGrid] 非品牌语境下传入了带 brand 字段的资产：${brandAssets.map((a) => `${a.asset_id}(${a.brand})`).join(", ")}`
        );
      }
    }
  }

  return (
    <div
      className="v3-asset-grid grid gap-px"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, background: LINE, border: `1px solid ${LINE}` }}
    >
      {assets.map((asset) => {
        const url = assetImageUrl(asset);
        return (
          <figure key={asset.asset_id} data-asset-id={asset.asset_id} data-role={asset.visual_role} style={{ background: PANEL }}>
            {url && (
              <img
                src={url}
                alt={asset.industrial_message || asset.filename}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }}
                loading="lazy"
              />
            )}
            <figcaption style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: INK_DIM, padding: "10px 12px", textTransform: "uppercase" }}>
              {asset.visual_role} · q={asset.quality_score ?? "—"}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
