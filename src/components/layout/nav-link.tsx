"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * 导航链接：基于当前 pathname 自动高亮当前页（aria-current="page"）。
 * 根路由（如 /en、/ru）仅精确匹配；其余路由前缀匹配（如 /en/products 命中 /en/products/planetary-reducer）。
 */
export function NavLink({
  href,
  className,
  activeClassName,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const pathname = usePathname() ?? "";
  const normalize = (p: string) => (p.replace(/\/+$/, "") || "/").toLowerCase();
  const current = normalize(pathname);
  const target = normalize(href);
  const segs = target.split("/").filter(Boolean);
  const isRoot = segs.length <= 1;
  const active = isRoot ? current === target : current === target || current.startsWith(target + "/");

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
      className={cn(className, active && activeClassName)}
    >
      {children}
    </Link>
  );
}
