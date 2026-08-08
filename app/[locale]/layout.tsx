import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, Locale } from "@/lib/locales";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const archivo = Archivo({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-archivo" });
const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "zh" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <html lang={locale}>
      <body className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} font-body`}>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
