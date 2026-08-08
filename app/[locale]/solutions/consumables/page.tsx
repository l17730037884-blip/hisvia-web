import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export default function Page({ params }: { params: { locale: Locale } }) {
  return <PageShell locale={params.locale} pageKey="solutions.consumables" imagePrompt="stacks of industrial filters and consumable supplies on warehouse shelves, realistic photograph" />;
}
