/**
 * Text leaves of a Lexical document, by path: the child indexes from the root (`2.0.1`). The live
 * preview types an existing text in place; it never adds or removes a node.
 */
type Node = {type?: string; text?: string; children?: Node[]};

const walk = (doc: unknown, path: string): Node | undefined => {
  let node = (doc as {root?: Node} | null | undefined)?.root;
  for (const i of path.split('.')) node = node?.children?.[Number(i)];
  return node?.type === 'text' ? node : undefined;
};

/** The text leaf at `path`, if the document has one there. */
export const leafAt = (doc: unknown, path: string): {text?: string} | undefined => walk(doc, path);

/** A copy of the document with the text of the leaf at `path` replaced; undefined when there is no such leaf. */
export function withLeafText<T>(doc: T, path: string, text: string): T | undefined {
  const copy = structuredClone(doc);
  const leaf = walk(copy, path);
  if (!leaf) return undefined;
  leaf.text = text;
  return copy;
}
