import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { Kicker, H1, H2, Body } from "@/components/ui/typography";
import { AutoCollapse } from "@/components/ui/auto-collapse";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Section } from "@/components/visual/section";
import { SectionHeader } from "@/components/visual/section-header";
import { MediaText } from "@/components/visual/media-text";
import { DarkCta } from "@/components/visual/dark-cta";
import { ProductCarousel, type ProductCarouselItem } from "@/components/visual/product-carousel";
import { getNavItems } from "@/lib/nav";
import { resolveAsset } from "@/lib/assets";
import { localized, sanitizeProductModelName } from "@/lib/content";
import { getFamilies } from "@/lib/families";
import { getAllProducts, resolveProductImage, productAnchorHref } from "@/lib/products";
import { pageTitle, pageDescription, languageAlternates, canonicalUrl } from "@/lib/seo";
import { resolveLocale, type Locale } from "@/lib/locale";
import { BRAND, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/cn";

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = locale === "ru" ? "Продукция" : "Products";
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, "Products"),
    alternates: languageAlternates(locale, "/products"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, "Products"),
      locale: locale === "ru" ? "ru_RU" : "en_US",
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
  const families = getFamilies();
  const products = getAllProducts();
  // 产品展平：每个型号独立展示（AGV P06/P07/P08/P09 等不再被合并），仅去掉缺图
  // model 中文括号/中文词全部过滤（sanitizeProductModelName 统一处理 4 类括号残留）
  const ZOOM_25_ASSETS = new Set(["ASSET-05", "ASSET-07", "ASSET-08"]);
  const carouselItems: ProductCarouselItem[] = products
    .filter((p) => resolveProductImage(p))
    .map((p) => ({
      image: resolveProductImage(p)!,
      model: sanitizeProductModelName(p.model),
      href: productAnchorHref(locale, p),
      zoom25: ZOOM_25_ASSETS.has(p.imageAssetIds?.[0] ?? ""),
    }));
  // 液压油缸产品图：末尾追加（无独立型号详情页 → 链接到本页 hydraulic 锚点 + 询盘 CTA）
  const hydraulicLabel = locale === "ru" ? "Гидроцилиндр" : "Hydraulic Cylinder";
  const hydraulicAnchor = `/${locale}/products#hydraulic-cylinders`;
  const hydraulicAssets = ["ASSET-45", "ASSET-46", "ASSET-47"];
  for (const id of hydraulicAssets) {
    const img = resolveAsset(id);
    if (img) carouselItems.push({ image: img, model: hydraulicLabel, href: hydraulicAnchor });
  }
  // 「查看更多」目标：跳转到行星减速器详情页
  const viewMoreHref = `/${locale}/products/planetary-reducer`;
  const viewMoreLabel = locale === "ru" ? "Смотреть все" : "View more";
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

      <section className="border-b border-line bg-surface">
        <Container className="py-12 md:py-16">
          <Breadcrumb
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: navLabel("nav_products") },
            ]}
          />
          <Kicker className="mt-6">{localized(locale, "P01-H01")}</Kicker>
          <H1 className="mt-3">{navLabel("nav_products")}</H1>
        </Container>
      </section>

      <Section tone="canvas">
        <Container className="max-w-6xl">
          <div
            className={cn(
              "grid gap-10 lg:gap-16",
              families.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
            )}
          >
            {families.map((family) => {
              const name = locale === "ru" ? family.nameRu : family.nameEn;
              const image = family.imageAssetIds.map(resolveAsset).find(Boolean);
              const intro = localized(locale, family.introContentId);
              return (
                <div key={family.familyId} className="contents">
                  <MediaText
                    image={image ?? ""}
                    imageAlt={name ?? ""}
                    fit="natural"
                    className="gap-8"
                  >
                    <div className="min-w-0">
                      <Kicker>{navLabel("nav_products")}</Kicker>
                      <H2 className="mt-3">{name}</H2>
                      <AutoCollapse lines={4}>
                        <Body className="drop-cap mt-5 max-w-[66ch] text-ink-muted">{intro}</Body>
                      </AutoCollapse>
                      <div className="mt-8">
                        <CTA href={`/${locale}/products/${family.slug}`} size="lg">
                          {navLabel("nav_products")}
                        </CTA>
                      </div>
                    </div>
                  </MediaText>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── Hydraulic Cylinders · 液压油缸画报式产品区 ── */}
      <Section id="hydraulic-cylinders" tone="surface" className="border-y border-line">
        <Container className="max-w-6xl">
          <MediaText
            image={resolveAsset("ASSET-45") ?? ""}
            imageAlt={locale === "ru" ? "Гидроцилиндр" : "Hydraulic Cylinder"}
            fit="natural"
            flip
            className="gap-8 lg:gap-12"
          >
            <div className="min-w-0">
              <Kicker>{locale === "ru" ? "Новая линейка" : "Product Line"}</Kicker>
              <H2 className="mt-3">
                {locale === "ru" ? "Гидроцилиндры" : "Hydraulic Cylinders"}
              </H2>
              <AutoCollapse lines={4}>
                <Body className="drop-cap mt-5 max-w-[66ch] text-ink-muted">
                  {locale === "ru"
                    ? "Высоконадежные сварные и штанговые гидроцилиндры для тяжелой промышленности, строительной и дорожной техники. Точная хонинговка трубок, хромированные штоки, индивидуальные варианты крепления под задачи заказчика."
                    : "High-performance welded and tie-rod hydraulic cylinders engineered for heavy-duty industrial, construction and mobile machinery. Precision honed tubes, chrome-plated rods and custom mounting options to match your equipment specifications."}
                </Body>
              </AutoCollapse>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href={`${navHref("nav_customization")}?line=hydraulic`} size="lg">
                  {locale === "ru" ? "Запросить расчет" : "Request a Quote"}
                </CTA>
                <CTA
                  href={telHref}
                  variant="secondary"
                  size="lg"
                >
                  {phone}
                </CTA>
              </div>
            </div>
          </MediaText>

          {/* — 2 张副图：并排画廊画报感（透明PNG油缸 → 统一白底，图片撑满容器不露边）
                 · 2 列 grid 的 gap 必须与上方 MediaText 完全一致，才能让
                   主图的左侧（图文块的右列左边） 与 画廊右卡（ASSET-47）的左侧严格垂直对齐 — */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-12 lg:gap-12">
            {[
              { id: "ASSET-46", tag: locale === "ru" ? "Серия HSG" : "HSG Series" },
              { id: "ASSET-47", tag: locale === "ru" ? "Серия MOB" : "MOB Series" },
            ].map((g) => {
              const img = resolveAsset(g.id);
              if (!img) return null;
              return (
                <figure
                  key={g.id}
                  className="group relative overflow-hidden rounded-card border border-line bg-white transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={g.tag}
                      className="h-full w-full scale-[1.04] object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.12]"
                    />
                  </div>
                  <figcaption className="border-t border-line bg-white px-4 py-3">
                    <p className="text-sm font-semibold tracking-tight text-ink group-hover:text-accent">
                      {g.tag}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      {locale === "ru"
                        ? "Стандартные и нестандартные исполнения"
                        : "Standard and custom configurations"}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="canvas" className="!pt-6 md:!pt-10">
        <Container className="max-w-6xl">
          <SectionHeader
            kicker={localized(locale, "P01-H01")}
            title={navLabel("nav_products")}
            lead={localized(locale, "P04-B01")}
          />
          <div className="mt-5 md:mt-8">
            <ProductCarousel items={carouselItems} />
          </div>
          <div className="mt-6 flex justify-center md:mt-8">
            <CTA href={viewMoreHref} size="lg">
              {viewMoreLabel}
            </CTA>
          </div>
        </Container>
      </Section>

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
