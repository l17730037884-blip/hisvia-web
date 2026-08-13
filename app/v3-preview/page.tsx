"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useScroll } from "framer-motion";

/* ============================================================
   HISVIA — Platform Homepage Prototype · v3-preview
   Industrial procurement OS · Fictiv / Xometry class visual
   Self-contained: no asset library, no v2 dependency.
   ============================================================ */

const INK = "#0B0D0F";
const PANEL = "#111417";
const LINE = "rgba(255,255,255,0.08)";
const TEXT = "#F1F3F4";
const DIM = "rgba(241,243,244,0.52)";
const FAINT = "rgba(241,243,244,0.28)";
const ORANGE = "#FF5A1F";
const GREEN = "#63E6B4";
const DISPLAY = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
const MONO = `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CSS = `
  .v3p { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  .v3p .mono { font-family: ${MONO}; }
  .v3p .display { font-family: ${DISPLAY}; }
  .v3p .eyebrow { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(241,243,244,0.42); }
  .v3p .grid-bg { background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 72px 72px; }
  .v3p input::placeholder { color: rgba(241,243,244,0.22); }
  .v3p ::selection { background: rgba(255,90,31,0.35); color: #fff; }
  @media (max-width: 1024px) { .v3p .grid-bg { background-size: 44px 44px; } }
`;

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.5'/></svg>")`;

/* ============================================================
   TYPES + DATA
   ============================================================ */

type PartKey = "impeller" | "cnc" | "sheet" | "cast" | "mold" | "print" | "weld";

interface Process {
  id: string;
  label: string;
  n: number;
  part: PartKey;
  tol: string;
  size: string;
  lead: string;
  finishes: string[];
  note: string;
  materials: string[];
  industries: string[];
}

interface Factory {
  code: string;
  name: string;
  loc: string;
  est: number;
  area: string;
  headcount: number;
  capacity: string;
  qc: number;
  oee: number;
  exportSince: number;
  part: PartKey;
  certs: string[];
  equip: { label: string; count: number }[];
  regions: string[];
}

interface Supplier {
  name: string;
  score: number;
  certs: string;
  lead: string;
  loc: string;
}

const PROCESSES: Process[] = [
  {
    id: "cnc", label: "CNC Machining", n: 842, part: "cnc", tol: "±0.005 mm", size: "1500 × 800 × 500 mm", lead: "5–15 days",
    finishes: ["Type II/III anodize", "Bead blast", "Electroless nickel"],
    note: "4/5-axis · in-house CMM · 24/7 lights-out",
    materials: ["Aluminum 6061-T6", "Aluminum 7075-T6", "Stainless 304", "Stainless 316L", "Titanium Ti-6Al-4V", "POM", "PEEK"],
    industries: ["Automotive", "Aerospace", "Medical", "Semiconductor"],
  },
  {
    id: "sheet", label: "Sheet Metal", n: 517, part: "sheet", tol: "±0.1 mm", size: "2000 × 1250 mm", lead: "7–20 days",
    finishes: ["Powder coat", "Anodize", "Passivation"],
    note: "laser + turret · up to 8 mm plate",
    materials: ["Aluminum 5052", "Galvanized steel", "Stainless 304", "Cold-rolled steel", "Copper"],
    industries: ["Automotive", "Energy & Oil/Gas", "Robotics"],
  },
  {
    id: "cast", label: "Investment Casting", n: 388, part: "cast", tol: "±0.5 mm · machined ±0.05", size: "800 × 600 × 500 mm", lead: "20–45 days",
    finishes: ["Machined", "Shot-blast", "Paint"],
    note: "lost-wax · spectrometric QC",
    materials: ["Gray iron", "Ductile iron", "Aluminum A356", "Zinc ZA-8", "Bronze C955"],
    industries: ["Energy & Oil/Gas", "Marine", "Construction"],
  },
  {
    id: "mold", label: "Injection Molding", n: 296, part: "mold", tol: "±0.02 mm", size: "700 × 500 mm mold", lead: "15–30 days",
    finishes: ["VDI texture", "Glossy SPI A1", "EMI coating"],
    note: "30–1200 t presses · mold built in-house",
    materials: ["ABS", "PC/ABS", "PA66 + GF30", "PP", "POM", "TPU"],
    industries: ["Medical", "Automotive", "Consumer"],
  },
  {
    id: "print", label: "Additive Manufacturing", n: 174, part: "print", tol: "±0.1 mm", size: "400 × 400 × 400 mm", lead: "3–10 days",
    finishes: ["Media blast", "Vapor smoothing", "Electroless nickel"],
    note: "SLS · SLA · DMLS · 316L & AlSi10Mg",
    materials: ["PA12 nylon", "AlSi10Mg", "Ti-6Al-4V", "316L", "Resin (SLA)", "PEEK"],
    industries: ["Aerospace", "Medical", "Robotics"],
  },
  {
    id: "weld", label: "Welded Fabrication", n: 132, part: "weld", tol: "±1 mm", size: "6000 × 3000 × 2000 mm", lead: "10–25 days",
    finishes: ["Pickled & passivated", "Powder coat", "Hot-dip galvanized"],
    note: "MIG/TIG · robotic weld cells",
    materials: ["Structural steel", "Stainless 304/316", "Aluminum 5083", "Duplex 2205"],
    industries: ["Energy & Oil/Gas", "Construction", "Food & Bev"],
  },
];

const INDUSTRIES = ["Automotive", "Aerospace", "Energy & Oil/Gas", "Medical", "Semiconductor", "Marine", "Robotics", "Food & Bev"];

const FACTORIES: Factory[] = [
  {
    code: "HS-NB-017", name: "PrecisionWorks Ningbo", loc: "Ningbo, CN", est: 2004, area: "46,000 m²", headcount: 480,
    capacity: "12,400 parts / mo", qc: 99.2, oee: 87, exportSince: 2009, part: "cnc",
    certs: ["ISO 9001:2015", "AS9100D", "IATF 16949", "ISO 13485"],
    equip: [
      { label: "5-axis CNC", count: 42 },
      { label: "4-axis CNC", count: 68 },
      { label: "CMM", count: 9 },
      { label: "OGP vision", count: 4 },
    ],
    regions: ["Germany", "USA", "Japan", "Korea", "Netherlands", "UAE"],
  },
  {
    code: "HS-TZ-034", name: "HydraCast Taizhou", loc: "Taizhou, CN", est: 1998, area: "63,000 m²", headcount: 720,
    capacity: "3,800 t / mo", qc: 98.6, oee: 84, exportSince: 2004, part: "cast",
    certs: ["ISO 9001:2015", "CE", "API 6D", "PED 2014/68/EU"],
    equip: [
      { label: "V-process lines", count: 3 },
      { label: "CNC post-machining", count: 52 },
      { label: "Spectrometers", count: 2 },
      { label: "Pressure test", count: 12 },
    ],
    regions: ["Russia", "Poland", "Germany", "Italy", "Saudi", "UAE"],
  },
  {
    code: "HS-DG-021", name: "VoltMotion Dongguan", loc: "Dongguan, CN", est: 2011, area: "28,000 m²", headcount: 310,
    capacity: "86,000 units / mo", qc: 99.7, oee: 91, exportSince: 2014, part: "mold",
    certs: ["ISO 9001:2015", "CE", "UL", "FCC"],
    equip: [
      { label: "SMT lines", count: 6 },
      { label: "Conformal coating", count: 2 },
      { label: "Assembly robots", count: 28 },
      { label: "EMC chamber", count: 2 },
    ],
    regions: ["EU", "USA", "Japan", "Brazil"],
  },
];

const HERO_SUPPLIERS: Supplier[] = [
  { name: "PrecisionWorks Ningbo", score: 98, certs: "ISO 9001 · AS9100D", lead: "18 days", loc: "Ningbo, CN" },
  { name: "HydraCast Taizhou", score: 94, certs: "ISO 9001 · CE", lead: "24 days", loc: "Taizhou, CN" },
  { name: "VoltMotion Dongguan", score: 91, certs: "ISO 9001 · UL", lead: "15 days", loc: "Dongguan, CN" },
];

const MATCH_SUPPLIERS: Supplier[] = [
  { name: "PrecisionWorks Ningbo", score: 98, certs: "ISO 9001 · AS9100D", lead: "18 days", loc: "Ningbo, CN" },
  { name: "HydraCast Taizhou", score: 94, certs: "ISO 9001 · CE", lead: "24 days", loc: "Taizhou, CN" },
  { name: "VoltMotion Dongguan", score: 91, certs: "ISO 9001 · UL · FCC", lead: "15 days", loc: "Dongguan, CN" },
];

const PARSED_SPECS = [
  { label: "Material", value: "Al-6061-T6" },
  { label: "Tolerance", value: "±0.01 mm" },
  { label: "Quantity", value: "500 pcs" },
  { label: "Finish", value: "Type III anodize · black" },
  { label: "Delivery", value: "DDP — Hamburg" },
];

const HERO_STEPS = [
  "Parsing requirement",
  "Normalizing material · tolerance · quantity",
  "Querying 3,142 verified factories",
  "Ranking by capability fit",
];

/* ============================================================
   ANIMATION HELPERS
   ============================================================ */

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.09, ease: EASE },
  }),
};

function useCountUp(target: number, run: boolean, duration = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return v;
}

function Count({ n, run = true }: { n: number; run?: boolean }) {
  const v = useCountUp(n, run);
  return <>{v.toLocaleString("en-US")}</>;
}

function SectionHead({
  index,
  eyebrow,
  title,
  sub,
  right,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="max-w-[640px]">
        <p className="mono eyebrow mb-6">
          <span style={{ color: ORANGE }}>{index}</span> · {eyebrow}
        </p>
        <h2 className="display" style={{ fontSize: "clamp(30px,3.4vw,52px)", lineHeight: 1.02, fontWeight: 650, letterSpacing: "-0.04em" }}>
          {title}
        </h2>
        {sub && <p className="mt-6 leading-relaxed" style={{ color: DIM, fontSize: 15 }}>{sub}</p>}
      </motion.div>
      {right && (
        <motion.div variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          {right}
        </motion.div>
      )}
    </div>
  );
}

/* ============================================================
   MOCK INDUSTRIAL VISUALS (SVG — no asset library)
   ============================================================ */

function PartVisual({ kind, className = "", spin = false }: { kind: PartKey; className?: string; spin?: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const metal = `url(#m-${uid})`;
  const core = `url(#c-${uid})`;
  const defs = (
    <defs>
      <linearGradient id={`m-${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#E6EBEE" />
        <stop offset="0.45" stopColor="#A9B1B8" />
        <stop offset="1" stopColor="#5B636C" />
      </linearGradient>
      <radialGradient id={`c-${uid}`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#0B0D0F" />
        <stop offset="1" stopColor="#2A2F34" />
      </radialGradient>
    </defs>
  );

  if (kind === "impeller") {
    const blades = [0, 1, 2, 3, 4, 5, 6].map((i) => `rotate(${(i * 360) / 7} 210 210)`);
    return (
      <svg viewBox="0 0 420 420" className={className}>
        {defs}
        <circle cx="210" cy="210" r="196" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        <circle cx="210" cy="210" r="176" fill="none" stroke="rgba(154,164,172,0.4)" strokeDasharray="2 7" strokeWidth="1" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1={210 + 186 * Math.cos((a * Math.PI) / 180)}
            y1={210 + 186 * Math.sin((a * Math.PI) / 180)}
            x2={210 + 194 * Math.cos((a * Math.PI) / 180)}
            y2={210 + 194 * Math.sin((a * Math.PI) / 180)}
            stroke="rgba(241,243,244,0.35)"
            strokeWidth="1"
          />
        ))}
        <g style={{ transformOrigin: "210px 210px" }}>
          <motion.g
            animate={spin ? { rotate: 360 } : undefined}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: "210px 210px" }}
          >
            {blades.map((p) => (
              <path
                key={p}
                transform={p}
                d="M210 210 C 216 164 258 128 318 122 C 300 84 258 62 210 62 C 162 62 120 84 102 122 C 162 128 204 164 210 210 Z"
                fill={metal}
                stroke="#3C434B"
                strokeWidth="1.4"
              />
            ))}
            <circle cx="210" cy="210" r="58" fill={core} stroke="#3C434B" strokeWidth="2" />
            <circle cx="210" cy="210" r="34" fill="#0B0D0F" stroke="#59606A" strokeWidth="1.5" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <circle
                key={a}
                cx={210 + 42 * Math.cos((a * Math.PI) / 180)}
                cy={210 + 42 * Math.sin((a * Math.PI) / 180)}
                r="6"
                fill="#0B0D0F"
                stroke="#59606A"
                strokeWidth="1.2"
              />
            ))}
          </motion.g>
        </g>
      </svg>
    );
  }

  if (kind === "cnc") {
    return (
      <svg viewBox="0 0 420 320" className={className}>
        {defs}
        <line x1="70" y1="56" x2="350" y2="56" stroke="rgba(241,243,244,0.3)" strokeWidth="1" />
        <line x1="70" y1="48" x2="70" y2="64" stroke="rgba(241,243,244,0.3)" strokeWidth="1" />
        <line x1="350" y1="48" x2="350" y2="64" stroke="rgba(241,243,244,0.3)" strokeWidth="1" />
        <text x="210" y="48" textAnchor="middle" style={{ fill: "rgba(241,243,244,0.5)", fontFamily: MONO, fontSize: 10 }}>
          280 ±0.02
        </text>
        <line x1="42" y1="90" x2="42" y2="240" stroke="rgba(241,243,244,0.3)" strokeWidth="1" />
        <line x1="34" y1="90" x2="50" y2="90" stroke="rgba(241,243,244,0.3)" strokeWidth="1" />
        <line x1="34" y1="240" x2="50" y2="240" stroke="rgba(241,243,244,0.3)" strokeWidth="1" />
        <text x="32" y="172" textAnchor="middle" transform="rotate(-90 32 172)" style={{ fill: "rgba(241,243,244,0.5)", fontFamily: MONO, fontSize: 10 }}>
          150
        </text>
        <rect x="70" y="90" width="280" height="150" rx="6" fill={metal} stroke="#3C434B" strokeWidth="1.5" />
        <path d="M70 96 L76 90 M344 90 L350 96 M70 234 L76 240 M344 240 L350 234" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" fill="none" />
        <rect x="150" y="130" width="120" height="80" rx="3" fill={core} stroke="#3C434B" strokeWidth="1.2" />
        <path d="M150 130 L270 210 M270 130 L150 210" stroke="#0B0D0F" strokeOpacity="0.4" strokeWidth="4" />
        <circle cx="210" cy="170" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 5" />
        <g style={{ transformOrigin: "210px 170px" }}>
          <motion.circle
            cx="210"
            cy="170"
            r="26"
            fill="none"
            stroke={ORANGE}
            strokeOpacity="0.5"
            strokeDasharray="3 6"
            strokeWidth="1.2"
            animate={spin ? { rotate: 360 } : undefined}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: "210px 170px" }}
          />
        </g>
        {[
          [98, 118],
          [322, 118],
          [98, 212],
          [322, 212],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="9" fill={core} stroke="#3C434B" strokeWidth="1.2" />
            <circle cx={x} cy={y} r="3.5" fill="#0B0D0F" />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "sheet") {
    return (
      <svg viewBox="0 0 420 300" className={className}>
        {defs}
        <rect x="70" y="66" width="280" height="170" fill="none" stroke="rgba(241,243,244,0.16)" strokeWidth="1" strokeDasharray="2 6" />
        <rect x="150" y="110" width="130" height="84" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <rect x="96" y="104" width="238" height="16" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <rect x="96" y="184" width="238" height="16" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <path d="M150 104 L150 200 M280 104 L280 200" stroke="rgba(241,243,244,0.4)" strokeWidth="1" strokeDasharray="3 4" />
        {[
          [120, 112],
          [312, 112],
          [120, 192],
          [312, 192],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="6.5" fill={core} stroke="#3C434B" strokeWidth="1.2" />
            <circle cx={x} cy={y} r="2.5" fill="#0B0D0F" />
          </g>
        ))}
        <text x="86" y="56" style={{ fill: "rgba(241,243,244,0.5)", fontFamily: MONO, fontSize: 10 }}>
          1.5 MM · 5052-AL
        </text>
      </svg>
    );
  }

  if (kind === "cast") {
    return (
      <svg viewBox="0 0 420 320" className={className}>
        {defs}
        <rect x="150" y="110" width="120" height="100" rx="10" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <rect x="185" y="70" width="50" height="40" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <rect x="175" y="62" width="70" height="14" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <circle cx="210" cy="88" r="9" fill={core} stroke="#3C434B" strokeWidth="1.2" />
        <rect x="185" y="190" width="50" height="40" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <rect x="175" y="244" width="70" height="14" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <circle cx="210" cy="228" r="9" fill={core} stroke="#3C434B" strokeWidth="1.2" />
        <rect x="80" y="130" width="70" height="60" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <rect x="62" y="120" width="18" height="80" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <circle cx="110" cy="160" r="10" fill={core} stroke="#3C434B" strokeWidth="1.2" />
        <rect x="270" y="130" width="70" height="60" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <rect x="340" y="120" width="18" height="80" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <circle cx="310" cy="160" r="10" fill={core} stroke="#3C434B" strokeWidth="1.2" />
        <path d="M150 160 h-70 M270 160 h70" stroke="rgba(241,243,244,0.3)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="210" y1="46" x2="210" y2="62" stroke="rgba(241,243,244,0.35)" strokeWidth="1.5" />
        <text x="210" y="36" textAnchor="middle" style={{ fill: "rgba(241,243,244,0.5)", fontFamily: MONO, fontSize: 10 }}>
          POUR
        </text>
      </svg>
    );
  }

  if (kind === "mold") {
    return (
      <svg viewBox="0 0 420 300" className={className}>
        {defs}
        <rect x="90" y="70" width="240" height="160" rx="10" fill={metal} stroke="#3C434B" strokeWidth="1.4" />
        <rect x="118" y="96" width="184" height="108" rx="6" fill="#161A1D" stroke="#3C434B" strokeWidth="1.2" />
        {[150, 178, 206, 234, 262].map((x) => (
          <line key={x} x1={x} y1="96" x2={x} y2="204" stroke="rgba(11,13,15,0.5)" strokeWidth="3" />
        ))}
        {[124, 152, 180].map((y) => (
          <line key={y} x1="118" y1={y} x2="302" y2={y} stroke="rgba(11,13,15,0.5)" strokeWidth="3" />
        ))}
        {[
          [136, 114],
          [284, 114],
          [136, 186],
          [284, 186],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill={core} stroke="#3C434B" strokeWidth="1" />
        ))}
        <circle cx="210" cy="150" r="3" fill="#0B0D0F" />
        <circle cx="226" cy="150" r="3" fill="#0B0D0F" />
        <text x="90" y="56" style={{ fill: "rgba(241,243,244,0.5)", fontFamily: MONO, fontSize: 10 }}>
          INJECTION · ABS
        </text>
      </svg>
    );
  }

  if (kind === "print") {
    const hexes: { pts: string; fill: string; key: string }[] = [];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        const cx = 96 + c * 34 + (r % 2 ? 17 : 0);
        const cy = 76 + r * 29;
        const s = 13;
        const pts = Array.from({ length: 6 })
          .map((_, k) => {
            const a = (Math.PI / 3) * k - Math.PI / 2;
            return `${(cx + s * Math.cos(a)).toFixed(1)},${(cy + s * Math.sin(a)).toFixed(1)}`;
          })
          .join(" ");
        hexes.push({ pts, fill: (r * 7 + c) % 5 === 0 ? "rgba(255,90,31,0.45)" : "rgba(255,255,255,0.02)", key: `${r}-${c}` });
      }
    }
    return (
      <svg viewBox="0 0 420 300" className={className}>
        {defs}
        <rect x="80" y="64" width="260" height="172" rx="8" fill="rgba(22,26,29,0.6)" stroke="#3C434B" strokeWidth="1.4" />
        {hexes.map((h) => (
          <polygon key={h.key} points={h.pts} fill={h.fill} stroke="#6E757C" strokeWidth="1" />
        ))}
        <text x="80" y="52" style={{ fill: "rgba(241,243,244,0.5)", fontFamily: MONO, fontSize: 10 }}>
          ADDITIVE · PA12
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 420 300" className={className}>
      {defs}
      <rect x="90" y="90" width="240" height="140" fill="none" stroke="#8A939B" strokeWidth="14" />
      <rect x="112" y="112" width="196" height="96" fill="none" stroke="#5B636C" strokeWidth="3" />
      <line x1="130" y1="212" x2="290" y2="108" stroke="#8A939B" strokeWidth="12" strokeLinecap="round" />
      {[
        [90, 90],
        [330, 90],
        [90, 230],
        [330, 230],
        [130, 212],
        [290, 108],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill={GREEN} opacity="0.85" />
      ))}
      <text x="90" y="64" style={{ fill: "rgba(241,243,244,0.5)", fontFamily: MONO, fontSize: 10 }}>
        WELDED FAB · S355
      </text>
    </svg>
  );
}

/* ============================================================
   DATA VIZ — BARS / GAUGE / SIGNAL
   ============================================================ */

function Bars({ data, active }: { data: { label: string; value: number }[]; active: boolean }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="mono flex items-baseline justify-between" style={{ fontSize: 10, letterSpacing: "0.08em" }}>
            <span style={{ color: DIM }}>{d.label}</span>
            <span style={{ color: "rgba(241,243,244,0.7)" }}>{d.value}</span>
          </div>
          <div className="mt-1 h-[3px] w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-full"
              style={{ background: `linear-gradient(90deg, ${ORANGE}, #FF8A5C)` }}
              initial={{ width: 0 }}
              animate={active ? { width: `${Math.max(8, (d.value / max) * 100)}%` } : { width: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Gauge({ value, active, label }: { value: number; active: boolean; label: string }) {
  const r = 52;
  const len = Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 92" className="w-[150px]">
        <path d="M 18 84 A 52 52 0 0 1 122 84" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
        <motion.path
          d="M 18 84 A 52 52 0 0 1 122 84"
          fill="none"
          stroke={GREEN}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={len}
          initial={{ strokeDashoffset: len }}
          animate={active ? { strokeDashoffset: len * (1 - value / 100) } : { strokeDashoffset: len }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
        />
        <text x="70" y="78" textAnchor="middle" style={{ fill: TEXT, fontFamily: MONO, fontSize: 24 }}>
          {value}%
        </text>
      </svg>
      <span className="mono mt-2" style={{ fontSize: 10, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

function SignalPanel({ active }: { active: boolean }) {
  const dots = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const a = (i / 8) * Math.PI * 2;
    return { x: 160 + 118 * Math.cos(a), y: 160 + 118 * Math.sin(a), d: i * 0.35 };
  });
  return (
    <svg viewBox="0 0 320 320" className="relative z-10 h-full w-full">
      {[52, 96, 140].map((r) => (
        <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="rgba(255,255,255,0.07)" />
      ))}
      <motion.g style={{ transformOrigin: "160px 160px" }} animate={{ rotate: 360 }} transition={{ duration: 40, ease: "linear", repeat: Infinity }}>
        <circle cx="160" cy="160" r="78" fill="none" stroke={ORANGE} strokeOpacity="0.25" strokeDasharray="3 10" />
      </motion.g>
      {dots.map((d) => (
        <motion.circle
          key={`${d.x}-${d.y}`}
          cx={d.x}
          cy={d.y}
          r="3"
          fill={active ? GREEN : ORANGE}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 0.95, 0.15] }}
          transition={{ duration: 2.4, delay: d.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.circle
        cx="160"
        cy="160"
        r="7"
        fill={ORANGE}
        initial={{ scale: 0.6, opacity: 0.7 }}
        animate={{ scale: [0.7, 1.15, 0.7], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "160px 160px" }}
      />
      <text x="160" y="156" textAnchor="middle" style={{ fill: TEXT, fontFamily: MONO, fontSize: 13, letterSpacing: "0.1em" }}>
        NETWORK
      </text>
      <text x="160" y="172" textAnchor="middle" style={{ fill: DIM, fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em" }}>
        PULSE · LIVE
      </text>
    </svg>
  );
}

/* ============================================================
   STAGE 1 — HERO
   ============================================================ */

function Stage1() {
  const [q, setQ] = useState("");
  const [phase, setPhase] = useState<"idle" | "run" | "done">("idle");
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const run = () => {
    if (!q.trim() || phase === "run") return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("run");
    setStep(0);
    for (let i = 1; i <= 4; i++) timers.current.push(setTimeout(() => setStep(i), i * 460));
    timers.current.push(setTimeout(() => setPhase("done"), 2300));
  };

  const status =
    phase === "done"
      ? "matched — 12 qualified manufacturers"
      : phase === "run"
      ? "querying verified network…"
      : q.trim()
      ? "input parsed — ready to match"
      : "describe a part to begin";

  const counts = useCountUp(12, phase === "done");

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(1200px 700px at 18% 8%, rgba(255,90,31,0.07), transparent 60%)" }} />
      <div
        className="pointer-events-none absolute right-[-14%] top-1/2 w-[64vw] max-w-[1000px] -translate-y-1/2"
        style={{
          maskImage: "radial-gradient(closest-side, rgba(0,0,0,0.9), transparent 80%)",
          WebkitMaskImage: "radial-gradient(closest-side, rgba(0,0,0,0.9), transparent 80%)",
        }}
      >
        <PartVisual kind="impeller" spin className="w-full opacity-70" />
      </div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-[160px]"
        style={{ background: "linear-gradient(180deg, transparent, rgba(255,90,31,0.05), transparent)" }}
        animate={{ y: ["-20vh", "115vh"] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="mono absolute left-6 top-6" style={{ fontSize: 10, letterSpacing: "0.22em", color: FAINT }}>
          HISVIA-OS // V3-PREVIEW
        </span>
        <span className="mono absolute right-6 top-6" style={{ fontSize: 10, letterSpacing: "0.22em", color: FAINT }}>
          NETWORK 3,142 FACTORIES · 24 COUNTRIES
        </span>
        <span className="mono absolute bottom-6 left-6" style={{ fontSize: 10, letterSpacing: "0.18em", color: FAINT }}>
          X +121.441 · Y −028.902 · Z +004.118
        </span>
        <span className="mono absolute bottom-6 right-6" style={{ fontSize: 10, letterSpacing: "0.18em", color: FAINT }}>
          ISO 2768-MK · Ø TOL ±0.005
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center gap-14 px-6 py-28 md:px-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-0">
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mono eyebrow mb-8">HISVIA — Manufacturing Operating System</p>
          <h1
            className="display"
            style={{ fontSize: "clamp(46px, 5.6vw, 86px)", lineHeight: 0.94, fontWeight: 650, letterSpacing: "-0.045em" }}
          >
            Precision
            <br />
            manufacturing,
            <br />
            <span
              style={{
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundImage: "linear-gradient(90deg,#FF5A1F,#FF9E6B)",
              }}
            >
              programmed.
            </span>
          </h1>
          <p className="mt-8 max-w-[420px] leading-relaxed" style={{ color: DIM, fontSize: 15 }}>
            Describe a part. HISVIA parses material, tolerance, finish and quantity — then matches verified factories
            across 24 countries, in seconds.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
        >
          <label className="mono" style={{ fontSize: 10, letterSpacing: "0.24em", color: FAINT, textTransform: "uppercase" }}>
            Requirement input
          </label>
          <div className="mt-3 border-b pb-3 transition-colors duration-300" style={{ borderColor: phase === "idle" ? "rgba(255,255,255,0.22)" : ORANGE }}>
            <div className="flex items-center gap-4">
              <motion.span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: phase === "done" ? GREEN : ORANGE }}
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  if (phase !== "idle") {
                    setPhase("idle");
                    setStep(0);
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && run()}
                placeholder="Describe your part — material, tolerance, qty…"
                className="w-full bg-transparent outline-none"
                style={{ color: TEXT, fontSize: 17, fontFamily: MONO }}
              />
              <button
                onClick={run}
                className="mono shrink-0 transition-colors"
                style={{ color: q.trim() ? ORANGE : FAINT, fontSize: 11, letterSpacing: "0.18em" }}
              >
                MATCH →
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Al-6061 housing", "500 pcs", "±0.01 mm", "black anodize"].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setQ(c);
                  setPhase("idle");
                  setStep(0);
                }}
                className="mono border px-2.5 py-1.5 transition-colors hover:border-[#FF5A1F]/60"
                style={{ fontSize: 10, letterSpacing: "0.08em", color: DIM, borderColor: "rgba(255,255,255,0.12)" }}
              >
                {c}
              </button>
            ))}
          </div>
          <motion.p
            key={status}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mono mt-5"
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              color: phase === "done" ? GREEN : FAINT,
              textTransform: "uppercase",
            }}
          >
            {status}
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
        >
          <div
            className="border"
            style={{ borderColor: LINE, background: "rgba(17,20,23,0.85)", backdropFilter: "blur(18px)" }}
          >
            <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: LINE }}>
              <span className="mono flex items-center gap-2" style={{ fontSize: 10, letterSpacing: "0.2em", color: DIM, textTransform: "uppercase" }}>
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: phase === "done" ? GREEN : ORANGE }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                Live match
              </span>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: FAINT }}>
                PREVIEW
              </span>
            </div>

            <div className="min-h-[300px] p-5">
              <AnimatePresence mode="wait">
                {phase === "done" ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                    <div className="flex items-baseline gap-3">
                      <span className="display" style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.04em", color: TEXT }}>
                        {counts}
                      </span>
                      <span className="leading-tight" style={{ color: DIM, fontSize: 13, maxWidth: 140 }}>
                        qualified manufacturers found
                      </span>
                    </div>
                    <div className="mt-5 space-y-3.5">
                      {HERO_SUPPLIERS.map((s, i) => (
                        <motion.div
                          key={s.name}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + i * 0.12, duration: 0.4, ease: EASE }}
                        >
                          <div className="flex items-baseline justify-between">
                            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.04em", color: TEXT }}>
                              {s.name}
                            </span>
                            <span className="mono" style={{ fontSize: 11, color: GREEN }}>
                              {s.score}%
                            </span>
                          </div>
                          <div className="mt-1.5 h-[3px] w-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                            <motion.div
                              className="h-full"
                              style={{ background: "linear-gradient(90deg,#FF5A1F,#63E6B4)" }}
                              initial={{ width: 0 }}
                              animate={{ width: `${s.score}%` }}
                              transition={{ delay: 0.4 + i * 0.12, duration: 0.8, ease: EASE }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div
                      className="mono mt-5 flex justify-between border-t pt-4"
                      style={{ borderColor: LINE, fontSize: 9.5, letterSpacing: "0.14em", color: FAINT, textTransform: "uppercase" }}
                    >
                      <span>Quotes in 24h</span>
                      <span>NDA-ready</span>
                      <span>DDP</span>
                    </div>
                  </motion.div>
                ) : phase === "run" ? (
                  <motion.div key="run" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="space-y-4">
                      {HERO_STEPS.map((s, i) => (
                        <div key={s} className="flex items-center gap-3">
                          <motion.span className="mono" style={{ fontSize: 10, color: i < step ? GREEN : FAINT }}>
                            {i < step ? "✓" : String(i + 1).padStart(2, "0")}
                          </motion.span>
                          <motion.span
                            className="mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: i < step ? 0.85 : 0.4 }}
                            style={{ fontSize: 11, letterSpacing: "0.06em" }}
                          >
                            {s}
                          </motion.span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>
                      Awaiting requirement
                    </p>
                    <div className="mt-5 space-y-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-3"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                          animate={{ opacity: [0.4, 0.9, 0.4] }}
                          transition={{ duration: 1.8, delay: i * 0.25, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    <p className="mono mt-6" style={{ fontSize: 10, letterSpacing: "0.1em", color: FAINT }}>
                      Type a requirement to start the match engine.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="mono" style={{ fontSize: 9, letterSpacing: "0.3em", color: FAINT }}>
          SCROLL
        </span>
        <motion.span
          className="h-8 w-[1px]"
          style={{ background: "linear-gradient(180deg, rgba(255,90,31,0.8), transparent)", transformOrigin: "top" }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

/* ============================================================
   STAGE 2 — MANUFACTURING DISCOVERY
   ============================================================ */

function Stage2() {
  const [procId, setProcId] = useState(PROCESSES[0].id);
  const [mat, setMat] = useState<string | null>(null);
  const [ind, setInd] = useState<string | null>(null);
  const p = PROCESSES.find((x) => x.id === procId) ?? PROCESSES[0];
  const match = Math.round(p.n * (mat ? 0.42 : 1) * (ind ? 0.55 : 1));
  const matchPct = Math.min(96, Math.round((match / 1240) * 100));
  const selKey = procId + (mat ?? "") + (ind ?? "");

  return (
    <section className="relative py-[130px] md:py-[180px]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHead
          index="01"
          eyebrow="Manufacturing discovery"
          title={
            <>
              Explore the network
              <br />
              by capability.
            </>
          }
          sub="Select a process, then a material, then an industry. The network profile recalculates live."
          right={
            <div className="text-right">
              <p className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>
                Live match
              </p>
              <div className="display mt-2" style={{ fontSize: "clamp(34px,3vw,48px)", fontWeight: 700, letterSpacing: "-0.04em" }}>
                <span key={selKey}>
                  <Count n={match} />
                </span>
              </div>
              <p className="mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: DIM, textTransform: "uppercase" }}>
                factories match this profile
              </p>
            </div>
          }
        />

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 border-b"
          style={{ borderColor: LINE }}
        >
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {PROCESSES.map((x, i) => {
              const on = x.id === procId;
              return (
                <button
                  key={x.id}
                  onClick={() => {
                    setProcId(x.id);
                    setMat(null);
                    setInd(null);
                  }}
                  className="relative pb-4 text-left"
                >
                  <span className="mono block" style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display block text-[17px] font-medium transition-colors" style={{ color: on ? TEXT : DIM }}>
                    {x.label}
                  </span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: on ? ORANGE : FAINT }}>
                    {x.n} factories
                  </span>
                  {on && <motion.span layoutId="proc-line" className="absolute inset-x-0 bottom-[-1px] h-[2px]" style={{ background: ORANGE }} />}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[340px_1fr]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-10"
          >
            <div>
              <p className="mono mb-4" style={{ fontSize: 10, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>
                Material
              </p>
              <div className="flex flex-wrap gap-2">
                {p.materials.map((m) => {
                  const on = mat === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setMat(on ? null : m)}
                      className="mono border px-3 py-2 text-left transition-colors"
                      style={{
                        fontSize: 10.5,
                        letterSpacing: "0.04em",
                        color: on ? "#0B0D0F" : DIM,
                        background: on ? ORANGE : "transparent",
                        borderColor: on ? ORANGE : "rgba(255,255,255,0.14)",
                      }}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="mono mb-4" style={{ fontSize: 10, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>
                Industry
              </p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((x) => {
                  const on = ind === x;
                  return (
                    <button
                      key={x}
                      onClick={() => setInd(on ? null : x)}
                      className="mono border px-3 py-2 transition-colors"
                      style={{
                        fontSize: 10.5,
                        letterSpacing: "0.04em",
                        color: on ? TEXT : FAINT,
                        borderColor: on ? "rgba(255,90,31,0.6)" : "rgba(255,255,255,0.14)",
                        background: on ? "rgba(255,90,31,0.08)" : "transparent",
                      }}
                    >
                      {x}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="mono leading-relaxed" style={{ fontSize: 10, letterSpacing: "0.1em", color: FAINT }}>
              Profile updates in real time. No forms — the network responds to each selection.
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="border"
            style={{ borderColor: LINE, background: PANEL }}
          >
            <div className="grid md:grid-cols-2">
              <div
                className="relative min-h-[320px] overflow-hidden"
                style={{ background: "#0E1013", borderRight: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="grid-bg absolute inset-0 opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={p.id + (mat ?? "any")}
                      className="w-full max-w-[380px]"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <PartVisual kind={p.part} spin={p.id === "cnc"} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span className="mono absolute left-4 top-4" style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
                  {p.label} — schematic
                </span>
                <span className="mono absolute bottom-4 right-4" style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT }}>
                  {mat ?? "material: any"}
                </span>
              </div>

              <div className="p-7 md:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={p.id + (mat ?? "any")}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="space-y-5"
                  >
                    {[
                      ["Tolerance", p.tol],
                      ["Max size", p.size],
                      ["Lead time", p.lead],
                    ].map(([l, v]) => (
                      <div
                        key={l}
                        className="flex items-baseline justify-between gap-6 border-b pb-3"
                        style={{ borderColor: "rgba(255,255,255,0.07)" }}
                      >
                        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                          {l}
                        </span>
                        <span className="mono text-right" style={{ fontSize: 13, color: TEXT }}>
                          {v}
                        </span>
                      </div>
                    ))}
                    <div>
                      <p className="mono mb-2.5" style={{ fontSize: 10, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                        Surface finish
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.finishes.map((f) => (
                          <span key={f} className="mono border px-2.5 py-1.5" style={{ fontSize: 10, letterSpacing: "0.05em", color: DIM, borderColor: "rgba(255,255,255,0.12)" }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mono mb-2.5" style={{ fontSize: 10, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                        Served industries
                      </p>
                      <p className="mono" style={{ fontSize: 11, letterSpacing: "0.04em", color: DIM }}>
                        {p.industries.join(" · ")}
                      </p>
                    </div>
                    <p className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", color: FAINT }}>
                      {p.note}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t px-7 py-5 md:px-9" style={{ borderColor: LINE }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>
                Match meter
              </span>
              <div className="h-[3px] min-w-[160px] flex-1" style={{ background: "rgba(255,255,255,0.07)" }}>
                <motion.div
                  key={selKey}
                  className="h-full"
                  style={{ background: "linear-gradient(90deg,#FF5A1F,#63E6B4)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${matchPct}%` }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              </div>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: GREEN }}>
                <span key={selKey}>
                  <Count n={match} />
                </span>{" "}
                factories match
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STAGE 3 — FACTORY INTELLIGENCE
   ============================================================ */

function Stage3() {
  const [idx, setIdx] = useState(0);
  const f = FACTORIES[idx];
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  useEffect(() => {
    if (inView) setActive(true);
  }, [inView]);

  return (
    <section ref={ref} className="relative py-[130px] md:py-[180px]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHead
          index="02"
          eyebrow="Factory intelligence"
          title={
            <>
              Every factory,
              <br />
              fully specified.
            </>
          }
          sub="A product-grade profile for every plant — equipment, certifications, capacity and delivery. No marketing page. No claims without data."
        />

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 border"
          style={{ borderColor: LINE, background: PANEL }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4" style={{ borderColor: LINE }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>
              Plant profile — {f.code}
            </span>
            <div className="flex gap-2">
              {FACTORIES.map((x, i) => (
                <button
                  key={x.code}
                  onClick={() => setIdx(i)}
                  className="mono border px-3 py-2 transition-colors"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.12em",
                    color: i === idx ? TEXT : FAINT,
                    borderColor: i === idx ? ORANGE : "rgba(255,255,255,0.1)",
                    background: i === idx ? "rgba(255,90,31,0.08)" : "transparent",
                  }}
                >
                  {x.code}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={f.code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="grid lg:grid-cols-12">
                <div
                  className="relative min-h-[440px] overflow-hidden lg:col-span-7"
                  style={{
                    background: "#0E1013",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="grid-bg absolute inset-0 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <PartVisual kind={f.part} className="w-[420px] max-w-full opacity-80" />
                  </div>
                  <div className="absolute bottom-6 left-6 w-[240px] border bg-[#0B0D0F]/85 p-4 backdrop-blur" style={{ borderColor: LINE }}>
                    <p className="mono mb-3" style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
                      Equipment density
                    </p>
                    <Bars data={f.equip.map((e) => ({ label: e.label, value: e.count }))} active={active} />
                  </div>
                  <div className="absolute right-6 top-6 border bg-[#0B0D0F]/85 p-4 backdrop-blur" style={{ borderColor: LINE }}>
                    <Gauge value={f.qc} active={active} label="QC pass rate" />
                  </div>
                </div>

                <div className="flex flex-col justify-between p-7 md:p-10 lg:col-span-5">
                  <div>
                    <p className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: ORANGE }}>
                      {f.code} · verified
                    </p>
                    <h3 className="display mt-3" style={{ fontSize: "clamp(24px,2.4vw,38px)", fontWeight: 650, letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                      {f.name}
                    </h3>
                    <p className="mono mt-3" style={{ fontSize: 11, letterSpacing: "0.14em", color: DIM, textTransform: "uppercase" }}>
                      {f.loc} · since {f.est}
                    </p>
                    <p className="mt-6 leading-relaxed" style={{ color: DIM, fontSize: 14 }}>
                      Operates {f.capacity} of certified capacity with an OEE of {f.oee}%. Audited annually — last audit
                      2026-Q2.
                    </p>
                    <div className="mt-7">
                      <p className="mono mb-3" style={{ fontSize: 10, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                        Certifications
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {f.certs.map((c) => (
                          <span key={c} className="mono border px-2.5 py-1.5" style={{ fontSize: 10, letterSpacing: "0.06em", color: TEXT, borderColor: "rgba(255,255,255,0.14)" }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="mono mb-3" style={{ fontSize: 10, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                        Delivery regions — since {f.exportSince}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {f.regions.map((r) => (
                          <span key={r} className="mono flex items-center gap-2" style={{ fontSize: 11, letterSpacing: "0.06em", color: DIM }}>
                            <span className="h-1 w-1 rounded-full" style={{ background: GREEN }} />
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t pt-5" style={{ borderColor: LINE }}>
                    <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.14em", color: FAINT, textTransform: "uppercase" }}>
                      Profile verified · audit 2026-Q2
                    </span>
                    <a href="#" className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: ORANGE }}>
                      Full profile →
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  ["Established", String(f.est)],
                  ["Floor area", f.area],
                  ["Headcount", String(f.headcount)],
                  ["Monthly capacity", f.capacity],
                ].map(([l, v], i) => (
                  <div
                    key={l}
                    className="p-6"
                    style={{
                      borderColor: LINE,
                      borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    <p className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>
                      {l}
                    </p>
                    <p className="mono mt-2" style={{ fontSize: 15, color: TEXT }}>
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   STAGE 4 — AI SOURCING MATCH
   ============================================================ */

function Stage4() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-140px" });
  const [phase, setPhase] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runSequence = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase(1);
    timers.current.push(setTimeout(() => setPhase(2), 2400));
    timers.current.push(setTimeout(() => setPhase(3), 5000));
  };

  useEffect(() => {
    if (inView) runSequence();
    return () => timers.current.forEach(clearTimeout);
  }, [inView]);

  const restart = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase(0);
    timers.current.push(setTimeout(runSequence, 120));
  };

  return (
    <section ref={ref} className="relative py-[130px] md:py-[180px]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <SectionHead
          index="03"
          eyebrow="AI sourcing match"
          title={
            <>
              A requirement in.
              <br />
              A shortlist out.
            </>
          }
          sub="HISVIA parses your specification, analyzes fit across the network, and returns matched suppliers — with the data behind every score."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7"
          >
            <div className="border" style={{ borderColor: LINE, background: PANEL }}>
              <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: LINE }}>
                <span className="mono flex items-center gap-2.5" style={{ fontSize: 10, letterSpacing: "0.2em", color: DIM, textTransform: "uppercase" }}>
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: phase === 0 ? FAINT : ORANGE }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  AI sourcing engine
                </span>
                <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: FAINT }}>
                  SESSION #H-8841
                </span>
              </div>

              <div className="p-6 md:p-8">
                <div className="border-l-2 pl-5" style={{ borderColor: ORANGE }}>
                  <p className="mono" style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
                    Inbound requirement
                  </p>
                  <p className="mono mt-2 leading-relaxed" style={{ fontSize: 13, color: TEXT }}>
                    Aluminum sensor housing · 500 pcs · ±0.01 mm · Type III anodize, black · DDP Hamburg
                  </p>
                </div>

                <div className="mt-8 space-y-7">
                  <div className="flex gap-5">
                    <span className="mono pt-0.5" style={{ fontSize: 9, letterSpacing: "0.18em", color: FAINT }}>
                      01
                    </span>
                    <div className="flex-1">
                      <p className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: DIM, textTransform: "uppercase" }}>
                        Analysis
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {PARSED_SPECS.map((s, i) => (
                          <motion.span
                            key={s.label}
                            className="mono border px-3 py-2"
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: 0.15 + i * 0.32, duration: 0.4, ease: EASE }}
                            style={{
                              fontSize: 10.5,
                              letterSpacing: "0.05em",
                              color: phase >= 1 ? TEXT : FAINT,
                              borderColor: phase >= 1 ? "rgba(99,230,180,0.4)" : "rgba(255,255,255,0.1)",
                              background: phase >= 1 ? "rgba(99,230,180,0.06)" : "transparent",
                            }}
                          >
                            <span style={{ color: FAINT }}>{s.label}:</span> {s.value}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <span className="mono pt-0.5" style={{ fontSize: 9, letterSpacing: "0.18em", color: phase >= 2 ? GREEN : FAINT }}>
                      02
                    </span>
                    <div className="flex-1">
                      <p className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: DIM, textTransform: "uppercase" }}>
                        Matching
                      </p>
                      <div className="mt-3 space-y-4">
                        {MATCH_SUPPLIERS.map((s, i) => (
                          <motion.div
                            key={s.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + i * 0.5, duration: 0.45, ease: EASE }}
                            style={{ opacity: phase >= 2 ? 1 : 0 }}
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <span className="mono" style={{ fontSize: 12, color: TEXT, letterSpacing: "0.03em" }}>
                                {s.name}
                              </span>
                              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: FAINT }}>
                                {s.certs} · {s.loc} · {s.lead}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                              <div className="h-[3px] flex-1" style={{ background: "rgba(255,255,255,0.07)" }}>
                                <motion.div
                                  className="h-full"
                                  style={{ background: "linear-gradient(90deg,#FF5A1F,#63E6B4)" }}
                                  initial={{ width: 0 }}
                                  animate={phase >= 2 ? { width: `${s.score}%` } : { width: 0 }}
                                  transition={{ delay: 0.35 + i * 0.5, duration: 0.9, ease: EASE }}
                                />
                              </div>
                              <span className="mono" style={{ fontSize: 11, color: GREEN }}>
                                {s.score}%
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      {phase >= 3 && (
                        <motion.p
                          key="done-note"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mono mt-4"
                          style={{ fontSize: 10, letterSpacing: "0.14em", color: GREEN, textTransform: "uppercase" }}
                        >
                          Match complete — 3 suppliers shortlisted · brief sent
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t px-6 py-4" style={{ borderColor: LINE }}>
                <button onClick={restart} className="mono transition-colors" style={{ fontSize: 10, letterSpacing: "0.18em", color: DIM, textTransform: "uppercase" }}>
                  ↻ Re-run match
                </button>
                <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.14em", color: FAINT }}>
                  ENGINE v3 · LATENCY 0.8s
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={reveal}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5"
          >
            <div className="flex h-full flex-col border" style={{ borderColor: LINE, background: "#0E1013" }}>
              <div className="relative min-h-[300px] flex-1">
                <SignalPanel active={phase >= 2} />
                <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
              </div>
              <div className="flex items-center justify-between gap-6 border-t px-6 py-6" style={{ borderColor: LINE }}>
                <Gauge value={97} active={phase >= 3} label="Fit confidence" />
                <div className="mono leading-loose" style={{ fontSize: 10, letterSpacing: "0.12em", color: DIM }}>
                  <p>MATCHED: 3</p>
                  <p>ANALYZED: 1,240</p>
                  <p>REJECTED: 124</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STAGE 5 — FINAL CONVERSION
   ============================================================ */

function Stage5() {
  return (
    <section className="relative overflow-hidden py-[170px] md:py-[230px]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div
        className="absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(255,90,31,0.08), transparent 70%)" }}
      />
      <div className="relative z-10 mx-auto max-w-[920px] px-6 text-center">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <p className="mono eyebrow">Procurement entry</p>
          <h2 className="display mt-6" style={{ fontSize: "clamp(36px,4.6vw,64px)", lineHeight: 1, fontWeight: 650, letterSpacing: "-0.045em" }}>
            Describe your requirement.
          </h2>
          <p className="mx-auto mt-6 max-w-[480px] leading-relaxed" style={{ color: DIM, fontSize: 15 }}>
            One paragraph is enough. The match engine takes it from there.
          </p>
        </motion.div>

        <motion.div
          variants={reveal}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-12 max-w-[760px] border px-6 py-3 md:px-8"
          style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(17,20,23,0.6)", backdropFilter: "blur(14px)" }}
        >
          <div className="flex items-center gap-4">
            <motion.span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: ORANGE }}
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <input
              placeholder="CNC-machined aluminum housing, ±0.05 mm, 200–500 pcs, black anodize, DDP Hamburg…"
              className="w-full bg-transparent py-5 outline-none"
              style={{ color: TEXT, fontFamily: MONO, fontSize: "clamp(13px,1.3vw,17px)" }}
            />
            <button
              className="mono shrink-0 px-6 py-3.5 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: ORANGE, color: "#0B0D0F", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", boxShadow: "0 0 44px rgba(255,90,31,0.28)" }}
            >
              Start sourcing
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={reveal}
          custom={2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-12 grid max-w-[680px] grid-cols-1 gap-4 md:grid-cols-3"
        >
          {[
            ["01", "Requirement parsed by AI"],
            ["02", "3–5 factories matched in 24h"],
            ["03", "DDP quotes · NDA-protected"],
          ].map(([n, t]) => (
            <div key={n} className="border px-4 py-4 text-left" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <p className="mono" style={{ fontSize: 9, letterSpacing: "0.2em", color: ORANGE }}>
                {n}
              </p>
              <p className="mono mt-2" style={{ fontSize: 11, letterSpacing: "0.06em", color: DIM }}>
                {t}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={reveal}
          custom={3}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mono mt-10"
          style={{ fontSize: 9.5, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}
        >
          Free matching · no commitment · response within 24 hours
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
          HISVIA — Manufacturing operating system
        </span>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
          v3-preview · Shanghai / Shenzhen / Hamburg
        </span>
        <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
          © 2026
        </span>
      </div>
    </footer>
  );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function V3Preview() {
  const { scrollYProgress } = useScroll();
  return (
    <main className="v3p relative min-h-screen overflow-x-clip" style={{ background: INK }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px]"
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%", background: ORANGE }}
      />
      <div className="pointer-events-none fixed inset-0 z-[69]" style={{ backgroundImage: NOISE, opacity: 0.04 }} />
      <Stage1 />
      <Stage2 />
      <Stage3 />
      <Stage4 />
      <Stage5 />
      <Footer />
    </main>
  );
}
