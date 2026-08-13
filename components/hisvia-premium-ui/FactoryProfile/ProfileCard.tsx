"use client";
import { motion } from "framer-motion";

interface Props { name: string; location: string; image: string; metrics: { v: string; l: string }[]; certifications: string[]; verified?: boolean; className?: string; }

export default function ProfileCard({ name, location, image, metrics, certifications, verified = true, className = "" }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className={`rounded-[16px] overflow-hidden border border-[#E8E8ED] bg-white ${className}`} style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.03)" }}>
      <div className="relative h-48 bg-[#0A0A0A]">
        <img src={image} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
        {verified && <div className="absolute top-3 right-3 px-2 py-1 rounded-[4px] bg-green-500/90 text-[10px] font-bold text-white uppercase">Verified</div>}
      </div>
      <div className="p-5">
        <h3 className="text-[16px] font-bold text-[#0A0A0A] mb-1" style={{ fontFamily: "'Inter',-apple-system,sans-serif" }}>{name}</h3>
        <p className="text-[12px] text-[#999] mb-4">{location}</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {metrics.map((m, i) => (
            <div key={i} className="p-2 rounded-[6px] bg-[#FAFAFA]">
              <div className="text-[15px] font-bold text-[#0A0A0A] tabular-nums">{m.v}</div>
              <div className="text-[9px] text-[#999] uppercase tracking-[0.05em]">{m.l}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {certifications.map(c => <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-[4px] bg-green-500/5 text-green-600 border border-green-500/15">{c}</span>)}
        </div>
      </div>
    </motion.div>
  );
}
