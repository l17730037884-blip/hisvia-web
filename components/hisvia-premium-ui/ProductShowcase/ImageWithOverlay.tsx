"use client";
import { motion } from "framer-motion";

interface Props { src: string; label?: string; stats?: { v: string; l: string }[]; aspect?: string; className?: string; }

export default function ImageWithOverlay({ src, label, stats, aspect = "16/10", className = "" }: Props) {
  return (
    <motion.div initial={{ opacity: 0, scale: 1.02 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      className={`relative overflow-hidden rounded-[12px] bg-[#0A0A0A] ${className}`} style={{ aspectRatio: aspect }}>
      <img src={src} alt={label || ""} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,10,10,0.6) 0%, transparent 50%)" }} />
      {label && <div className="absolute bottom-4 left-4"><p className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.1em]">{label}</p></div>}
      {stats && <div className="absolute top-4 right-4 flex gap-2">{stats.map((s,i) => (
        <div key={i} className="px-3 py-1.5 rounded-[6px] bg-black/60 border border-white/10">
          <div className="text-[14px] font-bold text-white">{s.v}</div><div className="text-[9px] text-white/40">{s.l}</div>
        </div>
      ))}</div>}
    </motion.div>
  );
}
