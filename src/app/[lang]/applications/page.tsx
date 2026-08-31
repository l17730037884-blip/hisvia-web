import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { Kicker, H1, Body } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getNavItems } from "@/lib/nav";
import { localized } from "@/lib/content";
import { pageTitle, pageDescription, languageAlternates, canonicalUrl } from "@/lib/seo";
import { resolveLocale, ogLocale, type Locale } from "@/lib/locale";
import { BRAND, SITE_URL } from "@/lib/site";

/** 应用页本地化文案(9 种语言)。 */
const APP_NAME: Record<Locale, string> = {
  "zh-CN": "应用领域", en: "Applications", ru: "Применение", tr: "Uygulamalar",
  es: "Aplicaciones", ar: "التطبيقات", de: "Anwendungen", fr: "Applications", pl: "Zastosowania",
};

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = APP_NAME[locale];
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, "Applications"),
    alternates: languageAlternates(locale, "/applications"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, "Applications"),
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function ApplicationsPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: navLabel("nav_home"), item: `${SITE_URL}/${locale}/` },
      { "@type": "ListItem", position: 2, name: navLabel("nav_applications"), item: canonicalUrl(locale, "/applications") },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />

      <section className="border-b border-line bg-surface">
        <Container className="py-[clamp(3rem,6vw,5rem)]">
          <Breadcrumb
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: navLabel("nav_applications") },
            ]}
          />
          <Kicker className="mt-6">{BRAND[locale]}</Kicker>
          <H1 className="mt-3">{navLabel("nav_applications")}</H1>
        </Container>
      </section>

      <section className="bg-canvas py-[clamp(3rem,6vw,5rem)]">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-6">
            <h2 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] font-bold leading-[1.2] text-ink">
              AGV
            </h2>
            <Body className="mt-4 text-ink-muted">{localized(locale, "P04-B01")}</Body>
          </div>
          <div className="rounded-card border border-line bg-surface p-6">
            <h2 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] font-bold leading-[1.2] text-ink">
              {navLabel("nav_products")}
            </h2>
            <Body className="mt-4 text-ink-muted">{localized(locale, "P14-B02")}</Body>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <Body className="mx-auto max-w-[72ch] text-center text-ink">
            {localized(locale, "P03-B02")}
          </Body>
        </Container>
      </section>

      <section className="bg-canvas py-[clamp(3rem,6vw,5rem)]">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.15] text-ink">
              {navLabel("nav_products")}
            </h2>
            <Body className="mt-3 text-ink-muted">{localized(locale, "P04-B02")}</Body>
          </div>
          <CTA href={navHref("nav_products")} size="lg">{navLabel("nav_products")}</CTA>
        </Container>
      </section>
    </>
  );
}
