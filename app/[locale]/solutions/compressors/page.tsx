import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export const metadata = {
  title: "Compressor sourcing for service and rental fleets. — HISVIA",
  description: "Full-range compressor sourcing matched to your fleet and customer requirements.",
};
export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Industrial Compressor Solutions"
      title="Compressor sourcing for service and rental fleets."
      description="Full-range compressor sourcing matched to your fleet and customer requirements."
      imagePrompt="large industrial screw air compressor in modern factory, realistic photograph, blue tones, professional industrial photography"
    />
  );
}
