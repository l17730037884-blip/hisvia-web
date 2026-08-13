"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getAssetForSlot, queryAssets } from "@/lib/content-v2/asset-library";
import type { AssetEntry, VisualRole } from "@/lib/content-v2/types";

/* ============================================================
   HISVIA — V4 Homepage · Stage 1 · Manufacturing Search Hero
   Fictiv / Xometry / RapidDirect class procurement entry.
   All imagery resolves through the Asset Library API
   (lib/content-v2/asset-library.ts) — no hardcoded paths.
   ============================================================ */

const BG = "#F5F5F1";
const CARD = "#FFFFFF";
const INK = "#0F1213";
const DIM = "#565B5E";
const FAINT = "#8F9497";
const LINE = "#DFDFD8";
const ACCENT = "#E34D0E";
const GREEN = "#167A4C";
const DISPLAY = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
const MONO = `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CSS = `
  .v4p { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  .v4p .mono { font-family: ${MONO}; }
  .v4p .display { font-family: ${DISPLAY}; }
  .v4p input::placeholder { color: #A6AAAC; }
  .v4p ::selection { background: rgba(227,77,14,0.18); }
`;

const SUPPORTED = ["Machining", "Hydraulics", "Pneumatics", "Automation", "OEM"];

/* ============================================================
   Asset Library resolution — V3 role vocabulary → V2 library query
   The V2 dataset carries V2 role labels only, so V3 roles are
   mapped onto the closest library query. Every <img> is fed by
   the library; page holds zero hardcoded /photos/ paths.
   ============================================================ */

interface ResolvedAsset {
  asset: AssetEntry | null;
  requestedRole: string; // V3 role requested by the UI slot
  resolvedRole: string;  // visual_role actually resolved from the library
  quality: number | null;
  via: "queryAssets" | "getAssetForSlot";
  fallback: boolean;
}

const V3_TO_V2_ROLES: Record<string, VisualRole[]> = {
  hero_machine_macro: ["system_showcase"],
  product_detail: ["technical_detail", "system_showcase"],
  process_shot: ["solution_application", "system_showcase"],
  inspection_scene: ["trust_evidence"],
};

function toResolved(
  asset: AssetEntry | null,
  requestedRole: string,
  via: "queryAssets" | "getAssetForSlot",
  fallback: boolean
): ResolvedAsset {
  return {
    asset,
    requestedRole,
    resolvedRole: asset?.visual_role ?? "-",
    quality: asset?.quality_score ?? null,
    via,
    fallback,
  };
}

// Hero — slot homepage.hero: strict V3 role + quality gate, then hero_candidate fallback
function resolveHero(): ResolvedAsset {
  const strict = queryAssets({
    visual_role: "hero_machine_macro" as unknown as VisualRole,
    min_quality: 85,
    sort_by: "quality_score",
    limit: 1,
  });
  if (strict[0]) return toResolved(strict[0], "hero_machine_macro", "queryAssets", false);

  const mapped = queryAssets({
    visual_role: V3_TO_V2_ROLES.hero_machine_macro,
    min_quality: 85,
    allowed_section: "hero_support",
    sort_by: "quality_score",
    limit: 1,
  });
  if (mapped[0]) return toResolved(mapped[0], "hero_machine_macro", "queryAssets", true);

  const slot = getAssetForSlot({ page: "homepage", slot: "hero" });
  if (slot.asset) return toResolved(slot.asset, "hero_candidate", "getAssetForSlot", true);
  return toResolved(null, "hero_candidate", "getAssetForSlot", true);
}

// Gallery — V3 roles product_detail / process_shot / inspection_scene
function resolveGallery(excludeIds: string[]): ResolvedAsset[] {
  const used = new Set(excludeIds);
  const roles: Array<{ v3: string; minQuality: number }> = [
    { v3: "product_detail", minQuality: 60 },
    { v3: "process_shot", minQuality: 60 },
    { v3: "inspection_scene", minQuality: 60 },
  ];
  return roles.map(({ v3, minQuality }) => {
    const strict = queryAssets({
      visual_role: v3 as unknown as VisualRole,
      min_quality: minQuality,
      sort_by: "quality_score",
      limit: 1,
      excludeIds: [...used],
    });
    if (strict[0]) {
      used.add(strict[0].asset_id);
      return toResolved(strict[0], v3, "queryAssets", false);
    }
    const mapped = queryAssets({
      visual_role: V3_TO_V2_ROLES[v3] ?? ([] as VisualRole[]),
      min_quality: minQuality,
      sort_by: "quality_score",
      limit: 1,
      excludeIds: [...used],
    });
    if (mapped[0]) {
      used.add(mapped[0].asset_id);
      return toResolved(mapped[0], v3, "queryAssets", true);
    }
    return toResolved(null, v3, "queryAssets", true);
  });
}

const HERO = resolveHero();
const GALLERY_RESOLVED = resolveGallery(HERO.asset ? [HERO.asset.asset_id] : []);
const GALLERY = [
  { res: HERO, title: "CNC machined parts", spec: "5-axis · Al / Ti / SS", tag: "±0.005 mm", proc: "5-AXIS CNC" },
  { res: GALLERY_RESOLVED[0], title: "Hydraulic components", spec: "up to 40 MPa · ISO 9001", tag: "40 MPa", proc: "PRESSURE TEST" },
  { res: GALLERY_RESOLVED[1], title: "Valves & fittings", spec: "CE · PED 2014/68", tag: "API 6D", proc: "CASTING" },
  { res: GALLERY_RESOLVED[2], title: "Compressor parts", spec: "assembly & test · ISO 1217", tag: "ISO 1217", proc: "FINAL ASSEMBLY" },
];

function AssetDebug({ res }: { res: ResolvedAsset }) {
  return (
    <div
      className="mono absolute left-2 top-2 z-10 bg-black/80 px-2 py-1.5"
      style={{ fontSize: 8.5, lineHeight: 1.6, letterSpacing: "0.04em", color: "#fff" }}
    >
      <span style={{ color: "#FFB38A" }}>[Asset Debug]</span>
      <br />
      file: {res.asset?.filename ?? "—"}
      <br />
      role: {res.requestedRole}
      {res.fallback ? " → " : " · "}
      {res.resolvedRole}
      <br />
      score: {res.quality ?? "n/a"}
    </div>
  );
}

export default function V4Preview() {
  const [q, setQ] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <main className="v4p relative min-h-screen overflow-x-clip" style={{ background: BG, color: INK }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* top bar */}
      <header className="relative z-20 mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3" style={{ background: ACCENT }} />
          <span className="display text-[19px] font-bold tracking-[-0.02em]">HISVIA</span>
          <span className="mono ml-1 hidden sm:block" style={{ fontSize: 9.5, letterSpacing: "0.22em", color: FAINT }}>
            MANUFACTURING SOURCING
          </span>
        </div>
        <div className="mono flex items-center gap-6" style={{ fontSize: 11.5, letterSpacing: "0.04em", color: DIM }}>
          <span className="hidden md:block">For buyers</span>
          <span className="hidden md:block">For factories</span>
          <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.1em", color: FAINT }}>
            3,142 factories · 24 countries
          </span>
        </div>
      </header>

      {/* hero */}
      <section className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 px-6 pb-20 pt-10 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:pt-16">
        {/* left — procurement entry */}
        <div>
          <motion.h1
            className="display mt-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.08, fontWeight: 700, letterSpacing: "-0.03em" }}
          >
            Source industrial parts from{" "}
            <span style={{ color: ACCENT }}>verified</span> Chinese manufacturers.
          </motion.h1>

          <motion.p
            className="mt-4 max-w-[560px] leading-snug"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            style={{ color: DIM, fontSize: 15 }}
          >
            Upload a drawing or describe your requirement. HISVIA matches you with qualified factories in 24 hours.
          </motion.p>

          {/* procurement entry — single dominant unit */}
          <motion.div
            className="mt-8 max-w-[640px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            <motion.p className="mono flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ fontSize: 10.5, letterSpacing: "0.12em", color: GREEN, textTransform: "uppercase" }}>
              <motion.span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
              Verified supplier network · 24h quote
            </motion.p>

            <div className="mt-3 flex items-stretch border-2 bg-white" style={{ borderColor: INK, boxShadow: "0 18px 40px -22px rgba(15,18,19,0.35)" }}>
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSent(false);
                }}
                placeholder="Describe your requirement..."
                className="h-16 w-full bg-transparent px-5 outline-none"
                style={{ fontSize: 16 }}
              />
              <button
                onClick={() => setSent(true)}
                className="mono shrink-0 transition-opacity hover:opacity-90"
                style={{ background: ACCENT, color: "#fff", fontSize: 15.5, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 36px", boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.22)" }}
              >
                Find Suppliers →
              </button>
            </div>

            <button
              className="mono mt-3 flex w-full items-center justify-center gap-3 border-2 bg-white py-4 transition-colors hover:border-[#0F1213]"
              style={{ borderColor: "#C9C9C0", fontSize: 13.5, letterSpacing: "0.05em", color: INK }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4m0 0L7 9m5-5 5 5" />
                <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
              </svg>
              Upload Drawing / CAD
              <span style={{ fontSize: 9.5, letterSpacing: "0.1em", color: FAINT }}>STEP · DXF · PDF — up to 100 MB</span>
            </button>

            <div className="mt-2.5 flex h-4 items-center justify-between">
              {q.trim() ? (
                <motion.p className="mono flex items-center gap-2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 10.5, letterSpacing: "0.1em", color: GREEN, textTransform: "uppercase" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                  1,240 verified suppliers match this requirement
                </motion.p>
              ) : (
                <span />
              )}
              {sent && !q.trim() ? (
                <motion.p className="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 10.5, letterSpacing: "0.1em", color: ACCENT, textTransform: "uppercase" }}>
                  Please describe a part to begin
                </motion.p>
              ) : (
                <span />
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT }}>
                Supported:
              </span>
              {SUPPORTED.map((s) => (
                <span key={s} className="mono" style={{ fontSize: 11, letterSpacing: "0.04em", color: DIM }}>
                  {s}
                </span>
              ))}
            </div>

            <p className="mono mt-5" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: FAINT }}>
              Free matching · Quotes in 24h · NDA protected · DDP delivery
            </p>
          </motion.div>

          <motion.p
            className="mono mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
            style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: FAINT }}
          >
            Free matching · NDA protected · DDP delivery · ISO 9001 factories
          </motion.p>
        </div>

        {/* right — product gallery fed by Asset Library */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          <p className="mono mb-3" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: FAINT }}>
            Products you can source
          </p>
          <div className="grid grid-cols-2 gap-3">
            {GALLERY.map((g) => (
              <figure key={g.title} className="group relative overflow-hidden border bg-white" style={{ borderColor: LINE }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  {g.res.asset ? (
                    <img
                      src={g.res.asset.path}
                      alt={g.res.asset.filename}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center" style={{ background: "#E9E9E3" }}>
                      <span className="mono" style={{ fontSize: 9, letterSpacing: "0.12em", color: FAINT }}>
                        NO ASSET
                      </span>
                    </div>
                  )}
                  <AssetDebug res={g.res} />
                  <span
                    className="mono absolute bottom-2.5 right-2.5 bg-black/75 px-2 py-1"
                    style={{ fontSize: 9, letterSpacing: "0.12em", color: "#fff" }}
                  >
                    {g.proc}
                  </span>
                </div>
                <figcaption className="px-3.5 py-3">
                  <p className="display text-[13.5px] font-semibold leading-tight" style={{ color: INK }}>
                    {g.title}
                  </p>
                  <p className="mono mt-1" style={{ fontSize: 9.5, letterSpacing: "0.06em", color: FAINT }}>
                    {g.spec}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
