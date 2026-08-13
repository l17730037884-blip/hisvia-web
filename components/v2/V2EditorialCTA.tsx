"use client";

import { motion } from "framer-motion";
import { NIGHT, PAPER, ACCENT, BRAND_CSS, reveal } from "./V2BrandKit";

interface V2EditorialCTAProps {
  eyebrow: string;
  title: string;
  desc?: string;
  ctaLabel: string;
  href: string;
  note?: string;
}

/* Shared dark closing CTA — mirrors homepage S7 (A system). */
export default function V2EditorialCTA({ eyebrow, title, desc, ctaLabel, href, note }: V2EditorialCTAProps) {
  return (
    <section className="v2sub py-20 lg:py-28" style={{ background: NIGHT }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_CSS }} />
      <div className="mx-auto w-full max-w-[1500px] px-6 text-center md:px-10">
        <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.26em", color: "#8B8F93", textTransform: "uppercase" }}>{eyebrow}</motion.p>
        <motion.h2 {...reveal} className="display mx-auto mt-4 max-w-[720px] text-[clamp(28px,3.2vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ color: PAPER }}>
          {title}
        </motion.h2>
        {desc && <motion.p {...reveal} className="mx-auto mt-5 max-w-[560px] text-[14.5px] leading-relaxed" style={{ color: "#B9BCBF" }}>{desc}</motion.p>}
        <motion.div {...reveal} className="mt-10">
          <a href={href} className="display inline-block px-10 py-4 text-[15px] font-semibold tracking-[-0.01em] transition-opacity hover:opacity-85" style={{ background: ACCENT, color: "#fff" }}>
            {ctaLabel}
          </a>
        </motion.div>
        {note && <motion.p {...reveal} className="mono mt-6 text-[9px] tracking-[0.18em] uppercase" style={{ color: "#8B8F93" }}>{note}</motion.p>}
      </div>
    </section>
  );
}
