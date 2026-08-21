import { cn } from "@/lib/cn";

export function TrustList({
  items,
  columns = "sm:grid-cols-2",
  className,
}: {
  items: string[];
  columns?: string;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-3 sm:gap-x-10", columns, className)}>
      {items.map((text, i) => (
        <li key={i} className="flex gap-4 border-t border-line pt-3 first:border-t-0 first:pt-0">
          <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
          <span className="text-[0.875rem] md:text-[0.9375rem] leading-relaxed text-ink-muted">{text}</span>
        </li>
      ))}
    </ul>
  );
}
