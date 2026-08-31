import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { Kicker, H1, H2, Body } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/visual/section";
import { SectionHeader } from "@/components/visual/section-header";
import { ModelRange, type ModelRangeItem } from "@/components/visual/model-range";
import { DarkCta } from "@/components/visual/dark-cta";
import { getNavItems } from "@/lib/nav";
import { resolveAsset } from "@/lib/assets";
import { localized, paramTranslation, sanitizeProductModelName, paramValueTranslation } from "@/lib/content";
import { getFamilyBySlug, familyName as familyDisplayName } from "@/lib/families";
import { getAllProducts, productTitle, resolveProductImage } from "@/lib/products";
import { pageTitle, pageDescription, languageAlternates, canonicalUrl } from "@/lib/seo";
import { resolveLocale, ogLocale, type Locale } from "@/lib/locale";
import { BRAND, SITE_URL } from "@/lib/site";

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const family = getFamilyBySlug("planetary-reducer");
  const name = familyDisplayName(locale, family);
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, name),
    alternates: languageAlternates(locale, "/products/planetary-reducer"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, name),
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function PlanetaryReducerPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const phone = localized(locale, "P01-C02");
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const family = getFamilyBySlug("planetary-reducer");
  const familyName = familyDisplayName(locale, family);
  const familyIntro = family ? localized(locale, family.introContentId) : "";
  const products = getAllProducts();
  const ZOOM_25_ASSETS = new Set(["ASSET-05", "ASSET-07", "ASSET-08"]);
  const modelItems: ModelRangeItem[] = products
    .filter((product) => resolveProductImage(product))
    .map((product) => {
    const image = resolveProductImage(product);
    // 翻译：① param.name（参数名，中文→EN/RU）② param.value（参数值，若有中文也要翻译）
    // 过滤掉 label 为空的行 —— 避免渲染"带 border 的空框"(用户移动端反馈的视觉bug)
    const parameters = product.parameters
      .map((param) => ({
        label: paramTranslation(locale, product.contentId, param.name).trim(),
        value: paramValueTranslation(locale, param.value).trim(),
      }))
      .filter((p) => p.label.length > 0);
    return {
      id: product.productId.toLowerCase(),
      model: sanitizeProductModelName(product.model),
      title: productTitle(locale, product.productId) || sanitizeProductModelName(product.model),
      image,
      parameters,
      note: localized(locale, `PROD-${product.productId}-NOTE`),
      extra: product.productId === "P13-A" ? localized(locale, "PROD-P13-A-EXTRA") : "",
      zoom25: ZOOM_25_ASSETS.has(product.imageAssetIds?.[0] ?? ""),
    };
  });

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
      { "@type": "ListItem", position: 3, name: familyName, item: canonicalUrl(locale, "/products/planetary-reducer") },
    ],
  };
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: familyName,
    description: familyIntro,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      {/* 01 精简 hero：仅保留面包屑 + H1，不重复 family intro / CTA（已在 products 列表页展示） */}
      <section className="border-b border-line bg-surface">
        <Container className="max-w-6xl py-6 md:py-8">
          <Breadcrumb
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: navLabel("nav_products"), href: navHref("nav_products") },
              { label: familyName },
            ]}
          />
          <H1 className="mt-4 break-words">{familyName}</H1>
        </Container>
      </section>

      {/* 05 Model range: one module, 16 models */}
      <Section tone="canvas">
        <Container className="max-w-6xl">
          <SectionHeader
            kicker={navLabel("nav_products")}
            title={familyName}
          />
          <div className="mt-10">
            <ModelRange items={modelItems} />
          </div>
        </Container>
      </Section>

      {/* 07 OEM CTA */}
      <DarkCta image={resolveAsset("ASSET-37") ?? null} imageAlt="">
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
