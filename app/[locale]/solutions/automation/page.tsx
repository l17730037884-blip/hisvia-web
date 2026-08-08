import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";
export const metadata = {
  title: "Automation component and control system sourcing. — HISVIA",
  description: "PLC modules, sensors, actuators, and control panels from qualified Chinese suppliers.",
};
export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Automation Solutions"
      title="Automation component and control system sourcing."
      description="PLC modules, sensors, actuators, and control panels from qualified Chinese suppliers."
      imagePrompt="industrial automation control panel with PLC modules and organized wiring, realistic photograph"
    />
  );
}
