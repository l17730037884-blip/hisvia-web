import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FloatingQuoteBar } from "@/components/layout/floating-quote-bar";
import { LangSync } from "@/components/layout/lang-sync";
import { resolveLocale } from "@/lib/locale";
import { BRAND } from "@/lib/site";
import { pageDescription } from "@/lib/seo";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  return {
    title: BRAND[locale],
    description: pageDescription(locale, locale === "ru" ? "Главная" : "Home"),
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <LangSync />
        <div className="flex min-h-full flex-1 flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-[0.875rem] focus:font-medium focus:text-dark-text"
          >
            {locale === "ru" ? "Перейти к содержимому" : "Skip to content"}
          </a>
          <Header locale={locale} />
          <main
            id="main"
            className="flex-1 pb-[calc(3.25rem+env(safe-area-inset-bottom,0px))] md:pb-0"
          >
            {children}
          </main>
          <Footer locale={locale} />
          <FloatingQuoteBar locale={locale} />
        </div>
      </body>
    </html>
  );
}
