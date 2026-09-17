/**
 * RelatedPosts — « Pour continuer sur le sujet » (mockup 19), under a post or a case study: a
 * centred section heading, then the cards side by side (three or four; article or realisation
 * preset, carried by the cards), and a button to the listing page.
 */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {HStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {Button} from './Button';
import {Card, type CardProps} from './Card';
import {Container} from './Container';
import {Section, type SectionBackground} from './Section';
import {SectionHeading} from './SectionHeading';

export type RelatedPostsProps = {
  eyebrow?: string;
  title?: string;
  items: CardProps[];
  more?: {label: string; href: string};
  background?: SectionBackground;
};

export function RelatedPosts({eyebrow = 'Le blog', title = 'Pour continuer <span>sur le sujet.</span>', items, more, background = 'paper'}: RelatedPostsProps) {
  if (!items.length) return null;
  const span = items.length >= 4 ? 3 : 4;
  return (
    <Section background={background} spacing="md">
      <Container gap={10}>
        <SectionHeading eyebrow={eyebrow} title={title} size="display-3" />
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
