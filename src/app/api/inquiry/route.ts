import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

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
  locale: "ru" | "en";
}) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-family:-apple-system,'SF Pro Text',sans-serif;font-size:13px;color:#6b7280;width:160px;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-family:-apple-system,'SF Pro Text',sans-serif;font-size:14px;color:#111;vertical-align:top;white-space:pre-wrap;word-break:break-word">${value || "—"}</td></tr>`;
  return `
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:12px;padding:24px">
    <div style="font-size:18px;font-weight:700;color:#0b1220;letter-spacing:-0.02em;margin-bottom:12px">${
      data.locale === "ru" ? "Новый запрос с сайта" : "New Website Inquiry"
    }</div>
    <div style="font-size:13px;color:#6b7280;margin-bottom:20px">${
      new Date().toLocaleString(data.locale === "ru" ? "ru-RU" : "en-US")
    }</div>
    <table style="width:100%;border-collapse:collapse">
      ${row(data.locale === "ru" ? "Имя" : "Name", data.name)}
      ${row(data.locale === "ru" ? "Телефон" : "Phone", data.phone)}
      ${row(data.locale === "ru" ? "Email" : "Email", data.email)}
      ${row(data.locale === "ru" ? "Компания" : "Company", data.company)}
      ${row(data.locale === "ru" ? "Продукт" : "Product", data.product)}
      ${row(data.locale === "ru" ? "Сообщение" : "Message", data.message)}
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
  locale: "ru" | "en";
}) {
  const l = data.locale;
  return [
    l === "ru" ? "Новый запрос с сайта" : "New Website Inquiry",
    new Date().toString(),
    "",
    `${l === "ru" ? "Имя" : "Name"}: ${data.name}`,
    `${l === "ru" ? "Телефон" : "Phone"}: ${data.phone}`,
    data.email ? `${l === "ru" ? "Email" : "Email"}: ${data.email}` : null,
    data.company ? `${l === "ru" ? "Компания" : "Company"}: ${data.company}` : null,
    data.product ? `${l === "ru" ? "Продукт" : "Product"}: ${data.product}` : null,
    "",
    `${l === "ru" ? "Сообщение" : "Message"}:`,
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
  locale: "ru" | "en";
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
    const subject =
      data.locale === "ru"
        ? `Новый запрос с сайта — ${data.name} / ${data.phone}`
        : `New Website Inquiry — ${data.name} / ${data.phone}`;
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
  const locale: "ru" | "en" =
    typeof json.locale === "string" && (json.locale === "ru" || json.locale === "en") ? json.locale : "en";

  // 服务端校验（必须与前端一致，防止绕过）
  const errors: Record<string, string> = {};
  if (!name) errors.name = locale === "ru" ? "Введите имя" : "Name is required";
  else if (name.length < 2) errors.name = locale === "ru" ? "Имя слишком короткое" : "Name is too short";

  if (!phone) errors.phone = locale === "ru" ? "Введите телефон" : "Phone is required";
  else if (phone.replace(/\D/g, "").length < PHONE_MIN_DIGITS)
    errors.phone = locale === "ru" ? "Некорректный телефон" : "Invalid phone";

  if (email && !EMAIL_RE.test(email))
    errors.email = locale === "ru" ? "Некорректный email" : "Invalid email";

  if (!message) errors.message = locale === "ru" ? "Введите сообщение" : "Message is required";
  else if (message.length < 10)
    errors.message = locale === "ru" ? "Сообщение слишком короткое" : "Message is too short";

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
