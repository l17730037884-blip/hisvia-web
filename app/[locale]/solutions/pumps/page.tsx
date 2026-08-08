import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export default function Page({ params }: { params: { locale: Locale } }) {
  return <PageShell locale={params.locale} pageKey="solutions.pumps" imagePrompt="industrial centrifugal pump with steel piping on factory floor, realistic photograph" />;
}
