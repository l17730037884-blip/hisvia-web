"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { queryAssets, getAssetForSlot, resolveAsset } from "@/lib/content-v2/asset-library";
import type { AssetEntry } from "@/lib/content-v2/types";

/* ============================================================
   HISVIA V7 — Stage 1 v2: Requirement Entry Prototype
   Upgrade from "advanced form" to "industrial procurement
   task entry".

   Changes vs v1 (from Human Audit):
   - China Manufacturing Network visual proof:
     full-width capability evidence strip (Machining /
     Casting / Assembly / Inspection) — no cards, no
     factory interiors, no enterprise intro.
   - Input area becomes a sourcing task start.
   - After input: Requirement Understanding Flow —
     Requirement understanding → Manufacturing path →
     Matching capability → Supply chain coverage.

   No AI dashboard, no radar, no complex panels.
   ============================================================ */

/* ---------- tokens ---------- */
const PAPER = "#F3F2EC";
const PAPER_D = "#E9E7DF";
const INK = "#17191A";
const DIM = "#6E7377";
const FAINT = "#A7A9A4";
const LINE = "#D8D6CD";
const LINE_D = "#C4C1B6";
const ACCENT = "#E34D0E";
const MONO = `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
const DISPLAY = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CSS = `
  .v7 { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; background: ${PAPER}; color: ${INK}; }
  .v7 .mono { font-family: ${MONO}; }
  .v7 .display { font-family: ${DISPLAY}; }
  .v7 ::selection { background: rgba(227,77,14,0.22); }
  .v7 textarea { resize: none; }
  .v7 textarea::placeholder { color: ${FAINT}; }
  .v7 button { cursor: pointer; }
`;

/* ---------- asset resolution (Asset Library only, no hardcoded paths) ---------- */
interface ResolvedAsset {
  asset: AssetEntry | null;
  role: string;
}

function resolveHeroAsset(): ResolvedAsset {
  const preferred = queryAssets({
    visual_role: ["system_showcase", "manufacturing_strength"],
    min_quality: 85,
    min_hero_suitability: 50,
    sort_by: "quality_score",
    limit: 1,
  })[0];
  if (preferred) return { asset: preferred, role: "hero_machine_macro" };
  const fallback = getAssetForSlot({ page: "homepage", slot: "hero", count: 1 });
  if (fallback.asset) return { asset: fallback.asset, role: "hero_candidate" };
  return { asset: null, role: "hero_candidate" };
}

const HERO = resolveHeroAsset();

/* Manufacturing capability journey — a process narrative, not a category grid */
interface JourneyStage {
  label: string;
  sub: string;
  res: ResolvedAsset;
}

const JOURNEY_PINS: Array<{ label: string; sub: string; pin: string; role: string }> = [
  { label: "Material", sub: "Steel · aluminum · alloys", pin: "asset-legacy-af6646f1", role: "journey_material" },
  { label: "Process", sub: "CNC · casting · forging", pin: "asset-legacy-6bfe8d02", role: "journey_process" },
  { label: "Assembly", sub: "Lines · pressure testing", pin: "asset-legacy-868d30c5", role: "journey_assembly" },
  { label: "Quality", sub: "CMM · first-article", pin: "asset-legacy-f220651f", role: "journey_quality" },
  { label: "Export", sub: "30+ markets · incoterms", pin: "asset-3e6d4bdc", role: "journey_export" },
];

function resolveJourney(): JourneyStage[] {
  return JOURNEY_PINS.map((spec) => {
    const asset = resolveAsset(spec.pin) ?? queryAssets({
      visual_role: ["technical_detail"],
      min_quality: 40,
      sort_by: "quality_score",
      limit: 1,
    })[0] ?? null;
    return { label: spec.label, sub: spec.sub, res: { asset, role: spec.role } };
  });
}

const JOURNEY = resolveJourney();

/* ---------- requirement understanding (honest rule-based parse) ---------- */
interface ParsedRequirement {
  product: string;
  industry: string;
  process: string;
  capability: string;
  coverage: string;
  factories: number | null;
  note?: string;
}

function parseRequirement(text: string): ParsedRequirement {
  const t = text.toLowerCase();
  const has = (...keys: string[]) => keys.some((k) => t.includes(k));

  if (has("hydraulic", "hydraulics") && has("mining")) {
    return {
      product: "Hydraulic components",
      industry: "Mining",
      process: "CNC / Casting / Machining",
      capability: "CNC machining · Casting · ISO 9001",
      coverage: "Export: 30+ markets · EU / Americas",
      factories: 12,
    };
  }
  if (has("hydraulic")) {
    return {
      product: "Hydraulic components",
      industry: "General industrial",
      process: "CNC / Machining / Assembly",
      capability: "CNC machining · Assembly · ISO 9001",
      coverage: "Export: 30+ markets",
      factories: 8,
    };
  }
  if (has("pneumatic") || has("cylinder")) {
    return {
      product: "Pneumatic components",
      industry: "Automation",
      process: "CNC / Assembly / Testing",
      capability: "CNC · Assembly · Pressure testing",
      coverage: "Export: 30+ markets · EU",
      factories: 9,
    };
  }
  if (has("valve") || has("pump")) {
    return {
      product: "Valves & pumps",
      industry: "Fluid power",
      process: "Casting / CNC / Assembly",
      capability: "Casting · CNC · Assembly · ISO 9001",
      coverage: "Export: 30+ markets",
      factories: 7,
    };
  }
  if (has("cnc") || has("machin")) {
    return {
      product: "Machined parts",
      industry: "General industrial",
      process: "CNC / 5-axis / Turning",
      capability: "5-axis CNC · Grinding · ISO 9001",
      coverage: "Export: 30+ markets",
      factories: 16,
    };
  }
  if (has("casting") || has("forging")) {
    return {
      product: "Cast / forged parts",
      industry: "General industrial",
      process: "Casting / Forging / Post-machining",
      capability: "Casting · Forging · Post-machining",
      coverage: "Export: 30+ markets",
      factories: 11,
    };
  }
  if (has("gear") || has("bearing")) {
    return {
      product: "Power transmission parts",
      industry: "Mechanical",
      process: "CNC / Grinding / Heat treatment",
      capability: "Grinding · Heat treatment · ISO 9001",
      coverage: "Export: 30+ markets",
      factories: 6,
    };
  }
  return {
    product: "Industrial parts",
    industry: "To be confirmed",
    process: "To be confirmed",
    capability: "To be confirmed",
    coverage: "To be confirmed",
    factories: null,
    note: "Add material, quantity, or certification to tighten the match.",
  };
}

const EXAMPLES = [
  { title: "Mining hydraulic replacement", body: "Replacement hydraulic parts for mining equipment — ISO 9001 factory" },
  { title: "CNC valve bodies, 500 pcs", body: "CNC machined valve bodies, aluminum, 500 pcs" },
  { title: "Packaging line pneumatic", body: "Custom pneumatic cylinders for packaging lines" },
];

const SUPPORTED = ["Machining", "Hydraulics", "Pneumatics", "Automation", "OEM"];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function V7Preview() {
  const [showDebug, setShowDebug] = useState(false);
  useEffect(() => {
    setShowDebug(new URLSearchParams(window.location.search).has("debug"));
  }, []);

  return (
    <main className="v7 relative min-h-screen overflow-x-clip">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Header />
      <Hero showDebug={showDebug} />
    </main>
  );
}

/* ============================================================
   1. HEADER — minimal
   ============================================================ */
function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b" style={{ background: PAPER, borderColor: LINE }}>
      <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-6 md:px-10">
        <a href="#entry" className="flex items-center gap-3">
          <span className="h-[10px] w-[10px]" style={{ background: ACCENT }} />
          <span className="display text-[17px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
            HISVIA
          </span>
          <span className="mono hidden border-l pl-3 lg:block" style={{ borderColor: LINE_D, fontSize: 8.5, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>
            China Industrial Manufacturing Network
          </span>
        </a>
        <nav className="mono flex items-center gap-6" style={{ fontSize: 10.5, letterSpacing: "0.12em", color: DIM, textTransform: "uppercase" }}>
          <a href="#evidence" className="hidden transition-colors hover:text-[#17191A] sm:block">
            Network evidence
          </a>
          <a href="#entry" className="hidden transition-colors hover:text-[#17191A] sm:block">
            For suppliers
          </a>
          <a
            href="#entry"
            className="border px-4 py-2 text-[10.5px] tracking-[0.12em] transition-colors"
            style={{ borderColor: INK, color: INK }}
          >
            Start sourcing
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   2. HERO / REQUIREMENT ENTRY + capability evidence strip
   ============================================================ */
const FLOW_STAGES = [
  "Requirement understanding",
  "Manufacturing path",
  "Matching capability",
  "Supply chain coverage",
] as const;

function Hero({ showDebug }: { showDebug: boolean }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "result">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [exampleIndex, setExampleIndex] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    setText(value);
    setStatus("analyzing");
    window.setTimeout(() => setStatus("result"), 600);
  };

  const onFile = (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    const source = text.trim() || file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    if (text.trim()) submit(text);
    else submit(source);
  };

  const parsed = parseRequirement(text);
  const reset = () => {
    setStatus("idle");
    setFileName(null);
    setExampleIndex(null);
  };

  return (
    <section id="entry" className="relative flex min-h-screen flex-col pt-14">
      <div className="mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-0 md:px-10 lg:grid-cols-[11fr_8fr]">
        {/* LEFT — requirement entry */}
        <div className="relative z-10 px-6 py-10 md:px-10 lg:px-16 lg:py-12">
          <div className="max-w-[660px]">
            <Reveal delay={0.05}>
              <p className="mono mb-5 flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.26em", color: DIM, textTransform: "uppercase" }}>
                <span className="inline-block h-[6px] w-[6px]" style={{ background: ACCENT }} />
                Industrial sourcing · Verified Chinese manufacturers
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <h1 className="display text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>
                Tell us what industrial product or part you need.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-4 max-w-[540px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>
                Start a sourcing task. HISVIA understands your requirement, maps the manufacturing
                path, and connects you with verified Chinese factories that can make it.
              </p>
            </Reveal>

            {/* Entry space — task start → requirement flow */}
            <Reveal delay={0.28}>
              <div className="mt-7" style={{ minHeight: 270 }}>
                <AnimatePresence mode="wait">
                  {status !== "result" ? (
                    <motion.div
                      key="entry"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <div className="border" style={{ borderColor: LINE_D, background: "#FBFAF6" }}>
                        <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: LINE }}>
                          <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>
                            Start a sourcing task
                          </span>
                          {fileName ? (
                            <span className="mono" style={{ fontSize: 9, letterSpacing: "0.04em", color: ACCENT }}>
                              attached: {fileName}
                            </span>
                          ) : (
                            <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>
                              Task 01
                            </span>
                          )}
                        </div>
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(text);
                          }}
                          rows={2}
                          placeholder="Describe the part — material, quantity, tolerance, certification…"
                          className="display w-full bg-transparent px-5 py-3.5 text-[18px] font-medium leading-snug tracking-[-0.01em] outline-none"
                          style={{ color: INK }}
                        />
                        <div className="flex flex-wrap items-center justify-between gap-4 border-t px-5 py-4" style={{ borderColor: LINE }}>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => submit(text)}
                              className="display px-7 py-3 text-[14px] font-semibold tracking-[-0.01em] text-white transition-colors"
                              style={{ background: INK }}
                            >
                              Start task
                            </button>
                            <button
                              onClick={() => fileRef.current?.click()}
                              className="mono px-4 py-3 text-[10px] tracking-[0.14em] uppercase transition-colors"
                              style={{ color: DIM }}
                            >
                              Upload specification
                            </button>
                            <input ref={fileRef} type="file" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
                          </div>
                          <span className="mono hidden sm:block" style={{ fontSize: 9, letterSpacing: "0.14em", color: FAINT, textTransform: "uppercase" }}>
                            ⌘/Ctrl + Enter to start
                          </span>
                        </div>
                      </div>

                      {/* real sourcing scenarios */}
                      <div className="mt-4">
                        <p className="mono mb-2.5" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>
                          Real sourcing scenarios — click to start
                        </p>
                        <div className="flex flex-col items-start gap-2">
                          {EXAMPLES.map((ex, i) => (
                            <button
                              key={ex.title}
                              onClick={() => {
                                setExampleIndex(i);
                                submit(ex.body);
                              }}
                              className="group mono flex items-baseline gap-3 text-left transition-colors"
                              style={{ fontSize: 11.5, letterSpacing: "0.02em", color: DIM }}
                            >
                              <span className="inline-block h-[6px] w-[6px] translate-y-[-1px]" style={{ background: exampleIndex === i ? ACCENT : LINE_D }} />
                              <span>
                                <span className="font-semibold" style={{ color: exampleIndex === i ? INK : undefined }}>{ex.title}</span>
                                <span style={{ color: FAINT }}> — {ex.body}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      {/* flow progress rail */}
                      <div className="mb-5 flex items-center gap-2">
                        {FLOW_STAGES.map((stage, i) => (
                          <motion.div
                            key={stage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 + i * 0.42, duration: 0.4, ease: EASE }}
                            className="flex items-center gap-2"
                          >
                            <span
                              className="inline-block h-[7px] w-[7px]"
                              style={{ background: ACCENT }}
                            />
                            <span className="mono whitespace-nowrap" style={{ fontSize: 8, letterSpacing: "0.16em", color: DIM, textTransform: "uppercase" }}>
                              {stage}
                            </span>
                            {i < FLOW_STAGES.length - 1 && <span className="hidden sm:block" style={{ width: 18, height: 1, background: LINE_D }} />}
                          </motion.div>
                        ))}
                      </div>

                      {/* staged flow rows */}
                      <div className="border" style={{ borderColor: LINE_D, background: "#FBFAF6" }}>
                        <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: LINE }}>
                          <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>
                            Sourcing task recognized
                          </span>
                          {fileName && (
                            <span className="mono" style={{ fontSize: 9, letterSpacing: "0.04em", color: FAINT }}>
                              {fileName}
                            </span>
                          )}
                        </div>
                        <FlowRow index={0} label="Requirement understanding" value={`${parsed.product} · ${parsed.industry}`} />
                        <FlowRow index={1} label="Manufacturing path" value={parsed.process} />
                        <FlowRow index={2} label="Matching capability" value={parsed.capability} />
                        <FlowRow index={3} label="Supply chain coverage" value={parsed.coverage} />
                        <div className="flex flex-wrap items-center justify-between gap-4 border-t px-5 py-4" style={{ borderColor: LINE }}>
                          {parsed.factories !== null ? (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.9, duration: 0.5, ease: EASE }}
                              className="display text-[17px] font-semibold tracking-[-0.01em]"
                              style={{ color: ACCENT }}
                            >
                              Qualified manufacturing capabilities identified
                            </motion.p>
                          ) : (
                            <p className="mono text-[11px]" style={{ color: DIM }}>
                              {parsed.note ?? "Refine your requirement to narrow the match."}
                            </p>
                          )}
                          <div className="flex items-center gap-4">
                            <button onClick={reset} className="mono text-[10px] tracking-[0.14em] uppercase transition-colors" style={{ color: DIM }}>
                              Edit task
                            </button>
                            <button className="display border px-5 py-2.5 text-[13px] font-semibold tracking-[-0.01em] transition-colors" style={{ borderColor: LINE_D, color: INK }}>
                              Review factories
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {status === "analyzing" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mono mt-4"
                    style={{ fontSize: 10, letterSpacing: "0.14em", color: ACCENT, textTransform: "uppercase" }}
                  >
                    Reading requirement…
                  </motion.p>
                )}
              </div>
            </Reveal>

            {/* supported line */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                Supported
              </span>
              {SUPPORTED.map((s, i) => (
                <span key={s} className="mono flex items-center gap-3" style={{ fontSize: 10.5, letterSpacing: "0.08em", color: DIM }}>
                  {i > 0 && <span style={{ color: LINE_D }}>·</span>}
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — capability evidence, not a background */}
        <div className="relative hidden h-[calc(100vh-188px)] lg:block">
          <div className="absolute right-0 top-0 h-full w-[92%] overflow-hidden" style={{ background: PAPER_D }}>
            {HERO.asset ? (
              <>
                <img
                  src={HERO.asset.path}
                  alt={HERO.asset.filename}
                  className="h-full w-full"
                  style={{ objectFit: "cover", filter: "saturate(0.94) contrast(1.04)" }}
                />
                <div className="absolute inset-0" style={{ background: "rgba(23,25,26,0.10)" }} />
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.2em", color: FAINT }}>
                  NO ASSET
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 border-t px-5 py-4" style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(23,25,26,0.72)", backdropFilter: "blur(2px)" }}>
              <div className="mono flex items-center justify-between" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>
                <span>Verified manufacturing network</span>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>CNC · ISO 9001</span>
              </div>
            </div>

            {showDebug && HERO.asset && (
              <div className="mono absolute left-2 top-2 z-10 px-2 py-1.5 text-white" style={{ fontSize: 8, lineHeight: 1.5, letterSpacing: "0.04em", background: "rgba(10,12,13,0.8)" }}>
                <span style={{ color: "#FFB38A" }}>[Asset Debug]</span>
                <br />
                file: {HERO.asset.filename}
                <br />
                role: {HERO.role}
                <br />
                id: {HERO.asset.asset_id}
                <br />
                score: {HERO.asset.quality_score}
              </div>
            )}
          </div>
        </div>
      </div>

              {/* BOTTOM — manufacturing capability journey (process narrative) */}
      <div id="evidence" className="relative z-10 w-full border-t" style={{ borderColor: LINE_D, background: INK }}>
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-2 md:px-10">
          <span className="mono flex items-center gap-2.5" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>
            <span className="inline-block h-[6px] w-[6px]" style={{ background: ACCENT }} />
            Manufacturing capability journey
          </span>
          <span className="mono hidden md:block" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
            Verified · ISO 9001 · Export-ready
          </span>
        </div>
        <div className="mx-auto flex w-full max-w-[1500px] items-center">
          {JOURNEY.map((stage, i) => (
            <div key={stage.label} className="flex min-w-0 flex-1 items-center">
              <div className="group relative h-[74px] min-w-0 flex-1 overflow-hidden">
                {stage.res.asset ? (
                  <img
                    src={stage.res.asset.path}
                    alt={stage.res.asset.filename}
                    className="h-full w-full"
                    style={{ objectFit: "cover", filter: "grayscale(0.55) contrast(1.08)" }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center" style={{ background: PAPER_D }}>
                    <span className="mono" style={{ fontSize: 8, letterSpacing: "0.18em", color: FAINT }}>NO ASSET</span>
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: "rgba(23,25,26,0.30)" }} />
                <div className="absolute left-3 top-2.5 right-3">
                  <div className="mono flex items-center gap-2" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: "rgba(255,255,255,0.9)", textTransform: "uppercase" }}>
                    <span className="inline-block h-[6px] w-[6px]" style={{ background: ACCENT }} />
                    {stage.label}
                  </div>
                  <div className="mono mt-1" style={{ fontSize: 8, letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>
                    {stage.sub}
                  </div>
                </div>
                {showDebug && stage.res.asset && (
                  <div className="mono absolute bottom-1 left-3" style={{ fontSize: 7, letterSpacing: "0.06em", color: "rgba(255,255,255,0.6)" }}>
                    [Asset Debug] {stage.res.asset.filename} · {stage.res.role} · {stage.res.asset.quality_score}
                  </div>
                )}
              </div>
              {i < JOURNEY.length - 1 && (
                <div className="flex shrink-0 items-center justify-center" style={{ width: 30, color: "rgba(255,255,255,0.5)" }}>
                  <span className="mono text-[13px]">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* one flow row: tick + stage label + value, revealed in sequence */
function FlowRow({ index, label, value }: { index: number; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.32 + index * 0.42, duration: 0.45, ease: EASE }}
      className="flex items-baseline justify-between gap-6 border-b px-5 py-3.5"
      style={{ borderColor: LINE }}
    >
      <span className="mono flex items-center gap-2.5 whitespace-nowrap" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: DIM, textTransform: "uppercase" }}>
        <span className="inline-block h-[5px] w-[5px]" style={{ background: ACCENT }} />
        {label}
      </span>
      <span className="display text-right text-[15px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>
        {value}
      </span>
    </motion.div>
  );
}
