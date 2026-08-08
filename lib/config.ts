// 站点级配置，统一从环境变量读取，方便不同环境部署
// 部署到 Vercel 时在 Project Settings → Environment Variables 配置

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hisvia.com";

// 后端 API 地址（预留，当前前端无实际调用）
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.hisvia.com";
