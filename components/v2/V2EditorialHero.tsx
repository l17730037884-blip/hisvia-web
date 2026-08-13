"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { AssetEntry } from "@/lib/content-v2/types";
import { PAPER, INK, DIM, ACCENT, LINE, LINE_D, PAPER_D, NIGHT, BRAND_CSS, reveal, EASE } from "./V2BrandKit";

interface V2EditorialHeroProps {
  kicker: string;
  title: string;
  description: string;
  asset?: AssetEntry | null;
  cta?: { label: string; href: string };
  note?: string;
  caption?: string;
}

/* ============================================================
   A-system hero — photographic split hero in the homepage's
   editorial system. Large evidence image, scroll parallax,
   caption strip. No navy block, no dashboard, no empty wall.
   ============================================================ */
export default function V2EditorialHero({ kicker, title, description, asset, cta, note, caption }: V2EditorialHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.09]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 46]);

  return (
    <section ref={ref} className="v2sub relative border-b" style={{ borderColor: LINE, background: PAPER }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_CSS }} />
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-[10fr_14fr] lg:py-24">
        <motion.div style={{ y: yText }}>
          <motion.p {...reveal} className="mono flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.26em", color: DIM, textTransform: "uppercase" }}>
            <span className="inline-block h-[6px] w-[6px]" style={{ background: ACCENT }} />
            {kicker}
          </motion.p>
          <motion.h1 {...reveal} transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="display mt-6 text-[clamp(34px,4.6vw,64px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: INK }}>
            {title}
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="mt-6 max-w-[520px] text-[15px] leading-relaxed" style={{ color: DIM }}>
            {description}
          </motion.p>
          {cta && (
            <motion.div {...reveal} transition={{ duration: 0.8, delay: 0.24, ease: EASE }} className="mt-9">
              <a href={cta.href} className="display inline-block px-8 py-4 text-[15px] font-semibold tracking-[-0.01em] text-white transition-opacity hover:opacity-85" style={{ background: INK }}>
                {cta.label}
              </a>
            </motion.div>
          )}
          {note && (
            <motion.p {...reveal} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="mono mt-5 text-[9px] tracking-[0.18em] uppercase" style={{ color: "#A7A9A4" }}>
              {note}
            </motion.p>
          )}
        </motion.div>

        <motion.div {...reveal} transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          className="relative min-h-[300px] overflow-hidden border sm:min-h-[420px] lg:min-h-[560px]" style={{ borderColor: LINE_D }}>
          {asset ? (
            <>
              <motion.img
                src={asset.path}
                alt={asset.filename}
                style={{ scale }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,19,21,0) 62%, rgba(16,19,21,0.42) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-3 px-5 py-4">
                <span className="mono text-[9px] tracking-[0.18em] uppercase" style={{ color: PAPER }}>
                  {caption ?? "China manufacturing evidence"}
                </span>
                <span className="mono hidden text-[8.5px] tracking-[0.18em] uppercase sm:block" style={{ color: "#C9CBC8" }}>
                  HISVIA verified imagery
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-[300px] w-full items-end px-6 py-6 sm:min-h-[420px]" style={{ background: PAPER_D }}>
              <p className="mono text-[10px] leading-relaxed tracking-[0.18em] uppercase" style={{ color: "#8B8F93" }}>{kicker}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
