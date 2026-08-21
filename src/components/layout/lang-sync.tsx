"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLocale } from "@/lib/locale";

/** 根布局无法感知 [lang] 参数; 用 pathname 同步 <html lang>。 */
export function LangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.split("/")[1];
    if (isLocale(lang)) {
      document.documentElement.lang = lang;
    }
  }, [pathname]);

  return null;
}
