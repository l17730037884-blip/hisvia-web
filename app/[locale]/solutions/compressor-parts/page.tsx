import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export default function Page({ params }: { params: { locale: Locale } }) {
  return <PageShell locale={params.locale} pageKey="solutions.compressorParts" imageSrc="/photos/raw/atlas-copco-spare-parts.jpg" />;
}
