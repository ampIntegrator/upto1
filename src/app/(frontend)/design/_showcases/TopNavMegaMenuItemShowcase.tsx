/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION */
'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TopNavMegaMenuItem} from '@astryxdesign/core/TopNav';
import React from 'react';

import {HammerIcon, HelmetIcon, UserIcon} from '@/theme/icons/nucleo';

export default function TopNavMegaMenuItemShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Un item de méga-menu ou de sous-menu : bloc sur fond de page, icône Nucleo 24 px couleur silo, titre semi-gras, description. Au survol, fond silo et textes blancs.</Text>
      <Grid columns={{minWidth: 260, max: 3}} gap={2}>
        <TopNavMegaMenuItem title="Architectes" description="Du métré à l'estimatif détaillé en un flux." icon={<HelmetIcon width={24} height={24} />} href="#" />
        <TopNavMegaMenuItem title="Maîtres d'œuvre" description="Centralisez tous vos chiffrages sur un poste." icon={<HammerIcon width={24} height={24} />} href="#" />
        <TopNavMegaMenuItem title="Promoteurs" description="Fiabilisez vos budgets dès l'esquisse." icon={<UserIcon width={24} height={24} />} href="#" />
      </Grid>
    </VStack>
  );
}
