"use client";
import { useEffect, useRef, useState } from "react";

interface DataItem {
  value: string;
  label: string;
  sub: string;
}

export default function IndustrialDataRail({ items }: { items: DataItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-10 border-b border-white/10 bg-navy text-white">
      <div className="mx-auto max-w-wrap px-6">
        <div className="flex flex-wrap items-center justify-between gap-y-6">
          {items.map((item, i) => (
            <div key={item.label} className="flex items-center gap-5">
              <CountUp target={parseInt(item.value) || 0} suffix={item.value.replace(/[0-9]/g, "")} visible={visible} />
              <div>
                <div className="text-[13px] font-semibold text-white/80">{item.label}</div>
                <div className="text-[11px] text-white/40">{item.sub}</div>
              </div>
              {i < items.length - 1 && (
                <div className="hidden lg:block w-px h-12 bg-white/15 mx-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ target, suffix, visible }: { target: number; suffix: string; visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, target]);

  return (
    <div className="text-[36px] md:text-[42px] font-bold text-white leading-none tabular-nums">
      {count}{suffix}
    </div>
  );
}
