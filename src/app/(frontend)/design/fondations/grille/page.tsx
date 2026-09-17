import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Table} from '@astryxdesign/core/Table';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CONTENT_SPECS, type ContentRef, describeContent, maxSpan, minSpan} from '@/components/content-specs';
import {COLUMN_SPANS} from '@/fields/sections/grid';
import {PageIntro} from '../../_ui/PageIntro';

export const metadata = {title: 'Grille & emprises — Design system Vidomia'};

/** One example per content type and per decisive setting: what the table displays. */
const SAMPLES: ContentRef[] = [
  {type: 'text'}, {type: 'image'}, {type: 'stat'}, {type: 'checkList'}, {type: 'callout'}, {type: 'card'}, {type: 'testimonialCard'}, {type: 'compareCard'},
  {type: 'cardGrid', columns: 2}, {type: 'cardGrid', columns: 3}, {type: 'cardGrid', columns: 4},
  {type: 'sectionHeading'}, {type: 'sectionNote'}, {type: 'tabs', count: 4}, {type: 'tabs', count: 6}, {type: 'tabs', count: 8}, {type: 'buttonGroup', count: 2}, {type: 'buttonGroup', count: 3}, {type: 'buttonGroup', count: 4}, {type: 'collapsibleGroup'}, {type: 'testimonialCarousel'}, {type: 'mediaQuote'},
  {type: 'processSteps', steps: 1}, {type: 'processSteps', steps: 2}, {type: 'processSteps', steps: 3}, {type: 'processSteps', steps: 4},
  {type: 'priceList', variant: 'single'}, {type: 'plan'}, {type: 'postCard'},
  {type: 'collection', perView: 2}, {type: 'collection', perView: 3}, {type: 'collection', perView: 4},
  {type: 'textBox', titleSize: 'heading-1'}, {type: 'textBox', titleSize: 'display-2'},
  {type: 'statsBar'},
];

interface Row extends Record<string, unknown> {
  id: string;
  contenu: string;
  type: string;
  min: string;
  max: string;
}

const ROWS: Row[] = SAMPLES.map((c, i) => ({id: String(i), contenu: describeContent(c), type: CONTENT_SPECS[c.type].label, min: `${minSpan(c)} / 12`, max: `${maxSpan(c)} / 12`}));

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title="Grille & emprises"
        lead="Une page est une pile de Sections. Une Section contient des rangées ; une rangée, des colonnes dont les largeurs font 12 ; une colonne, un contenu. Un seul niveau de colonnes : les cartes, paliers et témoignages se posent un par colonne, la rangée fait la mise côte à côte. Chaque contenu déclare l'emprise minimale qu'il lui faut et, pour ceux qui ne doivent pas s'étaler, une emprise maximale ; Payload refuse une colonne trop étroite ou trop large avec le message correspondant."
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
        <Text type="body" color="secondary">Registre : src/components/content-specs.ts ; grille : src/fields/sections/grid.ts. Quand un réglage change l'emprise (colonnes internes, nombre d'étapes ou de paliers), la table montre chaque cas.</Text>
        <Table<Row>
          data={ROWS}
          idKey="id"
          density="compact"
          columns={[
            {key: 'contenu', header: 'Contenu'},
            {key: 'type', header: 'Famille'},
            {key: 'min', header: 'Emprise minimale', align: 'end'},
            {key: 'max', header: 'Emprise maximale', align: 'end'},
          ]}
        />
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Règles</Heading>
        <Card padding={5}>
          <VStack gap={2}>
            <Text type="body" color="secondary">1. Les largeurs d'une rangée font exactement 12.</Text>
            <Text type="body" color="secondary">2. Le contenu d'une colonne respecte son emprise minimale et, s'il en a une, son emprise maximale.</Text>
            <Text type="body" color="secondary">2 bis. Étapes : 1 étape sur 4 ou 5 colonnes, 2 sur 6 ou 7, 3 sur 8 ou 9, 4 sur 12 ; le panneau suit la largeur de sa colonne.</Text>
            <Text type="body" color="secondary">2 quinquies. Groupe de boutons : collés ou espacés, 2 boutons au plus sur 6 ou 7 colonnes, 3 sur 8 ou 9, 4 sur 12 ; en espacé, une colonne par bouton avec l'écart de la section.</Text>
            <Text type="body" color="secondary">2 quater. Onglets : 4 au plus sur 6 ou 7 colonnes, 6 sur 8 ou 9, 8 sur 12 ; libellés de 50 caractères au plus, la barre défile au-delà.</Text>
            <Text type="body" color="secondary">2 ter. Collection : contenus identiques côte à côte, dès 8 colonnes ; 3 visibles au plus sur 8 ou 9, 4 sur 12. Pour deux lignes, deux rangées.</Text>
            <Text type="body" color="secondary">3. Pas d'imbrication de colonnes. Grille de cartes, liste de prix en colonnes, étapes et carrousel gèrent leur intérieur, et suivent la largeur de leur colonne (requêtes de conteneur), pas celle de l'écran.</Text>
            <Text type="body" color="secondary">4. Un contenu ne casse jamais si la règle est contournée : il se replie sur une disposition plus étroite.</Text>
          </VStack>
        </Card>
      </VStack>
    </VStack>
  );
}
