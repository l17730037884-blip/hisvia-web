import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Kicker, H2 } from "@/components/ui/typography";
import { Section } from "@/components/visual/section";
import { Intro } from "@/components/visual/intro";
import { TaskGrid, type TaskGridColumn } from "@/components/visual/task-grid";
import { QuickLinks } from "@/components/visual/quick-links";
import { ProductCarousel, type ProductCarouselItem } from "@/components/visual/product-carousel";
import { AutoCollapse } from "@/components/ui/auto-collapse";
import { getNavItems } from "@/lib/nav";
import { localized } from "@/lib/content";
import { getFamilies, familyName as familyDisplayName } from "@/lib/families";
import { getAllProducts, resolveProductImage, productAnchorHref } from "@/lib/products";
import { pageTitle, pageDescription, languageAlternates } from "@/lib/seo";
import { resolveLocale, ogLocale, type Locale } from "@/lib/locale";

/** 首页本地化文案(9 种语言,工业 B2B 语境)。 */
const HOME_NAME: Record<Locale, string> = {
  "zh-CN": "首页", en: "Home", ru: "Главная", tr: "Ana Sayfa", es: "Inicio",
  ar: "الرئيسية", de: "Startseite", fr: "Accueil", pl: "Strona główna",
};
const BROWSE_BY_TASK: Record<Locale, string> = {
  "zh-CN": "按任务浏览", en: "Browse by task", ru: "Подбор по задаче",
  tr: "Göreve göre ara", es: "Buscar por tarea", ar: "تصفح حسب المهمة",
  de: "Nach Aufgabe durchsuchen", fr: "Parcourir par tâche", pl: "Przeglądaj według zadania",
};
const CHOOSE_TASK: Record<Locale, string> = {
  "zh-CN": "选择您的任务", en: "Choose your task", ru: "Выберите свою задачу",
  tr: "Görevinizi seçin", es: "Elija su tarea", ar: "اختر مهمتك",
  de: "Wählen Sie Ihre Aufgabe", fr: "Choisissez votre tâche", pl: "Wybierz swoje zadanie",
};
const ABOUT_KICKER: Record<Locale, string> = {
  "zh-CN": "关于我们", en: "About", ru: "О компании", tr: "Hakkımızda", es: "Acerca de",
  ar: "عن الشركة", de: "Über uns", fr: "À propos", pl: "O firmie",
};
const MANIFESTO: Record<Locale, string> = {
  "zh-CN": "宣言", en: "Manifesto", ru: "Манифест", tr: "Manifesto", es: "Manifiesto",
  ar: "بيان", de: "Manifest", fr: "Manifeste", pl: "Manifest",
};
const VIEW_ALL: Record<Locale, string> = {
  "zh-CN": "全部产品", en: "View all products", ru: "Вся продукция", tr: "Tüm ürünler",
  es: "Ver todos los productos", ar: "عرض جميع المنتجات", de: "Alle Produkte",
  fr: "Voir tous les produits", pl: "Zobacz wszystkie produkty",
};

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = HOME_NAME[locale];
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, name),
    alternates: languageAlternates(locale, "/"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, name),
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";

  const family = getFamilies()[0];
  const familyName = familyDisplayName(locale, family);
  const allProducts = getAllProducts();
  // 首页 8 个产品（含 AGV P06/P07/P08/P09），去掉缺图即可
  const products = allProducts
    .filter((product) => resolveProductImage(product) !== null)
    .slice(0, 8);

  const slides = [
    {
      image: "/assets/hero/1.png",
      title: localized(locale, "P01-H04"),
      text: localized(locale, "P01-S01"),
      href: navHref("nav_products"),
      cta: navLabel("nav_products"),
    },
    {
      image: "/assets/hero/2.png",
      title: localized(locale, "P04-H01"),
      text: localized(locale, "P04-B01"),
      href: navHref("nav_products"),
      cta: navLabel("nav_products"),
    },
    {
      image: "/assets/hero/3.png",
      title: localized(locale, "P04-H02"),
      text: localized(locale, "P04-B03"),
      href: navHref("nav_products"),
      cta: navLabel("nav_products"),
    },
  ];

  const tasksTitle = CHOOSE_TASK[locale];
  const tasks: TaskGridColumn[] = [
    {
      title: navLabel("nav_products"),
      href: navHref("nav_products"),
      tone: "green",
      items: [
        { label: navLabel("nav_applications"), href: navHref("nav_applications") },
        { label: navLabel("nav_certifications"), href: navHref("nav_certifications") },
        { label: familyName || navLabel("nav_products"), href: `/${locale}/products/planetary-reducer` },
      ],
    },
    {
      title: navLabel("nav_technology"),
      href: navHref("nav_technology"),
      tone: "blue",
      items: [
        { label: navLabel("nav_about"), href: navHref("nav_about") },
        { label: familyName || navLabel("nav_products"), href: `/${locale}/products/planetary-reducer` },
        { label: navLabel("nav_certifications"), href: navHref("nav_certifications") },
      ],
    },
    {
      title: navLabel("nav_customization"),
      href: navHref("nav_customization"),
      tone: "red",
      items: [
        { label: navLabel("nav_contact"), href: navHref("nav_contact") },
        { label: localized(locale, "P01-C02"), href: `tel:${localized(locale, "P01-C02").replace(/[^0-9+]/g, "")}` },
      ],
    },
    {
      title: navLabel("nav_contact"),
      href: navHref("nav_contact"),
      tone: "yellow",
      items: [
        { label: navLabel("nav_customization"), href: navHref("nav_customization") },
        { label: localized(locale, "P01-C02"), href: `tel:${localized(locale, "P01-C02").replace(/[^0-9+]/g, "")}` },
      ],
    },
  ];

  const quickLinks = [
    { label: navLabel("nav_products"), href: navHref("nav_products") },
    { label: navLabel("nav_customization"), href: navHref("nav_customization") },
    { label: navLabel("nav_certifications"), href: navHref("nav_certifications") },
    { label: navLabel("nav_contact"), href: navHref("nav_contact") },
  ];

  const ZOOM_25_ASSETS = new Set(["ASSET-05", "ASSET-07", "ASSET-08"]);
  const carouselItems: ProductCarouselItem[] = products
    .filter((product) => resolveProductImage(product))
    .map((product) => ({
      image: resolveProductImage(product)!,
      model: product.model,
      href: productAnchorHref(locale, product),
      zoom25: ZOOM_25_ASSETS.has(product.imageAssetIds?.[0] ?? ""),
    }));

  return (
    <>
      {/* Intro / Hero（真正宽屏：移除 Container，左图右文贴浏览器左右边） */}
      <section className="pt-2 md:pt-3">
        <Intro slides={slides} />
      </section>

      {/* Tasks */}
      <Section tone="stripe" className="pt-4 pb-6 md:pt-10 md:pb-14">
        <Container>
          <Kicker className="mb-1.5 md:mb-2 hoverable-text">{BROWSE_BY_TASK[locale]}</Kicker>
          <H2 className="mb-4 md:mb-6 hoverable-text">{tasksTitle}</H2>
          <TaskGrid columns={tasks} />
        </Container>
      </Section>

      {/* Company capability：editorial-grid + drop-cap（白底）—— 合理留白，不要堆砌 */}
      <Section tone="surface" className="pt-6 pb-10 md:pt-10 md:pb-14">
        <Container>
          <div className="editorial-grid-5-7 gap-8 md:gap-10 lg:gap-12">
            <div className="flex flex-col">
              <Kicker className="mb-2 hoverable-text">{ABOUT_KICKER[locale]}</Kicker>
              <H2 className="!text-[clamp(1.5rem,2.4vw,2rem)] !font-bold !tracking-[-0.03em] hoverable-text">
                {localized(locale, "P03-H01")}
              </H2>
              <p className="mt-4 max-w-[68ch] text-[0.8125rem] font-medium leading-[1.6] tracking-[-0.02em] text-ink md:text-[0.875rem] hoverable-text">
                {localized(locale, "P03-B02")}
              </p>
            </div>
            <div className="text-[0.9375rem] leading-[1.72] text-ink md:text-[1.0625rem]">
              <AutoCollapse lines={4}>
                <p className="drop-cap max-w-[68ch] font-medium leading-[1.72] tracking-[-0.01em] text-ink hoverable-text">
                  {localized(locale, "P03-B03")}
                </p>
              </AutoCollapse>
            </div>
          </div>
        </Container>
      </Section>

      {/* 杂志式宣言：纯黑实底 + 舞台双聚光灯 + 顶部高光描边 = "打光发亮"效果 */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0d] text-dark-text">
        {/* 顶部 1px 白高光描边（上边缘"发亮"） */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
        {/* 底部 1px 白高光描边（下边缘发亮，0.5 透明度比顶部弱） */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
        {/* 左聚光灯：宣言文字左半侧被 accent 光照亮 */}
        <span
          aria-hidden
          className="pointer-events-none absolute -start-24 top-1/2 h-[440px] w-[560px] -translate-y-1/2 rounded-full bg-accent/28 blur-[110px]"
        />
        {/* 右聚光灯：略淡，做不对称舞台光感 */}
        <span
          aria-hidden
          className="pointer-events-none absolute -end-16 top-1/2 h-[360px] w-[440px] -translate-y-1/2 rounded-full bg-accent/18 blur-[100px]"
        />
        {/* 顶部中心白色微高光（天顶弱反光） */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-80px] h-56 w-[720px] -translate-x-1/2 rounded-full bg-white/5 blur-[80px]"
        />
        {/* 中心→边缘 黑渐晕（边缘压黑让中心更亮） */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,rgba(18,18,24,0)_0%,rgba(10,10,13,0.5)_55%,rgba(6,6,8,0.95)_100%)]"
        />
        <Container className="relative py-8 md:py-10 lg:py-12">
          <div className="editorial-grid-5-7 items-center">
            {/* 左：accent 短线 + 标签 */}
            <div className="flex flex-col gap-3">
              <span aria-hidden className="h-px w-12 bg-accent" />
              <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-accent hoverable-text">
                {MANIFESTO[locale]}
              </span>
            </div>
            {/* 右：大字 pull-quote 声明（限 3 行 + hover 整段变亮蓝 accent） */}
            <blockquote className="group relative ps-8 md:ps-10 cursor-default">
              <span
                aria-hidden
                className="absolute start-0 top-[-0.18em] font-display text-[2.75rem] font-bold leading-none text-accent transition-all duration-300 md:text-[4rem] group-hover:text-accent group-hover:drop-shadow-[0_0_18px_rgba(0,120,168,0.6)]"
              >
                {"\u201C"}
              </span>
              <p className="line-clamp-3 font-display text-[clamp(1.0625rem,1.7vw,1.375rem)] font-semibold leading-[1.42] tracking-[-0.02em] text-dark-text transition-all duration-300 text-balance group-hover:text-accent group-hover:drop-shadow-[0_0_24px_rgba(0,120,168,0.35)] hoverable-text">
                {localized(locale, "P03-B05")}
              </p>
            </blockquote>
          </div>
        </Container>
      </section>

      {/* Quick links（全部隐藏：与 hero 下方 Tasks 4 卡片重复，含桌面/移动端） */}
      <Section tone="stripe" className="hidden">
        <Container>
          <QuickLinks items={quickLinks} />
        </Container>
      </Section>

      {/* Products（白底）：4图一组轮播 + 查看更多 */}
      <Section tone="surface" className="pt-6 pb-10 md:pt-10 md:pb-14">
        <Container>
          <div className="mb-5 md:mb-7">
            <Kicker className="mb-2 hoverable-text">{familyName}</Kicker>
            <H2 className="hoverable-text">{navLabel("nav_products")}</H2>
          </div>
          <ProductCarousel items={carouselItems} />
          {/* 查看更多按钮 */}
          <div className="mt-8 flex justify-center md:mt-10">
            <a
              href={navHref("nav_products")}
              className="inline-flex items-center gap-2 rounded-btn border border-line bg-surface px-6 py-3 text-[0.875rem] font-medium leading-none tracking-[-0.01em] text-ink transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              {VIEW_ALL[locale]}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
