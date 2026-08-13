"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { vp } from "@/lib/motion/hisvia-motion";

interface Props {
  value: string;
  label: string;
  accent?: boolean;
  className?: string;
}

// Animated data metric with tabular numbers
export default function DataMetric({ value, label, accent }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.4 }}
      className="text-center">
      <div
        className="text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.03em] tabular-nums leading-none"
        style={{ color: accent ? "#0066FF" : "inherit", fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mt-1.5 opacity-50">{label}</div>
    </motion.div>
  );
}
