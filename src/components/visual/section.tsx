import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "canvas" | "surface" | "stripe" | "dark";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas text-ink",
  surface: "bg-surface text-ink",
  stripe: "bg-stripe text-ink",
  dark: "bg-dark text-dark-text",
};

export function Section({
  children,
  tone = "canvas",
  className,
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-10 md:py-16", tones[tone], className)}>
      {children}
    </section>
  );
}
