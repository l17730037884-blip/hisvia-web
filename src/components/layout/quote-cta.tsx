"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";

/** 询盘按钮文案(9 种语言,工业 B2B 语境)。 */
const QUOTE_LABEL: Record<Locale, string> = {
  "zh-CN": "请求报价", en: "Request a Quote", ru: "Запросить расчёт", tr: "Teklif İste",
  es: "Solicitar presupuesto", ar: "اطلب عرض سعر", de: "Angebot anfordern",
  fr: "Demander un devis", pl: "Poproś o wycenę",
};

/**
 * 底部"询盘表单入口"CTA 按钮
 * 显示逻辑（与顶部 OEM 按钮一致的"可见即突出"逻辑）：
 *  - 默认（未进入视口、用户还看不到）→ 白底黑字（低调）
 *  - 滚动触达（进入视口内，用户看到了）→ 深色底 + 白字（突出、促转化）
 */
export function QuoteCTA({
  locale,
  href,
}: {
  locale: Locale;
  href: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
            return;
          }
        }
      },
      // threshold 0.35：露出 35% 就算"触达到了"，立刻切换为突出样式
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: [0.35] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const label = QUOTE_LABEL[locale];

  // —— 两套样式：visible=false（默认白底黑字）/ visible=true（深色底白字突出）
  const base =
    "no-text-hover-override inline-flex w-full items-center justify-center gap-2 self-stretch rounded-full border px-4 py-2.5 text-[0.78125rem] font-semibold tracking-[-0.01em] transition-all duration-500 ease-out md:w-auto md:self-auto md:justify-start md:min-h-11 md:px-5 md:text-[0.8125rem]";
  const styleIdle =
    "border-black/10 bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-black/5";
  const styleActive =
    "border-accent/30 bg-accent text-white shadow-[0_0_0_1px_rgba(255,255,255,0.22)_inset,0_8px_28px_-10px_rgba(0,112,243,0.55)] hover:bg-accent/95 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.32)_inset,0_0_36px_-6px_rgba(0,112,243,0.75)]";

  return (
    <div ref={wrapRef}>
      <Link href={href} className={`${base} ${visible ? styleActive : styleIdle}`}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M1.5 4h13v7a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 011.5 11V4z" stroke="currentColor" strokeWidth="1.25" />
          <path d="M14.5 4l-5.47 4.1a2.4 2.4 0 01-3.06 0L.5 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        {label}
      </Link>
    </div>
  );
}
