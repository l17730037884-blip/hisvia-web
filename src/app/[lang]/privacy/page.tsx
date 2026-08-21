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
  const name = locale === "ru" ? "Политика конфиденциальности" : "Privacy Policy";
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, name),
    alternates: languageAlternates(locale, "/privacy"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, name),
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const company = localized(locale, "P01-H01");
  const ru = locale === "ru";

  const sections = ru
    ? [
        {
          h: "Какие данные мы собираем",
          p: "Через форму запроса на сайте мы получаем имя, телефон, email (по желанию), название компании (по желанию), интересующий продукт и текст сообщения. Иные персональные данные нами активно не запрашиваются.",
        },
        {
          h: "Цель обработки",
          p: "Данные используются исключительно для ответа на ваш запрос, подготовки коммерческого предложения и связи по вопросам поставок. Мы не продаём и не передаём ваши данные третьим лицам в маркетинговых целях.",
        },
        {
          h: "Хранение и безопасность",
          p: "Данные хранятся в течение срока, необходимого для обработки обращения, и удаляются по вашему запросу. Мы применяем разумные технические меры защиты от несанкционированного доступа.",
        },
        {
          h: "Ваши права",
          p: "Вы можете запросить доступ к своим данным, их исправление или удаление, связавшись с нами по телефону или через форму контактов.",
        },
      ]
    : [
        {
          h: "Data we collect",
          p: "Through the inquiry form on this site we receive your name, phone, email (optional), company (optional), product of interest, and message text. We do not actively request other personal data.",
        },
        {
          h: "Purpose of processing",
          p: "Your data is used solely to respond to your inquiry, prepare a commercial offer, and communicate regarding deliveries. We do not sell or share your data with third parties for marketing purposes.",
        },
        {
          h: "Storage and security",
          p: "Data is retained for as long as necessary to process your request and is deleted upon your request. We apply reasonable technical measures to guard against unauthorized access.",
        },
        {
          h: "Your rights",
          p: "You may request access to, correction of, or deletion of your data by contacting us by phone or via the contact form.",
        },
      ];

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="max-w-4xl py-[clamp(3rem,6vw,5rem)]">
          <Breadcrumb
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: ru ? "Политика конфиденциальности" : "Privacy Policy" },
            ]}
          />
          <div className="mt-8">
            <Kicker className="mb-3">{company}</Kicker>
            <H1>{ru ? "Политика конфиденциальности" : "Privacy Policy"}</H1>
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
