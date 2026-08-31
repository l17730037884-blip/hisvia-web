/**
 * 根路径 IP 自动适配中间件。
 *
 * 优先级:cookie(NEXT_LOCALE)> Vercel geo header(国家→官方语言)
 * > Accept-Language > 兜底 ru(与历史部署一致)。
 * 未列入此表的国家(意、日、韩、越、巴(葡)等其官方语言不在受支持 9 种之列)
 * 会在 geo 步骤落空后继续走到 Accept-Language,最终兜底 ru —— 全程无 dead end。
 */
import { NextRequest, NextResponse } from "next/server";
import { type Locale, LOCALES, isLocale, DEFAULT_LOCALE } from "@/lib/locale";

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // 中文(简体)
  CN: 'zh-CN', HK: 'zh-CN', MO: 'zh-CN', TW: 'zh-CN',
  // 俄语
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
  // 土耳其语
  TR: 'tr',
  // 西班牙语
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', CL: 'es', VE: 'es', EC: 'es',
  GT: 'es', UY: 'es', PY: 'es', BO: 'es', DO: 'es', CR: 'es', PA: 'es', HN: 'es',
  NI: 'es', SV: 'es', CU: 'es', GQ: 'es', PR: 'es',
  // 阿拉伯语(注:AR = Argentina,属西班牙语组,不在此列)
  SA: 'ar', AE: 'ar', EG: 'ar', OM: 'ar', YE: 'ar', JO: 'ar', PS: 'ar', LB: 'ar',
  IQ: 'ar', KW: 'ar', BH: 'ar', QA: 'ar', SY: 'ar', SD: 'ar', LY: 'ar', DZ: 'ar',
  MA: 'ar', TN: 'ar', MR: 'ar', DJ: 'ar', KM: 'ar', BI: 'ar', ER: 'ar', SO: 'ar',
  EH: 'ar',
  // 德语
  DE: 'de', AT: 'de', LI: 'de',
  // 法语
  FR: 'fr', BE: 'fr', BJ: 'fr', BF: 'fr', CF: 'fr', CG: 'fr', CI: 'fr', CD: 'fr',
  CM: 'fr', GA: 'fr', GN: 'fr', HT: 'fr', MC: 'fr', MG: 'fr', ML: 'fr', NE: 'fr',
  SN: 'fr', TG: 'fr',
  // 波兰语
  PL: 'pl',
  // 英语(英语国家)
  US: 'en', GB: 'en', AU: 'en', CA: 'en', IN: 'en', PK: 'en', PH: 'en', NG: 'en',
  KE: 'en', BD: 'en', IE: 'en', NZ: 'en', ZA: 'en', GH: 'en', UG: 'en', TZ: 'en',
  ZM: 'en', ZW: 'en', MW: 'en', LS: 'en', SZ: 'en', BW: 'en', NA: 'en', GM: 'en',
  SL: 'en', LR: 'en', RW: 'en', SS: 'en', SG: 'en', MT: 'en', CY: 'en', JM: 'en',
  TT: 'en', BZ: 'en', GY: 'en', BS: 'en', BB: 'en', AG: 'en', DM: 'en', GD: 'en',
  KN: 'en', LC: 'en', VC: 'en', FJ: 'en', PG: 'en', SB: 'en', VU: 'en', WS: 'en',
  TO: 'en', KI: 'en', TV: 'en', NR: 'en', PW: 'en', MH: 'en', FM: 'en', CK: 'en',
  NU: 'en', BM: 'en', KY: 'en', GI: 'en',
};

/**
 * 将单个 Accept-Language 标签映射到受支持的 locale。
 * 先尝试整体匹配(zh-cn → zh-CN),再按主子标签前缀匹配
 * (zh-tw / zh-hant → zh-CN;en-gb → en;fr-fr → fr)。
 */
function matchLocaleTag(tag: string): Locale | null {
  const normalized = tag.toLowerCase();
  for (const l of LOCALES) {
    if (normalized === l.toLowerCase()) return l;
  }
  const primary = normalized.split('-')[0];
  if (!primary) return null;
  for (const l of LOCALES) {
    if (primary === l.toLowerCase().split('-')[0]) return l;
  }
  return null;
}

/**
 * 解析 Accept-Language 头,按 q 值降序返回第一个能映射到受支持 locale 的语言。
 * 示例:"zh-CN,zh;q=0.9,en;q=0.8" → zh-CN;q=1.0 → 返回 "zh-CN"。
 * q=0(rfc 7231 "not acceptable")的条目会被跳过。
 */
function pickLocaleFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const parts = header.split(',').map((segment) => {
    const [tag, ...params] = segment.trim().split(';');
    const qParam = params.find((p) => p.trim().startsWith('q='));
    const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
    return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
  });
  parts.sort((a, b) => b.q - a.q);
  for (const { tag, q } of parts) {
    if (q <= 0 || !tag) continue;
    const locale = matchLocaleTag(tag);
    if (locale) return locale;
  }
  return null;
}

/** 构造只改路径前缀、保留 query/hash 的 307 重定向。 */
function redirectToLocale(request: NextRequest, locale: Locale) {
  const target = new URL(`/${locale}`, request.url);
  target.search = request.nextUrl.search;
  target.hash = request.nextUrl.hash;
  return NextResponse.redirect(target, 307);
}

export function middleware(request: NextRequest) {
  // matcher 仅匹配 /,这里再做一道防御性校验:非根路径直接放行。
  if (request.nextUrl.pathname !== '/') return NextResponse.next();

  // 1) 用户已设置语言 cookie —— 最高优先级,尊重用户主动选择。
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (isLocale(cookieLocale)) {
    return redirectToLocale(request, cookieLocale);
  }

  // 2) Vercel Geo Header:ISO 国家代码 → 国家官方语言。
  const country = request.headers.get('x-vercel-ip-country');
  if (country) {
    const locale = COUNTRY_TO_LOCALE[country.toUpperCase()];
    if (locale) return redirectToLocale(request, locale);
  }

  // 3) Accept-Language:按 q 值取最高优先的受支持语言。
  const langLocale = pickLocaleFromAcceptLanguage(
    request.headers.get('accept-language'),
  );
  if (langLocale) return redirectToLocale(request, langLocale);

  // 4) 兜底:默认语言 ru(与历史部署一致)。
  return redirectToLocale(request, DEFAULT_LOCALE);
}

export const config = {
  // 仅匹配根路径;/ru、/en、/zh-CN、/ru/products 等不进入本中间件。
  matcher: ['/'],
};
