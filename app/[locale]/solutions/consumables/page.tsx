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
      purpose="Predictable periodic supply, distinct from one-off trade orders."
    />
  );
}
