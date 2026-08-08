import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Cylinders, valves, and hydraulic systems. — HISVIA",
  description: "Hydraulic component sourcing from vetted Chinese manufacturers.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Hydraulic Components"
      title="Cylinders, valves, and hydraulic systems."
      description="Hydraulic component sourcing from vetted Chinese manufacturers."
      purpose="同四段式模板。"
    />
  );
}
