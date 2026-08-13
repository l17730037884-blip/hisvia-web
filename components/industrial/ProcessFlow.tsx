"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProcessStep {
  title: string;
  image: string;
  description: string;
  stats: string;
}

export default function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-step-index"));
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );

    const stepEls = el.querySelectorAll("[data-step-index]");
    stepEls.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-20">
      <div className="mx-auto max-w-wrap px-6">
        <h2 className="text-[32px] md:text-[40px] font-bold text-navy mb-3 leading-[1.15]">
          Manufacturing Process
        </h2>
        <p className="text-[15px] text-steel mb-12 max-w-[540px]">
          From raw material to final export — full traceability at every stage
        </p>
        <div className="relative max-w-[880px] mx-auto">
          <svg
            className="absolute left-[28px] top-0 h-full w-[2px] hidden md:block"
            style={{ zIndex: 0 }}
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            <line x1="1" y1="0" x2="1" y2="100" stroke="#B9D8F0" strokeWidth="2" strokeDasharray="6 4" />
          </svg>

          {steps.map((step, i) => {
            const visible = visibleSteps[i] || false;
            return (
              <div
                key={i}
                data-step-index={i}
                className={`relative grid grid-cols-1 md:grid-cols-[56px_1fr_1fr] gap-6 mb-16 last:mb-0 transition-all duration-[600ms] ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="hidden md:flex items-start justify-center pt-2 relative z-10">
                  <div className="w-[14px] h-[14px] rounded-[2px] bg-navy border-2 border-white ring-2 ring-line flex-shrink-0" />
                </div>

                <div className="relative aspect-[16/9] bg-surface border border-line overflow-hidden group">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="md:hidden absolute top-3 left-3 w-[28px] h-[28px] rounded-[2px] bg-navy/80 text-white text-[12px] font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-[18px] md:text-[20px] font-bold text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-steel leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <div className="text-[11px] font-semibold text-amber uppercase tracking-wider border-l-2 border-amber pl-3">
                    {step.stats}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
