import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export const metadata = {
  title: "Hydraulic component and system sourcing. — HISVIA",
  description: "Cylinders, pumps, motors, and control valves from verified Chinese manufacturers.",
};
export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Hydraulic Solutions"
      title="Hydraulic component and system sourcing."
      description="Cylinders, pumps, motors, and control valves from verified Chinese manufacturers."
      imagePrompt="chrome hydraulic cylinder and control valve assembly industrial close up, realistic photograph"
    />
  );
}
