#!/usr/bin/env python3
"""STEP D visual rebuild QA: Home + Products + Planetary, EN/RU, desktop/mobile."""
import json, sys
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4317"
OUT = Path(__file__).resolve().parent.parent / "reports/screenshots/visual-rebuild"
OUT.mkdir(parents=True, exist_ok=True)

MODEL_IDS = ["p06-a","p06-b","p07-a","p07-b","p08-a","p08-b","p09-a","p09-b",
             "p10-a","p10-b","p11-a","p11-b","p12-a","p12-b","p13-a","p13-b"]
FORBIDDEN = ["fake email","UNKNOWN","UNCERTAIN","TBD","TODO","placeholder","lorem","mock",
             "hydraulic","Гидравлический","研发及产业化","不退不换","не подлежит возврату","7538906570","程告永"]
BRAND = {
    "en": "Bengbu Planetary Engineering Machinery Co., Ltd.",
    "ru": "ООО «Бэнбу Планетарное Машиностроительное Предприятие»",
}
FAMILY = {
    "en": "planetary reducer",
    "ru": "планетарный редуктор",
}

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(reduced_motion="reduce")

    # ---------- Home ----------
    for lang in ("en", "ru"):
        for width, height, vname in [(1440,900,"desktop"),(390,844,"mobile")]:
            page = ctx.new_page()
            page.set_viewport_size({"width": width, "height": height})
            resp = page.goto(f"{BASE}/{lang}/", wait_until="load", timeout=45000)
            page.wait_for_timeout(300)
            body = page.inner_text("body")
            html = page.content()
            key = f"home-{lang}-{vname}"
            results[key] = {
                "http": resp.status,
                "h1": page.locator("h1").first.inner_text().strip() == BRAND[lang],
                "model_strip_16": page.evaluate(
                    f"() => document.querySelectorAll('main a[href*=\"/products/planetary-reducer#\"]').length === {len(MODEL_IDS)}"
                ),
                "family_link": page.evaluate(
                    f"() => !!document.querySelector('main a[href=\"/{lang}/products/planetary-reducer\"]')"
                ),
                "no_overflow": page.evaluate(
                    "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
                ),
                "forbidden": [f for f in FORBIDDEN if f.lower() in html.lower() or f in body],
                "duplicate_images": page.evaluate(
                    "() => { const a=[...document.querySelectorAll('main img[src]')].map(x=>x.getAttribute('src')); return [...new Set(a.filter((x,i)=>a.indexOf(x)!==i))]; }"
                ),
                "header": page.locator("header").count() >= 1,
                "footer": page.locator("footer").count() >= 1,
            }
            shot = OUT / f"home-{lang}-{vname}.png"
            page.screenshot(path=str(shot), full_page=False)
            results[key]["screenshot"] = str(shot)
            if vname == "desktop":
                full = OUT / f"home-{lang}-full.png"
                page.screenshot(path=str(full), full_page=True)
                results[key]["screenshot_full"] = str(full)
            page.close()

    # ---------- Products index ----------
    for lang in ("en", "ru"):
        page = ctx.new_page()
        page.set_viewport_size({"width":1440,"height":900})
        resp = page.goto(f"{BASE}/{lang}/products", wait_until="load", timeout=45000)
        page.wait_for_timeout(300)
        body = page.inner_text("body")
        key = f"products-{lang}"
        results[key] = {
            "http": resp.status,
            "family_name": FAMILY[lang] in body.lower(),
            "model_strip_16": page.evaluate(
                f"() => document.querySelectorAll('main a[href*=\"/products/planetary-reducer#\"]').length === {len(MODEL_IDS)}"
            ),
            "detail_link": page.evaluate(
                f"() => !!document.querySelector('main a[href=\"/{lang}/products/planetary-reducer\"]')"
            ),
            "no_overflow": page.evaluate(
                "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
            ),
            "forbidden": [f for f in FORBIDDEN if f.lower() in page.content().lower() or f in body],
            "header": page.locator("header").count() >= 1,
            "footer": page.locator("footer").count() >= 1,
        }
        page.close()

    # ---------- Planetary product ----------
    for lang in ("en", "ru"):
        for width, height, vname in [(1440,900,"desktop"),(1280,800,"desktop-1280"),(1024,768,"tablet-1024"),
                                     (768,1024,"tablet-768"),(390,844,"mobile"),(375,812,"mobile-375")]:
            page = ctx.new_page()
            page.set_viewport_size({"width": width, "height": height})
            resp = page.goto(f"{BASE}/{lang}/products/planetary-reducer", wait_until="load", timeout=45000)
            page.wait_for_timeout(300)
            body = page.inner_text("body")
            key = f"product-{lang}-{vname}"
            results[key] = {
                "http": resp.status,
                "h1": page.locator("h1").first.inner_text().strip().lower() == FAMILY[lang],
                "model_anchors_16": page.evaluate(
                    f"() => {json.dumps(MODEL_IDS)}.every(id => !!document.getElementById(id))"
                ),
                "model_links_16": page.evaluate(
                    f"() => document.querySelectorAll('main a[href^=\"#p\"]').length === {len(MODEL_IDS)}"
                ),
                "param_label_split": page.evaluate(
                    "() => { const th=[...document.querySelectorAll('th')].find(x=>x.textContent.trim().startsWith('Rated power')||x.textContent.trim().startsWith('Номинальная мощность')); return !!th && !th.textContent.includes('=') && !th.textContent.includes('3KW'); }"
                ),
                "param_value": page.evaluate(
                    "() => { const tr=[...document.querySelectorAll('tr')].find(x=>{const th=x.querySelector('th'); return th && (th.textContent.trim().startsWith('Rated power')||th.textContent.trim().startsWith('Номинальная мощность')); }); return !!tr && (tr.querySelector('td')?.textContent||'').trim()==='3KW'; }"
                ),
                "phone": "400-0552-863" in body,
                "tel_href": page.evaluate("() => !!document.querySelector('a[href=\"tel:4000552863\"]')"),
                "no_overflow": page.evaluate(
                    "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
                ),
                "forbidden": [f for f in FORBIDDEN if f.lower() in page.content().lower() or f in body],
                "duplicate_images": page.evaluate(
                    "() => { const a=[...document.querySelectorAll('main img[src]')].map(x=>x.getAttribute('src')); return [...new Set(a.filter((x,i)=>a.indexOf(x)!==i))]; }"
                ),
                "header": page.locator("header").count() >= 1,
                "footer": page.locator("footer").count() >= 1,
            }
            if vname in ("desktop","mobile"):
                shot = OUT / f"product-{lang}-{vname}.png"
                page.screenshot(path=str(shot), full_page=False)
                results[key]["screenshot"] = str(shot)
                if vname == "desktop":
                    full = OUT / f"product-{lang}-full.png"
                    page.screenshot(path=str(full), full_page=True)
                    results[key]["screenshot_full"] = str(full)
            page.close()

        # anchor jump behavior desktop
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
        results[f"product-{lang}-anchor-jump"] = jump
        page.close()

    # ---------- sitemap product URLs ----------
    page = ctx.new_page()
    page.goto(f"{BASE}/sitemap.xml", wait_until="load", timeout=45000)
    product_locs = page.evaluate(
        "() => [...document.querySelectorAll('loc')].map(x=>x.textContent.trim()).filter(u=>u.includes('/products/'))"
    )
    results["sitemap"] = {
        "product_locs": product_locs,
        "exactly_two_product_urls": sorted(product_locs) == sorted([
            "https://bengbu-planetary.example/en/products/planetary-reducer",
            "https://bengbu-planetary.example/ru/products/planetary-reducer",
        ]),
    }
    page.close()

    browser.close()

print(json.dumps(results, ensure_ascii=False, indent=1))

failed = []
for k, c in results.items():
    if k in ("sitemap",):
        if c.get("exactly_two_product_urls") is not True:
            failed.append(f"{k}.exactly_two_product_urls={c.get('product_locs')}")
        continue
    for name, ok in c.items():
        if name not in ("http","screenshot","screenshot_full","forbidden","duplicate_images") and ok is not True:
            failed.append(f"{k}.{name}")
        if name == "forbidden" and ok:
            failed.append(f"{k}.forbidden={ok}")
        if name == "duplicate_images" and ok:
            failed.append(f"{k}.duplicate_images={ok}")

print("FAILED:", failed if failed else "NONE")
sys.exit(1 if failed else 0)
