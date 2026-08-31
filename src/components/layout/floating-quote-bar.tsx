"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";
import { localized } from "@/lib/content";

/**
 * 移动端始终悬浮底栏询盘表单入口(2026-08-21 用户要求高度再降 40% + 文字一行紧凑)
 * 逻辑:
 *  - fixed bottom-0 inset-x-0 z-50,md+(桌面端)完全隐藏(仅手机端)
 *  - 默认蓝底白字,始终悬浮可见、不随滚动消失
 *  - 当用户在定制页且 #inquiry-form 已进入视口(说明已经看到实表单了)→ 悬浮条自动隐藏避免重复
 *  - 内边距加 env(safe-area-inset-bottom),适配 iPhone 灵动岛 Dock 区
 *
 * 9 种 locale 通用:文案走 localized() 翻译键 P14-CTA01(询盘按钮文案),
 * 兜底用 locale 短词以确保永远非空(防 undefined/null)。
 */
const FALLBACK_LABEL: Record<Locale, string> = {
  "zh-CN": "立即询价",
  en: "Request a Quote",
  ru: "Запросить расчёт",
  tr: "Teklif İste",
  es: "Solicitar cotización",
  ar: "اطلب عرض سعر",
  de: "Angebot anfordern",
  fr: "Demander un devis",
  pl: "Poproś o wycenę",
};

export function FloatingQuoteBar({ locale }: { locale: Locale }) {
  const localizedLabel = localized(locale, "P14-CTA01");
  const label = localizedLabel || FALLBACK_LABEL[locale];
  const pathname = usePathname();
  const href = `/${locale}/customization#inquiry-form`;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const isCustomization = Boolean(pathname?.includes("/customization"));
  // hide = 定制页且表单在视口内 → 悬浮条隐藏(避免两个 CTA 打架)
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (!isCustomization) return;
    let cancelled = false;
    let io: IntersectionObserver | null = null;
    let el: Element | null = null;

    const mount = () => {
      el = document.getElementById("inquiry-form");
      if (!el) return false;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (cancelled) return;
            setFormVisible(e.isIntersecting && e.intersectionRatio >= 0.25);
          }
        },
        { threshold: [0, 0.25, 0.6, 1] }
      );
      io.observe(el);
      return true;
    };

    if (!mount()) {
      const t = window.setTimeout(() => {
        if (cancelled) return;
        if (!mount()) {
          setFormVisible(false);
        }
      }, 300);
      return () => {
        cancelled = true;
        window.clearTimeout(t);
      };
    }
    return () => {
      cancelled = true;
      io?.disconnect();
    };
  }, [isCustomization]);

  const hide = isCustomization && formVisible;

  return (
    <div
      ref={wrapRef}
      className={
        "fixed inset-x-0 bottom-0 z-50 md:hidden transition-all duration-300 ease-out will-change-transform " +
        (hide
          ? "pointer-events-none translate-y-full opacity-0"
          : "pointer-events-auto translate-y-0 opacity-100")
      }
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="relative border-t border-white/10 bg-accent/95 px-3 py-1.5 shadow-[0_-8px_24px_-14px_rgba(0,112,243,0.55)] backdrop-blur-[2px]">
        <Link
          href={href}
          className="flex h-9 items-center justify-between gap-2 rounded-[12px] bg-white px-3.5 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_4px_16px_-10px_rgba(0,0,0,0.3)] active:scale-[0.985] transition-transform duration-150"
        >
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0 text-black">
              <path
                d="M1.5 4h13v7a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 011.5 11V4z"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M14.5 4l-5.47 4.1a2.4 2.4 0 01-3.06 0L.5 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span className="truncate text-[0.8125rem] font-bold leading-none tracking-[-0.01em] text-black">
              {label}
            </span>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="shrink-0 text-black"
          >
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
