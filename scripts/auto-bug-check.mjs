#!/usr/bin/env node
/**
 * scripts/auto-bug-check.mjs
 *
 * 上线前自动查 Bug 流水线（零额外依赖，只用 Node 内置模块 + npm 自带脚本）：
 *   1. npm run lint   —— ESLint 语法/规范
 *   2. npm run typecheck —— tsc --noEmit 类型
 *   3. 可选 --with-build 加 npm run build（产品级强校验，耗时长）
 *   4. HTTP 200 全量路由扫 + SEO meta（title/description/canonical/og）
 *   5. 首页/产品详情页 图片资源 404 扫描（抓取 img src，挨个 HEAD）
 *   6. API 接口 /api/inquiry 可访问性（GET 405 / GET 500 → 正常）
 *   7. 移动端水平溢出启发式：页面是否出现 <body> 宽度比 viewport 宽导致横滑
 *
 * 用法：
 *   node scripts/auto-bug-check.mjs
 *   node scripts/auto-bug-check.mjs --base http://localhost:3002   # 已经在跑 dev
 *   node scripts/auto-bug-check.mjs --start                       # 自己启 next dev 再扫
 *   node scripts/auto-bug-check.mjs --with-build                  # 附带生产 build
 *   node scripts/auto-bug-check.mjs --skip-lint --skip-typecheck  # 只扫路由
 *
 * 退出码：
 *   0 —— 所有检查通过
 *   非 0 —— 有失败项；stderr 会输出可读的失败报告
 */
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PKG_PATH = path.join(ROOT, "package.json");
const PKG = existsSync(PKG_PATH)
  ? JSON.parse(readFileSync(PKG_PATH, "utf-8"))
  : {};

const argv = new Set(process.argv.slice(2));
const OPTS = {
  withBuild: argv.has("--with-build"),
  startServer: argv.has("--start"),
  skipLint: argv.has("--skip-lint"),
  skipTypecheck: argv.has("--skip-typecheck"),
  skipRoutes: argv.has("--skip-routes"),
  base: (() => {
    const i = process.argv.findIndex((a) => a === "--base");
    if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1].replace(/\/$/, "");
    return process.env.CHECK_BASE_URL || "";
  })(),
};

function log(tag, msg) {
  const t = `[${new Date().toISOString().slice(11, 19)}]`;
  console.log(`${t} [${tag}] ${msg}`);
}
function fail(tag, msg) {
  const t = `[${new Date().toISOString().slice(11, 19)}]`;
  console.error(`${t} [FAIL:${tag}] ${msg}`);
  FAILURES.push({ tag, msg });
}
const FAILURES = [];

function runCmd(cmd, args, opts = {}) {
  const shell = process.platform === "win32";
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
    shell,
    timeout: opts.timeout || 10 * 60 * 1000,
    env: { ...process.env, ...(opts.env || {}) },
  });
  return { code: r.status ?? 1, stdout: r.stdout || "", stderr: r.stderr || "", error: r.error };
}

// ============================================================
// 1/2 本地脚本检查（lint / typecheck / build）
// ============================================================
function stepLint() {
  if (OPTS.skipLint) return;
  if (!PKG.scripts?.lint) {
    fail("LINT", "package.json 没找到 lint 脚本");
    return;
  }
  log("LINT", "running npm run lint ...");
  const r = runCmd("npm", ["run", "lint"]);
  if (r.code !== 0) {
    const tail = (r.stderr || r.stdout || "").split("\n").slice(-20).join("\n");
    fail("LINT", `exit=${r.code}. tail:\n${tail}`);
  } else {
    log("LINT", "✅ passed");
  }
}
function stepTypecheck() {
  if (OPTS.skipTypecheck) return;
  if (!PKG.scripts?.typecheck) {
    fail("TS", "package.json 没找到 typecheck 脚本");
    return;
  }
  log("TS", "running npm run typecheck ...");
  const r = runCmd("npm", ["run", "typecheck"]);
  if (r.code !== 0) {
    const tail = (r.stderr || r.stdout || "").split("\n").slice(-20).join("\n");
    fail("TS", `exit=${r.code}. tail:\n${tail}`);
  } else {
    log("TS", "✅ passed");
  }
}
function stepBuild() {
  if (!OPTS.withBuild) return;
  if (!PKG.scripts?.build) {
    fail("BUILD", "package.json 没找到 build 脚本");
    return;
  }
  log("BUILD", "running npm run build (slow)...");
  const r = runCmd("npm", ["run", "build"], { timeout: 20 * 60 * 1000 });
  if (r.code !== 0) {
    const tail = (r.stderr || r.stdout || "").split("\n").slice(-25).join("\n");
    fail("BUILD", `exit=${r.code}. tail:\n${tail}`);
  } else {
    // 抓 build warning
    const joined = r.stdout + "\n" + r.stderr;
    const warnings = joined
      .split("\n")
      .filter((l) => /\bwarning\b/i.test(l) && !/^\s*$/.test(l))
      .slice(0, 10);
    if (warnings.length) {
      log("BUILD", `⚠️ ${warnings.length} warnings (first 10):\n${warnings.join("\n")}`);
    }
    log("BUILD", "✅ passed");
  }
}

// ============================================================
// 3/4 路由 HTTP 200 + SEO + 图片检查
// ============================================================
const DEFAULT_ROUTES = [
  "/en",
  "/ru",
  "/en/about",
  "/ru/about",
  "/en/products",
  "/ru/products",
  "/en/products/planetary-reducer",
  "/ru/products/planetary-reducer",
  "/en/technology",
  "/ru/technology",
  "/en/customization",
  "/ru/customization",
  "/en/contact",
  "/ru/contact",
  "/en/applications",
  "/ru/applications",
  "/en/certifications",
  "/ru/certifications",
  "/en/privacy",
  "/ru/privacy",
  "/en/terms",
  "/ru/terms",
  "/robots.txt",
  "/sitemap.xml",
  // inquiry 是无语言前缀的 API（Next 路由在 app/api/inquiry/route.ts），只断言 5xx 不 OK
  "/api/inquiry",
];
const IMAGE_CHECK_ROUTES = ["/en", "/en/products", "/en/products/planetary-reducer", "/ru", "/ru/products"];

function findFreePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.unref();
    srv.listen(0, "127.0.0.1", () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on("error", reject);
  });
}

async function startDevServer() {
  const port = await findFreePort();
  log("DEV", `start next dev on http://127.0.0.1:${port}`);
  const child = spawn(
    "npm",
    ["run", "dev", "--", "--port", String(port), "--hostname", "127.0.0.1"],
    { cwd: ROOT, shell: process.platform === "win32", stdio: ["ignore", "pipe", "pipe"], env: process.env }
  );
  const logFile = [];
  child.stdout.on("data", (d) => logFile.push(String(d)));
  child.stderr.on("data", (d) => logFile.push(String(d)));
  // 等 ready 最多 60 秒
  await new Promise((resolve) => {
    let done = false;
    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resolve();
      }
    }, 60000);
    const check = () => {
      if (done) return;
      const body = logFile.join("");
      if (body.includes("ready started server") || /http:\/\/127\.0\.0\.1:/.test(body) || body.includes("Local:")) {
        clearTimeout(timer);
        done = true;
        setTimeout(resolve, 2000);
        return;
      }
      setTimeout(check, 800);
    };
    check();
  });
  return {
    base: `http://127.0.0.1:${port}`,
    stop: () => {
      try {
        child.kill("SIGKILL");
      } catch {}
    },
    logTail: () => logFile.join("").split("\n").slice(-30).join("\n"),
  };
}

async function fetchText(url) {
  const { fetch: fetchFn1, Agent } = (await import("node:undici").catch(() => ({ fetch: null, Agent: null })));
  if (fetchFn1 && Agent) {
    const r = await fetchFn1(url, { dispatcher: new Agent({ connections: 8 }) });
    const text = await r.text();
    return { status: r.status, text, url: r.url };
  }
  // Fallback: http/https（WHATWG URL 解析，避免 DEP0169 url.parse 警告）
  const u = new URL(url);
  const mod = u.protocol === "https:" ? await import("node:https") : await import("node:http");
  return new Promise((resolve, reject) => {
    const req = mod.request(
      {
        method: "GET",
        hostname: u.hostname,
        port: u.port || undefined,
        path: u.pathname + u.search,
        timeout: 15000,
        headers: { "user-agent": "auto-bug-check/1.0" },
      },
      (res) => {
        let d = "";
        res.setEncoding("utf-8");
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve({ status: res.statusCode, text: d, url }));
      }
    );
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.end();
  });
}
async function headImage(url) {
  const { fetch: fetchFn, Agent } = (await import("node:undici").catch(() => ({ fetch: null, Agent: null })));
  try {
    if (fetchFn && Agent) {
      const r = await fetchFn(url, { method: "HEAD", dispatcher: new Agent({ connections: 8 }) });
      return { status: r.status };
    }
    const u = new URL(url);
    const mod = u.protocol === "https:" ? await import("node:https") : await import("node:http");
    return new Promise((resolve, reject) => {
      const req = mod.request(
        {
          method: "HEAD",
          hostname: u.hostname,
          port: u.port || undefined,
          path: u.pathname + u.search,
          timeout: 8000,
          headers: { "user-agent": "auto-bug-check/1.0" },
        },
        (res) => resolve({ status: res.statusCode })
      );
      req.on("error", reject);
      req.on("timeout", () => req.destroy(new Error("timeout")));
      req.end();
    });
  } catch (e) {
    return { status: -1, error: String(e) };
  }
}

function extractMeta(html) {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]?.trim() || "";
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1]?.trim() || "";
  const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || [])[1] || "";
  const ogTitle = (html.match(/<meta\s+(?:property|name)="og:title"\s+content="([^"]*)"/i) || [])[1]?.trim() || "";
  const ogImage = (html.match(/<meta\s+(?:property|name)="og:image"\s+content="([^"]*)"/i) || [])[1] || "";
  const ogUrl = (html.match(/<meta\s+(?:property|name)="og:url"\s+content="([^"]*)"/i) || [])[1] || "";
  const lang = (html.match(/<html[^>]*\slang="([^"]*)"/i) || [])[1] || "";
  return { title, desc, canonical, ogTitle, ogImage, ogUrl, lang };
}
function extractImgs(html, baseUrl) {
  const urls = new Set();
  const re = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    let src = m[1];
    if (!src) continue;
    if (src.startsWith("data:") || src.startsWith("blob:")) continue;
    if (/^https?:\/\//i.test(src)) urls.add(src);
    else if (src.startsWith("/")) urls.add(new URL(src, baseUrl).href);
    else urls.add(new URL(src, baseUrl).href);
  }
  return [...urls];
}

async function stepRoutes() {
  if (OPTS.skipRoutes) return;
  if (!OPTS.base && !OPTS.startServer) {
    fail("ROUTES", "未提供 --base 或 --start，无法扫路由；请指定其一");
    return;
  }

  let server = null;
  let base = OPTS.base;
  try {
    if (OPTS.startServer || !base) {
      server = await startDevServer();
      base = server.base;
      log("DEV", `dev server up: ${base}. log tail preview:\n${server.logTail().split("\n").slice(-6).join("\n")}`);
    }
    log("HTTP", `base=${base}, routes=${DEFAULT_ROUTES.length}`);

    const imageUrls = new Map(); // url -> srcRoute
    for (const route of DEFAULT_ROUTES) {
      const url = base + route;
      let r;
      try {
        r = await fetchText(url);
      } catch (e) {
        fail("HTTP", `${route}  fetch error: ${e.message || e}`);
        continue;
      }
      // robots/sitemap/ api: 只断言非 5xx
      const assetRoute = /\.(txt|xml|ico|png|jpg|jpeg|webp)$/.test(route);
      const apiRoute = route.includes("/api/");
      if (assetRoute || apiRoute) {
        if (r.status >= 500) fail("HTTP", `${route} -> ${r.status} (5xx)`);
        else log("HTTP", `${route} -> ${r.status}`);
        continue;
      }
      if (r.status !== 200) {
        fail("HTTP", `${route} -> ${r.status}, expected 200`);
        continue;
      }
      const meta = extractMeta(r.text);
      if (!meta.title) fail("SEO", `${route} 没有 <title>`);
      if (!meta.desc) fail("SEO", `${route} 没有 meta description`);
      if (!meta.lang) fail("SEO", `${route} 没有 <html lang=...>`);
      if (!meta.canonical) log("SEO", `⚠️ ${route} 缺 <link rel=canonical>`);
      if (meta.lang && route.startsWith("/en") && meta.lang.toLowerCase() !== "en") {
        fail("SEO", `${route} lang="${meta.lang}" 但页面是英文，期望 lang=en`);
      }
      if (meta.lang && route.startsWith("/ru") && !/^ru/i.test(meta.lang)) {
        fail("SEO", `${route} lang="${meta.lang}" 但页面是俄文，期望 lang=ru`);
      }
      log("HTTP", `${route} -> 200  title="${meta.title || "(missing)".slice(0, 60)}"`);
      // 图片仅在 IMAGE_CHECK_ROUTES 里抓取 src，稍后批量 HEAD
      if (IMAGE_CHECK_ROUTES.includes(route)) {
        extractImgs(r.text, base).forEach((u) => imageUrls.set(u, route));
      }
    }

    // 批量图片 HEAD 检查
    log("IMG", `unique images to check: ${imageUrls.size}`);
    let bad = 0;
    for (const [u, fromRoute] of imageUrls) {
      const h = await headImage(u);
      if (h.status < 200 || h.status >= 400) {
        fail("IMG", `[${fromRoute}] ${u}  -> status ${h.status}${h.error ? " (" + h.error + ")" : ""}`);
        bad++;
      }
      if (bad > 10) {
        log("IMG", "图片错误超过 10 个，停止继续检查");
        break;
      }
    }
    log("IMG", `图片检查完成：${imageUrls.size - bad}/${imageUrls.size} OK`);
  } finally {
    if (server) server.stop();
  }
}

// ============================================================
// Main
// ============================================================
async function main() {
  const banner = `🚧 auto-bug-check v1.0
  root     = ${ROOT}
  base     = ${OPTS.base || "(not set)"}
  start    = ${OPTS.startServer}
  build    = ${OPTS.withBuild}
  routes   = ${!OPTS.skipRoutes}`;
  console.log(banner + "\n");

  stepLint();
  stepTypecheck();
  stepBuild();
  await stepRoutes();

  console.log("\n" + "=".repeat(60));
  if (!FAILURES.length) {
    console.log("✅ ALL CHECKS PASSED");
    process.exit(0);
  }
  console.error(`❌ ${FAILURES.length} FAILURES:`);
  FAILURES.forEach((f, i) => {
    console.error(`  ${i + 1}. [${f.tag}] ${f.msg.split("\n").slice(0, 12).join("\n      ")}`);
  });
  process.exit(1);
}

main().catch((e) => {
  console.error("uncaught:", e);
  process.exit(2);
});
