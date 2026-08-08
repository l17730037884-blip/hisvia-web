import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "OEM-spec and compatible replacement parts. — HISVIA",
  description: "Spare parts sourcing matched to your existing compressor fleet, including compatible replacement options.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Compressor Spare Parts"
      title="OEM-spec and compatible replacement parts."
      description="Spare parts sourcing matched to your existing compressor fleet, including compatible replacement options."
      purpose="同上四段式模板，重点关联 Compatible Replacement Solutions 页面。"
    />
  );
}
