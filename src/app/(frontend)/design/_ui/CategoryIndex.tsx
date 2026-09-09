import {Badge} from '@astryxdesign/core/Badge';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CATALOG} from './catalog.generated';
import {PageIntro} from './PageIntro';

/** Index d'une catégorie : une carte par composant, avec son état. */
export function CategoryIndex({slug}: {slug: string}) {
  const cat = CATALOG.find((c) => c.slug === slug);
  if (!cat) return null;
  const dressed = cat.items.filter((i) => i.dressed).length;
  return (
    <VStack gap={8}>
      <PageIntro eyebrow={`Composants · ${cat.items.length}`} title={cat.label} lead={cat.lead} />
      <Text type="supporting">{dressed} habillé{dressed > 1 ? 's' : ''} Orbita sur {cat.items.length}.</Text>
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
  );
}
