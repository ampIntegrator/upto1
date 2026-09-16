'use client';

/**
 * SectionHeading — the section header (mockup 15-sectionHeading): eyebrow with
 * gold dashes, display title with serif accent (TitleText format: line breaks
 * and <span>), lead, call to action. Centered on 820 px by default; `align="start"`
 * for a left-aligned header. Night: inherits the Section's <Theme mode="dark">.
 * The future Payload block « En-tête de section » fills these fields, and the steps,
 * comparison and testimonials blocks embed it at the top. (The outlined word behind the title of
 * mockup 07 was removed: mockup point amended on 11 Sept. 2026.)
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import type {NucleoIconKey} from '@/theme/icons/nucleo';
import {Button} from './Button';
import {renderTitle, type TitleText} from './TitleText';
import {Title, type TitleTag} from './TitleTag';
import styles from './SectionHeading.module.css';

export type SectionHeadingProps = {
  eyebrow?: string;
  title: TitleText;
  /** HTML element (h2 by default; h1 for a page without a page header; p or span possible); the look comes from `size` */
  tag?: TitleTag;
  /** @deprecated use `tag` */
  level?: 1 | 2 | 3;
  /** title size: display-2 (64 px max, default) or display-3 */
  size?: 'display-2' | 'display-3';
  text?: string;
  cta?: {label: string; href: string; iconKey?: NucleoIconKey};
  align?: 'center' | 'start';
};

export function SectionHeading({eyebrow, title, tag, level, size = 'display-2', text, cta, align = 'center'}: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <VStack gap={6} align={center ? 'center' : 'start'} className={styles.root} data-align={align}>
      {eyebrow ? <Text type="eyebrow-lines">{eyebrow}</Text> : null}
      <Title tag={tag ?? (level ? (`h${level}` as TitleTag) : 'h2')} type={size} className={styles.title}>
        {renderTitle(title)}
      </Title>
      {text ? <Text type="large" color="secondary" className={styles.text}>{text}</Text> : null}
      {cta ? (
        <HStack paddingBlockStart={4}>
          <Button variant="primary" size="lg" arrow label={cta.label} href={cta.href} iconKey={cta.iconKey} />
        </HStack>
      ) : null}
    </VStack>
  );
}
