"use client";

import { motion } from "framer-motion";
import { scaleIn } from "@/lib/motion/hisvia-motion";

interface Props {
  src: string;
  label?: string;
  stats?: { v: string; l: string }[];
}

// For Capability/Factory sections: image + data overlay
export default function IndustrialProductShowcase({ src, label, stats }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[12px]" style={{ background: "#0A0A0A", minHeight: 320 }}>
      <motion.img
        variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
        src={src} alt={label || ""} className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.7)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,10,10,0.7) 0%, transparent 50%)" }} />
      {label && (
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.1em]">{label}</p>
        </div>
      )}
      {stats && (
        <div className="absolute top-4 right-4 flex gap-2">
          {stats.map((s, i) => (
            <div key={i} className="px-3 py-1.5 rounded-[6px] bg-black/60 backdrop-blur-sm border border-white/10">
              <div className="text-[14px] font-bold text-white">{s.v}</div>
              <div className="text-[9px] text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
