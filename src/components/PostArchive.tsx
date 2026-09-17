/**
 * PostArchive — the list of posts of the blog page and of the category archives: category
 * filter chips (links), the article cards in four columns (two below 1024 px, one below
 * 640 px) with the site's gaps, and the pagination (the carousel controls as links).
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import NextLink from 'next/link';
import React from 'react';

import {CarouselControls} from './CarouselControls';
import {Card, type CardProps} from './Card';
import {Chip} from './Chip';
import {Container} from './Container';
import {Section} from './Section';
import styles from './PostArchive.module.css';

export type PostArchiveProps = {
  categories?: {label: string; href: string; active?: boolean}[];
  items: CardProps[];
  /** current page (from 0) and page count */
  page: number;
  pages: number;
  hrefFor: (page: number) => string;
  /** column and row gaps in px (site settings) */
  gaps?: {x: number; y: number; yMobile: number};
  empty?: string;
};

export function PostArchive({categories = [], items, page, pages, hrefFor, gaps = {x: 30, y: 40, yMobile: 40}, empty = 'Aucun article pour le moment.'}: PostArchiveProps) {
  return (
    <Section background="light" spacingTop={40} spacingBottom={96}>
      <Container gap={10}>
        {categories.length ? (
          <HStack as="nav" gap={2} wrap="wrap" aria-label="Catégories">
            {categories.map((c) => (
              <NextLink key={c.label} href={c.href} className={styles.chip} aria-current={c.active ? 'page' : undefined}>
                <Chip label={c.label} tone={c.active ? 'cat' : 'line'} />
              </NextLink>
            ))}
          </HStack>
        ) : null}
        {items.length ? (
          <VStack as="ul" className={styles.grid} style={{'--archive-gap-x': `${gaps.x}px`, '--archive-gap-y': `${gaps.y}px`, '--archive-gap-y-mobile': `${gaps.yMobile}px`} as React.CSSProperties}>
            {items.map((card, i) => (
              <VStack as="li" key={i} className={styles.cell}>
                <Card {...card} preset="article" />
              </VStack>
            ))}
          </VStack>
        ) : (
          <VStack className={styles.empty}>{empty}</VStack>
        )}
        <CarouselControls page={page} pages={pages} hrefs={Array.from({length: pages}, (_, p) => hrefFor(p))} />
      </Container>
    </Section>
  );
}
