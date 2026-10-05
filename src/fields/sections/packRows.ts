/** how many of the next tiles a row may choose from (the order stays close to the host's) */
const PACK_WINDOW = 10;

/**
 * Order that fills the rows: each row starts with the next tile in order, then takes, among the
 * PACK_WINDOW tiles that follow, the set that leaves the least room at its right (the earliest set
 * when several do as well). `first`: room already taken at the start of the first row. Returns
 * indices into `widths`.
 */
export function packRows(widths: readonly number[], room: number, gap: number, first = 0): number[] {
  const left = widths.map((_, i) => i);
  const order: number[] = [];
  let taken = first;
  while (left.length) {
    const head = taken === 0 || taken + gap + widths[left[0]] <= room ? 1 : 0;
    const start = head ? taken + (taken === 0 ? 0 : gap) + Math.min(widths[left[0]], room) : taken;
    const pool = left.slice(head, head + PACK_WINDOW);
    let best: number[] = [];
    let bestUsed = start;
    const search = (from: number, used: number, picked: number[]) => {
      if (used > bestUsed) {
        bestUsed = used;
        best = picked;
      }
      for (let k = from; k < pool.length; k += 1) {
        const next = used + gap + widths[pool[k]];
        if (next <= room) search(k + 1, next, [...picked, pool[k]]);
      }
    };
    if (start > 0) search(0, start, []);
    const row = [...(head ? [left[0]] : []), ...best];
    if (!row.length) {
      // nothing fits beside what the row holds: a new row
      taken = 0;
      continue;
    }
    order.push(...row);
    for (const i of row) left.splice(left.indexOf(i), 1);
    taken = 0;
  }
  return order;
}
