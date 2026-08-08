import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "How Regional Partners work with HISVIA. — HISVIA",
  description: "Build a long-term industrial supply network in your region.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="For Regional Partners"
      title="How Regional Partners work with HISVIA."
      description="Build a long-term industrial supply network in your region."
      purpose="展开首页 Partner Benefits 中 Regional Partners 的具体合作方式和参与流程。"
    />
  );
}
