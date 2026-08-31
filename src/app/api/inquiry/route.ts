import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { type Locale, isLocale } from "@/lib/locale";

/** 询盘表单后台接口。
 *  · POST：校验必填（name/phone/message）、email 格式；
 *  · 校验通过后，通过 nodemailer SMTP 发送真实邮件到收件箱 `info@hisvia.com`
 *    — SMTP 凭据通过环境变量配置：SMTP_HOST / SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASS
 *    — 若环境变量未配齐：跳过发送（不阻塞提交），前端仍显示"提交成功"；
 *      服务器日志会有提醒，便于上线前补配置。
 *  · 前端行为：任何服务端 4xx/5xx 或网络异常，前端都会 fallback 到 mailto: 链接兜底。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_MIN_DIGITS = 6;
const INQUIRY_TO = "info@hisvia.com"; // 固定收件箱：用户指定

/** 邮件主题/标题前缀(9 种语言,工业 B2B 语境)。 */
const SUBJECTS: Record<Locale, string> = {
  "zh-CN": "网站新询盘",
  en: "New Website Inquiry",
  ru: "Новый запрос с сайта",
  tr: "Web Sitesinden Yeni Talep",
  es: "Nueva consulta desde el sitio web",
  ar: "استفسار جديد من الموقع",
  de: "Neue Anfrage von der Website",
  fr: "Nouvelle demande depuis le site",
  pl: "Nowe zapytanie ze strony",
};
const TITLES: Record<Locale, string> = SUBJECTS;

/** 邮件字段标签(9 种语言)。 */
const FIELD_NAMES: Record<"name" | "phone" | "email" | "company" | "product" | "message", Record<Locale, string>> = {
  name: {
    "zh-CN": "姓名", en: "Name", ru: "Имя", tr: "Ad", es: "Nombre",
    ar: "الاسم", de: "Name", fr: "Nom", pl: "Imię",
  },
  phone: {
    "zh-CN": "电话", en: "Phone", ru: "Телефон", tr: "Telefon", es: "Teléfono",
    ar: "الهاتف", de: "Telefon", fr: "Téléphone", pl: "Telefon",
  },
  email: {
    "zh-CN": "邮箱", en: "Email", ru: "Email", tr: "E-posta", es: "Correo electrónico",
    ar: "البريد الإلكتروني", de: "E-Mail", fr: "E-mail", pl: "E-mail",
  },
  company: {
    "zh-CN": "公司", en: "Company", ru: "Компания", tr: "Şirket", es: "Empresa",
    ar: "الشركة", de: "Unternehmen", fr: "Société", pl: "Firma",
  },
  product: {
    "zh-CN": "产品", en: "Product", ru: "Продукт", tr: "Ürün", es: "Producto",
    ar: "المنتج", de: "Produkt", fr: "Produit", pl: "Produkt",
  },
  message: {
    "zh-CN": "留言", en: "Message", ru: "Сообщение", tr: "Mesaj", es: "Mensaje",
    ar: "الرسالة", de: "Nachricht", fr: "Message", pl: "Wiadomość",
  },
};

/** 验证错误消息(9 种语言)。 */
const ERRORS: Record<string, Record<Locale, string>> = {
  name_required: {
    "zh-CN": "请输入姓名", en: "Name is required", ru: "Введите имя", tr: "Ad girin",
    es: "Introduzca el nombre", ar: "أدخل الاسم", de: "Name eingeben",
    fr: "Saisissez le nom", pl: "Podaj imię",
  },
  name_short: {
    "zh-CN": "姓名过短", en: "Name is too short", ru: "Имя слишком короткое", tr: "Ad çok kısa",
    es: "El nombre es demasiado corto", ar: "الاسم قصير جداً", de: "Name zu kurz",
    fr: "Le nom est trop court", pl: "Imię jest za krótkie",
  },
  phone_required: {
    "zh-CN": "请输入电话", en: "Phone is required", ru: "Введите телефон", tr: "Telefon girin",
    es: "Introduzca el teléfono", ar: "أدخل الهاتف", de: "Telefon eingeben",
    fr: "Saisissez le téléphone", pl: "Podaj telefon",
  },
  phone_invalid: {
    "zh-CN": "电话格式不正确", en: "Invalid phone", ru: "Некорректный телефон", tr: "Geçersiz telefon",
    es: "Teléfono no válido", ar: "رقم هاتف غير صالح", de: "Ungültige Telefonnummer",
    fr: "Numéro de téléphone invalide", pl: "Nieprawidłowy telefon",
  },
  email_invalid: {
    "zh-CN": "邮箱格式不正确", en: "Invalid email", ru: "Некорректный email", tr: "Geçersiz e-posta",
    es: "Correo electrónico no válido", ar: "بريد إلكتروني غير صالح", de: "Ungültige E-Mail",
    fr: "E-mail invalide", pl: "Nieprawidłowy e-mail",
  },
  message_required: {
    "zh-CN": "请输入留言", en: "Message is required", ru: "Введите сообщение", tr: "Mesaj girin",
    es: "Escriba un mensaje", ar: "أدخل الرسالة", de: "Nachricht eingeben",
    fr: "Saisissez un message", pl: "Podaj wiadomość",
  },
  message_short: {
    "zh-CN": "留言过短", en: "Message is too short", ru: "Сообщение слишком короткое", tr: "Mesaj çok kısa",
    es: "El mensaje es demasiado corto", ar: "الرسالة قصيرة جداً", de: "Nachricht zu kurz",
    fr: "Le message est trop court", pl: "Wiadomość jest za krótka",
  },
};

/** locale → toLocaleString 用的 BCP 47 区域标签。 */
const DATE_LOCALE: Record<Locale, string> = {
  "zh-CN": "zh-CN", en: "en-US", ru: "ru-RU", tr: "tr-TR", es: "es-ES",
  ar: "ar-AE", de: "de-DE", fr: "fr-FR", pl: "pl-PL",
};

type Payload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  company?: unknown;
  product?: unknown;
  message?: unknown;
  locale?: unknown;
};

function buildInquiryEmailHtml(data: {
  name: string;
  phone: string;
  email: string;
  company: string;
  product: string;
  message: string;
  locale: Locale;
}) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-family:-apple-system,'SF Pro Text',sans-serif;font-size:13px;color:#6b7280;width:160px;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-family:-apple-system,'SF Pro Text',sans-serif;font-size:14px;color:#111;vertical-align:top;white-space:pre-wrap;word-break:break-word">${value || "—"}</td></tr>`;
  return `
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:12px;padding:24px">
    <div style="font-size:18px;font-weight:700;color:#0b1220;letter-spacing:-0.02em;margin-bottom:12px">${
      TITLES[data.locale]
    }</div>
    <div style="font-size:13px;color:#6b7280;margin-bottom:20px">${
      new Date().toLocaleString(DATE_LOCALE[data.locale])
    }</div>
    <table style="width:100%;border-collapse:collapse">
      ${row(FIELD_NAMES.name[data.locale], data.name)}
      ${row(FIELD_NAMES.phone[data.locale], data.phone)}
      ${row(FIELD_NAMES.email[data.locale], data.email)}
      ${row(FIELD_NAMES.company[data.locale], data.company)}
      ${row(FIELD_NAMES.product[data.locale], data.product)}
      ${row(FIELD_NAMES.message[data.locale], data.message)}
    </table>
  </div>`;
}

function buildInquiryEmailText(data: {
  name: string;
  phone: string;
  email: string;
  company: string;
  product: string;
  message: string;
  locale: Locale;
}) {
  const l = data.locale;
  return [
    TITLES[l],
    new Date().toString(),
    "",
    `${FIELD_NAMES.name[l]}: ${data.name}`,
    `${FIELD_NAMES.phone[l]}: ${data.phone}`,
    data.email ? `${FIELD_NAMES.email[l]}: ${data.email}` : null,
    data.company ? `${FIELD_NAMES.company[l]}: ${data.company}` : null,
    data.product ? `${FIELD_NAMES.product[l]}: ${data.product}` : null,
    "",
    `${FIELD_NAMES.message[l]}:`,
    data.message,
  ]
    .filter((x): x is string => Boolean(x))
    .join("\n");
}

async function trySendEmail(data: {
  name: string;
  phone: string;
  email: string;
  company: string;
  product: string;
  message: string;
  locale: Locale;
}): Promise<{ ok: boolean; reason?: string; info?: unknown }> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return { ok: false, reason: "smtp_env_missing" };
  }

  try {
    const transportOpts: SMTPTransport.Options = {
      host,
      port,
      secure,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    };
    const transporter = nodemailer.createTransport(transportOpts);
    const subject = `${SUBJECTS[data.locale]} — ${data.name} / ${data.phone}`;
    const info = await transporter.sendMail({
      from: `"Website Inquiry" <${user}>`,
      replyTo: data.email || undefined,
      to: INQUIRY_TO,
      subject,
      text: buildInquiryEmailText(data),
      html: buildInquiryEmailHtml(data),
    });
    return { ok: true, info: { accepted: (info as { accepted?: unknown[] }).accepted } };
  } catch (err) {
    return { ok: false, reason: "smtp_error", info: err instanceof Error ? err.message : String(err) };
  }
}

export async function POST(req: NextRequest) {
  let json: Payload;
  try {
    json = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = typeof json.name === "string" ? json.name.trim() : "";
  const phone = typeof json.phone === "string" ? json.phone.trim() : "";
  const email = typeof json.email === "string" ? json.email.trim() : "";
  const company = typeof json.company === "string" ? json.company.trim() : "";
  const product = typeof json.product === "string" ? json.product.trim() : "";
  const message = typeof json.message === "string" ? json.message.trim() : "";
  const locale: Locale =
    typeof json.locale === "string" && isLocale(json.locale) ? json.locale : "en";

  // 服务端校验（必须与前端一致，防止绕过）
  const errors: Record<string, string> = {};
  if (!name) errors.name = ERRORS.name_required[locale];
  else if (name.length < 2) errors.name = ERRORS.name_short[locale];

  if (!phone) errors.phone = ERRORS.phone_required[locale];
  else if (phone.replace(/\D/g, "").length < PHONE_MIN_DIGITS)
    errors.phone = ERRORS.phone_invalid[locale];

  if (email && !EMAIL_RE.test(email))
    errors.email = ERRORS.email_invalid[locale];

  if (!message) errors.message = ERRORS.message_required[locale];
  else if (message.length < 10)
    errors.message = ERRORS.message_short[locale];

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 400 });
  }

  // 记录原始提交
  const entry = {
    name,
    phone,
    email,
    company,
    product,
    message,
    locale,
    at: new Date().toISOString(),
  };
  console.info("[api/inquiry] 收到询盘", entry);

  // 尝试 SMTP 发邮件 → 失败不阻塞提交（只在服务端日志里记录）
  const mailResult = await trySendEmail(entry);
  if (!mailResult.ok) {
    console.warn(
      `[api/inquiry] 邮件未发送（原因：${mailResult.reason}）。` +
        `请配置 .env.local 的 SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS，` +
        `所有询盘都会发送到固定邮箱 ${INQUIRY_TO}。`,
      mailResult.info ?? ""
    );
  } else {
    console.info(`[api/inquiry] 邮件已成功发送到 ${INQUIRY_TO}`, mailResult.info ?? "");
  }

  return NextResponse.json({ ok: true, sent: mailResult.ok, to: INQUIRY_TO });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
