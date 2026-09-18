/**
 * RelatedPosts — « Pour continuer sur le sujet » (mockup 19), under a post or a case study: an
 * optional centred section heading (eyebrow, title in the chosen tag; no title = no heading), then
 * the cards side by side (three or four; article or realisation preset, carried by the cards), and
 * a button to the listing page.
 */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {HStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {Button} from './Button';
import {Card, type CardProps} from './Card';
import {Container} from './Container';
import {Section, type SectionBackground} from './Section';
import {SectionHeading} from './SectionHeading';
import type {TitleTag} from './title-tags';

export type RelatedPostsProps = {
  /** shown with the title only */
  eyebrow?: string;
  /** optional; a word between <span>…</span> is set in serif */
  title?: string;
  tag?: TitleTag;
  items: CardProps[];
  more?: {label: string; href: string};
  background?: SectionBackground;
};

export function RelatedPosts({eyebrow, title, tag = 'h2', items, more, background = 'paper'}: RelatedPostsProps) {
  if (!items.length) return null;
  const span = items.length >= 4 ? 3 : 4;
  return (
    <Section background={background} spacing="md">
      <Container gap={10}>
        {title ? <SectionHeading eyebrow={eyebrow} title={title} tag={tag} size="display-3" /> : null}
        <Grid columns={12} gap={6} className="page-grid" align="stretch">
          {items.slice(0, 4).map((card, i) => (
            <GridSpan key={i} columns={span}>
              <Card preset="article" {...card} />
            </GridSpan>
          ))}
        </Grid>
        {more ? (
          <HStack hAlign="center">
            <Button label={more.label} href={more.href} variant="primary" arrow />
          </HStack>
        ) : null}
      </Container>
    </Section>
  );
}
