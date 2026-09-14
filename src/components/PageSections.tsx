/**
 * PageSections — les sections d'une page, empilées sous le haut de page.
 * Chaque section : Section (fond, paddings) > Container > une Grid de 12 colonnes par
 * rangée (classe page-grid : pleine largeur sous 768 px) > GridSpan par colonne, à sa
 * largeur > contenus empilés. Une colonne vide garde sa place dans la grille.
 */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import type {ContentData, SectionData} from '@/lib/sections';
import {Card} from './Card';
import {Container} from './Container';
import {Section} from './Section';

function Content({content}: {content: ContentData}) {
  switch (content.type) {
    case 'text':
      return (
        <VStack gap={3}>
          {content.text
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean)
            .map((p, i) => (
              <Text key={i} type="body" color="secondary">
                {p}
              </Text>
            ))}
        </VStack>
      );
    case 'card':
      return <Card {...content.card} />;
    default:
      return null;
  }
}

export function PageSections({sections}: {sections: SectionData[]}) {
  return (
    <>
      {sections.map((s) => (
        <Section key={s.key} id={s.id} background={s.background} tint={s.tint} image={s.image} video={s.video} overlay={s.overlay} spacingTop={s.spacingTop} spacingBottom={s.spacingBottom}>
          <Container gap={10}>
            {s.rows.map((columns, r) => (
              <Grid key={r} columns={12} gap={8} className="page-grid" align="start">
                {columns.map((c, i) => (
                  <GridSpan key={i} columns={c.span}>
                    {c.contents.length ? (
                      <VStack gap={6}>
                        {c.contents.map((content, j) => (
                          <Content key={j} content={content} />
                        ))}
                      </VStack>
                    ) : null}
                  </GridSpan>
                ))}
              </Grid>
            ))}
          </Container>
        </Section>
      ))}
    </>
  );
}
