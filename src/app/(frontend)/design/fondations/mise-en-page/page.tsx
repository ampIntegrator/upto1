import {VStack} from '@astryxdesign/core/Stack';
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {PageDemo} from './PageDemo';

export const metadata = {title: 'Mise en page — Orbita × Astryx'};

const ROWS: Array<[string, string, string]> = [
  ['Section', 'Bloc pleine largeur : arrière-plan (clair, textures grid / points / losanges, nuit, image, vidéo) et padding vertical (sm, md, lg). Nuit, image et vidéo passent leur contenu en mode nuit.', 'src/components/Section'],
  ['Container', 'Le seul conteneur : 1440 px maximum, 20 px de marge de chaque côté, centré.', 'src/components/Container'],
  ['Grid 12 + GridSpan', 'La grille de page : 12 colonnes, une colonne fait 2, 3, 4, 6, 8 ou 9 douzièmes. Sous 768 px, tout passe en pleine largeur.', 'Astryx Grid columns={12} className="page-grid"'],
  ['Composants', 'Dans les colonnes : Heading, Text, Button, Card, Collapsible, TabList… tels qu\'ils sont dans le catalogue.', '—'],
];

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title="Mise en page"
        lead="Une page est une pile de sections. Chaque section porte son arrière-plan et son padding vertical, contient le container, qui contient la grille de 12 colonnes, dont les colonnes reçoivent les composants. Ci-dessous, une page assemblée uniquement avec les composants du catalogue, pleine largeur, pour juger l'outil."
      />

      <Card padding={0}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Niveau</TableHeaderCell>
              <TableHeaderCell>Rôle</TableHeaderCell>
              <TableHeaderCell>Où</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map(([a, b, c]) => (
              <TableRow key={a}>
                <TableCell><Text weight="semibold">{a}</Text></TableCell>
                <TableCell><Text color="secondary">{b}</Text></TableCell>
                <TableCell><Text type="supporting">{c}</Text></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <VStack gap={3}>
        <Heading level={2}>Page assemblée</Heading>
        <Text type="supporting">Six sections empilées, de bord à bord : image (maquette 13), texture grid, nuit, points, vidéo, losanges.</Text>
      </VStack>
      <PageDemo />
    </VStack>
  );
}
