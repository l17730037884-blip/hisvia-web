"use client";
import { useEffect, useRef, useState } from "react";

interface RegionHubCardProps {
  count: string;
  name: string;
  specialization: string;
  highlight: string;
}

export default function RegionHubCard({ count, name, specialization, highlight }: RegionHubCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="border border-line bg-surface p-6 hover:border-steel/30 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 500ms ease-out, transform 500ms ease-out, border-color 300ms ease",
      }}
    >
      <div className="text-[28px] font-bold text-navy mb-1 leading-none">{count}</div>
      <div className="text-[16px] font-bold text-navy mb-2">{name}</div>
      <div className="text-[12px] text-steel leading-relaxed mb-3">{specialization}</div>
      <div className="text-[11px] text-amber font-medium border-t border-line pt-3">{highlight}</div>
    </div>
  );
}
