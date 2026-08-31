"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locale";

/** 计数器模板({i}=当前步序号, {n}=总步数)。 */
const COUNTER_FMT: Record<Locale, string> = {
  "zh-CN": "步骤 {i} / {n}",
  en: "Step {i} of {n}",
  ru: "Шаг {i} из {n}",
  tr: "Adım {i} / {n}",
  es: "Paso {i} de {n}",
  ar: "خطوة {i} من {n}",
  de: "Schritt {i} von {n}",
  fr: "Étape {i} sur {n}",
  pl: "Krok {i} z {n}",
};

const DETAILS_TEXT: Record<Locale, string> = {
  "zh-CN": "详情", en: "Details", ru: "Детали", tr: "Detaylar", es: "Detalles",
  ar: "التفاصيل", de: "Details", fr: "Détails", pl: "Szczegóły",
};

const AUTOPLAY_TEXT: Record<Locale, string> = {
  "zh-CN": "自动", en: "Autoplay", ru: "Авто", tr: "Otomatik", es: "Auto",
  ar: "تلقائي", de: "Auto", fr: "Auto", pl: "Auto",
};

const TOGGLE_TEXT: Record<Locale, string> = {
  "zh-CN": "切换自动播放", en: "Toggle autoplay", ru: "Вкл/выкл авто",
  tr: "Otomatik oynatmayı aç/kapat", es: "Alternar reproducción automática",
  ar: "تبديل التشغيل التلقائي", de: "Autoplay ein/aus",
  fr: "Activer/désactiver l'auto", pl: "Przełącz autoodtwarzanie",
};

const PLAY_TEXT: Record<Locale, string> = {
  "zh-CN": "播放", en: "Play", ru: "Старт", tr: "Oynat", es: "Reproducir",
  ar: "تشغيل", de: "Wiedergabe", fr: "Lecture", pl: "Odtwórz",
};

const PAUSE_TEXT: Record<Locale, string> = {
  "zh-CN": "暂停", en: "Pause", ru: "Пауза", tr: "Duraklat", es: "Pausa",
  ar: "إيقاف مؤقت", de: "Pause", fr: "Pause", pl: "Wstrzymaj",
};

type Step = {
  id: string;
  number: number;
  text: string;
  detail?: string;
};

type ProcessStepperProps = {
  steps: Step[];
  locale: Locale;
  /** 非激活（用户未触碰）时是否自动轮播。默认开启。 */
  autoplay?: boolean;
  /** 自动轮播间隔（ms）。默认 5500ms。 */
  interval?: number;
};

/**
 * 高级流程组件（含交互增强）：
 * - 桌面：顶部横向进度条 + 三态编号圆（完成 ✓ accent/15，当前 accent 阴影，未来 灰底 hover accent）
 * - 计数器：Step X of N
 * - 鼠标指向（hover）= 立刻预览该步骤（不破坏用户选择）
 * - 非激活态自动轮播（每 interval ms 推进 1 步），用户 hover/点击任意圆时禁用
 * - 展开卡：高度平滑过渡 + 玻璃高亮 + 左上 accent 角线
 * - 移动端：纵向堆叠 + 连接竖线 + 也显示展开卡（之前隐藏）
 */
export function ProcessStepper({
  steps,
  locale,
  autoplay = true,
  interval = 5500,
}: ProcessStepperProps) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  /** 用户一旦交互（hover/click），关闭自动轮播直到离开窗口再回来也不关（一次性）。 */
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = useMemo(
    () => Math.max(0, steps.findIndex((s) => s.id === activeId)),
    [steps, activeId]
  );
  /** 显示索引：hover 优先于 active */
  const displayIndex = useMemo(() => {
    if (hoveredId) {
      const i = steps.findIndex((s) => s.id === hoveredId);
      return i === -1 ? activeIndex : i;
    }
    return activeIndex;
  }, [steps, hoveredId, activeIndex]);

  // 自动轮播：用户交互后永久暂停（单会话）
  useEffect(() => {
    if (!autoplay || autoplayPaused || steps.length <= 1) return;
    const t = setInterval(() => {
      setActiveId((prev) => {
        const i = steps.findIndex((s) => s.id === prev);
        const next = (i + 1) % steps.length;
        return steps[next]?.id ?? prev;
      });
    }, interval);
    return () => clearInterval(t);
  }, [autoplay, autoplayPaused, steps, interval]);

  const handleSelect = (id: string) => {
    setAutoplayPaused(true);
    setActiveId(id);
    setHoveredId(null);
  };

  const handleHover = (id: string) => {
    setAutoplayPaused(true);
    setHoveredId(id);
  };

  const activeStep = steps[displayIndex];

  const counterText = COUNTER_FMT[locale]
    .replace("{i}", String(displayIndex + 1))
    .replace("{n}", String(steps.length));

  return (
    <div
      ref={containerRef}
      className="space-y-6 md:space-y-8"
      onMouseLeave={() => setHoveredId(null)}
    >
      {/* 顶栏：桌面横排 / 移动堆叠 */}
      <div className="flex flex-col gap-4 md:gap-6">
        {/* 桌面横向 */}
        <div className="hidden md:block">
          <ol className="relative flex items-center">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line"
            />
            <div
              aria-hidden
              className="absolute start-0 top-1/2 h-px -translate-y-1/2 bg-accent transition-all duration-500"
              style={{
                width:
                  steps.length > 1
                    ? `${(displayIndex / (steps.length - 1)) * 100}%`
                    : "0%",
              }}
            />
            {steps.map((s, i) => {
              const state: "done" | "active" | "future" =
                i < displayIndex ? "done" : i === displayIndex ? "active" : "future";
              const selected = s.id === activeId;
              return (
                <li
                  key={s.id}
                  className="relative z-10 flex flex-1 items-center justify-center"
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(s.id)}
                    onMouseEnter={() => handleHover(s.id)}
                    aria-current={state === "active" ? "step" : undefined}
                    className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                    title={s.text}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full font-display text-[0.9375rem] font-semibold transition-all duration-300 ring-0",
                        state === "done" &&
                          "bg-accent/15 text-accent ring-0 hover:bg-accent/25",
                        state === "active" &&
                          cn(
                            "bg-accent text-white shadow-[0_6px_24px_rgba(0,120,168,0.38)]",
                            selected && "ring-4 ring-accent/15"
                          ),
                        state === "future" &&
                          "bg-stripe text-ink-muted group-hover:bg-accent/10 group-hover:text-accent"
                      )}
                    >
                      {state === "done" ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M3.5 8.5l3 3 6-6.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* 移动端纵向 */}
        <ol className="relative space-y-3 md:hidden">
          <div
            aria-hidden
            className="absolute start-[19px] top-5 bottom-5 w-px bg-line"
          />
          <div
            aria-hidden
            className="absolute start-[19px] top-5 w-px bg-accent transition-all duration-500"
            style={{
              height:
                steps.length > 0
                  ? `${((displayIndex + 0.5) / steps.length) * 100}%`
                  : "0%",
            }}
          />
          {steps.map((s, i) => {
            const state: "done" | "active" | "future" =
              i < displayIndex ? "done" : i === displayIndex ? "active" : "future";
            return (
              <li key={s.id} className="relative z-10">
                <button
                  type="button"
                  onClick={() => handleSelect(s.id)}
                  onMouseEnter={() => handleHover(s.id)}
                  className="flex w-full items-center gap-3.5 transition-opacity"
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[0.875rem] font-semibold transition-all duration-300",
                      state === "done" && "bg-accent/15 text-accent",
                      state === "active" &&
                        "bg-accent text-white shadow-[0_4px_16px_rgba(0,120,168,0.3)]",
                      state === "future" && "bg-stripe text-ink-muted"
                    )}
                  >
                    {state === "done" ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3.5 8.5l3 3 6-6.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate text-start font-display text-[0.875rem] font-medium tracking-[-0.02em]",
                      state === "active"
                        ? "text-ink"
                        : state === "done"
                        ? "text-ink-muted"
                        : "text-ink-soft"
                    )}
                  >
                    {s.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* 计数器（桌面左对齐，移动居中） */}
        <div className="flex justify-center md:justify-start">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
            {counterText}
          </p>
        </div>
      </div>

      {/* 展开卡：桌面 + 移动都显示；高度平滑过渡靠 grid 0fr→1fr 技巧 + 内容溢出裁切 */}
      <div className="grid transition-[grid-template-rows] duration-500 ease-out grid-rows-[1fr]">
        {activeStep ? (
          <div
            key={activeStep.id}
            className="animate-fade-in-up overflow-hidden"
          >
            <div className="glass-highlight glass-strong relative overflow-hidden rounded-card border border-accent/20 bg-surface p-6 md:p-8">
              {/* 左上 accent 角线（替代旧数字装饰） */}
              <span
                aria-hidden
                className="pointer-events-none absolute start-0 top-0 h-1 w-32 rounded-tr-card bg-gradient-to-r from-accent via-accent/60 to-transparent rtl:-scale-x-100 md:h-1.5 md:w-48"
              />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
                    {DETAILS_TEXT[locale]}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.125rem,1.6vw,1.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
                    {activeStep.text}
                  </h3>
                  {activeStep.detail ? (
                    <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-muted md:text-[1rem]">
                      {activeStep.detail}
                    </p>
                  ) : null}
                </div>
                {/* 右侧：大号 accent 编号方块（仅 lg+） */}
                <div
                  aria-hidden
                  className="hidden shrink-0 items-start lg:flex"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-card bg-accent text-white shadow-[0_10px_30px_rgba(0,120,168,0.28)]">
                    <span className="font-display text-[2.25rem] font-bold leading-none">
                      {displayIndex + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* 自动轮播控制条：播放/暂停 + 静音/开启 按钮 */}
      <div className="flex items-center justify-between gap-4 pt-1 border-t border-line/50">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-soft">
          {AUTOPLAY_TEXT[locale]}
        </p>
        <div className="flex items-center gap-3">
          {/* 进度点：小圆 → 大蓝圆 指示轮播进度 */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === displayIndex
                    ? "w-5 bg-accent"
                    : i < displayIndex
                    ? "w-1.5 bg-accent/35"
                    : "w-1.5 bg-line"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAutoplayPaused((v) => !v)}
            aria-pressed={autoplayPaused}
            className="inline-flex h-9 items-center gap-1.5 rounded-btn border border-line bg-surface px-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors hover:border-accent/30 hover:text-accent"
            title={TOGGLE_TEXT[locale]}
          >
            {autoplayPaused ? (
              <>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M4 3.5C4 2.67 4.67 2 5.5 2h5C11.33 2 12 2.67 12 3.5v9c0 .83-.67 1.5-1.5 1.5h-5C4.67 14 4 13.33 4 12.5v-9z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
                <span>{PLAY_TEXT[locale]}</span>
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M6 3.2c0-.45-.39-.79-.83-.67L3 3.76c-.85.25-1 1.38-.24 1.95l3.98 2.99c.42.32 1.01.02 1.01-.5V3.2z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 3.76L9.83 2.53C9.39 2.41 9 2.75 9 3.2v4.5c0 .52.59.82 1.01.5L14 5.21c.76-.57.61-1.7-.24-1.95L13 3.76z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{PAUSE_TEXT[locale]}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
