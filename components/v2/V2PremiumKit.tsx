"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/lib/locales";
import type { AssetEntry } from "@/lib/content-v2/types";
import type { CapabilityItem } from "@/lib/content-v2/content-loader";
import {
  PAPER, PAPER_D, INK, DIM, FAINT, LINE, LINE_D, ACCENT, NIGHT, MONO, DISPLAY, EASE,
} from "./V2BrandKit";

/* ============================================================
   V2 Premium Industrial Kit — Phase 16

   Components: IndustrialHero · TrustBar · CapabilityShowcase ·
   ProcessTimeline · IndustryCard · EvidencePanel · FactoryProof ·
   PremiumCTA

   Rules: no card walls, no dashboard feel, no gradients-as-deco,
   large photography, dark/light rhythm, honest data only.
   ============================================================ */

const P_CSS = `
.v2premium{--pap:${PAPER};--ink:${INK};--dim:${DIM};--faint:${FAINT};--line:${LINE};--line-d:${LINE_D};--acc:${ACCENT};--night:${NIGHT};}
.v2premium *{box-sizing:border-box;margin:0;padding:0;}
.v2premium .mono{font-family:${MONO};}
.v2premium .display{font-family:${DISPLAY};}
.v2premium img{display:block;}
.v2premium .no-scrollbar::-webkit-scrollbar{display:none;}
.v2premium .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
.v2premium .img-zoom{transition:transform 1.1s cubic-bezier(0.16,1,0.3,1);}
.v2premium .group:hover .img-zoom{transform:scale(1.06);}
@media(max-width:640px){.v2premium .hide-mobile{display:none!important;}}
`;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.75, ease: EASE },
};

function parseCapability(desc: string) {
  const process = desc.split("Tolerances")[0].trim().replace(/\.$/, "");
  const tolerance = desc.match(/Tolerances to ([^.]*?mm)\.?/);
  const materials = desc.match(/Materials: ([^.]*?\.)/);
  const batch = desc.match(/Batch sizes[^.]*\./);
  return {
    process,
    tolerance: tolerance ? `${tolerance[1]}mm` : "",
    materials: materials ? materials[1] : "",
    batch: batch ? batch[0] : "",
  };
}

/* ============================================================
   INDUSTRIAL HERO (配件透明PNG新版)
   用户严格要求：
   ① 不放大型整机，只放 part-* 配件透明PNG（已在 V2HomepageBrand 层筛9张）
   ② 一次多展示几个(2-5个不固定N，绝不每次3张同一位置)
   ③ 配件绝不再"那么小"→ 主配件巨幅(62%宽×82%高)
   ④ 背景颜色不要太深→ 工业品牌蓝灰浅调(比原黑BG亮3阶)
   ⑤ object-contain 不拉伸 不截断
   ============================================================ */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Stable FNV-1a hash → uint32. Deterministic across refreshes and JS engines.
// Replaces Math.random / performance.now / Date.now for hero layout seeding.
function stableHash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function imageSrc(asset: AssetEntry | null | undefined): string | null {
  if (!asset) return null;
  // 优先 cutout（透明PNG），其次 fallback 普通 path
  return (asset as unknown as { cutout_url?: string; cutout_path?: string }).cutout_path
    ?? (asset as unknown as { cutout_url?: string }).cutout_url
    ?? (asset as unknown as { image_url?: string }).image_url
    ?? (asset as unknown as { path?: string }).path
    ?? null;
}

export interface IndustrialHeroProps {
  locale: Locale;
  kicker: string;
  title: string;
  sub: string;
  asset?: AssetEntry | null;        // 兼容：可传原来的背景图（若传则作为底层浅色图，不作为主展示）
  heroAccessories?: Array<AssetEntry | null>; // 配件透明PNG数组（展示用），3~5张随机
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  caption: string;
  stats?: Array<{ v: string; l: string }>;
}

export function IndustrialHero({ locale: _locale, kicker, title, sub, asset: _assetUnused, heroAccessories, cta, ctaSecondary, caption, stats }: IndustrialHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // 主指令 §3：禁止 Math.random / performance.now / Date.now / 每次刷新换图。
  // 改用基于资产ID的稳定哈希种子：同一批配件→同一布局(确定性)；
  // 视觉丰富度来自布局本身(2~6张、8位置池、±抖动、±旋转)，而非刷新换图。
  const accs = (heroAccessories ?? []).filter(a => a && imageSrc(a)) as AssetEntry[];
  const assetKey = accs.map(a => a.asset_id).join("|");
  const rand = mulberry32(stableHash("hero:" + assetKey));
  // 数量基于种子确定（2~6），稳定不再每次刷新变化
  const N = Math.min(2 + Math.floor(rand() * 5), Math.max(2, accs.length));
  const shuffled = [...accs].sort(() => rand() - 0.5);
  const picks = shuffled.slice(0, Math.min(N, shuffled.length));

  // 1巨幅主（右下大区域，主位置也做轻微随机）+ N-1小辅（8个位置池+每个位置±4%抖动）
  const layout = picks.map((_a, k) => {
    const jitter = (base: number, range = 4) => Math.max(0, Math.min(92, base + (rand() - 0.5) * range * 2));
    if (k === 0) {
      const masterLeft = 32 + (rand() - 0.5) * 6;   // 29% ~ 35%
      const masterTop = 9 + (rand() - 0.5) * 6;     // 6% ~ 12%
      const masterW = 58 + rand() * 10;             // 58% ~ 68%
      const masterH = 76 + rand() * 10;             // 76% ~ 86%
      return {
        z: 20, top: `${Math.round(masterTop)}%`, left: `${Math.round(masterLeft)}%`,
        w: `${Math.round(masterW)}%`, h: `${Math.round(masterH)}%`,
        rotate: (rand() - 0.5) * 3,
        shadow: "drop-shadow([0_45px_85px_rgba(12,24,45,0.45)])",
        pos: "object-center" as const,
        opacity: 1,
      };
    }
    // 辅图位置池扩到 8 个，取后加 ±4% 抖动，绝不再每次固定同一位置
    const spots = [
      { top: jitter(3, 5),  left: jitter(1, 6) },
      { top: jitter(22, 5), left: jitter(3, 6) },
      { top: jitter(48, 6), left: jitter(0, 7) },
      { top: jitter(72, 5), left: jitter(2, 6) },
      { top: jitter(1, 4),  left: jitter(52, 6) },
      { top: jitter(36, 5), left: jitter(55, 6) },
      { top: jitter(58, 5), left: jitter(48, 7) },
      { top: jitter(12, 5), left: jitter(28, 5) },
    ];
    const spot = spots[Math.floor(rand() * spots.length)];
    const wBias = 0.20 + rand() * 0.22;       // 20%~42%，更宽的大小跨度
    const hBias = wBias * (0.85 + rand() * 0.4);
    const rotate = (rand() - 0.5) * 14;       // -7° ~ +7°
    return {
      z: 10 + k,
      top: `${Math.round(spot.top)}%`, left: `${Math.round(spot.left)}%`,
      w: `${Math.round(wBias * 100)}%`, h: `${Math.round(hBias * 100)}%`,
      rotate,
      shadow: "drop-shadow([0_22px_45px_rgba(12,24,45,0.4)])",
      pos: (rand() > 0.5 ? "object-left" : "object-right") as "object-left" | "object-right",
      opacity: 0.92 + rand() * 0.08,
    };
  });

  return (
    <section ref={ref} className="v2premium relative flex min-h-[92vh] flex-col justify-end overflow-hidden"
      style={{
        // 用户明确：hero背景颜色太深太深了 → 整体提亮3~5阶，工业品牌蓝灰浅调(Siemens/Bosch风)
        background:
          "radial-gradient(1400px 800px at 80% 32%, rgba(120,160,210,0.95) 0%, rgba(100,138,184,0.92) 25%, rgba(85,118,160,0.95) 55%, rgba(75,105,145,0.98) 80%, #5F7FA8 100%)",
      }}>
      <style dangerouslySetInnerHTML={{ __html: P_CSS }} />
      {/* 细网格纹理：12%透明度不再噪 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.12]" />
      {/* 细高光条 左上→右下工业光线 */}
      <div className="absolute -top-20 -left-20 w-[70%] h-px bg-gradient-to-r from-transparent via-[#7BA3D4]/35 to-transparent rotate-[-6deg]" />

      <motion.div style={{ y }} className="relative z-10 mx-auto w-full max-w-[1500px] h-[92vh] grid grid-cols-1 lg:grid-cols-12">
        {/* 左侧文字 — 背景变浅后文字翻转成深色（INK系），保证高对比可读 */}
        <div className="col-span-1 lg:col-span-7 xl:col-span-6 relative z-10 px-6 pb-24 pt-40 md:px-10 md:pb-28 flex flex-col justify-center">
          <motion.p {...reveal} className="mono flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.3em", color: "#2A4770", textTransform: "uppercase" }}>
            <span className="inline-block h-px w-10" style={{ background: "#2A4770" }} />
            {kicker}
          </motion.p>
          <motion.h1 {...reveal} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="display mt-6 max-w-[900px] text-[clamp(40px,6vw,86px)] font-semibold leading-[0.98] tracking-[-0.04em]" style={{ color: "#141C28" }}>
            {title}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-[560px] text-[15.5px] leading-relaxed" style={{ color: "#2C3A4F" }}>
            {sub}
          </motion.p>
          <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mt-10 flex flex-wrap items-center gap-5">
            <a href={cta.href} className="display px-9 py-4 text-[15px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT }}>
              {cta.label}
            </a>
            {ctaSecondary && (
              <a href={ctaSecondary.href} className="mono border px-6 py-4 text-[10.5px] tracking-[0.16em] uppercase transition-colors hover:bg-[#141C28]/8" style={{ borderColor: "rgba(20,28,40,0.35)", color: "#141C28" }}>
                {ctaSecondary.label}
              </a>
            )}
          </motion.div>
        </div>

        {/* 右侧：巨幅主配件 + N-1小辅 错落分布（绝不每次3同一位置）*/}
        {picks.length > 0 && (
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative h-full">
            {/* 柔和光晕：品牌蓝 */}
            <div className="absolute left-[55%] top-[55%] -translate-x-1/2 -translate-y-1/2 w-[92%] h-[92%] rounded-full bg-[#5A86C4]/25 blur-3xl" />
            <div className="absolute left-[10%] top-[20%] w-[42%] h-[42%] rounded-full bg-[#7BA3D4]/18 blur-2xl pointer-events-none" />
            {layout.map((L, k) => {
              const src = imageSrc(picks[k]);
              if (!src) return null;
              return (
                <motion.div
                  key={picks[k].asset_id + "-" + k}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: L.opacity, scale: 1 }}
                  transition={{ duration: 1.1 + k * 0.08, delay: 0.2 + k * 0.06, ease: EASE }}
                  className="absolute"
                  style={{
                    top: L.top, left: L.left, width: L.w, height: L.h,
                    transform: `rotate(${L.rotate}deg)`, zIndex: L.z,
                  }}>
                  <img src={src} alt={picks[k].filename + " " + k}
                    className={`absolute inset-0 h-full w-full object-contain ${L.shadow} ${L.pos}`}
                    style={{ filter: "drop-shadow(0 35px 65px rgba(10,20,40,0.55))" }} />
                </motion.div>
              );
            })}
          </div>
        )}
        {/* Mobile 配件主图（lg以下展示）*/}
        {picks.length > 0 && (
          <div className="lg:hidden relative mx-6 mb-10 h-[300px] overflow-hidden rounded-sm">
            {(() => {
              const src = imageSrc(picks[0]);
              if (!src) return null;
              return <img src={src} alt={picks[0].filename}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_25px_45px_rgba(10,20,40,0.6)]" />;
            })()}
          </div>
        )}
      </motion.div>

      {stats && stats.length > 0 && (
        <div className="relative z-10 border-t" style={{ borderColor: "rgba(20,28,40,0.18)", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(10px)" }}>
          <div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 gap-px md:grid-cols-4" style={{ background: "rgba(20,28,40,0.12)" }}>
            {stats.map((s) => (
              <div key={s.l} className="px-6 py-7 md:px-8 md:py-8" style={{ background: "rgba(255,255,255,0.78)" }}>
                <p className="display text-[clamp(24px,2.6vw,38px)] font-semibold tracking-[-0.02em]" style={{ color: "#141C28" }}>{s.v}</p>
                <p className="mono mt-1.5 text-[8.5px] tracking-[0.2em] uppercase" style={{ color: "#4A5668" }}>{s.l}</p>
              </div>
            ))}
          </div>
          <p className="mono mx-auto w-full max-w-[1500px] px-6 py-2.5 text-right text-[8.5px] tracking-[0.2em] uppercase md:px-10" style={{ color: "#4A5668" }}>
            {caption}
          </p>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   TRUST BAR — horizontal proof, big numbers, minimal
   ============================================================ */

export function TrustBar({ items }: { items: Array<{ v: string; l: string }> }) {
  return (
    <section className="v2premium border-b" style={{ borderColor: LINE, background: PAPER }}>
      <style dangerouslySetInnerHTML={{ __html: P_CSS }} />
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 lg:grid-cols-4" style={{ background: LINE }}>
        {items.map((it, i) => (
          <motion.div key={it.l} {...reveal} transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }} className="px-6 py-10 md:px-10 md:py-12" style={{ background: PAPER }}>
            <p className="display text-[clamp(30px,3.2vw,48px)] font-semibold leading-none tracking-[-0.03em]" style={{ color: INK }}>{it.v}</p>
            <p className="mono mt-3 text-[8.5px] tracking-[0.22em] uppercase" style={{ color: DIM }}>{it.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CAPABILITY SHOWCASE — left category rail, right evidence
   panel with photography. Hover + click switching.
   ============================================================ */

export interface CapabilityShowcaseProps {
  locale: Locale;
  capabilities: CapabilityItem[];
  capAssets: Record<string, AssetEntry | null>;
  qualitySystems: string[];
  ctaHref: string;
  labels: {
    eyebrow: string; title: string; desc: string;
    process: string; tolerance: string; materials: string; batch: string;
    quality: string; cta: string;
  };
}

export function CapabilityShowcase({ locale: _locale, capabilities, capAssets, qualitySystems, ctaHref, labels }: CapabilityShowcaseProps) {
  const [selected, setSelected] = useState<string>(capabilities[0]?.id ?? "");
  const cap = capabilities.find((c) => c.id === selected);
  const parsed = cap ? parseCapability(cap.description) : null;
  const img = capAssets[selected] ?? null;

  return (
    <section className="v2premium border-b py-12 lg:py-16" style={{ borderColor: NIGHT, background: NIGHT }}>
      <style dangerouslySetInnerHTML={{ __html: P_CSS }} />
      <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <div className="max-w-[760px]">
          <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{labels.eyebrow}</motion.p>
          <motion.h2 {...reveal} className="display mt-4 text-[clamp(30px,3.4vw,54px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: PAPER }}>{labels.title}</motion.h2>
          <motion.p {...reveal} className="mt-4 max-w-[640px] text-[14.5px] leading-relaxed" style={{ color: "#A9ADB0" }}>{labels.desc}</motion.p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div role="listbox" className="flex flex-col border-t" style={{ borderColor: "#2A2E31" }}>
            {capabilities.map((c, i) => {
              const active = c.id === selected;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c.id)}
                  onMouseEnter={() => setSelected(c.id)}
                  className="group flex items-center gap-5 border-b py-[18px] pr-3 text-left transition-colors"
                  style={{ borderColor: "#2A2E31" }}
                >
                  <span className="mono shrink-0 text-[11px] tracking-[0.2em]" style={{ color: active ? ACCENT : "#5E6366" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="display flex-1 text-[clamp(16px,1.5vw,22px)] font-semibold tracking-[-0.02em] transition-transform duration-300"
                    style={{ color: active ? PAPER : "#858A8D", transform: active ? "translateX(6px)" : "none" }}>
                    {c.name}
                  </span>
                  <span className="mono text-[12px]" style={{ color: active ? ACCENT : "#5E6366" }}>{active ? "—" : "→"}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start" style={{ background: PAPER }}>
            <div className="relative overflow-hidden" style={{ borderColor: LINE_D, borderWidth: 1 }}>
              <div className="aspect-[16/9] overflow-hidden" style={{ background: PAPER_D }}>
                <AnimatePresence mode="wait">
                  {img ? (
                    <motion.img
                      key={img.asset_id}
                      src={img.path}
                      alt={img.filename}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full w-full items-center justify-center">
                      <span className="mono text-[8px] uppercase" style={{ color: FAINT }}>HISVIA manufacturing evidence</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="absolute bottom-3 left-3 mono px-3 py-1.5 text-[8px] tracking-[0.2em] uppercase" style={{ background: NIGHT, color: PAPER }}>
                {cap?.name ?? labels.eyebrow}
              </div>
            </div>

            {cap && parsed && (
              <div className="px-7 py-7 md:px-9 md:py-8">
                <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                  <div>
                    <p className="mono text-[8.5px] tracking-[0.22em] uppercase" style={{ color: FAINT }}>{labels.process}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: INK }}>{parsed.process}.</p>
                  </div>
                  {parsed.tolerance && (
                    <div>
                      <p className="mono text-[8.5px] tracking-[0.22em] uppercase" style={{ color: FAINT }}>{labels.tolerance}</p>
                      <p className="mt-1.5 text-[15px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{parsed.tolerance}</p>
                    </div>
                  )}
                  {parsed.materials && (
                    <div>
                      <p className="mono text-[8.5px] tracking-[0.22em] uppercase" style={{ color: FAINT }}>{labels.materials}</p>
                      <p className="mt-1.5 text-[13.5px] font-medium" style={{ color: INK }}>{parsed.materials}</p>
                    </div>
                  )}
                  {parsed.batch && (
                    <div>
                      <p className="mono text-[8.5px] tracking-[0.22em] uppercase" style={{ color: FAINT }}>{labels.batch}</p>
                      <p className="mt-1.5 text-[13.5px] font-medium" style={{ color: INK }}>{parsed.batch}</p>
                    </div>
                  )}
                </div>
                <div className="mt-7 border-t pt-5" style={{ borderColor: LINE_D }}>
                  <p className="mono text-[8.5px] tracking-[0.22em] uppercase" style={{ color: FAINT }}>{labels.quality}</p>
                  <ul className="mt-2.5 flex flex-col gap-1.5">
                    {qualitySystems.slice(0, 2).map((q) => (
                      <li key={q} className="flex items-baseline gap-2.5 text-[12.5px]" style={{ color: DIM }}>
                        <span className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-1px]" style={{ background: ACCENT }} />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={ctaHref} className="display mt-7 inline-block px-8 py-3.5 text-[13.5px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: INK }}>
                  {labels.cta}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROCESS TIMELINE — horizontal steps with photography,
   horizontal scroll on mobile, hover zoom.
   ============================================================ */

export interface ProcessStep {
  label: string;
  desc: string;
  asset?: AssetEntry | null;
}

export function ProcessTimeline({ steps, note, eyebrow, title }: { steps: ProcessStep[]; note?: string; eyebrow: string; title: string }) {
  return (
    <section className="v2premium border-b py-12 lg:py-16" style={{ borderColor: LINE, background: PAPER }}>
      <style dangerouslySetInnerHTML={{ __html: P_CSS }} />
      <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <motion.div {...reveal} className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[760px]">
            <p className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: FAINT, textTransform: "uppercase" }}>{eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(30px,3.4vw,54px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: INK }}>
              {title}
            </h2>
          </div>
          {note && <p className="mono max-w-[300px] text-[9px] leading-relaxed tracking-[0.18em] uppercase" style={{ color: FAINT }}>{note}</p>}
        </motion.div>

        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
          {steps.map((s, i) => (
            <motion.div key={s.label} {...reveal} transition={{ duration: 0.6, delay: 0.06 * i, ease: EASE }}
              className="group w-[240px] shrink-0 snap-start lg:w-auto">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: LINE_D }}>
                <span className="mono text-[11px] tracking-[0.22em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="mono text-[8.5px] tracking-[0.2em] uppercase" style={{ color: FAINT }}>{s.label}</span>
              </div>
              {s.asset ? (
                <div className="mt-4 aspect-[4/5] overflow-hidden" style={{ background: PAPER_D }}>
                  <img src={s.asset.path} alt={s.asset.filename} className="img-zoom h-full w-full object-contain" style={{ filter: "saturate(0.9) contrast(1.05)" }} />
                </div>
              ) : (
                <div className="mt-4 flex aspect-[4/5] flex-col justify-between overflow-hidden border p-4" style={{ borderColor: LINE_D, background: NIGHT }}>
                  <span className="mono text-[8px] tracking-[0.22em] uppercase" style={{ color: "#8B8F93" }}>Specification</span>
                  <div className="flex flex-col gap-2">
                    {[0, 1, 2].map((r) => (
                      <div key={r} className="flex items-center gap-2" style={{ opacity: 0.55 - r * 0.12 }}>
                        <span className="h-px flex-1" style={{ background: "#3A3F43" }} />
                        <span className="mono text-[8px]" style={{ color: "#5E6366" }}>DWG · CAD</span>
                      </div>
                    ))}
                  </div>
                  <span className="mono text-[8px] tracking-[0.22em] uppercase" style={{ color: "#8B8F93" }}>Drawings & material spec</span>
                </div>
              )}
              <p className="mt-4 text-[12.5px] leading-relaxed" style={{ color: DIM }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INDUSTRY CARD — large image block, pain point, systems, CTA
   ============================================================ */

export interface IndustryCardProps {
  locale: Locale;
  index: number;
  title: string;
  pain: string;
  systems: string[];
  href: string;
  asset: AssetEntry | null;
  labels: { pain: string; systems: string; cta: string };
}

export function IndustryCard({ locale: _locale, index, title, pain, systems, href, asset, labels }: IndustryCardProps) {
  const flip = index % 2 === 1;
  return (
    <motion.div {...reveal} className="grid items-stretch lg:grid-cols-2" style={{ background: NIGHT }}>
      <div className={`relative overflow-hidden ${flip ? "lg:order-2" : ""}`}>
        {asset ? (
          <img src={asset.path} alt={asset.filename} className="img-zoom h-full min-h-[260px] w-full object-contain lg:min-h-[480px]" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
        ) : (
          <div className="flex h-full min-h-[260px] w-full items-center justify-center lg:min-h-[480px]" style={{ background: "#1B1F22" }}>
            <span className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: "#5E6366" }}>{title}</span>
          </div>
        )}
        <div className="absolute left-4 top-4 mono px-3 py-1.5 text-[8px] tracking-[0.2em] uppercase" style={{ background: "rgba(16,19,21,0.7)", color: PAPER }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 lg:py-20">
        <p className="mono text-[8.5px] tracking-[0.26em] uppercase" style={{ color: ACCENT }}>Industry</p>
        <h3 className="display mt-4 text-[clamp(26px,2.6vw,42px)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: PAPER }}>{title}</h3>
        <p className="mono mt-4 text-[9px] tracking-[0.2em] uppercase" style={{ color: "#6E7377" }}>{labels.pain}</p>
        <p className="mt-2.5 max-w-[440px] text-[14px] leading-relaxed" style={{ color: "#A9ADB0" }}>{pain}</p>
        <p className="mono mt-8 text-[9px] tracking-[0.2em] uppercase" style={{ color: "#6E7377" }}>{labels.systems}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {systems.map((s) => (
            <span key={s} className="mono border px-3 py-1.5 text-[9px] tracking-[0.08em] uppercase" style={{ borderColor: "#3A3F43", color: "#C6C9CB" }}>{s}</span>
          ))}
        </div>
        <a href={href} className="mono mt-9 inline-flex items-center gap-3 text-[10.5px] tracking-[0.18em] uppercase transition-colors" style={{ color: PAPER }}>
          {labels.cta} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" style={{ color: ACCENT }}>→</span>
        </a>
      </div>
    </motion.div>
  );
}

/* ============================================================
   EVIDENCE PANEL — verification: photography + four proof steps
   ============================================================ */

export interface EvidencePanelProps {
  locale: Locale;
  asset: AssetEntry | null;
  clusters: number;
  qualitySystems: string[];
  exportCapability: string[];
  buyerProtections: string[];
  labels: { eyebrow: string; title: string; desc: string };
}

export function EvidencePanel({ locale: _locale, asset, clusters, qualitySystems, exportCapability, buyerProtections, labels }: EvidencePanelProps) {
  const steps = [
    { n: "01", t: "Factory Audit", items: [`Network standards across ${clusters} manufacturing clusters`, "Per-factory documents collected during sourcing"] },
    { n: "02", t: "Inspection", items: qualitySystems.slice(2, 4) },
    { n: "03", t: "Certification", items: qualitySystems.slice(0, 2) },
    { n: "04", t: "Traceability", items: [exportCapability[1], buyerProtections[2]] },
  ];
  return (
    <section className="v2premium border-b py-12 lg:py-16" style={{ borderColor: LINE, background: PAPER }}>
      <style dangerouslySetInnerHTML={{ __html: P_CSS }} />
      <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: FAINT, textTransform: "uppercase" }}>{labels.eyebrow}</motion.p>
            <motion.h2 {...reveal} className="display mt-4 text-[clamp(30px,3.4vw,54px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: INK }}>{labels.title}</motion.h2>
            <motion.p {...reveal} className="mt-5 max-w-[520px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{labels.desc}</motion.p>
            <motion.div {...reveal} className="group mt-10 overflow-hidden border" style={{ borderColor: LINE_D }}>
              {asset ? (
                <img src={asset.path} alt={asset.filename} className="img-zoom aspect-[16/10] w-full object-contain" style={{ filter: "saturate(0.9) contrast(1.06)" }} />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center" style={{ background: PAPER_D }}>
                  <span className="mono text-[8px] uppercase" style={{ color: FAINT }}>Factory evidence</span>
                </div>
              )}
            </motion.div>
          </div>
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <motion.div key={s.t} {...reveal} transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }}
                className="flex-1 border-t py-8 first:border-t-0 first:pt-0" style={{ borderColor: LINE_D }}>
                <div className="flex items-baseline gap-4">
                  <span className="mono text-[11px] tracking-[0.22em]" style={{ color: ACCENT }}>{s.n}</span>
                  <h3 className="display text-[22px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{s.t}</h3>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5 pl-[42px]">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-baseline gap-2.5 text-[13px]" style={{ color: DIM }}>
                      <span className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-1px]" style={{ background: ACCENT }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FACTORY PROOF — partnership for Chinese factories
   ============================================================ */

export interface FactoryProofProps {
  locale: Locale;
  asset: AssetEntry | null;
  points: string[];
  cta: { label: string; href: string };
  labels: { eyebrow: string; title: string; desc: string; note: string };
}

export function FactoryProof({ locale: _locale, asset, points, cta, labels }: FactoryProofProps) {
  return (
    <section className="v2premium border-b py-12 lg:py-16" style={{ borderColor: LINE, background: PAPER_D }}>
      <style dangerouslySetInnerHTML={{ __html: P_CSS }} />
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: ACCENT, textTransform: "uppercase" }}>{labels.eyebrow}</motion.p>
          <motion.h2 {...reveal} className="display mt-4 text-[clamp(30px,3.2vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: INK }}>{labels.title}</motion.h2>
          <motion.p {...reveal} className="mt-5 max-w-[520px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>{labels.desc}</motion.p>
          <motion.div {...reveal} className="mt-10 border-t" style={{ borderColor: LINE_D }}>
            {points.map((pt, i) => (
              <div key={pt} className="flex items-baseline gap-4 border-b py-4" style={{ borderColor: LINE_D }}>
                <span className="mono shrink-0 text-[10px] tracking-[0.2em]" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="display text-[14.5px] font-medium leading-snug tracking-[-0.01em]" style={{ color: INK }}>{pt}</p>
              </div>
            ))}
          </motion.div>
          <motion.div {...reveal} className="mt-9 flex flex-wrap items-center gap-6">
            <a href={cta.href} className="display px-8 py-3.5 text-[13.5px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: INK }}>
              {cta.label}
            </a>
            <p className="mono text-[8.5px] tracking-[0.18em] uppercase" style={{ color: FAINT }}>{labels.note}</p>
          </motion.div>
        </div>
        <motion.div {...reveal} className="group relative overflow-hidden">
          {asset ? (
            <img src={asset.path} alt={asset.filename} className="img-zoom aspect-[4/3] w-full object-contain lg:aspect-[16/11]" style={{ filter: "saturate(0.92) contrast(1.05)" }} />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center lg:aspect-[16/11]" style={{ background: NIGHT }}>
              <span className="mono text-[9px] tracking-[0.22em] uppercase" style={{ color: "#5E6366" }}>Factory partnership</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 mono px-4 py-2.5 text-[8px] tracking-[0.2em] uppercase" style={{ background: NIGHT, color: PAPER }}>
            China manufacturing network
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   PREMIUM CTA — dark final conversion band
   ============================================================ */

export interface PremiumCTAProps {
  locale: Locale;
  kicker: string;
  title: string;
  desc: string;
  ctaLabel: string;
  href: string;
  note?: string;
}

export function PremiumCTA({ locale: _locale, kicker, title, desc, ctaLabel, href, note }: PremiumCTAProps) {
  return (
    <section className="v2premium relative overflow-hidden py-16 lg:py-20" style={{ background: NIGHT }}>
      <style dangerouslySetInnerHTML={{ __html: P_CSS }} />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(227,77,14,0.35), transparent 65%)" }} />
      <div className="relative mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.3em", color: ACCENT, textTransform: "uppercase" }}>{kicker}</motion.p>
        <motion.h2 {...reveal} className="display mt-5 max-w-[880px] text-[clamp(34px,4.4vw,68px)] font-semibold leading-[1.0] tracking-[-0.04em]" style={{ color: PAPER }}>{title}</motion.h2>
        <motion.p {...reveal} className="mt-6 max-w-[560px] text-[15px] leading-relaxed" style={{ color: "#A9ADB0" }}>{desc}</motion.p>
        <motion.div {...reveal} className="mt-11 flex flex-wrap items-center gap-6">
          <a href={href} className="display px-10 py-4.5 text-[15px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: ACCENT, paddingTop: 17, paddingBottom: 17 }}>
            {ctaLabel}
          </a>
          {note && <p className="mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "#6E7377" }}>{note}</p>}
        </motion.div>
      </div>
    </section>
  );
}
