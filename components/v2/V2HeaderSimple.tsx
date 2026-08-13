"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locales";
import { localeLabel } from "@/lib/locales";

/* ============================================================
   V2HeaderSimple — HISVIA final IA (Master Directive rebuild)

   7 top-level items:
     Industrial Systems ▾ · Capabilities ▾ · Industries ▾ ·
     Brands & Replacement ▾ · OEM ▾ · Partners ▾ · Request

   Mega menus are compact + industrial (typographic visual anchors,
   no SaaS-card walls). Brand navigation is derived from the real
   asset library (8 brand groups, 12 product families, 30 brands).

   All hrefs live inside /v2/[locale]. No legacy routes.
   ============================================================ */

type Localized = { en: string; ru: string; zh: string };

interface NavChild {
  slug: string;
  label: Localized;
  href: string;
  desc?: Localized;
}

interface MegaPanel {
  /** Compact stat or label shown in the visual-anchor column. */
  anchor: { stat: string; caption: Localized };
  cta: { label: Localized; href: string };
}

interface NavEntry {
  key: string;
  label: Localized;
  href?: string;
  children?: NavChild[];
  panel?: MegaPanel;
  /** Width class for the dropdown panel. */
  width?: string;
}

function L(loc: Locale, t: Localized): string {
  return loc === "ru" ? t.ru : loc === "zh" ? t.zh : t.en;
}

function entries(locale: Locale): NavEntry[] {
  const v2 = `/v2/${locale}`;
  return [
    // 1. INDUSTRIAL SYSTEMS
    {
      key: "systems",
      label: { en: "Industrial Systems", ru: "Промышленные системы", zh: "工业系统" },
      width: "w-[620px]",
      panel: {
        anchor: { stat: "8 Systems", caption: { en: "Verified across Chinese manufacturing clusters", ru: "Проверены в китайских кластерах", zh: "经中国制造集群验证" } },
        cta: { label: { en: "Compare all systems →", ru: "Сравнить системы →", zh: "对比全部系统 →" }, href: `${v2}/capability-network` },
      },
      children: [
        { slug: "compressors", label: { en: "Air Compressor Systems", ru: "Компрессорные системы", zh: "空压机系统" }, href: `${v2}/solutions/compressors`, desc: { en: "Rotary screw, piston, oil-injected", ru: "Винтовые, поршневые, масляные", zh: "螺杆、活塞、喷油" } },
        { slug: "hydraulic", label: { en: "Hydraulic Systems", ru: "Гидравлические системы", zh: "液压系统" }, href: `${v2}/solutions/hydraulic`, desc: { en: "Pumps, motors, cylinders, HPU", ru: "Насосы, моторы, цилиндры", zh: "泵、马达、缸、液压站" } },
        { slug: "pumps", label: { en: "Pumps & Fluid Handling", ru: "Насосы и перекачка", zh: "泵与流体" }, href: `${v2}/solutions/pumps`, desc: { en: "Centrifugal, chemical, process", ru: "Центробежные, химические", zh: "离心、化工、流程" } },
        { slug: "valves", label: { en: "Valves & Flow Control", ru: "Клапаны и регулирование", zh: "阀门与流量控制" }, href: `${v2}/solutions/valves`, desc: { en: "Control, ball, check, solenoid", ru: "Регулирующие, шаровые", zh: "调节、球阀、单向、电磁" } },
        { slug: "filtration", label: { en: "Industrial Filtration", ru: "Промышленная фильтрация", zh: "工业过滤" }, href: `${v2}/solutions/filtration`, desc: { en: "Air, oil, dust, process filtration", ru: "Воздух, масло, пыль", zh: "空气、油、粉尘、流程" } },
        { slug: "automation", label: { en: "Pneumatic Automation", ru: "Пневмоавтоматика", zh: "气动自动化" }, href: `${v2}/solutions/automation`, desc: { en: "Cylinders, valves, fittings, FRL", ru: "Цилиндры, клапаны", zh: "气缸、阀、接头、FRL" } },
        { slug: "automation-control", label: { en: "Automation & Control", ru: "Автоматизация и управление", zh: "自动化控制" }, href: `${v2}/solutions/automation-control`, desc: { en: "PLCs, VFDs, sensors, HMI", ru: "ПЛК, ЧРП, датчики", zh: "PLC、变频器、传感器、HMI" } },
        { slug: "mechanical-transmission", label: { en: "Mechanical Transmission", ru: "Механические передачи", zh: "机械传动" }, href: `${v2}/solutions/mechanical-transmission`, desc: { en: "Bearings, gears, couplings, seals", ru: "Подшипники, шестерни", zh: "轴承、齿轮、联轴器、密封" } },
      ],
    },

    // 2. CAPABILITIES
    {
      key: "capabilities",
      label: { en: "Capabilities", ru: "Возможности", zh: "制造能力" },
      width: "w-[520px]",
      panel: {
        anchor: { stat: "8 Capabilities", caption: { en: "Process → Material → Tolerance → Evidence", ru: "Процесс → Материал → Допуск", zh: "工艺 → 材料 → 公差 → 证据" } },
        cta: { label: { en: "Capability Network →", ru: "Сеть возможностей →", zh: "能力网络 →" }, href: `${v2}/capability-network` },
      },
      children: [
        { slug: "capability-network", label: { en: "Capability Network", ru: "Сеть возможностей", zh: "能力网络" }, href: `${v2}/capability-network`, desc: { en: "Eight capabilities, verified in China", ru: "Восемь возможностей — проверены", zh: "八项能力，经中国验证" } },
        { slug: "verification", label: { en: "Verification", ru: "Проверка", zh: "验证体系" }, href: `${v2}/verification`, desc: { en: "How factories are verified", ru: "Как проверяются заводы", zh: "工厂如何被验证" } },
        { slug: "oem-engineering", label: { en: "Engineering & Prototyping", ru: "Инжиниринг и прототипы", zh: "工程与打样" }, href: `${v2}/oem`, desc: { en: "Reverse engineering, sampling, tooling", ru: "Реверс-инжиниринг, образцы", zh: "逆向、打样、工装" } },
      ],
    },

    // 3. INDUSTRIES
    {
      key: "industries",
      label: { en: "Industries", ru: "Отрасли", zh: "行业" },
      width: "w-[500px]",
      panel: {
        anchor: { stat: "5 Industries", caption: { en: "Problem → Equipment → Required components", ru: "Проблема → Оборудование → Детали", zh: "问题 → 设备 → 所需部件" } },
        cta: { label: { en: "Find your industry →", ru: "Найти отрасль →", zh: "找到您的行业 →" }, href: `${v2}/industries/mining` },
      },
      children: [
        { slug: "mining", label: { en: "Mining", ru: "Горная промышленность", zh: "采矿" }, href: `${v2}/industries/mining`, desc: { en: "Replacement parts & equipment", ru: "Запчасти и оборудование", zh: "备件与设备" } },
        { slug: "oil-gas", label: { en: "Oil & Gas", ru: "Нефть и газ", zh: "石油天然气" }, href: `${v2}/industries/oil-gas`, desc: { en: "Certified components & spares", ru: "Сертифицированные компоненты", zh: "认证部件与备件" } },
        { slug: "manufacturing", label: { en: "Manufacturing", ru: "Производство", zh: "制造业" }, href: `${v2}/industries/manufacturing`, desc: { en: "Production-line supply", ru: "Снабжение производств", zh: "产线供应" } },
        { slug: "construction", label: { en: "Construction", ru: "Строительство", zh: "建筑" }, href: `${v2}/industries/construction`, desc: { en: "Machinery parts", ru: "Детали для техники", zh: "机械设备零件" } },
        { slug: "water-treatment", label: { en: "Water Treatment", ru: "Водоподготовка", zh: "水处理" }, href: `${v2}/industries/water-treatment`, desc: { en: "Pumps, valves, filtration", ru: "Насосы, клапаны, фильтрация", zh: "泵、阀门、过滤" } },
      ],
    },

    // 4. BRANDS & REPLACEMENT (NEW)
    {
      key: "brands",
      label: { en: "Brands & Replacement", ru: "Бренды и аналоги", zh: "品牌与替代" },
      width: "w-[660px]",
      panel: {
        anchor: { stat: "30 Brands · 12 Families", caption: { en: "Compatible replacement components from qualified Chinese manufacturers", ru: "Совместимые аналоги от проверенных заводов Китая", zh: "来自合格中国制造商的兼容替代部件" } },
        cta: { label: { en: "Browse all brands →", ru: "Все бренды →", zh: "浏览全部品牌 →" }, href: `${v2}/brands` },
      },
      children: [
        { slug: "brands-overview", label: { en: "All Brands", ru: "Все бренды", zh: "全部品牌" }, href: `${v2}/brands`, desc: { en: "Compressor · Hydraulic · Pump · Automation", ru: "Компрессоры · Гидравлика · Насосы", zh: "压缩机·液压·泵·自动化" } },
        { slug: "compressor-brands", label: { en: "Compressor Brands", ru: "Компрессорные бренды", zh: "压缩机品牌" }, href: `${v2}/brands?group=compressor`, desc: { en: "Atlas Copco · Ingersoll Rand · Gardner Denver · Sullair", ru: "Atlas Copco · Ingersoll Rand", zh: "Atlas Copco·Ingersoll Rand·Gardner Denver" } },
        { slug: "hydraulic-brands", label: { en: "Hydraulic Brands", ru: "Гидравлические бренды", zh: "液压品牌" }, href: `${v2}/brands?group=hydraulic`, desc: { en: "Eaton · Yuken · Kawasaki", ru: "Eaton · Yuken · Kawasaki", zh: "Eaton·Yuken·川崎" } },
        { slug: "pump-brands", label: { en: "Pump Brands", ru: "Насосные бренды", zh: "泵品牌" }, href: `${v2}/brands?group=pump`, desc: { en: "Sulzer · Wilo · Emerson · Metso", ru: "Sulzer · Wilo · Emerson", zh: "Sulzer·Wilo·Emerson·Metso" } },
        { slug: "automation-brands", label: { en: "Automation Brands", ru: "Бренды автоматизации", zh: "自动化品牌" }, href: `${v2}/brands?group=automation`, desc: { en: "KUKA · Yaskawa · Siemens · Festo", ru: "KUKA · Yaskawa · Siemens", zh: "KUKA·安川·西门子·Festo" } },
        { slug: "families", label: { en: "By Product Family", ru: "По семейству", zh: "按产品族" }, href: `${v2}/brands?families=1`, desc: { en: "Compressor · Pump · Valve · Bearing · Seal · Gearbox", ru: "Компрессор · Насос · Клапан", zh: "压缩机·泵·阀·轴承·密封·齿轮箱" } },
        { slug: "replacement", label: { en: "Replacement Solutions", ru: "Аналоги", zh: "替代方案" }, href: `${v2}/brands/replacement`, desc: { en: "Cross-reference & compatible alternatives", ru: "Кросс-референс и аналоги", zh: "交叉参考与兼容替代" } },
      ],
    },

    // 5. OEM
    {
      key: "oem",
      label: { en: "OEM", ru: "OEM", zh: "OEM" },
      width: "w-[500px]",
      panel: {
        anchor: { stat: "Engineering Journey", caption: { en: "Drawing → Prototype → Sampling → Production → Inspection", ru: "Чертёж → Прототип → Образец → Производство", zh: "图纸→打样→样品→生产→检验" } },
        cta: { label: { en: "Start OEM inquiry →", ru: "OEM-запрос →", zh: "发起 OEM 询价 →" }, href: `${v2}/oem` },
      },
      children: [
        { slug: "oem", label: { en: "OEM Manufacturing", ru: "OEM-производство", zh: "OEM 制造" }, href: `${v2}/oem`, desc: { en: "Confidential development, IP protection", ru: "Конфиденциальная разработка", zh: "保密开发、IP 保护" } },
        { slug: "engineering", label: { en: "Engineering & Reverse", ru: "Инжиниринг и реверс", zh: "工程与逆向" }, href: `${v2}/oem#engineering`, desc: { en: "3D scanning, CAD, material analysis", ru: "3D-сканирование, CAD", zh: "3D 扫描、CAD、材料分析" } },
        { slug: "prototyping", label: { en: "Prototyping & Sampling", ru: "Прототипы и образцы", zh: "打样与样品" }, href: `${v2}/oem#prototyping`, desc: { en: "Sample before bulk, your approval", ru: "Образец перед партией", zh: "量产前打样确认" } },
        { slug: "quality", label: { en: "Quality & Inspection", ru: "Качество и контроль", zh: "质量与检验" }, href: `${v2}/verification`, desc: { en: "PPAP, FAI, in-process inspection", ru: "PPAP, FAI, контроль", zh: "PPAP、FAI、过程检验" } },
        { slug: "for-factories", label: { en: "For Factories", ru: "Заводам", zh: "工厂合作" }, href: `${v2}/for-factories`, desc: { en: "Become a verified manufacturer", ru: "Стать проверенным заводом", zh: "成为验证制造商" } },
      ],
    },

    // 6. PARTNERS
    {
      key: "partners",
      label: { en: "Partners", ru: "Партнёры", zh: "合作伙伴" },
      width: "w-[480px]",
      panel: {
        anchor: { stat: "Partner Network", caption: { en: "Distributors · Service centers · Regional agents", ru: "Дистрибьюторы · Сервис · Агенты", zh: "经销商·服务中心·区域代理" } },
        cta: { label: { en: "Join the network →", ru: "Присоединиться →", zh: "加入网络 →" }, href: `${v2}/partners/distributor` },
      },
      children: [
        { slug: "distributor", label: { en: "Distributor", ru: "Дистрибьютор", zh: "经销商" }, href: `${v2}/partners/distributor`, desc: { en: "Regional distribution programs", ru: "Региональная дистрибуция", zh: "区域分销计划" } },
        { slug: "service-center", label: { en: "Service Center", ru: "Сервис-центр", zh: "服务中心" }, href: `${v2}/partners/service-center`, desc: { en: "Service & repair partnerships", ru: "Сервис и ремонт", zh: "服务与维修合作" } },
        { slug: "regional-agent", label: { en: "Regional Agent", ru: "Региональный агент", zh: "区域代理" }, href: `${v2}/partners/regional-agent`, desc: { en: "Market representation", ru: "Представительство", zh: "市场代理" } },
        { slug: "factory-partnership", label: { en: "Factory Partnership", ru: "Заводское партнёрство", zh: "工厂合作" }, href: `${v2}/for-factories`, desc: { en: "Verified manufacturer onboarding", ru: "Подключение заводов", zh: "验证制造商入驻" } },
      ],
    },
  ];
}

export default function V2HeaderSimple({ locale }: { locale: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const items = entries(locale);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenKey(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenKey(null);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const submitLabel = locale === "ru" ? "Запрос" : locale === "zh" ? "提交需求" : "Request";

  return (
    <header data-v2-header className="sticky top-0 z-50 border-b border-line/60 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link href={`/v2/${locale}`} className="flex items-center gap-2.5 flex-shrink-0">
          <span className="h-2.5 w-2.5 bg-amber rounded-sm" />
          <span className="font-display text-[17px] font-extrabold tracking-tight text-navy">HISVIA</span>
          <span className="hidden xl:block border-l border-line/70 pl-3 font-mono text-[8.5px] tracking-[0.2em] text-steel/70 uppercase">
            {locale === "ru" ? "Промышленная цепочка" : locale === "zh" ? "中国工业供应链" : "Industrial Supply Chain"}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-5">
          {items.map((item) => (
            <div
              key={item.key}
              className="relative"
              onMouseEnter={() => setOpenKey(item.key)}
              onMouseLeave={() => setOpenKey((k) => (k === item.key ? null : k))}
            >
              <button
                type="button"
                onClick={() => setOpenKey((k) => (k === item.key ? null : item.key))}
                className={`font-mono text-[10.5px] tracking-[0.12em] uppercase transition-colors ${
                  openKey === item.key ? "text-navy" : "text-graphite hover:text-navy"
                }`}
              >
                {L(locale, item.label)} <span className="ml-0.5">▾</span>
              </button>

              {openKey === item.key && item.children && (
                <div
                  className={`absolute top-full z-50 border border-line bg-white shadow-xl ${item.width || "w-[460px]"} ${
                    item.key === "brands" ? "left-1/2 -translate-x-1/2" : "left-0"
                  }`}
                >
                  <div className="grid grid-cols-[1fr_200px]">
                    {/* Sub-navigation */}
                    <div className="flex flex-col p-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.slug}
                          href={c.href}
                          onClick={() => setOpenKey(null)}
                          className="group flex flex-col gap-0.5 px-3 py-2.5 transition-colors hover:bg-fog/60"
                        >
                          <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-graphite transition-colors group-hover:text-navy">
                            {L(locale, c.label)}
                          </span>
                          {c.desc && (
                            <span className="text-[11.5px] leading-snug text-steel/70">
                              {L(locale, c.desc)}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Visual anchor + CTA (typographic, industrial restraint) */}
                    {item.panel && (
                      <div className="border-l border-line/70 bg-fog/50 p-5 flex flex-col justify-between">
                        <div>
                          <p className="font-mono text-[8.5px] tracking-[0.22em] uppercase text-amber">
                            {L(locale, item.label)}
                          </p>
                          <p className="mt-4 font-display text-[22px] font-extrabold leading-none text-navy">
                            {item.panel.anchor.stat}
                          </p>
                          <p className="mt-2 text-[11.5px] leading-snug text-steel/80">
                            {L(locale, item.panel.anchor.caption)}
                          </p>
                        </div>
                        <Link
                          href={item.panel.cta.href}
                          onClick={() => setOpenKey(null)}
                          className="mt-5 inline-block font-mono text-[9.5px] tracking-[0.16em] uppercase text-navy underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-amber"
                        >
                          {L(locale, item.panel.cta.label)}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* REQUEST — primary CTA */}
          <Link
            href={`/v2/${locale}/request`}
            className="inline-flex items-center gap-2 rounded-sm bg-steel px-4 py-2 text-[10.5px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-navy"
          >
            {submitLabel}
          </Link>
        </nav>

        {/* Right: locale switch + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 border border-line/70 rounded-sm">
            {(["en", "ru", "zh"] as Locale[]).map((l) => (
              <Link
                key={l}
                href={`/v2/${l}`}
                className={`px-2 py-1 font-mono text-[9.5px] tracking-widest transition-colors ${
                  l === locale ? "bg-navy text-white" : "text-graphite hover:text-navy"
                }`}
                aria-current={l === locale ? "page" : undefined}
              >
                {localeLabel[l]}
              </Link>
            ))}
          </div>
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={locale === "ru" ? "Меню" : locale === "zh" ? "菜单" : "Menu"}
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-navy transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-navy transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-navy transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line/60 bg-white max-h-[calc(100vh-56px)] overflow-y-auto">
          <div className="px-4 py-3 flex flex-col gap-1">
            {items.map((item) => (
              <div key={item.key}>
                <p className="px-3 pt-3 pb-1 font-mono text-[9px] tracking-[0.2em] uppercase text-graphite/60">
                  {L(locale, item.label)}
                </p>
                {item.children?.map((c) => (
                  <Link
                    key={c.slug}
                    href={c.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-5 py-2 text-[12.5px] font-medium text-graphite hover:bg-fog/40"
                  >
                    {L(locale, c.label)}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href={`/v2/${locale}/request`}
              onClick={() => setMobileOpen(false)}
              className="mt-3 px-3 py-2.5 text-[13px] font-semibold text-white bg-steel"
            >
              {submitLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
