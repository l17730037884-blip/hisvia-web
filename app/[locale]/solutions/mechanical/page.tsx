import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Bearings, seals, and mechanical parts. — HISVIA",
  description: "Mechanical component sourcing for industrial maintenance needs.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Mechanical Components"
      title="Bearings, seals, and mechanical parts."
      description="Mechanical component sourcing for industrial maintenance needs."
      purpose="同四段式模板。"
    />
  );
}
