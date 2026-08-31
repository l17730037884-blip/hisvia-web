"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locale";

export type ProductCard = {
  img: string;
  href: string | null;
  alt: { ru: string; en: string };
};

export type CategoryData = {
  id: string;
  title: { ru: string; en: string };
  count: number;
  countUnit: { ru: string; en: string };
  cards: ProductCard[];
};

export type ProductCategoriesData = {
  tip: { ru: string; en: string };
  tabLabels: {
    all: { label: { ru: string; en: string }; count: number };
    categories: { id: string; label: { ru: string; en: string }; count: number }[];
  };
  categories: CategoryData[];
};

type Props = {
  locale: Locale;
  data: ProductCategoriesData;
};

/**
 * Product Categories 区块（/products 列表页核心模块）。
 * 反推自 8/22 线上镜像的 product-categories section：
 *   - 顶部 OEM/ODM 自定义提示框
 *   - sticky tab 导航（6 个：全部 + 5 个分类，点击平滑滚动到对应锚点）
 *   - 5 大分类网格：每张卡 figure + 透明 PNG + 链接到详情页锚点
 */
export function ProductCategories({ locale, data }: Props) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  // 监听滚动,自动切换 active tab(IntersectionObserver)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;
    const catEls = data.categories
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    if (catEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 选取最靠近视口顶部的可见 cat
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace("cat-", "");
          setActiveTab(id);
        }
      },
      {
        // sticky tab 高度约 60-72px,顶部偏移
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    catEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data.categories]);

  const scrollToCat = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      // sticky tab + header 总偏移约 140px
      const top = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveTab(id);
    }
  };

  const tr = (s: Partial<Record<Locale, string>>) =>
    s[locale] ?? s.en ?? s.ru ?? "";

  return (
    <div ref={sectionRef}>
      {/* OEM/ODM 自定义提示框 */}
      <div className="mb-5 flex items-center gap-2.5 rounded-card border border-accent/20 bg-accent/5 px-4 py-2.5 md:mb-6">
        <svg
          className="h-4 w-4 shrink-0 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <p className="text-xs font-medium text-ink md:text-sm">{tr(data.tip)}</p>
      </div>

      {/* Sticky Tab 导航 */}
      <nav className="sticky top-12 z-30 -mx-2.5 border-y border-line bg-canvas px-2.5 py-2 md:top-[72px] md:mx-0 md:px-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: sectionRef.current?.offsetTop ?? 0 - 100, behavior: "smooth" });
              setActiveTab("all");
            }}
            className={cn(
              "flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-[background-color,color] duration-150 md:text-sm",
              activeTab === "all"
                ? "bg-accent text-white"
                : "text-ink-muted hover:bg-accent/10 hover:text-accent"
            )}
          >
            {tr(data.tabLabels.all.label)}
            <span className={cn(
              "rounded px-1 py-0.5 text-[9px] font-bold",
              activeTab === "all" ? "bg-white/25" : "bg-ink/8"
            )}>
              {data.tabLabels.all.count}
            </span>
          </button>
          {data.tabLabels.categories.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToCat(tab.id)}
              className={cn(
                "flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-[background-color,color] duration-150 md:text-sm",
                activeTab === tab.id
                  ? "bg-accent text-white"
                  : "text-ink-muted hover:bg-accent/10 hover:text-accent"
              )}
            >
              {tr(tab.label)}
              <span className={cn(
                "rounded px-1 py-0.5 text-[9px] font-bold",
                activeTab === tab.id ? "bg-white/25" : "bg-ink/8"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* 5 大分类网格 */}
      <div className="mt-6 space-y-10 md:mt-8 md:space-y-12">
        {data.categories.map((cat) => (
          <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
            {/* 分类标题 + 数量 */}
            <div className="mb-4 flex items-center gap-3 border-s-2 border-accent ps-4 md:mb-5">
              <h3 className="font-display text-lg font-bold tracking-tight text-ink md:text-2xl">
                {tr(cat.title)}
              </h3>
              <span className="text-xs text-ink-muted md:text-sm">
                {cat.count}
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                {" "}
                {tr(cat.countUnit)}
              </span>
            </div>
            {/* 产品卡网格 */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
              {cat.cards.map((card, idx) => {
                const alt = tr(card.alt);
                // href 在数据文件里是 locale-agnostic(如 "/products/planetary-reducer#p06-b")
                // 渲染时根据当前 locale 拼接语言前缀
                const fullHref = card.href ? `/${locale}${card.href}` : null;
                const inner = (
                  <>
                    <div className="relative aspect-square w-full overflow-hidden bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.img}
                        alt={alt}
                        loading="lazy"
                        className="h-full w-full object-contain object-center p-3 transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  </>
                );
                return (
                  <figure
                    key={`${cat.id}-${idx}`}
                    className="group relative overflow-hidden rounded-card border border-line bg-white transition-[transform,border-color,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                  >
                    {fullHref ? (
                      <a href={fullHref} className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </figure>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
