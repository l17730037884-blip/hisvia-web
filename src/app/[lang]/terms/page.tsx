import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { H1, Body, Kicker } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getNavItems } from "@/lib/nav";
import { localized } from "@/lib/content";
import { pageTitle, pageDescription, languageAlternates } from "@/lib/seo";
import { resolveLocale, type Locale } from "@/lib/locale";

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = locale === "ru" ? "Условия использования" : "Terms of Service";
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, name),
    alternates: languageAlternates(locale, "/terms"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, name),
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const company = localized(locale, "P01-H01");
  const ru = locale === "ru";

  const sections = ru
    ? [
        {
          h: "Использование сайта",
          p: "Данный сайт носит информационный характер и предоставляет сведения о продукции и услугах компании. Пользуясь сайтом, вы соглашаетесь соблюдать применимое законодательство и не использовать материалы сайта в коммерческих целях без письменного согласия правообладателя.",
        },
        {
          h: "Интеллектуальная собственность",
          p: "Все текстовые, графические и иные материалы сайта защищены авторским правом. Воспроизведение или распространение материалов без разрешения запрещено.",
        },
        {
          h: "Отказ от гарантий",
          p: "Информация на сайте предоставляется «как есть». Компания не гарантирует отсутствие ошибок или непрерывную доступность сайта. Технические характеристики продукции могут уточняться; подтверждение — в спецификации на момент заказа.",
        },
        {
          h: "Применимое право",
          p: "Использование сайта и обработка запросов регулируются законодательством страны регистрации компании. Все споры разрешаются в соответствии с применимым правом.",
        },
      ]
    : [
        {
          h: "Use of the site",
          p: "This site is informational and provides details about the company's products and services. By using the site you agree to comply with applicable law and not to use the site's materials for commercial purposes without the rights holder's written consent.",
        },
        {
          h: "Intellectual property",
          p: "All text, graphic, and other materials on the site are protected by copyright. Reproduction or distribution of materials without permission is prohibited.",
        },
        {
          h: "Disclaimer of warranties",
          p: "Information on the site is provided “as is.” The company does not warrant freedom from errors or continuous availability of the site. Product specifications may be updated; the authoritative version is confirmed at the time of order.",
        },
        {
          h: "Governing law",
          p: "Use of the site and processing of inquiries are governed by the laws of the company's country of registration. Any disputes are resolved in accordance with the applicable law.",
        },
      ];

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="max-w-4xl py-[clamp(3rem,6vw,5rem)]">
          <Breadcrumb
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: ru ? "Условия использования" : "Terms of Service" },
            ]}
          />
          <div className="mt-8">
            <Kicker className="mb-3">{company}</Kicker>
            <H1>{ru ? "Условия использования" : "Terms of Service"}</H1>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-[clamp(3rem,6vw,5rem)]">
        <Container className="max-w-4xl">
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-[1.125rem] font-semibold leading-[1.25] tracking-[-0.02em] text-ink md:text-[1.25rem]">
                  {s.h}
                </h2>
                <Body className="mt-2 max-w-[68ch] text-[0.9375rem] leading-[1.7] text-ink-muted">
                  {s.p}
                </Body>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
