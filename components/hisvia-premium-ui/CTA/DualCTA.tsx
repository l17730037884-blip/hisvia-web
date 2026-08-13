"use client";
import { motion } from "framer-motion";

interface Props { title: string; subtitle?: string; primaryLabel: string; primaryHref: string; secondaryLabel?: string; secondaryHref?: string; }

export default function DualCTA({ title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: Props) {
  return (
    <section className="py-32 md:py-44 text-center" style={{ background: "#0A0A0A" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[640px] mx-auto px-6">
        <h2 className="text-[clamp(28px,5vw,56px)] font-bold text-white leading-[0.98] tracking-[-0.04em] mb-5" style={{ fontFamily: "'Inter',-apple-system,sans-serif" }}>{title}</h2>
        {subtitle && <p className="text-[16px] text-white/30 mb-12 leading-relaxed">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={primaryHref} className="inline-flex px-8 py-4 text-[14px] font-bold bg-[#0066FF] text-white rounded-[12px] hover:bg-[#0052CC] transition-colors" style={{ boxShadow: "0 0 40px rgba(0,102,255,0.2)" }}>
            {primaryLabel} →
          </a>
          {secondaryLabel && secondaryHref && (
            <a href={secondaryHref} className="inline-flex px-8 py-4 text-[14px] font-semibold text-white/60 border border-white/10 rounded-[12px] hover:border-white/20 transition-colors">
              {secondaryLabel}
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
