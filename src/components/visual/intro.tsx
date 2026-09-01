"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/cn";

export type IntroSlide = {
  image: string;
  title: string;
  text: string;
  href: string;
  cta: string;
};

export function Intro({ slides }: { slides: IntroSlide[] }) {
  const [index, setIndex] = useState(0);
  // 客户端 viewport + RTL 检测:用 ref 直接修改 DOM style,避免 setState in effect 的 lint 错误
  // 在 lg+ 视口 + RTL 模式下,把 hero grid 反转(图片在右,文字在左)
  // 绕过 Tailwind v4 的 rtl:lg: 变体编译问题
  const heroGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = heroGridRef.current;
    if (!grid) return;

    const update = () => {
      const isLg = window.matchMedia("(min-width: 1024px)").matches;
      const isRtl = document.documentElement.dir === "rtl";
      // lg + RTL:反转 grid 列宽(图片在右窄列,文字在左宽列)
      if (isLg && isRtl) {
        grid.style.gridTemplateColumns = "1fr 1.4fr";
      } else {
        grid.style.gridTemplateColumns = "";
      }
    };

    update();

    const mq = window.matchMedia("(min-width: 1024px)");
    mq.addEventListener("change", update);

    const doc = document.documentElement;
    const observer = new MutationObserver(update);
    observer.observe(doc, { attributes: true, attributeFilter: ["dir"] });

    return () => {
      mq.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  const slide = slides[index] ?? slides[0];

  const goTo = useCallback(
    (i: number) => setIndex(() => (i + slides.length) % slides.length),
    [slides.length]
  );

  // 自动轮播：每 4 秒切换
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setIndex((v) => (v + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [slides.length, index]);

  if (!slide) return null;

  return (
    <div className="overflow-hidden">
      {/* 左图右文宽屏 Hero：容器比例 = 图片真实比例 2.025:1（405/200）锁定；不再写死像素高度 */}
      <div
        className="hero-grid-rtl-reverse relative grid lg:grid-cols-[1.4fr_1fr] lg:items-stretch"
        style={{
          // 非常浅的蓝：RGB 几乎白，只带 6~9% 的蓝色，肉眼是"带一丝凉意的白"
          background:
            "linear-gradient(135deg,#f6fafd 0%,#eff6fb 30%,#eaf4fb 75%,#f0f6fb 100%)",
        }}
      >
        {/* ===========================================================
            统一打光层（与浅蓝底匹配 → 边缘收暗更淡，几乎看不出来"黑影"）
            =========================================================== */}
        {/* ① 左侧边缘收暗（从 0.42 → 0.22，弱一档，不然浅底上显脏） */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-0 w-[30%] rtl:-scale-x-100 bg-[linear-gradient(90deg,rgba(180,200,222,0.22)_0%,rgba(200,218,236,0.10)_45%,rgba(232,242,250,0)_100%)]"
        />
        {/* ② 右侧边缘收暗（同弱度对称） */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 end-0 w-[30%] rtl:-scale-x-100 bg-[linear-gradient(270deg,rgba(180,200,222,0.22)_0%,rgba(200,218,236,0.10)_45%,rgba(232,242,250,0)_100%)]"
        />
        {/* ③ 统一径向渐晕（外围 0.54 → 0.28，浅底上不要压太黑） */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,rgba(240,248,255,0)_0%,rgba(220,232,244,0.10)_50%,rgba(208,222,236,0.20)_82%,rgba(200,216,230,0.28)_100%)]"
        />
        {/* ④ 顶部中心白微天光（白底上加到 45%，更透气） */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-5%] h-[30%] w-[60%] -translate-x-1/2 rounded-full bg-white/45 blur-[90px]"
        />
        {/* ⑤ 顶部 1px 深灰高光描边（浅底降弱：via-ink/16，不会像一根黑线划顶） */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/16 to-transparent"
        />
        {/* ⑥ 底部 1px 深灰高光描边（浅底降弱） */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent"
        />

        {/* 左：图片区（统一比例锁 2.025:1；图片贴边零间距；三张显示尺寸一致） */}
        <div
          className="relative flex aspect-[405/200] w-full items-center justify-center overflow-hidden border-b border-ink/16 bg-transparent p-0 lg:border-b-0 lg:border-e"
        >
          {/* ==========================================
              SVG 工业水印层（z-0，产品图 z-10 在上；透明度 ~3%，做"画报纸感底纹"不抢图）
              —— 三种纹样对应 3 张轮播：
              • index=0  主产品图 → 齿轮 + 同心轴承环（行星减速器本体语言）
              • index=1  第二张图 → 60° 等距网格（精密加工底座 / 工程视图感）
              • index=2  第三张图 → 蓝图坐标网格 + 中心十字（设计/工程语义）
              ========================================== */}
          {index % 3 === 0 ? (
            /* ① 齿轮 + 同心轴承环（行星减速器语义） */
            <svg
              key="svg-gear"
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 800 480"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* 一个齿的 path：标准 28T 渐开线齿形（简化），复用旋转出整圈 */}
                <g id="gear-tooth-28" stroke="currentColor" strokeWidth="1.6" fill="none" className="text-accent/[0.035]">
                  <path d="M0 -196 L6 -186 L6 -168 L0 -158 L-6 -168 L-6 -186 Z" />
                </g>
              </defs>
              {/* 背景柔化：SVG 网格线整体外层再叠一层径向渐晕，越往边缘越淡 */}
              <defs>
                <radialGradient id="heroBgFade" cx="50%" cy="52%" r="68%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.82)" />
                </radialGradient>
                <mask id="heroBgMask">
                  <rect width="800" height="480" fill="url(#heroBgFade)" />
                </mask>
              </defs>
              <g mask="url(#heroBgMask)">
                {/* 同心轴承环（像行星减速器轴承剖面，5 圈中空圆 + 径向虚线） */}
                <g transform="translate(400 240)" stroke="currentColor" fill="none" className="text-accent/[0.035]">
                  <circle r="196" strokeWidth="1" />
                  <circle r="170" strokeWidth="1.2" strokeDasharray="2 6" />
                  <circle r="142" strokeWidth="1" />
                  <circle r="118" strokeWidth="1" strokeDasharray="3 8" />
                  <circle r="92" strokeWidth="1.2" />
                  {/* 径向 12 根虚线（每 30° 一根） */}
                  {Array.from({ length: 12 }).map((_, k) => (
                    <line
                      key={k}
                      x1="0"
                      y1="-200"
                      x2="0"
                      y2="-92"
                      strokeDasharray="2 5"
                      strokeWidth="0.8"
                      transform={`rotate(${k * 30})`}
                    />
                  ))}
                </g>

                {/* 大齿轮（中心，28T，占左图 78% 宽） */}
                <g transform="translate(400 240)" stroke="currentColor" fill="none" className="text-accent/[0.038]">
                  {/* 外齿圈：28 个齿，每 360/28 ≈ 12.857° 一个 */}
                  <g>
                    {Array.from({ length: 28 }).map((_, k) => (
                      <use key={k} href="#gear-tooth-28" transform={`rotate(${(360 * k) / 28})`} />
                    ))}
                  </g>
                  {/* 齿根圆 + 齿顶圆 */}
                  <circle r="196" strokeWidth="0.8" />
                  <circle r="186" strokeWidth="0.8" />
                  {/* 中圈（轮毂安装面） */}
                  <circle r="86" strokeWidth="1.4" />
                  <circle r="70" strokeWidth="1" />
                  {/* 中心孔 */}
                  <circle r="26" strokeWidth="1.4" />
                  {/* 6 个减重孔（均布） */}
                  {Array.from({ length: 6 }).map((_, k) => {
                    const a = (Math.PI * 2 * k) / 6;
                    const r = 110;
                    return (
                      <circle
                        key={k}
                        cx={Math.cos(a) * r}
                        cy={Math.sin(a) * r}
                        r="18"
                        strokeWidth="1"
                      />
                    );
                  })}
                  {/* 键槽（短矩形） */}
                  <rect x="-5" y="-24" width="10" height="16" rx="1.5" strokeWidth="1" />
                </g>

                {/* 小齿轮 1（右下点缀，16T，约大齿轮的 38%） */}
                <g transform="translate(610 356) scale(0.4)" stroke="currentColor" fill="none" className="text-accent/[0.030]">
                  {Array.from({ length: 16 }).map((_, k) => (
                    <use key={k} href="#gear-tooth-28" transform={`rotate(${(360 * k) / 16})`} />
                  ))}
                  <circle r="196" strokeWidth="0.8" />
                  <circle r="70" strokeWidth="1" />
                  <circle r="22" strokeWidth="1" />
                </g>

                {/* 小齿轮 2（左上角点缀，20T） */}
                <g transform="translate(188 126) scale(0.34)" stroke="currentColor" fill="none" className="text-accent/[0.028]">
                  {Array.from({ length: 20 }).map((_, k) => (
                    <use key={k} href="#gear-tooth-28" transform={`rotate(${(360 * k) / 20})`} />
                  ))}
                  <circle r="196" strokeWidth="0.8" />
                  <circle r="80" strokeWidth="1" />
                  <circle r="22" strokeWidth="1" />
                </g>
              </g>
            </svg>
          ) : index % 3 === 1 ? (
            /* ② 60° 等距网格（精密加工底座 / 等距工程视图） */
            <svg
              key="svg-iso"
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 800 480"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* 外层柔化 mask，跟齿轮那套一致，边缘渐隐 */}
                <radialGradient id="isoFade" cx="50%" cy="52%" r="68%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.82)" />
                </radialGradient>
                <mask id="isoMask">
                  <rect width="800" height="480" fill="url(#isoFade)" />
                </mask>
                {/* 等距网格：一组沿 30°，一组沿 150°，两组相交成菱形。间距 = 36（约屏幕 32px） */}
                <pattern id="isoGrid" width="72" height="41.57" patternUnits="userSpaceOnUse" patternTransform="skewX(0)">
                  {/* 30° 方向：y = tan(30°)x ≈ 0.577x。一个周期 72px 宽、高 72*sin30*2=72 / 根号3？直接画 2 条斜线更准 */}
                  <g stroke="currentColor" strokeWidth="0.7" fill="none" className="text-accent/[0.030]">
                    <line x1="-8" y1="4" x2="80" y2="-42" />
                    <line x1="-8" y1="38" x2="80" y2="-8" />
                  </g>
                  {/* 150° 方向：斜率 = -0.577 */}
                  <g stroke="currentColor" strokeWidth="0.7" fill="none" className="text-accent/[0.030]">
                    <line x1="-8" y1="4" x2="80" y2="50" />
                    <line x1="-8" y1="38" x2="80" y2="84" />
                  </g>
                  {/* 每 5 格加粗：pattern 尺寸= 5*72 太大，用两条更粗的贯穿线在 SVG 根上画（下面） */}
                </pattern>
              </defs>
              <g mask="url(#isoMask)">
                {/* 整个底铺满等距细线 */}
                <rect width="800" height="480" fill="url(#isoGrid)" />
                {/* 中心十字（工程基准） */}
                <g stroke="currentColor" strokeWidth="0.8" fill="none" className="text-accent/[0.050]">
                  <line x1="400" y1="20" x2="400" y2="460" strokeDasharray="4 8" />
                  <line x1="20" y1="240" x2="780" y2="240" strokeDasharray="4 8" />
                </g>
                {/* 加工中心圆（三圈） */}
                <g transform="translate(400 240)" stroke="currentColor" fill="none" className="text-accent/[0.042]">
                  <circle r="42" strokeWidth="0.8" />
                  <circle r="78" strokeWidth="0.8" strokeDasharray="3 6" />
                  <circle r="118" strokeWidth="0.8" />
                </g>
              </g>
            </svg>
          ) : (
            /* ③ 工程蓝图坐标方网格 + 中心十字靶 + 同心刻度环（设计/测量语义） */
            <svg
              key="svg-grid"
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox="0 0 800 480"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <radialGradient id="gridFade" cx="50%" cy="52%" r="68%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.82)" />
                </radialGradient>
                <mask id="gridMask">
                  <rect width="800" height="480" fill="url(#gridFade)" />
                </mask>
                {/* 细蓝方线 1 格 = 16px */}
                <pattern id="bpSmall" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent/[0.028]" />
                </pattern>
                {/* 每 5 格（= 80px）加粗一根主刻度 */}
                <pattern id="bpBig" width="80" height="80" patternUnits="userSpaceOnUse">
                  <rect width="80" height="80" fill="url(#bpSmall)" />
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.9" className="text-accent/[0.060]" />
                </pattern>
              </defs>
              <g mask="url(#gridMask)">
                <rect width="800" height="480" fill="url(#bpBig)" />
                {/* 中心十字靶 */}
                <g transform="translate(400 240)" stroke="currentColor" fill="none">
                  <line x1="-220" y1="0" x2="220" y2="0" strokeWidth="1" className="text-accent/[0.065]" />
                  <line x1="0" y1="-180" x2="0" y2="180" strokeWidth="1" className="text-accent/[0.065]" />
                  {/* 十字端短箭头刻度 */}
                  <line x1="-220" y1="-10" x2="-220" y2="10" strokeWidth="1.2" className="text-accent/[0.085]" />
                  <line x1="220"  y1="-10" x2="220"  y2="10" strokeWidth="1.2" className="text-accent/[0.085]" />
                  <line x1="-10" y1="-180" x2="10" y2="-180" strokeWidth="1.2" className="text-accent/[0.085]" />
                  <line x1="-10" y1="180"  x2="10" y2="180"  strokeWidth="1.2" className="text-accent/[0.085]" />
                  {/* 同心刻度环 4 圈（每 48px 一圈），每圈每隔 10° 一小刻度 */}
                  {[58, 106, 154, 202].map((r, ri) => (
                    <g key={ri}>
                      <circle r={r} strokeWidth={ri % 2 === 0 ? 0.8 : 0.6} className="text-accent/[0.060]" />
                      {Array.from({ length: 36 }).map((_, k) => {
                        const ang = (Math.PI * 2 * k) / 36;
                        const inner = r - (k % 3 === 0 ? 8 : 4);
                        return (
                          <line
                            key={k}
                            x1={Math.cos(ang) * inner}
                            y1={Math.sin(ang) * inner}
                            x2={Math.cos(ang) * r}
                            y2={Math.sin(ang) * r}
                            strokeWidth="0.7"
                            className="text-accent/[0.070]"
                          />
                        );
                      })}
                    </g>
                  ))}
                </g>
                {/* 四角参考刻度线（蓝图图纸边缘） */}
                <g stroke="currentColor" strokeWidth="1" fill="none" className="text-accent/[0.055]">
                  <path d="M 28 48 L 28 28 L 48 28" />
                  <path d="M 772 48 L 772 28 L 752 28" />
                  <path d="M 28 432 L 28 452 L 48 452" />
                  <path d="M 772 432 L 772 452 L 752 452" />
                </g>
              </g>
            </svg>
          )}

          {/* 桌面右侧（lg 有 border-r）中性灰竖分隔线（统一 border-ink/16，不再用 accent 蓝导致分界线色差） */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 end-0 hidden w-px bg-gradient-to-b from-transparent via-ink/18 to-transparent lg:block"
          />
          {/* 中心下方 极浅蓝主聚光灯（浅底上浓度再砍半：30→14%，不糊） */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 bottom-[-10%] h-[62%] w-[78%] -translate-x-1/2 rounded-full bg-sky-400/14 blur-[150px]"
          />
          {/* 产品图左上 极浅蓝补光（14→06%，几乎是个"亮斑"而不是蓝色） */}
          <span
            aria-hidden
            className="pointer-events-none absolute start-[8%] top-[12%] h-[40%] w-[40%] rounded-full bg-sky-300/6 blur-[110px]"
          />
          {/* 产品图（贴边零间距；统一 contain + 0.5% scale 抹平 3 张图比例 ~1% 微差 → 三张显示尺寸完全一致） */}
          <div className="relative z-10 h-full w-full drop-shadow-[0_0_36px_rgba(56,140,190,0.09)]">
            {slides.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
                  i === index ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                {/* ── ① 蒙影「承载背景面」（关键！透明PNG产品图必须有深色背景才能让暗角/颗粒/投影看得到）：棚拍渐变暖黑底 — 从深蓝灰黑到纯黑 */}
                <span
                  aria-hidden
                  className="absolute inset-0 h-full w-full"
                  style={{
                    background:
                      "linear-gradient(160deg,#0d1a2c 0%,#0a1422 30%,#070e18 58%,#050912 82%,#03050b 100%)",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="relative z-[2] h-full w-full scale-[1.005] object-contain object-center"
                />
                {/* ── 蒙影层（去 AI 味 · 叠在 img 之上 = 产品+背景一起被处理，绝对看得出来） ── */}
                {/* ① 暗角vignette（最深 55% 黑）：压暗四边做棚拍边暗，中心产品保留亮 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[3]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 46%,rgba(20,40,60,0) 0%,rgba(20,40,60,0.10) 32%,rgba(20,40,60,0.26) 58%,rgba(8,22,44,0.45) 80%,rgba(4,14,28,0.55) 100%)",
                  }}
                />
                {/* ② 整图冷灰 multiply（10%）：压饱和、压对比，去 AI 过鲜塑料感 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[3] mix-blend-multiply"
                  style={{ background: "rgba(100,112,130,0.10)" }}
                />
                {/* ③ 棚拍主光（soft-light 径向亮）：正面打光，产品中轴更亮 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[3] mix-blend-soft-light"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 44%,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.10) 28%,rgba(255,255,255,0) 60%)",
                  }}
                />
                {/* ④ 颗粒：feTurbulence，独立10%显示（上一版feComposite in被透明SourceGraphic吃光了） */}
                <svg aria-hidden className="pointer-events-none absolute inset-0 z-[3] h-full w-full">
                  <filter id="heroGrain3">
                    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch" />
                    <feColorMatrix values="0 0 0 0 0.34  0 0 0 0 0.40  0 0 0 0 0.50  0 0 0 0.12 0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#heroGrain3)" x="0" y="0" />
                </svg>
                {/* ⑤ 边缘深 inset shadow（去除 AI 图光滑无边的假感，更深更明显） */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[3] rounded-none"
                  style={{
                    boxShadow:
                      "inset 0 0 36px rgba(6,16,32,0.55), inset 0 0 10px rgba(6,16,32,0.65)",
                  }}
                />
                {/* ⑥ 产品底部"着地"投影（产品真的像放在台面上，不是飘） */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 bottom-[6%] z-[3] h-[14%] w-[62%] -translate-x-1/2 rounded-[60%] blur-[26px]"
                  style={{ background: "rgba(2,6,14,0.55)" }}
                />
                {/* ⑦ 整图色温略微偏暖（overlay 3%淡暖），中和 AI 的冷蓝假 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay"
                  style={{ background: "rgba(255,210,155,0.04)" }}
                />
              </div>
            ))}
          </div>

          {/* 指示器（图片区底部居中，玻璃背景） */}
          <div className="glass-strong absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full px-3 py-1.5 md:bottom-5">
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all sm:h-2",
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-ink/30 sm:w-2"
                )}
              />
            ))}
          </div>

          {/* 左右翻页（玻璃按钮） */}
          <div className="absolute bottom-3 end-3 z-20 flex gap-2 md:bottom-5 md:end-5">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => goTo(index - 1)}
              className="glass flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white md:h-9 md:w-9"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="rtl:-scale-x-100">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => goTo(index + 1)}
              className="glass flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white md:h-9 md:w-9"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="rtl:-scale-x-100">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* 右：文案区（lg 双栏时 h-full 跟随左图比例锁死；移动端单列自然高度 — 移除 flex justify-center + overflow-hidden，保证小屏上一定完整展开，不被裁） */}
        <div
          className="relative border-t border-ink/16 bg-transparent p-5 text-ink sm:p-7 md:p-9 lg:h-full lg:border-s lg:border-t-0 lg:flex lg:flex-col lg:justify-center lg:overflow-hidden"
        >
          {/* 桌面左侧（lg 有 border-l）中性灰竖分隔线——与左图 border-r 同为 via-ink/18，合一条不显色差 */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 start-0 hidden w-px bg-gradient-to-b from-transparent via-ink/18 to-transparent lg:block"
          />
          {/* 左下 极浅蓝主聚光灯（25→11%，浅底上只亮不蓝） */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -start-24 h-96 w-96 rounded-full bg-sky-400/11 blur-[140px]"
          />
          {/* 右上 极浅蓝补光（16→07%） */}
          <span
            aria-hidden
            className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-sky-300/7 blur-[130px]"
          />
          {/* 左上白微高光（22→30%，浅底上更自然的亮斑） */}
          <span
            aria-hidden
            className="pointer-events-none absolute start-[8%] top-[6%] h-48 w-48 rounded-full bg-white/30 blur-[90px]"
          />
          <div key={index} className="animate-fade-in-up">
            <h2 className="font-display mb-2 text-[1.125rem] font-semibold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[1.375rem] md:mb-3 md:text-[1.75rem] lg:mb-4 lg:text-[2rem]">
              {slide.title}
            </h2>
            {slide.text ? (
              <div className="text-[0.75rem] font-medium leading-[1.55] tracking-[-0.02em] text-ink-soft md:text-[0.875rem] lg:text-[0.9375rem]">
                <p className="line-clamp-2 md:line-clamp-3">
                  {slide.text}
                </p>
              </div>
            ) : null}
            <div className="mt-auto pt-3 lg:pt-4">
              <a
                href={slide.href}
                className="inline-flex min-h-9 items-center justify-center rounded-btn bg-accent px-5 text-[0.75rem] font-medium leading-none tracking-[-0.01em] text-white transition-opacity hover:opacity-85 md:min-h-11 md:text-[0.875rem]"
              >
                {slide.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
