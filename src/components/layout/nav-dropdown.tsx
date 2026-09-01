"use client";

import { useState, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type SubItem = {
  id: string;
  label: string;
  href: string;
};

type Props = {
  href: string;
  label: string;
  subItems: SubItem[];
  className?: string;
  activeClassName?: string;
  children?: ReactNode;
};

/**
 * 带子分类下拉的导航项:
 *   - 桌面端 hover 触发(鼠标进入展开,离开收起,pt-1 padding 桥接空隙防丢点)
 *   - 移动端不显示(移动端用 MobileMenu 的展开/折叠)
 *   - 当前路由高亮(基于 pathname 前缀匹配)
 */
export function NavDropdown({
  href,
  label,
  subItems,
  className,
  activeClassName,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname() ?? "";
  const normalize = (p: string) => (p.replace(/\/+$/, "") || "/").toLowerCase();
  const current = normalize(pathname);
  const target = normalize(href);
  const segs = target.split("/").filter(Boolean);
  const isRoot = segs.length <= 1;
  const active = isRoot ? current === target : current === target || current.startsWith(target + "/");

  return (
    <div
      ref={wrapRef}
      className="relative hidden lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap text-[0.8125rem] font-medium tracking-[-0.02em] transition-colors hover:text-accent md:text-[0.875rem]",
          active && "text-dark-text font-semibold",
          !active && "text-dark-muted",
          className,
          active && activeClassName,
        )}
      >
        {children ?? label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className="absolute start-0 top-full z-50 pt-1"
        >
          <div className="min-w-[200px] overflow-hidden rounded-card border border-white/15 bg-[#0b141f]/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {subItems.map((item) => {
              const subActive = current === normalize(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  role="menuitem"
                  aria-current={subActive ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded px-3 py-2 text-[0.8125rem] font-medium tracking-[-0.01em] transition-colors",
                    subActive
                      ? "bg-accent/15 text-dark-text"
                      : "text-dark-muted hover:bg-white/8 hover:text-dark-text",
                  )}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  <span className="text-[0.6875rem] text-dark-muted/70">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
