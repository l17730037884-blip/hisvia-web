import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CTA } from "@/components/ui/cta";
import { Kicker, H1, H2, Body } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { InquiryForm } from "@/components/visual/inquiry-form";
import { getNavItems } from "@/lib/nav";
import { getFamilies, familyName as familyDisplayName } from "@/lib/families";
import { localized } from "@/lib/content";
import { pageTitle, pageDescription, languageAlternates, canonicalUrl } from "@/lib/seo";
import { resolveLocale, ogLocale, type Locale } from "@/lib/locale";
import { BRAND, SITE_URL } from "@/lib/site";

/** 联系页本地化文案(9 种语言)。 */
const CONTACT_NAME: Record<Locale, string> = {
  "zh-CN": "联系我们", en: "Contact", ru: "Контакты", tr: "İletişim", es: "Contacto",
  ar: "اتصل بنا", de: "Kontakt", fr: "Contact", pl: "Kontakt",
};
const CONTACT_INFO_TEXT: Record<Locale, string> = {
  "zh-CN": "联系信息", en: "Contact information", ru: "Контактная информация",
  tr: "İletişim bilgileri", es: "Información de contacto", ar: "معلومات الاتصال",
  de: "Kontaktinformationen", fr: "Coordonnées", pl: "Informacje kontaktowe",
};
const COMPANY_TEXT: Record<Locale, string> = {
  "zh-CN": "公司", en: "Company", ru: "Компания", tr: "Şirket", es: "Empresa",
  ar: "الشركة", de: "Unternehmen", fr: "Société", pl: "Firma",
};
const ADDRESS_TEXT: Record<Locale, string> = {
  "zh-CN": "地址", en: "Address", ru: "Адрес", tr: "Adres", es: "Dirección",
  ar: "العنوان", de: "Adresse", fr: "Adresse", pl: "Adres",
};
const PHONE_TEXT: Record<Locale, string> = {
  "zh-CN": "电话", en: "Phone", ru: "Телефон", tr: "Telefon", es: "Teléfono",
  ar: "الهاتف", de: "Telefon", fr: "Téléphone", pl: "Telefon",
};
const POSTAL_TEXT: Record<Locale, string> = {
  "zh-CN": "邮编", en: "Postal code", ru: "Почтовый индекс", tr: "Posta kodu",
  es: "Código postal", ar: "الرمز البريدي", de: "Postleitzahl", fr: "Code postal", pl: "Kod pocztowy",
};

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = CONTACT_NAME[locale];
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, "Contact"),
    alternates: languageAlternates(locale, "/contact"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, "Contact"),
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navHref = (key: string) => nav.find((n) => n.key === key)?.href ?? `/${locale}/`;
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const phone = localized(locale, "P01-C02");
  const address = localized(locale, "P01-C01");
  const postal = localized(locale, "P01-C03");
  const company = localized(locale, "P01-H01");
  const homeLabel = navLabel("nav_home");
  const contactLabel = navLabel("nav_contact");
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND[locale],
    telephone: phone,
    address,
    postalCode: postal,
    contactPoint: { "@type": "ContactPoint", telephone: phone },
  };
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_URL}/${locale}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: contactLabel,
        item: canonicalUrl(locale, "/contact"),
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

      {/* Hero: 窄幅, 浅底, 内容居中 */}
      <section className="border-b border-line bg-surface">
        <Container className="py-[clamp(3rem,6vw,5rem)]">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumb
                items={[
                  { label: homeLabel, href: `/${locale}/` },
                  { label: contactLabel },
                ]}
              />
            </div>
            <Kicker className="mt-6">{company}</Kicker>
            <H1 className="mt-3">{contactLabel}</H1>
          </div>
        </Container>
      </section>

      {/* 主体: 左联系信息 / 右询盘表单 */}
      <section className="bg-canvas py-[clamp(3rem,6vw,5rem)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
            {/* 左: 联系信息 */}
            <div>
              <H2 className="!text-[clamp(1.25rem,2vw,1.5rem)] !font-semibold">
                {CONTACT_INFO_TEXT[locale]}
              </H2>
              <address className="not-italic">
                <ul className="mt-5 divide-y divide-line rounded-card border border-line bg-surface">
                  <li className="p-5">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                      {COMPANY_TEXT[locale]}
                    </p>
                    <p className="mt-1 font-display text-[1.0625rem] font-semibold text-ink">{company}</p>
                  </li>
                  <li className="p-5">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                      {ADDRESS_TEXT[locale]}
                    </p>
                    <Body className="mt-1 !text-[0.9375rem] !leading-[1.55] text-ink">{address}</Body>
                  </li>
                  <li className="p-5">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                      {PHONE_TEXT[locale]}
                    </p>
                    <a
                      href={telHref}
                      className="mt-1 inline-flex min-h-9 items-center font-mono text-[1.0625rem] font-medium tabular-nums text-accent-strong hover:text-accent"
                    >
                      {phone}
                    </a>
                  </li>
                  <li className="p-5">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                      {POSTAL_TEXT[locale]}
                    </p>
                    <p className="mt-1 font-mono text-[0.9375rem] tabular-nums text-ink-muted">{postal}</p>
                  </li>
                </ul>
              </address>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <CTA href={telHref} size="lg" className="w-full justify-center sm:w-auto">
                  {phone}
                </CTA>
                <CTA
                  href={navHref("nav_customization")}
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center sm:w-auto"
                >
                  {navLabel("nav_customization")}
                </CTA>
              </div>
            </div>

            {/* 右: 询盘表单 */}
            <InquiryForm
              locale={locale}
              phone={phone}
              productOptions={getFamilies().map((f) => ({
                value: f.slug,
                label: familyDisplayName(locale, f) || f.slug,
              }))}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
