import Link from "next/link";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[0.875rem]", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-ink-muted">
                  /
                </span>
              )}
              {item.href && !last ? (
                <Link href={item.href} className="inline-flex items-center px-1 py-1 text-ink-muted transition-colors hover:text-accent-strong">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn("px-1 py-1", last ? "text-ink" : "text-ink-muted")}>
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
