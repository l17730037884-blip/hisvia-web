from playwright.sync_api import sync_playwright
from pathlib import Path

BASE = "http://localhost:3002"
OUT = Path("/Users/liujunkai/skill-library/pdf-web-site/reports/screenshots/visual-rebuild-v2")
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
}
PAGES = [
    ("home-en", "/en"),
    ("home-ru", "/ru"),
    ("products-en", "/en/products"),
    ("products-ru", "/ru/products"),
    ("detail-en", "/en/products/planetary-reducer"),
    ("detail-ru", "/ru/products/planetary-reducer"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for vp_name, vp in VIEWPORTS.items():
        ctx = browser.new_context(viewport=vp, device_scale_factor=1)
        page = ctx.new_page()
        for name, path in PAGES:
            page.goto(BASE + path, wait_until="networkidle", timeout=30000)
            page.evaluate("document.fonts && document.fonts.ready")
            page.wait_for_timeout(400)
            page.screenshot(path=str(OUT / f"{name}-{vp_name}.png"), full_page=False)
        ctx.close()
    browser.close()
print("done", OUT)
