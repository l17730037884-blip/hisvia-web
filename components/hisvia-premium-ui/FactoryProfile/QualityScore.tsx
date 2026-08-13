"use client";
import { motion } from "framer-motion";

interface Props { score: number; label?: string; }

export default function QualityScore({ score, label = "Quality Score" }: Props) {
  return (
    <div className="p-5 rounded-[12px] border border-[#E8E8ED] bg-white">
      <div className="flex items-end justify-between mb-3">
        <span className="text-[11px] font-semibold text-[#999] uppercase tracking-[0.08em]">{label}</span>
        <span className="text-[32px] font-bold text-[#0A0A0A] leading-none tabular-nums">{score}<span className="text-[16px] text-[#999]">/100</span></span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-[#F0F0F0]">
        <motion.div initial={{ width: 0 }} whileInView={{ width: score + "%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
          className="h-full rounded-full bg-green-500" />
      </div>
    </div>
  );
}
