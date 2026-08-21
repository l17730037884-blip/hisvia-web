import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function DarkCta({
  image,
  imageAlt = "",
  className,
  children,
}: {
  image?: string | null;
  imageAlt?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-dark text-dark-text", className)}>
      {image ? (
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-dark/55" />
        </div>
      ) : null}
      <Container className="max-w-6xl py-16 md:py-24">{children}</Container>
    </section>
  );
}
