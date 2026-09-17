/**
 * rich-text — the serialised Lexical document as the site reads it, and the helpers that
 * must agree between rendering and the server: heading anchors (the post's table of
 * contents links to the ids RichText renders) and plain text. No React, no CSS: importable
 * from Payload config, scripts and server code. The shapes are the minimal structure of
 * Lexical's serialised state, typed here so the site does not depend on Payload's types.
 */
export type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  text?: string;
  /** Lexical text format bitmask: 1 bold, 2 italic */
  format?: number | string;
  /** heading: h2…h6 */
  tag?: string;
  listType?: 'bullet' | 'number' | 'check';
  /** link fields, upload extra fields (caption), block fields (blockType…) */
  fields?: Record<string, unknown> & {
    url?: string;
    newTab?: boolean;
    linkType?: string;
    doc?: {value?: {slug?: string} | number | string; relationTo?: string} | null;
  };
  /** upload: the related document (populated) and its collection */
  value?: unknown;
  relationTo?: string;
  /** table cell: 0 none, 1 row header, 2 column header, 3 both */
  headerState?: number;
  colSpan?: number;
  rowSpan?: number;
  [key: string]: unknown;
};
export type RichTextDocument = {root: {children: RichTextNode[]}};

/** A heading of the document, with the anchor RichText gives it. */
export type RichTextHeading = {id: string; text: string; level: 2 | 3 | 4};

/** The text of a node and its descendants. */
export function plainText(node: RichTextNode | null | undefined): string {
  if (!node) return '';
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'linebreak') return ' ';
  return (node.children ?? []).map(plainText).join('');
}

/** « Là où le temps se perd » → « la-ou-le-temps-se-perd » */
export function slugify(text: string): string {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'section'
  );
}

const levelOf = (tag: unknown): 2 | 3 | 4 | null => {
  const n = Number(String(tag ?? '').replace('h', ''));
  return n === 2 || n === 3 || n === 4 ? n : null;
};

/**
 * The anchors of every heading of the document, in order: the same map is used by RichText
 * (ids on h2–h6) and by the table of contents (h2–h4), so both always agree.
 */
export function headingAnchors(doc: RichTextDocument | null | undefined): Map<RichTextNode, string> {
  const anchors = new Map<RichTextNode, string>();
  const used = new Map<string, number>();
  for (const node of doc?.root?.children ?? []) {
    if (node.type !== 'heading') continue;
    const base = slugify(plainText(node));
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    anchors.set(node, n === 1 ? base : `${base}-${n}`);
  }
  return anchors;
}

/** The h2, h3 and h4 of the document, for a table of contents. */
export function richTextHeadings(doc: RichTextDocument | null | undefined): RichTextHeading[] {
  const anchors = headingAnchors(doc);
  const out: RichTextHeading[] = [];
  for (const [node, id] of anchors) {
    const level = levelOf(node.tag);
    const text = plainText(node).trim();
    if (level && text) out.push({id, text, level});
  }
  return out;
}
