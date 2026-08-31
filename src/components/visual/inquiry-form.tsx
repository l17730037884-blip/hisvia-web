"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locale";

type InquiryFormProps = {
  locale: Locale;
  phone: string;
  email?: string;
  productOptions?: { value: string; label: string }[];
};

type StringShape = {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  companyPlaceholder: string;
  product: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  successSubmitted: string;
  successMailto: string;
  successHint: string;
  required: string;
  callInstead: string;
};

const STRINGS: Record<Locale, StringShape> = {
  "zh-CN": {
    title: "发送询盘",
    subtitle: "填写表单,我们将在 1 个工作日内回复您。",
    name: "您的姓名",
    namePlaceholder: "张三",
    phone: "电话",
    phonePlaceholder: "+86 138 0000 0000",
    email: "邮箱(选填)",
    emailPlaceholder: "you@company.com",
    company: "公司(选填)",
    companyPlaceholder: "公司名称",
    product: "感兴趣的产品(选填)",
    message: "留言",
    messagePlaceholder: "请描述您的需求、数量、交期...",
    submit: "发送询盘",
    submitting: "发送中...",
    success: "感谢!您的询盘已收到。",
    successSubmitted: "感谢!您的询盘已收到。",
    successMailto: "询盘已在您的邮箱客户端打开。",
    successHint: "如有问题,请直接电话联系我们。",
    required: "必填",
    callInstead: "更希望电话联系?",
  },
  en: {
    title: "Send an inquiry",
    subtitle: "Fill out the form and we'll get back to you within 1 business day.",
    name: "Your name",
    namePlaceholder: "John Doe",
    phone: "Phone",
    phonePlaceholder: "+1 555 123 4567",
    email: "Email (optional)",
    emailPlaceholder: "you@company.com",
    company: "Company (optional)",
    companyPlaceholder: "Company name",
    product: "Product of interest (optional)",
    message: "Message",
    messagePlaceholder: "Describe your requirements, quantities, delivery deadlines…",
    submit: "Send inquiry",
    submitting: "Sending…",
    success: "Thank you! Your inquiry has been received.",
    successSubmitted: "Thank you! Your inquiry has been received.",
    successMailto: "Your inquiry has been opened in your email client.",
    successHint: "If anything comes up, please call us directly.",
    required: "Required",
    callInstead: "Prefer to call?",
  },
  ru: {
    title: "Отправить запрос",
    subtitle: "Заполните форму, и мы ответим в течение одного рабочего дня.",
    name: "Ваше имя",
    namePlaceholder: "Иван Иванов",
    phone: "Телефон",
    phonePlaceholder: "+7 555 123 4567",
    email: "Email (необязательно)",
    emailPlaceholder: "you@company.ru",
    company: "Компания (необязательно)",
    companyPlaceholder: "Название компании",
    product: "Интересующий продукт (необязательно)",
    message: "Сообщение",
    messagePlaceholder: "Опишите ваши требования, объёмы, сроки поставки…",
    submit: "Отправить запрос",
    submitting: "Отправка…",
    success: "Спасибо! Ваш запрос получен.",
    successSubmitted: "Спасибо! Ваш запрос получен.",
    successMailto: "Ваш запрос открыт в почтовом клиенте.",
    successHint: "Если что-то пойдёт не так, звоните нам напрямую.",
    required: "Обязательно",
    callInstead: "Предпочитаете позвонить?",
  },
  tr: {
    title: "Teklif gönderin",
    subtitle: "Formu doldurun, 1 iş günü içinde size geri dönelim.",
    name: "Adınız",
    namePlaceholder: "Ahmet Yılmaz",
    phone: "Telefon",
    phonePlaceholder: "+90 532 123 45 67",
    email: "E-posta (opsiyonel)",
    emailPlaceholder: "you@company.com",
    company: "Şirket (opsiyonel)",
    companyPlaceholder: "Şirket adı",
    product: "İlgilendiğiniz ürün (opsiyonel)",
    message: "Mesaj",
    messagePlaceholder: "İhtiyaçlarınızı, miktarı, teslim süresini belirtin...",
    submit: "Teklif gönderin",
    submitting: "Gönderiliyor...",
    success: "Teşekkürler! Talebiniz alındı.",
    successSubmitted: "Teşekkürler! Talebiniz alındı.",
    successMailto: "Talebiniz e-posta istemcinizde açıldı.",
    successHint: "Bir sorun olursa, lütfen bizi doğrudan arayın.",
    required: "Zorunlu",
    callInstead: "Telefonla görüşmeyi mi tercih edersiniz?",
  },
  es: {
    title: "Enviar consulta",
    subtitle: "Rellene el formulario y le responderemos en 1 día laborable.",
    name: "Su nombre",
    namePlaceholder: "Juan García",
    phone: "Teléfono",
    phonePlaceholder: "+34 600 123 456",
    email: "Correo electrónico (opcional)",
    emailPlaceholder: "you@company.com",
    company: "Empresa (opcional)",
    companyPlaceholder: "Nombre de la empresa",
    product: "Producto de interés (opcional)",
    message: "Mensaje",
    messagePlaceholder: "Describa sus necesidades, cantidades, plazos de entrega...",
    submit: "Enviar consulta",
    submitting: "Enviando...",
    success: "¡Gracias! Su consulta se ha recibido.",
    successSubmitted: "¡Gracias! Su consulta se ha recibido.",
    successMailto: "Su consulta se ha abierto en su cliente de correo.",
    successHint: "Si surge algún problema, llámenos directamente.",
    required: "Obligatorio",
    callInstead: "¿Prefiere llamar?",
  },
  ar: {
    title: "إرسال استفسار",
    subtitle: "املأ النموذج وسنرد عليك خلال يوم عمل واحد.",
    name: "الاسم",
    namePlaceholder: "محمد العلي",
    phone: "الهاتف",
    phonePlaceholder: "+971 50 123 4567",
    email: "البريد الإلكتروني (اختياري)",
    emailPlaceholder: "you@company.com",
    company: "الشركة (اختياري)",
    companyPlaceholder: "اسم الشركة",
    product: "المنتج المرغوب (اختياري)",
    message: "الرسالة",
    messagePlaceholder: "يرجى وصف احتياجاتكم والكميات ومواعيد التسليم...",
    submit: "إرسال استفسار",
    submitting: "جارٍ الإرسال...",
    success: "شكراً! تم استلام استفساركم.",
    successSubmitted: "شكراً! تم استلام استفساركم.",
    successMailto: "تم فتح استفساركم في برنامج البريد الإلكتروني لديك.",
    successHint: "في حال وجود أي مشكلة، يرجى الاتصال بنا مباشرة.",
    required: "مطلوب",
    callInstead: "تفضل الاتصال هاتفياً؟",
  },
  de: {
    title: "Anfrage senden",
    subtitle: "Füllen Sie das Formular aus – wir melden uns innerhalb eines Werktages.",
    name: "Ihr Name",
    namePlaceholder: "Max Mustermann",
    phone: "Telefon",
    phonePlaceholder: "+49 30 1234 5678",
    email: "E-Mail (optional)",
    emailPlaceholder: "you@company.com",
    company: "Firma (optional)",
    companyPlaceholder: "Firmenname",
    product: "Interessierendes Produkt (optional)",
    message: "Nachricht",
    messagePlaceholder: "Beschreiben Sie Ihre Anforderungen, Mengen, Lieferzeiten...",
    submit: "Anfrage senden",
    submitting: "Senden...",
    success: "Danke! Ihre Anfrage ist eingegangen.",
    successSubmitted: "Danke! Ihre Anfrage ist eingegangen.",
    successMailto: "Ihre Anfrage wurde in Ihrem E-Mail-Programm geöffnet.",
    successHint: "Sollte etwas nicht klappen, rufen Sie uns direkt an.",
    required: "Pflichtfeld",
    callInstead: "Lieber anrufen?",
  },
  fr: {
    title: "Envoyer une demande",
    subtitle: "Remplissez le formulaire et nous vous répondrons sous 1 jour ouvré.",
    name: "Votre nom",
    namePlaceholder: "Jean Dupont",
    phone: "Téléphone",
    phonePlaceholder: "+33 1 23 45 67 89",
    email: "E-mail (facultatif)",
    emailPlaceholder: "you@company.com",
    company: "Société (facultatif)",
    companyPlaceholder: "Nom de la société",
    product: "Produit d'intérêt (facultatif)",
    message: "Message",
    messagePlaceholder: "Décrivez vos besoins, quantités, délais de livraison...",
    submit: "Envoyer la demande",
    submitting: "Envoi...",
    success: "Merci ! Votre demande a bien été reçue.",
    successSubmitted: "Merci ! Votre demande a bien été reçue.",
    successMailto: "Votre demande a été ouverte dans votre client de messagerie.",
    successHint: "En cas de problème, appelez-nous directement.",
    required: "Requis",
    callInstead: "Préférez-vous appeler ?",
  },
  pl: {
    title: "Wyślij zapytanie",
    subtitle: "Wypełnij formularz, a my odpowiemy w ciągu 1 dnia roboczego.",
    name: "Twoje imię",
    namePlaceholder: "Jan Kowalski",
    phone: "Telefon",
    phonePlaceholder: "+48 22 123 45 67",
    email: "E-mail (opcjonalnie)",
    emailPlaceholder: "you@company.com",
    company: "Firma (opcjonalnie)",
    companyPlaceholder: "Nazwa firmy",
    product: "Interesujący produkt (opcjonalnie)",
    message: "Wiadomość",
    messagePlaceholder: "Opisz swoje potrzeby, ilości, terminy dostawy...",
    submit: "Wyślij zapytanie",
    submitting: "Wysyłanie...",
    success: "Dziękujemy! Twoje zapytanie zostało przyjęte.",
    successSubmitted: "Dziękujemy! Twoje zapytanie zostało przyjęte.",
    successMailto: "Twoje zapytanie zostało otwarte w programie pocztowym.",
    successHint: "W razie problemów, zadzwoń do nas bezpośrednio.",
    required: "Wymagane",
    callInstead: "Wolisz zadzwonić?",
  },
};

type ErrorsShape = {
  nameRequired: string;
  nameShort: string;
  phoneRequired: string;
  phoneInvalid: string;
  emailInvalid: string;
  messageRequired: string;
  messageShort: string;
};

const ERRORS: Record<Locale, ErrorsShape> = {
  "zh-CN": {
    nameRequired: "请输入您的姓名",
    nameShort: "姓名过短",
    phoneRequired: "请输入电话号码",
    phoneInvalid: "电话号码无效",
    emailInvalid: "邮箱无效",
    messageRequired: "请输入留言",
    messageShort: "留言过短",
  },
  en: {
    nameRequired: "Please enter your name",
    nameShort: "Name is too short",
    phoneRequired: "Please enter a phone number",
    phoneInvalid: "Please enter a valid phone",
    emailInvalid: "Please enter a valid email",
    messageRequired: "Please enter a message",
    messageShort: "Message is too short",
  },
  ru: {
    nameRequired: "Введите ваше имя",
    nameShort: "Слишком короткое имя",
    phoneRequired: "Введите номер телефона",
    phoneInvalid: "Некорректный номер телефона",
    emailInvalid: "Некорректный email",
    messageRequired: "Введите сообщение",
    messageShort: "Сообщение слишком короткое",
  },
  tr: {
    nameRequired: "Lütfen adınızı girin",
    nameShort: "İsim çok kısa",
    phoneRequired: "Lütfen bir telefon numarası girin",
    phoneInvalid: "Lütfen geçerli bir telefon numarası girin",
    emailInvalid: "Lütfen geçerli bir e-posta adresi girin",
    messageRequired: "Lütfen bir mesaj girin",
    messageShort: "Mesaj çok kısa",
  },
  es: {
    nameRequired: "Por favor, introduzca su nombre",
    nameShort: "El nombre es demasiado corto",
    phoneRequired: "Por favor, introduzca un número de teléfono",
    phoneInvalid: "Por favor, introduzca un teléfono válido",
    emailInvalid: "Por favor, introduzca un correo electrónico válido",
    messageRequired: "Por favor, introduzca un mensaje",
    messageShort: "El mensaje es demasiado corto",
  },
  ar: {
    nameRequired: "يرجى إدخال اسمك",
    nameShort: "الاسم قصير جداً",
    phoneRequired: "يرجى إدخال رقم الهاتف",
    phoneInvalid: "يرجى إدخال رقم هاتف صالح",
    emailInvalid: "يرجى إدخال بريد إلكتروني صالح",
    messageRequired: "يرجى إدخال رسالة",
    messageShort: "الرسالة قصيرة جداً",
  },
  de: {
    nameRequired: "Bitte geben Sie Ihren Namen ein",
    nameShort: "Der Name ist zu kurz",
    phoneRequired: "Bitte geben Sie eine Telefonnummer ein",
    phoneInvalid: "Bitte geben Sie eine gültige Telefonnummer ein",
    emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    messageRequired: "Bitte geben Sie eine Nachricht ein",
    messageShort: "Die Nachricht ist zu kurz",
  },
  fr: {
    nameRequired: "Veuillez saisir votre nom",
    nameShort: "Le nom est trop court",
    phoneRequired: "Veuillez saisir un numéro de téléphone",
    phoneInvalid: "Veuillez saisir un numéro de téléphone valide",
    emailInvalid: "Veuillez saisir une adresse e-mail valide",
    messageRequired: "Veuillez saisir un message",
    messageShort: "Le message est trop court",
  },
  pl: {
    nameRequired: "Proszę podać imię",
    nameShort: "Imię jest za krótkie",
    phoneRequired: "Proszę podać numer telefonu",
    phoneInvalid: "Proszę podać prawidłowy numer telefonu",
    emailInvalid: "Proszę podać prawidłowy adres e-mail",
    messageRequired: "Proszę wpisać wiadomość",
    messageShort: "Wiadomość jest za krótka",
  },
};

const SUBJECTS: Record<Locale, string> = {
  "zh-CN": "网站询盘",
  en: "Website inquiry",
  ru: "Запрос с сайта",
  tr: "Web sitesi talebi",
  es: "Consulta del sitio web",
  ar: "استفسار من الموقع",
  de: "Website-Anfrage",
  fr: "Demande du site web",
  pl: "Zapytanie ze strony",
};

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneMinLen = 6;

export function InquiryForm({ locale, phone, email, productOptions = [] }: InquiryFormProps) {
  const t = STRINGS[locale];
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [doneMode, setDoneMode] = useState<"api" | "mailto">("api");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    product: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof form, boolean>>>({});

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, ...validate({ ...form, [key]: value }, locale) }));
    }
  };

  const validate = (values: typeof form, l: Locale): Errors => {
    const e = ERRORS[l];
    const next: Errors = {};
    if (!values.name.trim()) {
      next.name = e.nameRequired;
    } else if (values.name.trim().length < 2) {
      next.name = e.nameShort;
    }
    if (!values.phone.trim()) {
      next.phone = e.phoneRequired;
    } else if (values.phone.replace(/\D/g, "").length < phoneMinLen) {
      next.phone = e.phoneInvalid;
    }
    if (values.email && !emailRe.test(values.email.trim())) {
      next.email = e.emailInvalid;
    }
    if (!values.message.trim()) {
      next.message = e.messageRequired;
    } else if (values.message.trim().length < 10) {
      next.message = e.messageShort;
    }
    return next;
  };

  const buildMailto = (): string => {
    const subject = SUBJECTS[locale];
    const lines = [
      `${t.name}: ${form.name}`,
      `${t.phone}: ${form.phone}`,
      form.email ? `${t.email}: ${form.email}` : null,
      form.company ? `${t.company}: ${form.company}` : null,
      form.product ? `${t.product}: ${form.product}` : null,
      "",
      `${t.message}:`,
      form.message,
    ].filter(Boolean);
    const body = lines.join("\n");
    const targetEmail = email || "sales@example.com";
    return `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate(form, locale);
    setErrors(v);
    setTouched({ name: true, phone: true, email: true, message: true });
    if (Object.keys(v).length > 0) return;

    setStatus("submitting");

    // 1) 先尝试 POST /api/inquiry —— 服务端校验+记录（日后接 SMTP 即可发邮件）
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company,
          product: form.product,
          message: form.message,
          locale,
        }),
      });
      if (res.ok) {
        setDoneMode("api");
        setStatus("done");
        return;
      }
    } catch {
      // 网络不通 / 路由未部署 → fallback mailto 兜底，保持兼容
    }

    // 2) API 失败 → 用 mailto: 兜底（用户原有体验不被破坏）
    const mailto = buildMailto();
    // Slight delay so the user sees the "sending" state
    setTimeout(() => {
      window.location.href = mailto;
      setDoneMode("mailto");
      setStatus("done");
    }, 250);
  };

  const inputCls =
    "w-full rounded-input border bg-surface px-4 py-3 text-[0.9375rem] font-medium leading-[1.4] text-ink placeholder:text-ink-soft focus:outline-none transition-colors";
  const inputClsOk =
    "border-line focus:border-accent focus:ring-2 focus:ring-accent/15";
  const inputClsErr =
    "border-accent-red/60 focus:border-accent-red focus:ring-2 focus:ring-accent-red/15";
  const labelCls =
    "block font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-muted";
  const errCls =
    "mt-1.5 block text-[0.75rem] font-medium leading-[1.4] text-accent-red";

  const withErr = (key: keyof Errors) => errors[key] ?? null;
  const markTouched = (key: keyof typeof form) => {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, ...validate(form, locale) }));
  };

  if (status === "done") {
    const successText =
      doneMode === "api" ? t.successSubmitted : t.successMailto;
    return (
      <div className="rounded-card border border-line bg-surface p-6 md:p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-green-pale text-accent-green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 text-[1.0625rem] font-semibold text-ink">{successText}</p>
        <p className="mt-2 text-[0.875rem] text-ink-muted">{t.successHint}</p>
        <a
          href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-btn bg-accent px-5 text-[0.875rem] font-medium text-white transition-opacity hover:opacity-85"
        >
          {phone}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass-highlight rounded-card border border-line bg-surface p-6 md:p-8"
      aria-label={t.title}
    >
      <h2 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
        {t.title}
      </h2>
      <p className="mt-2 text-[0.8125rem] font-medium leading-[1.55] text-ink-muted md:text-[0.875rem]">
        {t.subtitle}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>
            {t.name} <span className="text-accent-red" aria-hidden>*</span>
          </span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => markTouched("name")}
            placeholder={t.namePlaceholder}
            aria-invalid={Boolean(withErr("name"))}
            aria-describedby={withErr("name") ? "err-name" : undefined}
            className={cn(inputCls, "mt-2", withErr("name") ? inputClsErr : inputClsOk)}
          />
          {withErr("name") ? (
            <span id="err-name" role="alert" className={errCls}>
              {withErr("name")}
            </span>
          ) : null}
        </label>
        <label className="block">
          <span className={labelCls}>
            {t.phone} <span className="text-accent-red" aria-hidden>*</span>
          </span>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => markTouched("phone")}
            placeholder={t.phonePlaceholder}
            aria-invalid={Boolean(withErr("phone"))}
            aria-describedby={withErr("phone") ? "err-phone" : undefined}
            className={cn(inputCls, "mt-2", withErr("phone") ? inputClsErr : inputClsOk)}
          />
          {withErr("phone") ? (
            <span id="err-phone" role="alert" className={errCls}>
              {withErr("phone")}
            </span>
          ) : null}
        </label>
        <label className="block">
          <span className={labelCls}>{t.email}</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => markTouched("email")}
            placeholder={t.emailPlaceholder}
            aria-invalid={Boolean(withErr("email"))}
            aria-describedby={withErr("email") ? "err-email" : undefined}
            className={cn(inputCls, "mt-2", withErr("email") ? inputClsErr : inputClsOk)}
          />
          {withErr("email") ? (
            <span id="err-email" role="alert" className={errCls}>
              {withErr("email")}
            </span>
          ) : null}
        </label>
        <label className="block">
          <span className={labelCls}>{t.company}</span>
          <input
            type="text"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder={t.companyPlaceholder}
            className={cn(inputCls, "mt-2", inputClsOk)}
          />
        </label>
      </div>

      {productOptions.length > 0 ? (
        <label className="mt-4 block">
          <span className={labelCls}>{t.product}</span>
          <select
            value={form.product}
            onChange={(e) => update("product", e.target.value)}
            className={cn(inputCls, "mt-2 appearance-none")}
          >
            <option value="">—</option>
            {productOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="mt-4 block">
        <span className={labelCls}>
          {t.message} <span className="text-accent-red" aria-hidden>*</span>
        </span>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={t.messagePlaceholder}
          className={cn(inputCls, "mt-2 resize-y")}
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center rounded-btn bg-accent px-6 text-[0.9375rem] font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </button>
        <p className="text-[0.75rem] text-ink-soft">
          {t.callInstead}{" "}
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="font-mono font-medium text-accent-strong hover:text-accent"
          >
            {phone}
          </a>
        </p>
      </div>
    </form>
  );
}
