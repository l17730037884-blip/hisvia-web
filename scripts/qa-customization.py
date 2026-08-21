#!/usr/bin/env python3
"""STEP 2.4 Customization QA — programmatic checks + screenshots to disk (no base64 in output)."""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4317"
OUT = Path(__file__).resolve().parent.parent / "reports/screenshots/phase4-step2"
OUT.mkdir(parents=True, exist_ok=True)

EXPECT = {
    "en": {
        "title": "Customization Process | Bengbu Planetary Engineering Machinery Co., Ltd.",
        "h1": "Customization Process",
        "desc": "Customization Process — official information from Bengbu Planetary Engineering Machinery Co., Ltd. (AGV precision reducers).",
        "steps": ["Customer submits customization requirements", "Understanding requirements", "Summarizing requirements", "Customization proposal", "Finalizing the proposal", "Arranging production", "Installation and commissioning", "After-sales service"],
        "values": ["Safety", "Integration", "Versatility", "Innovation"],
        "product": "FB-180D-L2-S2-P2",
        "extra": "the input shaft is non-standard",
    },
    "ru": {
        "title": "Индивидуальный заказ | Бэнбу Планетарное Машиностроительное Предприятие",
        "h1": "Процесс индивидуального заказа",
        "desc": "Customization Process — официальная информация ООО «Бэнбу Планетарное Машиностроительное Предприятие» (прецизионные редукторы AGV).",
        "steps": ["Клиент направляет запрос", "Изучение требований", "Обобщение и систематизация", "Разработка индивидуального решения", "Утверждение решения", "Организация производства", "Монтаж и наладка", "Послепродажное обслуживание"],
        "values": ["Безопасности", "Интеграции", "Универсальности", "Инновациях"],
        "product": "FB-180D-L2-S2-P2",
        "extra": "входной вал — нестандартный",
    },
}
FORBIDDEN = ["UNKNOWN", "UNCERTAIN", "TBD", "TODO", "不退不换", "MOQ"]

results = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    for lang in ("en", "ru"):
        for viewport, vname in ([(1440, 900), "desktop"], [(390, 844), "mobile"]):
            page = browser.new_page(viewport={"width": viewport[0], "height": viewport[1]})
            url = f"{BASE}/{lang}/customization"
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
                "steps_8": all(s in body for s in e["steps"]),
                "step_order": page.evaluate(
                    f"() => {{ const ol=[...document.querySelectorAll('ol')]; const steps={json.dumps(e['steps'])}; const t=document.body.innerText; return steps.every((s,i)=> steps.slice(i+1).every(x => t.indexOf(s) < t.indexOf(x))); }}"
                ),
                "values_4": all(v in body for v in e["values"]),
                "product_title": e["product"] in body,
                "extra_note": e["extra"] in body,
                "img_loaded": page.evaluate(
                    "() => { const i=[...document.querySelectorAll('img')].filter(x=>x.alt.includes('FB-180D')); return i.length>=1 && i[0].complete && i[0].naturalWidth>0; }"
                ),
                "product_link": page.evaluate(
                    f"() => !!document.querySelector('a[href=\"/{lang}/products/fb-180d-l2-s2-p2\"]')"
                ),
                "cta_contact": page.evaluate(
                    f"() => !!document.querySelector('a[href=\"/{lang}/contact\"]')"
                ),
                "tel": page.evaluate(
                    "() => !!document.querySelector('a[href^=\"tel:\"]')"
                ),
                "no_fake_email": "mailto:" not in html and "@" not in body,
                "unknown_hygiene": all(f not in body for f in FORBIDDEN),
                "breadcrumb": page.locator('nav[aria-label=Breadcrumb]').count() >= 1,
                "jsonld_org": page.evaluate(
                    "() => { const s=[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x=>JSON.parse(x.textContent)); return s.some(o=>o['@type']==='Organization'); }"
                ),
                "jsonld_breadcrumb": page.evaluate(
                    "() => { const s=[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(x=>JSON.parse(x.textContent)); return s.some(o=>o['@type']==='BreadcrumbList' && o.itemListElement.length===2); }"
                ),
                "canonical": page.evaluate(
                    "() => document.querySelector('link[rel=canonical]')?.href.endsWith('" + lang + "/customization')"
                ),
                "hreflang_ru": page.evaluate(
                    "() => document.querySelector('link[hreflang=ru]')?.href.endsWith('/ru/customization')"
                ),
                "hreflang_en": page.evaluate(
                    "() => document.querySelector('link[hreflang=en]')?.href.endsWith('/en/customization')"
                ),
                "hreflang_xdefault": page.evaluate(
                    "() => document.querySelector('link[hreflang=x-default]')?.href.endsWith('/en/customization')"
                ),
                "no_h_overflow": page.evaluate(
                    "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
                ),
                "touch_targets": page.evaluate(
                    """() => {
                      const bad=[];
                      document.querySelectorAll('main a, main button').forEach(el=>{
                        const r=el.getBoundingClientRect();
                        if(r.width>0 && (r.width<44 || r.height<44)) bad.push((el.textContent||el.getAttribute('aria-label')||'').trim().slice(0,30));
                      });
                      return bad;
                    }"""
                ),
                "header_present": page.locator("header").count() >= 1,
                "footer_present": page.locator("footer").count() >= 1,
            }
            shot = OUT / f"customization-{key}.png"
            page.screenshot(path=str(shot), full_page=True)
            checks["screenshot"] = str(shot)
            results[key] = checks
            page.close()
    browser.close()

try:
    from PIL import Image
    stats = {}
    for f in sorted(OUT.glob("customization-*.png")):
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
        if name not in ("http", "screenshot", "touch_targets") and ok is not True:
            failed.append(f"{k}.{name}")
    if c.get("touch_targets"):
        failed.append(f"{k}.touch_targets={c['touch_targets'][:5]}")
print("FAILED:", failed if failed else "NONE")
sys.exit(1 if failed else 0)
