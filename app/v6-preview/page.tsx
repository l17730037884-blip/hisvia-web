"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
  animate,
} from "framer-motion";
import { queryAssets, resolveAsset } from "@/lib/content-v2/asset-library";
import type { AssetEntry, VisualRole } from "@/lib/content-v2/types";

/* ============================================================
   HISVIA V6 — Visual DNA Reset (visual experiment)
   From "clean B2B industrial website" to
   "premium global industrial supply chain brand".

   DNA changes vs V5:
   - Rhythm: DARK / LIGHT / DARK / LIGHT documentary alternation
   - Hero = brand visual event (70%+ image, no cards, no info box)
   - Supply Network = industrial capability map (Apple-like)
   - Factory Network = scroll-driven factory story
   - Motion = parallax, count-up, sticky storytelling, scroll reveal
   - Imagery roles = hero / process / proof / story (emotion, not filler)
   ============================================================ */

/* ---------- tokens ---------- */
const NIGHT = "#0A0C0D";
const NIGHT2 = "#101315";
const NIGHT3 = "#161A1D";
const PAPER = "#F2F1EC";
const INK = "#101315";
const DIM = "#8B9398";
const FAINT_D = "#5A6267";
const LINE_D = "#22272B";
const LINE_L = "#DAD8D0";
const ACCENT = "#E34D0E";
const BRASS = "#C89B5A";
const GREEN = "#2FA26A";
const DISPLAY = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
const MONO = `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CSS = `
  .v6 { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; background: ${NIGHT}; color: #F1F2EE; }
  .v6 .mono { font-family: ${MONO}; }
  .v6 .display { font-family: ${DISPLAY}; }
  .v6 ::selection { background: rgba(227,77,14,0.4); }
  .v6 img { -webkit-user-drag: none; user-select: none; }
`;

/* ---------- asset resolution (global no-repeat, role-aware) ---------- */
interface ResolvedAsset {
  asset: AssetEntry | null;
  role: string;
}
interface SlotSpec {
  key: string;
  v3Role: string;
  v2Roles: VisualRole[];
  minQuality: number;
  pin?: string;
}

const SLOT_SPECS: SlotSpec[] = [
  { key: "hero", v3Role: "hero_industrial", v2Roles: ["system_showcase"], minQuality: 85, pin: "asset-ef236563" },
  { key: "map_air", v3Role: "system_showcase", v2Roles: ["system_showcase"], minQuality: 80 },
  { key: "map_hyd", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "map_pneu", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "map_filt", v3Role: "system_showcase", v2Roles: ["system_showcase"], minQuality: 80 },
  { key: "map_pumpvalve", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "map_auto", v3Role: "proof", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "map_mech", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "map_maint", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "break_img", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "story_a", v3Role: "story", v2Roles: ["trust_evidence"], minQuality: 80 },
  { key: "story_b", v3Role: "proof", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "story_c", v3Role: "story", v2Roles: ["trust_evidence"], minQuality: 80 },
  { key: "story_d", v3Role: "story", v2Roles: ["trust_evidence"], minQuality: 80 },
  { key: "partner_buyer", v3Role: "hero_industrial", v2Roles: ["system_showcase"], minQuality: 80 },
  { key: "partner_factory", v3Role: "story", v2Roles: ["brand_partner", "trust_evidence"], minQuality: 40 },
];

function resolveAll(): Record<string, ResolvedAsset> {
  const used = new Set<string>();
  const out: Record<string, ResolvedAsset> = {};
  for (const spec of SLOT_SPECS) {
    const asset = spec.pin ? resolveAsset(spec.pin) : (queryAssets({
      visual_role: spec.v2Roles,
      min_quality: spec.minQuality,
      sort_by: "quality_score",
      limit: 1,
      excludeIds: [...used],
    })[0] ?? null);
    if (asset) used.add(asset.asset_id);
    out[spec.key] = { asset, role: spec.v3Role };
  }
  return out;
}

const A = resolveAll();

function Img({
  res,
  className,
  style,
  showDebug,
}: {
  res: ResolvedAsset;
  className?: string;
  style?: React.CSSProperties;
  showDebug: boolean;
}) {
  if (!res.asset) {
    return (
      <div className={className} style={{ background: NIGHT2, ...style }}>
        <span className="mono absolute inset-0 flex items-center justify-center" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: FAINT_D }}>
          NO ASSET
        </span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      <img src={res.asset.path} alt={res.asset.filename} loading="lazy" className="h-full w-full" style={{ objectFit: "cover" }} />
      {showDebug && (
        <div className="mono absolute left-1.5 top-1.5 z-10 bg-black/75 px-1.5 py-1" style={{ fontSize: 8, lineHeight: 1.5, letterSpacing: "0.04em", color: "#fff" }}>
          <span style={{ color: "#FFB38A" }}>[Asset Debug]</span>
          <br />
          file: {res.asset.filename}
          <br />
          role: {res.role}
          <br />
          id: {res.asset.asset_id}
          <br />
          score: {res.asset.quality_score}
        </div>
      )}
    </div>
  );
}

/* ---------- motion atoms ---------- */
function CountUp({ to, suffix = "", prefix = "", duration = 1.8 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

function ParallaxImg({
  res,
  className,
  style,
  showDebug,
  speed = 0.12,
}: {
  res: ResolvedAsset;
  className?: string;
  style?: React.CSSProperties;
  showDebug: boolean;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      <motion.img
        src={res.asset?.path}
        alt={res.asset?.filename ?? ""}
        loading="lazy"
        className="absolute inset-0 h-[130%] w-full"
        style={{ y, objectFit: "cover" }}
      />
      {showDebug && res.asset && (
        <div className="mono absolute left-1.5 top-1.5 z-10 bg-black/75 px-1.5 py-1" style={{ fontSize: 8, lineHeight: 1.5, letterSpacing: "0.04em", color: "#fff" }}>
          <span style={{ color: "#FFB38A" }}>[Asset Debug]</span>
          <br />
          file: {res.asset.filename} · {res.role} · {res.asset.quality_score}
        </div>
      )}
    </div>
  );
}

function Reveal({ children, delay = 0, y = 34 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function V6Preview() {
  const [showDebug, setShowDebug] = useState(false);
  useEffect(() => {
    setShowDebug(new URLSearchParams(window.location.search).has("debug"));
  }, []);

  return (
    <main className="v6 relative min-h-screen overflow-x-clip">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Header />
      <Hero showDebug={showDebug} />
      <StatsStrip />
      <CapabilityMap showDebug={showDebug} />
      <ImageBreak showDebug={showDebug} />
      <FactoryStory showDebug={showDebug} />
      <HowItWorks />
      <PartnershipCTA showDebug={showDebug} />
      <Footer />
    </main>
  );
}

/* ============================================================
   0. HEADER (dark, minimal)
   ============================================================ */
const NAV = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Factory Story", href: "#factory-story" },
  { label: "Process", href: "#process" },
  { label: "Partners", href: "#partners" },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ background: "linear-gradient(180deg, rgba(10,12,13,0.85), transparent)", borderBottom: "1px solid rgba(241,242,238,0.08)" }}>
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="h-3 w-3" style={{ background: ACCENT }} />
          <span className="display text-[18px] font-bold tracking-[-0.02em] text-white">HISVIA</span>
          <span className="mono ml-2 hidden border-l pl-3 lg:block" style={{ borderColor: "rgba(241,242,238,0.18)", fontSize: 8.5, letterSpacing: "0.24em", color: "rgba(241,242,238,0.55)", textTransform: "uppercase" }}>
            China Industrial Manufacturing Network
          </span>
        </a>
        <nav className="mono hidden items-center gap-9 lg:flex" style={{ fontSize: 10.5, letterSpacing: "0.14em", color: "rgba(241,242,238,0.72)", textTransform: "uppercase" }}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-white">
              {n.label}
            </a>
          ))}
          <a
            href="#partners"
            className="border border-white/30 px-5 py-2.5 text-[11px] tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-[#0A0C0D]"
          >
            Find Manufacturing Partners
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   1. HERO — brand visual event (DARK, full-bleed)
   ============================================================ */
function Hero({ showDebug }: { showDebug: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.22]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen flex-col justify-end overflow-hidden" style={{ background: NIGHT }}>
      {/* full-bleed image — 70%+ of screen */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <div style={{ position: "absolute", inset: 0, filter: "brightness(0.78) contrast(1.1) saturate(0.92)" }}>
            <Img res={A.hero} className="h-full w-full" showDebug={showDebug} />
          </div>
        </motion.div>
      </motion.div>
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 40%, rgba(10,12,13,0.15), rgba(10,12,13,0.62) 70%, rgba(10,12,13,0.94) 100%)" }} />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 240px rgba(0,0,0,0.65)" }} />

      <motion.div className="relative mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-10 lg:pb-28" style={{ opacity: fade }}>
        <motion.p
          className="mono mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{ fontSize: 10, letterSpacing: "0.28em", color: BRASS, textTransform: "uppercase" }}
        >
          <span className="h-px w-10" style={{ background: BRASS }} />
          A premium network of verified Chinese manufacturing
        </motion.p>

        <motion.h1
          className="display max-w-[1120px] font-bold text-white"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          style={{ fontSize: "clamp(40px,6.2vw,92px)", lineHeight: 1.0, letterSpacing: "-0.035em" }}
        >
          Your Gateway to China&apos;s Industrial Manufacturing Network
        </motion.h1>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        >
          <a
            href="#partners"
            className="group flex items-center gap-3 border-b pb-1 text-[15px] font-semibold text-white transition-colors hover:text-[#E34D0E]"
            style={{ borderColor: "rgba(241,242,238,0.4)" }}
          >
            Find manufacturing partners
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </a>
          <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.22em", color: "rgba(241,242,238,0.5)", textTransform: "uppercase" }}>
            8 industrial systems · 3,142 verified factories
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   2. STATS STRIP (DARK, count-up)
   ============================================================ */
function StatsStrip() {
  const stats = [
    { v: 3142, s: "", l: "verified factories" },
    { v: 24, s: "", l: "countries served" },
    { v: 8, s: "", l: "industrial systems" },
    { v: 96, s: "%", l: "avg. quality score" },
  ];
  return (
    <section className="border-b" style={{ borderColor: LINE_D, background: NIGHT }}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px px-6 md:grid-cols-4 md:px-10" style={{ background: LINE_D }}>
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08}>
            <div className="px-2 py-10 lg:px-6" style={{ background: NIGHT }}>
              <div className="display text-[clamp(34px,3.6vw,52px)] font-bold tracking-[-0.02em]" style={{ color: "#fff" }}>
                <CountUp to={s.v} suffix={s.s} />
              </div>
              <div className="mono mt-2" style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT_D, textTransform: "uppercase" }}>
                {s.l}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   3. CAPABILITY MAP (LIGHT editorial, Apple-like selector)
   ============================================================ */
interface SystemInfo {
  name: string;
  sub: string;
  img: ResolvedAsset;
  desc: string;
  applications: string[];
  components: string[];
  processes: string[];
  industries: string[];
  factories: number;
}
const SYSTEMS: Omit<SystemInfo, "img">[] = [
  {
    name: "Air Compressor Systems", sub: "Screw · piston · centrifugal", desc: "Complete compressed air supply — from air ends to filtration and control.",
    applications: ["Plant air supply", "Process air", "Mining ventilation"], components: ["Air ends", "Valves", "Separators", "Coolers"],
    processes: ["CNC machining", "Rotary assembly", "Pressure testing"], industries: ["Mining", "Manufacturing", "Energy"], factories: 312,
  },
  {
    name: "Hydraulic Systems", sub: "Cylinders · pumps · power units", desc: "High-pressure hydraulic components for heavy machinery and presses.",
    applications: ["Heavy machinery", "Press lines", "Mobile equipment"], components: ["Cylinders", "Pumps", "Valves", "Accumulators"],
    processes: ["Casting", "Honing", "Assembly"], industries: ["Construction", "Mining", "Manufacturing"], factories: 247,
  },
  {
    name: "Pneumatic Automation", sub: "Actuators · FRL · tubing", desc: "Motion and control components for automated production lines.",
    applications: ["Automated lines", "Packaging", "Robotics"], components: ["Cylinders", "Directional valves", "FRL units"],
    processes: ["Injection molding", "Precision turning", "Subassembly"], industries: ["Manufacturing", "Automation", "Food & beverage"], factories: 268,
  },
  {
    name: "Industrial Filtration", sub: "Air · oil · fuel · hydraulic", desc: "Filtration elements and housings engineered for contamination control.",
    applications: ["Air filtration", "Oil purification", "Return lines"], components: ["Filter elements", "Cartridges", "Housings"],
    processes: ["Media layering", "Winding", "Leak testing"], industries: ["Energy", "Automotive", "Process"], factories: 154,
  },
  {
    name: "Pumps & Valves", sub: "Flow control · dosing", desc: "Fluid handling with certified flow-control and dosing components.",
    applications: ["Fluid handling", "Dosing systems", "Flow control"], components: ["Centrifugal pumps", "Gate valves", "Ball valves"],
    processes: ["Metal forming", "Stamping", "Finishing"], industries: ["Water", "Oil & gas", "Chemicals"], factories: 201,
  },
  {
    name: "Automation & Control", sub: "PLC · sensors · drives", desc: "Line automation and machine control from sensor to cabinet.",
    applications: ["Line automation", "Machine control", "Remote monitoring"], components: ["PLCs", "Sensors", "Drives", "Panels"],
    processes: ["Calibration", "Instrument assembly", "Functional testing"], industries: ["Manufacturing", "Energy", "Logistics"], factories: 176,
  },
  {
    name: "Mechanical Components", sub: "Bearings · seals · gears", desc: "Transmission and motion components machined to tight tolerance.",
    applications: ["Power transmission", "Motion control", "Structural parts"], components: ["Bearings", "Seals", "Couplings", "Gears"],
    processes: ["Precision machining", "Heat treatment", "Grinding"], industries: ["Industrial", "Automotive", "Machinery"], factories: 189,
  },
  {
    name: "Industrial Maintenance", sub: "Spares · MRO · tooling", desc: "Sustained uptime through verified spares, MRO kits and tooling.",
    applications: ["Downtime reduction", "Scheduled maintenance", "Consumable supply"], components: ["Spare parts", "MRO kits", "Wear parts"],
    processes: ["Reverse engineering", "Batch machining", "Inspection"], industries: ["Mining", "Cement", "Energy"], factories: 148,
  },
];
const SYSTEM_IMG: Record<string, ResolvedAsset> = {
  "Air Compressor Systems": A.map_air,
  "Hydraulic Systems": A.map_hyd,
  "Pneumatic Automation": A.map_pneu,
  "Industrial Filtration": A.map_filt,
  "Pumps & Valves": A.map_pumpvalve,
  "Automation & Control": A.map_auto,
  "Mechanical Components": A.map_mech,
  "Industrial Maintenance": A.map_maint,
};

function CapabilityMap({ showDebug }: { showDebug: boolean }) {
  const [idx, setIdx] = useState(0);
  const cur = SYSTEMS[idx];

  return (
    <section id="capabilities" className="border-b py-24 lg:py-36" style={{ borderColor: LINE_L, background: PAPER, color: INK }}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mono mb-5 flex items-center gap-3" style={{ fontSize: 10, letterSpacing: "0.26em", color: "#C4440B", textTransform: "uppercase" }}>
                <span className="h-px w-10" style={{ background: "#C4440B" }} />
                Industrial capability map
              </p>
              <h2 className="display text-[clamp(34px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.03em]">
                Eight systems.<br />
                One supply chain.
              </h2>
            </div>
            <p className="max-w-[440px] justify-self-start text-[15px] leading-relaxed lg:justify-self-end" style={{ color: "#5C646A" }}>
              Select a system to see how HISVIA covers it — applications, components, processes and the industries it serves.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          {/* left — sticky index */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-t" style={{ borderColor: "#C9C7BD" }}>
              {SYSTEMS.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setIdx(i)}
                  className="group flex w-full items-baseline justify-between gap-4 border-b px-1 py-4 text-left transition-colors"
                  style={{ borderColor: "#DAD8D0" }}
                >
                  <span className="mono mr-4 shrink-0" style={{ fontSize: 9.5, letterSpacing: "0.14em", color: i === idx ? "#C4440B" : "#9AA1A7" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="flex-1 text-[17px] font-semibold transition-colors"
                    style={{ color: i === idx ? INK : "#8A8F8F", letterSpacing: "-0.01em" }}
                  >
                    {s.name}
                  </span>
                  <span className="mono text-[11px] tabular-nums transition-colors" style={{ color: i === idx ? "#C4440B" : "#B4B2A9" }}>
                    {s.factories}
                  </span>
                </button>
              ))}
            </div>
            <p className="mono mt-5" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: "#9AA1A7", textTransform: "uppercase" }}>
              Factory counts — verified 2026-06
            </p>
          </div>

          {/* right — dynamic panel */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="relative aspect-[16/9] overflow-hidden border" style={{ borderColor: "#C9C7BD" }}>
                  <Img res={SYSTEM_IMG[cur.name]} className="h-full w-full" showDebug={showDebug} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,12,13,0.05), rgba(10,12,13,0.5))" }} />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                    <div>
                      <div className="display text-[22px] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                        {cur.name}
                      </div>
                      <div className="mono mt-1" style={{ fontSize: 9, letterSpacing: "0.16em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>
                        {cur.sub}
                      </div>
                    </div>
                    <div className="mono shrink-0 border px-3 py-2 text-right" style={{ borderColor: "rgba(255,255,255,0.4)", background: "rgba(10,12,13,0.55)", fontSize: 9, letterSpacing: "0.1em", color: "#fff" }}>
                      <CountUp to={cur.factories} suffix=" factories" />
                    </div>
                  </div>
                </div>

                <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed" style={{ color: "#5C646A" }}>
                  {cur.desc}
                </p>

                <div className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { h: "Applications", items: cur.applications },
                    { h: "Components", items: cur.components },
                    { h: "Processes", items: cur.processes },
                    { h: "Industries", items: cur.industries },
                  ].map((col) => (
                    <div key={col.h}>
                      <div className="mono mb-2.5 border-b pb-1.5" style={{ borderColor: "#DAD8D0", fontSize: 8.5, letterSpacing: "0.18em", color: "#C4440B", textTransform: "uppercase" }}>
                        {col.h}
                      </div>
                      <ul className="space-y-1.5">
                        {col.items.map((i) => (
                          <li key={i} className="text-[12.5px]" style={{ color: "#5C646A" }}>
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. IMAGE BREAK (DARK full-width, parallax statement)
   ============================================================ */
function ImageBreak({ showDebug }: { showDebug: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section id="process" ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden" style={{ background: NIGHT }}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div className="absolute inset-0" style={{ scale: 1.12 }}>
          <Img res={A.break_img} className="h-full w-full" showDebug={showDebug} />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,12,13,0.82) 0%, rgba(10,12,13,0.35) 55%, rgba(10,12,13,0.72) 100%)" }} />
      <Reveal>
        <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <p className="mono mb-6 flex items-center gap-3" style={{ fontSize: 10, letterSpacing: "0.28em", color: BRASS, textTransform: "uppercase" }}>
            <span className="h-px w-10" style={{ background: BRASS }} />
            Capability, verified
          </p>
          <blockquote className="display max-w-[760px] text-[clamp(28px,3.6vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            We don&apos;t introduce factories. We document the capability behind every part.
          </blockquote>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   5. FACTORY STORY (scroll-driven storytelling)
   ============================================================ */
const STORY_STEPS = [
  {
    label: "Production capability",
    title: "A factory that builds what you need",
    desc: "Every factory is selected for the processes your part demands — machining, casting, molding or assembly — not for a general catalog.",
    img: A.story_c,
    stat: { v: 96, s: "", l: "capability match" },
  },
  {
    label: "Quality & inspection",
    title: "Measured, not claimed",
    desc: "Samples are dimensionally checked against your drawing. In-line QC reports accompany every milestone.",
    img: A.story_b,
    stat: { v: 100, s: "%", l: "sample verification" },
  },
  {
    label: "Export & delivery",
    title: "From the workshop to your door",
    desc: "Documentation, compliance and logistics are managed end to end — DDP to EU and US markets.",
    img: A.story_d,
    stat: { v: 40, s: "%", l: "EU export share" },
  },
];

function StoryStep({
  step,
  index,
  onActive,
}: {
  step: (typeof STORY_STEPS)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (inView) {
      onActive(index);
      setOn(true);
    } else {
      setOn(false);
    }
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="border-b py-8 transition-opacity duration-500" style={{ borderColor: "#DAD8D0", opacity: on ? 1 : 0.3 }}>
      <div className="mono mb-2" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#C4440B", textTransform: "uppercase" }}>
        {String(index + 1).padStart(2, "0")} — {step.label}
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="display max-w-[400px] text-[22px] font-bold leading-tight tracking-[-0.02em]">{step.title}</h3>
        <span className="mono shrink-0 text-[30px] font-bold tabular-nums" style={{ color: "#C4440B" }}>
          <CountUp to={step.stat.v} suffix={step.stat.s} />
        </span>
      </div>
      <p className="mt-2 max-w-[420px] text-[13.5px] leading-relaxed" style={{ color: "#5C646A" }}>
        {step.desc}
      </p>
      <div className="mono mt-2" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: "#9AA1A7", textTransform: "uppercase" }}>
        {step.stat.l}
      </div>
    </div>
  );
}

function FactoryStory({ showDebug }: { showDebug: boolean }) {
  const [active, setActive] = useState(0);
  const onActive = useCallback((i: number) => setActive((prev) => (prev === i ? prev : i)), []);

  return (
    <section id="factory-story" className="border-b py-24 lg:py-36" style={{ borderColor: LINE_L, background: PAPER, color: INK }}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="mb-16 max-w-[720px]">
            <p className="mono mb-5 flex items-center gap-3" style={{ fontSize: 10, letterSpacing: "0.26em", color: "#C4440B", textTransform: "uppercase" }}>
              <span className="h-px w-10" style={{ background: "#C4440B" }} />
              Factory story
            </p>
            <h2 className="display text-[clamp(34px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.03em]">
              A factory is a story, not a listing.
            </h2>
          </div>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* left — image swaps as steps enter view */}
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[16/10] overflow-hidden border" style={{ borderColor: "#C9C7BD" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Img res={STORY_STEPS[active].img} className="h-full w-full" showDebug={showDebug} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-3 left-3 border px-2.5 py-1.5" style={{ borderColor: "rgba(255,255,255,0.5)", background: "rgba(10,12,13,0.6)" }}>
                <span className="mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "#fff", textTransform: "uppercase" }}>
                  {String(active + 1).padStart(2, "0")} / {STORY_STEPS.length} — {STORY_STEPS[active].label}
                </span>
              </div>
            </div>
          </div>

          {/* right — steps drive the image */}
          <div className="relative">
            {STORY_STEPS.map((s, i) => (
              <StoryStep key={s.label} step={s} index={i} onActive={onActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. HOW IT WORKS (DARK, scroll-fill line)
   ============================================================ */
const WORKS = [
  { label: "Requirement", title: "Tell us what you need", desc: "Drawings, target price and delivery expectations. Scope confirmed within one business day.", data: "24h scope confirmation" },
  { label: "Supplier identification", title: "Capability-matched shortlist", desc: "Factories are matched by process, material and tolerance — never by a generic directory.", data: "8 systems indexed" },
  { label: "Factory verification", title: "Evidence, not promises", desc: "On-site audits and document checks verify equipment, capacity and export history.", data: "4-stage audit" },
  { label: "Quality control", title: "Samples before production", desc: "Pre-production samples inspected against your spec, with milestone QC reports.", data: "QC ≥ 90 threshold" },
  { label: "Delivery support", title: "To your door, documented", desc: "Export documentation, compliance and logistics handled end to end.", data: "DDP · EU · US" },
];

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative border-b py-28 lg:py-40" style={{ borderColor: LINE_D, background: NIGHT }}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="mb-20 max-w-[720px]">
            <p className="mono mb-5 flex items-center gap-3" style={{ fontSize: 10, letterSpacing: "0.28em", color: BRASS, textTransform: "uppercase" }}>
              <span className="h-px w-10" style={{ background: BRASS }} />
              How HISVIA works
            </p>
            <h2 className="display text-[clamp(34px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
              One partner from requirement to delivery.
            </h2>
          </div>
        </Reveal>

        <div className="relative mx-auto max-w-[860px]">
          <div className="absolute bottom-8 left-[5px] top-2 w-px" style={{ background: LINE_D }} />
          <motion.div className="absolute bottom-8 left-[5px] top-2 w-px origin-top" style={{ scaleY: lineScale, background: ACCENT }} />

          <div className="space-y-14">
            {WORKS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.04}>
                <div className="relative pl-12">
                  <span className="absolute left-0 top-1.5 flex h-[11px] w-[11px] rounded-full border-2" style={{ borderColor: ACCENT, background: NIGHT }} />
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.22em", color: BRASS, textTransform: "uppercase" }}>
                      {s.label}
                    </span>
                    <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.12em", color: FAINT_D, textTransform: "uppercase" }}>
                      {s.data}
                    </span>
                  </div>
                  <h3 className="display mt-2 text-[24px] font-bold tracking-[-0.02em] text-white">{s.title}</h3>
                  <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed" style={{ color: DIM }}>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. PARTNERSHIP CTA (LIGHT, two cinematic panels)
   ============================================================ */
function PartnershipCTA({ showDebug }: { showDebug: boolean }) {
  return (
    <section id="partners" className="py-24 lg:py-36" style={{ background: PAPER, color: INK }}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="mb-14 max-w-[760px]">
            <p className="mono mb-5 flex items-center gap-3" style={{ fontSize: 10, letterSpacing: "0.26em", color: "#C4440B", textTransform: "uppercase" }}>
              <span className="h-px w-10" style={{ background: "#C4440B" }} />
              Partners
            </p>
            <h2 className="display text-[clamp(34px,4.2vw,60px)] font-bold leading-[1.02] tracking-[-0.03em]">
              Two ways into the network.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {[
            {
              img: A.partner_buyer,
              tag: "For buyers",
              title: "Find your China manufacturing partner",
              desc: "Send your requirement. Get matched with verified factories that can actually build it.",
              cta: "Start sourcing",
            },
            {
              img: A.partner_factory,
              tag: "For factories",
              title: "Join the HISVIA supplier network",
              desc: "Pass our four-stage verification and reach overseas buyers with documented capability.",
              cta: "Become a partner",
            },
          ].map((p) => (
            <Reveal key={p.tag} delay={0.08}>
              <a href="#top" className="group relative block overflow-hidden border" style={{ borderColor: "#C9C7BD" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Img res={p.img} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" showDebug={showDebug} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,12,13,0.25), rgba(10,12,13,0.88))" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8">
                    <div className="mono mb-2 flex items-center gap-2" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: "#B9C0C5", textTransform: "uppercase" }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.tag === "For buyers" ? GREEN : ACCENT }} />
                      {p.tag}
                    </div>
                    <h3 className="display text-[24px] font-bold leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-[380px] text-[13px] leading-relaxed text-white/65">{p.desc}</p>
                    <span className="mono mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-white uppercase">
                      {p.cta}
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. FOOTER (DARK)
   ============================================================ */
function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: LINE_D, background: NIGHT }}>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3" style={{ background: ACCENT }} />
            <span className="display text-[18px] font-bold tracking-[-0.02em] text-white">HISVIA</span>
          </div>
          <p className="mono mt-4" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: FAINT_D, textTransform: "uppercase" }}>
            China Industrial Manufacturing Network
          </p>
          <p className="mt-5 max-w-[320px] text-[13px] leading-relaxed" style={{ color: DIM }}>
            A premium sourcing network connecting overseas buyers with verified Chinese manufacturing — from requirement to delivered goods.
          </p>
          <p className="mono mt-6" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: FAINT_D, textTransform: "uppercase" }}>
            ISO 9001 · NDA · GDPR
          </p>
        </div>
        {[
          { h: "Network", links: ["Capability map", "Factory story", "Verification", "Process"] },
          { h: "For buyers", links: ["Find manufacturing partners", "Quality control", "Delivery support"] },
          { h: "For factories", links: ["Join the network", "Export support", "Capacity"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="mono mb-4" style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT_D, textTransform: "uppercase" }}>
              {col.h}
            </div>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l} className="text-[12.5px] transition-colors hover:text-white" style={{ color: DIM }}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t" style={{ borderColor: LINE_D }}>
        <div className="mono mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-6 py-5 md:px-10" style={{ fontSize: 8.5, letterSpacing: "0.14em", color: FAINT_D, textTransform: "uppercase" }}>
          <span>© 2026 HISVIA · Hangzhou, China</span>
          <span>3,142 verified factories · 24 countries · 8 systems</span>
        </div>
      </div>
    </footer>
  );
}
