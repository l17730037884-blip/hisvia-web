import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Get in touch with HISVIA. — HISVIA",
  description: "partner@hisvia.com — or submit a structured industrial requirement instead.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="Contact"
      title="Get in touch with HISVIA."
      description="partner@hisvia.com — or submit a structured industrial requirement instead."
      purpose="通用联系方式页（备用），主转化入口仍指向 Submit Industrial Requirement。"
      imagePrompt="industrial manufacturing and engineering partnership, realistic photograph"
    />
  );
}
