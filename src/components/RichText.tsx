/**
 * RichText — renders a Lexical document (Payload's editor) with the site's typography:
 * paragraphs, bold, italic, links on words, bulleted and numbered lists. Nothing else
 * is rendered (no heading, no image): the text box keeps its title as a separate field.
 * The node shapes are the minimal structure of Lexical's serialised state, typed here
 * so the component does not depend on Payload.
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import NextLink from 'next/link';
import React from 'react';

import styles from './RichText.module.css';

export type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  text?: string;
  /** Lexical text format bitmask: 1 bold, 2 italic */
  format?: number | string;
  tag?: string;
  listType?: 'bullet' | 'number' | 'check';
  fields?: {url?: string; newTab?: boolean; linkType?: string; doc?: {value?: {slug?: string} | number | string; relationTo?: string} | null};
  [key: string]: unknown;
};
export type RichTextDocument = {root: {children: RichTextNode[]}};

const BOLD = 1;
const ITALIC = 2;

function inline(node: RichTextNode, key: number): React.ReactNode {
  if (node.type === 'linebreak') return <br key={key} />;
  if (node.type === 'text') {
    const format = typeof node.format === 'number' ? node.format : 0;
    let out: React.ReactNode = node.text ?? '';
    if (format & BOLD) out = <strong>{out}</strong>;
    if (format & ITALIC) out = <em>{out}</em>;
    return <React.Fragment key={key}>{out}</React.Fragment>;
  }
  if (node.type === 'link' || node.type === 'autolink') {
    const f = node.fields ?? {};
    const doc = f.doc && typeof f.doc.value === 'object' && f.doc.value ? f.doc.value.slug : undefined;
    const href = f.linkType === 'internal' && doc ? `/${doc}` : (f.url ?? '#');
    const children = (node.children ?? []).map(inline);
    return f.newTab ? (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {children}
      </a>
    ) : (
      <NextLink key={key} href={href} className={styles.link}>
        {children}
      </NextLink>
    );
  }
  return <React.Fragment key={key}>{(node.children ?? []).map(inline)}</React.Fragment>;
}

function block(node: RichTextNode, key: number): React.ReactNode {
  switch (node.type) {
    case 'paragraph': {
      const children = (node.children ?? []).map(inline);
      if (!children.length) return null;
      return (
        <Text key={key} as="p" type="body" color="secondary" className={styles.paragraph}>
          {children}
        </Text>
      );
    }
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul';
      return (
        <Tag key={key} className={styles.list}>
          {(node.children ?? []).map((li, i) => (
            <li key={i} className={styles.item}>
              {(li.children ?? []).map((c, j) => (c.type === 'list' ? block(c, j) : inline(c, j)))}
            </li>
          ))}
        </Tag>
      );
    }
    default:
      return null;
  }
}

export function RichText({content, className}: {content: RichTextDocument | null | undefined; className?: string}) {
  const nodes = content?.root?.children ?? [];
  if (!nodes.length) return null;
  return (
    <VStack gap={3} className={[styles.root, className].filter(Boolean).join(' ')}>
      {nodes.map(block)}
    </VStack>
  );
}
