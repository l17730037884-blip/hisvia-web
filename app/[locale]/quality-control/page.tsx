import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Every manufacturer is reviewed before it enters the network. — HISVIA",
  description: "Factory screening, technical confirmation, product matching, documentation, and export coordination.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Quality Control"
      title="Every manufacturer is reviewed before it enters the network."
      description="Factory screening, technical confirmation, product matching, documentation, and export coordination."
      purpose="首页已有精简版，这里做完整版：工厂筛选/技术确认/产品匹配/文件管理/出口协调，每步配详细说明。"
    />
  );
}
