import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export const metadata = {
  title: "Mechanical component and precision part sourcing. — HISVIA",
  description: "Bearings, seals, gears, shafts, and custom-machined mechanical components.",
};
export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Mechanical Solutions"
      title="Mechanical component and precision part sourcing."
      description="Bearings, seals, gears, shafts, and custom-machined mechanical components."
      imagePrompt="industrial ball bearings and mechanical seals arranged on workbench, realistic photograph, macro detail, precision engineering"
    />
  );
}
