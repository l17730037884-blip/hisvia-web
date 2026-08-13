"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface EditorialFeatureBlockProps {
  image: string;
  kicker?: string;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
  href?: string;
  linkLabel?: string;
  reverse?: boolean;
}

export default function EditorialFeatureBlock({
  image, kicker, title, description, stats, href, linkLabel, reverse,
}: EditorialFeatureBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="mx-auto max-w-wrap px-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-center ${
            reverse ? "md:[direction:rtl]" : ""
          }`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 600ms ease-out, transform 600ms ease-out",
          }}
        >
          {/* Image */}
          <div className={reverse ? "md:[direction:ltr]" : ""}>
            <div className="relative aspect-[16/10] bg-surface border border-line overflow-hidden group">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          </div>

          {/* Text */}
          <div className={reverse ? "md:[direction:ltr]" : ""}>
            {kicker && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-steel mb-4">
                {kicker}
              </p>
            )}
            <h2 className="text-[28px] md:text-[32px] font-bold text-navy mb-4 leading-[1.15]">
              {title}
            </h2>
            <p className="text-[14px] md:text-[15px] text-steel leading-relaxed mb-6 max-w-[480px]">
              {description}
            </p>

            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-line">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-[22px] font-bold text-navy leading-none">{s.value}</div>
                    <div className="text-[11px] text-steel mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {href && (
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-steel hover:text-navy transition-colors group/link"
              >
                <span>{linkLabel || "Learn more"}</span>
                <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
