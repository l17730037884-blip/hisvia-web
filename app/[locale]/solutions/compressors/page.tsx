import SystemSolutionPage from "@/components/SystemSolutionPage";
import type { Locale } from "@/lib/locales";

export default function Page({ params }: { params: { locale: Locale } }) {
  return <SystemSolutionPage locale={params.locale} systemType="Air Compressor Systems" />;
}
