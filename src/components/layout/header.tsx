"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavLink } from "@/components/layout/nav-link";
import { getNavItems } from "@/lib/nav";
import { resolveAsset } from "@/lib/assets";
import { localized } from "@/lib/content";
import type { Locale } from "@/lib/locale";

const ACTIVE_KEYS = ["nav_about", "nav_products", "nav_technology", "nav_certifications", "nav_customization", "nav_contact"];

export default function Header({ locale }: { locale: Locale }) {
  const items = getNavItems(locale).filter((item) => ACTIVE_KEYS.includes(item.key));
  const logo = resolveAsset("ASSET-39");
  const brand = localized(locale, "P01-H02");
  const phone = localized(locale, "P01-C02");
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const contact = items.find((item) => item.key === "nav_contact");

  // ===== 移动端滚动自动折叠（用户要求："向上滑时会自动向上折叠"）
  // 语义：手指向上滑 → 页面往下滚动 scrollY↑ → 隐藏 utility 条（h-10/md:h-[52px] 那一行），保留主导航
  // 手指向下滑 → 页面往上滚动 scrollY↓ → 完全展开
  const [collapsed, setCollapsed] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        // 顶部近区（scrollY<28）：永远不折叠，让首屏完整
        if (y < 28) {
          lastYRef.current = y;
          setCollapsed(false);
          ticking = false;
          return;
        }
        // 差值阈值 6px：避免微小抖动触发
        if (y - lastYRef.current > 6) {
          // 向下滚（手指向上滑）→ 折叠
          setCollapsed(true);
        } else if (lastYRef.current - y > 6) {
          // 向上滚（手指向下滑）→ 展开
          setCollapsed(false);
        }
        lastYRef.current = y;
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-40 transition-transform duration-300 ease-out will-change-transform " +
        // 移动端折叠只藏 utility 一行高度（32px），桌面端藏 50px
        (collapsed ? "-translate-y-8 md:-translate-y-[50px]" : "translate-y-0")
      }
    >
      {/* 【与 Footer 统一深色主题】：整段深黑渐变 + 顶白高光 + 左右聚光灯 + 径向舞台黑晕 */}
      <div
        className="relative border-b border-white/10"
        style={{
          background:
            "linear-gradient(180deg,#0b141f 0%,#08080d 45%,#060609 100%)",
        }}
      >
        {/* 聚光灯裁剪容器:overflow-hidden 只作用于光晕,不影响内容层(语言列表等 absolute 元素) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* 顶部 1px 白高光描边（与 Footer 完全对称） */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/38 to-transparent"
          />
          {/* 左聚光灯：左上 accent 蓝发光（点亮 Logo/品牌名区） */}
          <span
            aria-hidden
            className="absolute -top-28 -start-32 h-[420px] w-[560px] rounded-full bg-accent/30 blur-[120px]"
          />
          {/* 右聚光灯：右上 accent 淡蓝（点亮电话/语言切换/联系按钮区） */}
          <span
            aria-hidden
            className="absolute -top-20 -end-28 h-[360px] w-[440px] rounded-full bg-accent/20 blur-[110px]"
          />
          {/* 中心顶部白微天光（中间导航区上方极弱提亮） */}
          <span
            aria-hidden
            className="absolute left-1/2 top-[-60px] h-48 w-[720px] -translate-x-1/2 rounded-full bg-white/5 blur-[70px]"
          />
          {/* 中心→外圈 压黑渐晕：中心导航区保留亮感，四角落压黑做舞台（与 Footer 对称） */}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 20%,rgba(18,18,26,0)_0%,rgba(10,10,15,0.30)_55%,rgba(6,6,10,0.78)_82%,rgba(5,5,8,0.92)_100%)",
            }}
          />
        </div>

        {/* 顶部 utility 条：滚动折叠时整行随 header 一起 -translate（被挪到视口外）
            移动端高度砍到 h-8(32px) + 小字体 0.75rem，降低整体导航高度 */}
        <div className="relative flex h-8 items-center justify-between px-3 rtl:flex-row-reverse text-[0.75rem] font-medium tracking-[-0.02em] text-dark-text md:h-[52px] md:px-6 md:text-[0.8125rem] lg:px-8 min-[1441px]:px-12 min-[1921px]:px-[50px]">
          <nav aria-label="Utility" className="flex min-w-0 items-center gap-3 md:gap-6 lg:gap-7">
            <Link href={`/${locale}/`} className="truncate whitespace-nowrap transition-colors hover:text-accent">
              {brand}
            </Link>
            <NavLink href={`/${locale}/about`} className="hidden whitespace-nowrap text-dark-muted transition-colors hover:text-accent sm:inline" activeClassName="!text-dark-text">
              {items.find((i) => i.key === "nav_about")?.label}
            </NavLink>
            <NavLink href={`/${locale}/products`} className="hidden whitespace-nowrap text-dark-muted transition-colors hover:text-accent sm:inline" activeClassName="!text-dark-text">
              {items.find((i) => i.key === "nav_products")?.label}
            </NavLink>
          </nav>
          <div className="flex shrink-0 items-center gap-4 md:gap-6 lg:gap-7">
            <a href={telHref} className="hidden whitespace-nowrap transition-colors hover:text-accent md:inline">
              {phone}
            </a>
            {/* 桌面端 ≥lg 显示语言切换；<lg 时这一条在主导航条右侧显示（避免折叠时被顶走） */}
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </div>

        {/* 主导航条：不随 utility 条隐藏，一直保留在 header 底部
            - 移动端 h-12(48px)，左右内边距加大（px-4）让整体往里收一点，不贴边显得空
            - 左侧 logo、右侧三组按钮（lang | OEM | 汉堡）全部 flex-shrink + min-w-0，
              OEM 按钮再瘦一圈、label truncate，保证窄屏不溢出/不被裁
            - 左右侧"视觉居中"：保持两端对齐但两侧留白对称，所有元素 min-w-0 / shrink 处理 */}
        <div className="relative">
          <Container className="flex h-12 items-center justify-between gap-2 px-4 rtl:flex-row-reverse md:h-[72px] min-[1441px]:h-[80px] md:gap-4 md:px-6 min-[1441px]:px-8 min-[1921px]:px-[50px]">
          <Link href={`/${locale}/`} className="flex min-w-0 shrink items-center gap-2">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="" className="h-7 w-auto shrink-0 object-contain md:h-12" />
            ) : null}
            <span className="hidden min-w-0 truncate font-display text-[0.875rem] font-semibold tracking-[-0.02em] text-dark-text sm:block md:text-[1rem]">
              {brand}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-5 lg:gap-6 xl:gap-7 lg:flex">
            {items.map((item) => {
              const isCustom = item.key === "nav_customization";
              if (isCustom) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="no-text-hover-override inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent bg-accent px-3 py-1.5 text-[0.75rem] font-semibold tracking-[-0.01em] text-black shadow-[0_0_0_1px_rgba(255,255,255,0.14)_inset,0_6px_20px_-10px_rgba(0,112,243,0.45)] transition-all duration-200 hover:text-on-accent hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25)_inset,0_0_28px_-6px_rgba(0,112,243,0.7)] md:text-[0.8125rem]"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M8 1.5l.94 2.06a4.5 4.5 0 011.5.87l2.06-.94.94 2.06-1.5 1.5c.12.49.12 1.01 0 1.5l1.5 1.5-.94 2.06-2.06-.94a4.5 4.5 0 01-1.5.87L8 14.5l-.94-2.06a4.5 4.5 0 01-1.5-.87l-2.06.94-.94-2.06 1.5-1.5a4.5 4.5 0 010-1.5l-1.5-1.5.94-2.06 2.06.94a4.5 4.5 0 011.5-.87L8 1.5z" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {item.label}
                  </Link>
                );
              }
              return (
                <NavLink
                  key={item.key}
                  href={item.href}
                  className="whitespace-nowrap text-[0.8125rem] font-medium tracking-[-0.02em] text-dark-muted transition-colors hover:text-accent md:text-[0.875rem]"
                  activeClassName="!text-dark-text font-semibold"
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex min-w-0 shrink-0 items-center gap-1.5 rtl:flex-row-reverse md:gap-2.5">
            {/* 手机端语言切换已移至操作区最右(MobileMenu 之后),位置固定不受 OEM 按钮宽度变化影响 */}
            {/* 手机端（lg以下）：在汉堡按钮左边默认显示 OEM 定制入口，不用点开菜单就能看到
                再瘦一圈 + label 强制 truncate 一行，避免长俄语/英语 label 把按钮撑爆 */}
            {(() => {
              const custom = items.find((i) => i.key === "nav_customization");
              // label 过长(>12 字符)时,按 locale 用本地 B2B 短词兜底
              // (避免硬编码 ru/en,9 locale 都有合适的"OEM/定制"短化)
              const SHORT_LABEL: Record<Locale, string> = {
                "zh-CN": "定制", en: "OEM", ru: "Заказ", tr: "Özel",
                es: "OEM", ar: "مخصص", de: "OEM", fr: "OEM", pl: "OEM",
              };
              const customLabel = custom
                ? (custom.label.length > 12
                    ? SHORT_LABEL[locale]
                    : custom.label)
                : "";
              return custom ? (
                <Link
                  href={custom.href}
                  className="no-text-hover-override inline-flex min-w-0 shrink min-h-8 items-center gap-1 overflow-hidden rounded-full border border-accent bg-accent px-2 py-1 text-[0.6875rem] font-semibold tracking-[-0.01em] text-black shadow-[0_0_0_1px_rgba(255,255,255,0.16)_inset] transition-all duration-200 hover:text-on-accent hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3)_inset,0_0_26px_-6px_rgba(0,112,243,0.65)] lg:hidden"
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
                    <path d="M8 1.5l.94 2.06a4.5 4.5 0 011.5.87l2.06-.94.94 2.06-1.5 1.5c.12.49.12 1.01 0 1.5l1.5 1.5-.94 2.06-2.06-.94a4.5 4.5 0 01-1.5.87L8 14.5l-.94-2.06a4.5 4.5 0 01-1.5-.87l-2.06.94-.94-2.06 1.5-1.5a4.5 4.5 0 010-1.5l-1.5-1.5.94-2.06 2.06.94a4.5 4.5 0 011.5-.87L8 1.5z" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span className="min-w-0 truncate whitespace-nowrap">{customLabel}</span>
                </Link>
              ) : null;
            })()}
            {contact ? (
              <Link
                href={contact.href}
                className="no-text-hover-override hidden min-h-10 items-center justify-center rounded-btn bg-accent px-4 text-[0.8125rem] font-medium leading-none tracking-[-0.02em] text-on-accent transition-opacity hover:opacity-85 md:inline-flex md:min-h-11 md:text-[0.875rem]"
              >
                {contact.label}
              </Link>
            ) : null}
            <MobileMenu items={items} locale={locale} />
            {/* 手机端语言切换:放操作区最右,位置固定不受 OEM 按钮宽度变化影响 */}
            <div className="shrink-0 lg:hidden">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </Container>
        </div> {/* 主导航条 relative 结束 */}
      </div>       {/* 深黑渐变 + 聚光灯 外层结束 */}
    </header>
  );
}
