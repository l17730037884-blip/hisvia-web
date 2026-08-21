"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

export type ImageCarouselSlide = {
  src: string;
  alt?: string;
};

/**
 * 大图轮播：单张全宽展示，自动切换 + 指示器 + 左右翻页。
 * 用于 Hero / 详情页大图场景，不做文字叠加（文字由外层布局承载）。
 */
export function ImageCarousel({
  slides,
  ratio = "16 / 9",
  autoPlayMs = 5000,
  className,
}: {
  slides: ImageCarouselSlide[];
  ratio?: string;
  autoPlayMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => setIndex(() => (i + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setIndex((v) => (v + 1) % slides.length), autoPlayMs);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayMs, index]);

  if (slides.length === 0) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-img border border-line bg-canvas",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      {slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={s.src}
          alt={s.alt ?? ""}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-bottom transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {/* 指示器（玻璃容器） */}
      {slides.length > 1 ? (
        <div className="glass-strong absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full px-3 py-1.5 md:bottom-4">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Image ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all sm:h-2",
                i === index ? "w-6 bg-accent" : "w-1.5 bg-ink/30 sm:w-2"
              )}
            />
          ))}
        </div>
      ) : null}

      {/* 左右翻页（玻璃按钮） */}
      {slides.length > 1 ? (
        <div className="absolute bottom-3 right-3 z-20 flex gap-2 md:bottom-4 md:right-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(index - 1)}
            className="glass flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white md:h-9 md:w-9"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(index + 1)}
            className="glass flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white md:h-9 md:w-9"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
