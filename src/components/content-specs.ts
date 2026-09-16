/**
 * Span registry of the Astryx catalogue: which content needs how many page columns.
 * Decided on 11 Sept. 2026:
 *
 *   - A page = Sections; a Section = rows; a row = columns whose
 *     widths (out of 12) add up to 12; a column = contents stacked vertically.
 *   - A single level of columns, never nested. Anything that must subdivide is a
 *     content that carries its own grid (card grid, price list in columns,
 *     steps, carousel…).
 *   - Each content declares its minimum span in page columns here; it may
 *     depend on its settings (a card grid with 3 inner columns requires 9).
 *   - Below 768 px, all columns go full width, in the section's mobile
 *     order, empty columns hidden (styles.css, .page-grid; fields/sections/mobileOrder.ts).
 *
 * The grid itself (number of columns, allowed widths, row layouts) belongs to the
 * section builder: src/fields/sections/grid.ts. This file only maps the catalogue's
 * components to a minimum width, for the Fondations « Grille » page and for the
 * Payload blocks of the site (src/fields/blocks), which declare their minimum span
 * from here. No visual values: only grid widths.
 */

import {type ColumnSpan, snapUp} from '@/fields/sections/grid';

export type {ColumnSpan};

/** A content placed in a column, with only the settings that change its span. */
export type ContentRef =
  | {type: 'text'}
  | {type: 'image'}
  | {type: 'mediaQuote'}
  | {type: 'stat'}
  | {type: 'checkList'}
  | {type: 'callout'}
  | {type: 'card'}
  | {type: 'testimonialCard'}
  | {type: 'compareCard'}
  | {type: 'cardGrid'; columns: 2 | 3 | 4}
  | {type: 'sectionHeading'}
  | {type: 'sectionNote'}
  | {type: 'tabs'}
  | {type: 'collapsibleGroup'}
  | {type: 'testimonialCarousel'}
  | {type: 'processSteps'; steps: number}
  | {type: 'priceList'; variant: 'single'}
  | {type: 'priceList'; variant: 'columns'; plans: number}
  | {type: 'plan'}
  | {type: 'collection'; perView: 2 | 3 | 4}
  | {type: 'statsBar'};

export type ContentType = ContentRef['type'];

/**
 * Steps panel: how many steps a column can hold, by width (decided 16 Sept. 2026):
 * 4 and 5 columns → 1 step, 6 and 7 → 2, 8 and 9 → 3, 12 → 4; narrower than 4 → none.
 */
export const STEPS_MIN_SPAN: Record<1 | 2 | 3 | 4, ColumnSpan> = {1: 4, 2: 6, 3: 8, 4: 12};
export function stepsCapacity(span: number): 0 | 1 | 2 | 3 | 4 {
  if (span >= 12) return 4;
  if (span >= 8) return 3;
  if (span >= 6) return 2;
  if (span >= 4) return 1;
  return 0;
}
/**
 * Collection (identical items side by side): 3 items at most on 8 or 9 columns, 4 on 12;
 * not offered below 8 (decided 16 Sept. 2026).
 */
export function collectionCapacity(span: number): 0 | 3 | 4 {
  if (span >= 12) return 4;
  if (span >= 8) return 3;
  return 0;
}

const stepsMinSpan = (steps: number): ColumnSpan => STEPS_MIN_SPAN[Math.min(Math.max(Math.round(steps), 1), 4) as 1 | 2 | 3 | 4];

/**
 * Label (admin, catalog), minimum span and, for contents that must not spread out,
 * maximum span of each content (widths decided on 16 Sept. 2026).
 */
export const CONTENT_SPECS: {[T in ContentType]: {label: string; minSpan: (c: Extract<ContentRef, {type: T}>) => ColumnSpan; maxSpan?: ColumnSpan}} = {
  text: {label: 'Texte', minSpan: () => 2},
  image: {label: 'Image', minSpan: () => 2},
  // image with centered sentence: at least half the width
  mediaQuote: {label: 'Image avec citation', minSpan: () => 6},
  stat: {label: 'Chiffre clé', minSpan: () => 2},
  checkList: {label: 'Liste à pastilles', minSpan: () => 2},
  callout: {label: 'Encadré', minSpan: () => 3},
  card: {label: 'Carte', minSpan: () => 3},
  // one testimonial per column, three or four side by side
  testimonialCard: {label: 'Carte témoignage', minSpan: () => 3, maxSpan: 4},
  // two cards before / after on 6, three trades on 4
  compareCard: {label: 'Carte comparative', minSpan: () => 3, maxSpan: 6},
  // card grid: 3 page columns per inner column (2 → 6, 3 → 9, 4 → 12)
  cardGrid: {label: 'Grille de cartes', minSpan: (c) => snapUp(c.columns * 3)},
  sectionHeading: {label: 'En-tête de section', minSpan: () => 6},
  sectionNote: {label: 'Note et bouton', minSpan: () => 6},
  tabs: {label: 'Onglets', minSpan: () => 6},
  // FAQ: readable between 6 and 9, never full width
  collapsibleGroup: {label: 'Dépliants (FAQ)', minSpan: () => 6, maxSpan: 9},
  testimonialCarousel: {label: 'Carrousel de témoignages', minSpan: () => 8},
  // steps panel: capacity table (STEPS_MIN_SPAN), the panel adapts to its column
  processSteps: {label: 'Étapes', minSpan: (c) => stepsMinSpan(c.steps)},
  // price list: single price between 6 and 9; « columns » variant (catalogue only), 4 per tier
  priceList: {label: 'Liste de prix', minSpan: (c) => (c.variant === 'single' ? 6 : snapUp(c.plans * 4)), maxSpan: 9},
  // one tier per column, three or four side by side
  plan: {label: 'Palier de prix', minSpan: () => 3, maxSpan: 4},
  // identical items side by side, swipe or carousel: from 8 columns, 4 per view needs 12
  collection: {label: 'Collection', minSpan: (c) => (c.perView >= 4 ? 12 : 8)},
  statsBar: {label: 'Barre de chiffres', minSpan: () => 12},
};

/** Minimum span of a content. */
export function minSpan(content: ContentRef): ColumnSpan {
  const spec = CONTENT_SPECS[content.type] as {minSpan: (c: ContentRef) => ColumnSpan};
  return spec.minSpan(content);
}

/** Maximum span of a content (full width when it has none). */
export function maxSpan(content: ContentRef): ColumnSpan {
  return CONTENT_SPECS[content.type].maxSpan ?? 12;
}

/** Minimum span of a column: that of its widest content. */
export function columnMinSpan(contents: ContentRef[]): ColumnSpan {
  return contents.reduce<ColumnSpan>((m, c) => Math.max(m, minSpan(c)) as ColumnSpan, 2);
}

/** Readable label of a content, with its determining setting. */
export function describeContent(content: ContentRef): string {
  const label = CONTENT_SPECS[content.type].label;
  switch (content.type) {
    case 'cardGrid':
      return `${label} à ${content.columns} colonnes`;
    case 'processSteps':
      return `${label} (${content.steps})`;
    case 'collection':
      return `${label}, ${content.perView} visibles`;
    case 'priceList':
      return content.variant === 'single' ? `${label}, prix unique` : `${label} en ${content.plans} colonnes (catalogue)`;
    default:
      return label;
  }
}

