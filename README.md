# HISVIA Web

Next.js 14 (App Router) + Tailwind CSS scaffold for the HISVIA industrial supply chain website.

## 已完成（可运行、内容已定稿）

- `/[locale]` 路由结构，支持 `en` / `ru` / `zh`（`app/[locale]/layout.tsx`），根路径重定向到 `/en`
- 字体：Archivo（展示）+ IBM Plex Sans（正文，含 Cyrillic 子集）+ IBM Plex Mono（数据/编号）
- 设计令牌在 `tailwind.config.ts`：`navy` `steel` `graphite` `fog` `line` `amber`
- 共用组件：`Header` `Footer` `SectionHead` `PrimaryButton` `GhostButton` `PlaceholderPhoto`（`components/`）
- 已完整实现的页面：
  - `app/[locale]/page.tsx` — Home（Hero / Positioning / Partner Benefits / How We Work / Manufacturing Capability / Industrial Domains / Quality Control + Supply Chain Network / Compatible Solutions 预览 / CTA）
  - `app/[locale]/submit-requirement/page.tsx` — 工业需求提交表单
  - `app/[locale]/manufacturing-capability/page.tsx` — 制造能力页
  - `app/[locale]/compatible-solutions/page.tsx` — 品牌兼容页（含免责声明）

## 待完善（骨架已搭好，内容是占位）

以下页面目前用 `components/PageShell.tsx` 渲染占位内容（标题/说明/页面用途已定，正文待设计）：

`about` `partnership-model` `how-we-work` `solutions/*`（7个）`partners/*`（3个）`quality-control` `supply-chain-network` `faq` `contact`

这些页面的信息架构和内容策略已经在项目讨论中确认，下一步是逐个替换 `PageShell` 为完整设计（参考 `manufacturing-capability` 和 `compatible-solutions` 的实现方式）。

## 未接入

- 真实图片（`PlaceholderPhoto` 组件标注了应放什么内容，需替换为授权工业摄影）
- 多语言文案（当前所有语言路由渲染的是同一份英文文案，`messages/` 目录已建好，尚未接入翻译字典和实际取词逻辑）
- 表单提交后端（当前 `submit-requirement` 表单为纯前端展示，未接 API）

## 运行

```bash
npm install
npm run dev
```
