import json
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

BASE="http://localhost:3002"
OUT=Path("/Users/liujunkai/skill-library/pdf-web-site/reports/reference-analysis")
SHOTS=Path("/Users/liujunkai/skill-library/pdf-web-site/reports/screenshots/visual-rebuild-v2")
ROUTES={"home-en":"/en","home-ru":"/ru","products-en":"/en/products","products-ru":"/ru/products","detail-en":"/en/products/planetary-reducer","detail-ru":"/ru/products/planetary-reducer"}

def px(path):
    im=Image.open(path).convert("RGB"); w,h=im.size; n=w*h
    nonwhite=dark=amber=colored=0
    for r,g,b in im.getdata():
        if r<240 or g<240 or b<240: nonwhite+=1
        if r<90 and g<90 and b<90: dark+=1
        if r>150 and 40<g<110 and b<60: amber+=1
        if max(r,g,b)-min(r,g,b)>40: colored+=1
    return dict(nonwhite=round(nonwhite/n,4),dark=round(dark/n,4),amber=round(amber/n,4),colored=round(colored/n,4),w=w,h=h)

res={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for vw,size in [("desktop",{"width":1440,"height":900}),("mobile",{"width":390,"height":844})]:
        ctx=b.new_context(viewport=size); page=ctx.new_page()
        for name,path in ROUTES.items():
            page.goto(BASE+path, wait_until="networkidle", timeout=30000)
            d=page.evaluate("""() => {
              const q=s=>document.querySelector(s);
              const qa=s=>[...document.querySelectorAll(s)];
              const st=s=>{const e=q(s); if(!e)return null; const c=getComputedStyle(e); return {fontSize:c.fontSize,fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,lineHeight:c.lineHeight,color:c.color,background:c.backgroundColor,borderRadius:c.borderRadius};};
              const imgs=qa('img').map(i=>i.currentSrc||i.src).filter(Boolean);
              const h=q('header');
              return {
                title:document.title,
                h1:st('h1'), h2:st('h2'),
                headerH:h?h.offsetHeight:0,
                headerPos:h?getComputedStyle(h).position:null,
                sections:qa('section').length,
                buttons:qa('button,a').filter(e=>/cta|btn|button/i.test(e.className||'')).length,
                cards:qa('[class*="card"]').length,
                imgCount:imgs.length,
                dupImgs:[...new Set(imgs.filter(x=>imgs.indexOf(x)!==imgs.lastIndexOf(x)))],
                scrollW:document.documentElement.scrollWidth,
                clientW:document.documentElement.clientWidth,
                bodyH:document.body.scrollHeight
              };
            }""")
            d["pixels"]=px(str(SHOTS/f"{name}-{vw}.png"))
            res[f"{name}-{vw}"]=d
        ctx.close()
    b.close()
(OUT/"visual-rebuild-v2-metrics.json").write_text(json.dumps(res,indent=1))
# summary
for k in ["home-en-desktop","home-ru-desktop","products-en-desktop","detail-en-desktop","home-en-mobile","home-ru-mobile","detail-en-mobile"]:
    d=res[k]
    h1=d.get("h1") or {}
    pxd=d["pixels"]
    over=d["scrollW"]-d["clientW"]
    print(f"{k} | H1 {h1.get('fontSize')}/{h1.get('fontWeight')} | hdr {d['headerH']}px {d['headerPos']} | sec {d['sections']} card {d['cards']} img {d['imgCount']} dup {d['dupImgs']} | ovf {over}px | px nw {pxd['nonwhite']} dark {pxd['dark']} amber {pxd['amber']} col {pxd['colored']}")
