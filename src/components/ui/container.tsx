import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-container-site px-2.5 md:px-6 lg:px-8 min-[1441px]:px-12 min-[1921px]:px-[50px]",
        className
      )}
    >
      {children}
    </div>
  );
}
