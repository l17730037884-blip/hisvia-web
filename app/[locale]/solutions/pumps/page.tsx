import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export const metadata = {
  title: "Industrial pump sourcing and replacement. — HISVIA",
  description: "Centrifugal, diaphragm, and gear pump sourcing for industrial applications.",
};
export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Industrial Pump Solutions"
      title="Industrial pump sourcing and replacement."
      description="Centrifugal, diaphragm, and gear pump sourcing for industrial applications."
      imagePrompt="industrial centrifugal pump with steel piping on factory floor, realistic photograph, professional industrial photography"
    />
  );
}
