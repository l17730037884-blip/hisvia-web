"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { DecoratedImage } from "@/components/visual/decorated-image";

export type ProductCarouselItem = {
  image: string;
  model: string;
  href: string;
  /** 2026-08-21 用户要求 05/07/08 等特定产品图默认放大 25%（用于 ASSET-05/07/08） */
  zoom25?: boolean;
};

const GROUP_SIZE = 8;

/**
 * 产品轮播：8 张一组（4 列 × 2 行），自动切换分组，分组之间用指示器/翻页按钮切换。
 * 用于 Products 列表页底部产品展示。
 */
export function ProductCarousel({ items }: { items: ProductCarouselItem[] }) {
  // 分组：每 8 张一组
  const groups: ProductCarouselItem[][] = [];
  for (let i = 0; i < items.length; i += GROUP_SIZE) {
    groups.push(items.slice(i, i + GROUP_SIZE));
  }

  const [index, setIndex] = useState(0);
  const goTo = useCallback(
    (i: number) => setIndex(() => (i + groups.length) % groups.length),
    [groups.length]
  );

  useEffect(() => {
    if (groups.length <= 1) return;
    const timer = setInterval(() => setIndex((v) => (v + 1) % groups.length), 5000);
    return () => clearInterval(timer);
  }, [groups.length, index]);

  if (groups.length === 0) return null;
  const current = groups[index] ?? groups[0];

  return (
    <div>
      {/* 移动端：2 列 × 4 行 = 8 张；桌面 md:3 列（3 行共 8）；lg:4 列 × 2 行 = 8 张 */}
      <ul
        key={index}
        className="product-grid grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
      >
        {current.map((item) => (
          <li key={item.href} className="product-card min-w-0">
            {/* 只保留一层外框：<Link> 提供 border + rounded + bg，卡内只有 DecoratedImage（已去掉自身border/rounded），
                彻底干掉移动端"两层围边→两个框"的视觉bug。 */}
            <Link
              href={item.href}
              className="card-link card-shadow group block overflow-hidden rounded-card border border-line bg-surface transition-all duration-500 ease-out card-hover"
            >
              <DecoratedImage
                src={item.image}
                alt={item.model}
                ratio="1 / 1"
                fit="contain"
                className="product-image rounded-none border-0 !bg-white !p-2 sm:!p-3 [&>*:first-child]:!p-0"
                imgClassName={
                  item.zoom25
                    ? "scale-[1.25] origin-center transition-transform duration-500 ease-out group-hover:scale-[1.32]"
                    : undefined
                }
              />
              {/* 去掉产品编号 */}
            </Link>
          </li>
        ))}
      </ul>

      {/* 指示器 + 左右翻页 */}
      {groups.length > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          <button
            type="button"
            aria-label="Previous group"
            onClick={() => goTo(index - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-300 hover:bg-ink hover:text-white md:h-10 md:w-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {groups.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Group ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 sm:h-2",
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-ink/30 sm:w-2"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next group"
            onClick={() => goTo(index + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors duration-300 hover:bg-ink hover:text-white md:h-10 md:w-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
