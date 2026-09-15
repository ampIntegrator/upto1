/**
 * PageSections — les sections d'une page, empilées sous le haut de page.
 * Chaque section : Section (fond, paddings) > Container > une seule Grid de 12 colonnes pour
 * toutes ses rangées (classe page-grid) > GridSpan par colonne, à sa largeur et sur la ligne
 * de sa rangée > contenus empilés. Une seule grille, pour que l'ordre mobile puisse mêler les
 * colonnes de plusieurs rangées : sous 768 px, toutes les colonnes de la section s'empilent
 * dans l'ordre --mobile-order et les colonnes vides disparaissent (styles.css). Écarts :
 * variables --section-gap-x, --section-gap-y et --section-gap-y-mobile, en pixels (réglage de
 * la section, sinon Réglages du site › Mise en page), lues par .section-grid (styles.css).
 * Une colonne qui contient une image s'étire à la hauteur de sa rangée (l'image la remplit).
 */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import type {ContentData, SectionData} from '@/lib/sections';
import {Card} from './Card';
import {Container} from './Container';
import {Media} from './Media';
import {MediaQuote} from './MediaQuote';
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
    case 'media':
      return <Media {...content.media} />;
    case 'mediaQuote':
      return <MediaQuote {...content.mediaQuote} />;
    default:
      return null;
  }
}

export function PageSections({sections}: {sections: SectionData[]}) {
  return (
    <>
      {sections.map((s) => (
        <Section key={s.key} id={s.id} background={s.background} tint={s.tint} image={s.image} video={s.video} overlay={s.overlay} spacingTop={s.spacingTop} spacingBottom={s.spacingBottom}>
          <Container>
            <Grid
              columns={12}
              className="page-grid section-grid"
              align="start"
              style={{'--section-gap-x': `${s.gaps.gapX}px`, '--section-gap-y': `${s.gaps.gapY}px`, '--section-gap-y-mobile': `${s.gaps.gapYMobile}px`} as React.CSSProperties}>
              {s.rows.flatMap((columns, r) =>
                columns.map((c, i) => (
                  <GridSpan
                    key={`${r}-${i}`}
                    columns={c.span}
                    data-empty={c.empty ? 'true' : undefined}
                    style={{gridRow: r + 1, ...(c.stretch ? {alignSelf: 'stretch'} : null), ...(c.mobileRank !== undefined ? {'--mobile-order': c.mobileRank} : null)} as React.CSSProperties}>
                    {c.contents.length ? (
                      <VStack gap={6} style={c.stretch ? {height: '100%'} : undefined}>
                        {c.contents.map((content, j) => (
                          <Content key={j} content={content} />
                        ))}
                      </VStack>
                    ) : null}
                  </GridSpan>
                )),
              )}
            </Grid>
          </Container>
        </Section>
      ))}
    </>
  );
}
