// STEP 1 — 数据同步脚本: 只读 Phase 0-3 锁定产物 → 生成 src/data + public/assets
// 禁止修改源文件。产品/翻译/资产全部来自锁定 JSON。
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SRC = "/Users/liujunkai/skill-library/skills/reports/pdf-web";
const read = (f) => JSON.parse(readFileSync(join(SRC, f), "utf8"));

const sot   = read("source-of-truth-final.json");
const cRu   = read("content-ru.json");
const cEn   = read("content-en.json");
const roles = read("asset-roles.json");
const pim   = read("product-image-mapping.json");
const ia    = read("website-ia.json");
const gloss = read("glossary.json");

// ---------- products ----------
const slugify = (model) => model.split("(")[0].toLowerCase();
const products = sot.products.map((p) => ({
  productId: p.productId,
  model: p.model,
  slug: slugify(p.model),
  variant: p.variant || null,
  sourcePage: p.sourcePage,
  contentId: p.contentId,
  imageAssetIds: p.imageAssetIds,
  parameters: p.parameters.map((x) => ({ name: x.parameter, value: x.value })),
  application: p.application,
  customNote: p.customNote,
}));
writeFileSync(join(ROOT, "src/data/products.generated.json"), JSON.stringify({ generatedAt: new Date().toISOString(), count: products.length, products }, null, 1));

// ---------- product families (business model correction: 1 LIVE family) ----------
// Family naming locked: glossary TT-03 (行星减速机). Detail slug confirmed: planetary-reducer.
// Future families are schema-extension only; never generate placeholder content.
const TT03 = gloss.terms.find((t) => t.termId === "TT-03");
const families = [
  {
    familyId: "PLANETARY",
    slug: "planetary-reducer",
    nameEn: TT03 ? TT03.en : null,
    nameRu: TT03 ? TT03.ru : null,
    modelCount: products.length,
    introContentId: "P04-B02",
    imageAssetIds: ["ASSET-18"],
  },
];
writeFileSync(join(ROOT, "src/data/families.generated.json"), JSON.stringify({ generatedAt: new Date().toISOString(), count: families.length, families }, null, 1));

// ---------- content (locked translations) ----------
for (const [name, d] of [["content-ru.generated.json", cRu], ["content-en.generated.json", cEn]]) {
  writeFileSync(join(ROOT, `src/data/${name}`), JSON.stringify({ generatedAt: new Date().toISOString(), language: d.language, units: d.units }, null, 1));
}

// ---------- nav ----------
writeFileSync(join(ROOT, "src/data/nav.generated.json"), JSON.stringify({ generatedAt: new Date().toISOString(), nav: ia.nav, pages: ia.pages }, null, 1));

// ---------- assets ----------
const binOk = { "ASSET-28": "ASSET-28.png", "ASSET-29": "ASSET-29.png", "ASSET-31": "ASSET-31.png" };
const assetDir = join(SRC, "assets/embedded");
const outDir = join(ROOT, "public/assets");
mkdirSync(outDir, { recursive: true });
const assets = [];
const copied = [];
for (const a of roles.assets) {
  const file = a.file;
  if (!file) continue;
  const ext = file.split(".").pop();
  let renderedPath = null;
  if (binOk[a.assetId]) {
    const srcPng = `/tmp/p11-obj/${binOk[a.assetId]}`;
    if (existsSync(srcPng)) {
      const dst = `${a.assetId}.png`;
      copyFileSync(srcPng, join(outDir, dst));
      renderedPath = `/assets/${dst}`;
      copied.push(`${a.assetId} <- ${srcPng}`);
    }
  } else if (ext === "jpg" || ext === "jpeg") {
    const srcJpg = join(assetDir, file);
    if (existsSync(srcJpg)) {
      const dst = `${a.assetId}.jpg`;
      copyFileSync(srcJpg, join(outDir, dst));
      renderedPath = `/assets/${dst}`;
      copied.push(`${a.assetId} <- ${file}`);
    }
  }
  assets.push({
    assetId: a.assetId, file, pdfObj: a.pdfObj, role: a.primaryRole,
    pages: a.relatedPages || [], relatedProducts: a.relatedProducts || [],
    renderedPath,
    missing: renderedPath ? false : true,
  });
}
// product image mapping
const productImages = pim.entries.map((m) => ({ productId: m.productId, model: m.model, assetIds: m.assetIds, position: m.position }));
writeFileSync(join(ROOT, "src/data/assets.generated.json"), JSON.stringify({ generatedAt: new Date().toISOString(), assets, productImages }, null, 1));

// ---------- site (company/cert basics) ----------
const certs = sot.certifications.map((c) => ({ certId: c.certId, item: c.item, cn: c.cn, confidence: c.confidence, status: c.status }));
writeFileSync(join(ROOT, "src/data/site.generated.json"), JSON.stringify({
  generatedAt: new Date().toISOString(),
  company: sot.company,
  companyFacts: sot.companyFacts,
  certifications: certs,
  uncertainCount: sot.uncertainItems.length,
  uncertainIds: sot.uncertainItems.map((u) => u.id),
}, null, 1));

console.log("products:", products.length);
console.log("content units: ru", cRu.units.length, "en", cEn.units.length);
console.log("assets:", assets.length, "| copied:", copied.length, "| missing:", assets.filter((a) => a.missing).map((a) => a.assetId));
console.log("copied sample:", copied.slice(0, 6));
