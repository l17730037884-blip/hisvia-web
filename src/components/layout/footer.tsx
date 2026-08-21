import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getNavItems } from "@/lib/nav";
import { localized } from "@/lib/content";
import type { Locale } from "@/lib/locale";
import { QuoteCTA } from "./quote-cta";

export default function Footer({ locale }: { locale: Locale }) {
  const items = getNavItems(locale);
  const company = localized(locale, "P01-H01");
  const address = localized(locale, "P01-C01");
  const phone = localized(locale, "P01-C02");
  const postal = localized(locale, "P01-C03");
  const contactLabel = items.find((i) => i.key === "nav_contact")?.label ?? "";
  const year = new Date().getFullYear();
  // 社媒二维码 tooltip 国际化（全中文移除，用户反复反馈残留中文）
  const tgQrTip = locale === "ru" ? "Telegram (нажмите, чтобы посмотреть QR-код)" : "Telegram (tap to view QR code)";
  const waQrTip = locale === "ru" ? "WhatsApp (нажмите, чтобы посмотреть QR-код)" : "WhatsApp (tap to view QR code)";
  const igQrTip = locale === "ru" ? "Instagram (нажмите, чтобы посмотреть QR-код)" : "Instagram (tap to view QR code)";

  return (
    <footer
      className="relative mt-auto overflow-hidden border-t border-white/10 text-dark-text"
      style={{
        background:
          "linear-gradient(180deg,#0b141f 0%,#08080d 45%,#060609 100%)",
      }}
    >
      {/* 顶部 1px 白高光描边（与 Hero 呼应，顶边"发光"） */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/38 to-transparent"
      />
      {/* 左聚光灯：左下 accent 蓝发光（点亮联系区/公司区） */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[560px] rounded-full bg-accent/30 blur-[120px]"
      />
      {/* 右聚光灯：右下 accent 淡蓝（左右对称亮感） */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-28 h-[360px] w-[440px] rounded-full bg-accent/20 blur-[110px]"
      />
      {/* 中心顶部白微天光（logo 区上方提亮，极弱） */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-60px] h-48 w-[720px] -translate-x-1/2 rounded-full bg-white/5 blur-[70px]"
      />
      {/* 中心→外圈 压黑渐晕：把中心内容区保留亮，四角落压黑做舞台 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(18,18,26,0)_0%,rgba(10,10,15,0.35)_55%,rgba(6,6,10,0.82)_82%,rgba(5,5,8,0.94)_100%)]"
      />

      <Container className="relative">
        <div className="grid gap-8 py-8 md:grid-cols-[3fr_2fr_1fr] md:gap-10 md:py-10 lg:gap-12">
          <div className="text-[0.8125rem] font-medium leading-[1.6] tracking-[-0.02em] md:text-[0.875rem]">
            <p className="text-dark-text">{company}</p>
            <p className="mt-3 text-dark-muted">{address}</p>
            <p className="mt-2">
              <span className="text-dark-muted">Phone: </span>
              <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="text-dark-text transition-colors hover:text-accent">
                {phone}
              </a>
            </p>
            <p className="mt-1 text-dark-muted">{postal}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-2">
              {items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-[0.8125rem] font-medium leading-[1.6] tracking-[-0.02em] text-dark-text transition-colors hover:text-accent md:text-[0.875rem]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-[0.8125rem] font-medium leading-[1.6] tracking-[-0.02em] md:text-[0.875rem]">
            <p className="text-dark-text">{contactLabel}</p>
            <p className="mt-3 text-dark-muted">{phone}</p>

            {/* 社媒图标：Telegram / WhatsApp / Instagram / Facebook / PayPal */}
            <ul className="mt-4 flex flex-wrap items-center gap-3">
              {/* ① Telegram → 打开二维码新标签 */}
              <li>
                <a
                  href="/assets/social/tg.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  title={tgQrTip}
                  className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-accent/22 bg-accent/8 transition-all shadow-[0_0_18px_-6px_rgba(0,120,168,0.22)] hover:border-accent/50 hover:bg-accent/15 hover:shadow-[0_0_24px_-6px_rgba(0,120,168,0.6)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M21.94 4.34c.21.62.11 1.25-.29 1.77L6.81 19.22c-.5.5-1.26.69-1.95.49l-3.05-1.18c-.68-.27-.72-1.2-.08-1.52l2.84-1.43c.28-.14.39-.17.52-.05.12.12.16.26.23.52.14.54.28.77.45.81.17.04.4-.05.79-.3l6.89-4.32c.34-.21.38-.21.44.09.06.3.06.49-.13.69l-5.87 6.03c-.33.33-.33.38-.27.7.06.31.22.44.53.44.12 0 .25-.03.37-.08L20.4 16.3c.61-.27 1.01-1.17.8-1.82L19.82 4.64c-.18-.61.03-.95.24-.95.1 0 .75.17 1.88 2.65z" />
                  </svg>
                </a>
              </li>
              {/* ② WhatsApp → 打开二维码新标签 */}
              <li>
                <a
                  href="/assets/social/whatsapp.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title={waQrTip}
                  className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/22 bg-emerald-400/7 transition-all shadow-[0_0_18px_-6px_rgba(16,185,129,0.20)] hover:border-emerald-400/50 hover:bg-emerald-400/15 hover:shadow-[0_0_24px_-6px_rgba(16,185,129,0.55)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.52 3.48A11.84 11.84 0 0012.05 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.59 5.93L0 24l6.43-1.68a11.88 11.88 0 005.62 1.42h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.14-3.41-8.39zM12.05 21.7h-.01a9.82 9.82 0 01-5.01-1.37l-.36-.22-3.82 1 1.02-3.72-.24-.38a9.84 9.84 0 01-1.51-5.14C2.12 6.39 6.59 1.94 12.06 1.94c2.63 0 5.1 1.02 6.96 2.88a9.78 9.78 0 012.87 6.96c-.01 5.47-4.48 9.92-9.84 9.92zm5.39-7.39c-.29-.15-1.75-.87-2.02-.97-.27-.1-.47-.15-.67.15-.2.29-.77.97-.94 1.17-.17.2-.34.22-.64.07-.29-.15-1.24-.46-2.37-1.46a8.9 8.9 0 01-1.64-2.04c-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49 2.49 1.08 2.99.86 3.53.81.54-.05 1.75-.71 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.56-.35z" />
                  </svg>
                </a>
              </li>
              {/* ③ Instagram → 打开二维码新标签 */}
              <li>
                <a
                  href="/assets/social/instagram.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title={igQrTip}
                  className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-pink-400/22 transition-all bg-[linear-gradient(135deg,rgba(131,58,180,0.08)_0%,rgba(253,29,29,0.08)_50%,rgba(252,176,69,0.08)_100%)] shadow-[0_0_18px_-6px_rgba(253,29,29,0.18)] hover:border-pink-400/50 hover:bg-[linear-gradient(135deg,rgba(131,58,180,0.22)_0%,rgba(253,29,29,0.22)_50%,rgba(252,176,69,0.22)_100%)] hover:shadow-[0_0_28px_-8px_rgba(253,29,29,0.5)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </li>
              {/* ④ Facebook → 加好友链接 */}
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61592766154298"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/22 bg-blue-500/6 transition-all shadow-[0_0_18px_-6px_rgba(24,119,242,0.22)] hover:border-blue-400/55 hover:bg-blue-500/18 hover:shadow-[0_0_28px_-8px_rgba(24,119,242,0.6)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z" />
                  </svg>
                </a>
              </li>
              {/* ⑤ PayPal */}
              <li>
                <a
                  href="#"
                  aria-label="PayPal"
                  title="PayPal"
                  className="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/22 bg-[#003087]/8 transition-all shadow-[0_0_18px_-6px_rgba(0,48,135,0.20)] hover:border-blue-500/50 hover:bg-[#003087]/22 hover:shadow-[0_0_28px_-8px_rgba(0,48,135,0.55)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.5 6.54c-.2.78-.62 1.45-1.25 1.97-1.28 1.06-3.18 1.55-5.63 1.18-.32-.05-.63-.04-.95.06-.39.12-.62.45-.73.82-.22.75-.43 1.5-.67 2.25a.79.79 0 01-.76.58h-1.6c-.16 0-.3-.11-.33-.27l-.93-6.1a.76.76 0 01.75-.88h2.52c.82 0 1.57-.03 2.32-.2 1.98-.45 3.45-1.46 3.8-3.49.13-.73-.13-1.37-.7-1.84-.61-.5-1.52-.66-2.64-.48-1.87.31-3.7.43-5.48.14-.41-.07-.84.02-1.14.32-.3.3-.37.74-.2 1.15L5.64 18.5a.76.76 0 00.74.9h2.36c.34 0 .64-.23.73-.55.14-.47.33-.93.52-1.4.08-.2.28-.33.49-.31 1.71.19 3.19.15 4.37-.92.8-.72 1.19-1.73 1.19-3.01.01-1.67-.74-2.79-2.19-3.29.8-.15 1.54-.44 2.12-.94.7-.6 1.14-1.36 1.32-2.44.04-.25.1-.25.22-.58l.01-.01c.03-.08.2-.2.11-.42z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 border-t py-6 text-[0.8125rem] font-medium leading-[1.6] tracking-[-0.02em] md:flex-row md:items-center md:justify-between md:gap-10 md:py-8 md:text-[0.875rem]"
          style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(220,220,230,0.62)" }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-10">
            <p>
              © {year} {company}
            </p>
            <Link href={`/${locale}/about`} className="transition-colors hover:text-accent">
              {items.find((i) => i.key === "nav_about")?.label}
            </Link>
            <Link href={`/${locale}/contact`} className="transition-colors hover:text-accent">
              {items.find((i) => i.key === "nav_contact")?.label}
            </Link>
            <Link href={`/${locale}/privacy`} className="transition-colors hover:text-accent">
              {locale === "ru" ? "Политика конфиденциальности" : "Privacy Policy"}
            </Link>
            <Link href={`/${locale}/terms`} className="transition-colors hover:text-accent">
              {locale === "ru" ? "Условия использования" : "Terms of Service"}
            </Link>
          </div>
          {/* 底框始终保持询盘表单入口（用户要求"底框始终有表单入口"）：
              直接跳到定制页，定制页内有完整询盘表单（InquiryForm）
              显示逻辑：默认白底黑字（低调），滚动触达后翻转成深色底白字（突出） */}
          <QuoteCTA locale={locale} href={`/${locale}/customization#inquiry-form`} />
        </div>
      </Container>
    </footer>
  );
}
