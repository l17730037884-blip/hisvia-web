"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { images: { src: string; label: string }[]; }

export default function PartGallery({ images }: Props) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[12px] bg-[#0A0A0A]" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence mode="wait">
          <motion.img key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            src={images[idx].src} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.75)" }} />
        </AnimatePresence>
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-[4px] bg-black/60 text-[11px] text-white/60">{images[idx].label}</div>
      </div>
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-16 h-12 rounded-[6px] overflow-hidden border-2 transition-colors ${i === idx ? "border-[#0066FF]" : "border-transparent opacity-50 hover:opacity-80"}`}>
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
