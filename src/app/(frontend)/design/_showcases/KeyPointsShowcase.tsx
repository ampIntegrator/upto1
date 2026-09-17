/* Design-system-specific component: src/components/KeyPoints (« À retenir », mockup 18). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {KeyPoints} from '@/components/KeyPoints';
import {KEY_POINTS_DOC} from './post.shared';

export default function KeyPointsShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">« À retenir » : un encadré à filet et ombre, un surtitre en mono après un tiret or, puis les points en liste à puces losange avec du gras. S’insère dans le texte d’un article ou se pose dans une colonne.</Text>
      <Grid columns={12} gap={6} className="page-grid">
        <GridSpan columns={8}>
          <KeyPoints content={KEY_POINTS_DOC} />
        </GridSpan>
      </Grid>
    </VStack>
  );
}
