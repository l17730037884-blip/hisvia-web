"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { type Locale } from "@/lib/locale";

/** 展示顺序:英文/俄文在前,其他按母语使用广泛度降序,中文放最右(最后)。 */
const ORDER: Locale[] = ["en", "ru", "es", "ar", "fr", "de", "tr", "pl", "zh-CN"];

/** 各 locale 的国旗 emoji(作为图标,不使用文字)。 */
const FLAGS: Record<Locale, string> = {
  "zh-CN": "🇨🇳",
  en: "🇬🇧",
  ru: "🇷🇺",
  tr: "🇹🇷",
  es: "🇪🇸",
  ar: "🇸🇦",
  de: "🇩🇪",
  fr: "🇫🇷",
  pl: "🇵🇱",
};

/** 各 locale 在 aria-label 上的完整母语名称(屏幕阅读器友好)。 */
const ARIA: Record<Locale, string> = {
  "zh-CN": "简体中文",
  en: "English",
  ru: "Русский",
  tr: "Türkçe",
  es: "Español",
  ar: "العربية",
  de: "Deutsch",
  fr: "Français",
  pl: "Polski",
};

/** Globe 图标(SVG,24×24,stroke)。 */
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M3 12h18" />
      <path d="M12 2.5a14 14 0 0 1 0 19M12 2.5a14 14 0 0 0 0 19" />
    </svg>
  );
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // 去掉当前 locale 前缀,保留路径剩余部分,用于切换语言时保持页面上下文
  const rest = pathname.replace(/^\/(zh-CN|en|ru|tr|es|ar|de|fr|pl)(\/|$)/, "/");
  const to = (l: Locale) => `/${l}${rest === "/" ? "" : rest}`;

  // 点击外部收起(移动端 tap outside)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // 国旗按钮的公共样式
  const flagBtn = (l: Locale, active: boolean) =>
    cn(
      "flex items-center justify-center rounded-full transition-all",
      "h-7 w-7 md:h-8 md:w-8 text-base leading-none",
      active
        ? "bg-accent/25 ring-1 ring-accent/50"
        : "hover:bg-white/10 opacity-70 hover:opacity-100",
    );

  return (
    <>
      {/* ===== 桌面端:默认全显示 9 个国旗(无折叠) ===== */}
      <nav
        aria-label="Language"
        className="hidden md:flex items-center gap-0.5"
      >
        {ORDER.map((l) => {
          const active = l === locale;
          return (
            <Link
              key={l}
              href={to(l)}
              aria-label={ARIA[l]}
              aria-current={active ? "true" : undefined}
              className={flagBtn(l, active)}
            >
              <span className="select-none">{FLAGS[l]}</span>
            </Link>
          );
        })}
      </nav>

      {/* ===== 移动端:globe 折叠按钮(<md) ===== */}
      <div
        ref={wrapRef}
        className="relative inline-flex md:hidden"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={ARIA[locale]}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "flex items-center justify-center rounded-full transition-colors",
            "h-7 w-7",
            "text-dark-muted hover:text-dark-text",
            open && "text-dark-text",
          )}
        >
          <GlobeIcon className="h-[18px] w-[18px]" />
        </button>

        {open && (
          <div
            role="listbox"
            aria-label="Language"
            className="absolute right-0 top-full z-50 pt-1"
          >
            <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-[#0b141f]/95 p-1 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              {ORDER.map((l) => {
                const active = l === locale;
                return (
                  <Link
                    key={l}
                    href={to(l)}
                    aria-label={ARIA[l]}
                    aria-current={active ? "true" : undefined}
                    className={flagBtn(l, active)}
                  >
                    <span className="select-none">{FLAGS[l]}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
