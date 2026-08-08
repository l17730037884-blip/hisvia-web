import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export default function Page({ params }: { params: { locale: Locale } }) {
  return <PageShell locale={params.locale} pageKey="solutions.valves" imagePrompt="industrial steel ball valves and pipe fittings on workshop bench, realistic photograph" />;
}
