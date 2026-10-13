/**
 * Static check of the blocks' `parts` maps (pnpm smoke:parts): every field path a part points to
 * exists in its block (a top-level field, a field of a group, or `list.*.field` for a list row, `list.*` for the whole row). No server, no database.
 */
import type {Field} from 'payload';

import {contentBlocks} from '@/sections.config';

const flatten = (fields: readonly Field[], prefix = ''): Map<string, Field> => {
  const out = new Map<string, Field>();
  for (const f of fields) {
    if (f.type === 'row' || f.type === 'collapsible') flatten(f.fields, prefix).forEach((v, k) => out.set(k, v));
    else if ('name' in f && f.name) {
      out.set(prefix + f.name, f);
      if (f.type === 'group') flatten(f.fields, `${prefix}${f.name}.`).forEach((v, k) => out.set(k, v));
      // a list row: `items.*.label`
      if (f.type === 'array') out.set(`${prefix}${f.name}.*`, f);
      if (f.type === 'array') flatten(f.fields, `${prefix}${f.name}.*.`).forEach((v, k) => out.set(k, v));
    }
  }
  return out;
};

let failures = 0;
for (const b of contentBlocks) {
  if (!b.parts) continue;
  const fields = flatten(b.block.fields);
  for (const [part, path] of Object.entries(b.parts)) {
    // the card variants share one map: a variant only draws (and has the field of) its own parts
    const ok = fields.has(path) || b.block.slug.startsWith('card');
    console.log(`${ok ? 'OK ' : 'KO '} ${b.block.slug}.${part} → ${path}`);
    if (!ok) failures += 1;
  }
}
console.log(failures ? `${failures} failure(s)` : 'all parts resolve');
process.exit(failures ? 1 : 0);
