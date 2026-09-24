/**
 * PostHeader — the top of a post (mockup 18): category chip, title (display, serif accent with
 * <span>…</span>), lead, then the meta line: author (square Astryx Avatar, name, role), a
 * divider and the publication date; below, the featured image at 16:7 with its caption laid over
 * its bottom right corner (CoverCaption, white or black text).
 * Placed under the page's breadcrumb band; the page reserves the fixed header's height.
 */
import {Avatar} from '@astryxdesign/core/Avatar';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import {Chip} from './Chip';
import {Container} from './Container';
import {Section} from './Section';
import {renderTitle, type TitleText} from './TitleText';
import {CoverCaption, type CoverCaptionTone} from './CoverCaption';
import styles from './PostHeader.module.css';

export type PostAuthor = {name: string; role?: string; photo?: {src: string; alt?: string}};

export type PostHeaderProps = {
  category?: {label: string; href?: string};
  title: TitleText;
  lead?: string;
  author?: PostAuthor;
  /** formatted date (« 2 juin 2026 ») and its machine value */
  date?: {label: string; iso: string};
  dateLabel?: string;
  cover?: {src: string; alt?: string; width?: number; height?: number};
  coverCaption?: string;
  /** colour of the caption over the image: light (white, default) or dark (black) */
  coverCaptionTone?: CoverCaptionTone;
};

export function PostHeader({category, title, lead, author, date, dateLabel = 'Publié le', cover, coverCaption, coverCaptionTone}: PostHeaderProps) {
  return (
    <Section background="light" spacingTop={48} spacingBottom={0}>
      <Container>
        <VStack gap={6} className={styles.head}>
          {category ? (
            <HStack gap={2}>
              {category.href ? (
                <NextLink href={category.href} className={styles.chipLink}>
                  <Chip label={category.label} tone="cat" />
                </NextLink>
              ) : (
                <Chip label={category.label} tone="cat" />
              )}
            </HStack>
          ) : null}
          <Heading level={1} type="display-2" className={styles.title}>
            {renderTitle(title)}
          </Heading>
          {lead ? <Text className={styles.lead}>{lead}</Text> : null}
          {author || date ? (
            <HStack gap={5} vAlign="center" wrap="wrap" className={styles.meta}>
              {author ? (
                <HStack gap={3} vAlign="center">
                  {author.photo?.src ? <Avatar src={author.photo.src} alt={author.photo.alt ?? author.name} name={author.name} size={48} shape="square" tooltip={false} /> : null}
                  <VStack gap={0}>
                    <Text className={styles.name}>{author.name}</Text>
                    {author.role ? <Text className={styles.role}>{author.role}</Text> : null}
                  </VStack>
                </HStack>
              ) : null}
              {author && date ? <span className={styles.divider} aria-hidden="true" /> : null}
              {date ? (
                <VStack gap={0}>
                  <Text className={styles.dateLabel}>{dateLabel}</Text>
                  <time dateTime={date.iso} className={styles.date}>
                    {date.label}
                  </time>
                </VStack>
              ) : null}
            </HStack>
          ) : null}
        </VStack>
        {cover?.src ? (
          <VStack as="figure" gap={3} className={styles.figure}>
            <VStack className={styles.cover}>
              <Image src={cover.src} alt={cover.alt ?? ''} fill priority sizes="(max-width: 1440px) 100vw, 1360px" className={styles.coverImage} />
              {coverCaption ? <CoverCaption tone={coverCaptionTone}>{coverCaption}</CoverCaption> : null}
            </VStack>
          </VStack>
        ) : null}
      </Container>
    </Section>
  );
}
