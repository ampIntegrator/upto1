/**
 * Grid rules of the section builder, in one place and with no dependency:
 * the number of columns, the allowed column widths, the row layouts and the
 * vertical spacing scale. Every other module (Payload fields, admin builder,
 * front-end rendering, Astryx catalogue) reads these values from here.
 *
 * No visual value: only widths out of 12 and the rules that go with them.
 */

/** Number of columns of the grid: every row adds up to this. */
export const GRID_COLUMNS = 12;

/** Allowed column widths (out of GRID_COLUMNS). */
export const COLUMN_SPANS = [2, 3, 4, 5, 6, 7, 8, 9, 12] as const;
export type ColumnSpan = (typeof COLUMN_SPANS)[number];

/** Rounds a computed width up to the next allowed column width. */
export function snapUp(n: number): ColumnSpan {
  return COLUMN_SPANS.find((s) => s >= n) ?? GRID_COLUMNS;
}

/** Any stored value → an allowed width (full width when unknown). */
export const toSpan = (v: unknown): ColumnSpan => {
  const n = Number(v);
  return (COLUMN_SPANS as readonly number[]).includes(n) ? (n as ColumnSpan) : GRID_COLUMNS;
};

/** Width selector options (string values: Payload select field). */
export const SPAN_OPTIONS = COLUMN_SPANS.map((s) => ({label: `${s} / ${GRID_COLUMNS}`, value: String(s)}));

/**
 * Row layouts offered by the builder: 14, the widest column first, no mirrors
 * (columns are reordered inside the row). Widths stay free afterwards, the only
 * rule being that the row adds up to GRID_COLUMNS.
 */
export const ROW_PRESETS: readonly ColumnSpan[][] = [
  [12],
  [6, 6],
  [8, 4],
  [7, 5],
  [9, 3],
  [4, 4, 4],
  [6, 3, 3],
  [6, 4, 2],
  [3, 3, 3, 3],
  [6, 2, 2, 2],
  [4, 4, 2, 2],
  [4, 2, 2, 2, 2],
  [3, 3, 2, 2, 2],
  [2, 2, 2, 2, 2, 2],
];

/** Key of a width combination, independent of order (active layout thumbnail of a row). */
export const spansKey = (spans: readonly number[]): string => [...spans].sort((a, b) => b - a).join('|');

export const presetLabel = (spans: readonly number[]): string => spans.join(' | ');

/** Sum of a row's widths. */
export const rowTotal = (spans: readonly number[]): number => spans.reduce<number>((sum, n) => sum + n, 0);

/** True when the row adds up to GRID_COLUMNS. */
export const rowIsComplete = (spans: readonly number[]): boolean => spans.length > 0 && rowTotal(spans) === GRID_COLUMNS;

/** Space at the top and bottom of a section, in pixels (halved below 640 px). */
export const SPACING_VALUES = ['0', '20', '40', '60', '80', '100', '120', '140', '160'] as const;
export const DEFAULT_SPACING = '80';
export const SPACING_OPTIONS = SPACING_VALUES.map((v) => ({label: `${v} px`, value: v}));
