"use client";
/**
 * Manufacturing process timeline. mode="static" for system pages;
 * mode="explorer" adds click-to-reveal detail. Prototype .route-step
 * treatment (cyan step numbers on panel steps). V3 tokens only.
 */
import { useState } from "react";
import { AMBER, PANEL, LINE, INK, INK_DIM, CYAN, DISPLAY, MONO } from "@/lib/design-system-v3/tokens";
import { resolveAsset } from "@/lib/design-system-v3/asset-rules";
import { assetImageUrl } from "@/lib/content-v2/asset-selector";

export interface V3ProcessStep {
  id: string;
  title: string;
  assetId?: string;
  qualityScore?: number | null;
  detail?: string;
}

interface V3ProcessTimelineProps {
  steps: V3ProcessStep[];
  mode?: "static" | "explorer";
}

export function V3ProcessTimeline({ steps, mode = "static" }: V3ProcessTimelineProps) {
  const [activeId, setActiveId] = useState(steps[0]?.id);
  const active = steps.find((s) => s.id === activeId);

  return (
    <div className="v3-process-timeline" data-mode={mode}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const stepAsset = step.assetId ? resolveAsset(step.assetId) : null;
          const stepUrl = assetImageUrl(stepAsset);
          const isActive = mode === "explorer" && activeId === step.id;
          return (
            <div
              key={step.id}
              className="v3-process-step"
              onClick={mode === "explorer" ? () => setActiveId(step.id) : undefined}
              style={{
                cursor: mode === "explorer" ? "pointer" : "default",
                border: `1px solid ${isActive ? AMBER : LINE}`,
                background: PANEL,
                padding: 18,
                position: "relative",
              }}
            >
              <div className="flex items-baseline justify-between">
                <span style={{ fontFamily: DISPLAY, color: CYAN, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {stepAsset && (
                  <span style={{ fontFamily: MONO, fontSize: 10, color: INK_DIM }}>
                    q={stepAsset.quality_score ?? "—"}
                  </span>
                )}
              </div>
              <h4 style={{ color: INK, fontSize: 15, fontWeight: 600, marginTop: 10 }}>{step.title}</h4>
              {stepUrl && (
                <img
                  src={stepUrl}
                  alt={step.title}
                  style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", marginTop: 10, border: `1px solid ${LINE}` }}
                  loading="lazy"
                />
              )}
            </div>
          );
        })}
      </div>
      {mode === "explorer" && active?.detail && (
        <div className="mt-6 px-5 py-4" style={{ borderLeft: `2px solid ${AMBER}`, background: PANEL }}>
          <p style={{ color: INK, fontSize: 14, lineHeight: 1.6 }}>{active.detail}</p>
        </div>
      )}
    </div>
  );
}
