import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const LOCALES = ["zh-CN", "en", "ru", "tr", "es", "ar", "de", "fr", "pl"];
const LOCALE_PREFIX = {
  "zh-CN": "ZH-CN-",
  en: "EN-",
  ru: "RU-",
  tr: "TR-",
  es: "ES-",
  ar: "AR-",
  de: "DE-",
  fr: "FR-",
  pl: "PL-",
};
const EXPECTED_UNIT_COUNT = 376;
const SKIP_DIRS = new Set([
  "node_modules", ".next", ".git", "dist", "build", ".turbo", "coverage",
]);

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function walkDir(dir, filterFn, results = [], depth = 0) {
  if (depth > 14) return results;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const e of entries) {
    if (e.isDirectory() && SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkDir(full, filterFn, results, depth + 1);
    } else if (filterFn(e.name, full)) {
      results.push(full);
    }
  }
  return results;
}

function findContentFiles() {
  const files = walkDir(PROJECT_ROOT, (name) =>
    /^content-[a-z]{2}(?:-[A-Z]{2})?\.generated\.json$/.test(name));
  const map = new Map();
  for (const f of files) {
    const base = path.basename(f, ".generated.json").replace(/^content-/, "");
    map.set(base, f);
  }
  return map;
}

function loadContentFile(filePath) {
  const data = readJson(filePath);
  let units;
  if (Array.isArray(data)) {
    units = data;
  } else if (data && Array.isArray(data.units)) {
    units = data.units;
  } else if (data && typeof data === "object") {
    units = Object.entries(data).map(([contentId, val]) => {
      if (typeof val === "string") return { contentId, translation: val };
      if (val && typeof val === "object") return { contentId, ...val };
      return { contentId, translation: val };
    });
  } else {
    units = [];
  }
  return units.filter((u) => u && u.contentId);
}

const report = [];
const failures = [];
const pass = (m) => report.push(`✅ ${m}`);
const fail = (m) => { report.push(`❌ ${m}`); failures.push(m); };

// === Check: 9 locales exist ===
const contentMap = findContentFiles();
const foundLocales = [...contentMap.keys()].filter((l) => LOCALES.includes(l));
const missingLocales = LOCALES.filter((l) => !contentMap.has(l));
if (foundLocales.length === 9) {
  pass("9 locale 全部存在");
} else {
  fail(`仅找到 ${foundLocales.length}/9 locale,缺失: ${missingLocales.join(", ")}`);
}

const contentByLocale = new Map();
for (const loc of LOCALES) {
  const f = contentMap.get(loc);
  if (!f) continue;
  const units = loadContentFile(f);
  const contentIds = new Set(units.map((u) => u.contentId));
  contentByLocale.set(loc, { units, contentIds, file: f });
}

// === Check 1: 9 locale key coverage = 100% ===
const coverageDetails = [];
const suffixSets = new Map();
for (const [loc, data] of contentByLocale) {
  const prefix = LOCALE_PREFIX[loc];
  const suffixes = new Set();
  for (const id of data.contentIds) {
    suffixes.add(id.startsWith(prefix) ? id.slice(prefix.length) : id);
  }
  suffixSets.set(loc, suffixes);
}

let allCoverageOk = true;
const refSet = suffixSets.get("ru");
if (refSet) {
  for (const [loc, set] of suffixSets) {
    if (loc === "ru") continue;
    const missing = [...refSet].filter((s) => !set.has(s));
    if (missing.length > 0) {
      allCoverageOk = false;
      coverageDetails.push(`${loc} 缺失 ${missing.length} 个 key: ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? "..." : ""}`);
    }
  }
} else {
  allCoverageOk = false;
  coverageDetails.push("ru 文件未找到,无法比对");
}

let unitCountOk = true;
for (const [loc, data] of contentByLocale) {
  if (data.units.length !== EXPECTED_UNIT_COUNT) {
    unitCountOk = false;
    coverageDetails.push(`${loc} 文件 unit 数量 = ${data.units.length}(期望 ${EXPECTED_UNIT_COUNT})`);
  }
}

if (allCoverageOk && unitCountOk) {
  pass(`9 locale 全部 ${EXPECTED_UNIT_COUNT} unit 覆盖率 = 100%`);
} else {
  fail(`覆盖率检查失败: ${coverageDetails.join("; ")}`);
}

// === Check 2: missing translation keys = 0 ===
let missingTranslations = 0;
const missingTransDetails = [];
for (const [loc, data] of contentByLocale) {
  for (const u of data.units) {
    const t = u.translation;
    if (t === null || t === undefined || t === "") {
      missingTranslations++;
      if (missingTransDetails.length < 10) missingTransDetails.push(`${loc}/${u.contentId}`);
    }
  }
}
if (missingTranslations === 0) {
  pass("0 missing translation keys");
} else {
  fail(`${missingTranslations} missing translation keys: ${missingTransDetails.join(", ")}${missingTranslations > 10 ? "..." : ""}`);
}

// === Check 3: orphan translation keys = 0 (relative to ru) ===
let orphanKeys = 0;
const orphanDetails = [];
const ruSuffixes = suffixSets.get("ru");
if (ruSuffixes) {
  for (const [loc, data] of contentByLocale) {
    if (loc === "ru") continue;
    const set = suffixSets.get(loc);
    for (const s of set) {
      if (!ruSuffixes.has(s)) {
        orphanKeys++;
        if (orphanDetails.length < 10) orphanDetails.push(`${loc}: ${LOCALE_PREFIX[loc]}${s}`);
      }
    }
  }
}
if (orphanKeys === 0) {
  pass("0 orphan translation keys");
} else {
  fail(`${orphanKeys} orphan translation keys: ${orphanDetails.join(", ")}${orphanKeys > 10 ? "..." : ""}`);
}

// === Check 4: duplicate locale keys = 0 ===
let duplicateKeys = 0;
const duplicateDetails = [];
for (const [loc, data] of contentByLocale) {
  const seen = new Map();
  for (const u of data.units) {
    seen.set(u.contentId, (seen.get(u.contentId) || 0) + 1);
  }
  for (const [id, count] of seen) {
    if (count > 1) {
      duplicateKeys++;
      if (duplicateDetails.length < 10) duplicateDetails.push(`${loc}/${id} (x${count})`);
    }
  }
}
if (duplicateKeys === 0) {
  pass("0 duplicate locale keys");
} else {
  fail(`${duplicateKeys} duplicate locale keys: ${duplicateDetails.join(", ")}${duplicateKeys > 10 ? "..." : ""}`);
}

// === Check 5: invalid locale prefix = 0 ===
let invalidPrefix = 0;
const invalidPrefixDetails = [];
for (const [loc, data] of contentByLocale) {
  const prefix = LOCALE_PREFIX[loc];
  for (const u of data.units) {
    if (!u.contentId.startsWith(prefix)) {
      invalidPrefix++;
      if (invalidPrefixDetails.length < 10) invalidPrefixDetails.push(`${loc}/${u.contentId} (期望前缀 ${prefix})`);
    }
  }
}
if (invalidPrefix === 0) {
  pass("0 invalid locale prefix");
} else {
  fail(`${invalidPrefix} invalid locale prefix: ${invalidPrefixDetails.join(", ")}${invalidPrefix > 10 ? "..." : ""}`);
}

// === Check 6: undefined/null UI strings = 0 ===
let undefinedUiStrings = 0;
const undefinedUiDetails = [];
const srcDir = path.join(PROJECT_ROOT, "src");
if (fs.existsSync(srcDir)) {
  const tsxFiles = walkDir(srcDir, (name) => name.endsWith(".tsx"));
  const localizedRegex = /localized\([^,]+,\s*"([^"]+)"\)/g;
  for (const file of tsxFiles) {
    let content;
    try { content = fs.readFileSync(file, "utf8"); } catch { continue; }
    let m;
    localizedRegex.lastIndex = 0;
    while ((m = localizedRegex.exec(content)) !== null) {
      const key = m[1];
      for (const [loc, data] of contentByLocale) {
        const prefix = LOCALE_PREFIX[loc];
        const expectedId = prefix + key;
        const exists = data.contentIds.has(expectedId) || data.contentIds.has(key);
        if (!exists) {
          undefinedUiStrings++;
          if (undefinedUiDetails.length < 10) undefinedUiDetails.push(`key="${key}" 在 ${loc} 文件中未找到(期望 ${expectedId})`);
        }
      }
    }
  }
}
if (undefinedUiStrings === 0) {
  pass("0 undefined/null UI strings");
} else {
  fail(`${undefinedUiStrings} undefined/null UI strings: ${undefinedUiDetails.join(", ")}${undefinedUiStrings > 10 ? "..." : ""}`);
}

// === Check 7: hardcoded locale === "ru"/"en" in src/app/[lang]/**/*.tsx ===
let hardcodedViolations = 0;
const hardcodedDetails = [];
const langDir = path.join(PROJECT_ROOT, "src", "app", "[lang]");
if (fs.existsSync(langDir)) {
  const langTsFiles = walkDir(langDir, (name) => name.endsWith(".tsx"));
  const hardcodedRegex = /locale\s*===\s*['"](?:ru|en)['"]/g;
  const excRegex1 = /\?[^?:]*?\b\w+Ru\b[^:]*?:[^?:;)\]]*?\b\w+En\b/;
  const excRegex2 = /\?[^?:]*?\b\w+En\b[^:]*?:[^?:;)\]]*?\b\w+Ru\b/;

  for (const file of langTsFiles) {
    let content;
    try { content = fs.readFileSync(file, "utf8"); } catch { continue; }
    let m;
    hardcodedRegex.lastIndex = 0;
    while ((m = hardcodedRegex.exec(content)) !== null) {
      const start = m.index;
      const ctx = content.slice(Math.max(0, start - 20), Math.min(content.length, start + 300));
      if (excRegex1.test(ctx) || excRegex2.test(ctx)) continue;
      hardcodedViolations++;
      if (hardcodedDetails.length < 10) {
        const line = content.slice(0, start).split("\n").length;
        const lineContent = (content.split("\n")[line - 1] || "").trim();
        hardcodedDetails.push(`${path.relative(PROJECT_ROOT, file)}:${line} ${lineContent.slice(0, 120)}`);
      }
    }
  }
}
if (hardcodedViolations === 0) {
  pass('0 未翻译硬编码 locale === "ru" (允许的产品数据字段选择除外)');
} else {
  fail(`${hardcodedViolations} 个未翻译硬编码 locale: ${hardcodedDetails.join(" | ")}${hardcodedViolations > 10 ? "..." : ""}`);
}

// === Check 8: generateStaticParams returns 9 locales ===
// 支持两种实现模式:
//  (a) 函数体内直接写 locale 字面量;
//  (b) 引用 LOCALES 常量(如 LOCALES.map(...)),此时去 locale.ts 验证 LOCALES 数组。
const layoutPath = path.join(PROJECT_ROOT, "src", "app", "[lang]", "layout.tsx");
const localePath = path.join(PROJECT_ROOT, "src", "lib", "locale.ts");
let routeCount = 0;
let routeDetails = [];
if (fs.existsSync(layoutPath)) {
  const content = fs.readFileSync(layoutPath, "utf8");
  const fnMatch = content.match(/generateStaticParams\s*\([^)]*\)\s*(?::\s*[^{]*)?\{/);
  let body = "";
  if (fnMatch) {
    const startIdx = fnMatch.index + fnMatch[0].length;
    let depth = 1;
    let i = startIdx;
    while (i < content.length && depth > 0) {
      if (content[i] === "{") depth++;
      else if (content[i] === "}") depth--;
      i++;
    }
    body = content.slice(startIdx, i - 1);
  }
  const present = [];
  for (const loc of LOCALES) {
    const esc = loc.replace("-", "\\-");
    if (new RegExp(`['"]${esc}['"]`).test(body)) present.push(loc);
  }
  // 模式 (b):函数体引用了 LOCALES 常量 → 验证 locale.ts 的 LOCALES 数组
  if (present.length < 9 && /LOCALES\b/.test(body) && fs.existsSync(localePath)) {
    const locSrc = fs.readFileSync(localePath, "utf8");
    // 跳过类型声明(Locale[]),匹配 = [ ... ] 的数组内容
    const arrMatch = locSrc.match(/export\s+const\s+LOCALES[^=]*=\s*\[([\s\S]*?)\]/);
    if (arrMatch) {
      present.length = 0;
      for (const loc of LOCALES) {
        const esc = loc.replace("-", "\\-");
        if (new RegExp(`['"]${esc}['"]`).test(arrMatch[1])) present.push(loc);
      }
    }
  }
  routeCount = present.length;
  routeDetails = present;
}
if (routeCount === 9) {
  pass("9/9 locale route 可访问");
} else {
  const missing = LOCALES.filter((l) => !routeDetails.includes(l));
  fail(`${routeCount}/9 locale route 可访问,缺失: ${missing.join(", ")}`);
}

// === Output ===
console.log("i18n 完整性检查报告");
console.log("========================");
for (const line of report) console.log(line);
console.log("========================");
if (failures.length === 0) {
  console.log("PASS");
  process.exit(0);
} else {
  console.log("FAIL");
  process.exit(1);
}
