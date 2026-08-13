"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface V2HeroProps {
  kicker?: string;
  title: string;
  description: string;
  heroImage?: string | null;
  heroAsset?: any;
  heroAlt?: string;
  heroBackups?: string[];
  heroImageScore?: number;
  cta?: { label: string; href: string };
  stats?: { value: string; label: string }[];
  variant?: "image" | "light" | "dark" | "product";
}

export default function V2Hero({
  kicker,
  title,
  description,
  heroImage,
  heroAlt = "Industrial manufacturing",
  heroBackups,
  cta,
  variant = "image",
}: V2HeroProps) {
  const allImages = [heroImage, ...(heroBackups || [])].filter(Boolean) as string[];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const next = useCallback(() => {
    setImgLoaded(false);
    setCurrentIdx((i) => (i + 1) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [allImages.length, next]);

  const currentImage = allImages[currentIdx] || heroImage || null;

  // PRODUCT variant
  if (variant === "product") {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0E2440] to-[#162D4A] border-b border-white/10">
        <div className="mx-auto max-w-wrap px-6">
          <div className="grid grid-cols-1 gap-8 pt-16 pb-16 md:grid-cols-[1fr_1.5fr] md:pt-20 md:pb-20 md:min-h-[680px]">
            <div className="flex flex-col justify-center">
              {kicker && (
                <p className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-[#4A8FD6]">
                  <span className="h-px w-6 bg-amber" /> {kicker}
                </p>
              )}
              <h1 className="max-w-md text-[32px] font-bold leading-[1.12] text-white md:text-[40px] lg:text-[48px]">{title}</h1>
              <p className="mt-5 max-w-sm text-[15px] text-white/60 leading-relaxed">{description}</p>
              {cta && (
                <div className="mt-8">
                  <a href={cta.href} className="inline-flex items-center gap-2 bg-steel px-6 py-3 text-[14px] font-semibold text-white hover:bg-navy transition-colors" style={{ borderRadius: "4px" }}>
                    {cta.label} <span>→</span>
                  </a>
                </div>
              )}
            </div>
            <div className="relative min-h-[320px] md:min-h-0">
              {currentImage && (
                <Image src={currentImage} alt={heroAlt} fill className="object-contain" sizes="55vw" priority />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // INDUSTRIAL HERO — Pure photography. Image is the message.
  // Min text. No badges. No floating elements. No parallax tricks.
  return (
    <section className="relative overflow-hidden bg-navy" style={{ height: "100vh", maxHeight: "860px" }}>
      {/* Image — full bleed, the star of the show */}
      {currentImage && (
        <Image
          key={currentImage}
          src={currentImage}
          alt={heroAlt}
          fill
          className="object-cover"
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 1.2s ease" }}
          sizes="100vw"
          priority
          onLoad={() => setImgLoaded(true)}
        />
      )}

      {/* Subtle gradient — just enough for text legibility, not heavy */}
      <div className="absolute inset-0 z-10" style={{
        background: "linear-gradient(180deg, rgba(10,22,40,0.0) 0%, rgba(10,22,40,0.08) 50%, rgba(10,22,40,0.55) 85%, rgba(10,22,40,0.78) 100%)"
      }} />

      {/* Text — minimal, anchored bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-16 md:pb-20">
        <div className="mx-auto max-w-wrap px-6 md:px-10">
          <div className="max-w-[580px]">
            {/* Eyebrow — tiny, restrained */}
            {kicker && (
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber/75 font-mono">
                {kicker}
              </p>
            )}

            {/* Headline — 2 lines max */}
            <h1 className="text-[38px] md:text-[50px] lg:text-[60px] font-bold leading-[1.06] text-white tracking-[-0.015em]">
              {title}
            </h1>

            {/* Description — 1 sentence */}
            <p className="mt-4 text-[16px] md:text-[17px] text-white/55 leading-relaxed max-w-[440px]">
              {description}
            </p>

            {/* Single CTA — understated */}
            {cta && (
              <div className="mt-8">
                <a
                  href={cta.href}
                  className="inline-flex items-center gap-2 bg-white text-navy px-7 py-3.5 text-[14px] font-semibold hover:bg-white/90 transition-colors group"
                  style={{ borderRadius: "3px" }}
                >
                  <span>{cta.label}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image dots — only if multiple images */}
      {allImages.length > 1 && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIdx(i); setImgLoaded(false); }}
              className={`transition-all duration-300 ${
                i === currentIdx ? "bg-white w-6 h-[3px]" : "bg-white/25 w-[3px] h-[3px] hover:bg-white/40"
              }`}
              style={{ borderRadius: "1px" }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
