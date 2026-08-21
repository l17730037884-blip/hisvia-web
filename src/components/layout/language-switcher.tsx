"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { LOCALES, type Locale } from "@/lib/locale";

const LABELS: Record<Locale, string> = { en: "EN", ru: "РУ" };

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(ru|en)(\/|$)/, "/");
  const to = (l: Locale) => `/${l}${rest === "/" ? "" : rest}`;

  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-[12px] md:text-[13px] font-medium tracking-[-0.04em]">
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={to(l)}
            aria-current={active ? "true" : undefined}
            aria-label={l === "ru" ? "Русский" : "English"}
            className={cn(
              // 移动端 px-1 py-0.5 更紧凑（避免手机端宽度不够被截断），桌面端恢复 px-1.5 py-1
              "px-1 py-0.5 md:px-1.5 md:py-1 transition-colors whitespace-nowrap",
              active ? "text-dark-text" : "text-dark-muted hover:text-dark-text"
            )}
          >
            {LABELS[l]}
          </Link>
        );
      })}
    </nav>
  );
}
