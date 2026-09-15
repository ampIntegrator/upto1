import {COLUMN_SPANS, type ColumnSpan} from '@/components/content-specs';

/**
 * Row presets: shortcuts that fill the columns in one go (14, the widest column
 * first; no mirrors, columns are reordered in the cell).
 * Widths stay free afterwards (each column carries its own), the only rule
 * being that the row adds up to 12. Shared by the admin button and the labels.
 */
export const ROW_PRESETS: readonly ColumnSpan[][] = [
  // a single version per width combination: the cell arrows reorder the columns
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

/** Key of a width combination, independent of order (active thumbnail of a row). */
export const spansKey = (spans: readonly number[]): string => [...spans].sort((a, b) => b - a).join('|');

export const presetLabel = (spans: readonly number[]): string => spans.join(' | ');

/** Width selector options (string values: Payload select field). */
export const SPAN_OPTIONS = COLUMN_SPANS.map((s) => ({label: `${s} / 12`, value: String(s)}));

export const toSpan = (v: unknown): ColumnSpan => {
  const n = Number(v);
  return (COLUMN_SPANS as readonly number[]).includes(n) ? (n as ColumnSpan) : 12;
};
