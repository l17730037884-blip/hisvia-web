#!/usr/bin/env python3
"""STEP 2.5 NEW Products Index QA — programmatic checks + screenshots to disk (no base64)."""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4317"
OUT = Path(__file__).resolve().parent.parent / "reports/screenshots/phase4-step2"
OUT.mkdir(parents=True, exist_ok=True)

EXPECT = {
    "en": {
        "title": "Products | Bengbu Planetary Engineering Machinery Co., Ltd.",
        "h1": "Products",
        "desc": "Products — official information from Bengbu Planetary Engineering Machinery Co., Ltd. (AGV precision reducers).",
        "family": "planetary reducer",
        "intro": "key core component",
    },
    "ru": {
        "title": "Продукция | Бэнбу Планетарное Машиностроительное Предприятие",
        "h1": "Продукция",
        "desc": "Products — официальная информация ООО «Бэнбу Планетарное Машиностроительное Предприятие» (прецизионные редукторы AGV).",
        "family": "планетарный редуктор",
        "intro": "ключевой компонент",
    },
}
FORBIDDEN = ["UNKNOWN", "UNCERTAIN", "TBD", "TODO", "hydraulic", "Гидравлический"]

results = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    for lang in ("en", "ru"):
        for viewport, vname in ([(1440, 900), "desktop"], [(390, 844), "mobile"]):
            page = browser.new_page(viewport={"width": viewport[0], "height": viewport[1]})
            url = f"{BASE}/{lang}/products"
            resp = page.goto(url, wait_until="load", timeout=45000)
            page.wait_for_timeout(300)
            key = f"{lang}-{vname}"
            e = EXPECT[lang]
            body = page.inner_text("body")
            html = page.content()
            checks = {
                "http": resp.status,
                "title": page.title() == e["title"],
                "meta_desc": page.evaluate(
                    f"() => document.querySelector('meta[name=description]')?.content === {json.dumps(e['desc'])}"
                ),
                "h1": page.locator("h1").first.inner_text().strip() == e["h1"],
                "family_name": e["family"] in body,
                "family_intro": e["intro"] in body,
                "detail_cta": page.evaluate(
                    f"() => !!document.querySelector('a[href=\"/{lang}/products/planetary-reducer\"]')"
                ),
                "single_family_card": page.evaluate(
                    "() => document.querySelectorAll('main a[href*=\"/products/planetary-reducer\"]').length <= 2"
                ),
                "no_16_model_urls": not any(
                    f"/{lang}/products/301-2" in html or "/products/goa91f" in html
                    for _ in [0]
                ),
                "img_loaded": page.evaluate(
                    "() => { const i=[...document.querySelectorAll('img')].find(x=>x.alt.includes('reducer')||x.alt.includes('редуктор')); return !!i && i.complete && i.naturalWidth>0; }"
                ),
                "breadcrumb": page.locator('nav[aria-label=Breadcrumb]').count() >= 1,
                "jsonld_org": page.evaluate(
                    "() => { const s=[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x=>JSON.parse(x.textContent)); return s.some(o=>o['@type']==='Organization'); }"
                ),
                "jsonld_breadcrumb": page.evaluate(
                    "() => { const s=[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x=>JSON.parse(x.textContent)); return s.some(o=>o['@type']==='BreadcrumbList' && o.itemListElement.length===2); }"
                ),
                "canonical": page.evaluate(
                    "() => document.querySelector('link[rel=canonical]')?.href.endsWith('" + lang + "/products')"
                ),
                "hreflang_ru": page.evaluate(
                    "() => document.querySelector('link[hreflang=ru]')?.href.endsWith('/ru/products')"
                ),
                "hreflang_en": page.evaluate(
                    "() => document.querySelector('link[hreflang=en]')?.href.endsWith('/en/products')"
                ),
                "hreflang_xdefault": page.evaluate(
                    "() => document.querySelector('link[hreflang=x-default]')?.href.endsWith('/en/products')"
                ),
                "no_fake_email": "mailto:" not in html and "@" not in body,
                "unknown_hygiene": all(f not in body for f in FORBIDDEN),
                "no_h_overflow": page.evaluate(
                    "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
                ),
                "clipped_text": page.evaluate(
                    """() => { const bad=[];
                      document.querySelectorAll('main p,main span,main a,main li,main h1,main h2,main h3').forEach(el=>{
                        const r=el.getBoundingClientRect();
                        if(r.width>0 && el.scrollWidth>el.clientWidth+1 && el.children.length===0) bad.push(el.textContent.trim().slice(0,40));});
                      return bad.slice(0,8); }"""
                ),
                "touch_targets": page.evaluate(
                    """() => { const bad=[];
                      document.querySelectorAll('main a,main button').forEach(el=>{
                        const r=el.getBoundingClientRect();
                        if(r.width>0 && (r.width<44||r.height<44)) bad.push((el.textContent||'').trim().slice(0,30));});
                      return bad; }"""
                ),
                "header_present": page.locator("header").count() >= 1,
                "footer_present": page.locator("footer").count() >= 1,
            }
            shot = OUT / f"products-index-{key}.png"
            page.screenshot(path=str(shot), full_page=True)
            checks["screenshot"] = str(shot)
            results[key] = checks
            page.close()
    browser.close()

# programmatic visual verification (pixel-level; no image embedding per token rules)
try:
    from PIL import Image
    stats = {}
    for f in sorted(OUT.glob("products-index-*.png")):
        im = Image.open(f).convert("RGB")
        w, h = im.size
        px = list(im.getdata())
        n = len(px)
        nonwhite = sum(1 for r, g, b in px if not (r > 245 and g > 245 and b > 245)) / n
        dark = sum(1 for r, g, b in px if r + g + b < 300) / n
        amber = sum(1 for r, g, b in px if r > 120 and 60 < g < 130 and b < 60) / n
        colored = sum(1 for r, g, b in px if max(r, g, b) - min(r, g, b) > 40) / n
        stats[f.name] = {"size": f"{w}x{h}", "nonwhite": round(nonwhite, 4), "dark_band": round(dark, 4), "amber_accent": round(amber, 4), "colored": round(colored, 4)}
    results["pixel_stats"] = stats
except ImportError:
    results["pixel_stats"] = "PIL not available"

print(json.dumps(results, ensure_ascii=False, indent=1))
failed = []
for k, c in results.items():
    if k == "pixel_stats":
        continue
    for name, ok in c.items():
        if name not in ("http", "screenshot", "clipped_text", "touch_targets") and ok is not True:
            failed.append(f"{k}.{name}")
    if c.get("clipped_text"):
        failed.append(f"{k}.clipped_text={c['clipped_text'][:3]}")
    if c.get("touch_targets"):
        failed.append(f"{k}.touch_targets={c['touch_targets'][:3]}")
print("FAILED:", failed if failed else "NONE")
sys.exit(1 if failed else 0)
