"use client";
import { motion } from "framer-motion";

interface Props { value: number; max?: number; label: string; color?: string; }

export default function ProgressBar({ value, max = 100, label, color = "#22C55E" }: Props) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-[11px] text-[#666]">{label}</span>
        <span className="text-[11px] font-semibold text-[#0A0A0A] tabular-nums">{value}/{max}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-[#F0F0F0]">
        <motion.div initial={{ width: 0 }} whileInView={{ width: pct + "%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          className="h-full rounded-full" style={{ background: color }} />
      </div>
    </div>
  );
}
