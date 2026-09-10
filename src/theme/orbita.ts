/**
 * Orbita × Astryx — fabrique de thème.
 *
 * Un seul socle (typo, rayons, mouvement, neutres, or éditorial) décliné en
 * silos d'accent. Chaque silo est un thème Astryx complet, compilé par
 * `pnpm theme:build` (voir src/theme/silos/*.ts).
 *
 * Valeurs source : Orbita/orbita/orbita.css (tokens :root + [data-theme]).
 */
import {defineTheme, type TokenName, type TokenValue} from '@astryxdesign/core/theme';

export type OrbitaSilo = {
  /** Suffixe du nom de thème : `orbita-<slug>` */
  slug: string;
  /** Fond clair teinté par l'accent */
  bg: string;
  /** Fond clair, second niveau */
  bg2: string;
  /** Couleur primaire (accent) */
  primary: string;
  /** Primaire foncé (hover / pressed) */
  primaryDeep: string;
  /** Couleur secondaire / signal */
  highlight: string;
  /** Highlight foncé (texte sur fond clair) */
  highlightDeep: string;
  /** Fond sombre du silo (sections « nuit ») */
  night: string;
};

/* ---- constantes partagées, jamais teintées par l'accent ---- */
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

/* ---- polices : chargées par next/font (src/app/(frontend)/fonts.ts),
   exposées en variables CSS ; Astryx ne charge jamais de police lui-même ---- */
const FONT_BODY = 'var(--font-geist), system-ui, sans-serif';
const FONT_HEADING = 'var(--font-schibsted), system-ui, sans-serif';
const FONT_SERIF = 'var(--font-cormorant), Georgia, serif';
const FONT_CODE = '"SF Mono", ui-monospace, Menlo, monospace';

/** Teinte dérivée : mélange en sRGB, résolu par le navigateur (tokens seulement). */
const mix = (a: string, b: string, pctA: number) =>
  `color-mix(in srgb, ${a} ${pctA}%, ${b})`;

/**
 * Même mélange, calculé ici en hex : obligatoire pour `color.accent`, dont le
 * générateur HCT d'Astryx a besoin d'une couleur littérale.
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
 * Tokens hors nomenclature Astryx (highlight, or éditorial, nuit, serif).
 * Le compilateur de thème les accepte et les émet tels quels ; seul le typage
 * de `tokens` les refuse, d'où le cast explicite ici et nulle part ailleurs.
 */
function orbitaOnlyTokens(silo: OrbitaSilo) {
  const {primary, primaryDeep, highlight, highlightDeep, night} = silo;
  return {
    '--font-family-serif': FONT_SERIF,
    // épaisseur de trait des icônes Nucleo (grille 18), appliquée en CSS sans
    // toucher aux SVG : voir styles.css [data-icon="nucleo"]
    '--icon-stroke-width': '1.25',
    '--color-highlight': [highlight, highlight],
    '--color-highlight-deep': [highlightDeep, highlight],
    '--color-highlight-muted': [mix(highlight, 'transparent', 14), mix(highlight, 'transparent', 22)],
    '--color-editorial': [EDITORIAL, EDITORIAL],
    '--color-editorial-deep': [EDITORIAL_DEEP, EDITORIAL],
    '--color-night': [night, night],
    '--color-accent-deep': [primaryDeep, primary],
  } as unknown as Partial<Record<TokenName, TokenValue>>;
}

export function defineOrbitaSilo(silo: OrbitaSilo) {
  const {bg, bg2, primary, primaryDeep, highlight, highlightDeep, night} = silo;

  // Accent éclairci pour rester lisible sur le fond nuit.
  const primaryOnNight = mixHex(primary, '#FFFFFF', 68);
  const nightCard = mix(night, '#000000', 82);
  const nightPopover = mix(night, '#FFFFFF', 88);

  return defineTheme({
    name: `orbita-${silo.slug}`,

    // L'accent reste identique en nuit (Orbita : un bouton sur section nuit garde
    // son fond primaire) ; seuls texte et icônes accent s'éclaircissent.
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
      code: {family: 'SF Mono', fallbacks: 'ui-monospace, Menlo, monospace'},
    },

    // Signature Orbita : angles vifs partout.
    radius: {base: 0, multiplier: 0},

    // Orbita : une seule vitesse (.25s) et une seule courbe (ease-in-out).
    motion: {fast: 200, medium: 250, slow: 500, ratio: 0.75, easing: 'ease-in-out'},

    tokens: {
      /* — polices (variables next/font) — */
      '--font-family-body': FONT_BODY,
      '--font-family-heading': FONT_HEADING,
      '--font-family-code': FONT_CODE,

      /* — surfaces — */
      '--color-background-body': [bg, night],
      '--color-background-surface': [PAPER, nightCard],
      '--color-background-card': [PAPER, nightCard],
      '--color-background-popover': [PAPER, nightPopover],
      '--color-background-muted': [bg2, 'rgba(255,255,255,.06)'],
      '--color-background-inverted': [night, PAPER],

      /* — accent : forcé identique en nuit (le générateur l'éclaircirait) — */
      '--color-accent': [primary, primary],

      /* — texte & icônes — */
      '--color-text-accent': [primary, primaryOnNight],
      '--color-icon-accent': [primary, primaryOnNight],
      '--color-on-accent': [PAPER, PAPER],
      '--color-text-primary': [INK, PAPER],
      '--color-text-secondary': [INK_2, 'rgba(255,255,255,.72)'],
      '--color-text-disabled': [INK_3, 'rgba(255,255,255,.4)'],
      '--color-icon-primary': [INK, PAPER],
      '--color-icon-secondary': [INK_2, 'rgba(255,255,255,.72)'],
      '--color-icon-disabled': [INK_3, 'rgba(255,255,255,.4)'],

      /* — hauteurs de contrôle (boutons, champs, sélecteurs) : Orbita 36 / 48 / 56 — */
      '--size-element-sm': '36px',
      '--size-element-md': '48px',
      '--size-element-lg': '56px',

      /* — filets — */
      '--color-border': [LINE, 'rgba(255,255,255,.14)'],
      '--color-border-emphasized': [LINE_2, 'rgba(255,255,255,.3)'],
      '--color-track': [LINE_2, 'rgba(255,255,255,.2)'],
      '--color-skeleton': [LINE, 'rgba(255,255,255,.12)'],

      /* — états — */
      '--color-error': [DANGER, '#F0655D'],
      '--color-error-muted': ['rgba(208,52,44,.10)', 'rgba(240,101,93,.18)'],
      '--color-success': [OK, '#3FB57F'],
      '--color-success-muted': ['rgba(31,138,91,.10)', 'rgba(63,181,127,.18)'],
      '--color-warning': [EDITORIAL, '#E0B04A'],
      '--color-warning-muted': ['rgba(199,151,46,.12)', 'rgba(224,176,74,.18)'],

      /* — voile des dialogues (::backdrop Astryx lit --color-overlay) — */
      '--color-overlay': [
        `color-mix(in srgb, ${primary} 26%, rgba(28,38,68,.4))`,
        `color-mix(in srgb, ${night} 58%, rgba(7,9,26,.6))`,
      ],

      /* — ombre & focus — */
      '--color-shadow': ['rgba(12,20,40,.07)', 'rgba(0,0,0,.4)'],
      '--shadow-low': '0 2px 6px var(--color-shadow)',
      '--shadow-med': '0 2px 6px rgba(12,20,40,.05), 0 14px 36px var(--color-shadow)',
      '--shadow-high': '0 6px 14px rgba(12,20,40,.06), 0 28px 64px var(--color-shadow)',
      '--focus-outline-color': 'var(--color-accent)',
      '--focus-outline-offset': '2px',

      /* — tokens propres à Orbita : voir orbitaOnlyTokens() — */
      ...orbitaOnlyTokens(silo),

      /* — échelle display : titres Orbita (clamp) — */
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
      /* Titres display : chasse resserrée Orbita */
      heading: {
        // titre de carte (maquette 12/19/24) : indépendant du niveau h3/h4 choisi en admin
        'type:card': {fontSize: '18px', fontWeight: 'var(--font-weight-bold)', lineHeight: '1.3', letterSpacing: '-0.015em'},
        'type:display-1': {letterSpacing: '-0.025em'},
        'type:display-2': {letterSpacing: '-0.025em'},
        'type:display-3': {letterSpacing: '-0.02em'},
      },

      /* Types de texte Orbita ajoutés à <Text type="…"> */
      text: {
        // Eyebrow : petite capitale espacée, or éditorial
        'type:eyebrow': {
          fontSize: '0.72rem',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          lineHeight: '1.4',
          color: 'var(--color-editorial)',
        },
        // Accent serif : Cormorant italique 600, couleur accent
        'type:serif': {
          fontFamily: 'var(--font-family-serif)',
          fontStyle: 'italic',
          fontWeight: '600',
          color: 'var(--color-accent)',
          // Hérite de la taille du parent : utilisable dans un titre display.
          fontSize: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: '-0.01em',
        },
        // Grand nombre de carte (card-num) : Schibsted 800, couleur silo
        'type:number': {
          fontFamily: 'var(--font-family-heading)',
          fontWeight: '800',
          fontSize: 'clamp(40px, 3.4vw, 52px)',
          lineHeight: '1',
          letterSpacing: '-0.03em',
          color: 'var(--color-text-accent)',
        },
        // Résultat chiffré des réalisations (work-result)
        'type:result': {
          fontSize: '12px',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: '0.02em',
          color: 'light-dark(var(--color-text-accent), var(--color-highlight))',
          whiteSpace: 'nowrap',
        },
        // Date d'article (post-date)
        'type:date': {fontSize: '12px', color: 'var(--color-text-disabled)', whiteSpace: 'nowrap'},
        // Étiquette mono-like (ex-Geist Mono) : Geist, espacée
        'type:tag': {
          fontSize: '0.7rem',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          lineHeight: '1.4',
        },
      },

      /* Boutons Orbita (maquette 00-fondations + orbita.css .c-btn-*)
         - primary  : fond accent, halo accent, hover accent-deep
         - ghost    : « fantôme » bordé ; sur nuit, bordure et voile blancs
         - high     : fond highlight, texte nuit (variante ajoutée, typée au build)
         - secondary/destructive : Astryx, angles vifs
         Padding horizontal fixé par taille : OrbitaButton s'en sert pour
         réserver la cellule flèche (voir src/components/OrbitaButton). */
      button: {
        base: {
          fontWeight: 'var(--font-weight-semibold)',
          position: 'relative',
          overflow: 'visible',
          // Astryx ne transitionne pas les couleurs : Orbita, si (.25s ease-in-out)
          transition: [
            'background-color var(--duration-medium) var(--ease-standard)',
            'border-color var(--duration-medium) var(--ease-standard)',
            'color var(--duration-medium) var(--ease-standard)',
            'box-shadow var(--duration-medium) var(--ease-standard)',
          ].join(', '),
        },
        // gap icône ↔ libellé = moitié du padding horizontal
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
          // texte et icône couleur silo au repos ; sur nuit, blanc (maquette .on-dark .c-btn-ghost)
          color: 'light-dark(var(--color-text-accent), #FFFFFF)',
          // survol : clair = bordure silo ; nuit = fond blanc plein, texte et icône couleur silo
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
      },

      'icon-button': {
        base: {
          transition: [
            'background-color var(--duration-medium) var(--ease-standard)',
            'border-color var(--duration-medium) var(--ease-standard)',
            'color var(--duration-medium) var(--ease-standard)',
          ].join(', '),
        },
      },

      /* Champs et sélecteurs Orbita (maquette 17-forms / .field-* et .selectx-*)
         bordure line-2, fond papier, focus = bordure accent + halo 3 px ;
         panneaux : bordure fine, ombre portée profonde, option survolée en
         accent-muted, option choisie en accent semi-gras. */
      ...Object.fromEntries(
        ['text-input', 'text-area', 'number-input', 'selector', 'multi-selector', 'typeahead', 'tokenizer', 'date-input'].map((k) => [
          k,
          {
            base: {
              borderColor: 'var(--color-border-emphasized)',
              backgroundColor: 'var(--color-background-surface)',
              transition: 'border-color var(--duration-medium) var(--ease-standard), box-shadow var(--duration-medium) var(--ease-standard)',
              // focus : accent sur clair, highlight sur nuit (maquette 17-forms .on-dark)
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
            // états : bordure et halo colorés (maquette .field.is-error / .is-success)
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

      /* ─────────────────────────────────────────────────────────────────
         ONGLETS (maquette 06-tabs) — Tab, TabList, TabMenu
         Cibles Astryx : tab-list (la barre), tab-strip (la piste), tab (un
         onglet, état selected), tab-indicator (trait sous l'onglet actif),
         tab-menu (déclencheur du menu de débordement), tab-menu-item.
         Ce que le thème ne sait pas cibler (séparateur « tous sauf le premier »,
         libellés sur deux lignes selon la largeur, panneau .orbita-tab-*)
         est dans src/app/(frontend)/styles.css, section Onglets.
         ───────────────────────────────────────────────────────────────── */
      // la barre : l'en-tête bordé du bloc (fond papier, filet tout autour)
      'tab-list': {
        base: {
          height: 'auto',
          fontFamily: 'var(--font-family-body)',
          // barre sur papier (maquette 06) ; la teinte highlight va sur le panneau de contenu
          backgroundColor: 'light-dark(var(--color-background-surface), var(--color-background-card))',
          borderWidth: 'var(--border-width)',
          borderStyle: 'solid',
          borderColor: 'light-dark(var(--color-border), rgba(255,255,255,.15))',
        },
      },
      'tab-strip': {base: {height: 'auto', gap: '0'}},
      // un onglet (et le déclencheur du menu, qui se présente comme un onglet)
      ...Object.fromEntries(
        ['tab', 'tab-menu'].map((k) => [
          k,
          {
            base: {
              height: 'auto',
              padding: '18px 22px',
              gap: '12px', // icône ↔ libellé ↔ compteur : une demi-icône
              fontSize: '15px',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: '1.3',
              textAlign: 'center',
              justifyContent: 'center',
              color: 'light-dark(var(--color-text-secondary), rgba(255,255,255,.8))',
              borderRadius: '0',
              transition: 'color var(--duration-medium) var(--ease-standard), background-color var(--duration-medium) var(--ease-standard)',
              // survol : encre + fond silo 10 %
              ':hover': {
                color: 'light-dark(var(--color-text-primary), #FFFFFF)',
                backgroundColor: 'light-dark(var(--color-accent-muted), rgba(255,255,255,.06))',
              },
            },
            // actif : couleur silo (highlight en nuit)
            selected: {color: 'light-dark(var(--color-text-accent), var(--color-highlight))'},
          },
        ]),
      ),
      // le trait sous l'onglet actif : 3 px, toute la largeur de l'onglet, en fondu
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
      // options du menu de débordement : mêmes rangées que les sélecteurs
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


      /* Contrôles d'option Orbita (maquette 17-forms .opt / .switch / .c-range) */
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
        // coché : fond accent, coche Nucleo centrée (blanche ; nuit sur highlight)
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
          borderRadius: '0', padding: '18px 20px',
          transition: 'border-color var(--duration-medium) var(--ease-standard), background-color var(--duration-medium) var(--ease-standard)',
          ':hover': {borderColor: 'var(--color-accent)', backgroundColor: 'var(--color-accent-muted)'},
        },
      },

      /* Bouton d'effacement des champs (date, texte, sélecteurs) : croix nue,
         sans cadre ni fond, couleur secondaire, silo au survol */
      'input-clear-button': {
        base: {
          borderWidth: '0',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: 'var(--color-icon-secondary)',
          padding: '0',
          minWidth: '0',
          width: '24px',
          height: '24px',
          transition: 'color var(--duration-medium) var(--ease-standard)',
          ':hover': {backgroundColor: 'transparent', color: 'var(--color-text-accent)'},
        },
      },
      'input-clear-icon': {base: {width: '16px', height: '16px'}},

      /* Chips Orbita (maquette .c-chip*) : variantes ajoutées au Badge Astryx */
      badge: {
        base: {borderRadius: '0'},
        'variant:chip': {
          height: '28px', padding: '0 11px', lineHeight: '1',
          borderWidth: 'var(--border-width)', borderStyle: 'solid', borderColor: 'var(--color-border-emphasized)',
          backgroundColor: 'var(--color-background-surface)', color: 'var(--color-text-secondary)',
          fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.03em',
        },
        'variant:chip-high': {
          height: '28px', padding: '0 11px', lineHeight: '1', borderWidth: '0',
          backgroundColor: 'color-mix(in srgb, var(--color-highlight) 18%, transparent)',
          color: 'light-dark(var(--color-highlight-deep), var(--color-highlight))',
          fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.03em',
        },
        'variant:chip-accent': {
          height: '28px', padding: '0 11px', lineHeight: '1', borderWidth: '0',
          backgroundColor: 'light-dark(var(--color-accent-muted), rgba(255,255,255,.1))',
          color: 'light-dark(var(--color-text-accent), var(--color-highlight))',
          fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.03em',
        },
        'variant:chip-cat': {
          height: '28px', padding: '0 13px', lineHeight: '1', borderWidth: '0',
          backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)',
          fontSize: '11px', fontWeight: 'var(--font-weight-medium)', letterSpacing: '0.16em', textTransform: 'uppercase',
        },
        'variant:chip-danger': {
          height: '28px', padding: '0 11px', lineHeight: '1', borderWidth: '0',
          backgroundColor: 'var(--color-error-muted)', color: 'var(--color-error)',
          fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', letterSpacing: '0.03em',
        },
      },

      card: {base: {borderRadius: '0'}},

      /* Dialogue : ombre portée Orbita, voile flouté avec halo accent */
      dialog: {
        base: {
          borderRadius: '0',
          backgroundColor: 'var(--color-background-surface)', // nuit : carte nuit, pas le popover plus clair
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
