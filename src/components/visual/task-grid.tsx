"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { useScrollCollapse } from "@/hooks/use-scroll-collapse";

export type TaskGridItem = { label: string; href: string };
export type TaskGridColumn = {
  title: string;
  href: string;
  tone: "green" | "blue" | "red" | "yellow";
  items: TaskGridItem[];
};

/** 保留分类感的色点（辅色点只作视觉分档，不作为视觉重心） */
const dotTone = {
  green: "before:bg-accent-green",
  blue: "before:bg-accent",
  red: "before:bg-accent-red",
  yellow: "before:bg-accent-yellow",
} as const;

/**
 * 2026-08-21 移动端最终规则（用户 N 次强调后定稿）：
 *  - 默认折叠：4卡片极致"叠在一起"薄感（极薄 padding/小字号/小 gap/无 items）
 *  - 元素滚入视口、中点没过视口中线 → 展开（显示 items + 正常 padding）
 *  - 元素中点越过视口中线 / 滚出 → 折叠回去（可重复伸缩）
 *  - 桌面端 md+ 永远正常展开
 */
export function TaskGrid({ columns }: { columns: TaskGridColumn[] }) {
  const router = useRouter();
  const { ref, expanded } = useScrollCollapse<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "grid transition-[gap] duration-300 ease-out",
        expanded
          ? "grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5"
          : "grid-cols-1 gap-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5"
      )}
    >
      {columns.map((col) => {
        const dot = dotTone[col.tone];
        return (
          <div
            key={col.title}
            className={cn(
              "task-grid-card no-text-hover-override group relative flex h-full flex-col overflow-hidden border border-line bg-surface transition-all duration-300 ease-out",
              "hover:-translate-y-0.5 hover:border-accent hover:bg-accent",
              expanded
                ? "rounded-card hover:shadow-[0_12px_40px_-16px_rgba(0,120,168,0.55)]"
                : "rounded-[8px] hover:shadow-[0_6px_24px_-14px_rgba(0,120,168,0.5)]"
            )}
          >
            {/* 整卡点击跳转：透明 <a> 铺满 */}
            <a href={col.href} className="absolute inset-0 z-10" aria-label={col.title} />

            {/* 左上 accent 角线：折叠态不画（叠在一起时不需要细装饰） */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute start-0 top-0 z-20 rounded-tr-card bg-white/80 transition-all duration-300 group-hover:bg-white/95",
                expanded ? "h-1 w-12" : "h-0 w-0"
              )}
            />
            {/* 左下装饰高光条：折叠态不显示 */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute bottom-0 start-0 z-20 rounded-tr bg-white/90 transition-all duration-500 group-hover:w-[60%]",
                expanded ? "h-[3px] w-0" : "h-0 w-0"
              )}
            />
            {/* 右下箭头：折叠态 h-6 w-6、SVG 12px；展开态正常 */}
            <span
              aria-hidden
              className={cn(
                "task-grid-arrow absolute z-20 flex items-center justify-center rounded-full bg-stripe text-ink-muted transition-all duration-300 group-hover:!bg-white group-hover:!text-accent",
                expanded
                  ? "end-5 top-5 h-8 w-8 md:end-6 md:top-6"
                  : "end-2 top-1/2 h-6 w-6 -translate-y-1/2"
              )}
            >
              {expanded ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="rtl:-scale-x-100">
                  <path d="M7 5l10 7-10 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="rtl:-scale-x-100">
                  <path d="M7 5l10 7-10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>

            {/* 内盒 padding：折叠态极薄（px-2 py-1.5），仅容 title 一行 */}
            <div
              className={cn(
                "relative z-20 flex flex-col h-full transition-[padding] duration-300",
                expanded ? "p-4 md:p-6" : "px-2 py-1.5"
              )}
            >
              <div className={cn("flex items-center gap-1 pe-10 transition-[gap] duration-300", expanded ? "md:gap-2 pe-10" : "gap-1 pe-8")}>
                <span
                  aria-hidden
                  className={cn(
                    "task-grid-dot before:inline-block before:shrink-0 before:rounded-full before:transition-all before:duration-300",
                    dot,
                    expanded
                      ? "before:h-2 before:w-2 before:brightness-[0.85] group-hover:before:!bg-white group-hover:before:scale-125"
                      : "before:h-1 before:w-1 before:brightness-[0.92] group-hover:before:!bg-white group-hover:before:scale-110"
                  )}
                />
                <h3
                  className={cn(
                    "task-grid-title min-w-0 font-display font-semibold leading-tight tracking-[-0.02em] text-ink transition-all duration-300 group-hover:!text-white",
                    expanded
                      ? "text-[1.0625rem] md:text-[1.25rem]"
                      : "truncate text-[0.75rem] leading-none"
                  )}
                >
                  {col.title}
                </h3>
              </div>

              {/* 伸缩区：折叠态 grid-rows-[0fr] 完全隐藏 + mt-0；展开态 grid-rows-[1fr] + mt-3 显示 items */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows,margin] duration-350 ease-out",
                  "md:grid-rows-[1fr] md:mt-4",
                  expanded ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr] mt-0"
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul className="space-y-2.5 pt-1 md:pt-0">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(item.href);
                          }}
                          className="no-text-hover-override relative z-30 inline-flex w-full items-center gap-2 text-start text-[0.8125rem] font-medium leading-[1.45] tracking-[-0.02em] text-ink-muted transition-colors duration-300 group-hover:!text-white"
                        >
                          <span aria-hidden className="task-grid-rule block h-px w-4 bg-accent/40 transition-all duration-300 group-hover:w-6 group-hover:!bg-white/90" />
                          <span className="task-grid-item-label">{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
