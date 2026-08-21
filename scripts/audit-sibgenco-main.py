#!/usr/bin/env python3
"""STEP A — sibgenco.ru /main/ corporate home audit (primary reference)."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "reports/reference-analysis"
SHOTS = OUT / "screenshots"

data = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("https://sibgenco.ru/main/", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(7000)

    data["url"] = "https://sibgenco.ru/main/"
    data["title"] = page.title()
    data["bodyLen"] = len(page.inner_text("body"))
    data["header"] = page.evaluate("""() => {
      const h = document.querySelector('header');
      if (!h) return null;
      const r = h.getBoundingClientRect(); const s = getComputedStyle(h);
      return {height: Math.round(r.height), position: s.position, top: Math.round(r.top),
        bg: s.backgroundColor, borderBottom: s.borderBottom,
        nav: [...h.querySelectorAll('nav a, .menu a, [class*=nav] a')].map(a => (a.textContent||'').trim().replace(/\\s+/g,' ')).filter(t => t && t.length < 40).slice(0, 18),
        logoText: [...h.querySelectorAll('a')].map(a => (a.textContent||'').trim().replace(/\\s+/g,' ')).find(t => /сибирская|СГК|sibgenco/i.test(t))?.slice(0,60) || null,
        logoHasImg: !!h.querySelector('a img'),
      };
    }""")

    data["hero"] = page.evaluate("""() => {
      const h1 = document.querySelector('h1');
      const out = {};
      if (h1) {
        const s = getComputedStyle(h1); const r = h1.getBoundingClientRect();
        out.h1 = {text: h1.textContent.trim().replace(/\\s+/g,' ').slice(0,100), size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color, top: Math.round(r.top + window.scrollY), left: Math.round(r.left)};
        let sec = h1;
        for (let i=0; i<6 && sec.parentElement; i++) { sec = sec.parentElement; if (sec.getBoundingClientRect().height > 400 && sec.getBoundingClientRect().width > 900) break; }
        const sr = sec.getBoundingClientRect(); const ss = getComputedStyle(sec);
        out.section = {tag: sec.tagName, cls: (sec.className||'').toString().slice(0,60), h: Math.round(sr.height), w: Math.round(sr.width), bg: ss.backgroundColor, bgImg: ss.backgroundImage !== 'none', pos: ss.position};
        out.imgs = [...sec.querySelectorAll('img')].slice(0,4).map(i => ({src: (i.src||'').split('/').pop()?.slice(0,40), nw: i.naturalWidth, nh: i.naturalHeight, alt: (i.alt||'').slice(0,40)}));
        out.links = [...sec.querySelectorAll('a')].map(a => ({t: (a.textContent||'').trim().replace(/\\s+/g,' ').slice(0,40), href: a.getAttribute('href')})).filter(x => x.t).slice(0,6);
      }
      return out;
    }""")

    data["sections"] = page.evaluate("""() => {
      const seen = new Set(); const out = [];
      const els = [...document.querySelectorAll('main section, main div.section, body section')];
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.width < 400 || r.height < 100) continue;
        const s = getComputedStyle(el);
        const txt = (el.querySelector('h2,h3') || {}).textContent || '';
        const item = {tag: el.tagName, cls: (el.className||'').toString().slice(0,55), top: Math.round(r.top + window.scrollY), h: Math.round(r.height), w: Math.round(r.width), bg: s.backgroundColor, bgImg: s.backgroundImage !== 'none', padTop: s.padTop, padBottom: s.padBottom, heading: txt.trim().replace(/\\s+/g,' ').slice(0,70)};
        const key = item.top + '|' + item.h;
        if (!seen.has(key)) { seen.add(key); out.push(item); }
      }
      out.sort((a,b) => a.top - b.top);
      return out.slice(0, 25);
    }""")

    data["typography"] = page.evaluate("""() => {
      const grab = (sel) => { const el = document.querySelector(sel); if (!el) return null; const s = getComputedStyle(el); return {font: s.fontFamily.slice(0,45), size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color}; };
      const card = (() => { const c = document.querySelector('[class*=card]'); if (!c) return null; const s = getComputedStyle(c); return {cls: (c.className||'').toString().slice(0,50), bg: s.backgroundColor, radius: s.borderRadius, shadow: s.boxShadow.slice(0,60), border: s.border}; })();
      return {h1: grab('h1'), h2: grab('h2'), h3: grab('h3'), p: grab('p'), a: grab('a')};
    }""")

    data["footer"] = page.evaluate("""() => {
      const f = document.querySelector('footer');
      if (!f) return null;
      const s = getComputedStyle(f);
      return {bg: s.backgroundColor, padTop: s.padTop, padBottom: s.padBottom,
        cols: [...f.children].map(c => ({tag: c.tagName, cls: (c.className||'').toString().slice(0,40), text: (c.textContent||'').trim().replace(/\\s+/g,' ').slice(0,120)})).slice(0,10),
        links: [...f.querySelectorAll('a')].map(a => (a.textContent||'').trim().replace(/\\s+/g,' ')).filter(Boolean).slice(0,16)};
    }""")

    page.screenshot(path=str(SHOTS / "sibgenco-main-desktop.png"), full_page=True)
    page.screenshot(path=str(SHOTS / "sibgenco-main-hero-viewport.png"))

    page.set_viewport_size({"width": 390, "height": 844})
    page.wait_for_timeout(2500)
    data["mobile"] = page.evaluate("""() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      headerH: Math.round(document.querySelector('header')?.getBoundingClientRect().height || 0),
      h1Size: (() => { const e = document.querySelector('h1'); const s = e ? getComputedStyle(e) : null; return s ? s.fontSize : null; })(),
      burger: [...document.querySelectorAll('button, [class*=burger], [class*=menu-btn]')].some(b => { const s = getComputedStyle(b); return s.display !== 'none' && b.getBoundingClientRect().width > 20 && b.getBoundingClientRect().width < 80; }),
    })""")
    page.screenshot(path=str(SHOTS / "sibgenco-main-mobile.png"), full_page=True)
    browser.close()

prev = {}
pfile = OUT / "sibgenco-ui-analysis.json"
if pfile.exists():
    prev = json.load(open(pfile))
prev["main_home"] = data
json.dump(prev, open(pfile, "w"), ensure_ascii=False, indent=1)
print("title:", data["title"])
print("header:", json.dumps(data["header"], ensure_ascii=False)[:400])
print("hero:", json.dumps(data["hero"], ensure_ascii=False)[:800])
for s in data["sections"]:
    print(" SEC:", s)
print("footer cols:", len(data.get("footer",{}).get("cols",[]) or []))
print("mobile:", data["mobile"])
