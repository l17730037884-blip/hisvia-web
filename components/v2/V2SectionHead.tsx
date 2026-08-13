"use client";

import { motion } from "framer-motion";
import { INK, DIM, FAINT, BRAND_CSS, reveal } from "./V2BrandKit";

interface V2SectionHeadProps {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}

/* Shared editorial section header (A system). */
export default function V2SectionHead({ eyebrow, title, desc, align = "left" }: V2SectionHeadProps) {
  return (
    <div className="v2sub" style={align === "center" ? { textAlign: "center" } : undefined}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_CSS }} />
      <div className={align === "center" ? "mx-auto" : "max-w-[720px]"}>
        <motion.p {...reveal} className="mono" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>{eyebrow}</motion.p>
        <motion.h2 {...reveal} className="display mt-3 text-[clamp(24px,2.4vw,36px)] font-semibold leading-[1.06] tracking-[-0.03em]" style={{ color: INK }}>{title}</motion.h2>
        {desc && <motion.p {...reveal} className="mt-4 text-[14px] leading-relaxed" style={{ color: DIM }}>{desc}</motion.p>}
      </div>
    </div>
  );
}
