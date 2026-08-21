---
name: "建站模版"
description: "Bootstrap a Next.js 16 + Tailwind 4 industrial website with i18n (en/ru), inquiry API, responsive UI, and QA tooling. Invoke when a user asks to build a new marketing/product website from scratch using an existing template."
---

# 建站模版 · Next.js 工业外贸官网脚手架

为"Bengbu Planetary（行星减速机 / 机械制造）类工业外贸官网"准备的可落地、多语言、响应式、带询盘表单 + 质量自动化工具的网站模版。直接复制此目录、替换 `src/data/*.generated.json` 内容和 `public/assets/` 产品图片，即可 1 小时内搭出一个新站。

---

## 一、什么时候用

- 用户要做一个**新的企业官网 / 产品官网**（B2B、工业品、外贸、制造业）
- 明确要求：中英双语 / 中俄双语 / 任意 i18n；有询盘表单；有产品列表与详情；有 About / Technology / Certifications / Applications / Customization / Contact 等栏目
- 对 UI 视觉参考 sibgenco.ru（深色渐变、1px 极细线、现代商务混排衬线字体）
- 需要**手机端/桌面端响应式** + 移动端特殊交互（汉堡按钮 hover/touch 展开、浮动询盘条、Tab 滚到展开、产品卡压缩）

有以上任一条件，**优先用这个模版开局**，不要从 `npx create-next-app` 空项目写起。

---

## 二、技术栈与依赖（已锁死）

| 层 | 技术 | 版本/包 |
|----|------|--------|
| 框架 | Next.js (App Router + RSC) | 16.x |
| 样式 | Tailwind CSS | 4.x + `@tailwindcss/postcss` 原生插件 |
| UI 原子类 | CVA + clsx + tailwind-merge | `class-variance-authority` / `clsx` / `tailwind-merge` → `src/lib/cn.ts` |
| 字体（免费商用 SIL OFL） | IBM Plex Sans + IBM Plex Mono + Fraunces + Manrope | `@fontsource/ibm-plex-sans` / `ibm-plex-mono` / `fraunces` / `manrope` |
| 邮件 | Nodemailer（询盘 API 发邮件） | `nodemailer` + `@types/nodemailer` |
| 质量检查 | ESLint 9 + TypeScript 5 + auto-bug-check / auto-rollback 脚本 | 见本页第五节 |

---

## 三、目录结构（必须遵循，不要乱挪组件）

```
项目根/
├─ package.json              ← 固定有 8 条 scripts 入口（dev/build/start/lint/typecheck/check/check:full/rollback/rollback:full）
├─ next.config.ts
├─ postcss.config.mjs        ← Tailwind 4 原生插件（不要写 tailwind.config.js！）
├─ eslint.config.mjs
├─ tsconfig.json
│
├─ src/
│  ├─ app/
│  │   ├─ layout.tsx              ← 纯样式/字体加载层，不包 <html>/<body>
│  │   ├─ [lang]/layout.tsx       ← 真正的 <html lang={locale}>，Header/Footer 挂这里
│  │   ├─ [lang]/page.tsx         ← 首页（Hero + TaskGrid + QuickLinks + Manifesto + ModelRange ...）
│  │   ├─ [lang]/about/page.tsx
│  │   ├─ [lang]/applications/page.tsx
│  │   ├─ [lang]/certifications/page.tsx
│  │   ├─ [lang]/contact/page.tsx
│  │   ├─ [lang]/customization/page.tsx    ← OEM定制流程（ProcessStepper）
│  │   ├─ [lang]/privacy/page.tsx
│  │   ├─ [lang]/products/page.tsx
│  │   ├─ [lang]/products/[slug]/page.tsx  ← 产品详情页（breadcrumb + H1，不能出现 kicker/CTA）
│  │   ├─ [lang]/terms/page.tsx
│  │   ├─ [lang]/technology/page.tsx
│  │   ├─ api/inquiry/route.ts    ← 询盘 POST 接口（Nodemailer 发邮件 + 反垃圾校验）
│  │   ├─ favicon.ico
│  │   ├─ globals.css             ← Tailwind @theme 变量（颜色、圆角、Container、间距）
│  │   ├─ robots.ts
│  │   └─ sitemap.ts
│  │
│  ├─ components/
│  │   ├─ layout/                 ← Header / Footer / MobileMenu / LanguageSwitcher / FloatingQuoteBar / Breadcrumb / QuoteCTA ...
│  │   ├─ ui/                     ← 纯通用：Container、Typography、CTA Button、AutoCollapse
│  │   └─ visual/                 ← 业务视觉：TaskGrid / QuickLinks / ProductCarousel / ImageCarousel / InquiryForm /
│  │                                 ProcessStepper / Intro / MediaText / ModelRange / DarkCTA / NewsGrid / Section /
│  │                                 SectionHeader / ExpandableText / DecoratedImage / TrustList
│  │
│  ├─ hooks/
│  │   └─ use-scroll-collapse.ts  ← 移动端核心交互 Hook：默认折叠，首次下滑展开（>=6px），之后保持；桌面端永远展开
│  │
│  ├─ lib/                        ← 所有纯逻辑 TS 模块（locale / site / nav / products / content /
│  │                                    families / assets / seo / cn(cva+clsx+twmerge)）
│  │
│  └─ data/                       ← 站点数据（JSON 源文件，`scripts/sync-data.mjs` 生成/更新）
│       ├─ site.generated.json    → BRAND、联系方式、社交、邮件 SMTP
│       ├─ nav.generated.json     → 导航条目（label + href + key）
│       ├─ content-en.generated.json
│       ├─ content-ru.generated.json
│       ├─ products.generated.json
│       ├─ families.generated.json
│       ├─ assets.generated.json
│       └─ cutout-assets.ts        → 手动维护：透明 PNG 文件名与放大比例（ASSET-05/07/08 默认 scale-[1.25]）
│
├─ public/
│  ├─ assets/                      ← 产品原图 + 透明PNG(cutout/) + hero 图 + 社交分享图
│  ├─ assets/cutout/               ← 透明背景 PNG（产品卡 hero 用，需做边缘残留白检测）
│  └─ assets/hero/                 ← hero 大图 1/2/3
│
└─ scripts/
   ├─ auto-bug-check.mjs           ← 自动查 Bug 流水线
   ├─ auto-rollback.sh             ← 查到 Bug 自动回滚（git stash → clean check → 默认 restore）
   ├─ sync-data.mjs                ← 数据同步工具（生成 .generated.json / 下载远程图）
   ├─ qa-*.py                      ← 单页 QA 爬虫（页面截图 + 一致性校验）
   └─ audit-*.py / analyze-v2.py   ← 参考站/当前站视觉审计工具
```

---

## 四、改新站的最小替换列表（最快 1 小时上线）

1. **公司/品牌信息**：改 `src/data/site.generated.json` 中 `brandEn / brandRu`、`phone`、`email`、`address`、社交平台链接
2. **导航结构**：`src/data/nav.generated.json`（key + label + href），保持 key 不要动（`nav_about` / `nav_products` / `nav_technology` / `nav_customization` / `nav_certifications` / `nav_applications` / `nav_contact`）— 组件会按 key 简化移动端标签
3. **产品数据**：
   - `src/data/products.generated.json` 产品条目（slug + familyId + assetIdList + 规格参数长文案 en/ru）
   - `src/data/families.generated.json` 产品系列分组（首页轮播 2 行 × 4 列用）
   - `src/data/assets.generated.json` ASSET-0X → 产品图片映射
4. **长内容（About/Customization/Tech 等段落）**：`content-en.generated.json` / `content-ru.generated.json`
5. **产品图**：原图扔进 `public/assets/ASSET-XX.jpg`，透明 PNG 放到 `public/assets/cutout/ASSET-XX.png`（保证背景真透明、边缘无半透明白残留）；hero 3 张替换 `public/assets/hero/[123].png`
6. **询盘邮件**：`src/app/api/inquiry/route.ts` 改 `MAIL_FROM` / `MAIL_TO` / SMTP 配置（或从 `.env` 读）
7. **SEO**：`src/lib/seo.ts` 的 `SITE_NAME` / `pageDescription` 模板、`sitemap.ts`、`robots.ts`

验证跑通：`npm run check`（默认用 `http://localhost:3002` 扫 25 条路由 + 图片）。

---

## 五、自动化 QA / Rollback（必须掌握）

**`package.json` 4 条新入口（本模版强约束）**：

```bash
# 1) 快速 QA：假设本地已有 dev server 在 3002，不启 build
npm run check
# → lint ✅ + tsc ✅ + 25 条路由 HTTP 200 ✅ + SEO(title/desc/lang/canonical) ✅ + 17+ 图片 HEAD 200 ✅

# 2) 完整 QA（含 next build，生产上线前必须跑一次）
npm run check:full
# → 先自己起一个 next dev（找空闲端口），再跑 build，再做全量 HTTP/SEO/IMG

# 3) 自动回滚：查到 Bug 时，自动把未提交改动 git stash 暂存，再跑一次 clean check 确认
npm run rollback
# → 默认会把 stash pop 回来，保留修改让用户继续修
npm run rollback -- --no-restore   # 真的要保持回滚后的干净态，不 pop

# 4) 完整 QA + 回滚
npm run rollback:full
```

`auto-bug-check` 能发现的 Bug（已在本项目实战中找出一例：所有俄文页 `<html lang="en">` 写错）：
- ESLint / TypeScript 错误
- 生产 build 失败 + Warning
- 页面 HTTP 非 200（或 API 路由 5xx）
- SEO：title 缺失 / description 缺失 / lang 与语言路径不匹配 / canonical 缺失 / og 缺失
- 产品/hero 图片 `src` 返回 404/410

---

## 六、移动端强约定（本模版的移动交互已经调通并验证，不要再自作聪明重写）

| 组件 | 交互与样式约定 |
|------|---------------|
| Header 主导航 | 手机端高度 ≤48px（h-12）；左右 `px-4` 内边距"视觉居中一点"避免截断；OEM 标签再简化到 3 字 truncate；LanguageSwitcher 必须在主导航条右侧（折叠时仍可见） |
| MobileMenu 汉堡按钮 | `onPointerEnter`/`onTouchStart` 触达即开（不用点击）；展开后滚动 / 滚轮 / 触摸滑动任一方向移动 ≥2px 立刻关；右上角独立 ❌ 按钮必须是纯白（`!text-white` + `stroke="#ffffff"` + 内联 style 三重兜底，防全局 CSS 覆盖） |
| 折叠 utility 条 | 首次滚下触发 `-translate-y-8`（刚好藏 32px 一行），不要一次性全藏 Header |
| TaskGrid + QuickLinks（Tab 组） | `use-scroll-collapse`：移动端默认极致压缩（gap-1、py-1.5、title 0.75rem），首次下滑 ≥6px 永久展开到桌面样式，不再折回 |
| 底部浮动询盘条 | `md:hidden` fixed 底框 z-50 + safe-area inset；按钮高度 h-9（比原设计减 40%）；单字一行 label；在 `/customization#inquiry-form` 可见度 ≥25% 时自动隐藏（避免挡表单） |
| 产品图片 | ASSET-05/07/08 默认 `scale-[1.25]` 全站点放大；透明 PNG 优先，否则回退原图 |

不要违反"AGENTS.md / project_memory.md 里的硬约束"（如：除首页 hero 外其他页面非宽屏、产品列表无图只显示 120px 灰条、About/Tech 图文 1:1 比 py-10 md:py-14、产品详情页 hero 只有 breadcrumb+H1 等）。

---

## 七、启动命令速查

```bash
# 一次性装完所有依赖
npm install

# 开发模式（热更新）
npm run dev           # 默认 3000 端口
# 推荐：固定端口 + 本地 QA 脚本配合
npm run dev -- --port 3002

# 生产构建 + 起服务
npm run build
npm run start -- --port 3002

# 上线前质量检查
npm run check         # 1 分钟快速过（假设已有服务 :3002）
npm run check:full    # 包含 build + 自启动 dev，5-10 分钟
```

---

## 八、不要做的事（踩过的坑）

- ❌ 不要把 `<html lang>` 写死在 `app/layout.tsx`；必须放到 `app/[lang]/layout.tsx` 里按 locale 动态写，否则俄文/非英文语言的 SEO 全错
- ❌ 不要新建 `tailwind.config.js`（Tailwind v4 用 `globals.css` 里的 `@theme` 块，否则 1. 白跑 2. 变量覆盖顺序乱）
- ❌ 不要把 LanguageSwitcher 只放在 utility 行（折叠会把它顶走，移动端就看不见切换了）
- ❌ 汉堡按钮的关闭 ❌ 不要只用 className 的 `text-white`（全局 CSS 容易覆盖），务必 `!text-white` + 内联 `style={{color:"#fff"}}` + SVG `stroke="#ffffff"` 三层写死
- ❌ 不要给产品卡"无图时放占位图"，必须是 120px 灰色条 + 产品 ID 文字
- ❌ 不要删除页面已有组件（项目约束："http://localhost:3002 上已有组件不能删，只能新增"）

---

## 九、下一步建议（新站初始化 checklist）

- [ ] 复制整个目录到新 workspace；`rm -rf .next node_modules package-lock.json reports .playwright-cli`（保留源码、图片、scripts、SKILL.md）
- [ ] `npm install`
- [ ] 按"第四部分"替换 site/nav/products/content 数据与产品图
- [ ] `npm run dev -- --port 3002` → 肉眼走一遍 9 个中/俄页面
- [ ] `npm run check:full` 跑完整 QA，全部 ✅ 再交付
- [ ] 新建一个"项目决策记录"飞书 wiki（参考 AGENTS.md），把新站特殊约定、字体选择、视觉参考 URL 归档
