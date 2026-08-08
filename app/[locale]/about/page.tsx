import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Why HISVIA exists. — HISVIA",
  description: "HISVIA was founded to help overseas industrial companies connect with Chinese manufacturing resources.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="About HISVIA"
      title="Why HISVIA exists."
      description="HISVIA was founded to help overseas industrial companies connect with Chinese manufacturing resources."
      purpose="Company mission page: help overseas industrial enterprises connect with Chinese manufacturing resources and establish long-term partnerships."
    />
  );
}
