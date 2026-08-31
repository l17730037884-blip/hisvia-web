import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { Kicker, H1, H2, Body } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/visual/section";
import { DarkCta } from "@/components/visual/dark-cta";
import { ProductCategories, type ProductCategoriesData } from "@/components/visual/product-categories";
import { getNavItems } from "@/lib/nav";
import { resolveAsset } from "@/lib/assets";
import { localized } from "@/lib/content";
import { pageTitle, pageDescription, languageAlternates, canonicalUrl } from "@/lib/seo";
import { resolveLocale, ogLocale, type Locale } from "@/lib/locale";
import { BRAND, SITE_URL } from "@/lib/site";
import categoriesData from "@/data/product-categories.generated.json";

/** 产品页本地化文案(9 种语言)。 */
const PRODUCTS_NAME: Record<Locale, string> = {
  "zh-CN": "产品", en: "Products", ru: "Продукция", tr: "Ürünler", es: "Productos",
  ar: "المنتجات", de: "Produkte", fr: "Produits", pl: "Produkty",
};
const HERO_LEAD: Record<Locale, string> = {
  "zh-CN": "AGV、液压油缸、行星与回转减速器、绞车传动",
  en: "AGV, hydraulic cylinders, planetary and slewing reducers, winch drives",
  ru: "AGV, гидроцилиндры, планетарные и поворотные редукторы, лебёдочные передачи",
  tr: "AGV, hidrolik silindirler, planetary ve döner redüktörler, vinç tahrikleri",
  es: "AGV, cilindros hidráulicos, reductores planetarios y orientables, transmisiones de malacate",
  ar: "AGV، الأسطوانات الهيدروليكية، المخفضات الكوكبية والدوارة، نقالات الونش",
  de: "AGV, Hydraulikzylinder, Planeten- und Drehgetriebe, Seilwinden-Antriebe",
  fr: "AGV, vérins hydrauliques, réducteurs planétaires et orientables, treuils",
  pl: "AGV, siłowniki hydrauliczne, przekładnie planetarne i obrotowe, napędy wciągarek",
};

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = PRODUCTS_NAME[locale];
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, "Products"),
    alternates: languageAlternates(locale, "/products"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, "Products"),
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const phone = localized(locale, "P01-C02");
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  // hero 副标题（"AGV, гидроцилиндры, ..." 等汇总文案）
  const heroLead = HERO_LEAD[locale];
  const heroTitle = PRODUCTS_NAME[locale];

  // 把数据 cast 成类型化对象
  const data = categoriesData as unknown as ProductCategoriesData;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND[locale],
    telephone: phone,
    address: localized(locale, "P01-C01"),
    postalCode: localized(locale, "P01-C03"),
  };
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: navLabel("nav_home"), item: `${SITE_URL}/${locale}/` },
      { "@type": "ListItem", position: 2, name: navLabel("nav_products"), item: canonicalUrl(locale, "/products") },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />

      {/* ── Hero · 黑色渐变(对齐线上 8/22) ── */}
      <section
        className="relative overflow-hidden border-b border-white/10"
        style={{ background: "linear-gradient(180deg,#0b141f 0%,#08080d 50%,#060609 100%)" }}
      >
        {/* 装饰性橙色光晕 */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -start-10 h-40 w-48 rounded-full bg-accent/15 blur-3xl"
        />
        <Container className="relative py-8 md:py-10">
          <Breadcrumb
            dark
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: navLabel("nav_products") },
            ]}
          />
          <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-6">
            <h1 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {heroTitle}
            </h1>
            <p className="text-xs text-dark-muted md:text-sm md:max-w-md md:text-end">
              {heroLead}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Product Categories · 5 大分类网格 + sticky tab ── */}
      <Section id="product-categories" tone="canvas" className="border-b border-line">
        <Container className="max-w-7xl">
          <ProductCategories locale={locale} data={data} />
        </Container>
      </Section>

      {/* ── Dark CTA · 定制流程 ── */}
      <DarkCta image={resolveAsset("ASSET-36") ?? null} imageAlt="">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <Kicker className="text-dark-muted">{navLabel("nav_customization")}</Kicker>
            <H2 className="mt-3 text-dark-text">{localized(locale, "P14-H01")}</H2>
            <Body className="mt-4 text-dark-muted">{localized(locale, "P14-B01")}</Body>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTA href={navHref("nav_customization")} variant="dark" size="lg">
              {navLabel("nav_customization")}
            </CTA>
            <CTA href={telHref} variant="secondary" size="lg" className="border-dark-line bg-transparent text-dark-text hover:bg-dark-line">
              {phone}
            </CTA>
          </div>
        </div>
      </DarkCta>
    </>
  );
}
