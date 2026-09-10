/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaCollapsible (OrbitaCollapsibleGroup) */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {OrbitaCollapsible, OrbitaCollapsibleGroup} from '@/components/OrbitaCollapsible';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import {FAQ} from './faq.shared';

function Faq({columns, type = 'single', prefix}: {columns: 1 | 2; type?: 'single' | 'multiple'; prefix: string}) {
  return (
    <OrbitaCollapsibleGroup type={type} columns={columns} defaultValue={type === 'multiple' ? [`${prefix}-0`] : `${prefix}-0`}>
      {FAQ.map((f, i) => (
        <OrbitaCollapsible key={f.q} value={`${prefix}-${i}`} question={f.q}>
          <Text type="body">{f.a}</Text>
        </OrbitaCollapsible>
      ))}
    </OrbitaCollapsibleGroup>
  );
}

function Section({title, note, children}: {title: string; note?: string; children: React.ReactNode}) {
  return (
    <VStack gap={3}>
      <Heading level={3}>{title}</Heading>
      {note ? <Text type="supporting">{note}</Text> : null}
      {children}
    </VStack>
  );
}

export default function CollapsibleGroupShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Plusieurs items reliés. Accordéon strict : une seule question ouverte, la première par défaut. La règle traverse les colonnes, chaque colonne pousse indépendamment. Deux groupes sur une même page sont indépendants l'un de l'autre. Mode libre : chaque question s'ouvre et se ferme sans toucher aux autres.
      </Text>

      <Section title="Empilé" note="Une colonne, accordéon strict.">
        <Faq columns={1} prefix="stack" />
      </Section>

      <Section title="Deux colonnes" note="Ordre de lecture ligne par ligne, comme la maquette. Une seule colonne sous ~900 px.">
        <Faq columns={2} prefix="cols" />
      </Section>

      <Section title="Mode libre" note="type multiple : plusieurs questions ouvertes à la fois.">
        <Faq columns={2} type="multiple" prefix="multi" />
      </Section>

      <Section title="Nuit" note="Deux colonnes dans une section nuit.">
        <Theme theme={theme} mode="dark">
          <VStack padding={6} style={{background: 'var(--color-background-body)'}}>
            <Faq columns={2} prefix="night" />
          </VStack>
        </Theme>
      </Section>
    </VStack>
  );
}
