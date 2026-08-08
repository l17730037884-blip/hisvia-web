import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Industrial pump sourcing. — HISVIA",
  description: "Pump equipment sourcing across standard and custom configurations.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Pump Equipment Solutions"
      title="Industrial pump sourcing."
      description="Pump equipment sourcing across standard and custom configurations."
      purpose="同四段式模板。"
    />
  );
}
