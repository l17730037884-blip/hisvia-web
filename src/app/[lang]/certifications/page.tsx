import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { Kicker, H1, Body } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TrustList } from "@/components/visual/trust-list";
import { getNavItems } from "@/lib/nav";
import { resolveAsset } from "@/lib/assets";
import { localized } from "@/lib/content";
import { pageTitle, pageDescription, languageAlternates, canonicalUrl } from "@/lib/seo";
import { resolveLocale, type Locale } from "@/lib/locale";
import { BRAND, SITE_URL } from "@/lib/site";

const CERT_FACT_IDS = ["F01", "F02", "F03", "F05", "F06", "F07", "F08"];
const CERT_ORDER = ["ASSET-10", "ASSET-12", "ASSET-15", "ASSET-16", "ASSET-11", "ASSET-13", "ASSET-17"];

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = locale === "ru" ? "Сертификаты" : "Certifications";
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, "Certifications"),
    alternates: languageAlternates(locale, "/certifications"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, "Certifications"),
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
  };
}

export default async function CertificationsPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const phone = localized(locale, "P01-C02");
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const certFacts = CERT_FACT_IDS.map((id) => localized(locale, `P05-${id}`)).filter(Boolean);
  const certImages = CERT_ORDER.map(resolveAsset)
    .filter((path): path is string => Boolean(path));
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: navLabel("nav_home"), item: `${SITE_URL}/${locale}/` },
      { "@type": "ListItem", position: 2, name: navLabel("nav_certifications"), item: canonicalUrl(locale, "/certifications") },
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
              { label: navLabel("nav_certifications") },
            ]}
          />
          <Kicker className="mt-6">{BRAND[locale]}</Kicker>
          <H1 className="mt-3">{localized(locale, "P05-H01")}</H1>
        </Container>
      </section>

      <section className="bg-canvas py-[clamp(3rem,6vw,5rem)]">
        <Container className="max-w-5xl mx-auto">
          <TrustList items={certFacts} columns="sm:grid-cols-2 lg:grid-cols-3" />
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-[clamp(3rem,6vw,5rem)]">
        <Container className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {/* 上面 4 张：grid-cols-4，gap-4，竖版 3:4 */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {certImages.slice(0, 4).map((src) => (
                <figure key={src} className="glass-highlight min-w-0">
                  <div className="glass-strong overflow-hidden rounded-card p-3 aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <figcaption aria-hidden className="mt-2 mx-auto h-px w-8 bg-line" />
                </figure>
              ))}
            </div>
            {/* 下面 3 张：grid-cols-3 对齐到同一容器左右边界；单卡宽度=上行的 4/3（放大 33%）；
                去掉 glass-highlight / glass-strong 边框，保持纯净无边框白底卡 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {certImages.slice(4).map((src) => (
                <figure key={src} className="min-w-0">
                  <div className="overflow-hidden p-3 aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <figcaption aria-hidden className="mt-2 mx-auto h-px w-8 bg-line" />
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-[clamp(3rem,6vw,5rem)]">
        <Container className="max-w-5xl mx-auto flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.15] text-ink">
              {navLabel("nav_customization")}
            </h2>
            <Body className="mt-3 text-ink-muted">{localized(locale, "P14-B01")}</Body>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTA href={navHref("nav_customization")} size="lg">{navLabel("nav_customization")}</CTA>
            <CTA href={telHref} variant="secondary" size="lg">{phone}</CTA>
          </div>
        </Container>
      </section>
    </>
  );
}
