"use client";
import { motion } from "framer-motion";

interface Props { value: string; label: string; accent?: boolean; }

export default function MetricBar({ value, label, accent }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
      className="text-center">
      <div className={`text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.03em] leading-none tabular-nums ${accent ? "text-[#0066FF]" : "text-[#0A0A0A]"}`}>
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.1em] mt-1.5 text-[#999]">{label}</div>
    </motion.div>
  );
}
