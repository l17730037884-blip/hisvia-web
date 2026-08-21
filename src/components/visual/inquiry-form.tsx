"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type InquiryFormProps = {
  locale: "ru" | "en";
  phone: string;
  email?: string;
  productOptions?: { value: string; label: string }[];
};

const STRINGS = {
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
} as const;

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

  const validate = (values: typeof form, l: "ru" | "en"): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) {
      next.name = l === "ru" ? "Введите ваше имя" : "Please enter your name";
    } else if (values.name.trim().length < 2) {
      next.name = l === "ru" ? "Слишком короткое имя" : "Name is too short";
    }
    if (!values.phone.trim()) {
      next.phone = l === "ru" ? "Введите номер телефона" : "Please enter a phone number";
    } else if (values.phone.replace(/\D/g, "").length < phoneMinLen) {
      next.phone = l === "ru" ? "Некорректный номер телефона" : "Please enter a valid phone";
    }
    if (values.email && !emailRe.test(values.email.trim())) {
      next.email = l === "ru" ? "Некорректный email" : "Please enter a valid email";
    }
    if (!values.message.trim()) {
      next.message = l === "ru" ? "Введите сообщение" : "Please enter a message";
    } else if (values.message.trim().length < 10) {
      next.message = l === "ru" ? "Сообщение слишком короткое" : "Message is too short";
    }
    return next;
  };

  const buildMailto = (): string => {
    const subject = locale === "ru" ? "Запрос с сайта" : "Website inquiry";
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
