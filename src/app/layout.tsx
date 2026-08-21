import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Planetary Engineering Co., Ltd.",
  description:
    "AGV precision reducers — official information from Planetary Engineering Co., Ltd.",
};

/**
 * 根 layout 只负责加载全局样式/字体/metadata。
 * <html lang> / <body> 放到 app/[lang]/layout.tsx 里，根据 locale 动态设置 lang 属性
 * — 否则所有 /ru 页面都会错误地生成 <html lang="en">，影响俄文 SEO 排名
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

