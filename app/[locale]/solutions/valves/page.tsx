import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Industrial Valves & Fittings — HISVIA",
  description: "Industrial valves and pipe fittings for varied media and pressure ratings.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Industrial Valves & Fittings"
      title="Industrial valves and pipe fittings for varied media and pressure ratings."
      description="Industrial valves and pipe fittings for varied media and pressure ratings."
      purpose="同四段式模板（行业介绍/客户痛点/HISVIA方案/合作价值），与已上线站点的第8个类目对齐。"
    />
  );
}
