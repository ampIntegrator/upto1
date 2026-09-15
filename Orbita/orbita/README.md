# Orbita — Design System & component library

High-fidelity HTML mockups of the **Orbita** design system, ready to serve as
reference for the **Next.js** integration. Each file is a standalone
component that opens directly in a browser.

---

## 1. System principles

### The 4 accent silos
A single base comes in **4 accents** driven by the
`data-theme` attribute on `<html>`/`<body>`: **blue** (default), **green**, **orange**,
**purple**. Each silo redefines the same set of variables:

```
--bg, --bg-2        light backgrounds (tinted by the accent)
--primary, --primary-deep, --primary-soft
--highlight, --highlight-deep        secondary / signal colour
--night                              dark background of the silo
```

Constants **shared by all silos** (never tinted by the accent):

```
--ink / --ink-2 / --ink-3    text
--line / --line-2            rules
--editorial / --editorial-deep   editorial GOLD (serif accents)
--paper                      white
--danger / --ok              states (forms)
--header-h                   height reserved for the header
```

**Transitions — centralized in 2 tokens** (in `orbita.css`):

```
--t-dur:  .25s;        /* speed of ALL transitions */
--t-ease: ease-in-out; /* curve of ALL transitions */
```

The whole DS points to them, in CSS (`transition: … var(--t-dur) var(--t-ease)`)
as well as in Tailwind markup (`duration-[var(--t-dur)] ease-[var(--t-ease)]`).
Change these 2 lines = all DS animation follows.

**All these tokens live in `orbita.css`** (see §2) — defined once,
shared by the 17 components. Changing an accent color = **one line**.

An accent selector ("Accent: Blue / Green / Orange / Purple") is present
in each mockup **for demonstration purposes only** — it is not
a production element.

### Typography
- **Schibsted Grotesk** — display / headings
- **Geist** — body text
- **Cormorant Garamond** *italic 600* — editorial serif accent
- **Geist Mono** — labels, mono eyebrows

### Visual signature
Sharp corners (zero radius), **split-button** with inner border (`::before`),
golden eyebrows with rules, blueprint / dots / diamonds textures,
"night" sections with halos.

**Card separator** (`.card-sep`, components 12 & 14): two
`line-2` rules framing a small **animated** central diamond (`@keyframes sepMorph` —
morphs square ⇄ circle and highlight ⇄ primary while rotating; disabled by
`prefers-reduced-motion`).

---

## 2. Stack & CSS architecture

- **HTML + Tailwind**. The mockups load the **browser build**
  `@tailwindcss/browser@4` (handy for the demo).

### `orbita.css` — the shared foundation (the core of the DS)
A **single file** `orbita/orbita.css`, linked by all components, centralizes:
- **the tokens**: `:root` (constants + transitions) + the 4 `[data-theme]` silos;
- **the signature & controls**: buttons (`.c-btn-split` + `.lbl`/`.arw`/`::before`/`:hover`,
  `.c-btn-split--ondark`, `.c-btn-solid`, `.c-btn-ghost`), animated separator (`.card-sep` + `sepMorph`),
  eyebrow (`.c-head-eyebrow`), textures (`.c-blueprint`/`.c-tex-*`/`.tex-target`),
  dark gradient background (`.c-darkbg`), shared header chrome (mega/lang/search/drawer/burger),
  `.silo-btn`, tag-agnostic title (`.o-headline`), **and the whole forms kit**
  (`.field-*`, `.selectx-*`, `.opt-*`, `.switch-*`, `.upload-*`, light + dark).

Centralization rule: **a selector goes into `orbita.css` if it is shared
(≥2 components) and identical everywhere**. The rest — component-specific or
colliding — stays **inline** in its file.

### What stays inline (on purpose)
- Specific CSS: `.hero-*` (16), `.fwti-*` (13), `.price-*`/`.tier-*` (08/09),
  `.tab-*` (06), `.faq-*` (11), `.statsbar`/`.stat-*` (04)…
- **Collisions**: the transparent header of 16 (`.hdr-main` etc.) vs the
  standard header of 01; `.c-blueprint` of the prices; `prefers-reduced-motion` (content
  differs per file). These values **differ** between components —
  centralizing them would break one of the two.

### Bridge to Tailwind
- The **tokens are exposed to Tailwind** via `@theme inline` (
  `<style type="text/tailwindcss">` block, **inline & irreducible** — it is Tailwind
  config, not standard CSS, so it cannot be moved to `orbita.css`),
  which makes `text-primary`, `bg-night`, `border-line`… usable.
- **Markup = Tailwind utilities** (layout, spacing, breakpoints, arbitrary
  values). **No classes generated dynamically in JS.**

### Convention: tag-independent headings
Except for the hero, a heading's style depends **on the class, never on the tag**
(`.o-headline`, `.fwti-title`, etc.). The back-office can therefore use `h2`,
`h6`, `p` or `span` for SEO **without changing the appearance**. The accent line
is a `<span>` with `display:block`.
→ **Exception: the hero (16)** carries the page's **single, fixed `<h1>`**.

### Convention: images
Two approaches depending on the need:
- **`background-image`** for full panels/backgrounds (mosaic 14, hero, etc.) —
  transposable to `<Image fill>` on the Next.js side.
- **`<img>` with `position:absolute`** in an `overflow:hidden` container when
  the framing must be fine-tuned — the case of the form's **"split image" effect**
  (17): an image cut in two whose halves meet behind the card
  (sides anchored `left:-100%` / `left:-200%`, width `400%`).

### Convention: responsive spacing
A single container on **all** blocks:
`max-w-[1280px] mx-auto px-5 sm:px-8` → **20px** side margin on mobile,
**32px** from 640px. Section vertical spacing reduced on mobile:
`py-14 sm:py-20` (56/80px) and `py-16 sm:py-24` (64/96px). Form card
padding `p-5 sm:p-9`, split card `p-6 sm:p-9 md:p-12`.

---

## 3. Components

| # | File | Role |
|---|---------|------|
| 00 | `00-fondations.html` | Tokens, colors, typography, textures |
| 01 | `01-header.html` | Full header (strip, mega-menu, submenu, search, language, mobile drawer, condensing on scroll) |
| 02 | `02-topPageText.html` | Text + image hero (classic split) |
| 03 | `03-process.html` | Steps / process |
| 04 | `04-statsBar.html` | Statistics bar (dark side gradient) |
| 05 | `05-compareCards.html` | Before / after cards |
| 06 | `06-tabs.html` | Tabs |
| 07 | `07-testimonials.html` | Reviews (dot carousel) |
| 08 | `08-priceList.html` | Pricing — 1 card (light) + 3 cards (light), separated by a band |
| 09 | `09-priceListDark.html` | Pricing — dark version (side gradient) |
| 10 | `10-finalCtaDark.html` | Final CTA, night section |
| 11 | `11-faq.html` | FAQ accordion (light + dark) |
| 12 | `12-cardBlocks.html` | Cards in 4 looks: image / icon / number / title only |
| 13 | `13-fullwidthTextImage.html` | Full-width image banner + parallax, centered text |
| 14 | `14-mosaic.html` | Mosaic: cards (from 12) + image panels, variable widths |
| 15 | `15-sectionHeading.html` | Section heading: eyebrow + title + text + centered CTA |
| 16 | `16-heroFullscreen.html` | Fullscreen hero (100vh), video + poster, transparent → opaque header |
| 17 | `17-forms.html` | Forms & controls (light + dark): floating-label fields, states (focus/error/success/disabled), **custom select** (single / multiple / search), disc radio, square checkbox, toggle, upload, demo form as a "split image" |

Shared file: **`orbita.css`** (the whole foundation — see §2). Component 00
(`00-fondations.html`) stays standalone (DS reference page).

**Custom select (17)**: hidden native `<select>` + styled UI driven by JS
(data-driven via `data-set` / `data-multiple`). Automatic search beyond
5 options, multiple selection with removable badges, keyboard navigation,
`change` event propagated to the native `<select>` (form/React compatible).

---

## 4. Next.js integration notes

1. **Tailwind**: replace the browser build with the Tailwind plugin
   (PostCSS/Vite). Utility classes carry over **1:1**; `orbita.css`
   + the `@theme inline` move into `globals.css`.
2. **Tokens**: they are already centralized in `orbita.css` (`:root` +
   `[data-theme="…"]`). Silo switching is done via `data-theme` on a
   container; animation speed/curve via `--t-dur` / `--t-ease`.
3. **Header (16)**: the markup and JS are **identical to component 01**.
   Transparency over the hero only adds:
   - 3 hook classes on existing elements: `nav-ink` (logo),
     `nav-div` (separator), `btn-login` (Login);
   - a CSS block driven by the existing `.hdr.is-scrolled` state
     (rgba veil at rest → `paper` on scroll, text switch).
   In production, the `!important` in this block can be replaced by a
   **`data-attribute`** variant (e.g. `data-header="transparent"`) — purely cosmetic.
4. **Media**: replace the Unsplash/Pexels URLs with your assets; for the hero,
   plug in your `<video>` (the `poster` serves as fallback if the video does not load).
5. **Accent selectors**: these are demo aids — remove them at
   integration (the silo is set by the page/brand).

---

## 5. Robust scroll detection (header)

Component 16 switches transparent → opaque via **`IntersectionObserver`** on
a sentinel at the top of the page, **plus** a fallback on the `scroll` event.
The IO is independent of the scroll container (more reliable than `scroll` alone).
