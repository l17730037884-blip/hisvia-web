import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export const metadata = {
  title: "Compressor spare parts and consumables. — HISVIA",
  description: "Precision-machined compressor replacement parts compatible with major brands.",
};
export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Compressor Parts & Consumables"
      title="Compressor spare parts and consumables."
      description="Precision-machined compressor replacement parts compatible with major brands."
      imagePrompt="precision machined metal compressor spare parts arranged on workshop bench, realistic photograph, top down view"
    />
  );
}
