"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface FactoryEvidenceCardProps {
  image: string;
  region: string;
  capability: string;
  verified?: boolean;
}

export default function FactoryEvidenceCard({ image, region, capability, verified }: FactoryEvidenceCardProps) {
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
      className="relative aspect-[4/3] bg-surface border border-line overflow-hidden group cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 500ms ease-out, transform 500ms ease-out",
      }}
    >
      <Image
        src={image}
        alt={`${region} - ${capability}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 50vw, 33vw"
      />

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-navy/85 via-navy/30 to-transparent pointer-events-none" />

      {/* Verified badge */}
      {verified && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 text-navy text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
          <span className="w-[6px] h-[6px] bg-[#22C55E] rounded-full" />
          Verified
        </div>
      )}

      {/* Region + Capability overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1">
          {region}
        </div>
        <div className="text-[14px] font-bold text-white leading-tight">
          {capability}
        </div>
      </div>
    </div>
  );
}
