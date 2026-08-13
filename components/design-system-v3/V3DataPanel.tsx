/**
 * System-page datasheet panel — engineering data rows + a small
 * evidence illustration. Prototype .ds-row / .ds-thumb layout.
 * V3 tokens only. Parent (V3Hero datasheet) supplies the panel
 * background; this component renders rows + evidence thumb.
 */
import { INK, INK_DIM, MONO } from "@/lib/design-system-v3/tokens";
import { resolveAsset } from "@/lib/design-system-v3/asset-rules";
import { assetImageUrl } from "@/lib/content-v2/asset-selector";

export interface V3DataRow {
  key: string;
  value: string | number;
}

interface V3DataPanelProps {
  rows: V3DataRow[];
  evidenceAssetId?: string;
  evidenceCaption?: string;
}

export function V3DataPanel({ rows, evidenceAssetId, evidenceCaption }: V3DataPanelProps) {
  const evidence = evidenceAssetId ? resolveAsset(evidenceAssetId) : null;
  const evidenceUrl = assetImageUrl(evidence);
  return (
    <div className="v3-data-panel">
      <div>
        {rows.map((row) => (
          <div key={row.key} className="v3-ds-row">
            <span className="v3-ds-key">{row.key}</span>
            <span style={{ color: INK }}>{row.value}</span>
          </div>
        ))}
      </div>
      {evidenceUrl && evidence && (
        <figure data-asset-id={evidence.asset_id} className="v3-ds-thumb">
          <img
            src={evidenceUrl}
            alt={evidence.industrial_message || evidenceCaption || "Manufacturing evidence"}
            loading="lazy"
          />
          <figcaption
            className="v3-spec-callout"
            style={{ fontFamily: MONO, fontSize: 10, color: INK_DIM, textTransform: "uppercase", letterSpacing: "0.12em" }}
          >
            {evidenceCaption || `${evidence.asset_id} · ${evidence.visual_role} · q=${evidence.quality_score ?? "—"}`}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
