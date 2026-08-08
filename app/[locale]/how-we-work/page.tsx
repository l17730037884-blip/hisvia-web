import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "From technical demand to delivery. — HISVIA",
  description: "A 6-step coordinated process, already summarized on the homepage — this page expands each step with more technical detail.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="How We Work"
      title="From technical demand to delivery."
      description="A 6-step coordinated process, already summarized on the homepage — this page expands each step with more technical detail."
      purpose="首页已有精简版6步流程，这里做成完整版工业流程图页面，每步配更详细说明。"
    />
  );
}
