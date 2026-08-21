import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ImagePanel } from "@/components/visual/image-panel";

export function MediaText({
  image,
  imageAlt = "",
  ratio = "4/3",
  fit = "cover",
  flip = false,
  className,
  children,
}: {
  image: string;
  imageAlt?: string;
  ratio?: string;
  fit?: "cover" | "contain" | "natural";
  flip?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10 lg:items-center", className)}>
      <ImagePanel src={image} alt={imageAlt} ratio={ratio} fit={fit} className={cn(flip && "lg:order-2")} />
      <div className={cn("min-w-0", flip && "lg:order-1")}>{children}</div>
    </div>
  );
}
