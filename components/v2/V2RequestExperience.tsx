"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { queryAssets, getAssetForSlot, resolveAsset } from "@/lib/content-v2/asset-library";
import { getCapabilities, getIndustryPages } from "@/lib/content-v2/content-loader";
import type { CapabilityItem } from "@/lib/content-v2/content-loader";
import type { Locale } from "@/lib/locales";
import type { AssetEntry } from "@/lib/content-v2/types";
import factoryTrust from "@/data/content-v2/factory-trust.json";

/* ============================================================
   HISVIA REQUEST EXPERIENCE — sourcing workflow component

   Used by:
   - /v2/[locale]/request (production sourcing flow)
   - /v-next (dev preview, ?lang= param)

   Owns: ENTRY → UNDERSTAND → EXPLORE → EVIDENCE → VERIFY → CONNECT.
   Homepage (V2HomepageBrand) never imports this component.

   Structure:
   01 ENTRY/HERO (brand + task entry, no fake data)
   02 UNDERSTAND (in-place requirement summary + missing info)
   03 EXPLORE (capability / material / application selection)
   04 EVIDENCE (4 evidence groups → View matching factories)
   05 FACTORY / VERIFY (clusters, match reasoning, missing info)
   06 HOW HISVIA WORKS (6 steps matching the real flow)
   07 TRUST / QUALITY CONTROL (HISVIA process vs factory standard)
   08 PARTNERSHIP (Chinese factories + market access + demand)
   09 CONNECT (single sourcing CTA, context inherited)

   i18n: locale prop (route locale or ?lang=), EN complete,
   RU/ZH dictionary with EN fallback. No second i18n system.
   ============================================================ */

/* ---------- tokens ---------- */
const PAPER = "#F3F2EC";
const PAPER_D = "#E9E7DF";
const INK = "#17191A";
const DIM = "#6E7377";
const FAINT = "#A7A9A4";
const LINE = "#D8D6CD";
const LINE_D = "#C4C1B6";
const ACCENT = "#E34D0E";
const AMBER = "#9A6B00";
const NIGHT = "#101315";
const MONO = `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
const DISPLAY = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CSS = `
  .vnext { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; background: ${PAPER}; color: ${INK}; }
  .vnext .mono { font-family: ${MONO}; }
  .vnext .display { font-family: ${DISPLAY}; }
  .vnext ::selection { background: rgba(227,77,14,0.22); }
  .vnext textarea { resize: none; }
  .vnext textarea::placeholder { color: ${FAINT}; }
  .vnext button { cursor: pointer; }
`;

/* ============================================================
   i18n — existing project locale pattern, ?lang= param, EN fallback
   ============================================================ */

const DICT: Record<string, { en: string; ru: string; zh: string }> = {
  nav_explore: { en: "Explore capabilities", ru: "Возможности", zh: "能力探索" },
  nav_verify: { en: "Factory verification", ru: "Проверка заводов", zh: "工厂验证" },
  nav_start: { en: "Start sourcing", ru: "Начать закупку", zh: "开始采购" },
  tagline: { en: "China Industrial Supply Chain Partner", ru: "Китайский партнёр по пром. цепочкам поставок", zh: "中国工业供应链合作伙伴" },
  entry_eyebrow: { en: "Enter China's industrial supply chain here", ru: "Вход в пром. цепочку поставок Китая", zh: "从这里进入中国工业供应链" },
  h1a: { en: "Describe what you need.", ru: "Опишите, что вам нужно.", zh: "描述您的需求。" },
  h1b: { en: "We find the Chinese factory that can build it.", ru: "Мы найдём китайский завод, который это произведёт.", zh: "我们找到能制造它的中国工厂。" },
  entry_sub: { en: "Start a sourcing task in plain language. HISVIA understands the requirement, maps the manufacturing path, shows you the evidence, and connects you to a verified Chinese partner.", ru: "Опишите задачу закупки простым языком. HISVIA поймёт требование, определит путь производства, покажет доказательства и свяжет с проверенным китайским партнёром.", zh: "用自然语言开始采购任务。HISVIA 理解需求、规划制造路径、展示证据，并为您对接经核验的中国合作伙伴。" },
  task_label: { en: "Start a sourcing task", ru: "Начать задачу закупки", zh: "开始采购任务" },
  task_01: { en: "Task 01", ru: "Задача 01", zh: "任务 01" },
  task_placeholder: { en: "Describe the part — material, quantity, tolerance, certification…", ru: "Опишите деталь — материал, количество, допуски, сертификация…", zh: "描述零件——材料、数量、公差、认证……" },
  start_task: { en: "Start task", ru: "Начать", zh: "开始任务" },
  upload_spec: { en: "Upload specification", ru: "Загрузить спецификацию", zh: "上传规格" },
  browse_caps: { en: "Browse manufacturing capabilities", ru: "Обзор возможностей", zh: "浏览制造能力" },
  examples_label: { en: "Real sourcing scenarios — click to start", ru: "Реальные сценарии — нажмите", zh: "真实采购场景——点击开始" },
  network_covers: { en: "Network covers", ru: "Сеть охватывает", zh: "网络覆盖" },
  positioning: { en: "China Industrial Supply Chain Partner — connects global industrial buyers with verified Chinese manufacturing capability.", ru: "Китайский партнёр по цепочкам поставок — связывает мировых покупателей с проверенными производственными возможностями Китая.", zh: "中国工业供应链合作伙伴——连接全球工业买家与经核验的中国制造能力。" },
  summary_label: { en: "Requirement summary", ru: "Сводка требований", zh: "需求摘要" },
  edit_task: { en: "Edit task", ru: "Изменить", zh: "编辑任务" },
  continue_caps: { en: "Continue to capability selection →", ru: "К выбору возможностей →", zh: "继续能力选择 →" },
  qualified_caps: { en: "Qualified manufacturing capabilities identified", ru: "Определены подходящие возможности", zh: "已识别匹配的制造能力" },
  missing_prefix: { en: "Missing information:", ru: "Отсутствует информация:", zh: "缺失信息：" },
  missing_suffix: { en: "add these to tighten factory matching.", ru: "добавьте для уточнения подбора.", zh: "补充这些以收紧匹配。" },
  journey_label: { en: "Manufacturing capability journey", ru: "Путь производственных возможностей", zh: "制造能力旅程" },
  journey_verified: { en: "Verified · ISO 9001 · Export-ready", ru: "Проверено · ISO 9001 · Экспорт", zh: "已验证 · ISO 9001 · 可出口" },
  why_spec: { en: 'Specialization matches "{k}" with {c}', ru: 'Специализация соответствует "{k}" с {c}', zh: '专业化匹配 "{k}" 与 {c}' },
  why_proc: { en: 'Process capability "{c}" is served in this cluster (region capability map)', ru: 'Возможность "{c}" представлена в этом кластере (карта возможностей региона)', zh: '制造能力 "{c}" 在该集群中可提供（区域能力地图）' },
  cover_machining: { en: "Machining", ru: "Механообработка", zh: "机加工" },
  cover_casting: { en: "Casting", ru: "Литьё", zh: "铸造" },
  cover_hydraulics: { en: "Hydraulics", ru: "Гидравлика", zh: "液压" },
  cover_pneumatics: { en: "Pneumatics", ru: "Пневматика", zh: "气动" },
  cover_automation: { en: "Automation", ru: "Автоматизация", zh: "自动化" },
  cover_oem: { en: "OEM", ru: "OEM", zh: "OEM" },
  cover_export: { en: "Export", ru: "Экспорт", zh: "出口" },
  explore_step: { en: "Step 2 · Explore", ru: "Шаг 2 · Поиск", zh: "第 2 步 · 探索" },
  explore_title: { en: "Explore China's manufacturing capability", ru: "Производственные возможности Китая", zh: "探索中国制造能力" },
  explore_desc: { en: "Select a process, material and application. Each selection produces evidence — and every evidence leads to the factory clusters that can deliver it.", ru: "Выберите процесс, материал и применение. Каждый выбор даёт доказательства, ведущие к подходящим кластерам заводов.", zh: "选择工艺、材料与应用。每项选择都会产生证据，每项证据都通向能交付的工厂集群。" },
  process_label: { en: "Process", ru: "Процесс", zh: "工艺" },
  material_label: { en: "Material", ru: "Материал", zh: "材料" },
  application_label: { en: "Application", ru: "Применение", zh: "应用" },
  evidence_panel: { en: "Evidence panel", ru: "Панель доказательств", zh: "证据面板" },
  live_note: { en: "Live · every evidence leads to factories", ru: "В реальном времени · доказательства ведут к заводам", zh: "实时 · 每项证据都通向工厂" },
  cap_evidence: { en: "Capability evidence", ru: "Доказательство возможностей", zh: "能力证据" },
  mat_evidence: { en: "Material evidence", ru: "Доказательство материалов", zh: "材料证据" },
  app_evidence: { en: "Application evidence", ru: "Доказательство применения", zh: "应用证据" },
  fact_evidence: { en: "Factory verification evidence", ru: "Доказательство проверки заводов", zh: "工厂验证证据" },
  view_factories: { en: "View matching factories →", ru: "Подходящие заводы →", zh: "查看匹配工厂 →" },
  mat_hint: { en: "Select a material to see which of the 8 capabilities support it (derived from capability data).", ru: "Выберите материал, чтобы увидеть поддерживающие возможности.", zh: "选择材料以查看支持的制造能力。" },
  app_hint: { en: "Select an application to see real industry pain points and relevant systems (industry-pages data).", ru: "Выберите применение, чтобы увидеть реальные задачи отрасли.", zh: "选择应用以查看真实行业痛点与相关系统。" },
  relevant_clusters: { en: "Relevant manufacturing clusters", ru: "Соответствующие кластеры", zh: "相关制造集群" },
  verify_step: { en: "Step 3 · Verify", ru: "Шаг 3 · Проверка", zh: "第 3 步 · 验证" },
  verify_title: { en: "Matching factory clusters", ru: "Подходящие заводские кластеры", zh: "匹配的工厂集群" },
  verify_desc: { en: "Your current selection was carried forward from the evidence panel. Clusters show why they match, which capabilities support the match, and what information is still missing.", ru: "Ваш выбор перенесён из панели доказательств. Кластеры показывают, почему они подходят и чего не хватает.", zh: "当前选择已从证据面板带入。集群显示匹配原因、支撑能力与缺失信息。" },
  requirement_label: { en: "Requirement", ru: "Требование", zh: "需求" },
  capability_label: { en: "Capability", ru: "Возможность", zh: "能力" },
  matapp_label: { en: "Material / application", ru: "Материал / применение", zh: "材料 / 应用" },
  standard_label: { en: "Verification standard", ru: "Стандарт проверки", zh: "验证标准" },
  clusters_label: { en: "Matching clusters", ru: "Кластеры", zh: "匹配集群" },
  why_match: { en: "Why it matches", ru: "Почему подходит", zh: "匹配原因" },
  matched_caps: { en: "Matched capabilities", ru: "Соответствующие возможности", zh: "匹配的能力" },
  verif_signals: { en: "Verification signals", ru: "Сигналы проверки", zh: "验证信号" },
  missing_label: { en: "Missing information", ru: "Отсутствующая информация", zh: "缺失信息" },
  quality_evidence: { en: "Quality evidence · inspection", ru: "Доказательство качества · контроль", zh: "质量证据 · 检测" },
  production_ops: { en: "Production operations · fabrication", ru: "Производственные операции", zh: "生产运营 · 制造" },
  start_with_cluster: { en: "Start a sourcing request with this cluster →", ru: "Начать закупку с этим кластером →", zh: "从此集群发起采购 →" },
  how_label: { en: "How HISVIA works", ru: "Как работает HISVIA", zh: "HISVIA 如何运作" },
  how_desc: { en: "The page you are on performs steps 01–05 live. Every step matches the actual flow — nothing is simulated.", ru: "Эта страница выполняет шаги 01–05 в реальном времени. Каждый шаг соответствует реальному процессу.", zh: "本页面实时执行第 1–5 步。每一步都与实际流程一致，无模拟。" },
  trust_label: { en: "Trust & quality control", ru: "Доверие и контроль качества", zh: "信任与质量控制" },
  trust_hisvia: { en: "HISVIA verification process — what we do", ru: "Процесс проверки HISVIA — что мы делаем", zh: "HISVIA 验证流程——我们做什么" },
  trust_factory: { en: "Factory-side standard — what factories must prove", ru: "Стандарт заводов — что они доказывают", zh: "工厂侧标准——工厂必须证明什么" },
  trust_note: { en: "Network-level standards are real and published. Per-factory documents (equipment lists, certification numbers, production capacity) are collected during the sourcing process — never claimed before verification.", ru: "Стандарты сети реальны и опубликованы. Документы каждого завода собираются в процессе закупки и не заявляются до проверки.", zh: "网络级标准真实且公开。工厂级文件（设备清单、认证编号、产能）在采购流程中收集，未经验证不作声称。" },
  partner_label: { en: "Partnership", ru: "Партнёрство", zh: "合作" },
  partner_lead: { en: "Chinese factories + HISVIA overseas market access + actual sourcing demand + order-based cooperation.", ru: "Китайские заводы + доступ HISVIA к рынкам + реальный спрос + заказное сотрудничество.", zh: "中国工厂 + HISVIA 海外市场渠道 + 真实采购需求 + 订单式合作。" },
  partner_markets: { en: "Target markets", ru: "Целевые рынки", zh: "目标市场" },
  partner_cta: { en: "Become a verified supplier →", ru: "Стать проверенным поставщиком →", zh: "成为已验证供应商 →" },
  connect_step: { en: "Step 4 · Connect", ru: "Шаг 4 · Подключение", zh: "第 4 步 · 对接" },
  connect_title: { en: "Start your sourcing request", ru: "Начните запрос на закупку", zh: "开始您的采购请求" },
  connect_desc: { en: "Your requirement context carries forward automatically — summary, capability, material, application and known gaps. Confirm it, attach drawings, and we route it to the matching verified factories.", ru: "Контекст требований переносится автоматически. Подтвердите его, приложите чертежи — мы направим его подходящим заводам.", zh: "需求上下文自动带入——摘要、能力、材料、应用与已知缺口。确认后上传图纸，我们将路由至匹配的验证工厂。" },
  context_carried: { en: "Requirement context carried forward", ru: "Контекст требований перенесён", zh: "需求上下文已带入" },
  known_gaps: { en: "Known gaps:", ru: "Известные пробелы:", zh: "已知缺口：" },
  request_label: { en: "Sourcing request", ru: "Запрос на закупку", zh: "采购请求" },
  price_qty: { en: "Target price / quantity", ru: "Целевая цена / количество", zh: "目标价格 / 数量" },
  delivery: { en: "Expected delivery", ru: "Ожидаемая поставка", zh: "预期交付" },
  email: { en: "Business email", ru: "Рабочий e-mail", zh: "商务邮箱" },
  submit_btn: { en: "Start sourcing", ru: "Начать закупку", zh: "开始采购" },
  supplier_path: { en: "Are you a manufacturer? → Become a verified supplier", ru: "Вы производитель? → Станьте проверенным поставщиком", zh: "您是制造商？→ 成为已验证供应商" },
  created: { en: "Sourcing request created", ru: "Запрос на закупку создан", zh: "采购请求已创建" },
  client_note: { en: "Submitted to the HISVIA sourcing queue. Our team reviews your requirement and responds to your email.", ru: "Отправлено в очередь закупок HISVIA. Наша команда рассмотрит запрос и ответит на вашу почту.", zh: "已提交至 HISVIA 采购队列。团队将审核需求并通过邮件回复您。" },
  submitting: { en: "Submitting…", ru: "Отправка…", zh: "提交中…" },
  next_steps: { en: "Next: requirement review · factory shortlist · sample & first-article verification · production tracking", ru: "Далее: анализ запроса · шорт-лист заводов · проверка образца и первого изделия · контроль производства", zh: "下一步：需求审核 · 工厂短名单 · 样品与首件验证 · 生产跟踪" },
  reference: { en: "Reference", ru: "Номер запроса", zh: "请求编号" },
  attached: { en: "attached", ru: "прикреплено", zh: "已附加" },
  missing_lbl: { en: "Missing information", ru: "Отсутствующая информация", zh: "缺失信息" },
  req_gap: { en: "Requirement gap:", ru: "Пробел в требованиях:", zh: "需求缺口：" },
  net_band: { en: "Verified Chinese manufacturing network", ru: "Проверенная производственная сеть Китая", zh: "经核验的中国制造网络" },
  lbl_product: { en: "Product", ru: "Продукт", zh: "产品" },
  lbl_industry: { en: "Industry", ru: "Отрасль", zh: "行业" },
  lbl_process: { en: "Process", ru: "Процесс", zh: "工艺" },
  lbl_requirement: { en: "Requirement", ru: "Требование", zh: "需求" },
  lbl_material: { en: "Material", ru: "Материал", zh: "材料" },
  lbl_certification: { en: "Certification", ru: "Сертификация", zh: "认证" },
  lbl_capability: { en: "Capability", ru: "Возможность", zh: "能力" },
  lbl_application: { en: "Application", ru: "Применение", zh: "应用" },
  journey_mat: { en: "Material", ru: "Материал", zh: "材料" },
  journey_mat_sub: { en: "Steel · aluminum · alloys", ru: "Сталь · алюминий · сплавы", zh: "钢材 · 铝材 · 合金" },
  journey_proc: { en: "Process", ru: "Процесс", zh: "工艺" },
  journey_proc_sub: { en: "CNC · casting · forging", ru: "CNC · литьё · ковка", zh: "CNC · 铸造 · 锻造" },
  journey_asm: { en: "Assembly", ru: "Сборка", zh: "装配" },
  journey_asm_sub: { en: "Lines · pressure testing", ru: "Линии · испытания давлением", zh: "产线 · 压力测试" },
  journey_qual: { en: "Quality", ru: "Качество", zh: "质量" },
  journey_qual_sub: { en: "CMM · first-article", ru: "КИМ · первый образец", zh: "三坐标 · 首件" },
  journey_exp: { en: "Export", ru: "Экспорт", zh: "出口" },
  journey_exp_sub: { en: "30+ markets · incoterms", ru: "30+ рынков · инкотермс", zh: "30+ 市场 · 贸易术语" },
  ex1: { en: "Mining hydraulic replacement", ru: "Замена гидравлики для горной техники", zh: "矿山液压替换件" },
  ex1b: { en: "replacement hydraulic parts for mining equipment", ru: "замена гидравлических деталей для горной техники", zh: "矿山设备液压替换零件" },
  ex2: { en: "CNC valve bodies, 500 pcs", ru: "Корпуса клапанов на CNC, 500 шт", zh: "CNC 阀体 500 件" },
  ex2b: { en: "CNC machined valve bodies, aluminum, 500 pcs", ru: "корпуса клапанов, алюминий, 500 шт", zh: "CNC 加工铝制阀体 500 件" },
  ex3: { en: "Compressor casing casting", ru: "Литьё корпуса компрессора", zh: "压缩机壳体铸造" },
  ex3b: { en: "cast compressor casings, alloy steel", ru: "литьё корпусов компрессора, легированная сталь", zh: "合金钢压缩机壳体铸造" },
  mat_none: { en: "No capability in the network lists {m} — check the material list or consult a sourcing engineer.", ru: "В сети нет возможности с материалом {m} — проверьте список или обратитесь к инженеру.", zh: "网络中暂无列出 {m} 的制造能力——请检查材料列表或咨询采购工程师。" },
  app_none: { en: "No industry coverage mapped for this application in the current data.", ru: "Для этого применения в текущих данных нет покрытия по отраслям.", zh: "当前数据中尚无该应用对应的行业覆盖。" },
  fact_none: { en: "No cluster currently mapped for this combination — the network data is being extended.", ru: "Для этой комбинации кластеры пока не определены — данные сети расширяются.", zh: "该组合暂未映射集群——网络数据正在扩展。" },
  verify_none: { en: "No clusters mapped for this selection yet — network data is being extended.", ru: "Для этого выбора кластеры ещё не определены — данные сети расширяются.", zh: "该选择暂未映射集群——网络数据正在扩展。" },
  cm1: { en: "Per-factory equipment list (collected at verification)", ru: "Список оборудования завода (собирается при проверке)", zh: "工厂设备清单（验证时收集）" },
  cm2: { en: "Certification numbers per factory", ru: "Номера сертификатов каждого завода", zh: "各工厂认证编号" },
  cm3: { en: "Production capacity per factory", ru: "Производственная мощность каждого завода", zh: "各工厂产能" },
  how1: { en: "Tell us what you need", ru: "Расскажите, что вам нужно", zh: "告诉我们您的需求" },
  how1d: { en: "Describe the part or upload a drawing in the entry panel.", ru: "Опишите деталь или загрузите чертёж.", zh: "在入口区域描述零件或上传图纸。" },
  how2: { en: "We structure the requirement", ru: "Мы структурируем запрос", zh: "我们结构化需求" },
  how2d: { en: "Product, industry, process, material, certification — and what is still missing.", ru: "Продукт, отрасль, процесс, материал, сертификация — и чего не хватает.", zh: "产品、行业、工艺、材料、认证——以及缺失信息。" },
  how3: { en: "We identify relevant capabilities", ru: "Определяем подходящие возможности", zh: "识别相关制造能力" },
  how3d: { en: "Your selection maps to the manufacturing capabilities in the network data.", ru: "Ваш выбор сопоставляется с возможностями в данных сети.", zh: "您的选择映射到网络数据中的制造能力。" },
  how4: { en: "We verify factory evidence", ru: "Проверяем доказательства", zh: "核实工厂证据" },
  how4d: { en: "Capability, material, application and cluster evidence — with matching reasons.", ru: "Доказательства по возможностям, материалам, применению и кластерам — с причинами.", zh: "能力、材料、应用与集群证据——附匹配原因。" },
  how5: { en: "We connect qualified suppliers", ru: "Подключаем подходящих поставщиков", zh: "对接合格供应商" },
  how5d: { en: "Matching clusters are shown with why they match and verification signals.", ru: "Показаны подходящие кластеры с причинами и сигналами проверки.", zh: "展示匹配集群、匹配原因与验证信号。" },
  how6: { en: "You receive a sourcing response", ru: "Вы получаете ответ по закупке", zh: "您收到采购响应" },
  how6d: { en: "Submit the sourcing request — you get a reference and a response timeline.", ru: "Отправьте запрос — получите номер и план ответа.", zh: "提交采购请求——获得参考号与响应时间线。" },
  edit_request: { en: "Edit request", ru: "Изменить запрос", zh: "编辑请求" },
};

/* ============================================================
   ASSET RESOLUTION — Asset Library only
   ============================================================ */
interface ResolvedAsset {
  asset: AssetEntry | null;
  role: string;
}

function resolveHero(): ResolvedAsset {
  const pinned = resolveAsset("asset-aaffd50c");
  if (pinned) return { asset: pinned, role: "hero_capability_floor" };
  const fallback = getAssetForSlot({ page: "homepage", slot: "hero", count: 1 });
  if (fallback.asset) return { asset: fallback.asset, role: "hero_candidate" };
  return { asset: null, role: "hero_candidate" };
}

function resolveOne(pin: string, role: string): ResolvedAsset {
  const asset = resolveAsset(pin) ?? queryAssets({
    visual_role: ["technical_detail"],
    min_quality: 40,
    sort_by: "quality_score",
    limit: 1,
  })[0] ?? null;
  return { asset, role };
}

const HERO = resolveHero();
const EVIDENCE: Record<string, ResolvedAsset> = {
  cnc_machining: resolveOne("asset-legacy-30734aea", "process_cnc"),
  casting_forging: resolveOne("asset-legacy-9e19be1c", "process_casting"),
  assembly_testing: resolveOne("asset-legacy-9148b3bd", "process_assembly"),
  surface_treatment: resolveOne("asset-legacy-59cc7b33", "process_surface"),
  oem_customization: resolveOne("asset-legacy-876f9349", "process_oem"),
  quality_control: resolveOne("asset-legacy-2b3df8ac", "proof_inspection"),
  export_logistics: resolveOne("asset-fedb1a7f", "proof_export"),
  reverse_engineering: resolveOne("asset-legacy-ea2caf9b", "process_reverse"),
};
const VERIFY_QUALITY = resolveOne("asset-legacy-239f8a12", "proof_inspection");
const VERIFY_STORY = resolveOne("asset-legacy-42c6a40b", "story_production");

const JOURNEY_PINS: Array<{ lk: string; sk: string; pin: string; role: string }> = [
  { lk: "journey_mat", sk: "journey_mat_sub", pin: "asset-legacy-af6646f1", role: "journey_material" },
  { lk: "journey_proc", sk: "journey_proc_sub", pin: "asset-legacy-6bfe8d02", role: "journey_process" },
  { lk: "journey_asm", sk: "journey_asm_sub", pin: "asset-legacy-868d30c5", role: "journey_assembly" },
  { lk: "journey_qual", sk: "journey_qual_sub", pin: "asset-legacy-f220651f", role: "journey_quality" },
  { lk: "journey_exp", sk: "journey_exp_sub", pin: "asset-ee310d98", role: "journey_export" },
];

/* ============================================================
   CONTENT — real repo data
   ============================================================ */
const CAPABILITIES = getCapabilities();
const REGIONS = factoryTrust.manufacturing_network.regions;
const TRUST = factoryTrust.trust_signals;
const INDUSTRIES = getIndustryPages();

const COVERS = ["cover_machining", "cover_casting", "cover_hydraulics", "cover_pneumatics", "cover_automation", "cover_oem", "cover_export"];

const MATERIALS = ["Steel", "Stainless", "Aluminum", "Engineering plastic"];
const APPLICATIONS = ["Hydraulics", "Pneumatics", "Automation", "Mining", "Construction"];

const CAP_FACTS: Record<string, { equipment: string; tolerance: string; materials: string; inspection: string }> = {
  cnc_machining: { equipment: "Multi-axis CNC turning & milling centers", tolerance: "±0.01mm", materials: "Carbon steel · stainless · aluminum · brass · engineering plastics", inspection: "In-process inspection · CMM" },
  casting_forging: { equipment: "Sand / investment / die casting · open & closed-die forging", tolerance: "Casting grade to machined grade", materials: "Alloy steels · up to super duplex stainless", inspection: "Material certificates 3.1/3.2 · dimensional report" },
  assembly_testing: { equipment: "In-house assembly lines & test benches", tolerance: "Per assembly spec", materials: "Per customer BOM", inspection: "ISO 1217 compressor test · API 598 valve pressure test" },
  surface_treatment: { equipment: "Electroplating · anodizing · powder coating lines", tolerance: "Coating thickness per spec", materials: "Metals · corrosion protection", inspection: "Coating tests · VCI export packaging" },
  oem_customization: { equipment: "Custom manufacturing · private labeling", tolerance: "Per drawing / sample", materials: "Customer-specified", inspection: "First-article · sample approval" },
  quality_control: { equipment: "ISO 9001 quality system · CMM · NDT (UT/MT/PT/RT)", tolerance: "Verified to drawing", materials: "Material certs EN 10204 3.1/3.2", inspection: "Third-party inspection · SGS / BV / TÜV" },
  export_logistics: { equipment: "Sea & rail freight · container loading supervision", tolerance: "—", materials: "—", inspection: "Export documentation · Certificate of Origin" },
  reverse_engineering: { equipment: "3D scanning & measurement", tolerance: "Matched to OEM spec", materials: "Material analysis & matching", inspection: "Sample production vs OEM spec" },
};

const CAP_REGIONS: Record<string, string[]> = {
  cnc_machining: ["Guangdong", "Zhejiang"],
  casting_forging: ["Zhejiang"],
  assembly_testing: ["Shanghai / Jiangsu", "Guangdong"],
  surface_treatment: ["Zhejiang", "Guangdong"],
  oem_customization: ["Guangdong", "Zhejiang"],
  quality_control: ["Shanghai / Jiangsu", "Zhejiang"],
  export_logistics: REGIONS.map((r) => r.region),
  reverse_engineering: ["Guangdong"],
};

const APPLICATION_INDUSTRY: Record<string, string | null> = {
  Hydraulics: null,
  Pneumatics: "manufacturing",
  Automation: "manufacturing",
  Mining: "mining",
  Construction: "construction",
};

const EXAMPLES = [
  { tk: "ex1", bk: "ex1b" },
  { tk: "ex2", bk: "ex2b" },
  { tk: "ex3", bk: "ex3b" },
];

/* ============================================================
   REQUIREMENT UNDERSTANDING — honest rule-based parse
   ============================================================ */
interface ParsedRequirement {
  product: string;
  industry: string;
  process: string;
  requirement: string;
  material: string;
  certification: string;
  missing: string[];
}

function parseRequirement(text: string): ParsedRequirement {
  const t = text.toLowerCase();
  const has = (...keys: string[]) => keys.some((k) => t.includes(k));
  const missing: string[] = [];
  const material = has("aluminum", "aluminium", "alu") ? "Aluminum"
    : has("steel", "stainless") ? "Steel / stainless"
    : has("plastic", "nylon", "pom") ? "Engineering plastic"
    : ((missing.push("Material"), "Unknown"));
  const quantity = has("500") || /\d+\s*(pcs|pieces|units|qty)/.test(t) ? "Quantity parsed" : null;
  if (!quantity) missing.push("Quantity");
  const destination = has("germany", "europe", "usa", "america", "russia", "export", "shipping") ? "Export destination parsed" : null;
  if (!destination) missing.push("Destination");

  if (has("hydraulic") && has("mining")) {
    return { product: "Hydraulic replacement parts", industry: "Mining", process: "Machining / Casting", requirement: "Replacement application", material, certification: has("iso 9001") ? "ISO 9001 (explicit)" : "ISO 9001 preferred", missing };
  }
  if (has("hydraulic")) {
    return { product: "Hydraulic components", industry: "General industrial", process: "Machining / Assembly", requirement: "New components", material, certification: has("iso 9001") ? "ISO 9001 (explicit)" : "ISO 9001 preferred", missing };
  }
  if (has("valve") || has("pump")) {
    return { product: "Valves / pumps", industry: "Fluid power", process: "Casting / CNC / Assembly", requirement: "New components", material, certification: has("iso") ? "ISO 9001 (explicit)" : "ISO 9001 preferred", missing };
  }
  if (has("cnc") || has("machin")) {
    return { product: "Machined parts", industry: "General industrial", process: "CNC machining", requirement: "New components", material, certification: has("iso") ? "ISO 9001 (explicit)" : "ISO 9001 preferred", missing };
  }
  if (has("cast") || has("forg")) {
    return { product: "Cast / forged parts", industry: "General industrial", process: "Casting / Forging", requirement: "New components", material, certification: has("iso") ? "ISO 9001 (explicit)" : "ISO 9001 preferred", missing };
  }
  return { product: "Industrial parts", industry: "To be confirmed", process: "To be confirmed", requirement: "New components", material, certification: "To be confirmed", missing: ["Industry", "Process", ...missing.filter((m) => m !== "Material")] };
}

/* ============================================================
   DERIVED EVIDENCE HELPERS (real data, no invention)
   ============================================================ */
interface Selection {
  capId: string;
  material: string | null;
  application: string | null;
}

const DEFAULT_SELECTION: Selection = { capId: "cnc_machining", material: null, application: null };

function capabilitiesForMaterial(material: string | null): CapabilityItem[] {
  if (!material) return [];
  const key = material.toLowerCase();
  const tokens = key.includes("steel") ? ["steel"] : key.includes("stainless") ? ["stainless"] : key.includes("aluminum") ? ["aluminum"] : ["plastic"];
  return CAPABILITIES.filter((c) => {
    const m = (CAP_FACTS[c.id]?.materials ?? "").toLowerCase();
    return tokens.some((tok) => m.includes(tok));
  });
}

function applicationCoverage(application: string | null): { title: string; pain: string; systems: string[] } | null {
  if (!application) return null;
  const pageId = APPLICATION_INDUSTRY[application];
  if (pageId) {
    const page = INDUSTRIES.find((i) => i.id === pageId);
    if (page) return { title: page.title, pain: page.buyer_pain_point, systems: page.relevant_systems };
  }
  if (application === "Hydraulics") {
    const relevant = INDUSTRIES.filter((i) => i.relevant_systems.includes("Hydraulic Systems"));
    return { title: "Hydraulic Systems — industry coverage", pain: "Hydraulic systems appear across mining and construction operations (industry pages).", systems: relevant.map((i) => `${i.title} — Hydraulic Systems`) };
  }
  return null;
}

interface ClusterMatch {
  region: string;
  specialization: string[];
  description: string;
  why: string;
  matchedCapabilities: string[];
  signals: string[];
  missing: string[];
}

const CLUSTER_MISSING = ["cm1", "cm2", "cm3"];

function clustersForSelection(sel: Selection, task: ParsedRequirement | null, t: (k: string) => string): ClusterMatch[] {
  const cap = CAPABILITIES.find((c) => c.id === sel.capId);
  const regionNames = CAP_REGIONS[sel.capId] ?? [];
  const capKeywords = (cap?.name ?? "").toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  return REGIONS.filter((r) => regionNames.includes(r.region)).map((r) => {
    const specText = r.specialization.join(" ").toLowerCase();
    const keywordHits = capKeywords.filter((k) => specText.includes(k));
    const why = keywordHits.length > 0
      ? t("why_spec").replace("{k}", keywordHits.join(" / ")).replace("{c}", cap?.name ?? "")
      : t("why_proc").replace("{c}", cap?.name ?? "");
    const signals = [TRUST.quality_systems[0], TRUST.export_capability[0]].filter(Boolean) as string[];
    return { region: r.region, specialization: r.specialization, description: r.description, why, matchedCapabilities: [cap?.name ?? ""], signals, missing: CLUSTER_MISSING.map((k) => t(k)) };
  });
}

/* ============================================================
   PAGE
   ============================================================ */
const emptySubscribe = () => () => {};

function useDebugFlag(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => new URLSearchParams(window.location.search).has("debug"),
    () => false
  );
}

export function makeT(locale: Locale) {
  return (k: string) => DICT[k]?.[locale] ?? DICT[k]?.en ?? k;
}

export default function VNextHomepage({ locale }: { locale: Locale }) {
  const showDebug = useDebugFlag();
  const [task, setTask] = useState<ParsedRequirement | null>(null);
  const [selection, setSelection] = useState<Selection>(DEFAULT_SELECTION);
  const [activeRegion, setActiveRegion] = useState(REGIONS[0].region);
  const t = makeT(locale);

  const goToFactories = () => {
    const matches = clustersForSelection(selection, task, t);
    if (matches.length > 0) setActiveRegion(matches[0].region);
    document.getElementById("verify")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="vnext relative min-h-screen overflow-x-clip">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Entry showDebug={showDebug} onTask={setTask} t={t} />
      <Explore showDebug={showDebug} task={task} selection={selection} onSelection={setSelection} onViewFactories={goToFactories} t={t} />
      <Verify showDebug={showDebug} task={task} selection={selection} activeRegion={activeRegion} onRegion={setActiveRegion} t={t} />
      <Connect task={task} selection={selection} t={t} locale={locale} />
    </main>
  );
}
/* ============================================================
   01 ENTRY (+ 02 UNDERSTAND in place)
   ============================================================ */
function Entry({ showDebug, onTask, t }: { showDebug: boolean; onTask: (p: ParsedRequirement) => void; t: (k: string) => string }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "summary">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    setText(value);
    setStatus("analyzing");
    window.setTimeout(() => setStatus("summary"), 550);
  };
  const parsed = parseRequirement(text);
  const reset = () => { setStatus("idle"); setFileName(null); };
  const confirmed = (raw: string) => {
    submit(raw);
    window.setTimeout(() => onTask(parseRequirement(raw)), 620);
  };

  return (
    <section id="entry" className="relative flex min-h-screen flex-col pt-14">
      <div className="mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-0 md:px-10 lg:grid-cols-[11fr_8fr]">
        <div className="relative z-10 px-6 py-10 md:px-10 lg:px-16 lg:py-12">
          <div className="max-w-[660px]">
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}
              className="mono mb-5 flex items-center gap-3" style={{ fontSize: 9.5, letterSpacing: "0.26em", color: DIM, textTransform: "uppercase" }}>
              <span className="inline-block h-[6px] w-[6px]" style={{ background: ACCENT }} />
              {t("entry_eyebrow")}
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="display text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ color: INK }}>
              {t("h1a")}
              <br />
              {t("h1b")}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
              className="mt-4 max-w-[540px] text-[14.5px] leading-relaxed" style={{ color: DIM }}>
              {t("entry_sub")}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.24, ease: EASE }} className="mt-8">
              <div style={{ minHeight: 300 }}>
                <AnimatePresence mode="wait">
                  {status !== "summary" ? (
                    <motion.div key="entry" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }}>
                      <div className="border" style={{ borderColor: LINE_D, background: "#FBFAF6" }}>
                        <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: LINE }}>
                          <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>{t("task_label")}</span>
                          {fileName
                            ? <span className="mono" style={{ fontSize: 9, letterSpacing: "0.04em", color: ACCENT }}>{t("attached")}: {fileName}</span>
                            : <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>{t("task_01")}</span>}
                        </div>
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) confirmed(text); }}
                          rows={2}
                          placeholder={t("task_placeholder")}
                          className="display w-full bg-transparent px-5 py-3.5 text-[18px] font-medium leading-snug tracking-[-0.01em] outline-none"
                          style={{ color: INK }}
                        />
                        <div className="flex flex-wrap items-center justify-between gap-4 border-t px-5 py-4" style={{ borderColor: LINE }}>
                          <div className="flex items-center gap-3">
                            <button onClick={() => confirmed(text)} className="display px-7 py-3 text-[14px] font-semibold tracking-[-0.01em] text-white transition-colors" style={{ background: INK }}>
                              {t("start_task")}
                            </button>
                            <button onClick={() => fileRef.current?.click()} className="mono px-4 py-3 text-[10px] tracking-[0.14em] uppercase transition-colors" style={{ color: DIM }}>
                              {t("upload_spec")}
                            </button>
                            <input ref={fileRef} type="file" className="hidden" onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (!f) return;
                              setFileName(f.name);
                              const src = text.trim() || f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
                              if (text.trim()) confirmed(text); else confirmed(src);
                            }} />
                          </div>
                          <a href="#explore" className="mono px-4 py-3 text-[10px] tracking-[0.14em] uppercase transition-colors" style={{ color: DIM }}>
                            {t("browse_caps")}
                          </a>
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="mono mb-2.5" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>
                          {t("examples_label")}
                        </p>
                        <div className="flex flex-col items-start gap-2">
                          {EXAMPLES.map((ex) => (
                            <button key={ex.tk} onClick={() => confirmed(t(ex.bk))} className="mono flex items-baseline gap-3 text-left transition-colors" style={{ fontSize: 11.5, letterSpacing: "0.02em", color: DIM }}>
                              <span className="inline-block h-[6px] w-[6px] translate-y-[-1px]" style={{ background: LINE_D }} />
                              <span><span className="font-semibold" style={{ color: INK }}>{t(ex.tk)}</span> <span style={{ color: FAINT }}>— {t(ex.bk)}</span></span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="summary" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
                      <div className="border" style={{ borderColor: LINE_D, background: "#FBFAF6" }}>
                        <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: LINE }}>
                          <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>{t("summary_label")}</span>
                          {fileName && <span className="mono" style={{ fontSize: 9, letterSpacing: "0.04em", color: FAINT }}>{fileName}</span>}
                        </div>
                        <div className="px-5 py-5">
                          {(
                            [
                              ["lbl_product", parsed.product],
                              ["lbl_industry", parsed.industry],
                              ["lbl_process", parsed.process],
                              ["lbl_requirement", parsed.requirement],
                              ["lbl_material", parsed.material],
                              ["lbl_certification", parsed.certification],
                            ] as const
                          ).map(([label, value]) => (
                            <div key={label} className="flex items-baseline justify-between gap-6 border-b py-2.5" style={{ borderColor: LINE }}>
                              <span className="mono whitespace-nowrap" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: DIM, textTransform: "uppercase" }}>{t(label)}</span>
                              <span className="display text-right text-[15px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>
                                {((label === "lbl_material" && parsed.missing.includes("Material")) || (label === "lbl_industry" && parsed.missing.includes("Industry")) || (label === "lbl_process" && parsed.missing.includes("Process")))
                                  ? <span style={{ color: AMBER }}>{value} · {t("missing_lbl")}</span>
                                  : value}
                              </span>
                            </div>
                          ))}
                          {parsed.missing.length > 0 && (
                            <p className="mono mt-3" style={{ fontSize: 9.5, letterSpacing: "0.08em", color: AMBER }}>
                              {t("missing_prefix")} {parsed.missing.join(" · ")} — {t("missing_suffix")}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-4 border-t px-5 py-4" style={{ borderColor: LINE }}>
                          <span className="display text-[16px] font-semibold tracking-[-0.01em]" style={{ color: ACCENT }}>
                            {t("qualified_caps")}
                          </span>
                          <div className="flex items-center gap-4">
                            <button onClick={reset} className="mono text-[10px] tracking-[0.14em] uppercase transition-colors" style={{ color: DIM }}>{t("edit_task")}</button>
                            <a href="#explore" className="display border px-5 py-2.5 text-[13px] font-semibold tracking-[-0.01em] transition-colors" style={{ borderColor: INK, color: INK }}>
                              {t("continue_caps")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {status === "analyzing" && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mono mt-4" style={{ fontSize: 10, letterSpacing: "0.14em", color: ACCENT, textTransform: "uppercase" }}>
                    Reading requirement…
                  </motion.p>
                )}
              </div>
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>{t("network_covers")}</span>
              {COVERS.map((c, i) => (
                <span key={c} className="mono flex items-center gap-3" style={{ fontSize: 10.5, letterSpacing: "0.08em", color: DIM }}>
                  {i > 0 && <span style={{ color: LINE_D }}>·</span>}{t(c)}
                </span>
              ))}
            </div>

            {/* brand / trust expression (real positioning, no fake numbers) */}
            <p className="mono mt-5 max-w-[560px] border-t pt-4 text-[10px] leading-relaxed" style={{ borderColor: LINE, color: DIM, letterSpacing: "0.04em" }}>
              {t("positioning")}
            </p>
          </div>
        </div>

        {/* right — capability evidence */}
        <div className="relative hidden h-[calc(100vh-188px)] lg:block">
          <div className="absolute right-0 top-0 h-full w-[92%] overflow-hidden" style={{ background: PAPER_D }}>
            {HERO.asset ? (
              <>
                <img src={HERO.asset.path} alt={HERO.asset.filename} className="h-full w-full" style={{ objectFit: "cover", filter: "saturate(0.94) contrast(1.04)" }} />
                <div className="absolute inset-0" style={{ background: "rgba(23,25,26,0.10)" }} />
              </>
            ) : (
              <div className="flex h-full items-center justify-center"><span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.2em", color: FAINT }}>NO ASSET</span></div>
            )}
            <div className="absolute bottom-0 left-0 right-0 border-t px-5 py-4" style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(23,25,26,0.72)" }}>
              <div className="mono flex items-center justify-between" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>
                {t("net_band")}
                <span style={{ color: "rgba(255,255,255,0.5)" }}>CNC · ISO 9001</span>
              </div>
            </div>
            {showDebug && HERO.asset && (
              <div className="mono absolute left-2 top-2 z-10 px-2 py-1.5 text-white" style={{ fontSize: 8, lineHeight: 1.5, letterSpacing: "0.04em", background: "rgba(10,12,13,0.8)" }}>
                <span style={{ color: "#FFB38A" }}>[Asset Debug]</span><br />
                file: {HERO.asset.filename}<br />role: {HERO.role}<br />id: {HERO.asset.asset_id}<br />score: {HERO.asset.quality_score}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* capability journey band */}
      <div id="journey" className="relative z-10 w-full border-t" style={{ borderColor: LINE_D, background: INK }}>
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-2 md:px-10">
          <span className="mono flex items-center gap-2.5" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>
            <span className="inline-block h-[6px] w-[6px]" style={{ background: ACCENT }} />
            {t("journey_label")}
          </span>
          <span className="mono hidden md:block" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
            {t("journey_verified")}
          </span>
        </div>
        <div className="mx-auto flex w-full max-w-[1500px] items-center">
          {JOURNEY_PINS.map((stage, i) => {
            const res = resolveOne(stage.pin, stage.role);
            return (
              <div key={t(stage.lk)} className="flex min-w-0 flex-1 items-center">
                <div className="relative h-[74px] min-w-0 flex-1 overflow-hidden">
                  {res.asset ? (
                    <img src={res.asset.path} alt={res.asset.filename} className="h-full w-full" style={{ objectFit: "cover", filter: "grayscale(0.55) contrast(1.08)" }} />
                  ) : (
                    <div className="flex h-full items-center justify-center" style={{ background: PAPER_D }}>
                      <span className="mono" style={{ fontSize: 8, letterSpacing: "0.18em", color: FAINT }}>NO ASSET</span>
                    </div>
                  )}
                  <div className="absolute inset-0" style={{ background: "rgba(23,25,26,0.30)" }} />
                  <div className="absolute left-3 top-2.5 right-3">
                    <div className="mono flex items-center gap-2" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: "rgba(255,255,255,0.9)", textTransform: "uppercase" }}>
                      <span className="inline-block h-[6px] w-[6px]" style={{ background: ACCENT }} />
                      {t(stage.lk)}
                    </div>
                    <div className="mono mt-1" style={{ fontSize: 8, letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>{t(stage.sk)}</div>
                  </div>
                  {showDebug && res.asset && (
                    <div className="mono absolute bottom-1 left-3" style={{ fontSize: 7, letterSpacing: "0.06em", color: "rgba(255,255,255,0.6)" }}>
                      [Asset Debug] {res.asset.filename} · {res.role} · {res.asset.quality_score}
                    </div>
                  )}
                </div>
                {i < JOURNEY_PINS.length - 1 && (
                  <div className="flex shrink-0 items-center justify-center" style={{ width: 30, color: "rgba(255,255,255,0.5)" }}>
                    <span className="mono text-[13px]">→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   03 EXPLORE + 04 EVIDENCE
   ============================================================ */
function Explore({
  showDebug, task, selection, onSelection, onViewFactories, t,
}: {
  showDebug: boolean;
  task: ParsedRequirement | null;
  selection: Selection;
  onSelection: (s: Selection) => void;
  onViewFactories: () => void;
  t: (k: string) => string;
}) {
  const cap = CAPABILITIES.find((c) => c.id === selection.capId) ?? CAPABILITIES[0];
  const facts = CAP_FACTS[selection.capId] ?? CAP_FACTS.cnc_machining;
  const evidence = EVIDENCE[selection.capId];
  const matches = clustersForSelection(selection, task, t);

  const setCap = (capId: string) => onSelection({ ...selection, capId });
  const setMaterial = (m: string | null) => onSelection({ ...selection, material: m });
  const setApplication = (a: string | null) => onSelection({ ...selection, application: a });

  const matCaps = capabilitiesForMaterial(selection.material);
  const appCoverage = applicationCoverage(selection.application);

  useEffect(() => {
    if (!task) return;
    const p = task.process.toLowerCase();
    let capId = selection.capId;
    if (p.includes("casting")) capId = "casting_forging";
    else if (p.includes("assembly")) capId = "assembly_testing";
    else if (p.includes("cnc")) capId = "cnc_machining";
    let material = selection.material;
    const m = task.material.toLowerCase();
    if (m.includes("aluminum")) material = "Aluminum";
    else if (m.includes("steel")) material = "Steel";
    else if (m.includes("plastic")) material = "Engineering plastic";
    onSelection({ capId, material, application: selection.application });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  return (
    <section id="explore" className="border-b py-20 lg:py-28" style={{ borderColor: LINE, background: PAPER }}>
      <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-6 md:px-10 lg:grid-cols-[380px_1fr]">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <p className="mono mb-3" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>{t("explore_step")}</p>
          <h2 className="display text-[clamp(26px,2.6vw,38px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ color: INK }}>
            {t("explore_title")}
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: DIM }}>{t("explore_desc")}</p>

          <div className="mt-8">
            <p className="mono mb-2.5" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: DIM, textTransform: "uppercase" }}>{t("process_label")}</p>
            <div className="flex flex-col items-start gap-1.5">
              {CAPABILITIES.map((c) => (
                <button key={c.id} onClick={() => setCap(c.id)}
                  className="mono flex items-center gap-2.5 text-left transition-colors"
                  style={{ fontSize: 11.5, letterSpacing: "0.04em", color: selection.capId === c.id ? INK : DIM }}>
                  <span className="inline-block h-[6px] w-[6px]" style={{ background: selection.capId === c.id ? ACCENT : LINE_D }} />
                  <span className={selection.capId === c.id ? "font-semibold" : ""}>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="mono mb-2.5" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: DIM, textTransform: "uppercase" }}>{t("material_label")}</p>
            <div className="flex flex-wrap gap-2">
              {MATERIALS.map((m) => (
                <button key={m} onClick={() => setMaterial(selection.material === m ? null : m)}
                  className="mono border px-3 py-1.5 transition-colors"
                  style={{ fontSize: 9.5, letterSpacing: "0.06em", color: selection.material === m ? INK : DIM, borderColor: selection.material === m ? INK : LINE_D }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="mono mb-2.5" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: DIM, textTransform: "uppercase" }}>{t("application_label")}</p>
            <div className="flex flex-wrap gap-2">
              {APPLICATIONS.map((a) => (
                <button key={a} onClick={() => setApplication(selection.application === a ? null : a)}
                  className="mono border px-3 py-1.5 transition-colors"
                  style={{ fontSize: 9.5, letterSpacing: "0.06em", color: selection.application === a ? INK : DIM, borderColor: selection.application === a ? INK : LINE_D }}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3" style={{ borderColor: LINE_D }}>
            <p className="mono" style={{ fontSize: 9, letterSpacing: "0.2em", color: DIM, textTransform: "uppercase" }}>
              {t("evidence_panel")} · {selection.material ?? "All materials"} · {selection.application ?? "All applications"}
            </p>
            <p className="mono" style={{ fontSize: 9, letterSpacing: "0.14em", color: ACCENT, textTransform: "uppercase" }}>
              {t("live_note")}
            </p>
          </div>

          <EvidenceBlock title={t("cap_evidence")} label={cap.name} onViewFactories={onViewFactories} t={t}>
            <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
              <div>
                <p className="display text-[15px] font-medium leading-relaxed" style={{ color: DIM }}>{cap.description}</p>
                <div className="mt-5 grid grid-cols-1 gap-px border sm:grid-cols-2" style={{ borderColor: LINE_D, background: LINE_D }}>
                  {(
                    [
                      ["Equipment", facts.equipment],
                      ["Tolerance", facts.tolerance],
                      ["Materials", facts.materials],
                      ["Inspection", facts.inspection],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} style={{ background: "#FBFAF6" }} className="px-4 py-3">
                      <p className="mono mb-1" style={{ fontSize: 8, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>{label}</p>
                      <p className="display text-[13.5px] font-medium leading-snug tracking-[-0.01em]" style={{ color: INK }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[200px] overflow-hidden" style={{ background: PAPER_D }}>
                {evidence.asset ? (
                  <img src={evidence.asset.path} alt={evidence.asset.filename} className="h-full w-full" style={{ objectFit: "cover", filter: "grayscale(0.3) contrast(1.05)" }} />
                ) : null}
                <div className="absolute inset-0" style={{ background: "rgba(23,25,26,0.14)" }} />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5" style={{ background: "rgba(23,25,26,0.7)" }}>
                  <span className="mono" style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>
                    {cap.name.split(" ")[0]} · process evidence
                  </span>
                </div>
                {showDebug && evidence.asset && (
                  <div className="mono absolute left-1.5 top-1.5 px-1.5 py-1 text-white" style={{ fontSize: 7.5, background: "rgba(10,12,13,0.8)" }}>
                    [Asset Debug] {evidence.asset.filename} · {evidence.role} · {evidence.asset.quality_score}
                  </div>
                )}
              </div>
            </div>
          </EvidenceBlock>

          <EvidenceBlock title={t("mat_evidence")} label={selection.material ?? "—"} onViewFactories={onViewFactories} t={t}>
            {selection.material ? (
              matCaps.length > 0 ? (
                <div className="flex flex-col gap-px border" style={{ borderColor: LINE_D, background: LINE_D }}>
                  {matCaps.map((c) => (
                    <div key={c.id} className="flex items-baseline justify-between gap-6 px-4 py-2.5" style={{ background: "#FBFAF6" }}>
                      <span className="display text-[14px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{c.name}</span>
                      <span className="mono text-right" style={{ fontSize: 9, letterSpacing: "0.04em", color: DIM }}>{CAP_FACTS[c.id]?.materials ?? ""}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mono text-[11px]" style={{ color: AMBER }}>
                  {t("mat_none").replace("{m}", selection.material ?? "")}
                </p>
              )
            ) : (
              <p className="mono text-[11px]" style={{ color: DIM }}>{t("mat_hint")}</p>
            )}
          </EvidenceBlock>

          <EvidenceBlock title={t("app_evidence")} label={selection.application ?? "—"} onViewFactories={onViewFactories} t={t}>
            {selection.application ? (
              appCoverage ? (
                <div>
                  <p className="display text-[14px] font-medium leading-relaxed" style={{ color: DIM }}>{appCoverage.pain}</p>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {appCoverage.systems.map((s) => (
                      <p key={s} className="mono" style={{ fontSize: 10, letterSpacing: "0.04em", color: DIM }}>· {s}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mono text-[11px]" style={{ color: AMBER }}>No industry coverage mapped for this application in the current data.</p>
              )
            ) : (
              <p className="mono text-[11px]" style={{ color: DIM }}>{t("app_hint")}</p>
            )}
          </EvidenceBlock>

          <EvidenceBlock title={t("fact_evidence")} label={`${matches.length} matching cluster${matches.length === 1 ? "" : "s"}`} onViewFactories={onViewFactories} t={t}>
            {matches.length > 0 ? (
              <div className="flex flex-col gap-px border" style={{ borderColor: LINE_D, background: LINE_D }}>
                {matches.map((m) => (
                  <div key={m.region} className="px-4 py-3" style={{ background: "#FBFAF6" }}>
                    <div className="flex items-baseline justify-between gap-6">
                      <span className="display text-[14px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{m.region}</span>
                      <span className="mono text-right" style={{ fontSize: 9, letterSpacing: "0.04em", color: DIM }}>{m.specialization.join(" · ")}</span>
                    </div>
                    <p className="mono mt-1.5 text-[10px]" style={{ color: DIM, letterSpacing: "0.02em" }}>{m.why}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mono text-[11px]" style={{ color: AMBER }}>No cluster currently mapped for this combination — the network data is being extended.</p>
            )}
          </EvidenceBlock>
        </div>
      </div>
    </section>
  );
}

function EvidenceBlock({
  title, label, onViewFactories, children, t,
}: {
  title: string;
  label: string;
  onViewFactories: () => void;
  children: React.ReactNode;
  t: (k: string) => string;
}) {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-2.5" style={{ borderColor: LINE_D }}>
        <p className="mono" style={{ fontSize: 8.5, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase" }}>
          {title} <span style={{ color: INK }}>· {label}</span>
        </p>
        <button onClick={onViewFactories} className="mono border px-3.5 py-2 text-[9.5px] tracking-[0.14em] uppercase transition-colors" style={{ borderColor: INK, color: INK }}>
          {t("view_factories")}
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/* ============================================================
   05 FACTORY / VERIFY
   ============================================================ */
function Verify({
  showDebug, task, selection, activeRegion, onRegion, t,
}: {
  showDebug: boolean;
  task: ParsedRequirement | null;
  selection: Selection;
  activeRegion: string;
  onRegion: (r: string) => void;
  t: (k: string) => string;
}) {
  const cap = CAPABILITIES.find((c) => c.id === selection.capId) ?? CAPABILITIES[0];
  const matches = clustersForSelection(selection, task, t);
  const active = matches.find((m) => m.region === activeRegion) ?? matches[0] ?? null;

  return (
    <section id="verify" className="py-20 lg:py-28" style={{ background: NIGHT }}>
      <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
        <p className="mono mb-3" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>{t("verify_step")}</p>
        <h2 className="display text-[clamp(26px,2.6vw,38px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          {t("verify_title")}
        </h2>
        <p className="mono mt-3 max-w-[560px] text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
          {t("verify_desc")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-y-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
          {[
            [t("requirement_label"), task?.product ?? "—"],
            [t("capability_label"), cap.name],
            [t("matapp_label"), [selection.material, selection.application].filter(Boolean).join(" · ") || "—"],
            [t("standard_label"), "ISO 9001 · EN 10204 3.1/3.2"],
            [t("clusters_label"), matches.map((m) => m.region).join(" · ") || "—"],
          ].map(([label, value], i) => (
            <span key={label} className="mono flex items-center" style={{ fontSize: 9.5, letterSpacing: "0.08em", color: "rgba(255,255,255,0.75)" }}>
              {i > 0 && <span className="mx-3" style={{ color: "rgba(255,255,255,0.3)" }}>→</span>}
              <span style={{ color: "rgba(255,255,255,0.45)" }}>{label}: </span>
              <span className="ml-1.5 font-semibold text-white">{value}</span>
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {matches.map((m) => (
            <button key={m.region} onClick={() => onRegion(m.region)}
              className="mono border px-4 py-2 transition-colors"
              style={{
                fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                color: active?.region === m.region ? "#fff" : "rgba(255,255,255,0.55)",
                borderColor: active?.region === m.region ? "#fff" : "rgba(255,255,255,0.25)",
              }}>
              {m.region}
            </button>
          ))}
          {matches.length === 0 && (
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
              No clusters mapped for this selection yet — network data is being extended.
            </span>
          )}
        </div>

        {active && (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <h3 className="display text-[28px] font-semibold tracking-[-0.02em] text-white">{active.region}</h3>
              <p className="mono mt-2" style={{ fontSize: 9.5, letterSpacing: "0.14em", color: ACCENT, textTransform: "uppercase" }}>
                {active.specialization.join(" · ")}
              </p>
              <p className="mt-4 max-w-[640px] text-[14.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                {active.description}
              </p>

              <div className="mt-8 grid gap-px border sm:grid-cols-2" style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.18)" }}>
                <div style={{ background: "#14171A" }} className="px-4 py-4">
                  <p className="mono mb-2" style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{t("why_match")}</p>
                  <p className="display text-[13px] font-medium leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>{active.why}</p>
                </div>
                <div style={{ background: "#14171A" }} className="px-4 py-4">
                  <p className="mono mb-2" style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{t("matched_caps")}</p>
                  <p className="display text-[13px] font-medium leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>{active.matchedCapabilities.join(" · ")}</p>
                </div>
                <div style={{ background: "#14171A" }} className="px-4 py-4">
                  <p className="mono mb-2" style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{t("verif_signals")}</p>
                  {active.signals.map((s) => (
                    <p key={s} className="display text-[12px] font-medium leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>· {s}</p>
                  ))}
                </div>
                <div style={{ background: "#14171A" }} className="px-4 py-4">
                  <p className="mono mb-2" style={{ fontSize: 8, letterSpacing: "0.2em", color: "#D9A441", textTransform: "uppercase" }}>{t("missing_label")}</p>
                  {active.missing.map((s) => (
                    <p key={s} className="display text-[12px] font-medium leading-snug" style={{ color: "rgba(255,255,255,0.8)" }}>· {s}</p>
                  ))}
                  {task && task.missing.length > 0 && (
                    <p className="display mt-2 text-[12px] font-medium leading-snug" style={{ color: "#D9A441" }}>
                      · {t("req_gap")} {task.missing.join(" · ")}
                    </p>
                  )}
                </div>
              </div>

              <a href="#connect" className="display mt-8 inline-block border px-6 py-3 text-[13px] font-semibold tracking-[-0.01em] text-white transition-colors" style={{ borderColor: "rgba(255,255,255,0.5)" }}>
                {t("start_with_cluster")}
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative h-[200px] overflow-hidden" style={{ background: "#14171A" }}>
                {VERIFY_QUALITY.asset ? (
                  <img src={VERIFY_QUALITY.asset.path} alt={VERIFY_QUALITY.asset.filename} className="h-full w-full" style={{ objectFit: "cover", filter: "grayscale(0.35) contrast(1.06)" }} />
                ) : null}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5" style={{ background: "rgba(10,12,13,0.75)" }}>
                  <span className="mono" style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>{t("quality_evidence")}</span>
                </div>
                {showDebug && VERIFY_QUALITY.asset && (
                  <div className="mono absolute left-1.5 top-1.5 px-1.5 py-1 text-white" style={{ fontSize: 7.5, background: "rgba(10,12,13,0.8)" }}>
                    [Asset Debug] {VERIFY_QUALITY.asset.filename} · {VERIFY_QUALITY.role} · {VERIFY_QUALITY.asset.quality_score}
                  </div>
                )}
              </div>
              <div className="relative h-[150px] overflow-hidden" style={{ background: "#14171A" }}>
                {VERIFY_STORY.asset ? (
                  <img src={VERIFY_STORY.asset.path} alt={VERIFY_STORY.asset.filename} className="h-full w-full" style={{ objectFit: "cover", filter: "grayscale(0.35) contrast(1.06)" }} />
                ) : null}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5" style={{ background: "rgba(10,12,13,0.75)" }}>
                  <span className="mono" style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>{t("production_ops")}</span>
                </div>
                {showDebug && VERIFY_STORY.asset && (
                  <div className="mono absolute left-1.5 top-1.5 px-1.5 py-1 text-white" style={{ fontSize: 7.5, background: "rgba(10,12,13,0.8)" }}>
                    [Asset Debug] {VERIFY_STORY.asset.filename} · {VERIFY_STORY.role} · {VERIFY_STORY.asset.quality_score}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   09 CONNECT — single sourcing CTA, context inherited
   ============================================================ */
function Connect({ task, selection, t, locale }: { task: ParsedRequirement | null; selection: Selection; t: (k: string) => string; locale: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const deliveryRef = useRef<HTMLInputElement>(null);
  const idemKey = useRef<string>(
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `rfq-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  const summary = task ?? {
    product: "Hydraulic replacement parts", industry: "Mining", process: "Machining / Casting",
    requirement: "Replacement application", material: "Unknown", certification: "ISO 9001 preferred", missing: [],
  };
  const cap = CAPABILITIES.find((c) => c.id === selection.capId);

  const submit = async () => {
    const buyerEmail = emailRef.current?.value.trim() ?? "";
    const priceQty = priceRef.current?.value.trim() ?? "";
    const delivery = deliveryRef.current?.value.trim() ?? "";
    if (!buyerEmail) {
      setSubmitError("Enter your email so HISVIA can respond to this request.");
      return;
    }
    const facts = CAP_FACTS[selection.capId] ?? CAP_FACTS.cnc_machining;
    const clusters = clustersForSelection(selection, task, t);
    const parts = [
      summary.product,
      summary.industry ? `industry: ${summary.industry}` : null,
      summary.process ? `process: ${summary.process}` : null,
      selection.material ? `material: ${selection.material}` : null,
      selection.application ? `application: ${selection.application}` : null,
      summary.certification ? `certification: ${summary.certification}` : null,
      priceQty ? `qty/price: ${priceQty}` : null,
      delivery ? `delivery: ${delivery}` : null,
    ].filter(Boolean) as string[];
    const requirementText = parts.join(" · ") + (summary.requirement ? ` — ${summary.requirement}` : "");
    if (requirementText.length < 10) {
      setSubmitError("Describe your requirement first.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey: idemKey.current,
          buyerEmail,
          requirementText,
          capabilitySelection: cap ? { capId: selection.capId, name: cap.name } : null,
          materialApplication: { material: selection.material, application: selection.application },
          evidenceSnapshot: {
            capability: cap?.name ?? null,
            material: selection.material,
            application: selection.application,
            equipment: facts.equipment,
            tolerance: facts.tolerance,
            materials: facts.materials,
            inspection: facts.inspection,
          },
          factoryClusterSnapshot: clusters.map((c) => ({
            region: c.region,
            specialization: c.specialization,
            why: c.why,
            matchedCapabilities: c.matchedCapabilities,
            signals: c.signals,
            missing: c.missing,
          })),
          sourceLocale: locale,
          website: "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body?.success) {
        setSubmitError(body?.error ?? `Submission failed (${res.status})`);
        return;
      }
      if (!body?.public_ref) {
        setSubmitError("The server confirmed the request without a reference. Please contact support.");
        return;
      }
      setRef(body.public_ref as string);
      setSubmitted(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Network error — could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="connect" className="py-20 lg:py-28" style={{ background: PAPER }}>
      <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-6 md:px-10 lg:grid-cols-[1fr_560px]">
        <div>
          <p className="mono mb-3" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: FAINT, textTransform: "uppercase" }}>{t("connect_step")}</p>
          <h2 className="display text-[clamp(26px,2.6vw,38px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ color: INK }}>
            {t("connect_title")}
          </h2>
          <p className="mt-3 max-w-[520px] text-[14px] leading-relaxed" style={{ color: DIM }}>{t("connect_desc")}</p>

          <div className="mt-8 border" style={{ borderColor: LINE_D, background: "#FBFAF6" }}>
            <div className="border-b px-5 py-3" style={{ borderColor: LINE }}>
              <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>{t("context_carried")}</span>
            </div>
            <div className="px-5 py-5">
              <div className="flex flex-col gap-2.5">
                {([
                  ["lbl_product", summary.product],
                  ["lbl_industry", summary.industry],
                  ["lbl_process", summary.process],
                  ["lbl_capability", cap?.name ?? "—"],
                  ["lbl_material", selection.material ?? summary.material],
                  ["lbl_application", selection.application ?? "—"],
                  ["lbl_certification", summary.certification],
                ] as const).map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-6">
                    <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: DIM, textTransform: "uppercase" }}>{t(label)}</span>
                    <span className="display text-[14px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>{value}</span>
                  </div>
                ))}
                {summary.missing.length > 0 && (
                  <p className="mono mt-1 border-t pt-3" style={{ fontSize: 9, letterSpacing: "0.06em", color: AMBER, borderColor: LINE }}>
                    {t("known_gaps")} {summary.missing.join(" · ")} — factories will confirm feasibility against these.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border" style={{ borderColor: LINE_D, background: "#FBFAF6" }}>
          {!submitted ? (
            <div className="px-6 py-6">
              <p className="mono mb-5" style={{ fontSize: 8.5, letterSpacing: "0.22em", color: DIM, textTransform: "uppercase" }}>{t("request_label")}</p>
              <label className="mono mb-1.5 block" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>{t("price_qty")}</label>
              <input ref={priceRef} placeholder="500 pcs · target unit price…" className="display mb-4 w-full border px-4 py-3 text-[15px] font-medium tracking-[-0.01em] outline-none" style={{ borderColor: LINE_D, color: INK, background: "#fff" }} />
              <label className="mono mb-1.5 block" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>{t("delivery")}</label>
              <input ref={deliveryRef} placeholder="45 days after order…" className="display mb-4 w-full border px-4 py-3 text-[15px] font-medium tracking-[-0.01em] outline-none" style={{ borderColor: LINE_D, color: INK, background: "#fff" }} />
              <label className="mono mb-1.5 block" style={{ fontSize: 8.5, letterSpacing: "0.18em", color: FAINT, textTransform: "uppercase" }}>{t("email")}</label>
              <input ref={emailRef} placeholder="buyer@company.com" type="email" className="display mb-5 w-full border px-4 py-3 text-[15px] font-medium tracking-[-0.01em] outline-none" style={{ borderColor: LINE_D, color: INK, background: "#fff" }} />
              {submitError && <p className="mono mb-4 text-[10px] leading-relaxed" style={{ color: AMBER, letterSpacing: "0.04em" }}>{submitError}</p>}
              <button onClick={() => submit()} disabled={submitting} className="display w-full px-7 py-4 text-[15px] font-semibold tracking-[-0.01em] text-white transition-colors" style={{ background: INK, opacity: submitting ? 0.6 : 1 }}>
                {submitting ? t("submitting") : t("submit_btn")}
              </button>
              <p className="mono mt-4 text-center" style={{ fontSize: 8.5, letterSpacing: "0.12em", color: FAINT, textTransform: "uppercase" }}>
                {t("supplier_path")}
              </p>
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <span className="inline-block h-[8px] w-[8px]" style={{ background: ACCENT }} />
              <p className="display mt-4 text-[22px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>{t("created")}</p>
              <p className="mono mt-2" style={{ fontSize: 10, letterSpacing: "0.14em", color: DIM, textTransform: "uppercase" }}>{t("reference")} {ref}</p>
              <p className="mono mt-1.5 px-2 text-[8.5px] leading-relaxed" style={{ color: FAINT, letterSpacing: "0.04em" }}>{t("client_note")}</p>
              <div className="mx-auto mt-6 max-w-[300px] border-t pt-4" style={{ borderColor: LINE }}>
                <p className="mono text-left text-[10px] leading-relaxed" style={{ color: DIM, letterSpacing: "0.02em" }}>
                  {t("next_steps")}
                </p>
              </div>
              <button onClick={() => setSubmitted(false)} className="mono mt-6 text-[10px] tracking-[0.14em] uppercase transition-colors" style={{ color: DIM }}>
                {t("edit_request")}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
