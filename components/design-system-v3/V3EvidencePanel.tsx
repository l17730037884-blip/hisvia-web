/**
 * Evidence panel — only trust_evidence-role assets are accepted
 * (dev throws). Prototype panel treatment. V3 tokens only.
 */
import { PANEL, LINE, INK, INK_DIM, MONO, DISPLAY } from "@/lib/design-system-v3/tokens";
import { AssetEntry } from "@/lib/design-system-v3/asset-rules";
import { assetImageUrl } from "@/lib/content-v2/asset-selector";

interface V3EvidencePanelProps {
  title: string;
  assets: AssetEntry[];
}

export function V3EvidencePanel({ title, assets }: V3EvidencePanelProps) {
  if (process.env.NODE_ENV !== "production") {
    const invalid = assets.filter((a) => a.visual_role !== "trust_evidence");
    if (invalid.length > 0) {
      throw new Error(
        `[V3EvidencePanel] 传入了非 trust_evidence 角色的资产：` +
          invalid.map((a) => `${a.asset_id}(visual_role=${a.visual_role})`).join(", ")
      );
    }
  }

  return (
    <div className="v3-evidence-panel" style={{ background: PANEL, border: `1px solid ${LINE}`, padding: "28px 28px" }}>
      <h3 style={{ color: INK, fontFamily: DISPLAY, fontSize: 22, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.02em" }}>{title}</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {assets.map((a) => {
          const url = assetImageUrl(a);
          return (
            <figure key={a.asset_id} data-asset-id={a.asset_id} data-role={a.visual_role}>
              {url && (
                <img
                  src={url}
                  alt={a.industrial_message || a.filename}
                  style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", border: `1px solid ${LINE}` }}
                  loading="lazy"
                />
              )}
              <figcaption style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: INK_DIM, marginTop: 8, textTransform: "uppercase" }}>
                {a.visual_role} · q={a.quality_score ?? "—"}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
