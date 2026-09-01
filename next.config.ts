import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 根路径 "/" 的 IP/Accept-Language 自动适配由 src/middleware.ts 接管。
  // 此处不再配置 redirects —— next.config 的 redirects 先于 middleware 执行,
  // 会让 "/" → "/ru" 直接命中,绕过 middleware 的语言检测,导致所有访客都被
  // 重定向到 /ru,无论 Accept-Language 或 IP 国家如何。middleware 内部已兜底
  // DEFAULT_LOCALE (ru),无需此处再 fallback。
};

export default nextConfig;
