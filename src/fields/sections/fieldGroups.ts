import type {ClientField} from 'payload';

/**
 * Fields cut at each group heading: one list per group, as long as the whole list, the other
 * groups' fields left out (null). Payload's RenderFields skips the holes and keeps each field's
 * position, so every field has the path Payload gave it. `starts`: tells a group heading.
 */
export function byGroup(fields: ClientField[], starts: (f: ClientField) => boolean): ClientField[][] {
  const out: ClientField[][] = [];
  fields.forEach((f, i) => {
    if (starts(f) || out.length === 0) out.push(fields.map(() => null as unknown as ClientField));
    out[out.length - 1][i] = f;
  });
  return out;
}

/** The list with every field left out but those `keep` accepts (same positions, same paths). */
export const only = (fields: ClientField[], keep: (f: ClientField) => boolean): ClientField[] => fields.map((f) => (keep(f) ? f : (null as unknown as ClientField)));
