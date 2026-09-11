import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Table} from '@astryxdesign/core/Table';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {COLUMN_SPANS, CONTENT_SPECS, type ContentRef, describeContent, minSpan} from '@/components/content-specs';
import {PageIntro} from '../../_ui/PageIntro';

export const metadata = {title: 'Grille & emprises — Design system Vidomia'};

/** Un exemple par contenu et par réglage déterminant : ce que la table affiche. */
const SAMPLES: ContentRef[] = [
  {type: 'text'}, {type: 'image'}, {type: 'stat'}, {type: 'checkList'}, {type: 'callout'}, {type: 'card'}, {type: 'testimonialCard'}, {type: 'compareCard'},
  {type: 'cardGrid', columns: 2}, {type: 'cardGrid', columns: 3}, {type: 'cardGrid', columns: 4},
  {type: 'sectionHeading'}, {type: 'sectionNote'}, {type: 'tabs'}, {type: 'collapsibleGroup'}, {type: 'testimonialCarousel'},
  {type: 'processSteps', steps: 2}, {type: 'processSteps', steps: 3}, {type: 'processSteps', steps: 4},
  {type: 'priceList', variant: 'single'}, {type: 'priceList', variant: 'columns', plans: 2}, {type: 'priceList', variant: 'columns', plans: 3},
  {type: 'statsBar'},
];

interface Row extends Record<string, unknown> {
  id: string;
  contenu: string;
  type: string;
  min: string;
}

const ROWS: Row[] = SAMPLES.map((c, i) => ({id: String(i), contenu: describeContent(c), type: CONTENT_SPECS[c.type].label, min: `${minSpan(c)} / 12`}));

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title="Grille & emprises"
        lead="Une page est une pile de Sections. Une Section contient des rangées ; une rangée, des colonnes dont les largeurs font 12 ; une colonne, des contenus empilés. Un seul niveau de colonnes : ce qui doit se subdiviser est un contenu qui porte sa propre grille. Chaque contenu déclare l'emprise minimale qu'il lui faut ; Payload refusera une colonne trop étroite avec le message correspondant."
      />

      <VStack gap={3}>
        <Heading level={2}>Largeurs de colonne</Heading>
        <Card padding={5}>
          <VStack gap={2}>
            <Text type="body" color="secondary">Sur 12, dans le Container de 1440 px. Sous 768 px, toutes les colonnes passent en pleine largeur, dans l'ordre.</Text>
            <Text type="code">{COLUMN_SPANS.join(' · ')}</Text>
          </VStack>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Emprise minimale des contenus</Heading>
        <Text type="body" color="secondary">Registre : src/components/content-specs.ts. Quand un réglage change l'emprise (colonnes internes, nombre d'étapes ou de paliers), la table montre chaque cas.</Text>
        <Table<Row>
          data={ROWS}
          idKey="id"
          density="compact"
          columns={[
            {key: 'contenu', header: 'Contenu'},
            {key: 'type', header: 'Famille'},
            {key: 'min', header: 'Emprise minimale', align: 'end'},
          ]}
        />
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Règles</Heading>
        <Card padding={5}>
          <VStack gap={2}>
            <Text type="body" color="secondary">1. Les largeurs d'une rangée font exactement 12.</Text>
            <Text type="body" color="secondary">2. L'emprise minimale d'une colonne est celle de son contenu le plus large.</Text>
            <Text type="body" color="secondary">3. Pas d'imbrication de colonnes. Grille de cartes, liste de prix en colonnes, étapes et carrousel gèrent leur intérieur, et suivent la largeur de leur colonne (requêtes de conteneur), pas celle de l'écran.</Text>
            <Text type="body" color="secondary">4. Un contenu ne casse jamais si la règle est contournée : il se replie sur une disposition plus étroite.</Text>
          </VStack>
        </Card>
      </VStack>
    </VStack>
  );
}
