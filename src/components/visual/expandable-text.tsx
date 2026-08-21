"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * 移动端折叠文本：小屏截断到 N 行 + "展开"按钮，
 * 桌面端（md+）全文显示无截断。
 */
export function ExpandableText({
  children,
  lines = 4,
  className,
  textClassName,
  expandLabel = "展开",
  collapseLabel = "收起",
}: {
  children: ReactNode;
  lines?: number;
  className?: string;
  textClassName?: string;
  expandLabel?: string;
  collapseLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  // Tailwind 不支持动态 line-clamp-N，用固定映射
  const clampClass: Record<number, string> = {
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
    5: "line-clamp-5",
    6: "line-clamp-6",
  };
  const clamp = clampClass[lines] ?? "line-clamp-4";

  return (
    <div className={className}>
      <div
        className={cn(
          textClassName,
          !expanded && `${clamp} md:line-clamp-none`
        )}
      >
        {children}
      </div>
      {/* 展开/收起按钮：仅移动端显示 */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-2 inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-accent transition-opacity hover:opacity-70 md:hidden"
        aria-expanded={expanded}
      >
        {expanded ? collapseLabel : expandLabel}
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          className={cn("transition-transform", expanded && "rotate-180")}
          aria-hidden
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
