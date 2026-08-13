"use client";

import { useSyncExternalStore } from "react";
import V2RequestExperience, { makeT } from "@/components/v2/V2RequestExperience";
import type { Locale } from "@/lib/locales";

/* ============================================================
   /v-next — preview wrapper

   Dev preview of the sourcing workflow. Delegates to the shared
   V2RequestExperience component (same as /v2/[locale]/request).
   Locale comes from the ?lang= query param (preview behavior).
   ============================================================ */

const HEADER_NAV: Record<string, { en: string; ru: string; zh: string }> = {
  tagline: {
    en: "China Industrial Supply Chain Partner",
    ru: "Китайский партнёр по пром. цепочкам поставок",
    zh: "中国工业供应链合作伙伴",
  },
  nav_explore: { en: "Explore capabilities", ru: "Возможности", zh: "能力探索" },
  nav_verify: { en: "Factory verification", ru: "Проверка заводов", zh: "工厂验证" },
  nav_start: { en: "Start sourcing", ru: "Начать закупку", zh: "开始采购" },
};

const emptySubscribe = () => () => {};

function usePreviewLang(): Locale {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const v = new URLSearchParams(window.location.search).get("lang");
      return v === "ru" || v === "zh" || v === "en" ? v : "en";
    },
    () => "en"
  );
}

const PAPER = "#F3F2EC";
const INK = "#17191A";
const DIM = "#6E7377";
const LINE = "#D8D6CD";
const LINE_D = "#C4C1B6";
const ACCENT = "#E34D0E";

export default function VNextPreview() {
  const lang = usePreviewLang();
  const t = makeT(lang);
  const nav = (k: string) => HEADER_NAV[k]?.[lang] ?? HEADER_NAV[k]?.en ?? k;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b" style={{ background: PAPER, borderColor: LINE }}>
        <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-6 md:px-10">
          <a href="#entry" className="flex items-center gap-3">
            <span className="h-[10px] w-[10px]" style={{ background: ACCENT }} />
            <span className="display text-[17px] font-bold tracking-[-0.02em]" style={{ color: INK }}>HISVIA</span>
            <span className="mono hidden border-l pl-3 lg:block" style={{ borderColor: LINE_D, fontSize: 8.5, letterSpacing: "0.2em", color: DIM, textTransform: "uppercase" }}>
              {nav("tagline")}
            </span>
          </a>
          <nav className="mono flex items-center gap-6" style={{ fontSize: 10.5, letterSpacing: "0.12em", color: DIM, textTransform: "uppercase" }}>
            <a href="#explore" className="hidden transition-colors hover:text-[#17191A] sm:block">{nav("nav_explore")}</a>
            <a href="#verify" className="hidden transition-colors hover:text-[#17191A] sm:block">{nav("nav_verify")}</a>
            <a href="#connect" className="border px-4 py-2 text-[10.5px] tracking-[0.12em] transition-colors" style={{ borderColor: INK, color: INK }}>
              {nav("nav_start")}
            </a>
          </nav>
        </div>
      </header>
      <V2RequestExperience locale={lang} />
    </>
  );
}
