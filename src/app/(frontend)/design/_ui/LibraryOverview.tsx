import {Badge} from '@astryxdesign/core/Badge';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CATALOG} from './catalog.generated';
import {PageIntro} from './PageIntro';

/** Vue d'ensemble de la bibliothèque : toutes les catégories, une carte par composant (comme astryx.atmeta.com/components). */
export function LibraryOverview() {
  const total = CATALOG.reduce((n, c) => n + c.items.length, 0);
  const dressed = CATALOG.reduce((n, c) => n + c.items.filter((i) => i.dressed).length, 0);
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow={`Composants · ${total}`}
        title="Parcourir la bibliothèque"
        lead={`Chaque composant Astryx, thémé Orbita, avec sa démo. ${dressed} sont habillés Orbita, les autres sont les démos d'origine.`}
      />
      {CATALOG.map((cat) => (
        <VStack key={cat.slug} gap={4}>
          <VStack gap={1}>
            <Heading level={2} id={cat.slug}>
              {cat.label}
            </Heading>
            <Text type="supporting">{cat.lead}</Text>
          </VStack>
          <Grid columns={{minWidth: 220}} gap={3}>
            {cat.items.map((it) => (
              <ClickableCard key={it.slug} href={it.href} padding={5} label={it.label}>
                <VStack gap={2} hAlign="start">
                  <Heading level={3}>{it.label}</Heading>
                  <HStack gap={2} vAlign="center" wrap="wrap">
                    <Badge label={it.dressed ? 'Habillé Orbita' : 'Démo Astryx'} variant={it.dressed ? 'success' : 'neutral'} />
                    {it.parent ? <Text type="supporting">de {it.parent}</Text> : null}
                  </HStack>
                </VStack>
              </ClickableCard>
            ))}
          </Grid>
        </VStack>
      ))}
    </VStack>
  );
}
