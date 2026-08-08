import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "How the partnership works. — HISVIA",
  description: "Russian partners own the customer relationship and technical requirements. HISVIA owns manufacturer matching, quality, and export coordination.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Partnership Model"
      title="How the partnership works."
      description="Russian partners own the customer relationship and technical requirements. HISVIA owns manufacturer matching, quality, and export coordination."
      purpose="核心页面。详细拆分俄方负责什么（本地客户关系/设备信息收集/技术需求沟通）与HISVIA负责什么（工厂寻找/替代件分析/质量沟通/采购协调/出口协调）。强调无需建立中国采购团队、无需提前库存。"
    />
  );
}
