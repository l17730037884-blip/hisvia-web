import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Industrial Valves & Piping. — HISVIA",
  description: "Industrial valves and fittings for various media and pressure ratings.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Industrial Valves & Piping"
      title="Industrial valve sourcing."
      description="Industrial valves and fittings for various media and pressure ratings."
      purpose="同四段式模板，强调“多介质多压力等级的阀门与管件采购”，区别于单一品类贸易。"
    />
  );
}
