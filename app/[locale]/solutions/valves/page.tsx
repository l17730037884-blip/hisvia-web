import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export const metadata = {
  title: "Industrial valve sourcing and supply. — HISVIA",
  description: "Ball, gate, globe, check, and butterfly valves for industrial applications.",
};
export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Industrial Valve Solutions"
      title="Industrial valve sourcing and supply."
      description="Ball, gate, globe, check, and butterfly valves for industrial applications."
      imagePrompt="industrial steel ball valves and pipe fittings arranged on workshop bench, realistic photograph, macro detail"
    />
  );
}
