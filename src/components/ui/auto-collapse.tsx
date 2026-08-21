"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** 收缩时显示的最大行数（按 line-height 1.7 × 字号 0.9375rem 估算） */
  lines?: number;
  className?: string;
  /** 过渡时长 ms，默认 500 */
  duration?: number;
};

/**
 * 自动折叠文案块（用户要求：滑到展开，过了屏幕中间自动收缩）
 * 逻辑：
 *  1. 初始态：收缩（仅显示 lines 行）
 *  2. 当本块有 ≥ 5% 进入视口（"滑到" 了）→ 展开
 *  3. 当本块的顶部越过屏幕中线（50% 高度线以上）→ 再次收缩
 */
export function AutoCollapse({ children, lines = 3, className = "", duration = 500 }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  // expanded: true = 展开, false = 收缩
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || typeof IntersectionObserver === "undefined") {
      setExpanded(true);
      return;
    }

    // Observer 1：进入视口即展开（threshold 0.05 — 露出 5% 就认为"滑到了"）
    const ioEnter = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setExpanded(true);
          }
        }
      },
      { threshold: 0.05 }
    );
    ioEnter.observe(wrap);

    // Observer 2：用"负 rootMargin 下半截"制造一条"屏幕中线"，当块的顶部越过中线 → 收缩
    // rootMargin "0px 0px -50% 0px" 表示：只观察 viewport 上半部分是否出现了元素（元素超过中间线以上=命中）
    const ioMidline = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            // 命中：元素进入了上半屏 → 说明"过了屏幕中间"，收缩
            setExpanded(false);
          }
        }
      },
      { rootMargin: "0px 0px -50% 0px", threshold: 0 }
    );
    ioMidline.observe(wrap);

    return () => {
      ioEnter.disconnect();
      ioMidline.disconnect();
    };
  }, []);

  // 收缩时的 max-height：按 lines 行估算。Body 默认 0.9375rem / leading 1.7~1.72
  const collapsedH = `calc(1.72 * 0.9375rem * ${lines} + 0.5rem)`;

  return (
    <div
      ref={wrapRef}
      style={{
        overflow: "hidden",
        maxHeight: expanded ? "5000px" : collapsedH,
        transition: `max-height ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
      className={className}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
