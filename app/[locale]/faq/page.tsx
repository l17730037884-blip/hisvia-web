import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Frequently asked questions. — HISVIA",
  description: "How to partner, inventory requirements, MOQ, shipping, and product confirmation.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="FAQ"
      title="Frequently asked questions."
      description="How to partner, inventory requirements, MOQ, shipping, and product confirmation."
      purpose="解答：如何合作 / 是否需要库存 / MOQ / 运输 / 产品确认。"
    />
  );
}
