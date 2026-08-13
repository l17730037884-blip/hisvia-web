"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { t as tm, scaleIn } from "@/lib/motion/hisvia-motion";

interface Props {
  src: string;
  alt?: string;
  priority?: boolean;
}

// Industrial equipment visual with subtle depth effect on mouse move
export default function IndustrialHeroVisual({ src, alt = "", priority }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPos({ x: x * 8, y: y * 6 });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden w-full h-full" style={{ background: "#0A0A0A" }}>
      <motion.div
        variants={scaleIn} initial="hidden" animate="visible"
        className="absolute inset-0"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(1.02)`,
          transition: "transform 0.8s cubic-bezier(0.22, 0.05, 0.19, 0.98)",
        }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.65) saturate(0.85)", objectPosition: "center 35%" }}
          loading={priority ? "eager" : "lazy"}
        />
      </motion.div>

      {/* Depth layers */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, rgba(10,10,10,0.5) 0%, transparent 40%, rgba(10,10,10,0.6) 100%)",
      }} />
      {/* Subtle highlight */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,102,255,0.8))" }} />
    </div>
  );
}
