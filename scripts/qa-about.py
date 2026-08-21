#!/usr/bin/env python3
"""STEP 2.2 About QA — programmatic checks + screenshots to disk (no base64 in output)."""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4317"
OUT = Path(__file__).resolve().parent.parent / "reports/screenshots/phase4-step2"
OUT.mkdir(parents=True, exist_ok=True)

EXPECT = {
    "en": {
        "title": "About | Bengbu Planetary Engineering Machinery Co., Ltd.",
        "h1": "Company Profile",
        "texts": [
            "Founded in 2002",
            "40,000 square meters",
            "China Railway",
            "Science and Technology Progress Award",
            "continuous improvement is our winning formula",
            "Planetary",  # S01 slogan (partial, safe)
        ],
    },
    "ru": {
        "title": "О компании | Бэнбу Планетарное Машиностроительное Предприятие",
        "h1": "О компании",
        "texts": [
            "в 2002 году",
            "40 000 м²",
            "China Railway",
            "премией за достижения в области науки и техники",
            "формула успеха",
            "Планетарные передачи",
        ],
    },
}

results = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    for lang in ("en", "ru"):
        for viewport, vname in ([(1440, 900), "desktop"], [(390, 844), "mobile"]):
            page = browser.new_page(viewport={"width": viewport[0], "height": viewport[1]})
            url = f"{BASE}/{lang}/about"
            resp = page.goto(url, wait_until="load", timeout=45000)
            page.wait_for_timeout(300)
            key = f"{lang}-{vname}"
            body = page.inner_text("body")
            e = EXPECT[lang]
            checks = {
                "http": resp.status,
                "title": page.title() == e["title"],
                "h1": page.locator("h1").first.inner_text().strip() == e["h1"],
                "texts": all(t in body for t in e["texts"]),
                "photos": page.locator("img").count() >= 3,
                "photos_loaded": page.evaluate(
                    "() => Array.from(document.querySelectorAll('img')).every(i => i.complete && i.naturalWidth > 0)"
                ),
                "no_h_overflow": page.evaluate(
                    "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
                ),
                "jsonld_org": page.evaluate(
                    "() => JSON.parse(document.querySelector('script[type=\"application/ld+json\"]').textContent)['@type'] === 'Organization'"
                ),
                "canonical": page.evaluate(
                    "() => document.querySelector('link[rel=canonical]')?.href.endsWith('" + lang + "/about')"
                ),
                "hreflang_ru": page.evaluate(
                    "() => document.querySelector('link[hreflang=ru]')?.href.endsWith('/ru/about')"
                ),
                "hreflang_en": page.evaluate(
                    "() => document.querySelector('link[hreflang=en]')?.href.endsWith('/en/about')"
                ),
                "hreflang_xdefault": page.evaluate(
                    "() => document.querySelector('link[hreflang=x-default]')?.href.endsWith('/en/about')"
                ),
                "tel_link": page.evaluate(
                    "() => !!document.querySelector('a[href^=\"tel:\"]')"
                ),
            }
            shot = OUT / f"about-{key}.png"
            page.screenshot(path=str(shot), full_page=True)
            checks["screenshot"] = str(shot)
            results[key] = checks
            page.close()
    browser.close()

# pixel-stat sanity on screenshots (no visual viewing; catch blank renders)
try:
    from PIL import Image
    stats = {}
    for f in sorted(OUT.glob("about-*.png")):
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
        if name not in ("http", "screenshot") and ok is not True:
            failed.append(f"{k}.{name}")
print("FAILED:", failed if failed else "NONE")
sys.exit(1 if failed else 0)
