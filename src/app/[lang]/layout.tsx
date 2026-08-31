import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FloatingQuoteBar } from "@/components/layout/floating-quote-bar";
import { LangSync } from "@/components/layout/lang-sync";
import { resolveLocale, LOCALES, htmlDir, type Locale } from "@/lib/locale";
import { BRAND } from "@/lib/site";
import { pageDescription } from "@/lib/seo";
import { localized } from "@/lib/content";

/** 阿拉伯语专用字体 Cairo:现代无衬线,笔画清晰,适合 B2B 工业站点。 */
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

/** 首页名称兜底(P01-H03 在翻译文件已有,此处仅防御性兜底,9 语言)。 */
const HOME_FALLBACK: Record<Locale, string> = {
  "zh-CN": "首页", en: "Home", ru: "Главная", tr: "Ana Sayfa",
  es: "Inicio", ar: "الرئيسية", de: "Startseite", fr: "Accueil", pl: "Strona główna",
};

/** 9 种 locale 全部静态预渲染。 */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** 跳过到主内容(skip link)的本地化文案。 */
const SKIP_LINK_TEXT: Record<Locale, string> = {
  "zh-CN": "跳到主内容",
  en: "Skip to content",
  ru: "Перейти к содержимому",
  tr: "İçeriğe geç",
  es: "Saltar al contenido",
  ar: "تخطّ إلى المحتوى",
  de: "Zum Inhalt springen",
  fr: "Aller au contenu",
  pl: "Przejdź do treści",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const homeName = localized(locale, "P01-H03") || HOME_FALLBACK[locale];
  return {
    title: BRAND[locale],
    description: pageDescription(locale, homeName),
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dir = htmlDir(locale);
  return (
    <html
      lang={locale}
      dir={dir}
      className={`h-full antialiased ${locale === "ar" ? cairo.variable : ""}`}
    >
      <body className="flex min-h-full flex-col">
        <LangSync />
        <div className="flex min-h-full flex-1 flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-[0.875rem] focus:font-medium focus:text-dark-text"
          >
            {SKIP_LINK_TEXT[locale]}
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
