'use client';

/**
 * PostToc — the post's table of contents (mockup 18 .toc): an eyebrow « Sommaire » with a gold
 * rule, then the Astryx Outline (h2–h4 of the prose, built-in scroll-spy, sliding indicator,
 * dressed by the theme). Sticky 30 px under the collapsed header on wide screens; below
 * 1024 px, a collapsible « Sommaire » above the prose.
 */
import {Outline} from '@astryxdesign/core/Outline';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useEffect, useState} from 'react';

import type {RichTextHeading} from './rich-text';
import styles from './PostToc.module.css';

export type PostTocProps = {items: RichTextHeading[]; label?: string};

/** collapsed header (60 px, styles.css --site-header-bar-scrolled) + 30 px */
const OFFSET = 90;

export function PostToc({items, label = 'Sommaire'}: PostTocProps) {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setWide(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  if (!items.length) return null;
  const outline = <Outline items={items.map((h) => ({id: h.id, label: h.text, level: h.level}))} label={label} offset={OFFSET} />;
  if (!wide) {
    return (
      <details className={styles.details}>
        <summary className={styles.summary}>
          <Text type="eyebrow-mono" className={styles.eyebrowText}>{label}</Text>
        </summary>
        <VStack className={styles.body}>{outline}</VStack>
      </details>
    );
  }
  return (
    <VStack gap={4} className={styles.sticky}>
      <HStack gap={3} vAlign="center" className={styles.eyebrow}>
        <Text type="eyebrow-mono" className={styles.eyebrowText}>{label}</Text>
      </HStack>
      {outline}
    </VStack>
  );
}
