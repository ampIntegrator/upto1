import type {Block} from 'payload';

import {type ColumnSpan, GRID_COLUMNS, toSpan} from './grid';

/**
 * A content block offered in a column, as the host declares it to the section builder:
 * the Payload block itself and the minimum column width it needs. The builder only
 * knows this declaration; what the block renders on the site is the host's business.
 */
export type ContentBlock = {
  block: Block;
  /** Minimum width of the column, out of GRID_COLUMNS. */
  minSpan: ColumnSpan;
  /** Maximum width of the column (full width when omitted): for contents that must not spread out. */
  maxSpan?: ColumnSpan;
  /** The column stretches to its row's height and the content fills it (cards side by side). */
  fill?: boolean;
  /**
   * Kept in the schema (no migration drops its tables, the site still renders it) but neither
   * offered by the picker nor accepted on save. Replace its existing uses before hiding a block:
   * a document still holding it can no longer be saved.
   */
  hidden?: boolean;
  /**
   * Values the block starts with when it is placed from the builder's library (placeholder texts,
   * so that it shows at once in the preview), keyed by field path inside the block: `title`,
   * `cta.label` for a field of a group. Scalars and rich text documents; no array rows.
   */
  sample?: Record<string, unknown>;
  /**
   * Parts of the host's component that the builder's preview edits in place → the block's field
   * each one shows (`{title: 'title', action: 'cta.label'}`). The component marks its parts with
   * `data-part` (its own vocabulary: it knows nothing of the block); this map is the link.
   */
  parts?: Record<string, string>;
  /**
   * The block's picker image (`block.imageURL`) is landscape, twice as wide as a standard one for
   * the same height: the builder's library gives it a wide thumbnail.
   */
  previewWide?: boolean;
};

/** Block slug → minimum span, for the admin builder (serialisable client props). */
export const minSpanMap = (blocks: readonly ContentBlock[]): Record<string, ColumnSpan> => Object.fromEntries(blocks.map((b) => [b.block.slug, b.minSpan]));

/** Block slug → maximum span (GRID_COLUMNS when none). */
export const maxSpanMap = (blocks: readonly ContentBlock[]): Record<string, ColumnSpan> => Object.fromEntries(blocks.map((b) => [b.block.slug, b.maxSpan ?? GRID_COLUMNS]));

/**
 * Width of the column that holds a block's field, from a field validation:
 * `path` is the field's path ([…, 'columns', j, 'contents', k, …]) and `data` the document.
 * Lets a block check its own settings against its column (a steps panel and its capacity).
 */
export function columnSpanAt(data: unknown, path: readonly (number | string)[]): ColumnSpan {
  const at = path.lastIndexOf('contents');
  if (at < 0) return GRID_COLUMNS;
  const column = path.slice(0, at).reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[String(k)] : undefined), data);
  return toSpan((column as {span?: unknown} | undefined)?.span);
}

/** A block's singular label as it can travel to a client component (functions are not serialisable). */
export const staticLabel = (block: Block): string | Record<string, string> => {
  const label = block.labels?.singular;
  return typeof label === 'function' || label === undefined ? block.slug : label;
};

/** Block slug → singular label, for client components. */
export const labelMap = (blocks: readonly ContentBlock[]): Record<string, string | Record<string, string>> => Object.fromEntries(blocks.map((b) => [b.block.slug, staticLabel(b.block)]));

/** Block slug → starting values, for the admin builder (serialisable client props). */
export const sampleMap = (blocks: readonly ContentBlock[]): Record<string, Record<string, unknown>> => Object.fromEntries(blocks.filter((b) => b.sample).map((b) => [b.block.slug, b.sample as Record<string, unknown>]));

/** Slugs of the blocks whose picker image is wide, for the admin builder (serialisable client props). */
export const wideImageList = (blocks: readonly ContentBlock[]): string[] => blocks.filter((b) => b.previewWide).map((b) => b.block.slug);

/** Block slug → part → field path, for the admin builder (serialisable client props). */
export const partsMap = (blocks: readonly ContentBlock[]): Record<string, Record<string, string>> => Object.fromEntries(blocks.filter((b) => b.parts).map((b) => [b.block.slug, b.parts as Record<string, string>]));
