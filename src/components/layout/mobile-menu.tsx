"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Item = { key: string; label: string; href: string };

function simplifyMobileLabel(key: string, label: string): string {
  switch (key) {
    case "nav_certifications":
      return /^[Qq]/.test(label) ? "Certs" : "Сертификаты";
    case "nav_applications":
      return /^[Aa]/.test(label) ? "Use Cases" : "Примеры";
    case "nav_customization":
      return /^[Cc]/.test(label) ? "OEM Custom" : "На заказ";
    case "nav_technology":
      return /^[Tt]/.test(label) ? "Tech" : "Технологии";
    default:
      return label;
  }
}

export function MobileMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const lastTouchRef = useRef(0);
  // 滚动/滚轮/触摸 强制关菜单后，给一个短暂的 hover "冷却窗口"（350ms），防止同一事件循环里
  // pointerenter 立即再把菜单打开抖个不停；窗口过期后恢复用户要求的"触达就展开"
  const blockHoverUntilRef = useRef(0);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const startY = window.scrollY;
    const settledRef = { v: false };
    let settleTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      settledRef.v = true;
      settleTimer = null;
    }, 120);

    const closeByScroll = () => {
      blockHoverUntilRef.current = Date.now() + 350;
      setOpen(false);
    };

    const tryClose = (curY: number) => {
      if (!settledRef.v) {
        if (Math.abs(curY - startY) < 40) return;
      } else {
        if (Math.abs(curY - startY) < 2) return;
      }
      closeByScroll();
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        tryClose(window.scrollY);
        ticking = false;
      });
      ticking = true;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) >= 2 || Math.abs(e.deltaX) >= 2) closeByScroll();
    };

    const firstTouchYRef = { v: -1 };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) firstTouchYRef.v = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches || !e.touches[0]) return;
      const y = e.touches[0].clientY;
      if (firstTouchYRef.v >= 0 && Math.abs(y - firstTouchYRef.v) >= 4) closeByScroll();
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      if (settleTimer) clearTimeout(settleTimer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [open]);

  const openByHover = () => {
    // 冷却时间内（滚动刚触发完关菜单）→ 抑制一次，避免抖。超过冷却后：触达必须展开
    if (Date.now() < blockHoverUntilRef.current) return;
    setOpen(true);
  };

  return (
    <div className="lg:hidden" onPointerEnter={openByHover}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onPointerEnter={openByHover}
        onTouchStart={() => {
          lastTouchRef.current = Date.now();
          blockHoverUntilRef.current = 0; // 用户手指触达汉堡按钮：立即清除冷却，必须展开
          setOpen(true);
        }}
        onClick={() => {
          if (Date.now() - lastTouchRef.current < 300) return;
          blockHoverUntilRef.current = open ? Date.now() + 350 : 0;
          setOpen((v) => !v);
        }}
        className="flex min-h-8 w-8 shrink-0 items-center justify-center rounded-btn border border-dark-line bg-[#0a0a0e] text-dark-text shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] md:min-h-[37px] md:min-w-[37px]"
      >
        <span className="flex h-3.5 w-4 md:h-4 md:w-5 flex-col justify-between" aria-hidden>
          <span className={cn("h-0.5 w-full bg-current transition-transform duration-150", open && "translate-y-[6px] rotate-45 md:translate-y-[7px]")} />
          <span className={cn("h-0.5 w-full bg-current transition-opacity duration-150", open && "opacity-0")} />
          <span className={cn("h-0.5 w-full bg-current transition-transform duration-150", open && "-translate-y-[6px] -rotate-45 md:-translate-y-[7px]")} />
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setOpen(false)}
          style={{ background: "rgba(4,4,7,0.78)" }}
          aria-hidden
        />
      ) : null}

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-x-0 left-0 right-0 top-[95px] z-[51] border-b border-white/12 md:top-[129px] min-[1441px]:top-[140px]"
          style={{
            background:
              "linear-gradient(180deg,#0a101a 0%,#08080d 40%,#06060a 100%)",
            boxShadow:
              "0 18px 52px -20px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.10)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 独立关闭按钮：面板右上角 ×（用户要求❌默认白色，背景深色）
               ⚠️ 全局 CSS 可能覆盖 button color，所以：内联 style + !text-white + SVG stroke 直接写死 #ffffff，三重兜底 */}
          <div className="pointer-events-none absolute -top-3 right-3 z-[1] flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => {
                blockHoverUntilRef.current = 0;
                setOpen(false);
              }}
              style={{ color: "#ffffff" }}
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#0a0a0e] !text-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.7)] transition-all duration-150 hover:scale-105 hover:!text-accent active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" className="transition-[stroke] duration-150 group-hover:stroke-accent" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="mx-auto w-full max-w-container-site px-[clamp(1.5rem,3vw,2rem)] pt-5 pb-4">
            <ul className="flex flex-col">
              {items.map((item) => {
                const isCustom = item.key === "nav_customization";
                const displayLabel = simplifyMobileLabel(item.key, item.label);
                return (
                  <li key={item.key} className="border-b border-white/10 last:border-0">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex min-h-12 items-center gap-2 text-[15px] font-medium tracking-[-0.04em] transition-colors",
                        isCustom
                          ? "text-accent"
                          : "text-dark-text hover:text-accent"
                      )}
                    >
                      {isCustom ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/5 px-2.5 py-1 text-[0.75rem] font-semibold">
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M8 1.5l.94 2.06a4.5 4.5 0 011.5.87l2.06-.94.94 2.06-1.5 1.5c.12.49.12 1.01 0 1.5l1.5 1.5-.94 2.06-2.06-.94a4.5 4.5 0 01-1.5.87L8 14.5l-.94-2.06a4.5 4.5 0 01-1.5-.87l-2.06.94-.94-2.06 1.5-1.5a4.5 4.5 0 010-1.5l-1.5-1.5.94-2.06 2.06.94a4.5 4.5 0 011.5-.87L8 1.5z" stroke="currentColor" strokeWidth="1.2" />
                            <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                          </svg>
                          {displayLabel}
                        </span>
                      ) : (
                        displayLabel
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
