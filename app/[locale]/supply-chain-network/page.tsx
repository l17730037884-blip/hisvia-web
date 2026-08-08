import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "A verified network of Chinese manufacturing resources. — HISVIA",
  description: "Built across industrial regions in China, covering all seven core categories.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Supply Chain Network"
      title="A verified network of Chinese manufacturing resources."
      description="Built across industrial regions in China, covering all seven core categories."
      purpose="展示中国制造资源网络覆盖范围，可配地图/区域分布。"
      imagePrompt="industrial manufacturing and engineering partnership, realistic photograph"
    />
  );
}
