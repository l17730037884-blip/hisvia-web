"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  bgImage: string;
  locale: string;
}

const SUGGESTIONS: Record<string, { label: string; href: string }[]> = {
  ru: [
    { label: "Компрессорные детали", href: "/v2/ru/solutions/compressors" },
    { label: "Гидравлические системы", href: "/v2/ru/solutions/hydraulic" },
    { label: "OEM производство", href: "/v2/ru/oem" },
  ],
  zh: [
    { label: "压缩机零件", href: "/v2/zh/solutions/compressors" },
    { label: "液压系统", href: "/v2/zh/solutions/hydraulic" },
    { label: "OEM制造", href: "/v2/zh/oem" },
  ],
  en: [
    { label: "Compressor Parts", href: "/v2/en/solutions/compressors" },
    { label: "Hydraulic Systems", href: "/v2/en/solutions/hydraulic" },
    { label: "OEM Manufacturing", href: "/v2/en/oem" },
  ],
};

export default function HeroSection({ bgImage, locale }: Props) {
  const [query, setQuery] = useState("");
  const suggestions = SUGGESTIONS[locale] || SUGGESTIONS.en;
  const t = (en: string, ru: string, zh: string) => locale === "ru" ? ru : locale === "zh" ? zh : en;

  return (
    <section className="relative overflow-hidden flex items-center" style={{ minHeight: "100vh", maxHeight: "960px", background: "#060D17" }}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image src={bgImage} alt="" fill className="object-cover" sizes="100vw" priority
          style={{ objectPosition: "center 40%", filter: "brightness(0.4) saturate(0.6)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,13,23,0.8) 0%, rgba(6,13,23,0.3) 60%, rgba(6,13,23,0.7) 100%)" }} />
      </div>

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-20">
          <div className="max-w-[680px] mx-auto text-center">
            
            {/* Eyebrow */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] font-mono text-[#C8920B] mb-6">
              {t("Verified Industrial Sourcing", "验证工业采购", "Проверенный промышленный сорсинг")}
            </p>

            {/* Headline */}
            <h1 className="text-[42px] md:text-[56px] lg:text-[68px] font-bold leading-[1.04] text-white tracking-[-0.025em] mb-6"
              style={{ fontFamily: "Inter, system-ui, sans-serif", textShadow: "0 2px 60px rgba(0,0,0,0.6)" }}>
              {t("Find Verified Chinese\nIndustrial Suppliers", "查找验证的中国\n工业供应商", "Найдите проверенных\nпромышленных поставщиков")}
            </h1>

            {/* Search input */}
            <div className="mt-8 max-w-[540px] mx-auto">
              <div className="flex items-center bg-white/10 border border-white/15 focus-within:border-[#C8920B] transition-colors">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={t("What are you sourcing?", "您需要采购什么？", "Что вы ищете?")}
                  className="flex-1 bg-transparent px-6 py-4.5 text-[15px] text-white placeholder-white/30 outline-none"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                />
                <Link href={"/" + locale + "/request"}
                  className="px-6 py-4.5 text-[14px] font-semibold transition-colors hover:bg-[#C8920B]/90"
                  style={{ background: "#C8920B", color: "#060D17" }}>
                  {t("Search", "搜索", "Поиск")} →
                </Link>
              </div>

              {/* AI suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-white/20">
                  {t("Popular:", "热门：", "Популярное:")}
                </span>
                {suggestions.map(s => (
                  <Link key={s.label} href={s.href}
                    className="text-[12px] px-3 py-1.5 transition-colors hover:bg-white/10 text-white/40 hover:text-white/70"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-14 flex justify-center gap-12">
              {[["300+", t("Factories", "工厂", "Заводов")], ["47", t("Audit Points", "审核点", "Проверок")], ["15+", t("Countries", "国家", "Стран")]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="text-[24px] font-bold tabular-nums text-white/50">{v}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.06em] mt-1 text-white/20">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
