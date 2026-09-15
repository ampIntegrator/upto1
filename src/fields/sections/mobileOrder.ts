/**
 * Mobile order of a section's columns, across all rows (below 768 px, full-width
 * columns). The functions receive the flat list of the section's columns,
 * row by row.
 * Shared by the admin builder and the front-end rendering, so they compute the same order.
 *
 *   - each column carries a hidden `mobileOrder` field (position, or empty);
 *   - empty columns are hidden on mobile: they have no position;
 *   - `mobileOrder` is a position within the section; with no position at all, the mobile order
 *     is the desktop order;
 *   - a column without a position (added later) comes after those that have one.
 */
export type MobileColumn = {mobileOrder?: number | null; empty: boolean};

const hasPosition = (v: number | null | undefined): v is number => typeof v === 'number' && Number.isFinite(v);

/** Desktop indexes of non-empty columns, in mobile order. */
export function mobileSequence(columns: readonly MobileColumn[]): number[] {
  return columns
    .map((c, index) => ({index, empty: c.empty, pos: hasPosition(c.mobileOrder) ? c.mobileOrder : Number.POSITIVE_INFINITY}))
    .filter((c) => !c.empty)
    .sort((a, b) => a.pos - b.pos || a.index - b.index)
    .map((c) => c.index);
}

/** True if at least one column has a saved mobile position. */
export function hasMobileOrder(columns: readonly MobileColumn[]): boolean {
  return columns.some((c) => !c.empty && hasPosition(c.mobileOrder));
}

/** Mobile rank of each column (desktop index → rank), null for an empty column. */
export function mobileRanks(columns: readonly MobileColumn[]): (number | null)[] {
  const ranks: (number | null)[] = columns.map(() => null);
  mobileSequence(columns).forEach((index, rank) => {
    ranks[index] = rank;
  });
  return ranks;
}
