/**
 * components/design-system-v3/V3Hero.tsx
 * Hero with 5 page-intent variants. Visual benchmark:
 * hisvia-v3-prototype.html. V3 tokens only (lib/design-system-v3/tokens.ts);
 * no hardcoded colors, no V2 tokens.
 * If an asset is passed, it must pass validateHeroAsset() — dev throws,
 * production drops the image and logs the violation.
 */
import { PANEL, PANEL_2, LINE, INK, INK_DIM, CYAN, DISPLAY, MONO } from "@/lib/design-system-v3/tokens";
import { AssetEntry, validateHeroAsset } from "@/lib/design-system-v3/asset-rules";
import { assetImageUrl } from "@/lib/content-v2/asset-selector";

export type V3HeroVariant =
  | "brand-index"
  | "datasheet"
  | "brand-selector"
  | "capability-chain"
  | "solution-map";

interface V3HeroProps {
  variant: V3HeroVariant;
  eyebrow: string;
  title: string;
  description?: string;
  asset?: AssetEntry | null;
  /** Extra content inside the datasheet copy column (e.g. spec callout). */
  copyAddon?: React.ReactNode;
  children?: React.ReactNode;
}

export function V3Hero({ variant, eyebrow, title, description, asset, copyAddon, children }: V3HeroProps) {
  let heroAsset: AssetEntry | undefined = asset ?? undefined;
  if (heroAsset) {
    const violations = validateHeroAsset(heroAsset);
    if (violations.length > 0) {
      if (process.env.NODE_ENV !== "production") {
        throw new Error(
          `[V3Hero] asset-${heroAsset.asset_id} 未通过 Hero 规则：\n` +
            violations.map((v) => `  - ${v.rule}: ${v.detail}`).join("\n")
        );
      }
      console.error(`[V3Hero] 生产环境拦截了一次不合规 Hero 资产渲染：asset-${heroAsset.asset_id}`, violations);
      heroAsset = undefined;
    }
  }

  const heroUrl = heroAsset ? assetImageUrl(heroAsset) : null;

  // Prototype .sys-hero: datasheet first screen = engineering data table
  // (copy left + datasheet right), not a scene photo. Hairline grid.
  if (variant === "datasheet") {
    return (
      <section data-hero-variant={variant} className="v3-hero">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="v3-sys-hero">
            <div className="v3-sys-hero-copy">
              <p className="v3-eyebrow">{eyebrow}</p>
              <h1
                className="v3-h1"
                style={{ color: INK, fontSize: 40, lineHeight: 1.04, margin: "10px 0 16px" }}
              >
                {title}
              </h1>
              {description && (
                <p style={{ color: INK_DIM, fontSize: 15, maxWidth: "48ch", lineHeight: 1.6 }}>
                  {description}
                </p>
              )}
              {copyAddon && <div style={{ marginTop: 20 }}>{copyAddon}</div>}
            </div>
            <div className="v3-sys-hero-datasheet">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  const hasChildrenContent = variant === "brand-selector" || variant === "capability-chain";

  return (
    <section
      data-hero-variant={variant}
      style={{
        borderBottom: `1px solid ${LINE}`,
        background: variant === "brand-selector" || variant === "capability-chain" ? PANEL_2 : PANEL,
        padding: "72px 0 56px",
      }}
      className="v3-hero"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <p className="v3-eyebrow">{eyebrow}</p>
            <h1
              className="v3-h1"
              style={{ color: INK, fontSize: "clamp(32px,4.6vw,56px)", lineHeight: 1.06, marginTop: 14 }}
            >
              {title}
            </h1>
            {description && (
              <p style={{ fontFamily: DISPLAY, color: INK_DIM, fontSize: 17, lineHeight: 1.6, marginTop: 18, maxWidth: 620 }}>
                {description}
              </p>
            )}
          </div>
          {heroUrl && heroAsset && (
            <figure data-asset-id={heroAsset.asset_id} data-quality={heroAsset.quality_score ?? "null"} className="shrink-0 lg:w-[400px]">
              <img
                src={heroUrl}
                alt={heroAsset.industrial_message || title}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", border: `1px solid ${LINE}` }}
                loading="eager"
              />
              <figcaption style={{ fontFamily: MONO, fontSize: 10, color: INK_DIM, marginTop: 8, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                {heroAsset.visual_role} · q={heroAsset.quality_score ?? "—"}
              </figcaption>
            </figure>
          )}
        </div>
        {hasChildrenContent && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
