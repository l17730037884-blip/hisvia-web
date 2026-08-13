import Link from "next/link";
import type { Locale } from "@/lib/locales";

/* ============================================================
   V2FooterSimple — industrial dark footer (Master Directive)

   Dark navy is permitted for Footer per design rules.
   Columns mirror the 7-item header IA:
     Industrial Systems · Brands & Replacement · Industries ·
     OEM & Partners · Company
   Plus a top CTA band (Request) and a bottom legal bar with the
   independent-partner disclaimer (no brand authorization implied).
   ============================================================ */

type L = { en: string; ru: string; zh: string };

interface FooterLink {
  label: L;
  href: string;
}

interface FooterColumn {
  title: L;
  links: FooterLink[];
}

function columns(locale: Locale): FooterColumn[] {
  const v2 = `/v2/${locale}`;
  return [
    {
      title: { en: "Industrial Systems", ru: "Промышленные системы", zh: "工业系统" },
      links: [
        { label: { en: "Air Compressor Systems", ru: "Компрессорные системы", zh: "空压机系统" }, href: `${v2}/solutions/compressors` },
        { label: { en: "Hydraulic Systems", ru: "Гидравлика", zh: "液压系统" }, href: `${v2}/solutions/hydraulic` },
        { label: { en: "Pumps & Fluid Handling", ru: "Насосы", zh: "泵与流体" }, href: `${v2}/solutions/pumps` },
        { label: { en: "Valves & Flow Control", ru: "Клапаны", zh: "阀门与流量控制" }, href: `${v2}/solutions/valves` },
        { label: { en: "Industrial Filtration", ru: "Фильтрация", zh: "工业过滤" }, href: `${v2}/solutions/filtration` },
        { label: { en: "Mechanical Transmission", ru: "Мехпередачи", zh: "机械传动" }, href: `${v2}/solutions/mechanical-transmission` },
        { label: { en: "All systems →", ru: "Все системы →", zh: "全部系统 →" }, href: `${v2}/capability-network` },
      ],
    },
    {
      title: { en: "Brands & Replacement", ru: "Бренды и аналоги", zh: "品牌与替代" },
      links: [
        { label: { en: "All Brands", ru: "Все бренды", zh: "全部品牌" }, href: `${v2}/brands` },
        { label: { en: "Compressor Brands", ru: "Компрессоры", zh: "压缩机品牌" }, href: `${v2}/brands?group=compressor` },
        { label: { en: "Hydraulic Brands", ru: "Гидравлика", zh: "液压品牌" }, href: `${v2}/brands?group=hydraulic` },
        { label: { en: "Pump Brands", ru: "Насосы", zh: "泵品牌" }, href: `${v2}/brands?group=pump` },
        { label: { en: "Automation Brands", ru: "Автоматизация", zh: "自动化品牌" }, href: `${v2}/brands?group=automation` },
        { label: { en: "Replacement Solutions", ru: "Аналоги", zh: "替代方案" }, href: `${v2}/brands/replacement` },
      ],
    },
    {
      title: { en: "Industries", ru: "Отрасли", zh: "行业" },
      links: [
        { label: { en: "Mining", ru: "Горная", zh: "采矿" }, href: `${v2}/industries/mining` },
        { label: { en: "Oil & Gas", ru: "Нефть и газ", zh: "石油天然气" }, href: `${v2}/industries/oil-gas` },
        { label: { en: "Manufacturing", ru: "Производство", zh: "制造业" }, href: `${v2}/industries/manufacturing` },
        { label: { en: "Construction", ru: "Строительство", zh: "建筑" }, href: `${v2}/industries/construction` },
        { label: { en: "Water Treatment", ru: "Водоподготовка", zh: "水处理" }, href: `${v2}/industries/water-treatment` },
      ],
    },
    {
      title: { en: "OEM & Partners", ru: "OEM и партнёры", zh: "OEM 与合作" },
      links: [
        { label: { en: "OEM Manufacturing", ru: "OEM", zh: "OEM 制造" }, href: `${v2}/oem` },
        { label: { en: "Verification", ru: "Проверка", zh: "验证体系" }, href: `${v2}/verification` },
        { label: { en: "For Factories", ru: "Заводам", zh: "工厂合作" }, href: `${v2}/for-factories` },
        { label: { en: "Distributor", ru: "Дистрибьютор", zh: "经销商" }, href: `${v2}/partners/distributor` },
        { label: { en: "Service Center", ru: "Сервис-центр", zh: "服务中心" }, href: `${v2}/partners/service-center` },
        { label: { en: "Regional Agent", ru: "Агент", zh: "区域代理" }, href: `${v2}/partners/regional-agent` },
      ],
    },
    {
      title: { en: "Company", ru: "Компания", zh: "公司" },
      links: [
        { label: { en: "About HISVIA", ru: "О HISVIA", zh: "关于 HISVIA" }, href: `${v2}/about` },
        { label: { en: "How We Work", ru: "Как мы работаем", zh: "合作方式" }, href: `${v2}/how-we-work` },
        { label: { en: "Contact", ru: "Контакты", zh: "联系我们" }, href: `${v2}/contact` },
        { label: { en: "Submit a Request", ru: "Отправить запрос", zh: "提交需求" }, href: `${v2}/request` },
      ],
    },
  ];
}

export default function V2FooterSimple({ locale }: { locale: Locale }) {
  const cols = columns(locale);
  const T = (t: L) => (locale === "ru" ? t.ru : locale === "zh" ? t.zh : t.en);
  const v2 = `/v2/${locale}`;

  const ctaTitle =
    locale === "ru"
      ? "Готовы структурировать ваш запрос?"
      : locale === "zh"
      ? "准备好结构化您的采购需求了吗？"
      : "Ready to structure your sourcing request?";
  const ctaDesc =
    locale === "ru"
      ? "Опишите деталь — мы сопоставим возможности, покажем доказательства и свяжем с проверенным производителем."
      : locale === "zh"
      ? "描述您需要的零件 — 我们匹配能力、展示证据、对接验证制造商。"
      : "Describe the part — we map capabilities, show evidence, and connect you with a verified manufacturer.";
  const ctaBtn =
    locale === "ru" ? "Отправить запрос" : locale === "zh" ? "提交需求" : "Submit a Request";

  const disclaimer =
    locale === "ru"
      ? "HISVIA — независимый партнёр по цепочкам поставок. Все названия брендов приведены исключительно для идентификации совместимости и не подразумевают официальной авторизации."
      : locale === "zh"
      ? "HISVIA 是独立供应链合作伙伴。所有品牌名称仅用于兼容性识别，不构成官方授权。"
      : "HISVIA is an independent supply-chain partner. All brand names are referenced for compatibility identification only and do not imply official authorization.";

  return (
    <footer className="bg-navy text-white">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-12 lg:py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight">
              {ctaTitle}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/70">{ctaDesc}</p>
          </div>
          <Link
            href={`${v2}/request`}
            className="inline-flex items-center justify-center bg-amber px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.16em] text-navy uppercase hover:bg-white transition-colors flex-shrink-0"
          >
            {ctaBtn}
          </Link>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          {cols.map((col) => (
            <div key={T(col.title)}>
              <h4 className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.2em] text-amber/90">
                {T(col.title)}
              </h4>
              <ul className="space-y-2.5 text-[13px]">
                {col.links.map((link) => (
                  <li key={link.href + T(link.label)}>
                    <Link
                      href={link.href}
                      className="text-white/65 hover:text-white transition-colors duration-200"
                    >
                      {T(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 bg-amber rounded-sm" />
            <span className="font-display text-[15px] font-extrabold tracking-tight">HISVIA</span>
            <span className="font-mono text-[8.5px] tracking-[0.2em] text-white/50 uppercase border-l border-white/20 pl-3 ml-1">
              {locale === "ru" ? "Промышленная цепочка" : locale === "zh" ? "中国工业供应链" : "Industrial Supply Chain"}
            </span>
          </div>
          <p className="font-mono text-[10px] leading-relaxed text-white/40 max-w-2xl md:text-right">
            {disclaimer}
          </p>
        </div>
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 pb-6">
          <p className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-white/35">
            © {new Date().getFullYear()} HISVIA · {locale === "ru" ? "Все права защищены" : locale === "zh" ? "版权所有" : "All rights reserved"}
          </p>
        </div>
      </div>
    </footer>
  );
}
