"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLocale, htmlDir } from "@/lib/locale";

/** 根布局 SSR 已设置 <html lang/dir>;此组件用于路由切换时同步属性(RSC 中无法感知 [lang] 变化)。 */
export function LangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.split("/")[1];
    if (isLocale(lang)) {
      document.documentElement.lang = lang;
      document.documentElement.dir = htmlDir(lang);
    }
  }, [pathname]);

  return null;
}
