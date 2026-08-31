"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Item = { key: string; label: string; href: string };

/** BLC-03: 桌面导航 RU 词长差异, 超宽项收进 "More" 下拉。 */
export function MoreMenu({ items, label }: { items: Item[]; label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className={cn(
          "flex min-h-11 items-center text-[0.9375rem] font-medium text-ink hover:text-accent-strong",
          open && "text-accent-strong"
        )}
      >
        {label}
        <span aria-hidden className="ms-1 text-[0.75rem]">
          ▾
        </span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute end-0 top-full z-50 mt-2 w-56 rounded-card border border-line bg-surface py-2 shadow-sm"
        >
          {items.map((item) => (
            <Link
              key={item.key}
              role="menuitem"
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-[0.9375rem] text-ink hover:bg-canvas hover:text-accent-strong"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
