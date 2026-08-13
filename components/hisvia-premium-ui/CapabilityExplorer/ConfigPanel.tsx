"use client";
import { motion, AnimatePresence } from "framer-motion";

interface Props { step: number; children: React.ReactNode; }

export default function ConfigPanel({ step, children }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
