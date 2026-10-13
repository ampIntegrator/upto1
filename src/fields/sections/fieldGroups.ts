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

type Container = ClientField & {fields?: ClientField[]};
const named = (fields: ClientField[]): ClientField[] => fields.flatMap((f) => ('name' in f && f.name ? [f] : (f as Container).fields ? named((f as Container).fields as ClientField[]) : []));

/**
 * A field of a block by its path (`cta`, `buttons.1.iconKey`; row numbers are skipped): the field,
 * the list of fields it sits in, and the schema names of the lists above it (`['buttons']`).
 * A path that ends with a row number (`buttons.1`) is a whole row: `row` is set, `field` is the list
 * and `scope` the fields of its rows (all shown), `schema` ends with the list's name.
 */
export function fieldAt(fields: ClientField[], path: string): {field: ClientField; scope: ClientField[]; schema: string[]; row?: boolean} | undefined {
  if (/\.\d+$/.test(path)) {
    const list = fieldAt(fields, path.replace(/\.\d+$/, ''));
    const inner = (list?.field as Container | undefined)?.fields;
    return list && inner && list.field.type === 'array' ? {field: list.field, scope: inner, schema: [...list.schema, (list.field as {name: string}).name], row: true} : undefined;
  }
  const names = path.split('.').filter((s) => !/^\d+$/.test(s));
  const schema: string[] = [];
  let scope = fields;
  for (const [i, name] of names.entries()) {
    const field = named(scope).find((f) => 'name' in f && f.name === name);
    if (!field) return undefined;
    if (i === names.length - 1) return {field, scope, schema};
    const inner = (field as Container).fields;
    if (!inner) return undefined;
    schema.push(name);
    scope = inner;
  }
  return undefined;
}

/** `scope` with every field left out but `target` (rows and collapsibles are kept around it): same positions, same paths. */
export function onlyDeep(scope: ClientField[], target: ClientField): ClientField[] {
  const holds = (f: ClientField): boolean => f === target || Boolean(!('name' in f && f.name) && (f as Container).fields?.some(holds));
  return scope.map((f) => (f === target ? f : !('name' in f && f.name) && holds(f) ? ({...f, fields: onlyDeep((f as Container).fields as ClientField[], target)} as ClientField) : (null as unknown as ClientField)));
}
