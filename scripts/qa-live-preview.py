#!/usr/bin/env python3
"""PHASE 4 LIVE PREVIEW — screenshot current site + minimal programmatic sanity checks (no base64)."""
import json, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3002"
OUT = Path(__file__).resolve().parent.parent / "reports/screenshots/live-preview"
OUT.mkdir(parents=True, exist_ok=True)

DESKTOP = [("en","home","/en"),("ru","home","/ru"),("en","about","/en/about"),("ru","about","/ru/about"),
           ("en","products","/en/products"),("ru","products","/ru/products"),
           ("en","planetary-reducer","/en/products/planetary-reducer"),("ru","planetary-reducer","/ru/products/planetary-reducer")]
MOBILE = [("en","home","/en"),("ru","home","/ru"),
          ("en","planetary-reducer","/en/products/planetary-reducer"),("ru","planetary-reducer","/ru/products/planetary-reducer")]

results = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height, vname, shots in ((1440,900,"desktop",DESKTOP),(390,844,"mobile",MOBILE)):
        for lang, name, path in shots:
            page = browser.new_page(viewport={"width":width,"height":height})
            resp = page.goto(f"{BASE}{path}", wait_until="load", timeout=45000)
            page.wait_for_timeout(1200)
            key = f"{name}-{lang}-{vname}"
            body = page.inner_text("body")
            checks = {
                "http": resp.status,
                "not_blank": len(body.strip()) > 200,
                "h1_present": page.locator("h1").count() >= 1,
                "header": page.locator("header").count() >= 1,
                "footer": page.locator("footer").count() >= 1,
                "cta_present": page.evaluate(
                    "() => !!document.querySelector('a[href*=\"/contact\"],a[href*=\"/customization\"],a[href^=\"tel:\"]')"
                ),
                "img_broken": page.evaluate(
                    """() => [...document.querySelectorAll('img')].filter(i=>i.complete && i.naturalWidth===0).map(i=>i.src).slice(0,6)"""
                ),
                "img_pending_lazy": page.evaluate(
                    """() => [...document.querySelectorAll('img')].filter(i=>!i.complete).length"""
                ),
                "mojibake": ("\ufffd" in page.content()) or ("\ufffd" in body) or ("ï¿½" in body),
                "no_h_overflow": page.evaluate(
                    "() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"
                ),
            }
            if name == "planetary-reducer":
                checks["model_blocks_16"] = page.evaluate(
                    "() => document.querySelectorAll('article[id]').length === 16"
                )
            shot = OUT / f"{lang}-{name}.png" if vname == "desktop" else OUT / f"{lang}-{name}-mobile.png"
            page.screenshot(path=str(shot), full_page=True)
            checks["screenshot"] = str(shot)
            results[key] = checks
            page.close()
    browser.close()

try:
    from PIL import Image
    stats = {}
    for f in sorted(OUT.glob("*.png")):
        im = Image.open(f).convert("RGB")
        w, h = im.size
        px = list(im.getdata())
        n = len(px)
        nonwhite = sum(1 for r, g, b in px if not (r > 245 and g > 245 and b > 245)) / n
        dark = sum(1 for r, g, b in px if r + g + b < 300) / n
        stats[f.name] = {"size": f"{w}x{h}", "nonwhite": round(nonwhite, 4), "dark_band": round(dark, 4)}
    results["pixel_stats"] = stats
except ImportError:
    results["pixel_stats"] = "PIL not available"

print(json.dumps(results, ensure_ascii=False, indent=1))
failed = []
for k, c in results.items():
    if k == "pixel_stats":
        continue
    for name, ok in c.items():
        if name not in ("http","screenshot","img_broken","img_pending_lazy","mojibake") and ok is not True:
            failed.append(f"{k}.{name}")
    if c.get("img_broken"):
        failed.append(f"{k}.img_broken={c['img_broken'][:3]}")
print("FAILED:", failed if failed else "NONE")
sys.exit(1 if failed else 0)
