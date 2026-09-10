import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {MotionDemo} from '../../_ui/MotionDemo';
import {PageIntro} from '../../_ui/PageIntro';
import {TokenValue} from '../../_ui/TokenValue';

export const metadata = {title: 'Mouvement — Design system Vidomia'};

const DURATIONS = ['fast-min', 'fast', 'fast-max', 'medium-min', 'medium', 'medium-max', 'slow-min', 'slow', 'slow-max'];

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title="Mouvement"
        lead="Orbita centralisait toute l'animation en deux tokens : 0,25 s et ease-in-out. Le thème Astryx fixe fast 200 ms, medium 250 ms, slow 500 ms, courbe ease-in-out ; les -min et -max en dérivent (ratio 0,75). Les transitions ci-dessous s'arrêtent avec prefers-reduced-motion."
      />

      <VStack gap={3}>
        <Heading level={2}>Durées --duration-*</Heading>
        <Card padding={0}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Token</TableHeaderCell>
                <TableHeaderCell>Valeur</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DURATIONS.map((d) => (
                <TableRow key={d}>
                  <TableCell><Text type="code" size="sm">{`--duration-${d}`}</Text></TableCell>
                  <TableCell><TokenValue token={`--duration-${d}`} /></TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><Text type="code" size="sm">--ease-standard</Text></TableCell>
                <TableCell><TokenValue token="--ease-standard" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>À l'usage</Heading>
        <Text type="supporting">Survol des boutons, bascule d'un interrupteur, ouverture d'un repli : tout suit les mêmes tokens.</Text>
        <Card padding={6}>
          <MotionDemo />
        </Card>
      </VStack>
    </VStack>
  );
}
