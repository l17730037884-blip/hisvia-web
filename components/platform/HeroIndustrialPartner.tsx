"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  bgImage: string;
  productNodes: { src: string; label: string }[];
}

export default function HeroIndustrialPartner({ title, subtitle, ctaPrimary, ctaSecondary, bgImage }: Props) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "100vh", maxHeight: "960px", background: "#0B1E36" }}>

      {/* Full-bleed factory photograph — Siemens-style editorial */}
      <div className="absolute inset-0">
        <Image src={bgImage} alt="" fill className="object-cover" sizes="100vw" priority
          style={{ objectPosition: "center 30%", filter: "brightness(0.55) saturate(0.3)" }} />
      </div>

      {/* Gradient overlay — dark navy atmosphere */}
      <div className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(11,30,54,0.88) 0%,
              rgba(11,30,54,0.55) 40%,
              rgba(11,30,54,0.25) 70%,
              rgba(11,30,54,0.10) 100%
            )
          `,
        }} />

      {/* QWEN DIRECTION: Text upper-left third, asymmetric */}
      <div className="relative z-10 h-full flex flex-col justify-start pt-24 md:pt-32 lg:pt-40">
        <div className="mx-auto max-w-wrap px-6 md:px-10 w-full">

          <div className="max-w-[620px]">

            {/* Eyebrow — amber accent per Qwen */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px" style={{ background: "#FFC107", opacity: 0.7 }} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] font-mono"
                style={{ color: "#FFC107", opacity: 0.8 }}>
                Industrial Supply Chain Partner
              </p>
            </div>

            {/* Headline — bold geometric sans-serif, Qwen direction */}
            <h1 className="text-[40px] md:text-[52px] lg:text-[60px] font-bold leading-[1.04] text-white tracking-[-0.02em]"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}>
              {title}
            </h1>

            {/* Description — clean sans-serif body */}
            <p className="mt-5 text-[16px] md:text-[17px] leading-relaxed max-w-[540px]"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              {subtitle}
            </p>

            {/* CTAs — horizontal, slightly offset left per Qwen */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ctaPrimary.href}
                className="inline-flex items-center gap-2 px-8 py-4 text-[14px] font-semibold transition-colors duration-200"
                style={{ background: "#FFC107", color: "#0B1E36" }}>
                {ctaPrimary.label}
                <span className="text-[16px]">→</span>
              </Link>
              <Link href={ctaSecondary.href}
                className="inline-flex items-center gap-2 border px-8 py-4 text-[14px] font-medium transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)" }}>
                {ctaSecondary.label}
              </Link>
            </div>

          </div>

          {/* QWEN DIRECTION: Stats lower-right corner, semi-transparent */}
          <div className="absolute bottom-0 right-0 pb-12 md:pb-16 pr-6 md:pr-10 flex flex-wrap gap-x-10 gap-y-4"
            style={{ zIndex: 10 }}>
            {[
              { v: "300+", l: "Verified Factories" },
              { v: "4", l: "Manufacturing Hubs" },
              { v: "8", l: "Industrial Systems" },
              { v: "15+", l: "Countries Served" },
            ].map(s => (
              <div key={s.l} className="flex items-baseline gap-2">
                <span className="text-[24px] md:text-[28px] font-bold tabular-nums"
                  style={{ color: "rgba(255,255,255,0.65)" }}>{s.v}</span>
                <span className="text-[11px] font-mono uppercase tracking-[0.06em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}>{s.l}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
