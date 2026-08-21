import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { H1, H2, Body, Kicker } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ImageCarousel, type ImageCarouselSlide } from "@/components/visual/image-carousel";
import { ProductCarousel, type ProductCarouselItem } from "@/components/visual/product-carousel";
import { AutoCollapse } from "@/components/ui/auto-collapse";
import { getNavItems } from "@/lib/nav";
import { resolveAsset } from "@/lib/assets";
import { localized, sanitizeProductModelName } from "@/lib/content";
import { getAllProducts, resolveProductImage } from "@/lib/products";
import { pageTitle, pageDescription, languageAlternates } from "@/lib/seo";
import { resolveLocale, type Locale } from "@/lib/locale";
import { BRAND } from "@/lib/site";

const CERT_ASSET_IDS = ["ASSET-10", "ASSET-12", "ASSET-15", "ASSET-16", "ASSET-11", "ASSET-13", "ASSET-17"];
const HERO_PHOTO_IDS = ["ASSET-02", "ASSET-03"];

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = locale === "ru" ? "О компании" : "About";
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, "About"),
    alternates: languageAlternates(locale, "/about"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, "About"),
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const certPhotos = CERT_ASSET_IDS.map(resolveAsset).filter((p): p is string => Boolean(p));
  // 顶部大图轮播：共 2 张。
  // 第 1 张（首图）→ 工厂门头（用户要求替换原首图 ASSET-02）
  // 第 2 张 → 保留原第二张 ASSET-03（ASSET-02 不再出现在轮播中）
  const heroSlides: ImageCarouselSlide[] = [
    { src: "/assets/images/factory-gate.jpg", alt: BRAND[locale] },
    { src: "/assets/ASSET-03-orig.jpg", alt: BRAND[locale] },
  ];
  // 产品轮播数据（去中文括号/中文词残留 —— 用公共 sanitizeProductModelName）
  const products = getAllProducts();
  const ZOOM_25_ASSETS = new Set(["ASSET-05", "ASSET-07", "ASSET-08"]);
  const productItems: ProductCarouselItem[] = products
    .filter((p) => resolveProductImage(p))
    .map((p) => ({
      image: resolveProductImage(p)!,
      model: sanitizeProductModelName(p.model),
      href: `/${locale}/products/planetary-reducer#${p.productId.toLowerCase()}`,
      zoom25: ZOOM_25_ASSETS.has(p.imageAssetIds?.[0] ?? ""),
    }));
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND[locale],
    telephone: localized(locale, "P01-C02"),
    address: localized(locale, "P01-C01"),
    postalCode: localized(locale, "P01-C03"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />

      <section className="border-b border-line bg-surface">
        <Container className="max-w-6xl py-12 md:py-16">
          <Breadcrumb
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: navLabel("nav_about") },
            ]}
          />
          {/* Kicker 标签（去掉序号） */}
          <div className="mt-10">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-muted">
              {navLabel("nav_about")}
            </span>
          </div>
          <H1 className="mt-4 !text-[clamp(1.75rem,3vw,2.25rem)] !font-bold !tracking-[-0.03em]">
            {localized(locale, "P03-H01")}
          </H1>
          <Body className="mt-5 max-w-prose text-ink-muted">{localized(locale, "P03-S01")}</Body>
          {heroSlides.length > 0 ? (
            <div className="mt-10 md:mt-12">
              <ImageCarousel slides={heroSlides} ratio="21 / 9" />
            </div>
          ) : null}
        </Container>
      </section>

      {/* 公司概况：首字下沉 + 不对称编辑网格 */}
      <section className="bg-canvas py-12 md:py-16">
        <Container className="max-w-6xl">
          <div className="editorial-grid-5-7">
              <div className="flex flex-col">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-muted">
                  {locale === "ru" ? "Профиль" : "Profile"}
                </span>
                <div className="mt-4">
                  <CTA href={navHref("nav_products")}>{navLabel("nav_products")}</CTA>
                </div>
              </div>
              <AutoCollapse lines={4}>
                <p className="drop-cap max-w-[68ch] text-ink leading-[1.7]">
                  {localized(locale, "P03-B01")}
                </p>
              </AutoCollapse>
            </div>
        </Container>
      </section>

      {/* 色块过渡：accent 实底 */}
      <section className="color-block">
        <Container className="relative flex flex-col items-center justify-center py-10 md:py-14">
          <p className="relative font-display text-[clamp(1.0625rem,1.6vw,1.25rem)] font-medium leading-[1.65] tracking-[-0.01em] text-on-accent text-balance max-w-[58ch]">
            {localized(locale, "P03-B03")}
          </p>
        </Container>
      </section>

      {/* Products 轮播：4图一组 */}
      <section className="bg-canvas py-12 md:py-16">
        <Container className="max-w-6xl">
          <div className="mb-5 md:mb-6">
            <Kicker className="mb-2">{locale === "ru" ? "Планетарные редукторы" : "Planetary reducers"}</Kicker>
            <H2>{navLabel("nav_products")}</H2>
          </div>
          <ProductCarousel items={productItems} />
          <div className="mt-8 flex justify-center md:mt-10">
            <CTA href={navHref("nav_products")} variant="secondary">
              {locale === "ru" ? "Вся продукция" : "View all products"}
            </CTA>
          </div>
        </Container>
      </section>

      {/* 资质：7 张证书滚动 */}
      <section className="bg-canvas py-12 md:py-16">
        <Container className="max-w-6xl">
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 max-w-[60ch]">
              <H2 className="!tracking-[-0.01em]">{navLabel("nav_certifications")}</H2>
              <AutoCollapse lines={3} className="mt-4">
                <p className="text-ink-muted">{localized(locale, "P03-B04")}</p>
              </AutoCollapse>
            </div>
            <div className="shrink-0">
              <CTA href={navHref("nav_certifications")} variant="secondary">
                {navLabel("nav_certifications")}
              </CTA>
            </div>
          </div>

          {/* 7 张证书横向滚动 */}
          <div className="mt-10 overflow-x-auto pb-4">
            <ul className="flex gap-5 snap-x snap-mandatory">
              {certPhotos.map((src) => (
                <li
                  key={src}
                  className="snap-start shrink-0 w-[200px] sm:w-[220px] md:w-[240px]"
                >
                  <div className="overflow-hidden rounded-card border border-line bg-white p-3 aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <span className="mt-3 block h-px w-10 bg-line" aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 企业宗旨：大引号 pull-quote */}
      <section className="border-y border-line bg-surface py-12 md:py-16">
        <Container className="max-w-6xl">
          <blockquote className="pull-quote mx-auto mt-8 max-w-[60ch]">
            {localized(locale, "P03-B05")}
          </blockquote>
        </Container>
      </section>

      {/* CTA + 联系 */}
      <section className="bg-dark text-dark-text">
        <Container className="max-w-6xl flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-16">
          <div className="max-w-xl">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-dark-muted">
              {locale === "ru" ? "Контакт" : "Contact"}
            </span>
            <H2 className="!mt-3 !text-dark-text">{navLabel("nav_contact")}</H2>
            <p className="mt-3 text-dark-muted">{localized(locale, "P01-C01")}</p>
            <p className="mt-2 font-mono text-[0.9375rem] text-dark-text">
              {localized(locale, "P01-C02")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTA
              href={`tel:${localized(locale, "P01-C02").replace(/[^0-9+]/g, "")}`}
              variant="dark"
              size="lg"
            >
              {localized(locale, "P01-C02")}
            </CTA>
            <CTA href={navHref("nav_contact")} variant="primary" size="lg">
              {navLabel("nav_contact")}
            </CTA>
          </div>
        </Container>
      </section>
    </>
  );
}
