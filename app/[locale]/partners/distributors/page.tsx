import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "How Distributors work with HISVIA. — HISVIA",
  description: "Add new product lines and access verified Chinese manufacturing resources.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="For Industrial Distributors"
      title="How Distributors work with HISVIA."
      description="Add new product lines and access verified Chinese manufacturing resources."
      purpose="展开首页 Partner Benefits 中 Distributors 的具体合作方式和参与流程。"
    />
  );
}
