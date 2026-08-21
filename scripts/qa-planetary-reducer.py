#!/usr/bin/env python3
"""STEP 2.6 Planetary Reducer detail page QA — programmatic checks + screenshots to disk (no base64)."""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4317"
OUT = Path(__file__).resolve().parent.parent / "reports/screenshots/phase4-step2"
OUT.mkdir(parents=True, exist_ok=True)

EXPECT = {
    "en": {
        "title": "planetary reducer | Bengbu Planetary Engineering Machinery Co., Ltd.",
        "h1": "planetary reducer",
        "desc": "planetary reducer — official information from Bengbu Planetary Engineering Machinery Co., Ltd. (AGV precision reducers).",
        "param_label": "Rated power",
        "param_value": "3KW",
        "model_a": "301-2-001040-00 (with brake shaft)",
        "model_b": "301-2-001016-00 (with brake shaft)",
        "support": "(single/double support)",
        "goa": "GOA91F-00C",
        "afr": "AFR90-L2-C20",
    },
    "ru": {
        "title": "планетарный редуктор | Бэнбу Планетарное Машиностроительное Предприятие",
        "h1": "планетарный редуктор",
        "desc": "планетарный редуктор — официальная информация ООО «Бэнбу Планетарное Машиностроительное Предприятие» (прецизионные редукторы AGV).",
        "param_label": "Номинальная мощность",
        "param_value": "3KW",
        "model_a": "301-2-001040-00 (с тормозным валом)",
        "model_b": "301-2-001016-00 (с тормозным валом)",
        "support": "(одно-/двухопорное исполнение)",
        "goa": "GOA91F-00C",
        "afr": "AFR90-L2-C20",
    },
}
MODEL_IDS = ["p06-a","p06-b","p07-a","p07-b","p08-a","p08-b","p09-a","p09-b",
             "p10-a","p10-b","p11-a","p11-b","p12-a","p12-b","p13-a","p13-b"]
VIEWPORTS = [(1440,900,"desktop"),(1280,800,"desktop-1280"),(1024,768,"tablet-1024"),
             (768,1024,"tablet-768"),(390,844,"mobile"),(375,812,"mobile-375")]
FORBIDDEN = ["UNKNOWN","UNCERTAIN","TBD","TODO","placeholder","lorem","hydraulic",
             "Гидравлический","цилиндр","研发及产业化","不退不换","не подлежит возврату"]

results = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(reduced_motion="reduce")
    ctx_default = None
    for lang in ("en","ru"):
        for width, height, vname in VIEWPORTS:
            page = ctx.new_page()
            page.set_viewport_size({"width":width,"height":height})
            url = f"{BASE}/{lang}/products/planetary-reducer"
            resp = page.goto(url, wait_until="load", timeout=45000)
            page.wait_for_timeout(300)
            key = f"{lang}-{vname}"
            e = EXPECT[lang]
            body = page.inner_text("body")
            checks = {
                "http": resp.status,
                "title": page.title() == e["title"],
                "meta_desc": page.evaluate(
                    f"() => document.querySelector('meta[name=description]')?.content === {json.dumps(e['desc'])}"
                ),
                "h1": page.locator("h1").first.inner_text().strip() == e["h1"],
                "breadcrumb": page.locator('nav[aria-label=Breadcrumb]').count() >= 1,
                "canonical": page.evaluate(
                    f"() => document.querySelector('link[rel=canonical]')?.href.endsWith('/{lang}/products/planetary-reducer')"
                ),
                "hreflang_ru": page.evaluate(
                    "() => document.querySelector('link[hreflang=ru]')?.href.endsWith('/ru/products/planetary-reducer')"
                ),
                "hreflang_en": page.evaluate(
                    "() => document.querySelector('link[hreflang=en]')?.href.endsWith('/en/products/planetary-reducer')"
                ),
                "hreflang_xdefault": page.evaluate(
                    "() => document.querySelector('link[hreflang=x-default]')?.href.endsWith('/en/products/planetary-reducer')"
                ),
                "jsonld_org": page.evaluate(
                    "() => { const s=[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x=>JSON.parse(x.textContent)); const o=s.find(x=>x['@type']==='Organization'); return Boolean(o && !o.email && o.telephone); }"
                ),
                "jsonld_breadcrumb3": page.evaluate(
                    "() => { const s=[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x=>JSON.parse(x.textContent)); return s.some(o=>o['@type']==='BreadcrumbList' && o.itemListElement.length===3); }"
                ),
                "jsonld_product": page.evaluate(
                    "() => { const s=[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x=>JSON.parse(x.textContent)); const o=s.find(x=>x['@type']==='Product'); return !!o && !!o.name && !o.email && !o.brand && !o.offers; }"
                ),
                "hero_img": page.evaluate(
                    "() => { const i=[...document.querySelectorAll('img')].find(x=>x.complete && x.naturalWidth>0); return !!i; }"
                ),
                "model_blocks_16": page.evaluate(
                    f"() => document.querySelectorAll('article[id]').length === 16"
                ),
                "anchors_16": page.evaluate(
                    f"() => {json.dumps(MODEL_IDS)}.every(id => document.getElementById(id));"
                ),
                "anchor_links_16": page.evaluate(
                    f"() => {json.dumps(MODEL_IDS)}.every(id => !!document.querySelector('a[href=\"#'+id+'\"]'));"
                ),
                "protected_001040_2x": body.count("301-2-001040-00") >= 2,
                "protected_001016": "301-2-001016-00" in body,
                "protected_goa": e["goa"] in body,
                "protected_afr": e["afr"] in body,
                "p06_variants_kept": e["model_a"] in body and e["model_b"] in body,
                "p07_variants_kept": body.count(e["support"]) >= 2,
                "param_pair": page.evaluate(
                    f"""() => {{ const rows=[...document.querySelectorAll('tr')];
                      return rows.some(tr => (tr.querySelector('th')?.textContent||'').trim().startsWith({json.dumps(e['param_label'])}) && (tr.querySelector('td')?.textContent||'').trim() === {json.dumps(e['param_value'])}); }}"""
                ),
                "param_label_value_split": page.evaluate(
                    "() => { const th=[...document.querySelectorAll('th')].find(x=>x.textContent.trim().startsWith('Rated power')||x.textContent.trim().startsWith('Номинальная мощность')); return !!th && !th.textContent.includes('=') && !th.textContent.includes('3KW'); }"
                ),
                "phone": "400-0552-863" in body,
                "tel_href": page.evaluate(
                    "() => !!document.querySelector('a[href=\"tel:4000552863\"]')"
                ),
                "no_fake_email": "mailto:" not in page.content() and "@" not in body,
                "unknown_hygiene": all(f not in body for f in FORBIDDEN),
                "no_h_overflow": page.evaluate(
                    "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
                ),
                "clipped_text": page.evaluate(
                    """() => { const bad=[];
                      document.querySelectorAll('main p,main span,main a,main li,main h1,main h2,main h3,main th,main td').forEach(el=>{
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
            if vname in ("tablet-1024",):
                checks["hamburger_1024"] = page.evaluate(
                    "() => { const btn=document.querySelector('button[aria-label=\"Open menu\"]'); const nav=document.querySelector('nav[aria-label=Main]'); return !!btn && getComputedStyle(btn).display!=='none' && (!nav || getComputedStyle(nav).display==='none'); }"
                )
            if vname in ("desktop","mobile"):
                shot = OUT / f"planetary-reducer-{lang}-{vname}.png"
                page.screenshot(path=str(shot), full_page=True)
                checks["screenshot"] = str(shot)
            results[key] = checks
            page.close()

        # anchor jump behavior on desktop viewport
        page = ctx.new_page()
        page.set_viewport_size({"width":1440,"height":900})
        page.goto(f"{BASE}/{lang}/products/planetary-reducer", wait_until="load", timeout=45000)
        page.click('a[href="#p13-b"]')
        page.wait_for_timeout(600)
        jump = {
            "hash": page.evaluate("() => location.hash") == "#p13-b",
            "target_top_ok": page.evaluate(
                "() => { const r=document.getElementById('p13-b').getBoundingClientRect(); return r.top>=0 && r.top<=260; }"
            ),
        }
        page.click('a[href="#p06-a"]')
        page.wait_for_timeout(600)
        jump["hash2"] = page.evaluate("() => location.hash") == "#p06-a"
        results[f"{lang}-anchor-jump"] = jump
        page.close()
    browser.close()

try:
    from PIL import Image
    stats = {}
    for f in sorted(OUT.glob("planetary-reducer-*.png")):
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
        if name not in ("http","screenshot","clipped_text","touch_targets") and ok is not True:
            failed.append(f"{k}.{name}")
    if c.get("clipped_text"):
        failed.append(f"{k}.clipped_text={c['clipped_text'][:3]}")
    if c.get("touch_targets"):
        failed.append(f"{k}.touch_targets={c['touch_targets'][:3]}")
print("FAILED:", failed if failed else "NONE")
sys.exit(1 if failed else 0)
