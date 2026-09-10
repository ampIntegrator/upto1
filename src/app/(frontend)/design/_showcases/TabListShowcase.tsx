/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Thème : orbita.ts section ONGLETS (maquette 06-tabs) */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React, {useState} from 'react';

import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import {TABS, TabsWithPanel} from '../_ui/TabRows';

function Hug() {
  const [value, setValue] = useState<string>('reporting');
  return (
    <TabList value={value} onChange={setValue} aria-label="Sections">
      {TABS.map((t) => <Tab key={t.value} value={t.value} label={t.label} />)}
    </TabList>
  );
}

export default function TabListShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La liste d'onglets Astryx habillée par le thème : Geist 600, onglets séparés d'un filet, survol en silo 10 %, actif en couleur silo avec un indicateur de 3 px. Sur mobile la barre défile horizontalement et garde l'onglet actif en vue. Le panneau de contenu n'est pas un composant : il appartient au bloc qui assemble les onglets.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Largeur égale avec panneau</Heading>
        <Text type="supporting">layout fill, role tablist ; panneau sur fond silo 10 %, carte et liseré dégradé (maquette 06).</Text>
        <TabsWithPanel id="tabs-light" />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Ajustés au contenu</Heading>
        <Text type="supporting">layout hug : chaque onglet prend la largeur de son libellé.</Text>
        <Hug />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Theme theme={theme} mode="dark">
          <VStack padding={6} style={{background: 'var(--color-background-body)'}}>
            <TabsWithPanel id="tabs-night" />
          </VStack>
        </Theme>
      </VStack>
    </VStack>
  );
}
