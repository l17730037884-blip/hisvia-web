import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2.5 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent hoverable-text", className)}>
      <svg aria-hidden className="h-3 w-4 shrink-0" viewBox="0 0 16 12" fill="none">
        <path d="M0 6h9m3-4 4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      {children}
    </p>
  );
}

export function Display({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cn(
        "font-display text-[clamp(2rem,3.5vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.05em] text-balance hoverable-text",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H1({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cn(
        "font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-balance hoverable-text",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-display text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-balance hoverable-text",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("font-display text-[clamp(1.25rem,1.9vw,1.5rem)] font-medium leading-[1.25] tracking-[-0.02em] text-balance hoverable-text", className)}>
      {children}
    </h3>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-[1rem] font-normal leading-[1.65] max-w-[68ch] hoverable-text",
        className
      )}
    >
      {children}
    </p>
  );
}

export function BodySmall({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[0.8125rem] font-medium leading-[1.6] hoverable-text", className)}>{children}</p>;
}

export function Technical({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[0.875rem] font-normal leading-[1.5] tabular-nums hoverable-text", className)}>
      {children}
    </p>
  );
}
