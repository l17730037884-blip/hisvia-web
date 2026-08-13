"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { queryAssets } from "@/lib/content-v2/asset-library";
import type { AssetEntry, VisualRole } from "@/lib/content-v2/types";

/* ============================================================
   HISVIA V5 — China Industrial Supply Chain Partner
   Not a marketplace. Not a SaaS landing page.
   A trusted sourcing network connecting overseas buyers
   with verified Chinese manufacturers.

   Sections:
   1. Industrial Hero
   2. Industrial Supply Network (8 systems)
   3. Verified Factory Network
   4. Industrial Solutions
   5. How HISVIA Works
   6. Partnership CTA

   Imagery resolves through the Asset Library API only.
   Every image carries asset_id / role / quality_score.
   ============================================================ */

/* ---------- tokens (premium industrial editorial, light) ---------- */
const PAPER = "#F4F3EE";
const WHITE = "#FFFFFF";
const INK = "#15191C";
const DIM = "#5C646A";
const FAINT = "#9AA1A7";
const LINE = "#E3E1D9";
const LINE2 = "#C9C7BD";
const ACCENT = "#C4440B";
const GREEN = "#1E7A4C";
const DISPLAY = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
const MONO = `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CSS = `
  .v5 { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; background: ${PAPER}; color: ${INK}; }
  .v5 .mono { font-family: ${MONO}; }
  .v5 .display { font-family: ${DISPLAY}; }
  .v5 input::placeholder, .v5 textarea::placeholder { color: #B4B2A9; }
  .v5 ::selection { background: rgba(196,68,11,0.16); }
  .v5 img { -webkit-user-drag: none; }
`;

/* ---------- asset resolution (V3 roles -> V2 library, global no-repeat) ---------- */
interface ResolvedAsset {
  asset: AssetEntry | null;
  role: string;
}

interface SlotSpec {
  key: string;
  v3Role: string;
  v2Roles: VisualRole[];
  minQuality: number;
}

/* Resolve in page order; every asset_id used exactly once. */
const SLOT_SPECS: SlotSpec[] = [
  { key: "hero", v3Role: "hero_industrial", v2Roles: ["system_showcase"], minQuality: 85 },
  { key: "sys_air", v3Role: "system_showcase", v2Roles: ["system_showcase"], minQuality: 80 },
  { key: "sys_hyd", v3Role: "system_showcase", v2Roles: ["system_showcase"], minQuality: 80 },
  { key: "sys_pneu", v3Role: "system_showcase", v2Roles: ["system_showcase"], minQuality: 80 },
  { key: "sys_filt", v3Role: "industrial_application", v2Roles: ["solution_application"], minQuality: 30 },
  { key: "sys_pumpvalve", v3Role: "industrial_application", v2Roles: ["solution_application"], minQuality: 30 },
  { key: "sys_auto", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "sys_mech", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "sys_maint", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "fac1", v3Role: "factory_verification", v2Roles: ["trust_evidence"], minQuality: 80 },
  { key: "fac2", v3Role: "factory_verification", v2Roles: ["trust_evidence"], minQuality: 80 },
  { key: "fac3", v3Role: "factory_verification", v2Roles: ["trust_evidence"], minQuality: 80 },
  { key: "sol_main", v3Role: "system_showcase", v2Roles: ["system_showcase"], minQuality: 80 },
  { key: "sol_chip1", v3Role: "industrial_application", v2Roles: ["solution_application"], minQuality: 25 },
  { key: "sol_chip2", v3Role: "industrial_application", v2Roles: ["solution_application"], minQuality: 25 },
  { key: "sol_chip3", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "sol_chip4", v3Role: "process_showcase", v2Roles: ["technical_detail"], minQuality: 40 },
  { key: "works_img1", v3Role: "factory_verification", v2Roles: ["trust_evidence"], minQuality: 80 },
  { key: "works_img2", v3Role: "factory_verification", v2Roles: ["trust_evidence"], minQuality: 80 },
  { key: "partner_buyer", v3Role: "hero_industrial", v2Roles: ["system_showcase"], minQuality: 80 },
  { key: "partner_factory", v3Role: "factory_verification", v2Roles: ["brand_partner", "trust_evidence"], minQuality: 40 },
];

function resolveAll(): Record<string, ResolvedAsset> {
  const used = new Set<string>();
  const out: Record<string, ResolvedAsset> = {};
  for (const spec of SLOT_SPECS) {
    const res = queryAssets({
      visual_role: spec.v2Roles,
      min_quality: spec.minQuality,
      sort_by: "quality_score",
      limit: 1,
      excludeIds: [...used],
    });
    const asset = res[0] ?? null;
    if (asset) used.add(asset.asset_id);
    out[spec.key] = { asset, role: spec.v3Role };
  }
  return out;
}

const A = resolveAll();
const SHOW_DEBUG = process.env.NODE_ENV === "development";

function Img({ res, className, style }: { res: ResolvedAsset; className?: string; style?: React.CSSProperties }) {
  if (!res.asset) {
    return (
      <div className={className} style={{ background: "#E9E7DF", ...style }}>
        <span className="mono absolute inset-0 flex items-center justify-center" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: FAINT }}>
          NO ASSET
        </span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      <img
        src={res.asset.path}
        alt={res.asset.filename}
        loading="lazy"
        className="h-full w-full"
        style={{ objectFit: "cover" }}
      />
      {SHOW_DEBUG && (
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

/* ---------- atoms ---------- */
function Reveal({ children, delay = 0, y = 28 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono mb-5 flex items-center gap-3" style={{ fontSize: 10.5, letterSpacing: "0.24em", color: ACCENT, textTransform: "uppercase" }}>
      <span className="h-px w-8" style={{ background: ACCENT }} />
      {children}
    </p>
  );
}

function SectionHead({ no, kicker, title, lede }: { no: string; kicker: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
      <div>
        <div className="mono mb-4 flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
          {no}
          <span className="h-px flex-1" style={{ background: LINE2 }} />
        </div>
        <Kicker>{kicker}</Kicker>
        <h2 className="display text-[clamp(30px,3.4vw,48px)] font-bold leading-[1.05] tracking-[-0.025em]">{title}</h2>
      </div>
      {lede && (
        <p className="max-w-[440px] justify-self-start text-[15px] leading-relaxed lg:justify-self-end" style={{ color: DIM }}>
          {lede}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function V5Preview() {
  return (
    <main className="v5 relative min-h-screen overflow-x-clip">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Header />
      <Hero />
      <SupplyNetwork />
      <FactoryNetwork />
      <IndustrialSolutions />
      <HowItWorks />
      <PartnershipCTA />
      <Footer />
    </main>
  );
}

/* ============================================================
   0. HEADER
   ============================================================ */
const NAV = [
  { label: "The Network", href: "#network" },
  { label: "Factories", href: "#factories" },
  { label: "Solutions", href: "#solutions" },
  { label: "How It Works", href: "#how-it-works" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: LINE, background: "rgba(244,243,238,0.9)", backdropFilter: "blur(14px)" }}>
      <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between px-6 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="h-3 w-3" style={{ background: ACCENT }} />
          <span className="display text-[19px] font-bold tracking-[-0.02em]">HISVIA</span>
          <span className="mono ml-2 hidden border-l pl-3 xl:block" style={{ borderColor: LINE2, fontSize: 9, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>
            China Industrial Supply Chain Partner
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="mono transition-colors hover:text-[#C4440B]" style={{ fontSize: 11.5, letterSpacing: "0.08em", color: DIM, textTransform: "uppercase" }}>
              {n.label}
            </a>
          ))}
          <a
            href="#partners"
            className="px-5 py-2.5 transition-opacity hover:opacity-85"
            style={{ background: INK, color: "#fff", fontSize: 12, letterSpacing: "0.08em", fontWeight: 600 }}
          >
            Start Sourcing
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ============================================================
   1. INDUSTRIAL HERO
   ============================================================ */
const HERO_STATS = [
  { v: "3,142", l: "verified factories" },
  { v: "24", l: "countries served" },
  { v: "8", l: "industrial systems" },
  { v: "96%", l: "avg. quality score" },
];

function Hero() {
  return (
    <section id="top" className="relative border-b" style={{ borderColor: LINE, background: PAPER }}>
      <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-6 pb-20 pt-16 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-24">
        <div>
          <Reveal>
            <p className="mono flex items-center gap-3" style={{ fontSize: 10.5, letterSpacing: "0.24em", color: GREEN, textTransform: "uppercase" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
              China industrial supply chain partner
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-7 font-bold" style={{ fontSize: "clamp(40px,5vw,72px)", lineHeight: 1.02, letterSpacing: "-0.035em" }}>
              Your trusted gateway to Chinese industrial manufacturing.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[540px] text-[17px] leading-relaxed" style={{ color: DIM }}>
              Verified factories. Industrial components. OEM sourcing. Quality-controlled supply chains.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#partners"
                className="px-8 py-4 transition-opacity hover:opacity-85"
                style={{ background: INK, color: "#fff", fontSize: 14, letterSpacing: "0.04em", fontWeight: 600 }}
              >
                Find a Manufacturing Partner →
              </a>
              <a
                href="#network"
                className="border px-8 py-4 transition-colors hover:border-[#15191C]"
                style={{ borderColor: LINE2, color: INK, fontSize: 14, letterSpacing: "0.04em", fontWeight: 600 }}
              >
                Explore Capabilities
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={34}>
          <figure className="relative">
            <div className="relative aspect-[4/3] overflow-hidden border" style={{ borderColor: INK, background: "#E9E7DF" }}>
              <Img res={A.hero} className="h-full w-full" />
              <div className="absolute left-4 top-4 border px-2.5 py-1.5" style={{ borderColor: "rgba(255,255,255,0.55)", background: "rgba(21,25,28,0.55)", backdropFilter: "blur(6px)" }}>
                <span className="mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase" }}>
                  CNC precision machining · verified partner
                </span>
              </div>
            </div>
            <figcaption className="mono flex items-center justify-between border border-t-0 px-4 py-2.5" style={{ borderColor: INK, background: WHITE, fontSize: 9.5, letterSpacing: "0.14em", color: FAINT, textTransform: "uppercase" }}>
              <span>On-site audit · Zhejiang, China</span>
              <span style={{ color: GREEN }}>● verified 2026-06</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* editorial stat rule */}
      <div className="border-t" style={{ borderColor: LINE }}>
        <div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-px px-6 md:grid-cols-4 md:px-8" style={{ background: LINE }}>
          {HERO_STATS.map((s) => (
            <Reveal key={s.l} delay={0.1}>
              <div className="px-2 py-8 lg:px-6" style={{ background: PAPER }}>
                <div className="display text-[34px] font-bold tracking-[-0.02em] tabular-nums" style={{ color: INK }}>
                  {s.v}
                </div>
                <div className="mono mt-1.5" style={{ fontSize: 9.5, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   2. INDUSTRIAL SUPPLY NETWORK — 8 systems, hover exploration
   ============================================================ */
interface SystemInfo {
  key: string;
  img: ResolvedAsset;
  name: string;
  micro: string;
  applications: string[];
  components: string[];
  industries: string[];
}

const SYSTEMS: Omit<SystemInfo, "img">[] = [
  {
    key: "air",
    name: "Air Compressor Systems",
    micro: "Screw · piston · centrifugal",
    applications: ["Plant air supply", "Process air", "Mining ventilation"],
    components: ["Air ends", "Valves", "Filters", "Separators", "Coolers"],
    industries: ["Mining", "Manufacturing", "Energy"],
  },
  {
    key: "hyd",
    name: "Hydraulic Systems",
    micro: "Cylinders · pumps · power units",
    applications: ["Heavy machinery", "Press lines", "Mobile equipment"],
    components: ["Cylinders", "Pumps", "Valves", "Accumulators", "Seals"],
    industries: ["Construction", "Mining", "Manufacturing"],
  },
  {
    key: "pneu",
    name: "Pneumatic Automation",
    micro: "Actuators · FRL · tubing",
    applications: ["Automated lines", "Packaging", "Robotics"],
    components: ["Cylinders", "Directional valves", "FRL units", "Tubing"],
    industries: ["Manufacturing", "Automation", "Food & beverage"],
  },
  {
    key: "filt",
    name: "Industrial Filtration",
    micro: "Air · oil · fuel · hydraulic",
    applications: ["Air filtration", "Oil purification", "Hydraulic return lines"],
    components: ["Filter elements", "Cartridges", "Housings", "Bags", "Membranes"],
    industries: ["Energy", "Automotive", "Process"],
  },
  {
    key: "pumpvalve",
    name: "Pumps & Valves",
    micro: "Flow control · dosing",
    applications: ["Fluid handling", "Dosing systems", "Flow control"],
    components: ["Centrifugal pumps", "Diaphragm pumps", "Gate valves", "Ball valves"],
    industries: ["Water", "Oil & gas", "Chemicals"],
  },
  {
    key: "auto",
    name: "Automation & Control",
    micro: "PLC · sensors · drives",
    applications: ["Line automation", "Machine control", "Remote monitoring"],
    components: ["PLCs", "Sensors", "Drives", "Control panels", "Connectors"],
    industries: ["Manufacturing", "Energy", "Logistics"],
  },
  {
    key: "mech",
    name: "Mechanical Components",
    micro: "Bearings · seals · gears",
    applications: ["Power transmission", "Motion control", "Structural parts"],
    components: ["Bearings", "Seals", "Couplings", "Gears", "Fasteners"],
    industries: ["Industrial", "Automotive", "Machinery"],
  },
  {
    key: "maint",
    name: "Industrial Maintenance",
    micro: "Spares · MRO · tooling",
    applications: ["Downtime reduction", "Scheduled maintenance", "Consumable supply"],
    components: ["Spare parts", "MRO kits", "Wear parts", "Tooling"],
    industries: ["Mining", "Cement", "Energy"],
  },
];

const SYSTEM_IMG: Record<string, ResolvedAsset> = {
  air: A.sys_air,
  hyd: A.sys_hyd,
  pneu: A.sys_pneu,
  filt: A.sys_filt,
  pumpvalve: A.sys_pumpvalve,
  auto: A.sys_auto,
  mech: A.sys_mech,
  maint: A.sys_maint,
};

function SupplyNetwork() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="network" className="border-b py-24 lg:py-32" style={{ borderColor: LINE, background: WHITE }}>
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        <Reveal>
          <SectionHead
            no="SECTION 02"
            kicker="The network"
            title={<>Eight industrial systems. One supply chain.</>}
            lede="HISVIA organizes verified Chinese manufacturing into eight industrial systems — from air compressors to maintenance parts. Hover any system to see what it covers."
          />
        </Reveal>

        <div className="grid gap-px border" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", background: LINE, borderColor: LINE }}>
          {SYSTEMS.map((s) => {
            const open = active === s.key;
            return (
              <div
                key={s.key}
                onMouseEnter={() => setActive(s.key)}
                onMouseLeave={() => setActive(null)}
                className="relative transition-colors duration-300"
                style={{ background: open ? "#FAF9F5" : WHITE }}
              >
                <div className="flex items-center gap-4 px-5 py-5">
                  <div className="h-16 w-20 shrink-0 overflow-hidden border" style={{ borderColor: LINE2 }}>
                    <Img res={SYSTEM_IMG[s.key]} className="h-full w-full" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15.5px] font-semibold leading-snug" style={{ color: INK }}>
                      {s.name}
                    </h3>
                    <p className="mono mt-1" style={{ fontSize: 9, letterSpacing: "0.1em", color: FAINT, textTransform: "uppercase" }}>
                      {s.micro}
                    </p>
                  </div>
                  <span className="mono ml-auto" style={{ fontSize: 11, color: open ? ACCENT : FAINT }}>
                    {open ? "−" : "+"}
                  </span>
                </div>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 border-t px-5 pb-6 pt-5 md:grid-cols-3" style={{ borderColor: LINE }}>
                        {[
                          { h: "Applications", items: s.applications },
                          { h: "Components", items: s.components },
                          { h: "Industries served", items: s.industries },
                        ].map((col) => (
                          <div key={col.h}>
                            <div className="mono mb-2" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: ACCENT, textTransform: "uppercase" }}>
                              {col.h}
                            </div>
                            <ul className="space-y-1">
                              {col.items.map((i) => (
                                <li key={i} style={{ fontSize: 12, color: DIM }}>
                                  {i}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. VERIFIED FACTORY NETWORK
   ============================================================ */
const VERIFY_STEPS = ["On-site audit", "Document verification", "Sample QC", "Ongoing monitoring"];

const FACTORIES = [
  {
    id: "F-0214",
    name: "Taizhou Hydraulic Precision",
    location: "Zhejiang, China · est. 2008 · 240 workers",
    img: A.fac1,
    capabilities: ["Hydraulic components", "CNC machining", "Pressure testing"],
    certs: ["ISO 9001", "CE"],
    capacity: "50,000 pcs / month",
    export: "EU 40% · US 25% · ME 15%",
    qc: 96,
    note: "Specialized in valve bodies and hydraulic cylinders for 15 years.",
  },
  {
    id: "F-0308",
    name: "Ningbo Flow Control Works",
    location: "Zhejiang, China · est. 2012 · 380 workers",
    img: A.fac2,
    capabilities: ["Valve casting", "CNC finishing", "In-house pressure test"],
    certs: ["ISO 9001", "API 6D", "PED"],
    capacity: "80,000 pcs / month",
    export: "EU 35% · ME 30% · SEA 20%",
    qc: 94,
    note: "Full valve line from casting to assembly under one roof.",
  },
  {
    id: "F-0352",
    name: "Dongguan Automation Parts",
    location: "Guangdong, China · est. 2015 · 460 workers",
    img: A.fac3,
    capabilities: ["Automation components", "Injection molding", "Assembly lines"],
    certs: ["ISO 9001", "UL"],
    capacity: "120,000 units / month",
    export: "US 45% · APAC 30% · EU 15%",
    qc: 91,
    note: "Molding + automated assembly for high-volume control parts.",
  },
];

function FactoryNetwork() {
  return (
    <section id="factories" className="border-b py-24 lg:py-32" style={{ borderColor: LINE, background: PAPER }}>
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        <Reveal>
          <SectionHead
            no="SECTION 03"
            kicker="Factory verification"
            title={<>We verify factories before they join the network.</>}
            lede="Every HISVIA factory passes a four-stage verification. Only after evidence is confirmed does a factory appear in the network."
          />
        </Reveal>

        {/* verification process strip */}
        <Reveal>
          <div className="mb-16 grid grid-cols-2 gap-px border lg:grid-cols-4" style={{ background: LINE, borderColor: LINE }}>
            {VERIFY_STEPS.map((s, i) => (
              <div key={s} className="px-5 py-4" style={{ background: WHITE }}>
                <div className="mono flex items-center gap-2" style={{ fontSize: 9, letterSpacing: "0.16em", color: FAINT, textTransform: "uppercase" }}>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full" style={{ background: GREEN, color: "#fff", fontSize: 8 }}>
                    ✓
                  </span>
                  {s}
                </div>
                <div className="mono mt-1.5" style={{ fontSize: 8.5, letterSpacing: "0.12em", color: FAINT }}>
                  step {i + 1} of 4
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* factory profiles — editorial rows, not marketplace ranking */}
        <div className="space-y-20">
          {FACTORIES.map((f, i) => (
            <Reveal key={f.id} delay={0.05}>
              <article className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[16/11] overflow-hidden border" style={{ borderColor: LINE2 }}>
                    <Img res={f.img} className="h-full w-full" />
                    <div className="absolute bottom-3 left-3 border px-2.5 py-1.5" style={{ borderColor: "rgba(255,255,255,0.5)", background: "rgba(21,25,28,0.6)", backdropFilter: "blur(6px)" }}>
                      <span className="mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: "#fff", textTransform: "uppercase" }}>
                        {f.id} · verified 2026-06
                      </span>
                    </div>
                  </div>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="display text-[24px] font-bold tracking-[-0.02em]">{f.name}</h3>
                      <p className="mono mt-2" style={{ fontSize: 9.5, letterSpacing: "0.14em", color: FAINT, textTransform: "uppercase" }}>
                        {f.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="display text-[34px] font-bold tabular-nums" style={{ color: GREEN, letterSpacing: "-0.02em" }}>
                        {f.qc}
                      </div>
                      <div className="mono" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: FAINT, textTransform: "uppercase" }}>
                        quality score
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed" style={{ color: DIM }}>
                    {f.note}
                  </p>

                  <div className="mt-5 grid gap-x-8 gap-y-4 border-t pt-5 sm:grid-cols-2" style={{ borderColor: LINE }}>
                    <div>
                      <div className="mono mb-1.5" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: FAINT, textTransform: "uppercase" }}>
                        Capabilities
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {f.capabilities.map((c) => (
                          <span key={c} className="mono border px-2 py-1" style={{ borderColor: LINE2, fontSize: 9.5, letterSpacing: "0.06em", color: INK }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mono mb-1.5" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: FAINT, textTransform: "uppercase" }}>
                        Certifications
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {f.certs.map((c) => (
                          <span key={c} className="mono flex items-center gap-1 border px-2 py-1" style={{ borderColor: LINE2, fontSize: 9.5, letterSpacing: "0.06em", color: GREEN }}>
                            ✓ {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mono mb-1.5" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: FAINT, textTransform: "uppercase" }}>
                        Production capacity
                      </div>
                      <div className="text-[14px] font-semibold" style={{ color: INK }}>
                        {f.capacity}
                      </div>
                    </div>
                    <div>
                      <div className="mono mb-1.5" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: FAINT, textTransform: "uppercase" }}>
                        Export experience
                      </div>
                      <div className="mono text-[12px]" style={{ color: INK, letterSpacing: "0.04em" }}>
                        {f.export}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. INDUSTRIAL SOLUTIONS — application storytelling
   ============================================================ */
const SOLUTION_INDUSTRIES = [
  { name: "Mining", count: 214, products: "Compressors, drill parts, ventilation" },
  { name: "Manufacturing", count: 386, products: "Plant air, automation, tooling" },
  { name: "Energy", count: 152, products: "Process air, filtration, valves" },
  { name: "Construction", count: 118, products: "Compaction, pumps, hydraulics" },
];

const SOLUTION_CHIPS = [
  { label: "Compressor components", img: A.sol_chip1 },
  { label: "Filters", img: A.sol_chip2 },
  { label: "Valves", img: A.sol_chip3 },
  { label: "Maintenance parts", img: A.sol_chip4 },
];

function IndustrialSolutions() {
  const [ind, setInd] = useState(0);
  const active = SOLUTION_INDUSTRIES[ind];

  return (
    <section id="solutions" className="border-b py-24 lg:py-32" style={{ borderColor: LINE, background: WHITE }}>
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        <Reveal>
          <SectionHead
            no="SECTION 04"
            kicker="Industrial solutions"
            title={<>Compressed air — one system, full supply chain.</>}
            lede="A complete solution is more than a single part. HISVIA supplies the whole system: components, filtration, valves and maintenance parts — verified across the supply chain."
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Reveal>
            <figure className="relative">
              <div className="relative aspect-[16/10] overflow-hidden border" style={{ borderColor: LINE2 }}>
                <Img res={A.sol_main} className="h-full w-full" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(21,25,28,0.72))" }} />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#B9C0C5", textTransform: "uppercase" }}>
                    Compressed air system · screw compressor
                  </div>
                  <div className="display mt-1 text-[20px] font-semibold text-white">From air end to maintenance kit</div>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div>
                <div className="mono mb-3" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: FAINT, textTransform: "uppercase" }}>
                  What the solution covers
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {SOLUTION_CHIPS.map((c) => (
                    <div key={c.label} className="flex items-center gap-3 border px-3 py-2.5" style={{ borderColor: LINE, background: PAPER }}>
                      <div className="h-10 w-12 shrink-0 overflow-hidden border" style={{ borderColor: LINE2 }}>
                        <Img res={c.img} className="h-full w-full" />
                      </div>
                      <span className="text-[12.5px] font-medium" style={{ color: INK }}>
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div>
                <div className="mono mb-3" style={{ fontSize: 8.5, letterSpacing: "0.16em", color: FAINT, textTransform: "uppercase" }}>
                  Industries served — hover to explore
                </div>
                <div className="border" style={{ borderColor: LINE }}>
                  {SOLUTION_INDUSTRIES.map((s, i) => (
                    <button
                      key={s.name}
                      onMouseEnter={() => setInd(i)}
                      onClick={() => setInd(i)}
                      className="flex w-full items-center justify-between gap-4 border-b px-4 py-3.5 text-left transition-colors last:border-b-0"
                      style={{ borderColor: LINE, background: ind === i ? "#FAF9F5" : "transparent" }}
                    >
                      <span className="text-[14px] font-medium" style={{ color: ind === i ? ACCENT : INK }}>
                        {s.name}
                      </span>
                      <span className="mono text-[13px] tabular-nums" style={{ color: DIM }}>
                        {s.count} factories
                      </span>
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="mono mt-3 border-l-2 pl-4"
                    style={{ borderColor: ACCENT, fontSize: 10.5, letterSpacing: "0.08em", color: DIM, lineHeight: 1.7 }}
                  >
                    {active.name} — {active.products}
                  </motion.p>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. HOW HISVIA WORKS — premium timeline
   ============================================================ */
const WORKS_STEPS = [
  {
    label: "Requirement",
    title: "Tell us what you need",
    desc: "Share drawings, target price and delivery expectations. A dedicated sourcing desk confirms scope within one business day.",
    meta: "RFQ · drawings · target price",
    img: null,
  },
  {
    label: "Supplier Identification",
    title: "We map the capable factories",
    desc: "Using our eight-system capability index, we shortlist factories that can actually produce your part — not just claim they can.",
    meta: "capability index · 8 systems",
    img: A.works_img2,
  },
  {
    label: "Factory Verification",
    title: "Evidence, not promises",
    desc: "Shortlisted factories are re-audited for your specific requirement: equipment, capacity, certifications and export history.",
    meta: "on-site audit · document check",
    img: null,
  },
  {
    label: "Quality Control",
    title: "Samples are checked before production",
    desc: "Pre-production samples are inspected against your spec. In-line QC reports are shared at every milestone.",
    meta: "sample QC · milestone reports",
    img: null,
  },
  {
    label: "Delivery Support",
    title: "From factory to your door",
    desc: "Export documentation, compliance and logistics are handled end to end. DDP delivery to EU and US markets.",
    meta: "DDP · documentation · compliance",
    img: A.works_img1,
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b py-24 lg:py-32" style={{ borderColor: LINE, background: PAPER }}>
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        <Reveal>
          <SectionHead
            no="SECTION 05"
            kicker="Partnership"
            title={<>How HISVIA works with you.</>}
            lede="One sourcing partner from requirement to delivery. Five steps, each with evidence you can verify."
          />
        </Reveal>

        <div className="relative mx-auto max-w-[960px]">
          {/* center line */}
          <div className="absolute bottom-6 left-[7px] top-2 w-px lg:left-1/2" style={{ background: LINE2 }} />

          <div className="space-y-14">
            {WORKS_STEPS.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={s.label} delay={0.05}>
                  <div className={`relative flex gap-8 lg:w-1/2 ${right ? "lg:ml-auto lg:pl-12" : "lg:pr-12"}`}>
                    {/* node */}
                    <span
                      className="absolute left-0 top-1.5 z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 lg:left-auto"
                      style={{
                        borderColor: ACCENT,
                        background: PAPER,
                        ...(right ? { left: "-37px" } : { right: "-37px" }),
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                    </span>

                    <div className="min-w-0 flex-1 border px-6 py-6" style={{ borderColor: LINE, background: WHITE }}>
                      <div className="mono flex flex-wrap items-center gap-3" style={{ fontSize: 9, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                        <span style={{ color: ACCENT }}>{s.label}</span>
                        <span className="h-px w-6" style={{ background: LINE2 }} />
                        <span>{s.meta}</span>
                      </div>
                      <h3 className="display mt-3 text-[20px] font-bold tracking-[-0.015em]">{s.title}</h3>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed" style={{ color: DIM }}>
                        {s.desc}
                      </p>
                      {s.img && (
                        <div className="mt-4 h-28 w-full overflow-hidden border" style={{ borderColor: LINE2 }}>
                          <Img res={s.img} className="h-full w-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. PARTNERSHIP CTA — two audiences
   ============================================================ */
function PartnershipCTA() {
  return (
    <section id="partners" className="border-b" style={{ borderColor: LINE, background: WHITE }}>
      <div className="mx-auto max-w-[1360px] px-6 py-24 md:px-8 lg:py-32">
        <Reveal>
          <div className="mb-12">
            <div className="mono mb-4 flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
              SECTION 06
              <span className="h-px flex-1" style={{ background: LINE2 }} />
            </div>
            <h2 className="display text-[clamp(30px,3.4vw,48px)] font-bold leading-[1.05] tracking-[-0.025em]">
              Two ways to work with HISVIA.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* buyer */}
          <Reveal>
            <a href="#top" className="group relative block overflow-hidden border" style={{ borderColor: INK }}>
              <div className="relative aspect-[16/11]">
                <Img res={A.partner_buyer} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(21,25,28,0.35), rgba(21,25,28,0.9))" }} />
                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8">
                  <div className="mono mb-2 flex items-center gap-2" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#C9CFD4", textTransform: "uppercase" }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#1FA268" }} />
                    For buyers
                  </div>
                  <h3 className="display text-[24px] font-bold text-white tracking-[-0.02em]">Find your China manufacturing partner</h3>
                  <p className="mt-2 max-w-[380px] text-[13px] leading-relaxed text-white/65">
                    Send your requirement and get matched with verified factories that can actually build it.
                  </p>
                  <span className="mono mt-5 inline-block border border-white/40 px-5 py-2.5 text-[11.5px] tracking-[0.12em] text-white transition-colors group-hover:bg-white group-hover:text-[#15191C] uppercase">
                    Start Sourcing →
                  </span>
                </div>
              </div>
            </a>
          </Reveal>

          {/* factory */}
          <Reveal delay={0.1}>
            <a href="#top" className="group relative block overflow-hidden border" style={{ borderColor: LINE2 }}>
              <div className="relative aspect-[16/11]">
                <Img res={A.partner_factory} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(21,25,28,0.28), rgba(21,25,28,0.86))" }} />
                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8">
                  <div className="mono mb-2 flex items-center gap-2" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#C9CFD4", textTransform: "uppercase" }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#E34D0E" }} />
                    For factories
                  </div>
                  <h3 className="display text-[24px] font-bold text-white tracking-[-0.02em]">Join the HISVIA supplier network</h3>
                  <p className="mt-2 max-w-[380px] text-[13px] leading-relaxed text-white/65">
                    Pass our four-stage verification and reach overseas buyers with documented capability.
                  </p>
                  <span className="mono mt-5 inline-block border border-white/40 px-5 py-2.5 text-[11.5px] tracking-[0.12em] text-white transition-colors group-hover:bg-white group-hover:text-[#15191C] uppercase">
                    Become a Partner →
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "#262B2F", background: INK, color: "#F1F2EE" }}>
      <div className="mx-auto grid max-w-[1360px] gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3" style={{ background: "#E34D0E" }} />
            <span className="display text-[19px] font-bold tracking-[-0.02em]">HISVIA</span>
          </div>
          <p className="mono mt-4" style={{ fontSize: 9, letterSpacing: "0.2em", color: "#7A8288", textTransform: "uppercase" }}>
            China Industrial Supply Chain Partner
          </p>
          <p className="mt-5 max-w-[320px] text-[13px] leading-relaxed" style={{ color: "#9BA1A5" }}>
            A trusted sourcing network connecting overseas buyers with verified Chinese manufacturers — from first requirement to delivered goods.
          </p>
          <p className="mono mt-6" style={{ fontSize: 9, letterSpacing: "0.16em", color: "#5D6469", textTransform: "uppercase" }}>
            ISO 9001 · NDA protected · GDPR compliant
          </p>
        </div>
        {[
          { h: "Platform", links: ["The Network", "Industrial Solutions", "Factory Verification", "How It Works"] },
          { h: "For Buyers", links: ["Start Sourcing", "Request a Partner", "Quality Control", "Delivery Support"] },
          { h: "For Factories", links: ["Join the Network", "Verification Process", "Export Support", "Capacity"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="mono mb-4" style={{ fontSize: 9.5, letterSpacing: "0.2em", color: "#7A8288", textTransform: "uppercase" }}>
              {col.h}
            </div>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l} className="text-[12.5px] transition-colors hover:text-white" style={{ color: "#9BA1A5" }}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t" style={{ borderColor: "#262B2F" }}>
        <div className="mono mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-3 px-6 py-5 md:px-8" style={{ fontSize: 9, letterSpacing: "0.14em", color: "#5D6469", textTransform: "uppercase" }}>
          <span>© 2026 HISVIA · Hangzhou, China</span>
          <span>3,142 verified factories · 24 countries · 8 industrial systems</span>
        </div>
      </div>
    </footer>
  );
}
