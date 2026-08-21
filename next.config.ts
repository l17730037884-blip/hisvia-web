import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false, // 307 — 将来可能根据 Accept-Language 做 EN/RU 智能分发时再改
      },
    ];
  },
};

export default nextConfig;
