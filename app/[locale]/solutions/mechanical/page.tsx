import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export default function Page({ params }: { params: { locale: Locale } }) {
  return <PageShell locale={params.locale} pageKey="solutions.mechanical" imagePrompt="industrial ball bearings and mechanical seals on workbench, realistic photograph" />;
}
