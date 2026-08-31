import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { Kicker, H1 } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { SectionHeader } from "@/components/visual/section-header";
import { DecoratedImage } from "@/components/visual/decorated-image";
import { AutoCollapse } from "@/components/ui/auto-collapse";
import { getNavItems } from "@/lib/nav";
import { resolveAssets } from "@/lib/assets";
import { localized } from "@/lib/content";
import { pageTitle, pageDescription, languageAlternates, canonicalUrl } from "@/lib/seo";
import { resolveLocale, ogLocale, type Locale } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

/** 技术页本地化文案(9 种语言)。 */
const TECH_NAME: Record<Locale, string> = {
  "zh-CN": "技术", en: "Technology", ru: "Технологии", tr: "Teknoloji", es: "Tecnología",
  ar: "التقنية", de: "Technologie", fr: "Technologie", pl: "Technologia",
};

const FEATURE_IDS = ["P04-B03", "P04-B04"];

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = TECH_NAME[locale];
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, "Technology"),
    alternates: languageAlternates(locale, "/technology"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, "Technology"),
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function TechnologyPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const features = FEATURE_IDS.map((id) => localized(locale, id)).filter(Boolean);
  // 去掉 ASSET-02（工厂门头照片，非产品/技术图）；05/07/08 为产品主图，默认显示放大 25%
  const photos = resolveAssets(["ASSET-05", "ASSET-07", "ASSET-08"]);
  const heroImage = photos[0];
  const featureImages = photos.slice(1, 4);
  const zoomImg = "scale-[1.25] origin-center overflow-hidden transition-transform duration-300 ease-out";
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: navLabel("nav_home"), item: `${SITE_URL}/${locale}/` },
      { "@type": "ListItem", position: 2, name: navLabel("nav_technology"), item: canonicalUrl(locale, "/technology") },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />

      <section className="border-b border-line bg-surface">
        <Container className="max-w-6xl grid gap-8 py-10 md:py-14 lg:grid-cols-2 lg:items-center">
          <div className="min-w-0">
            <Breadcrumb
              items={[
                { label: navLabel("nav_home"), href: `/${locale}/` },
                { label: navLabel("nav_technology") },
              ]}
            />
            <Kicker className="mt-5">{localized(locale, "P04-H01")}</Kicker>
            <H1 className="mt-3">{localized(locale, "P04-H02")}</H1>
            <AutoCollapse lines={4}>
              <p className="mt-4 max-w-prose text-ink-muted">{localized(locale, "P04-B02")}</p>
            </AutoCollapse>
          </div>
          {heroImage ? (
            <div className="min-w-0">
              <DecoratedImage src={heroImage} alt={navLabel("nav_technology")} ratio="4 / 3" fit="contain" imgClassName={zoomImg} />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-canvas py-10 md:py-14">
        <Container className="max-w-6xl">
          <SectionHeader
            kicker={localized(locale, "P04-H01")}
            title={navLabel("nav_technology")}
          />

          <div className="mt-10 space-y-12 md:mt-12 md:space-y-16">
            {features.map((text, i) => {
              const image = featureImages[i];
              const flip = i % 2 === 1;
              return (
                <div key={FEATURE_IDS[i]} className="grid gap-6 lg:grid-cols-2 lg:items-center">
                  <div className={cn("min-w-0", flip && "lg:order-2")}>
                    <span aria-hidden className="block h-px w-10 bg-accent/60" />
                    <AutoCollapse lines={4}>
                      <p className="mt-3 max-w-[56ch] text-ink-muted">{text}</p>
                    </AutoCollapse>
                  </div>
                  {/* 清理 № 序号：此处原为 {String(i+1).padStart(2,'0')}，已移除 */}
                  {image ? (
                    <div className={cn("min-w-0", flip && "lg:order-1")}>
                      <DecoratedImage src={image} alt="" ratio="4 / 3" fit="contain" imgClassName={zoomImg} />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-10 md:py-14">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.15] text-ink">
              {navLabel("nav_products")}
            </h2>
            <AutoCollapse lines={3}>
              <p className="mt-3 text-ink-muted">{localized(locale, "P04-B02")}</p>
            </AutoCollapse>
          </div>
          <CTA href={navHref("nav_products")} size="lg">{navLabel("nav_products")}</CTA>
        </Container>
      </section>
    </>
  );
}
