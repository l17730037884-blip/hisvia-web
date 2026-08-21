import { cn } from "@/lib/cn";
import { Kicker, H2, Body } from "@/components/ui/typography";

export function SectionHeader({
  kicker,
  title,
  lead,
  align = "left",
  className,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <H2 className={cn("mt-3", align === "center" && "mx-auto")}>{title}</H2>
      {lead ? <Body className="mt-4 text-ink-muted">{lead}</Body> : null}
      <svg
        aria-hidden
        className={cn("mt-6 h-3 w-24 text-accent", align === "center" && "mx-auto")}
        viewBox="0 0 96 12"
        fill="none"
      >
        <path d="M0 6h72" stroke="currentColor" strokeWidth="1.5" />
        <path d="M78 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M88 6h8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
