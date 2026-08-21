#!/usr/bin/env python3
"""STEP 2.3 Contact QA — programmatic checks + screenshots to disk (no base64 in output)."""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4317"
OUT = Path(__file__).resolve().parent.parent / "reports/screenshots/phase4-step2"
OUT.mkdir(parents=True, exist_ok=True)
PHONE = "400-0552-863"

EXPECT = {
    "en": {
        "title": "Contact | Bengbu Planetary Engineering Machinery Co., Ltd.",
        "h1": "Contact",
        "desc": "Contact — official information from Bengbu Planetary Engineering Machinery Co., Ltd. (AGV precision reducers).",
        "address": "No. 1558 Daqing Road",
        "company": "Bengbu Planetary Engineering Machinery Co., Ltd.",
    },
    "ru": {
        "title": "Контакты | Бэнбу Планетарное Машиностроительное Предприятие",
        "h1": "Контакты",
        "desc": "Contact — официальная информация ООО «Бэнбу Планетарное Машиностроительное Предприятие» (прецизионные редукторы AGV).",
        "address": "Дацин",
        "company": "Бэнбу Планетарное",
    },
}
FORBIDDEN = ["UNKNOWN", "UNCERTAIN", "TBD", "TODO", "7538906570", "程告永", "不退不换"]

results = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    for lang in ("en", "ru"):
        for viewport, vname in ([(1440, 900), "desktop"], [(390, 844), "mobile"]):
            page = browser.new_page(viewport={"width": viewport[0], "height": viewport[1]})
            url = f"{BASE}/{lang}/contact"
            resp = page.goto(url, wait_until="load", timeout=45000)
            page.wait_for_timeout(300)
            key = f"{lang}-{vname}"
            e = EXPECT[lang]
            body = page.inner_text("body")
            html = page.content()
            tel_el = page.locator('a[href^="tel:"]')
            checks = {
                "http": resp.status,
                "title": page.title() == e["title"],
                "meta_desc": page.evaluate(
                    f"() => document.querySelector('meta[name=description]')?.content === {json.dumps(e['desc'])}"
                ),
                "h1": page.locator("h1").first.inner_text().strip() == e["h1"],
                "single_h1": page.locator("h1").count() == 1,
                "phone_display": PHONE in body,
                "tel_href": tel_el.count() >= 1 and tel_el.first.get_attribute("href") == "tel:4000552863",
                "tel_clickable": page.evaluate(
                    "() => { const a = document.querySelector('a[href^=tel]'); const r = a.getBoundingClientRect(); return r.width >= 44 && r.height >= 32; }"
                ),
                "address": e["address"] in body,
                "postal": "233000" in body,
                "company": e["company"] in body,
                "no_email": "mailto:" not in html and "@" not in body,
                "unknown_hygiene": all(f not in body for f in FORBIDDEN),
                "breadcrumb": page.locator('nav[aria-label=Breadcrumb]').count() >= 1,
                "jsonld_org": page.evaluate(
                    "() => { const s = [...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x => JSON.parse(x.textContent)); return s.some(o => o['@type']==='Organization' && o.telephone === '" + PHONE + "' && o.contactPoint && o.contactPoint.telephone === '" + PHONE + "'); }"
                ),
                "jsonld_breadcrumb": page.evaluate(
                    "() => { const s = [...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x => JSON.parse(x.textContent)); return s.some(o => o['@type']==='BreadcrumbList' && o.itemListElement.length === 2); }"
                ),
                "canonical": page.evaluate(
                    "() => document.querySelector('link[rel=canonical]')?.href.endsWith('" + lang + "/contact')"
                ),
                "hreflang_ru": page.evaluate(
                    "() => document.querySelector('link[hreflang=ru]')?.href.endsWith('/ru/contact')"
                ),
                "hreflang_en": page.evaluate(
                    "() => document.querySelector('link[hreflang=en]')?.href.endsWith('/en/contact')"
                ),
                "hreflang_xdefault": page.evaluate(
                    "() => document.querySelector('link[hreflang=x-default]')?.href.endsWith('/en/contact')"
                ),
                "no_form": page.locator("form").count() == 0,
                "no_h_overflow": page.evaluate(
                    "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
                ),
                "header_present": page.locator("header").count() >= 1,
                "footer_present": page.locator("footer").count() >= 1,
                "hamburger_1024_rule": page.evaluate(
                    "() => { const b = document.querySelector('button[aria-controls=mobile-menu]'); return b ? getComputedStyle(b.parentElement).display : 'none'; }"
                ),
            }
            shot = OUT / f"contact-{key}.png"
            page.screenshot(path=str(shot), full_page=True)
            checks["screenshot"] = str(shot)
            results[key] = checks
            page.close()
    browser.close()

try:
    from PIL import Image
    stats = {}
    for f in sorted(OUT.glob("contact-*.png")):
        im = Image.open(f).convert("RGB")
        w, h = im.size
        px = list(im.getdata())
        n = len(px)
        nonwhite = sum(1 for r, g, b in px if not (r > 245 and g > 245 and b > 245)) / n
        dark = sum(1 for r, g, b in px if r + g + b < 300) / n
        colored = sum(1 for r, g, b in px if max(r, g, b) - min(r, g, b) > 40) / n
        stats[f.name] = {"size": f"{w}x{h}", "nonwhite": round(nonwhite, 4), "dark": round(dark, 4), "colored": round(colored, 4)}
    results["pixel_stats"] = stats
except ImportError:
    results["pixel_stats"] = "PIL not available"

print(json.dumps(results, ensure_ascii=False, indent=1))
failed = []
for k, c in results.items():
    if k == "pixel_stats":
        continue
    for name, ok in c.items():
        if name not in ("http", "screenshot", "hamburger_1024_rule") and ok is not True:
            failed.append(f"{k}.{name}")
print("FAILED:", failed if failed else "NONE")
sys.exit(1 if failed else 0)
