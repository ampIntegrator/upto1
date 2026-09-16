import {tr} from '@/i18n/admin/languages';
import {sectionsText} from '@/i18n/admin/sections';

import {type ColumnSpan, GRID_COLUMNS, rowTotal} from './grid';

/** Error of a row in an admin language: the widths must add up to GRID_COLUMNS. */
export function rowWidthError(spans: readonly ColumnSpan[], language: unknown): string | null {
  if (!spans.length) return tr(sectionsText.validation.rowEmpty, language);
  const total = rowTotal(spans);
  return total === GRID_COLUMNS ? null : tr(sectionsText.validation.rowTotal, language, {total});
}

/** Error of a content too wide for its column. */
export function tooNarrowError(block: string, min: number, span: number, language: unknown): string {
  return tr(sectionsText.validation.tooNarrow, language, {block, min, span});
}

/** Error of a content that must not spread beyond its maximum width. */
export function tooWideError(block: string, max: number, span: number, language: unknown): string {
  return tr(sectionsText.validation.tooWide, language, {block, max, span});
}
