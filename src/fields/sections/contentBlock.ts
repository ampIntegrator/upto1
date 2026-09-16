import type {Block} from 'payload';

import type {ColumnSpan} from './grid';

/**
 * A content block offered in a column, as the host declares it to the section builder:
 * the Payload block itself and the minimum column width it needs. The builder only
 * knows this declaration; what the block renders on the site is the host's business.
 */
export type ContentBlock = {
  block: Block;
  /** Minimum width of the column, out of GRID_COLUMNS. */
  minSpan: ColumnSpan;
};

/** Block slug → minimum span, for the admin builder (serialisable client props). */
export const minSpanMap = (blocks: readonly ContentBlock[]): Record<string, ColumnSpan> => Object.fromEntries(blocks.map((b) => [b.block.slug, b.minSpan]));

/** A block's singular label as it can travel to a client component (functions are not serialisable). */
export const staticLabel = (block: Block): string | Record<string, string> => {
  const label = block.labels?.singular;
  return typeof label === 'function' || label === undefined ? block.slug : label;
};

/** Block slug → singular label, for client components. */
export const labelMap = (blocks: readonly ContentBlock[]): Record<string, string | Record<string, string>> => Object.fromEntries(blocks.map((b) => [b.block.slug, staticLabel(b.block)]));
