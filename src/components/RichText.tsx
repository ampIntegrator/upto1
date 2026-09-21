/**
 * RichText — renders a Lexical document (Payload's editor) with the site's typography.
 *
 *   inline : text (bold, italic), line breaks, links (custom URL or internal document);
 *   blocks : paragraphs, headings h2–h6 (with anchors for a table of contents), bulleted and
 *            numbered lists (diamond bullets, two-digit numbers in a silo square), quote
 *            (a last line starting with « — » becomes the attribution), image with caption
 *            (upload node), editorial table, horizontal rule, and inserted blocks.
 *
 * `size`: « body » (text box, tabs: the body text size, 12 px rhythm) or « prose » (a post:
 * larger text and headings, editorial spacing). Inserted blocks (Lexical BlocksFeature) are
 * rendered by the host through `renderBlock`: RichText knows no site component. Internal
 * links are resolved by the host through `resolveLink` (for instance a post under the blog
 * page); by default « /<slug> ».
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import {headingAnchors, plainText, type RichTextDocument, type RichTextNode} from './rich-text';
import styles from './RichText.module.css';

export type {RichTextDocument, RichTextHeading, RichTextNode} from './rich-text';
export {richTextHeadings} from './rich-text';

export type RichTextProps = {
  content: RichTextDocument | null | undefined;
  size?: 'body' | 'prose';
  /** an inserted block (node.type « block », fields.blockType…) → its rendering */
  renderBlock?: (node: RichTextNode, key: number) => React.ReactNode;
  /** an internal link → its URL (relationTo « pages », « posts »…); undefined keeps the default */
  resolveLink?: (link: {relationTo?: string; value: unknown}) => string | undefined;
  className?: string;
};

type Ctx = Omit<RichTextProps, 'content' | 'className'> & {anchors: Map<RichTextNode, string>};

const BOLD = 1;
const ITALIC = 2;

type Media = {url?: string | null; alt?: string | null; width?: number | null; height?: number | null; mimeType?: string | null; filename?: string | null};

function linkHref(node: RichTextNode, ctx: Ctx): string {
  const f = node.fields ?? {};
  if (f.linkType === 'internal' && f.doc) {
    const resolved = ctx.resolveLink?.({relationTo: f.doc.relationTo, value: f.doc.value});
    if (resolved) return resolved;
    // a page without a resolver: its stored full address, else its slug (the site redirects it)
    const doc = typeof f.doc.value === 'object' && f.doc.value ? (f.doc.value as {slug?: string; path?: string}) : undefined;
    if (doc?.path) return doc.path;
    if (doc?.slug) return `/${doc.slug}`;
  }
  return f.url ?? '#';
}

function inline(node: RichTextNode, key: number, ctx: Ctx): React.ReactNode {
  if (node.type === 'linebreak') return <br key={key} />;
  if (node.type === 'text') {
    const format = typeof node.format === 'number' ? node.format : 0;
    let out: React.ReactNode = node.text ?? '';
    if (format & BOLD) out = <strong>{out}</strong>;
    if (format & ITALIC) out = <em>{out}</em>;
    return <React.Fragment key={key}>{out}</React.Fragment>;
  }
  if (node.type === 'link' || node.type === 'autolink') {
    const href = linkHref(node, ctx);
    const children = (node.children ?? []).map((c, i) => inline(c, i, ctx));
    return node.fields?.newTab ? (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {children}
      </a>
    ) : (
      <NextLink key={key} href={href} className={styles.link}>
        {children}
      </NextLink>
    );
  }
  return <React.Fragment key={key}>{(node.children ?? []).map((c, i) => inline(c, i, ctx))}</React.Fragment>;
}

function list(node: RichTextNode, key: number, ctx: Ctx): React.ReactNode {
  const Tag = node.listType === 'number' ? 'ol' : 'ul';
  return (
    <Tag key={key} className={styles.list} data-type={Tag}>
      {(node.children ?? []).map((li, i) => (
        <li key={i} className={styles.item}>
          {(li.children ?? []).map((c, j) => (c.type === 'list' ? list(c, j, ctx) : inline(c, j, ctx)))}
        </li>
      ))}
    </Tag>
  );
}

/** a quote whose last line starts with « — » (or « - ») shows it as the attribution */
function quote(node: RichTextNode, key: number, ctx: Ctx): React.ReactNode {
  const children = node.children ?? [];
  const lastBreak = children.map((c) => c.type).lastIndexOf('linebreak');
  const tail = lastBreak >= 0 ? plainText({type: 'root', children: children.slice(lastBreak + 1)}).trim() : '';
  const hasCite = /^[—–-]\s*\S/.test(tail);
  const body = hasCite ? children.slice(0, lastBreak) : children;
  return (
    <blockquote key={key} className={styles.quote}>
      <p>{body.map((c, i) => inline(c, i, ctx))}</p>
      {hasCite ? <cite>{tail.replace(/^[—–-]\s*/, '')}</cite> : null}
    </blockquote>
  );
}

function upload(node: RichTextNode, key: number): React.ReactNode {
  const doc = (typeof node.value === 'object' && node.value ? node.value : null) as Media | null;
  if (!doc?.url) return null;
  const caption = typeof node.fields?.caption === 'string' ? node.fields.caption : '';
  const alt = (typeof node.fields?.alt === 'string' && node.fields.alt) || doc.alt || '';
  if (doc.mimeType && !doc.mimeType.startsWith('image')) {
    return (
      <p key={key} className={styles.file}>
        <a href={doc.url} className={styles.link}>
          {doc.filename ?? doc.url}
        </a>
      </p>
    );
  }
  return (
    <figure key={key} className={styles.figure}>
      {doc.width && doc.height ? (
        <Image src={doc.url} alt={alt} width={doc.width} height={doc.height} sizes="(max-width: 767px) 100vw, 760px" className={styles.image} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- no intrinsic size known
        <img src={doc.url} alt={alt} className={styles.image} loading="lazy" />
      )}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

function table(node: RichTextNode, key: number, ctx: Ctx): React.ReactNode {
  const rows = node.children ?? [];
  // the first row is a header when all its cells are row headers
  const headed = rows.length > 1 && (rows[0].children ?? []).every((c) => Number(c.headerState ?? 0) & 1);
  const cells = (row: RichTextNode, inHead: boolean) =>
    (row.children ?? []).map((cell, j) => {
      const Tag = inHead || Number(cell.headerState ?? 0) > 0 ? 'th' : 'td';
      return (
        <Tag key={j} colSpan={cell.colSpan && cell.colSpan > 1 ? cell.colSpan : undefined} rowSpan={cell.rowSpan && cell.rowSpan > 1 ? cell.rowSpan : undefined} scope={inHead ? 'col' : undefined}>
          {(cell.children ?? []).map((p, k) => (
            <React.Fragment key={k}>{(p.children ?? []).map((c, i) => inline(c, i, ctx))}</React.Fragment>
          ))}
        </Tag>
      );
    });
  return (
    <div key={key} className={styles.tableWrap} role="region" aria-label="Tableau" tabIndex={0}>
      <table className={styles.table}>
        {headed ? (
          <thead>
            <tr>{cells(rows[0], true)}</tr>
          </thead>
        ) : null}
        <tbody>
          {(headed ? rows.slice(1) : rows).map((row, i) => (
            <tr key={i}>{cells(row, false)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function block(node: RichTextNode, key: number, ctx: Ctx): React.ReactNode {
  switch (node.type) {
    case 'paragraph': {
      const children = (node.children ?? []).map((c, i) => inline(c, i, ctx));
      if (!children.length) return null;
      return (
        <Text key={key} as="p" type="body" color="secondary" className={styles.paragraph}>
          {children}
        </Text>
      );
    }
    case 'heading': {
      const tag = ['h2', 'h3', 'h4', 'h5', 'h6'].includes(String(node.tag)) ? (String(node.tag) as 'h2') : 'h2';
      return React.createElement(tag, {key, id: ctx.anchors.get(node), className: styles.heading, 'data-level': tag}, (node.children ?? []).map((c, i) => inline(c, i, ctx)));
    }
    case 'list':
      return list(node, key, ctx);
    case 'quote':
      return quote(node, key, ctx);
    case 'upload':
      return upload(node, key);
    case 'table':
      return table(node, key, ctx);
    case 'horizontalrule':
      return <hr key={key} className={styles.rule} />;
    case 'block':
      return ctx.renderBlock ? <React.Fragment key={key}>{ctx.renderBlock(node, key)}</React.Fragment> : null;
    default:
      return null;
  }
}

export function RichText({content, size = 'body', renderBlock, resolveLink, className}: RichTextProps) {
  const nodes = content?.root?.children ?? [];
  if (!nodes.length) return null;
  const ctx: Ctx = {size, renderBlock, resolveLink, anchors: headingAnchors(content)};
  return (
    <VStack gap={size === 'prose' ? 0 : 3} className={[styles.root, className].filter(Boolean).join(' ')} data-size={size}>
      {nodes.map((n, i) => block(n, i, ctx))}
    </VStack>
  );
}
