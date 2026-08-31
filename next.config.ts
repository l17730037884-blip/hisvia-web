import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** 线上 Vercel 部署无需 standalone(由 middleware.ts 接管根路径 IP 自动适配)。 */
  async redirects() {
    return [
      // 安全网:middleware 未命中时 fallback 到默认语言 ru(保持与历史部署一致)
      {
        source: "/",
        destination: "/ru",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
