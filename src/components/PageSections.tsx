/**
 * PageSections — the sections of a page, stacked under the page header.
 * Each section: Section (background, paddings) > Container > a single 12-column Grid for
 * all its rows (page-grid class) > one GridSpan per column, at its width and on the line
 * of its row > stacked contents. A single grid, so the mobile order can mix the
 * columns of several rows: below 768 px, all the section's columns stack
 * in --mobile-order order and empty columns disappear (styles.css). Gaps:
 * variables --section-gap-x, --section-gap-y and --section-gap-y-mobile, in pixels (section
 * setting, otherwise Site settings › Layout), read by .section-grid (styles.css).
 * A column containing an image stretches to its row's height (the image fills it).
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
