"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { tabs: { id: string; label: string; content: React.ReactNode }[]; }

export default function TabPanel({ tabs }: Props) {
  const [tab, setTab] = useState(tabs[0]?.id || "");
  return (
    <div>
      <div className="flex gap-0 border-b border-[#E8E8ED] mb-4">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`relative px-4 pb-2.5 text-[12px] font-semibold transition-colors ${tab === t.id ? "text-[#0A0A0A]" : "text-[#999] hover:text-[#666]"}`}>
            {t.label}
            {tab === t.id && <motion.div layoutId="tp-line" className="absolute bottom-0 left-0 right-0 h-px bg-[#0066FF]" />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          {tabs.find(t => t.id === tab)?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
