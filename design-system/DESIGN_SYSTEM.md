# HISVIA Industrial Editorial Design System

## Design Direction
**Surface**: Landing/Marketing + Content/Editorial hybrid
**Audience**: Industrial procurement managers, engineers, factory owners — Russia, Central Asia, Europe
**Style**: Industrial editorial — Bloomberg Businessweek manufacturing feature meets Siemens annual report
**Color strategy**: Committed — Navy field, Steel accent, Amber critical states only
**Type stance**: Editorial — Archivo display (hero) + IBM Plex body
**Density**: 7/10 (information-rich industrial)
**Motion**: 2/10 (still, confident, precise — no bounce)
**Variance**: 4/10 (structured grid, occasional asymmetry for emphasis)

## Anti-Slop Bans (enforced)
1. ❌ No 3+ identical cards in a row
2. ❌ No gradient-only hero backgrounds
3. ❌ No centered tag clouds
4. ❌ No step numbers (01, 02, 03)
5. ❌ No "What we are not" defensive sections
6. ❌ No rounded-xl on cards
7. ❌ No pure white + border card pattern repeated
8. ❌ No equal-width section padding throughout

## Layout System

### Layout Types

| Type | Pattern | When | Example |
|------|---------|------|---------|
| `FullBleedHero` | Full-width image, dark overlay, text bottom-left | Homepage, solution pages | 850px factory interior, 64px title |
| `DataRail` | Horizontal, navy bg, large numbers + labels | Trust/scale evidence | 300+ Factories, 8 Systems, 20+ Years |
| `AsymmetricFeature` | 65/35 or 60/40 image+text split | Featured system, case study | Large equipment image + rich text panel |
| `ProcessFlow` | Vertical stepper with images | Manufacturing, QC | Raw → Machine → Surface → Assemble → Inspect |
| `EditorialGrid` | 1 large + 2 medium + N compact | Solutions listing | 1 hero system, 2 secondary, rest compact |
| `MasonryEvidence` | Mixed-size grid with overlays | Factory gallery | Images + region/capability labels |
| `HubCards` | 4 equal cards with count+spec+highlight | Manufacturing regions | Zhejiang 120+, Jiangsu 80+ |

### Section Rhythm
```
FullBleedHero     → 850px
DataRail          → 120px
AsymmetricFeature → auto (16:9 image + text)
EditorialGrid     → auto
MasonryEvidence   → auto
ProcessFlow       → auto
HubCards          → auto
CTA               → 200px
```

## Component System

### IndustrialHero
```
props: image, eyebrow, title, description, cta, stats
layout: relative 850px, image object-cover full, gradient overlay bottom
text: absolute bottom-left, max-w-640px
stats: horizontal, border-l-2 accent, below description
animation: image fade-in 1s, text slide-up 0.6s
responsive: 500px mobile, text full-width
```

### DataRail
```
props: items[{value, label, sub}]
layout: flex-row, navy bg, items spaced with dividers
typography: 42px value, 13px label, 11px sub
animation: count-up on scroll
responsive: stack vertical on mobile
```

### ProcessFlow
```
props: steps[{title, image, description, stats}]
layout: vertical, alternating left-right, connecting line SVG
hover: image scale 1.05, stats reveal
animation: line draw on scroll, fade-in steps
responsive: single column on mobile
```

### EditorialFeatureBlock
```
props: image, title, description, tags, link
layout: grid 1.4fr/1fr, image left, text right on surface bg
typography: 20px title, 14px body, 10px tags
hover: border color transition
image: object-contain, padded
```

### SystemCard (3 variants)
```
Large:  aspect-[16/9] image + p-10 text, featured
Medium: aspect-[16/9] image + p-5 text, secondary row
Compact: aspect-[4/3] image + p-4 text, bottom grid
all: border-line, hover:border-steel/30, no shadow by default
```

### FactoryEvidenceCard
```
props: image, region, capability, verified
layout: aspect-[4/3] relative, image object-cover
overlay: bottom gradient, region+capability text
badge: verified dot top-right
hover: overlay opacity increase
```

### RegionHubCard
```
props: count, name, specialization, highlight
layout: border, surface bg, p-6
typography: 28px count, 16px name, 12px spec, 11px highlight (amber)
```

## Typography Scale

| Level | Class | Size | Weight | Line | Usage |
|-------|-------|------|--------|------|-------|
| Display XL | `text-[64px] md:text-[72px]` | 64-72 | 700 | 1.05 | Homepage H1 |
| Display | `text-[48px] md:text-[56px]` | 48-56 | 700 | 1.08 | Page titles |
| Heading L | `text-[32px] md:text-[40px]` | 32-40 | 700 | 1.15 | Section titles |
| Heading M | `text-[20px] md:text-[24px]` | 20-24 | 700 | 1.2 | Card titles |
| Body L | `text-[18px]` | 18 | 400 | 1.6 | Hero description |
| Body | `text-[15px] md:text-[16px]` | 15-16 | 400 | 1.6 | Content |
| Caption | `text-[12px] md:text-[13px]` | 12-13 | 400 | 1.5 | Labels, tags |
| Micro | `text-[10px] md:text-[11px]` | 10-11 | 500 | 1.4 | Eyebrow, badges |

## Color Tokens

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Navy | #0E2A4A | `navy` | Primary: headings, footer, data rail bg |
| Steel | #2E72B8 | `steel` | Secondary: links, active states |
| Amber | #D98A3D | `amber` | Critical states only: badges, indicators, NOT CTAs |
| Graphite | #46586B | `graphite` | Body text |
| Surface | #F5F6F8 | `surface` | Card backgrounds |
| Line | #B9D8F0 | `line` | Borders, dividers |
| White | #FFFFFF | `white` | Page bg, image backgrounds |

## Motion Tokens

| Token | Value | Easing |
|-------|-------|--------|
| `--duration-instant` | 150ms | ease |
| `--duration-fast` | 300ms | `cubic-bezier(0.4,0,0.2,1)` |
| `--duration-normal` | 500ms | `cubic-bezier(0.4,0,0.2,1)` |
| `--duration-slow` | 800ms | `cubic-bezier(0.4,0,0.2,1)` |
| `--duration-count` | 2000ms | linear |
| Scroll reveal | 600ms | fade-in-up, stagger 100ms children |
| Hover scale | 300ms | 1.0 → 1.02 (subtle, industrial) |
| Parallax | scroll-driven | 0.85x scroll speed |

## Radius System

| Size | Value | Usage |
|------|-------|-------|
| None | 0px | Images, hero overlays |
| Sharp | 2px | Badges, tiny labels |
| Default | 4px | Buttons, cards, inputs |
| Medium | 6px | Large cards only |

## Spacing Rhythm (8px base)

```
Section padding:    py-20 (80px) — hero-adjacent
                    py-16 (64px) — standard
                    py-10 (40px) — compact (DataRail)
Card padding:       p-10 (40px) — feature
                    p-6  (24px) — standard
                    p-4  (16px) — compact
Grid gap:           gap-6  (24px) — editorial
                    gap-4  (16px) — compact
                    gap-10 (40px) — asymmetric split
```
