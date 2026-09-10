/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Thème : orbita.ts section ONGLETS */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Tab, TabList, TabMenu} from '@astryxdesign/core/TabList';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

export default function TabMenuShowcase() {
  const [value, setValue] = useState<string>('reglages');
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">
        Le menu de débordement regroupe les onglets secondaires dans une liste déroulante. Son libellé reste fixe, l'option choisie est cochée dans la liste.
      </Text>
      <TabList value={value} onChange={setValue} layout="fill" aria-label="Compte">
        <Tab value="apercu" label="Aperçu" />
        <Tab value="activite" label="Activité" />
        <TabMenu
          label="Plus"
          style={{'--tab-menu-label': '"Plus"'} as React.CSSProperties}
          options={[
            {value: 'reglages', label: 'Réglages'},
            {value: 'integrations', label: 'Intégrations'},
            {value: 'facturation', label: 'Facturation'},
          ]}
        />
      </TabList>
    </VStack>
  );
}
