/**
 * Span registry — the single source of truth on "which content fits in which
 * column". Decided on 11 Sept. 2026:
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
 * This file is consumed by the front end (Fondations « Grille » page) and by the Payload config
 * (src/fields/sections): `validateColumn` and `validateRow` are the validations of a column's
 * width, with these messages in French in the admin. No visual values here:
 * only grid widths and rules.
 */

/** Allowed column widths (out of 12). */
export const COLUMN_SPANS = [2, 3, 4, 5, 6, 7, 8, 9, 12] as const;
export type ColumnSpan = (typeof COLUMN_SPANS)[number];

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
  | {type: 'statsBar'};

export type ContentType = ContentRef['type'];

/** Rounds a computed span up to the next allowed column width. */
function snapUp(n: number): ColumnSpan {
  return COLUMN_SPANS.find((s) => s >= n) ?? 12;
}

/** Label (admin, catalog) and minimum span of each content. */
export const CONTENT_SPECS: {[T in ContentType]: {label: string; minSpan: (c: Extract<ContentRef, {type: T}>) => ColumnSpan}} = {
  text: {label: 'Texte', minSpan: () => 2},
  image: {label: 'Image', minSpan: () => 2},
  // image with centered sentence: at least half the width
  mediaQuote: {label: 'Image avec citation', minSpan: () => 6},
  stat: {label: 'Chiffre clé', minSpan: () => 2},
  checkList: {label: 'Liste à pastilles', minSpan: () => 2},
  callout: {label: 'Encadré', minSpan: () => 3},
  card: {label: 'Carte', minSpan: () => 3},
  testimonialCard: {label: 'Carte témoignage', minSpan: () => 3},
  compareCard: {label: 'Carte comparative', minSpan: () => 4},
  // card grid: 3 page columns per inner column (2 → 6, 3 → 9, 4 → 12)
  cardGrid: {label: 'Grille de cartes', minSpan: (c) => snapUp(c.columns * 3)},
  sectionHeading: {label: 'En-tête de section', minSpan: () => 6},
  sectionNote: {label: 'Note et bouton', minSpan: () => 6},
  tabs: {label: 'Onglets', minSpan: () => 6},
  collapsibleGroup: {label: 'Dépliants (FAQ)', minSpan: () => 6},
  testimonialCarousel: {label: 'Carrousel de témoignages', minSpan: () => 8},
  // steps: 4 page columns per step (2 → 8, 3 and 4 → 12)
  processSteps: {label: 'Étapes', minSpan: (c) => snapUp(c.steps * 4)},
  // price list: single price 8; columns, 4 per tier (2 → 8, 3 and 4 → 12)
  priceList: {label: 'Liste de prix', minSpan: (c) => (c.variant === 'single' ? 8 : snapUp(c.plans * 4))},
  statsBar: {label: 'Barre de chiffres', minSpan: () => 12},
};

/** Minimum span of a content. */
export function minSpan(content: ContentRef): ColumnSpan {
  const spec = CONTENT_SPECS[content.type] as {minSpan: (c: ContentRef) => ColumnSpan};
  return spec.minSpan(content);
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
    case 'priceList':
      return content.variant === 'single' ? `${label}, prix unique` : `${label} en ${content.plans} colonnes`;
    default:
      return label;
  }
}

/** Errors of a column: each content too wide for the chosen width. */
export function validateColumn(span: ColumnSpan, contents: ContentRef[]): string[] {
  return contents.flatMap((c) => {
    const min = minSpan(c);
    return min > span ? [`« ${describeContent(c)} » a besoin d'au moins ${min} colonnes ; cette colonne en fait ${span}.`] : [];
  });
}

/** Error of a row: the widths must add up to 12. */
export function validateRow(spans: ColumnSpan[]): string | null {
  if (!spans.length) return 'Une rangée contient au moins une colonne.';
  const total = spans.reduce<number>((s, n) => s + n, 0);
  return total === 12 ? null : `Les largeurs des colonnes font ${total} ; il en faut 12.`;
}
