/* Orbita-styled showcase — replaces the original Astryx demo. Component: src/components/Card (without cta) */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Card} from '@/components/Card';
import {BlocRows, Night} from '../_ui/CardRows';

const TAG_TEXT = 'Même rendu quelle que soit la balise choisie en admin.';

export default function CardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La carte sans lien : un châssis, quatre médias au choix (image, icône, nombre, rien), titre centré avec son ornement au losange, texte. Ni barre d'action, ni survol, ni clic. Pour la version cliquable, voir Clickable Card. Le titre est un titre de type card : balise au choix en admin, h2 à h6, p ou span, même rendu.
      </Text>

      <BlocRows linked={false} />

      <VStack gap={3}>
        <Heading level={3}>Balise du titre : h2, h4, p, span</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="stretch" data-tag-demo>
          {(['h2', 'h4', 'p', 'span'] as const).map((tag) => (
            <GridSpan key={tag} columns={3}>
              <Card title={`Titre en ${tag}`} tag={tag} text={TAG_TEXT} media={{type: 'icon', iconKey: 'calculator'}} />
            </GridSpan>
          ))}
        </Grid>
      </VStack>

      <Night>
        <BlocRows linked={false} seed="-n" />
      </Night>
    </VStack>
  );
}
