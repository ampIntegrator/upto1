import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PageIntro} from './_ui/PageIntro';
import {CATEGORIES, FOUNDATIONS} from './_ui/nav';

export default function DesignHome() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Design system"
        title={
          <>
            Orbita, écrit en <Text type="serif">Astryx.</Text>
          </>
        }
        lead="La grammaire visuelle d'Orbita (couleurs, typographie, angles vifs, sections nuit) portée dans le système de thème Astryx. Les sept silos d'accent et le mode nuit se changent dans la barre latérale."
      />

      <Card padding={8}>
        <VStack gap={6}>
          <Text type="eyebrow">Signature Orbita</Text>
          <Heading level={2} type="display-2">
            Le chiffrage adapté <Text type="serif">à votre métier.</Text>
          </Heading>
          <Text type="large" color="secondary">
            Eyebrow doré, titre display en Schibsted Grotesk, accent serif en Cormorant Garamond
            italique, texte courant en Geist. Rayon zéro partout, une seule vitesse de transition.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button label="Découvrir la méthode" variant="primary" />
            <Button label="Demander une démo" variant="secondary" />
            <Button label="En savoir plus" variant="ghost" />
          </HStack>
        </VStack>
      </Card>

      <VStack gap={4}>
        <Heading level={2}>Fondations</Heading>
        <Grid columns={{minWidth: 220}} gap={3}>
          {FOUNDATIONS.map((e) => (
            <ClickableCard key={e.slug} href={e.href} padding={5} label={e.label}>
              <VStack gap={1}>
                <Heading level={3}>{e.label}</Heading>
                <Text type="supporting">Tokens et règles</Text>
              </VStack>
            </ClickableCard>
          ))}
        </Grid>
      </VStack>

      <VStack gap={4}>
        <Heading level={2}>Composants</Heading>
        <Grid columns={{minWidth: 220}} gap={3}>
          {CATEGORIES.map((e) => (
            <ClickableCard key={e.slug} href={e.href} padding={5} label={e.label}>
              <VStack gap={1}>
                <Heading level={3}>{e.label}</Heading>
                <Text type="supporting">Démos Astryx et composants habillés</Text>
              </VStack>
            </ClickableCard>
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
}
