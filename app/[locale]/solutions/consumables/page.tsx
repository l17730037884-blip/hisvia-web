import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export const metadata = {
  title: "Industrial consumables and filter sourcing. — HISVIA",
  description: "Filters, separators, lubricants, and maintenance consumables for industrial equipment.",
};
export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Industrial Consumables"
      title="Industrial consumables and filter sourcing."
      description="Filters, separators, lubricants, and maintenance consumables for industrial equipment."
      imagePrompt="stacks of industrial filters and consumable supplies organized on warehouse shelves, realistic photograph"
    />
  );
}
