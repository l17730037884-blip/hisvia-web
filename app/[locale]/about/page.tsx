import PageShell from "@/components/PageShell";
import type { Locale } from "@/lib/locales";

export const metadata = {
  title: "Why HISVIA exists. — HISVIA",
  description: "HISVIA was founded to help overseas industrial companies connect with Chinese manufacturing resources.",
};

export default function Page({ params }: { params: { locale: Locale } }) {
  return (
    <PageShell
      locale={params.locale}
      kicker="About HISVIA"
      title="Why HISVIA exists."
      description="HISVIA was founded to help overseas industrial companies connect with Chinese manufacturing resources."
      purpose="回答“我是谁”——不要写成贸易公司介绍，重点讲使命：帮助海外工业企业连接中国制造资源，建立长期合作。"
    />
  );
}
