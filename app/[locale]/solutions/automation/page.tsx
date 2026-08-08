import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Control and automation parts. — HISVIA",
  description: "Automation and control components sourced to exact technical specification.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Automation Components"
      title="Control and automation parts."
      description="Automation and control components sourced to exact technical specification."
      purpose="同四段式模板。"
    />
  );
}
