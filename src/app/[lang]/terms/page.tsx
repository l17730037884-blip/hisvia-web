import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { H1, Body, Kicker } from "@/components/ui/typography";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getNavItems } from "@/lib/nav";
import { localized } from "@/lib/content";
import { pageTitle, pageDescription, languageAlternates } from "@/lib/seo";
import { resolveLocale, ogLocale, type Locale } from "@/lib/locale";

async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  return resolveLocale(lang);
}

type Section = { h: string; p: string };

const PAGE_NAME: Record<Locale, string> = {
  "zh-CN": "服务条款", en: "Terms of Service", ru: "Условия использования",
  tr: "Kullanım Şartları", es: "Términos de servicio", ar: "شروط الخدمة",
  de: "Nutzungsbedingungen", fr: "Conditions d'utilisation", pl: "Regulamin uslug",
};

const SECTIONS: Record<Locale, Section[]> = {
  "zh-CN": [
    { h: "网站使用", p: "本网站为信息性质,提供公司产品和服务的相关信息。使用本网站即表示您同意遵守适用法律,未经权利人书面同意,不得将网站材料用于商业目的。" },
    { h: "知识产权", p: "本网站所有文字、图形及其他材料均受版权保护。未经许可,禁止复制或传播本网站材料。" },
    { h: "免责声明", p: "本网站信息按\"原样\"提供。本公司不保证网站无错误或持续可用。产品规格可能更新;以订单时的规格为准。" },
    { h: "适用法律", p: "本网站的使用和询价处理受公司注册国法律管辖。一切争议依适用法律解决。" },
  ],
  en: [
    { h: "Use of the site", p: "This site is informational and provides details about the company's products and services. By using the site you agree to comply with applicable law and not to use the site's materials for commercial purposes without the rights holder's written consent." },
    { h: "Intellectual property", p: "All text, graphic, and other materials on the site are protected by copyright. Reproduction or distribution of materials without permission is prohibited." },
    { h: "Disclaimer of warranties", p: "Information on the site is provided “as is.” The company does not warrant freedom from errors or continuous availability of the site. Product specifications may be updated; the authoritative version is confirmed at the time of order." },
    { h: "Governing law", p: "Use of the site and processing of inquiries are governed by the laws of the company's country of registration. Any disputes are resolved in accordance with the applicable law." },
  ],
  ru: [
    { h: "Использование сайта", p: "Данный сайт носит информационный характер и предоставляет сведения о продукции и услугах компании. Пользуясь сайтом, вы соглашаетесь соблюдать применимое законодательство и не использовать материалы сайта в коммерческих целях без письменного согласия правообладателя." },
    { h: "Интеллектуальная собственность", p: "Все текстовые, графические и иные материалы сайта защищены авторским правом. Воспроизведение или распространение материалов без разрешения запрещено." },
    { h: "Отказ от гарантий", p: "Информация на сайте предоставляется «как есть». Компания не гарантирует отсутствие ошибок или непрерывную доступность сайта. Технические характеристики продукции могут уточняться; подтверждение — в спецификации на момент заказа." },
    { h: "Применимое право", p: "Использование сайта и обработка запросов регулируются законодательством страны регистрации компании. Все споры разрешаются в соответствии с применимым правом." },
  ],
  tr: [
    { h: "Site kullanımı", p: "Bu site bilgilendirme amaçlıdır ve şirketin ürün ve hizmetleriyle ilgili bilgiler sunar. Siteyi kullanarak, yürürlükteki yasalara uymayı ve hak sahibinin yazılı izni olmadan site materyallerini ticari amaçlarla kullanmamayı kabul edersiniz." },
    { h: "Fikri mülkiyet", p: "Sitedeki tüm metin, grafik ve diğer materyaller telif hakkı ile korunmaktadır. İzinsiz materyallerin çoğaltılması veya dağıtılması yasaktır." },
    { h: "Garanti reddi", p: "Sitedeki bilgiler «olduğu gibi» sunulur. Şirket, sitenin hatasız veya kesintisiz erişilebilir olduğunu garanti etmez. Ürün teknik özellikleri güncellenebilir; yetkili sürüm sipariş anında doğrulanır." },
    { h: "Uygulanacak hukuk", p: "Site kullanımı ve taleplerin işlenmesi, şirketin tescil olduğu ülkenin yasalarına tabidir. Uyuşmazlıklar uygulanabilir hukuka göre çözülür." },
  ],
  es: [
    { h: "Uso del sitio", p: "Este sitio es informativo y proporciona detalles sobre los productos y servicios de la empresa. Al usar el sitio, usted acepta cumplir con la legislación aplicable y no utilizar los materiales del sitio con fines comerciales sin el consentimiento escrito del titular de los derechos." },
    { h: "Propiedad intelectual", p: "Todos los textos, gráficos y demás materiales del sitio están protegidos por derechos de autor. Se prohíbe la reproducción o distribución de los materiales sin autorización." },
    { h: "Exención de garantías", p: "La información del sitio se proporciona «tal cual». La empresa no garantiza la ausencia de errores ni la disponibilidad continua del sitio. Las especificaciones de los productos pueden actualizarse; la versión autorizada se confirma en el momento del pedido." },
    { h: "Legislación aplicable", p: "El uso del sitio y el procesamiento de consultas se rigen por las leyes del país de registro de la empresa. Las disputas se resuelven conforme a la legislación aplicable." },
  ],
  ar: [
    { h: "استخدام الموقع", p: "هذا الموقع إعلامي ويقدم تفاصيل عن منتجات وخدمات الشركة. باستخدامك للموقع فإنك توافق على الالتزام بالقوانين المعمول بها وعدم استخدام مواد الموقع لأغراض تجارية دون موافقة كتابية من صاحب الحق." },
    { h: "الملكية الفكرية", p: "جميع النصوص والرسومات والمواد الأخرى على الموقع محمية بحقوق التأليف. يُحظر نسخ أو توزيع المواد دون إذن." },
    { h: "إخلاء المسؤولية عن الضمانات", p: "تُقدّم المعلومات على الموقع «كما هي». لا تضمن الشركة خلو الموقع من الأخطاء أو توفره بشكل مستمر. قد تُحدّث مواصفات المنتجات؛ النسخة المعتمدة تُؤكد عند الطلب." },
    { h: "القانون المطبّق", p: "يخضع استخدام الموقع ومعالجة الاستفسارات لقوانين بلد تسجيل الشركة. تُحل النزاعات وفق القانون المطبّق." },
  ],
  de: [
    { h: "Nutzung der Website", p: "Diese Website dient Informationszwecken und bietet Einzelheiten zu den Produkten und Dienstleistungen des Unternehmens. Mit der Nutzung der Website stimmen Sie der Einhaltung der geltenden Gesetze zu und verpflichten sich, die Materialien der Website nicht ohne schriftliche Zustimmung des Rechteinhabers kommerziell zu nutzen." },
    { h: "Geistiges Eigentum", p: "Alle Texte, Grafiken und sonstigen Materialien auf der Website sind urheberrechtlich geschützt. Die Vervielfältigung oder Verbreitung von Materialien ohne Genehmigung ist untersagt." },
    { h: "Gewährleistungsausschluss", p: "Die Informationen auf der Website werden „wie besehen“ bereitgestellt. Das Unternehmen übernimmt keine Gewähr für Fehlerfreiheit oder ständige Verfügbarkeit der Website. Produktspezifikationen können aktualisiert werden; die verbindliche Fassung wird zum Zeitpunkt der Bestellung bestätigt." },
    { h: "Anwendbares Recht", p: "Die Nutzung der Website und die Bearbeitung von Anfragen unterliegen den Gesetzen des Landes, in dem das Unternehmen registriert ist. Alle Streitigkeiten werden nach dem anwendbaren Recht gelöst." },
  ],
  fr: [
    { h: "Utilisation du site", p: "Ce site est informatif et fournit des détails sur les produits et services de l'entreprise. En utilisant le site, vous acceptez de respecter la législation en vigueur et de ne pas utiliser les matériaux du site à des fins commerciales sans le consentement écrit du titulaire des droits." },
    { h: "Propriété intellectuelle", p: "Tous les textes, graphiques et autres matériaux du site sont protégés par le droit d'auteur. La reproduction ou la distribution des matériaux sans autorisation est interdite." },
    { h: "Exclusion de garanties", p: "Les informations sur le site sont fournies « telles quelles ». L'entreprise ne garantit pas l'absence d'erreurs ou la disponibilité continue du site. Les spécifications des produits peuvent être mises à jour ; la version faisant foi est confirmée au moment de la commande." },
    { h: "Droit applicable", p: "L'utilisation du site et le traitement des demandes sont régis par les lois du pays d'enregistrement de l'entreprise. Tout litige est résolu conformément au droit applicable." },
  ],
  pl: [
    { h: "Korzystanie z witryny", p: "Ta witryna ma charakter informacyjny i dostarcza szczegółowych informacji o produktach i usługach firmy. Korzystając z witryny, wyrażasz zgodę na przestrzeganie obowiązującego prawa i powstrzymujesz się od wykorzystywania materiałów witryny do celów komercyjnych bez pisemnej zgody uprawnionego podmiotu." },
    { h: "Własność intelektualna", p: "Wszystkie teksty, grafiki i inne materiały w witrynie są chronione prawem autorskim. Kopiowanie lub rozpowszechnianie materiałów bez zezwolenia jest zabronione." },
    { h: "Wyłączenie odpowiedzialności", p: "Informacje w witrynie są dostarczane „w stanie, w jakim są”. Firma nie gwarantuje braku błędów ani ciągłej dostępności witryny. Specyfikacje produktów mogą ulec aktualizacji; wiążąca wersja jest potwierdzana w momencie składania zamówienia." },
    { h: "Prawo właściwe", p: "Korzystanie z witryny i przetwarzanie zapytań podlegają prawu kraju rejestracji firmy. Wszelkie spory rozstrzygane są zgodnie z obowiązującym prawem." },
  ],
};

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await getLocale(params);
  const name = PAGE_NAME[locale];
  return {
    title: pageTitle(locale, name),
    description: pageDescription(locale, name),
    alternates: languageAlternates(locale, "/terms"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, name),
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await getLocale(params);
  const nav = getNavItems(locale);
  const navLabel = (key: string) => nav.find((n) => n.key === key)?.label ?? "";
  const company = localized(locale, "P01-H01");
  const sections = SECTIONS[locale];

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="max-w-4xl py-[clamp(3rem,6vw,5rem)]">
          <Breadcrumb
            locale={locale}
            items={[
              { label: navLabel("nav_home"), href: `/${locale}/` },
              { label: PAGE_NAME[locale] },
            ]}
          />
          <div className="mt-8">
            <Kicker className="mb-3">{company}</Kicker>
            <H1>{PAGE_NAME[locale]}</H1>
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
