import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { Kicker, H1, H2, Body, Technical } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DecoratedImage } from "@/components/visual/decorated-image";
import { ProcessStepper } from "@/components/visual/process-stepper";
import { InquiryForm } from "@/components/visual/inquiry-form";
import { AutoCollapse } from "@/components/ui/auto-collapse";
import { getNavItems } from "@/lib/nav";
import { resolveAsset } from "@/lib/assets";
import { localized, sanitizeProductModelName } from "@/lib/content";
import { getFamilies, type ProductFamily } from "@/lib/families";
import { getProductByProductId, productTitle, productAnchorHref } from "@/lib/products";
import { pageTitle, pageDescription, languageAlternates, canonicalUrl } from "@/lib/seo";
import { resolveLocale, type Locale } from "@/lib/locale";
import { BRAND, SITE_URL } from "@/lib/site";

const STEP_IDS = ["P01", "P02", "P03", "P04", "P05", "P06", "P07", "P08"];

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = locale === "ru" ? "Индивидуальный заказ" : "Customization Process";
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, "Customization Process"),
    alternates: languageAlternates(locale, "/customization"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, "Customization Process"),
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
  };
}

export default async function CustomizationPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const phone = localized(locale, "P01-C02");
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const steps = STEP_IDS.map((id, i) => ({
    id: `step-${i + 1}`,
    number: i + 1,
    text: localized(locale, `P14-${id}`),
  })).filter((s) => s.text);
  const valueText = localized(locale, "P14-B01");
  const valueBody = valueText.replace(/^[^:]+:\s*/, "");
  const valueItems = valueBody
    .split(/;\s+(?=[A-ZА-ЯЁ])/)
    .map((part) => {
      const separator = part.indexOf(" — ");
      if (separator === -1) return { label: part.trim(), body: "" };
      return { label: part.slice(0, separator).trim(), body: part.slice(separator + 3).trim() };
    })
    .filter((item) => item.label);
  const p13a = getProductByProductId("P13-A");
  const p13aImage = p13a ? p13a.imageAssetIds.map(resolveAsset).find(Boolean) : null;
  const p13aTitle = productTitle(locale, "P13-A");
  const p13aExtra = localized(locale, "PROD-P13-A-EXTRA");
  const p13aHref = p13a ? productAnchorHref(locale, p13a) : null;
  // — 全系列可定制：主产品图集合（行星减速器主图 + 液压油缸 3 张），用小缩略图画报展示，
  //   引导买家"任何型号 / 配置 / 规格 都能 定制"
  //   2026-08-21 用户强制要求 05/07/08 这 3 张默认放大 25%（scale 1.25），液压油缸保持原样
  const showcaseIds = ["ASSET-05", "ASSET-07", "ASSET-08", "ASSET-45", "ASSET-46", "ASSET-47"];
  const ZOOM_25_SET = new Set(["ASSET-05", "ASSET-07", "ASSET-08"]);
  type ShowcaseItem = { id: string; src: string; zoom25: boolean };
  const showcase: ShowcaseItem[] = showcaseIds
    .map((id) => ({ id, src: resolveAsset(id), zoom25: ZOOM_25_SET.has(id) }))
    .filter((x): x is ShowcaseItem => Boolean(x.src));
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
      {
        "@type": "ListItem",
        position: 2,
        name: navLabel("nav_customization"),
        item: canonicalUrl(locale, "/customization"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />

      {/* Hero: 窄幅, 浅底 */}
      <section className="border-b border-line bg-surface">
        <Container className="py-[clamp(3rem,6vw,5rem)]">
          <Breadcrumb
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: navLabel("nav_customization") },
            ]}
          />
          <Kicker className="mt-6">{localized(locale, "P01-H01")}</Kicker>
          <H1 className="mt-3">{localized(locale, "P14-H01")}</H1>
        </Container>
      </section>

      {/* 8 步流程：交互式手风琴 */}
      <section className="bg-canvas py-[clamp(3rem,6vw,5rem)]">
        <Container className="max-w-3xl mx-auto">
          <ProcessStepper steps={steps} locale={locale} />
        </Container>
      </section>

      {/* 价值主张: 玻璃高光卡片 */}
      <section className="border-y border-line bg-surface py-[clamp(3rem,6vw,5rem)]">
        <Container className="max-w-4xl mx-auto">
          <div className="glass-highlight rounded-card border border-line bg-canvas p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-10">
              <H2 className="!text-[clamp(1.25rem,2vw,1.75rem)] !font-bold">
                {navLabel("nav_customization")}
              </H2>
              <div className="space-y-3">
                {valueItems.map((item) => (
                  <p key={item.label} className="text-[0.9375rem] leading-relaxed text-ink-muted">
                    <strong className="font-semibold text-ink">{item.label}</strong>
                    {item.body ? <> — {item.body}</> : null}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 非标产品示例: FB-180D */}
      {p13a ? (
        <section className="bg-canvas py-[clamp(3rem,6vw,5rem)]">
          <Container className="max-w-4xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {p13aImage ? (
                <DecoratedImage src={p13aImage} alt={sanitizeProductModelName(p13a.model)} />
              ) : null}
              <div>
                <Technical className="break-keep text-[clamp(1rem,1.6vw,1.25rem)] text-ink">
                  {p13aTitle}
                </Technical>
                <AutoCollapse lines={4}>
                  <p className="drop-cap mt-4 max-w-[72ch] text-ink-muted">{p13aExtra}</p>
                </AutoCollapse>
                <div className="mt-8">
                  {p13aHref ? (
                    <CTA href={p13aHref}>{p13aTitle}</CTA>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ============== 全系列可定制 · 买家引导（用户要求"全部可以"的强提示） ==============
           · 左侧：主图大图 + 6 张缩略图画报墙（行星减速器 + 液压油缸 + AGV 系列全上）
           · 右侧：大字强调"所有型号/配件/规格/图纸 都能 100% 定制" + 清单 + CTA
           · 解决用户反馈"买家不知道哪些可定制" */}
      <section className="border-y border-line bg-surface py-[clamp(3rem,6vw,5rem)]">
        <Container className="max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
            {/* 左：产品图画报 */}
            <div className="min-w-0">
              <div className="relative overflow-hidden rounded-card border border-line bg-white">
                <div className="aspect-[4/3] w-full overflow-hidden bg-white p-3 sm:p-4">
                  {showcase[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={showcase[0].src}
                      alt=""
                      className={
                        "h-full w-full object-contain object-center transition-transform duration-700 ease-out " +
                        (showcase[0].zoom25
                          ? "scale-[1.25] hover:scale-[1.31] origin-center"
                          : "scale-[1.02] hover:scale-[1.06]")
                      }
                    />
                  ) : null}
                </div>
              </div>
              {/* 下方小缩略图：5 张并排，画报感 */}
              {showcase.length > 1 ? (
                <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
                  {showcase.slice(1, 6).map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-card border border-line bg-white p-2 sm:p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)]"
                    >
                      <div className="aspect-square w-full overflow-hidden bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.src}
                          alt=""
                          loading="lazy"
                          className={
                            "h-full w-full object-contain object-center transition-transform duration-500 ease-out " +
                            (item.zoom25
                              ? "scale-[1.25] origin-center group-hover:scale-[1.32]"
                              : "scale-[1.02] group-hover:scale-[1.08]")
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* 右：引导文案 + CTA */}
            <div className="min-w-0">
              <Kicker>{locale === "ru" ? "Возможности кастомизации" : "Customization scope"}</Kicker>
              <H2 className="mt-3 !tracking-[-0.03em]">
                {locale === "ru"
                  ? "Любая модель — любые параметры. Всё можно изготовить под ваш заказ."
                  : "Every model. Every spec. 100% custom-built to your requirements."}
              </H2>
              <Body className="mt-5 max-w-[62ch] text-ink-muted">
                {locale === "ru"
                  ? "Не имеет значения, нужна ли вам стандартная модификация планетарного редуктора, сварной гидроцилиндр по чертежу или AGV-привод под нестандартные габариты — мы производим любые позиции нашего каталога под требования заказчика. От крепёжных размеров и передаточных чисел до покрытий и маркировки — всё согласуется индивидуально."
                  : "Whether you need a standard planetary reducer variant, a welded hydraulic cylinder from your drawing, or a custom-sized AGV drive unit — every product in our catalogue can be manufactured to your specification. From mounting dimensions and gear ratios to surface treatments and nameplate branding — every detail is configurable."}
              </Body>

              {/* 清单：5 项勾选项，强感知"全部都能" */}
              <ul className="mt-7 space-y-3">
                {(locale === "ru"
                  ? [
                      "Стандартные и нестандартные передаточные числа",
                      "Размеры и схемы креплений по чертежу",
                      "Гидроцилиндры: ход, диаметр, тип крепления",
                      "AGV-редукторы с тормозным валом / без",
                      "Индивидуальная маркировка и упаковка",
                    ]
                  : [
                      "Standard & custom gear ratios",
                      "Mounting dimensions and interfaces per your drawing",
                      "Hydraulic cylinders: stroke, bore, rod, mounting style",
                      "AGV reducers — with or without brake shaft",
                      "Custom nameplates, finishes and export packaging",
                    ]
                ).map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[0.9375rem] font-medium leading-[1.45] text-ink">{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href={`${navHref("nav_contact")}?from=customization-scope`} size="lg">
                  {locale === "ru" ? "Отправить ТЗ на расчёт" : "Send your specs for a quote"}
                </CTA>
                <CTA href={telHref} variant="secondary" size="lg">
                  {phone}
                </CTA>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============== OEM定制询盘表单（前期深度排查缺表单 → 补上） ============== */}
      <section id="inquiry-form" className="bg-canvas py-[clamp(3rem,6vw,5rem)] scroll-mt-24">
        <Container className="max-w-5xl mx-auto">
          <div className="mb-6 md:mb-8 text-center">
            <Kicker>{locale === "ru" ? "Запрос на производство" : "Custom manufacturing inquiry"}</Kicker>
            <H2 className="mt-3">
              {locale === "ru" ? "Опишите ваш заказ — мы подготовим коммерческое предложение" : "Tell us about your project — we'll prepare a custom quote"}
            </H2>
          </div>
          <InquiryForm
            locale={locale}
            phone={phone}
            productOptions={[
              ...getFamilies().map((f: ProductFamily) => ({
                value: f.slug,
                label: (locale === "ru" ? f.nameRu : f.nameEn) ?? f.slug,
              })),
              { value: "hydraulic", label: locale === "ru" ? "Гидроцилиндры" : "Hydraulic cylinders" },
              { value: "other", label: locale === "ru" ? "Другое / по чертежу" : "Other / drawing-based" },
            ]}
          />
        </Container>
      </section>

      {/* CTA: 联系 */}
      <section className="bg-dark text-dark-text">
        <Container className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.15] text-dark-text">
              {navLabel("nav_contact")}
            </h2>
            <p className="mt-3 text-dark-muted">{localized(locale, "P01-C01")}</p>
            <p className="mt-2 font-mono text-[0.9375rem] text-dark-text">{phone}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTA href={telHref} variant="dark" size="lg">
              {phone}
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
