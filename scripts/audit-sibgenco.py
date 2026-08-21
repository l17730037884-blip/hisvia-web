#!/usr/bin/env python3
"""STEP A — sibgenco.ru reference audit: computed styles + screenshots to disk (no base64)."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "reports/reference-analysis"
SHOTS = OUT / "screenshots"
SHOTS.mkdir(parents=True, exist_ok=True)
BASE = "https://sibgenco.ru/"

data = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(BASE, wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(6000)

    header = page.evaluate("""() => {
      const out = {};
      const h = document.querySelector('header');
      if (!h) return null;
      const hr = h.getBoundingClientRect();
      out.height = Math.round(hr.height);
      out.position = getComputedStyle(h).position;
      out.top = Math.round(hr.top);
      out.background = getComputedStyle(h).backgroundColor;
      out.borderBottom = getComputedStyle(h).borderBottomWidth + ' ' + getComputedStyle(h).borderBottomColor;
      out.logo = (() => { const l = h.querySelector('a[href="/"], a[href$="/"], .logo, [class*=logo]'); return l ? {tag: l.tagName, text: (l.textContent||'').trim().slice(0,60), img: !!l.querySelector('img'), imgSrc: l.querySelector('img')?.src.slice(0,80) || null} : null; })();
      out.nav = [...h.querySelectorAll('nav a')].map(a => ({text: (a.textContent||'').trim().replace(/\\s+/g,' ').slice(0,50), href: a.getAttribute('href')})).slice(0,30);
      out.navStyle = (() => { const a = h.querySelector('nav a'); if (!a) return null; const s = getComputedStyle(a); return {fontSize: s.fontSize, fontWeight: s.fontWeight, letterSpacing: s.letterSpacing, color: s.color, textTransform: s.textTransform, gap: (() => { const n = h.querySelector('nav'); return n ? getComputedStyle(n).columnGap : null; })()}; })();
      out.aux = [...h.querySelectorAll('a,button')].map(e => (e.textContent||'').trim().replace(/\\s+/g,' ')).filter(t => /поиск|search|телефон|\\+7|8\\(|найти/i.test(t)).slice(0,6);
      return out;
    }""")
    data["header"] = header

    hero = page.evaluate("""() => {
      const out = {};
      const h1 = document.querySelector('h1');
      const hs = h1 ? h1.closest('section') || h1.parentElement.parentElement.parentElement : null;
      if (h1) {
        const r = h1.getBoundingClientRect();
        const s = getComputedStyle(h1);
        out.h1 = {text: h1.textContent.trim().replace(/\\s+/g,' ').slice(0,80), fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, color: s.color, width: Math.round(r.width)};
      }
      if (hs) {
        const r = hs.getBoundingClientRect();
        const s = getComputedStyle(hs);
        out.section = {tag: hs.tagName, cls: (hs.className||'').toString().slice(0,80), height: Math.round(r.height), width: Math.round(r.width), background: s.backgroundColor, backgroundImage: s.backgroundImage.slice(0,120), position: s.position, padding: s.padding};
      }
      out.imgs = [...document.querySelectorAll('h1 img, section img, .hero img, [class*=hero] img, [class*=main] img')].slice(0,5).map(i => ({src: (i.src||'').slice(0,90), w: i.naturalWidth, h: i.naturalHeight, cls: (i.className||'').toString().slice(0,50)}));
      out.heroFirstSection = (() => { const first = document.querySelector('main > * , body > div > *'); return first ? {tag: first.tagName, cls: (first.className||'').toString().slice(0,80)} : null; })();
      return out;
    }""")
    data["hero"] = hero

    sections = page.evaluate("""() => {
      const out = [];
      const root = document.querySelector('main') || document.body;
      const walk = (el, depth) => {
        if (depth > 3) return;
        for (const ch of el.children) {
          const r = ch.getBoundingClientRect();
          const s = getComputedStyle(ch);
          if (r.width > 300 && r.height > 60 && (['SECTION','DIV','ARTICLE'].includes(ch.tagName))) {
            out.push({tag: ch.tagName, cls: (ch.className||'').toString().slice(0,70), top: Math.round(r.top + window.scrollY), h: Math.round(r.height), w: Math.round(r.width), bg: s.backgroundColor, bgImage: s.backgroundImage !== 'none', padTop: s.paddingTop, padBottom: s.paddingBottom});
          }
          if (out.length > 60) return;
          walk(ch, depth + 1);
        }
      };
      walk(root, 0);
      return out.slice(0, 45);
    }""")
    data["sections"] = sections

    typo = page.evaluate("""() => {
      const grab = (sel, prop) => { const el = document.querySelector(sel); if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return {font: s.fontFamily.slice(0,60), size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, tt: s.textTransform, color: s.color, maxW: Math.round(r.width)}; };
      return {
        h1: grab('h1'), h2: grab('h2'), h3: grab('h3'),
        body: grab('main p, p'), nav: grab('nav a'),
        btn: (() => { const b = document.querySelector('a[class*=btn], button, a[class*=button], a[href*=obratn], a[href*=kontakt]'); if (!b) return null; const s = getComputedStyle(b); const r = b.getBoundingClientRect(); return {text: b.textContent.trim().replace(/\\s+/g,' ').slice(0,40), font: s.fontFamily.slice(0,50), size: s.fontSize, weight: s.fontWeight, bg: s.backgroundColor, color: s.color, radius: s.borderRadius, border: s.border, pad: s.padding, w: Math.round(r.width), h: Math.round(r.height)}; })(),
        card: (() => { const c = document.querySelector('[class*=card], article, .item'); if (!c) return null; const s = getComputedStyle(c); return {cls: (c.className||'').toString().slice(0,60), bg: s.backgroundColor, radius: s.borderRadius, shadow: s.boxShadow.slice(0,80), border: s.borderTopWidth + '/' + s.borderTopColor}; })(),
      };
    }""")
    data["typography"] = typo

    footer = page.evaluate("""() => {
      const f = document.querySelector('footer');
      if (!f) return null;
      const s = getComputedStyle(f);
      return {
        bg: s.backgroundColor, pad: s.padding, text: f.textContent.replace(/\\s+/g,' ').trim().slice(0,600),
        cols: [...f.querySelectorAll('div > div')].map(d => (d.textContent||'').trim().replace(/\\s+/g,' ').slice(0,80)).filter(Boolean).slice(0,14),
        links: [...f.querySelectorAll('a')].map(a => a.textContent.trim().replace(/\\s+/g,' ')).filter(Boolean).slice(0,20),
      };
    }""")
    data["footer"] = footer

    page.screenshot(path=str(SHOTS / "sibgenco-home-desktop.png"), full_page=True)
    page.screenshot(path=str(SHOTS / "sibgenco-home-desktop-viewport.png"))

    page.set_viewport_size({"width": 390, "height": 844})
    page.wait_for_timeout(2500)
    data["mobile"] = page.evaluate("""() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      headerHeight: Math.round(document.querySelector('header')?.getBoundingClientRect().height || 0),
      burgerVisible: [...document.querySelectorAll('button')].some(b => { const s = getComputedStyle(b); return s.display !== 'none' && /menu|меню|burger|nav/i.test((b.getAttribute('aria-label')||'')+(b.className||'')); }),
      h1Font: (() => { const e = document.querySelector('h1'); const s = e ? getComputedStyle(e) : null; return s ? s.fontSize : null; })(),
    })""")
    page.screenshot(path=str(SHOTS / "sibgenco-home-mobile.png"), full_page=True)

    # one internal page for rhythm comparison
    links = page.evaluate("() => [...document.querySelectorAll('a')].map(a => a.getAttribute('href')).filter(h => h && h.startsWith('/') && !h.startsWith('//') && h.length > 1 && h.length < 40).slice(0, 12)")
    data["candidate_links"] = links[:8]
    internal = None
    for href in links:
        if any(x in href for x in ["about", "o-kompanii", "company", "news", "contacts", "kontakt", "deyatelnost", "business", "press"]):
            internal = href
            break
    if internal:
        page.set_viewport_size({"width": 1440, "height": 900})
        try:
            page.goto(BASE.rstrip("/") + internal, wait_until="domcontentloaded", timeout=45000)
            page.wait_for_timeout(4000)
            data["internal_page"] = {
                "url": internal,
                "title": page.title(),
                "h1": (page.locator("h1").first.inner_text() if page.locator("h1").count() else "").strip().replace("\n", " ")[:80],
                "sections": page.evaluate("""() => { const out=[]; const root=document.querySelector('main')||document.body;
                  for (const ch of root.children){ if(out.length>12) break;
                    const r=ch.getBoundingClientRect(); const s=getComputedStyle(ch);
                    if(r.width>300&&r.height>60) out.push({tag:ch.tagName, cls:(ch.className||'').toString().slice(0,50), h:Math.round(r.height), bg:s.backgroundColor, bgImg:s.backgroundImage!=='none', padTop:s.paddingTop, padBottom:s.paddingBottom});}
                  return out; }"""),
                "h2": page.evaluate("() => { const e=document.querySelector('h2'); const s=e?getComputedStyle(e):null; return s?{size:s.fontSize,weight:s.fontWeight,lh:s.lineHeight}:null; }"),
                "bodyFont": page.evaluate("() => { const e=document.querySelector('main p'); const s=e?getComputedStyle(e):null; return s?{size:s.fontSize,lh:s.lineHeight,color:s.color}:null; }"),
            }
            page.screenshot(path=str(SHOTS / f"sibgenco-internal{internal.replace('/', '_')}.png"), full_page=True)
        except Exception as exc:
            data["internal_page_error"] = str(exc)[:200]
    else:
        data["internal_page"] = None

    browser.close()

json.dump(data, open(OUT / "sibgenco-ui-analysis.json", "w"), ensure_ascii=False, indent=1)
print(json.dumps({k: v for k, v in data.items() if k not in ("sections", "footer")}, ensure_ascii=False, indent=1)[:3500])
print("SECTIONS:")
for s in data["sections"]:
    print(" ", s)
print("FOOTER cols:", len(data.get("footer", {}).get("cols", [])), "links:", len(data.get("footer", {}).get("links", [])))
