import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';

export const metadata = {title: 'Formes & ombres — Design system Vidomia'};

const RADII = ['none', 'inner', 'element', 'container', 'page', 'full'];
const SHADOWS = ['low', 'med', 'high'] as const;

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title={<>Formes <Text type="serif">&amp;</Text> ombres</>}
        lead="Signature Orbita : angles vifs. Le thème met le multiplicateur de rayon à zéro, donc inner, element, container et page valent tous 0 px. Seul --radius-full (pastilles, avatars, interrupteurs) reste rond."
      />

      <VStack gap={3}>
        <Heading level={2}>Rayons --radius-*</Heading>
        <Card padding={5}>
          <Grid columns={{minWidth: 140}} gap={4}>
            {RADII.map((r) => (
              <VStack key={r} gap={2} hAlign="center">
                <VStack style={{width: 96, height: 96, borderRadius: `var(--radius-${r})`, background: 'var(--color-accent-muted)', border: '2px solid var(--color-accent)'}} />
                <Text type="code" size="sm" color="secondary">{`--radius-${r}`}</Text>
              </VStack>
            ))}
          </Grid>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Élévations --shadow-*</Heading>
        <Text type="supporting">Ombre Orbita double (portée courte + halo diffus), déclinée en trois niveaux. Les boutons primaires portent en plus un halo teinté accent.</Text>
        <Card padding={8} variant="muted">
          <HStack gap={8} wrap="wrap">
            {SHADOWS.map((s) => (
              <Card key={s} elevation={s} padding={5}>
                <VStack gap={1} style={{minWidth: 160}}>
                  <Text type="label">elevation="{s}"</Text>
                  <Text type="code" size="sm" color="secondary">{`--shadow-${s}`}</Text>
                </VStack>
              </Card>
            ))}
          </HStack>
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Filets & focus</Heading>
        <Card padding={5}>
          <VStack gap={4}>
            <HStack gap={4} vAlign="center" wrap="wrap">
              <Text type="label" style={{width: 200}}>--border-width</Text>
              <VStack style={{width: 240, height: 0, borderTop: 'var(--border-width) solid var(--color-border-emphasized)'}} />
            </HStack>
            <HStack gap={4} vAlign="center" wrap="wrap">
              <Text type="label" style={{width: 200}}>--focus-outline-* (Tab pour voir)</Text>
              <Button label="Focus moi" variant="secondary" />
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </VStack>
  );
}
