import Link from "next/link";
import { cn } from "@/lib/cn";
import { isRTL, type Locale } from "@/lib/locale";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({
  items,
  className,
  dark = false,
  locale,
}: {
  items: Crumb[];
  className?: string;
  dark?: boolean;
  locale?: Locale;
}) {
  const rtl = locale ? isRTL(locale) : false;
  const sepClass = cn(dark ? "text-dark-muted" : "text-ink-muted", rtl ? "rtl:-scale-x-100" : "");
  const linkClass = dark
    ? "inline-flex items-center px-1 py-1 text-dark-muted transition-colors hover:text-accent-strong"
    : "inline-flex items-center px-1 py-1 text-ink-muted transition-colors hover:text-accent-strong";
  const lastActiveClass = dark ? "text-white" : "text-ink";
  const inactiveClass = dark ? "text-dark-muted" : "text-ink-muted";
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[0.875rem]", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className={sepClass}>
                  /
                </span>
              )}
              {item.href && !last ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn("px-1 py-1", last ? lastActiveClass : inactiveClass)}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
