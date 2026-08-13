"use client";
import { motion } from "framer-motion";

interface Props { value: string; label: string; sub?: string; className?: string; }

export default function StatCard({ value, label, sub, className = "" }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className={`flex items-start gap-4 p-4 rounded-[10px] border border-[#E8E8ED] bg-white ${className}`}>
      <div className="text-[28px] font-bold text-[#0A0A0A] tracking-[-0.02em] leading-none tabular-nums">{value}</div>
      <div>
        <div className="text-[12px] font-semibold text-[#0A0A0A]">{label}</div>
        {sub && <div className="text-[10px] text-[#999] mt-0.5">{sub}</div>}
      </div>
    </motion.div>
  );
}
