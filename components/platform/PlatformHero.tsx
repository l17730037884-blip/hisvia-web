"use client";

import Image from "next/image";
import Link from "next/link";

interface PlatformHeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  bgImage: string;
  productNodes: { src: string; label: string }[];
}

export default function PlatformHero({
  title, subtitle, ctaPrimary, ctaSecondary, bgImage, productNodes,
}: PlatformHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0A0F14]" style={{ minHeight: "780px", maxHeight: "900px" }}>

      {/* LAYER 1: Full-bleed factory interior photograph */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          style={{ objectPosition: "center 40%" }}
        />
        {/* Bottom-heavy gradient for text legibility — not the whole image */}
        <div className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to top,
                rgba(10,15,20,0.92) 0%,
                rgba(10,15,20,0.55) 35%,
                rgba(10,15,20,0.15) 65%,
                rgba(10,15,20,0.05) 100%
              )
            `,
          }} />
        {/* Subtle left-edge darkening for text panel */}
        <div className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to right,
                rgba(10,15,20,0.45) 0%,
                rgba(10,15,20,0.15) 40%,
                transparent 70%
              )
            `,
          }} />
      </div>

      {/* LAYER 2: Editorial text panel — bottom-left positioning */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-14 md:pb-20">
        <div className="mx-auto max-w-wrap px-6 md:px-10">
          <div className="max-w-[680px]">

            {/* Eyebrow — industrial context */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-white/40" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 font-mono">
                Industrial Supply Chain Partner
              </p>
            </div>

            {/* Headline — 1-2 lines, capability statement */}
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.06] text-white tracking-[-0.015em]"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}>
              {title}
            </h1>

            {/* Description — 1 sentence, value proposition */}
            <p className="mt-4 text-[16px] md:text-[17px] text-white/50 leading-relaxed max-w-[560px]">
              {subtitle}
            </p>

            {/* CTA pair */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={ctaPrimary.href}
                className="inline-flex items-center gap-2 bg-white text-[#0A0F14] px-7 py-3.5 text-[14px] font-semibold
                  hover:bg-white/90 transition-colors duration-200">
                {ctaPrimary.label}
                <span className="text-[16px]">→</span>
              </Link>
              <Link href={ctaSecondary.href}
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-7 py-3.5 text-[14px] font-medium
                  hover:bg-white/[0.06] hover:border-white/35 transition-all duration-200">
                {ctaSecondary.label}
              </Link>
            </div>

            {/* Stats — scale indicators, not product counts */}
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { v: "300+", l: "Verified Factories" },
                { v: "4", l: "Manufacturing Hubs" },
                { v: "8", l: "Industrial Systems" },
                { v: "15+", l: "Countries Served" },
              ].map(s => (
                <div key={s.l} className="flex items-baseline gap-2">
                  <span className="text-[22px] md:text-[26px] font-bold text-white/85 tabular-nums">{s.v}</span>
                  <span className="text-[11px] font-mono text-white/35 uppercase tracking-[0.06em]">{s.l}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* LAYER 3: Subtle product capability nodes — small, peripheral, as proof not showcase */}
      <div className="absolute inset-0 z-[5] pointer-events-none hidden lg:block">
        {productNodes.map((node, i) => {
          const positions = [
            { right: "8%", top: "22%" },
            { right: "18%", top: "12%" },
            { right: "5%", top: "38%" },
            { right: "22%", top: "42%" },
            { right: "12%", top: "52%" },
          ];
          const pos = positions[i % positions.length];
          return (
            <div key={i} className="absolute flex items-center gap-2"
              style={{ right: pos.right, top: pos.top }}>
              <div className="w-8 h-8 relative rounded-sm overflow-hidden bg-white/5 border border-white/10"
                style={{ backdropFilter: "blur(4px)" }}>
                <Image src={node.src} alt="" fill className="object-contain p-0.5" sizes="32px"
                  style={{ opacity: 0.7 }} />
              </div>
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.08em] max-w-[60px] leading-tight">
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

    </section>
  );
}
