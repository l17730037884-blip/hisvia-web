"use client";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  image: string;
  badge?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function ProductHero({ title, subtitle, image, badge, cta, secondaryCta }: Props) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "90vh", background: "#0A0A0A" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] h-full">
        <div className="flex items-center px-6 md:px-12 py-20">
          <div className="max-w-[500px]">
            {badge && <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0066FF] mb-6 font-mono">{badge}</p>}
            <h1 className="text-white font-bold leading-[0.94] tracking-[-0.04em] mb-6" style={{ fontSize: "clamp(36px,5vw,72px)", fontFamily: "'Inter',-apple-system,sans-serif" }}>{title}</h1>
            {subtitle && <p className="text-[16px] text-white/35 mb-10 leading-relaxed">{subtitle}</p>}
            <div className="flex gap-4">
              {cta && <a href={cta.href} className="inline-flex px-6 py-3 text-[13px] font-semibold bg-[#0066FF] text-white rounded-[8px] hover:bg-[#0052CC] transition-colors">{cta.label} →</a>}
              {secondaryCta && <a href={secondaryCta.href} className="inline-flex px-6 py-3 text-[13px] font-semibold text-white/60 border border-white/10 rounded-[8px] hover:border-white/20 transition-colors">{secondaryCta.label}</a>}
            </div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          className="relative overflow-hidden" style={{ minHeight: "60vh", background: "#111" }}>
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #0A0A0A 0%, transparent 30%, transparent 70%, rgba(10,10,10,0.3) 100%)" }} />
        </motion.div>
      </div>
    </section>
  );
}
