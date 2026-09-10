/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Thème : orbita.ts section ONGLETS */
'use client';

import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {ChartIcon, FilesIcon, GearsIcon} from '@/theme/icons/nucleo';

export default function TabShowcase() {
  const [value, setValue] = useState<string>('activite');
  const [v2, setV2] = useState<string>('tous');
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Un onglet dans sa liste : libellé, icône Nucleo optionnelle, contenu de fin (compteur). L'onglet actif passe en couleur silo avec son indicateur.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Avec icônes</Heading>
        <TabList value={value} onChange={setValue} layout="fill" aria-label="Espaces">
          <Tab value="activite" label="Activité" icon={<ChartIcon />} />
          <Tab value="dossiers" label="Dossiers" icon={<FilesIcon />} />
          <Tab value="reglages" label="Réglages" icon={<GearsIcon />} />
        </TabList>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Avec compteur</Heading>
        <TabList value={v2} onChange={setV2} layout="fill" aria-label="Devis">
          <Tab value="tous" label="Tous" endContent={<Badge label="24" variant="neutral" />} />
          <Tab value="attente" label="En attente" endContent={<Badge label="3" variant="error" />} />
          <Tab value="valides" label="Validés" />
        </TabList>
      </VStack>
    </VStack>
  );
}
