"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface SystemCardProps {
  variant: "large" | "medium" | "compact";
  title: string;
  description?: string;
  image: string;
  href: string;
  tags?: string[];
}

export default function SystemCard({ variant, title, description, image, href, tags }: SystemCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
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

  const sizeClasses = {
    large: "col-span-2 row-span-2",
    medium: "col-span-1 row-span-1",
    compact: "col-span-1 row-span-1",
  };

  const imageRatio = {
    large: "aspect-[16/9]",
    medium: "aspect-[16/9]",
    compact: "aspect-[4/3]",
  };

  const textPadding = {
    large: "p-10",
    medium: "p-5",
    compact: "p-4",
  };

  const titleSize = {
    large: "text-[22px] md:text-[26px]",
    medium: "text-[18px] md:text-[20px]",
    compact: "text-[15px] md:text-[16px]",
  };

  const bodySize = {
    large: "text-[14px] md:text-[15px]",
    medium: "text-[13px]",
    compact: "text-[12px]",
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`block border border-line bg-white hover:border-steel/40 transition-all duration-300 group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${sizeClasses[variant]}`}
      style={{ transitionDuration: "600ms" }}
    >
      <div className={`relative ${imageRatio[variant]} bg-surface border-b border-line overflow-hidden`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-3 group-hover:scale-[1.03] transition-transform duration-300"
          sizes={variant === "large" ? "600px" : variant === "medium" ? "400px" : "300px"}
        />
        {tags && tags.length > 0 && variant === "large" && (
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {tags.map((t) => (
              <span key={t} className="text-[10px] font-semibold uppercase tracking-wider bg-navy/85 text-white px-2.5 py-1">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={textPadding[variant]}>
        <h3 className={`${titleSize[variant]} font-bold text-navy mb-1.5 leading-tight group-hover:text-steel transition-colors`}>
          {title}
        </h3>
        {description && (
          <p className={`${bodySize[variant]} text-steel leading-relaxed`}>
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

export function SystemCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto">
      {children}
    </div>
  );
}
