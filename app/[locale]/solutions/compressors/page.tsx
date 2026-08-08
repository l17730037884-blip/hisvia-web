import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export default function Page({ params }: { params: { locale: Locale } }) {
  return <PageShell locale={params.locale} pageKey="solutions.compressors" imagePrompt="large industrial screw air compressor in modern factory, realistic photograph" />;
}
