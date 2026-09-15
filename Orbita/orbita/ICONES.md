# Orbita — Icon inventory (icon font replacement)

Reference for replacing inline `<svg>` with an icon font (Font Awesome style, or other).
**29 distinct signatures · 154 occurrences** across the 19 components.

> Color convention: all current SVGs inherit `currentColor` (`stroke="currentColor"`).
> An icon font also inherits `color` → hover behaviors (arrow turning white, etc.) stay identical.

---

## 1. Site BASE icons (fixed chrome)

Hard-coded in the structural UI (buttons, header, forms, navigation, footer).
These are the ones to map **first**.

| Key | Icon | Current SVG path (`d=`) | Occ. | Components |
|-----|-------|--------------------------|------|------------|
| `arrow-right` | Right arrow | `M5 12h14M13 6l6 6-6 6` | **32** | everywhere: split-button, card CTAs, "see more", links, hero, forms |
| `check` | Checkmark | `M20 6 9 17l-5-5` | 22 | compareCards, priceList, priceListDark, forms |
| `chevron-down` | Down chevron | `M2.5 4.5 6 8l3.5-3.5` (+ hero variant `m6 9 6 6 6-6`) | 12 | header (nav, language), forms (select), hero (scroll) |
| `search` | Magnifier | `<circle r=7>` + `m21 21-4.3-4.3` | 7 | header, hero, forms |
| `close` | Cross / close | `M18 6 6 18M6 6l12 12` | 6 | header (search), compareCards, hero |
| `clock` | Clock | `<circle>` + `M12 7v5l3 2` | 6 | header (hours strip), process, hero |
| `phone` | Phone | `M22 16.9v3a2 2 0 0 1-2.2 2 …` | 5 | header (strip), hero, forms |
| `mail` | Envelope | `<rect>` + `m2 6 10 7L22 6` | 3 | header (strip), hero |
| `chevron-right` | Right chevron | `m9 6 6 6-6 6` | 2 | blog post (breadcrumb) |
| `arrow-left` | Left arrow | `M19 12H5M11 18l-6-6 6-6` | 1 | testimonials (carousel) |
| `play` | Play (triangle) | `M8 5v14l11-7z` | 1 | hero (video) |
| `info` | Info (circled i) | `<circle>` + `M12 8h.01M11 12h1v4h1` | 2 | forms (help message) |
| `alert` | Alert (circled !) | `<circle>` + `M12 8v5M12 16h.01` | 2 | forms (error) |
| `upload` | Upload | `M12 16V4M7 9l5-5 5 5` + `M5 20h14` | 2 | forms (upload zone) |

### Social networks (fixed chrome — replace if the font provides them, otherwise keep as SVG)

| Key | Icon | Occ. | Components |
|-----|-------|------|------------|
| `linkedin` | LinkedIn | 3 | header (strip), hero |
| `x-twitter` | X / Twitter | 3 | header (strip), hero |
| `youtube` | YouTube | 3 | header (strip), hero |

---

## 2. BACK-OFFICE icons (chosen by editors, later)

**Content-related** icons: they illustrate menu entries, product cards, and
editorial items. They will be **selected in the back-office** case by case.
Currently hard-coded only in the **header (01)**, the **hero (16)** and the
**demo cards (12 & 14)** — that is, examples, not fixed UI.

| Key | Icon | Current SVG path (`d=`) | Occ. | Components |
|-----|-------|--------------------------|------|------------|
| `clipboard-check` | Checked clipboard (instant estimate) | `M9 11 12 14 22 4` + `M21 12v7a2 2 …` | 4 | header, hero |
| `trending-up` | Rising chart (cost tracking) | `M3 3v18h18` + `m7 14 3-3 3 3 5-5` | 4 | header, hero |
| `table` | Table / quote | `<rect>` + `M3 9h18M8 4v16` | 4 | header, hero |
| `building` | Building (architects) | `M2 20h20M4 20V8l8-5 8 5v12M9 20v-6h6v6` | 4 | header, hero |
| `file` | File (project managers) | `M14 3v4a2 2 0 0 0 2 2h4` + `M5 3h9l6 6v10 …` | 4 | header, hero |
| `user` | User (developers) | `<circle>` + `M4 21a8 8 0 0 1 16 0` | 4 | header, hero |
| `book` | Book (guides & white papers) | `M4 19.5A2.5 2.5 0 0 1 6.5 17H20` + `M6.5 2H20v20 …` | 4 | header, hero |
| `monitor` | Screen (webinars) | `<rect>` + `M8 21h8M12 17v4` | 4 | header, hero |
| `edit` | Pencil (blog / editing) | `M12 20h9` + `M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z` | 4 | header, hero |
| `shield-check` | Checked shield (expert validation) | `M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z` + `m9 12 2 2 4-4` | 2 | demo cards 12 & 14 |

> Note: `clipboard-check` / `trending-up` / `file` **also** appear in the
> demo cards 12 & 14 (`ICONS` object: `check`, `chart`, `doc`, `shield`). Same mapping.

---

## 3. DO NOT replace

- **Orbita logo glyph** — the orbit ring (`<circle r=7>` alone, 4× in 00/01/16/18). It is the **brand**, stays as SVG.
- **Animated diamond** of the card separator (`.card-sep`) and **small diamonds** of badges / list bullets: these are **CSS shapes** (`transform: rotate(45deg)`), not SVGs.
- **FAQ +/− buttons**: animated CSS pseudo-elements, not icons.

---

## 4. To start the replacement

Provide:
1. The **font** (`.woff2` + `@font-face`, or CDN link).
2. The **mapping table**: for each key above → the font class
   (e.g. `arrow-right` → `xx-arrow-right`).

I will flag any key with no equivalent in the font. Animations applied to the `<svg>`
(split-button `arwPop`, chevron rotation, arrow `translateX`) will be moved
to the `<i>` element — same selectors.
