'use client';

/**
 * Callout — emphasis box (mockups 08 and 09 « Garantie 30 jours », 18 and 23
 * article callout): highlight-deep frame, highlight background at 12 %, bold 14 px title,
 * 12 px text; optional eyebrow in Geist Mono (articles). Night: frame and title in
 * highlight. Not the Astryx Banner, which is a status component with an icon.
 */
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Title, type TitleTag} from './TitleTag';
import styles from './Callout.module.css';

export type CalloutProps = {
  eyebrow?: string;
  title?: string;
  /** HTML element of the title (p by default); the look does not change */
  titleTag?: TitleTag;
  text: string;
  /** padding: `sm` (14 px, pricing tier cards) or `md` (16 px, default) */
  size?: 'sm' | 'md';
};

export function Callout({eyebrow, title, titleTag = 'p', text, size = 'md'}: CalloutProps) {
  return (
    <VStack as="aside" gap={1} className={styles.root} data-size={size}>
      {eyebrow ? <Text type="eyebrow-mono" className={styles.eyebrow}>{eyebrow}</Text> : null}
      {title ? <Title tag={titleTag} className={styles.title}>{title}</Title> : null}
      <Text className={styles.text}>{text}</Text>
    </VStack>
  );
}
