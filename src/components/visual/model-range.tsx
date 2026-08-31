"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { H3, BodySmall } from "@/components/ui/typography";
import { DecoratedImage } from "@/components/visual/decorated-image";

export type ModelRangeItem = {
  id: string;
  model: string;
  title: string;
  image: string | null;
  parameters: { label: string; value: string }[];
  note: string;
  extra: string;
  /** 2026-08-21 用户要求：05/07/08 产品图全局默认放大 25% */
  zoom25?: boolean;
};

export function ModelRange({ items }: { items: ModelRangeItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && items.some((item) => item.id === hash)) {
        setActiveId(hash);
      }
    };
    queueMicrotask(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [items]);

  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div>
      {/* Anchor targets sit at the top of the module so #p06-a..#p13-b resolve to a visible position. */}
      <div aria-hidden className="relative h-0">
        {items.map((item) => (
          <span key={item.id} id={item.id} className="absolute start-0 top-0 h-0 w-0 scroll-mt-32" />
        ))}
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Model navigation" className="min-w-0">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {items.map((item) => {
              const selected = item.id === activeId;
              return (
                <li key={item.id} className="shrink-0 lg:shrink">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setActiveId(item.id)}
                    aria-current={selected ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[0.8125rem] leading-tight transition-all",
                      selected
                        ? "bg-ink text-white"
                        : "bg-stripe text-ink-muted hover:bg-ink/10 hover:text-ink"
                    )}
                  >
                    <span className="font-medium tabular-nums">{item.id}</span>
                    <span className="min-w-0 break-words text-[0.75rem] leading-snug opacity-80">
                      {item.model}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <article
          key={active.id}
          className={cn(
            "grid min-w-0 gap-6 md:gap-8 animate-fade-in-up",
            "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start"
          )}
        >
          <DecoratedImage
            src={active.image ?? undefined}
            alt={active.title}
            ratio="4 / 3"
            fit="contain"
            imgClassName={
              active.zoom25
                ? "scale-[1.25] origin-center transition-transform duration-500 ease-out"
                : undefined
            }
            placeholder={{
              label: active.id.toUpperCase(),
              sublabel: active.title,
            }}
          />

          <div className="min-w-0">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent">
              {active.id}
            </p>
            <H3 className="mt-2 break-words text-ink">{active.title}</H3>

            {/* 参数表：移动端压缩行高/padding，减少"一堆框+大空"堆砌感；
                 空 parameters 不渲染 table 外壳，避免留白占位 */}
            {active.parameters.length > 0 ? (
              <div className="mt-5 md:mt-6">
                <table className="w-full border-collapse text-start">
                  <tbody>
                    {active.parameters.map((param) => (
                      <tr
                        key={param.label}
                        className="border-t border-line/90 first:border-t-0"
                      >
                        <th
                          scope="row"
                          className="w-[40%] sm:w-[44%] md:w-[46%] py-1.5 pe-3 sm:py-2 sm:pe-4 align-top text-[0.78125rem] sm:text-[0.8125rem] font-medium leading-snug text-ink-muted"
                        >
                          <span className="break-words">{param.label}</span>
                        </th>
                        <td className="break-words py-1.5 sm:py-2 font-mono text-[0.78125rem] sm:text-[0.8125rem] tabular-nums leading-snug text-ink">
                          {param.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {active.note ? <BodySmall className="mt-4 break-words text-ink-muted md:mt-5">{active.note}</BodySmall> : null}
            {active.extra ? <BodySmall className="mt-2 break-words text-ink-muted">{active.extra}</BodySmall> : null}
          </div>
        </article>
      </div>
    </div>
  );
}
