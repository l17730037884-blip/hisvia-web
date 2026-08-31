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
  "zh-CN": "隐私政策", en: "Privacy Policy", ru: "Политика конфиденциальности",
  tr: "Gizlilik Politikası", es: "Política de privacidad", ar: "سياسة الخصوصية",
  de: "Datenschutzerklärung", fr: "Politique de confidentialité", pl: "Polityka prywatności",
};

const SECTIONS: Record<Locale, Section[]> = {
  "zh-CN": [
    { h: "我们收集的数据", p: "通过本网站的询价表单,我们获取您的姓名、电话、邮箱(可选)、公司名称(可选)、感兴趣的产品和留言内容。我们不会主动索取其他个人数据。" },
    { h: "数据处理目的", p: "您的数据仅用于回复询价、准备商业报价及沟通供货事宜。我们不会以营销目的出售或向第三方转让您的数据。" },
    { h: "存储与安全", p: "数据将保存至处理您的请求所需的时间,并可根据您的要求删除。我们采取合理的技术措施防止未经授权的访问。" },
    { h: "您的权利", p: "您可以通过电话或联系表单联系我们,请求访问、更正或删除您的个人数据。" },
  ],
  en: [
    { h: "Data we collect", p: "Through the inquiry form on this site we receive your name, phone, email (optional), company (optional), product of interest, and message text. We do not actively request other personal data." },
    { h: "Purpose of processing", p: "Your data is used solely to respond to your inquiry, prepare a commercial offer, and communicate regarding deliveries. We do not sell or share your data with third parties for marketing purposes." },
    { h: "Storage and security", p: "Data is retained for as long as necessary to process your request and is deleted upon your request. We apply reasonable technical measures to guard against unauthorized access." },
    { h: "Your rights", p: "You may request access to, correction of, or deletion of your data by contacting us by phone or via the contact form." },
  ],
  ru: [
    { h: "Какие данные мы собираем", p: "Через форму запроса на сайте мы получаем имя, телефон, email (по желанию), название компании (по желанию), интересующий продукт и текст сообщения. Иные персональные данные нами активно не запрашиваются." },
    { h: "Цель обработки", p: "Данные используются исключительно для ответа на ваш запрос, подготовки коммерческого предложения и связи по вопросам поставок. Мы не продаём и не передаём ваши данные третьим лицам в маркетинговых целях." },
    { h: "Хранение и безопасность", p: "Данные хранятся в течение срока, необходимого для обработки обращения, и удаляются по вашему запросу. Мы применяем разумные технические меры защиты от несанкционированного доступа." },
    { h: "Ваши права", p: "Вы можете запросить доступ к своим данным, их исправление или удаление, связавшись с нами по телефону или через форму контактов." },
  ],
  tr: [
    { h: "Topladığımız veriler", p: "Bu sitedeki teklif formu aracılığıyla adınızı, telefonunuzu, e-postanızı (isteğe bağlı), şirket adınızı (isteğe bağlı), ilgilendiğiniz ürünü ve mesaj metnini alıyoruz. Diğer kişisel verileri talep etmiyoruz." },
    { h: "İşleme amaçı", p: "Verileriniz yalnızca talebinizi yanıtlamak, ticari teklif hazırlamak ve teslimatlarla ilgili iletişim kurmak için kullanılır. Verilerinizi pazarlama amacıyla üçüncü taraflara satmıyor veya devretmiyoruz." },
    { h: "Saklama ve güvenlik", p: "Veriler, talebinizin işlenmesi için gereken süre boyunca saklanır ve talebiniz üzerine silinir. Yetkisiz erişime karşı makul teknik önlemler uyguluyoruz." },
    { h: "Haklarınız", p: "Bize telefon veya iletişim formu aracılığıyla ulaşarak verilerinize erişim, düzeltme veya silme talep edebilirsiniz." },
  ],
  es: [
    { h: "Datos que recopilamos", p: "A través del formulario de consulta de este sitio recibimos su nombre, teléfono, correo electrónico (opcional), empresa (opcional), producto de interés y texto del mensaje. No solicitamos activamente otros datos personales." },
    { h: "Finalidad del tratamiento", p: "Sus datos se utilizan únicamente para responder a su consulta, preparar una oferta comercial y comunicarnos sobre las entregas. No vendemos ni cedemos sus datos a terceros con fines de marketing." },
    { h: "Almacenamiento y seguridad", p: "Los datos se conservan durante el tiempo necesario para procesar su solicitud y se eliminan a petición suya. Aplicamos medidas técnicas razonables para proteger contra el acceso no autorizado." },
    { h: "Sus derechos", p: "Puede solicitar el acceso, la rectificación o la supresión de sus datos poniéndose en contacto con nosotros por teléfono o mediante el formulario de contacto." },
  ],
  ar: [
    { h: "البيانات التي نجمعها", p: "عبر نموذج الاستفسار في هذا الموقع نستقبل اسمك ورقم هاتفك وبريدك الإلكتروني (اختياري) واسم شركتك (اختياري) والمنتج الذي يهمك ونص الرسالة. لا نطلب بيانات شخصية أخرى بشكل نشط." },
    { h: "الغرض من المعالجة", p: "تُستخدم بياناتك فقط للرد على استفسارك وإعداد عرض تجاري والتواصل بشأن التوريدات. لا نبيع بياناتك ولا نشاركها مع أطراف ثالثة لأغراض تسويقية." },
    { h: "التخزين والأمان", p: "تُحفظ البيانات للمدة اللازمة لمعالجة طلبك وتُحذف بناءً على طلبك. نطبق تدابير تقنية معقولة للحماية من الوصول غير المصرّح به." },
    { h: "حقوقك", p: "يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها بالتواصل معنا هاتفيًا أو عبر نموذج الاتصال." },
  ],
  de: [
    { h: "Erhobene Daten", p: "Über das Anfrageformular auf dieser Website erfassen wir Ihren Namen, Ihre Telefonnummer, Ihre E-Mail-Adresse (optional), Ihren Unternehmensnamen (optional), das interessierende Produkt sowie Ihren Nachrichtentext. Weitere personenbezogene Daten fordern wir nicht aktiv an." },
    { h: "Verarbeitungszweck", p: "Ihre Daten werden ausschließlich zur Beantwortung Ihrer Anfrage, zur Erstellung eines kommerziellen Angebots und zur Kommunikation über Lieferungen verwendet. Wir verkaufen oder teilen Ihre Daten nicht zu Marketingzwecken mit Dritten." },
    { h: "Speicherung und Sicherheit", p: "Die Daten werden so lange gespeichert, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist, und werden auf Wunsch gelöscht. Wir ergreifen angemessene technische Maßnahmen gegen unbefugten Zugriff." },
    { h: "Ihre Rechte", p: "Sie können Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen, indem Sie uns telefonisch oder über das Kontaktformular erreichen." },
  ],
  fr: [
    { h: "Données collectées", p: "Via le formulaire de demande sur ce site, nous recevons votre nom, téléphone, e-mail (facultatif), entreprise (facultatif), produit d'intérêt et texte du message. Nous ne demandons pas activement d'autres données personnelles." },
    { h: "Finalité du traitement", p: "Vos données sont utilisées uniquement pour répondre à votre demande, préparer une offre commerciale et communiquer concernant les livraisons. Nous ne vendons ni ne partageons vos données avec des tiers à des fins de marketing." },
    { h: "Stockage et sécurité", p: "Les données sont conservées aussi longtemps que nécessaire pour traiter votre demande et supprimées à votre demande. Nous appliquons des mesures techniques raisonnables pour protéger contre tout accès non autorisé." },
    { h: "Vos droits", p: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous contactant par téléphone ou via le formulaire de contact." },
  ],
  pl: [
    { h: "Dane, które gromadzimy", p: "Poprzez formularz zapytania na tej stronie otrzymujemy Twoje imię i nazwisko, telefon, e-mail (opcjonalnie), nazwę firmy (opcjonalnie), produkt będący przedmiotem zainteresowania oraz treść wiadomości. Nie prosimy aktywnie o inne dane osobowe." },
    { h: "Cel przetwarzania", p: "Twoje dane są wykorzystywane wyłącznie do udzielenia odpowiedzi na zapytanie, przygotowania oferty handlowej i komunikacji w sprawie dostaw. Nie sprzedajemy ani nie udostępniamy Twoich danych podmiotom trzecim w celach marketingowych." },
    { h: "Przechowywanie i bezpieczeństwo", p: "Dane są przechowywane przez czas niezbędny do przetworzenia Twojego wniosku i usuwane na Twoje życzenie. Stosujemy rozsądne środki techniczne chroniące przed nieautoryzowanym dostępem." },
    { h: "Twoje prawa", p: "Możesz wystąpić o dostęp do swoich danych, ich sprostowanie lub usunięcie, kontaktując się z nami telefonicznie lub przez formularz kontaktowy." },
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
    alternates: languageAlternates(locale, "/privacy"),
    openGraph: {
      title: pageTitle(locale, name),
      description: pageDescription(locale, name),
      locale: ogLocale(locale),
      type: "website",
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
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
