"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 2026-08-21 用户最终规则（N 次强调后定稿）：
 *  - 移动端 <768px 时，两组标签"默认全叠在一起"
 *  - 滑到（元素进入视口后 / 中点还没过视口中线） → 展开
 *  - 过屏幕中间（元素中点 > 视口中线） → 自动收回去
 *  - 可以反复伸缩，不是一次展开永久
 *
 * 桌面端 ≥768px：永远 expanded=true
 */
export function useScrollCollapse<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [expanded, setExpanded] = useState(true); // 先 true，mount 后按 isMobile 修正
  const [isMobile, setIsMobile] = useState(false);

  // 1) 响应式：是否移动端
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      const mobile = mql.matches;
      setIsMobile(mobile);
      // 桌面端直接展开；移动端初始先折叠，后续 scroll 判定
      setExpanded(!mobile);
    };
    sync();
    mql.addEventListener?.("change", sync);
    return () => mql.removeEventListener?.("change", sync);
  }, []);

  // 2) 移动端：基于"元素中点 vs 视口中点"的可重复伸缩
  useEffect(() => {
    if (!isMobile) return;
    let ticking = false;
    let cancelled = false;

    const evaluate = () => {
      const el = ref.current;
      if (!el) {
        ticking = false;
        return;
      }
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const midLine = vh / 2;
      const rect = el.getBoundingClientRect();
      const elMid = rect.top + rect.height / 2;

      // 完全离开视口（上方或下方）→ 折叠，避免在首屏外还保持展开态
      const fullyAbove = rect.bottom <= -20;
      const fullyBelow = rect.top >= vh + 20;

      let wantExpanded: boolean;
      if (fullyAbove || fullyBelow) {
        wantExpanded = false;
      } else {
        // 元素中点还没越过中线（在视口上半部分 / 正跨中线偏上）→ 展开
        // 越过中线了 → 收回
        wantExpanded = elMid < midLine;
      }

      setExpanded((prev) => (prev === wantExpanded ? prev : wantExpanded));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        if (cancelled) return;
        evaluate();
      });
      ticking = true;
    };

    // resize 也要重算（横竖屏切换）
    const onResize = onScroll;

    // 初始立刻判一次（有些进来元素就已经在视口里的也要正确状态）
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  return { ref, expanded, isMobile };
}
