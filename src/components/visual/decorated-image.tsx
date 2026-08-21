"use client";

import { cn } from "@/lib/cn";

/**
 * 产品图占位 —— 用于 NO_IMAGE 的产品。
 */
export function ProductPlaceholder({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <div className="flex h-full w-full flex-col justify-between p-3 sm:p-4">
      <div>
        <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent">
          {label}
        </span>
        {sublabel ? (
          <p className="mt-2 max-w-[70%] text-[0.75rem] leading-snug text-ink-muted">{sublabel}</p>
        ) : null}
      </div>
    </div>
  );
}

export function DecoratedImage({
  src,
  alt = "",
  className,
  imgClassName,
  ratio,
  fit = "natural",
  priority = false,
  placeholder,
}: {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  fit?: "cover" | "contain" | "natural";
  priority?: boolean;
  placeholder?: { label: string; sublabel?: string };
}) {
  const hasImage = Boolean(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-img border border-line bg-white",
        className
      )}
      style={ratio && fit !== "natural" ? { aspectRatio: ratio } : undefined}
    >
      <div className="relative h-full w-full p-3 sm:p-4">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className={cn(
              fit === "natural"
                ? "block h-auto w-full img-hover"
                : cn("block h-full w-full img-hover", fit === "cover" ? "object-cover" : "object-contain"),
              imgClassName
            )}
          />
        ) : placeholder ? (
          <ProductPlaceholder label={placeholder.label} sublabel={placeholder.sublabel} />
        ) : null}
      </div>
    </div>
  );
}
