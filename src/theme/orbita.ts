/**
 * Orbita × Astryx — theme factory.
 *
 * A single foundation (type, radii, motion, neutrals, editorial gold) declined into
 * accent silos. Each silo is a complete Astryx theme, compiled by
 * `pnpm theme:build` (see src/theme/silos/*.ts).
 *
 * Source values: Orbita/orbita/orbita.css (tokens :root + [data-theme]).
 */
import {defineTheme, type TokenName, type TokenValue} from '@astryxdesign/core/theme';

export type OrbitaSilo = {
  /** Theme name suffix: `orbita-<slug>` */
  slug: string;
  /** Light background tinted by the accent */
  bg: string;
  /** Light background, second level */
  bg2: string;
  /** Primary color (accent) */
  primary: string;
  /** Dark primary (hover / pressed) */
  primaryDeep: string;
  /** Secondary / signal color */
  highlight: string;
  /** Dark highlight (text on light background) */
  highlightDeep: string;
  /** Silo dark background (« night » sections) */
  night: string;
};

/* ---- shared constants, never tinted by the accent ---- */
const PAPER = '#FFFFFF';
const INK = '#0C1424';
const INK_2 = '#3A4456';
const INK_3 = '#6A7486';
const LINE = '#E1E6F1';
const LINE_2 = '#CCD4E4';
const EDITORIAL = '#C7972E';
const EDITORIAL_DEEP = '#A37B1F';
const DANGER = '#D0342C';
const OK = '#1F8A5B';

/* ---- fonts: loaded by next/font (src/app/(frontend)/fonts.ts),
   exposed as CSS variables; Astryx never loads a font itself ---- */
const FONT_BODY = 'var(--font-geist), system-ui, sans-serif';
const FONT_HEADING = 'var(--font-schibsted), system-ui, sans-serif';
const FONT_SERIF = 'var(--font-cormorant), Georgia, serif';
const FONT_MONO = 'var(--font-geist-mono), "SF Mono", ui-monospace, Menlo, monospace';
const FONT_CODE = FONT_MONO; // a single mono: Geist Mono (tag-type markers, code)

/** Derived tint: sRGB mix, resolved by the browser (tokens only). */
const mix = (a: string, b: string, pctA: number) =>
  `color-mix(in srgb, ${a} ${pctA}%, ${b})`;

/**
 * Same mix, computed here in hex: required for `color.accent`, whose
 * Astryx HCT generator needs a literal color.
 */
function mixHex(a: string, b: string, pctA: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const t = pctA / 100;
  const channel = (shift: number) =>
    Math.round(((pa >> shift) & 255) * t + ((pb >> shift) & 255) * (1 - t));
  return `#${[16, 8, 0].map((sh) => channel(sh).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

/**
 * Tokens outside the Astryx naming scheme (highlight, editorial gold, night, serif).
 * The theme compiler accepts them and emits them as is; only the typing
 * of `tokens` rejects them, hence the explicit cast here and nowhere else.
 */
function orbitaOnlyTokens(silo: OrbitaSilo) {
  const {primary, primaryDeep, highlight, highlightDeep, night} = silo;
  return {
    '--font-family-serif': FONT_SERIF,
    '--font-family-mono': FONT_MONO, // Geist Mono: tag-type markers and code
    // Nucleo icon stroke width (18 grid), applied in CSS without
    // touching the SVGs: see styles.css [data-icon="nucleo"]
    '--icon-stroke-width': '1.25',
    '--color-highlight': [highlight, highlight],
    '--color-highlight-deep': [highlightDeep, highlight],
    '--color-highlight-muted': [mix(highlight, 'transparent', 14), mix(highlight, 'transparent', 22)],
    '--color-editorial': [EDITORIAL, EDITORIAL],
    '--color-editorial-deep': [EDITORIAL_DEEP, EDITORIAL],
    '--color-night': [night, night],
    // darkened night for the footer (mockup 21: night 68 % + black) and its bottom bar (40 %)
    '--color-night-deep': [mix(night, '#000000', 68), mix(night, '#000000', 68)],
    '--color-night-deeper': [mix(night, '#000000', 40), mix(night, '#000000', 40)],
    // « light » background: silo color at 5 % (translucent, like checked lists),
    // for barely tinted surfaces (e.g. tab panel); night: 3 % white veil
    '--color-background-light': [mix(primary, 'transparent', 5), 'rgba(255,255,255,.03)'],
    // same principle with the silo highlight at 5 % (tab panel, chosen on Sept 10)
    '--color-highlight-light': [mix(highlight, 'transparent', 5), mix(highlight, 'transparent', 5)],
    '--color-accent-deep': [primaryDeep, primary],
  } as unknown as Partial<Record<TokenName, TokenValue>>;
}

export function defineOrbitaSilo(silo: OrbitaSilo) {
  const {bg, bg2, primary, night} = silo;

  // Lightened accent to stay readable on the night background.
  const primaryOnNight = mixHex(primary, '#FFFFFF', 68);
  const nightCard = mix(night, '#000000', 82);
  const nightPopover = mix(night, '#FFFFFF', 88);

  return defineTheme({
    name: `orbita-${silo.slug}`,

    // The accent stays the same in night (Orbita: a button on a night section keeps
    // its primary background); only accent text and icons get lighter.
    color: {accent: primary, neutralStyle: 'cool', contrast: 'standard'},

    typography: {
      scale: {base: 15, ratio: 1.2},
      body: {family: 'Geist', fallbacks: 'system-ui, sans-serif'},
      heading: {
        family: 'Schibsted Grotesk',
        fallbacks: 'system-ui, sans-serif',
        weight: 'bold',
        weights: {1: 'bold', 2: 'bold', 3: 'bold', 4: 'semibold', 5: 'semibold', 6: 'semibold'},
      },
      code: {family: 'Geist Mono', fallbacks: '"SF Mono", ui-monospace, Menlo, monospace'},
    },

    // Orbita signature: sharp corners everywhere.
    radius: {base: 0, multiplier: 0},

    // Orbita: a single speed (.25s) and a single curve (ease-in-out).
    motion: {fast: 200, medium: 250, slow: 500, ratio: 0.75, easing: 'ease-in-out'},

    tokens: {
      /* — fonts (next/font variables) — */
      '--font-family-body': FONT_BODY,
      '--font-family-heading': FONT_HEADING,
      '--font-family-code': FONT_CODE,
      /* — text sizes: never below 14 px (Sept 10 rule): Astryx's xs and sm
         steps (10 and 13 px) are raised to 14 px — */
      '--font-size-xs': '0.875rem',
      '--font-size-sm': '0.875rem',
      /* — motion: link and button hovers in 0.25 s, smooth curve — */
      '--duration-medium': '250ms',
      '--ease-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',

      /* — surfaces — */
      '--color-background-body': [bg, night],
      '--color-background-surface': [PAPER, nightCard],
      '--color-background-card': [PAPER, nightCard],
      '--color-background-popover': [PAPER, nightPopover],
      '--color-background-muted': [bg2, 'rgba(255,255,255,.06)'],
      '--color-background-inverted': [night, PAPER],

      /* — accent: forced identical in night (the generator would lighten it) — */
      '--color-accent': [primary, primary],

      /* — text & icons — */
      '--color-text-accent': [primary, primaryOnNight],
      '--color-icon-accent': [primary, primaryOnNight],
      '--color-on-accent': [PAPER, PAPER],
      '--color-text-primary': [INK, PAPER],
      '--color-text-secondary': [INK_2, 'rgba(255,255,255,.72)'],
      '--color-text-disabled': [INK_3, 'rgba(255,255,255,.4)'],
      '--color-icon-primary': [INK, PAPER],
      '--color-icon-secondary': [INK_2, 'rgba(255,255,255,.72)'],
      '--color-icon-disabled': [INK_3, 'rgba(255,255,255,.4)'],

      /* — control heights (buttons, fields, selects): Orbita 36 / 48 / 56 — */
      '--size-element-sm': '36px',
      '--size-element-md': '48px',
      '--size-element-lg': '56px',

      /* — rules — */
      '--color-border': [LINE, 'rgba(255,255,255,.14)'],
      '--color-border-emphasized': [LINE_2, 'rgba(255,255,255,.3)'],
      '--color-track': [LINE_2, 'rgba(255,255,255,.2)'],
      '--color-skeleton': [LINE, 'rgba(255,255,255,.12)'],

      /* — statuses — */
      '--color-error': [DANGER, '#F0655D'],
      '--color-error-muted': ['rgba(208,52,44,.10)', 'rgba(240,101,93,.18)'],
      '--color-success': [OK, '#3FB57F'],
      '--color-success-muted': ['rgba(31,138,91,.10)', 'rgba(63,181,127,.18)'],
      '--color-warning': [EDITORIAL, '#E0B04A'],
      '--color-warning-muted': ['rgba(199,151,46,.12)', 'rgba(224,176,74,.18)'],

      /* — dialog overlay (Astryx ::backdrop reads --color-overlay) — */
      '--color-overlay': [
        `color-mix(in srgb, ${primary} 26%, rgba(28,38,68,.4))`,
        `color-mix(in srgb, ${night} 58%, rgba(7,9,26,.6))`,
      ],

      /* — shadow & focus — */
      '--color-shadow': ['rgba(12,20,40,.07)', 'rgba(0,0,0,.4)'],
      '--shadow-low': '0 2px 6px var(--color-shadow)',
      '--shadow-med': '0 2px 6px rgba(12,20,40,.05), 0 14px 36px var(--color-shadow)',
      '--shadow-high': '0 6px 14px rgba(12,20,40,.06), 0 28px 64px var(--color-shadow)',
      '--focus-outline-color': 'var(--color-accent)',
      '--focus-outline-offset': '2px',

      /* — Orbita-specific tokens: see orbitaOnlyTokens() — */
      ...orbitaOnlyTokens(silo),

      /* — display scale: Orbita headings (clamp) — */
      '--text-display-1-size': 'clamp(42px, 6vw, 76px)',
      '--text-display-1-weight': '800',
      '--text-display-1-leading': '1.04',
      '--text-display-2-size': 'clamp(40px, 5vw, 64px)',
      '--text-display-2-weight': '800',
      '--text-display-2-leading': '1.04',
      '--text-display-3-size': 'clamp(32px, 4.4vw, 54px)',
      '--text-display-3-weight': '800',
      '--text-display-3-leading': '1.08',
      '--text-large-size': '1.125rem',
      '--text-large-leading': '1.62',
    },

    components: {
      /* Display headings: Orbita tight letter spacing */
      heading: {
        // card title (mockup 12/19/24): independent of the h3/h4 level chosen in the admin
        'type:card': {fontSize: '18px', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.3', letterSpacing: '-0.015em'},
        'type:display-1': {letterSpacing: '-0.025em'},
        'type:display-2': {letterSpacing: '-0.025em'},
        'type:display-3': {letterSpacing: '-0.02em'},
      },

      /* Orbita text types added to <Text type="…"> */
      text: {
        // Eyebrow: spaced small caps, editorial gold
        // NB: Text sets color="primary" by default, whose rule is emitted after the types;
        // a type's color is therefore also declared as a compound key 'type:x+color:primary'.
        'type:eyebrow': {
          fontSize: '14px', // never below 14 px (Sept 10 rule)
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          lineHeight: '1.4',
          color: 'var(--color-editorial)',
        },
        // Section heading eyebrow (mockup .c-head-eyebrow): same text, with a
        // 40 px dash on each side, editorial gold at 60 %
        // Mono eyebrow (mockups 20 .modal-eyebrow, 21 .ftr-eyebrow): Geist Mono 500, 12 px (11 → floor 12)
        'type:eyebrow-mono': {
          fontFamily: 'var(--font-family-mono)',
          fontSize: '12px',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          lineHeight: '1.4',
          color: 'var(--color-editorial)',
        },
        'type:eyebrow-lines': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '15px',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          lineHeight: '1.4',
          color: 'var(--color-editorial)',
          '::before': {content: '""', width: '40px', height: '1px', backgroundColor: 'var(--color-editorial)', opacity: '0.6'},
          '::after': {content: '""', width: '40px', height: '1px', backgroundColor: 'var(--color-editorial)', opacity: '0.6'},
        },
        // Serif accent: Cormorant italic 600, accent color
        'type:serif': {
          fontFamily: 'var(--font-family-serif)',
          fontStyle: 'italic',
          fontWeight: '600',
          color: 'var(--color-accent)',
          // 10 % above the parent's size: Cormorant's small x-height makes it look smaller at
          // equal size (Nicolas, 18 Sept. 2026). Proportional, so usable in any heading.
          fontSize: '1.1em',
          // no line height of its own: the heading's lines keep their rhythm despite the larger size
          lineHeight: '0',
          letterSpacing: '-0.01em',
        },
        // Upright serif (mockup .c-serif): Cormorant 500, silo color — step numbers,
        // testimonial quote mark; inherits the parent's size
        'type:serif-upright': {
          fontFamily: 'var(--font-family-serif)',
          fontStyle: 'normal',
          fontWeight: '500',
          color: 'var(--color-accent)',
          fontSize: 'inherit',
          lineHeight: 'inherit',
        },
        // Large card number (card-num): Schibsted 800, silo color
        'type:number': {
          fontFamily: 'var(--font-family-heading)',
          fontWeight: '800',
          fontSize: 'clamp(40px, 3.4vw, 52px)',
          lineHeight: '1',
          letterSpacing: '-0.03em',
          color: 'var(--color-text-accent)',
        },
        // Numeric result of case studies (work-result)
        'type:result': {
          fontSize: '14px',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: '0.02em',
          color: 'light-dark(var(--color-text-accent), var(--color-highlight))',
          whiteSpace: 'nowrap',
        },
        // Article date (post-date)
        'type:date': {fontFamily: 'var(--font-family-mono)', fontSize: '12px', color: 'var(--color-text-disabled)', whiteSpace: 'nowrap'}, // mockup .post-date: Geist Mono 12
        // Mono-like label (formerly Geist Mono): Geist, spaced
        'type:eyebrow+color:primary': {color: 'var(--color-editorial)'},
        'type:eyebrow-lines+color:primary': {color: 'var(--color-editorial)'},
        'type:eyebrow-mono+color:primary': {color: 'var(--color-editorial)'},
        'type:serif+color:primary': {color: 'var(--serif-color, light-dark(var(--color-accent), var(--color-highlight)))'},
        'type:serif-upright+color:primary': {color: 'light-dark(var(--color-accent), var(--color-highlight))'},
        'type:number+color:primary': {color: 'var(--color-text-accent)'},
        'type:result+color:primary': {color: 'light-dark(var(--color-text-accent), var(--color-highlight))'},
        'type:date+color:primary': {color: 'var(--color-text-disabled)'},
        'type:tag': {
          fontFamily: 'var(--font-family-mono)', // Geist Mono (mockup .font-mono), readopted on Sept 11, 2026
          fontSize: '14px',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          lineHeight: '1.4',
        },
      },

      /* Orbita buttons (mockup 00-fondations + orbita.css .c-btn-*)
         - primary  : accent background, accent glow, hover accent-deep
         - ghost    : bordered « ghost »; on night, white border and veil
         - high     : highlight background, night text (added variant, typed at build)
         - secondary/destructive : Astryx, sharp corners
         Horizontal padding set per size: Button uses it to
         reserve the arrow cell (see src/components/Button). */
      button: {
        base: {
          fontWeight: 'var(--font-weight-semibold)',
          position: 'relative',
          overflow: 'visible',
          // Astryx does not transition colors: Orbita does (.25s ease-in-out)
          transition: [
            'background-color var(--duration-medium) var(--ease-standard)',
            'border-color var(--duration-medium) var(--ease-standard)',
            'color var(--duration-medium) var(--ease-standard)',
            'box-shadow var(--duration-medium) var(--ease-standard)',
          ].join(', '),
        },
        // icon ↔ label gap = half the horizontal padding
        'size:sm': {paddingInline: 'var(--spacing-4)', gap: 'var(--spacing-2)'},
        'size:md': {paddingInline: 'var(--spacing-6)', gap: 'var(--spacing-3)'},
        'size:lg': {paddingInline: 'var(--spacing-8)', gap: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)'},
        'variant:primary': {
          boxShadow: '0 10px 24px var(--color-accent-muted)',
          ':hover': {backgroundColor: 'var(--color-accent-deep)'},
        },
        'variant:ghost': {
          borderWidth: 'var(--border-width)',
          borderStyle: 'solid',
          borderColor: 'light-dark(var(--color-border-emphasized), rgba(255,255,255,.5))',
          backgroundColor: 'light-dark(var(--color-background-surface), rgba(255,255,255,.04))',
          // text and icon in silo color at rest; on night, white (mockup .on-dark .c-btn-ghost)
          color: 'light-dark(var(--color-text-accent), #FFFFFF)',
          // hover: light = silo border; night = solid white background, text and icon in silo color
          ':hover': {
            borderColor: 'light-dark(var(--color-accent), #FFFFFF)',
            color: 'light-dark(var(--color-accent), var(--color-accent))',
            backgroundColor: 'light-dark(var(--color-background-surface), #FFFFFF)',
          },
        },
        'variant:high': {
          backgroundColor: 'var(--color-highlight)',
          color: 'var(--color-night)',
          boxShadow: '0 10px 26px var(--color-highlight-muted)',
          ':hover': {backgroundColor: 'var(--color-highlight-deep)'},
        },
        // ink: solid ink, white text, silo hover (header « Connexion » button)
        'variant:ink': {
          backgroundColor: 'light-dark(var(--color-text-primary), #FFFFFF)',
          color: 'light-dark(#FFFFFF, var(--color-night))',
          ':hover': {backgroundColor: 'var(--color-accent)', color: '#FFFFFF'},
        },
      },

      // links: same transition as buttons
      'link': {
        base: {transition: 'color var(--duration-medium) var(--ease-standard), text-decoration-color var(--duration-medium) var(--ease-standard)'},
        // subtle link (footer stacks, legal links): stands out on hover
        'color:secondary': {':hover': {color: 'light-dark(var(--color-text-primary), #FFFFFF)'}},
      },

      /* Orbita fields and selects (mockup 17-forms / .field-* and .selectx-*)
         line-2 border, paper background, focus = accent border + 3 px glow;
         panels: thin border, deep drop shadow, hovered option in
         accent-muted, selected option in semibold accent. */
      ...Object.fromEntries(
        ['text-input', 'text-area', 'number-input', 'selector', 'multi-selector', 'typeahead', 'tokenizer', 'date-input', 'date-range-input', 'date-time-input', 'time-input', 'input-group'].map((k) => [
          k,
          {
            base: {
              borderColor: 'var(--color-border-emphasized)',
              backgroundColor: 'var(--color-background-surface)',
              transition: 'border-color var(--duration-medium) var(--ease-standard), box-shadow var(--duration-medium) var(--ease-standard)',
              // focus: accent on light, highlight on night (mockup 17-forms .on-dark)
              ':focus-within': {
                borderColor: 'light-dark(var(--color-accent), var(--color-highlight))',
                boxShadow: '0 0 0 3px light-dark(var(--color-accent-muted), var(--color-highlight-muted))',
              },
            },
            disabled: {
              backgroundColor: 'var(--color-background-muted)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-disabled)',
            },
            // statuses: colored border and glow (mockup .field.is-error / .is-success)
            'status:error': {
              borderColor: 'var(--color-error)',
              boxShadow: '0 0 0 3px var(--color-error-muted)',
              ':focus-within': {borderColor: 'var(--color-error)', boxShadow: '0 0 0 3px var(--color-error-muted)'},
            },
            'status:success': {
              borderColor: 'var(--color-success)',
              boxShadow: '0 0 0 3px var(--color-success-muted)',
              ':focus-within': {borderColor: 'var(--color-success)', boxShadow: '0 0 0 3px var(--color-success-muted)'},
            },
            'status:warning': {
              borderColor: 'var(--color-warning)',
              boxShadow: '0 0 0 3px var(--color-warning-muted)',
              ':focus-within': {borderColor: 'var(--color-warning)', boxShadow: '0 0 0 3px var(--color-warning-muted)'},
            },
          },
        ]),
      ),
      ...Object.fromEntries(
        ['selector-popup', 'multi-selector-popup', 'typeahead-dropdown', 'popover-surface'].map((k) => [
          k,
          {
            base: {
              borderRadius: '0',
              borderWidth: 'var(--border-width)',
              borderStyle: 'solid',
              borderColor: 'var(--color-border)',
              boxShadow: '0 26px 60px light-dark(rgba(12,20,40,.16), rgba(0,0,0,.5))',
              padding: 'var(--spacing-1-5)',
            },
          },
        ]),
      ),
      ...Object.fromEntries(
        ['selector-option-row', 'multi-selector-option', 'typeahead-item'].map((k) => [
          k,
          {
            base: {
              borderRadius: '0',
              color: 'var(--color-text-secondary)',
              transition: 'background-color var(--duration-medium) var(--ease-standard), color var(--duration-medium) var(--ease-standard)',
              ':hover': {
                backgroundColor: 'light-dark(var(--color-accent-muted), rgba(255,255,255,.08))',
                color: 'var(--color-text-primary)',
              },
            },
            selected: {color: 'light-dark(var(--color-text-accent), var(--color-highlight))', fontWeight: 'var(--font-weight-semibold)'},
          },
        ]),
      ),
      ...Object.fromEntries(
        ['selector-search', 'multi-selector-search'].map((k) => [
          k,
          {base: {borderBottom: 'var(--border-width) solid var(--color-border)'}},
        ]),
      ),

      /* Attached status message (error / success / warning): aligned with the field's
         3 px glow, starts below the glow (otherwise the translucent backgrounds
         overlap and darken the junction). */
      'field-status': {
        'variant:attached': {marginInline: '-3px', width: 'calc(100% + 6px)', marginTop: '3px', paddingTop: '8px'},
        'variant:attached+type:error': {backgroundColor: 'var(--color-error-muted)'},
        'variant:attached+type:success': {backgroundColor: 'var(--color-success-muted)'},
        'variant:attached+type:warning': {backgroundColor: 'var(--color-warning-muted)'},
      },
      // option control labels: 14.5 px; checked radio in silo color
      'checkbox-label': {base: {fontSize: '14px'}},
      'switch-label': {base: {fontSize: '14px'}},
      'radio-list-item': {base: {fontSize: '14px'}, selected: {color: 'var(--color-text-accent)'}},
      // calendar / clock icons of date fields: silo color
      ...Object.fromEntries(
        ['date-input-toggle-icon', 'date-range-input-toggle-icon', 'date-time-input-toggle-icon', 'date-time-input-clock-icon'].map((k) => [k, {base: {color: 'var(--color-icon-accent)'}}]),
      ),
      // tokens: sharp corners (signature)
      'token': {base: {borderRadius: '0'}},

      /* ─────────────────────────────────────────────────────────────────
         NAVIGATION (mockup 01-header) — TopNav and its family, MobileNav,
         Breadcrumbs (25-pageHeaders). The background, height, collapse on
         scroll and tone over the hero are handled by SiteHeader
         (src/components/SiteHeader); here, the styling of the Astryx elements.
         ───────────────────────────────────────────────────────────────── */
      'top-nav': {
        base: {
          height: 'var(--site-header-bar)', // global variable (styles.css), single source
          padding: '0',
          backgroundColor: 'transparent',
          borderBottom: '0',
          boxShadow: 'none',
          fontFamily: 'var(--font-family-body)',
          transition: 'height var(--duration-medium) var(--ease-standard)',
        },
      },
      'top-nav-heading': {
        // padding 0: the logo aligns with the container edge, like the breadcrumb and the blocks
        base: {padding: '0', fontFamily: 'var(--font-family-serif)', fontSize: '18px', fontWeight: '500', letterSpacing: '1px', lineHeight: '1.2', textTransform: 'uppercase'},
      },
      // navigation entries: 14.5 px medium secondary ink, ink on hover, no pill; the current page in silo colour
      ...Object.fromEntries(
        ['top-nav-item', 'top-nav-menu', 'top-nav-mega-menu'].map((k) => [
          k,
          {
            base: {
              height: '100%',
              padding: '0 16px',
              gap: '8px',
              borderRadius: '0',
              backgroundColor: 'transparent',
              fontSize: '14px',
              fontWeight: 'var(--font-weight-medium)',
              whiteSpace: 'nowrap',
              color: 'var(--color-text-secondary)',
              transition: 'color var(--duration-medium) var(--ease-standard)',
              ':hover': {backgroundColor: 'transparent', color: 'var(--color-text-primary)'},
            },
            selected: {backgroundColor: 'transparent', color: 'var(--color-text-accent)'},
          },
        ]),
      ),
      // mega-menu / submenu item: block on page background, silo hover with white text
      'top-nav-mega-menu-item': {
        base: {
          borderRadius: '0',
          padding: '12px 16px',
          gap: '16px',
          backgroundColor: 'var(--color-background-body)',
          color: 'var(--color-text-primary)',
          transition: 'background-color var(--duration-medium) var(--ease-standard), color var(--duration-medium) var(--ease-standard)',
          ':hover': {backgroundColor: 'var(--color-accent)', color: '#FFFFFF'},
        },
      },
      // featured card: night background, sharp corners
      'top-nav-mega-menu-featured-card': {
        base: {height: '100%', borderRadius: '0', backgroundColor: 'var(--color-night)', color: '#FFFFFF'},
      },
      'mobile-nav': {
        base: {backgroundColor: 'var(--color-background-body)', borderRadius: '0'},
      },
      // breadcrumb (mockup 25 .crumb): spaced caps 14 px, gray, silo on hover
      // a single line: no wrapping, horizontal scrolling if the trail is too long
      'breadcrumbs': {base: {gap: '8px', whiteSpace: 'nowrap', maxWidth: '100%'}},
      'breadcrumb-item': {
        base: {
          fontFamily: 'var(--font-family-mono)', // mockup .crumb: Geist Mono
          fontSize: '12px', // exception to the 14 px rule (decided on Sept 10)
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-disabled)',
          ':hover': {color: 'var(--color-accent)'},
        },
      },

      /* Quote (Astryx Blockquote): no rule or indent, it inherits from its context —
         the testimonial card (mockup 07) and the comparison card (05) dress it. */
      blockquote: {
        base: {margin: '0', padding: '0', borderWidth: '0', color: 'inherit', fontStyle: 'normal', fontSize: 'inherit', lineHeight: 'inherit'},
      },

      /* Avatar (post author, quote card — mockups 18 and 23): square with a 1 px rule */
      avatar: {
        'shape:square': {borderWidth: 'var(--border-width)', borderStyle: 'solid', borderColor: 'var(--color-border-emphasized)'},
      },

      /* Outline (post table of contents, mockup 18 .toc): 14 px links in secondary ink, the
         current one in silo colour and semibold; 2 px silo indicator on the rule */
      'outline-item': {
        base: {fontSize: '14px', lineHeight: '1.4', color: 'var(--color-text-secondary)', transition: 'color var(--duration-medium) var(--ease-standard)', ':hover': {color: 'var(--color-text-primary)'}},
        active: {color: 'light-dark(var(--color-text-accent), var(--color-highlight))', fontWeight: 'var(--font-weight-semibold)'},
      },
      'outline-indicator': {
        base: {width: '2px', borderRadius: '0', backgroundColor: 'light-dark(var(--color-accent), var(--color-highlight))'},
      },

      /* ─────────────────────────────────────────────────────────────────
         TABS (mockup 06-tabs) — Tab, TabList, TabMenu
         Astryx targets: tab-list (the bar), tab-strip (the track), tab (a
         tab, selected state), tab-indicator (line under the active tab),
         tab-menu (overflow menu trigger), tab-menu-item.
         What the theme cannot target (« all but the first » separator,
         two-line labels depending on width, .orbita-tab-* panel)
         is in src/app/(frontend)/styles.css, Tabs section.
         ───────────────────────────────────────────────────────────────── */
      // the bar: the block's bordered header (paper background, rule all around)
      'tab-list': {
        base: {
          height: 'auto',
          fontFamily: 'var(--font-family-body)',
          // bar on paper (mockup 06); the highlight tint goes on the content panel
          backgroundColor: 'light-dark(var(--color-background-surface), var(--color-background-card))',
          borderWidth: 'var(--border-width)',
          borderStyle: 'solid',
          borderColor: 'light-dark(var(--color-border), rgba(255,255,255,.15))',
        },
      },
      'tab-strip': {base: {height: 'auto', gap: '0'}},
      // a tab (and the menu trigger, which looks like a tab)
      ...Object.fromEntries(
        ['tab', 'tab-menu'].map((k) => [
          k,
          {
            base: {
              height: 'auto',
              padding: '20px 24px',
              gap: '12px', // icon ↔ label ↔ counter: half an icon
              fontSize: '15px',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: '1.3',
              textAlign: 'center',
              justifyContent: 'center',
              color: 'light-dark(var(--color-text-secondary), rgba(255,255,255,.8))',
              borderRadius: '0',
              transition: 'color var(--duration-medium) var(--ease-standard), background-color var(--duration-medium) var(--ease-standard)',
              // hover: ink + 10 % silo background
              ':hover': {
                color: 'light-dark(var(--color-text-primary), #FFFFFF)',
                backgroundColor: 'light-dark(var(--color-accent-muted), rgba(255,255,255,.06))',
              },
            },
            // active: silo color (highlight in night), 5 % highlight background like the panel
            selected: {color: 'light-dark(var(--color-text-accent), var(--color-highlight))', backgroundColor: 'var(--color-highlight-light)'},
          },
        ]),
      ),
      // the line under the active tab: 3 px, full tab width, with a fade
      'tab-indicator': {
        base: {
          left: '0',
          right: '0',
          width: 'auto',
          height: '3px',
          borderRadius: '0',
          backgroundColor: 'light-dark(var(--color-accent), var(--color-highlight))',
          transition: 'opacity var(--duration-medium) var(--ease-standard)',
        },
      },
      // overflow menu options: same rows as the selects
      'tab-menu-item': {
        base: {
          borderRadius: '0',
          color: 'var(--color-text-secondary)',
          transition: 'background-color var(--duration-medium) var(--ease-standard), color var(--duration-medium) var(--ease-standard)',
          ':hover': {
            backgroundColor: 'light-dark(var(--color-accent-muted), rgba(255,255,255,.08))',
            color: 'var(--color-text-primary)',
          },
        },
      },


      /* Orbita option controls (mockup 17-forms .opt / .switch / .c-range) */
      'radio-indicator': {
        base: {
          width: '22px', height: '22px',
          borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'var(--color-border-emphasized)',
          backgroundColor: 'light-dark(var(--color-background-surface), rgba(255,255,255,.06))',
          transition: 'border-color var(--duration-medium) var(--ease-standard), background-color var(--duration-medium) var(--ease-standard)',
        },
        checked: {borderColor: 'light-dark(var(--color-accent), var(--color-highlight))'},
      },
      'radio-indicator-dot': {
        base: {width: '8px', height: '8px', backgroundColor: 'light-dark(var(--color-accent), var(--color-highlight))'},
      },
      'checkbox-indicator': {
        base: {
          width: '22px', height: '22px', borderRadius: '0',
          borderWidth: '1.5px', borderStyle: 'solid', borderColor: 'var(--color-border-emphasized)',
          backgroundColor: 'light-dark(var(--color-background-surface), rgba(255,255,255,.06))',
          position: 'relative',
          transition: 'border-color var(--duration-medium) var(--ease-standard), background-color var(--duration-medium) var(--ease-standard)',
        },
        // checked: accent background, centered Nucleo check (white; night on highlight)
        checked: {
          backgroundColor: 'light-dark(var(--color-accent), var(--color-highlight))',
          borderColor: 'light-dark(var(--color-accent), var(--color-highlight))',
          color: 'light-dark(#FFFFFF, var(--color-night))',
        },
      },
      'checkbox-indicator-check': {base: {width: '14px', height: '14px'}},
      'checkbox-indicator-dash': {base: {display: 'none'}},
      switch: {
        base: {
          width: '46px', height: '26px', borderRadius: '9999px',
          backgroundColor: 'light-dark(var(--color-border-emphasized), rgba(255,255,255,.2))',
          transition: 'background-color var(--duration-medium) var(--ease-standard)',
        },
        checked: {backgroundColor: 'light-dark(var(--color-accent), var(--color-highlight))'},
      },
      'switch-thumb': {
        base: {
          width: '20px', height: '20px', backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,.25)',
          transition: 'transform var(--duration-medium) var(--ease-standard)',
        },
        checked: {transform: 'translateX(20px)'},
      },
      'slider-track': {
        base: {
          height: '6px', borderRadius: '3px',
          backgroundImage: 'linear-gradient(90deg, color-mix(in srgb, var(--color-highlight) 26%, light-dark(#FFFFFF, var(--color-night))), color-mix(in srgb, var(--color-accent) 26%, light-dark(#FFFFFF, var(--color-night))))',
        },
      },
      'slider-thumb': {
        base: {
          width: '16px', height: '16px', backgroundColor: 'var(--color-accent)',
          boxShadow: '0 1px 4px rgba(0,0,0,.3)', borderWidth: '0',
          transition: 'background-color var(--duration-medium) var(--ease-standard), box-shadow var(--duration-medium) var(--ease-standard)',
          ':hover': {backgroundColor: 'var(--color-accent-deep)'},
        },
      },
      'file-input': {
        'mode:dropzone': {
          borderWidth: '1.5px', borderStyle: 'dashed', borderColor: 'var(--color-border-emphasized)',
          backgroundColor: 'light-dark(var(--color-background-surface), rgba(255,255,255,.05))',
          borderRadius: '0', padding: '20px 20px',
          transition: 'border-color var(--duration-medium) var(--ease-standard), background-color var(--duration-medium) var(--ease-standard)',
          ':hover': {borderColor: 'var(--color-accent)', backgroundColor: 'var(--color-accent-muted)'},
        },
      },

      /* Field clear button (date, text, selects): bare cross, no frame
         or background — see styles.css: the input-clear-button target loses to
         the button's variant:ghost (same layer, higher specificity). */
      'input-clear-icon': {base: {width: '16px', height: '16px'}},

      /* Orbita chips (mockup .c-chip*): variants added to the Astryx Badge */
      badge: {
        base: {borderRadius: '0'},
        'variant:chip': {
          height: '28px', padding: '0 12px', lineHeight: '1',
          borderWidth: 'var(--border-width)', borderStyle: 'solid', borderColor: 'var(--color-border-emphasized)',
          backgroundColor: 'var(--color-background-surface)', color: 'var(--color-text-secondary)',
          fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.03em',
        },
        'variant:chip-high': {
          height: '28px', padding: '0 12px', lineHeight: '1', borderWidth: '0',
          backgroundColor: 'color-mix(in srgb, var(--color-highlight) 18%, transparent)',
          color: 'light-dark(var(--color-highlight-deep), var(--color-highlight))',
          fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.03em',
        },
        'variant:chip-accent': {
          height: '28px', padding: '0 12px', lineHeight: '1', borderWidth: '0',
          backgroundColor: 'light-dark(var(--color-accent-muted), rgba(255,255,255,.1))',
          color: 'light-dark(var(--color-text-accent), var(--color-highlight))',
          fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.03em',
        },
        'variant:chip-cat': {
          height: '28px', padding: '0 12px', lineHeight: '1', borderWidth: '0',
          backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)',
          fontFamily: 'var(--font-family-mono)', fontSize: '12px', fontWeight: 'var(--font-weight-medium)', letterSpacing: '0.16em', textTransform: 'uppercase',
        },
        // « live » chip (mockup 02): bordered paper, silo dot before the text
        'variant:chip-live': {
          height: '32px', padding: '0 12px', gap: '8px', lineHeight: '1',
          borderWidth: 'var(--border-width)', borderStyle: 'solid', borderColor: 'var(--color-border-emphasized)',
          backgroundColor: 'var(--color-background-surface)', color: 'var(--color-text-secondary)',
          fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.04em',
          '::before': {content: '""', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent)'},
        },
        // « live » chip on media (mockup 16): blurred translucent, glowing highlight dot
        'variant:chip-live-dark': {
          height: '32px', padding: '0 16px', gap: '8px', lineHeight: '1',
          borderWidth: 'var(--border-width)', borderStyle: 'solid', borderColor: 'rgba(255,255,255,.28)',
          backgroundColor: 'rgba(255,255,255,.06)', backdropFilter: 'blur(4px)', color: 'rgba(255,255,255,.9)',
          fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.04em',
          '::before': {content: '""', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-highlight)', boxShadow: '0 0 8px var(--color-highlight)'},
        },
        'variant:chip-danger': {
          height: '28px', padding: '0 12px', lineHeight: '1', borderWidth: '0',
          backgroundColor: 'var(--color-error-muted)', color: 'var(--color-error)',
          fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.03em',
        },
      },

      card: {base: {borderRadius: '0'}},

      /* Dialog: Orbita drop shadow, blurred veil with accent glow */
      dialog: {
        base: {
          borderRadius: '0',
          backgroundColor: 'var(--color-background-surface)', // night: night card, not the lighter popover
          boxShadow: '0 30px 80px -24px rgba(7,9,26,.6)',
          '::backdrop': {
            backgroundImage:
              'radial-gradient(120% 120% at 50% -10%, color-mix(in srgb, var(--color-accent) 40%, transparent), transparent 66%)',
            backdropFilter: 'blur(5px)',
          },
        },
      },
    },
  });
}
