import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "How Service Centers work with HISVIA. — HISVIA",
  description: "Access Chinese replacement parts and expand your repair capability, without building a China sourcing team.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="For Service Centers"
      title="How Service Centers work with HISVIA."
      description="Access Chinese replacement parts and expand your repair capability, without building a China sourcing team."
      purpose="展开首页 Partner Benefits 中 Service Centers 的具体合作方式和参与流程。"
    />
  );
}
