import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Compressor sourcing for service and rental fleets. — HISVIA",
  description: "Full-range compressor sourcing matched to your fleet and customer requirements.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Industrial Compressor Solutions"
      title="Compressor sourcing for service and rental fleets."
      description="Full-range compressor sourcing matched to your fleet and customer requirements."
      purpose="行业介绍 → 客户痛点 → HISVIA解决方案 → 合作价值，四段式结构（7个Solutions页共用此模板）。"
    />
  );
}
