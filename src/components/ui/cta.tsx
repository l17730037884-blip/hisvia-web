import type { ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const ctaVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-btn text-[0.875rem] font-medium leading-none tracking-[0.01em] transition-colors duration-150",
  {
    variants: {
      variant: {
        primary: "bg-ink text-dark-text hover:bg-black active:bg-black",
        secondary: "border border-line bg-transparent text-ink hover:border-ink hover:bg-stripe active:bg-stripe",
        dark: "bg-dark-text text-dark hover:bg-white active:bg-white",
      },
      size: {
        md: "px-5",
        lg: "min-h-12 px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type CTAProps = VariantProps<typeof ctaVariants> & {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function CTA({ href, children, className, variant, size, external }: CTAProps) {
  const cls = cn(ctaVariants({ variant, size }), className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
