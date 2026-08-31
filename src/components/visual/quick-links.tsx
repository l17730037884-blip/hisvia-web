"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useScrollCollapse } from "@/hooks/use-scroll-collapse";

export type QuickLink = { label: string; href: string; description?: string };

/* ── 自定义 SVG 图标（24×24，stroke 风格，匹配站点设计） ── */

function ProductsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.5" cy="15.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5.5" cy="15.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8.8v.6M14.5 13.8l.5.3M9.5 13.8l-.5.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CustomizationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.5 4.5a3.5 3.5 0 0 0-4.6 4.4L4 14.8l2.7 2.7 5.9-5.9a3.5 3.5 0 0 0 4.4-4.6l-2 2-2-2 1.5-1.9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CertificationsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 3h12v11H6zM9 14l-1.5 6 4.5-2.5L16.5 20 15 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 6h6M9 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5h16v10H4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M4 6l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M14 16c0 1.5 1 2.5 2.5 2.5h.5v3l-2.5-1.5c-1.8 0-3-.9-3-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="rtl:-scale-x-100">
      <path d="M3 8h9m-3-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICON_MAP: Record<string, () => ReactElement> = {
  products: ProductsIcon,
  customization: CustomizationIcon,
  certifications: CertificationsIcon,
  contact: ContactIcon,
};

function pickIcon(href: string) {
  const key = Object.keys(ICON_MAP).find((k) => href.includes(`/${k}`));
  return key ? ICON_MAP[key] : null;
}

/**
 * 4 个 Quick Links 卡片 — 2026-08-21 用户要求"下面那组完全可以精简缩小50%"
 *
 * 移动端伸缩交互（同 TaskGrid）：
 *  - <768px 默认折叠（极薄）
 *  - 元素滚入视口且中点没过视口中线 → 展开
 *  - 元素中点越过视口中线 / 滚出 → 折叠回去（可重复）
 *  - 桌面端 md+ 始终展开全量内容
 */
export function QuickLinks({ items }: { items: QuickLink[] }) {
  const { ref, expanded } = useScrollCollapse<HTMLUListElement>();

  return (
    <ul
      ref={ref}
      className={cn(
        "grid transition-[gap] duration-300 ease-out",
        expanded
          ? "grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4"
          : "grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-4"
      )}
    >
      {items.map((item) => {
        const Icon = pickIcon(item.href);
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                "no-text-hover-override group relative flex h-full flex-col justify-between overflow-hidden border border-line bg-surface transition-[padding,transform,box-shadow,border-color,background-color,border-radius] duration-300",
                "hover:-translate-y-0.5 hover:border-accent hover:bg-accent",
                expanded
                  ? "rounded-card p-4 md:p-6 hover:shadow-[0_10px_36px_-10px_rgba(0,0,0,0.3)]"
                  : "rounded-[8px] px-2 py-1.5 hover:shadow-[0_6px_24px_-14px_rgba(0,120,168,0.5)]"
              )}
            >
              {/* 高光：左上 135° 渐变 — 卡变蓝底后保留做玻璃微闪，亮度调低避免过曝 */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/14 to-transparent opacity-0 transition-[opacity,border-radius] duration-300 group-hover:opacity-100",
                  expanded ? "rounded-card" : "rounded-[8px]"
                )}
              />

              <div
                className={cn(
                  "relative z-10 flex items-center transition-[gap] duration-300",
                  expanded ? "gap-3 md:gap-4" : "gap-1.5"
                )}
              >
                {/* 图标徽章：折叠态 h-6 + SVG scale-0.7（视觉缩小约50%面积感） */}
                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-full bg-accent-pale text-accent transition-all duration-300",
                    "group-hover:!bg-white group-hover:!text-accent group-hover:shadow-[0_6px_18px_-6px_rgba(0,0,0,0.28)]",
                    expanded ? "h-11 w-11 md:h-11 md:w-11" : "h-6 w-6"
                  )}
                >
                  {Icon ? (
                    <span className={cn(expanded ? "" : "scale-[0.7] origin-center")}>
                      <Icon />
                    </span>
                  ) : (
                    <span className={cn(expanded ? "" : "scale-[0.7] origin-center")}>
                      <ArrowIcon />
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "block min-w-0 flex-1 font-display font-semibold tracking-[-0.02em] text-ink transition-[font-size,line-height] duration-300 group-hover:!text-white",
                    expanded
                      ? "leading-[1.3] text-[0.9375rem] md:text-[1rem]"
                      : "truncate leading-none text-[0.75rem]"
                  )}
                >
                  {item.label}
                </span>
              </div>

              {/* 可伸缩区 = description（如果有）+ 底部箭头指示器；折叠态 0fr 完全隐藏 */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows,margin] duration-500 ease-out",
                  "md:grid-rows-[1fr] md:mt-5",
                  expanded ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0"
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="flex flex-col">
                    {item.description ? (
                      <p className="text-[0.8125rem] leading-snug text-ink-muted transition-colors duration-200 group-hover:!text-white/85 pt-1 md:pt-2">
                        {item.description}
                      </p>
                    ) : null}
                    {/* 底部箭头指示：hover卡变accent蓝 → 全段浅白色；滑动线条高亮白 */}
                    <span
                      className={cn(
                        "relative z-10 flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted transition-colors duration-200 group-hover:!text-white",
                        item.description ? "mt-4 md:mt-5" : "mt-4"
                      )}
                    >
                      <span className="rtl:-scale-x-100">→</span>
                      <span className="relative h-px w-8 overflow-hidden">
                        <span className="absolute inset-0 -translate-x-full rtl:translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
                      </span>
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
