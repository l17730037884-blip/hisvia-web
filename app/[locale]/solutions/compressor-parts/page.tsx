import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export default function Page({ params }: { params: { locale: Locale } }) {
  return <PageShell locale={params.locale} pageKey="solutions.compressorParts" imagePrompt="precision machined metal compressor spare parts on workshop bench, realistic photograph" />;
}
