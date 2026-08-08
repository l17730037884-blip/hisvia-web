import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Recurring consumable supply. — HISVIA",
  description: "Industrial consumables coordinated on a predictable, recurring schedule.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Industrial Consumables"
      title="Recurring consumable supply."
      description="Industrial consumables coordinated on a predictable, recurring schedule."
      purpose="同四段式模板，强调“可预测的周期性供应”，区别于一次性贸易订单。"
    />
  );
}
