"use client";
import { motion } from "framer-motion";

interface Props { primaryLabel: string; primaryHref: string; secondaryLabel?: string; secondaryHref?: string; }

export default function StickyBar({ primaryLabel, primaryHref, secondaryLabel, secondaryHref }: Props) {
  return (
    <motion.div initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 1, type: "spring", stiffness: 200, damping: 28 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between bg-white/90 backdrop-blur-xl border-t border-[#E8E8ED]">
      <span className="text-[13px] font-semibold text-[#0A0A0A]">Ready to start?</span>
      <div className="flex gap-3">
        <a href={primaryHref} className="px-5 py-2 text-[12px] font-semibold bg-[#0066FF] text-white rounded-[8px] hover:bg-[#0052CC] transition-colors">{primaryLabel}</a>
        {secondaryLabel && secondaryHref && <a href={secondaryHref} className="px-5 py-2 text-[12px] font-semibold text-[#666] border border-[#E8E8ED] rounded-[8px] hover:bg-[#FAFAFA] transition-colors">{secondaryLabel}</a>}
      </div>
    </motion.div>
  );
}
