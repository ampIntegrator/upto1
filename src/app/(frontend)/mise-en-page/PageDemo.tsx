'use client';

/* Page de démonstration : sections empilées, chacune = Section > Container > Grid 12 > GridSpan > composants. */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {OrbitaButton} from '@/components/OrbitaButton';
import {OrbitaCard} from '@/components/OrbitaCard';
import {OrbitaCollapsible, OrbitaCollapsibleGroup} from '@/components/OrbitaCollapsible';
import {Section} from '@/components/Section';
import {SiteHeader} from '@/components/SiteHeader';
import {FAQ} from '../design/_showcases/faq.shared';
import {SITE_HEADER} from '../design/_ui/siteNav';
import {STATS_BARS, StatsBar} from '../design/_ui/StatsBar';
import {TabsWithPanel} from '../design/_ui/TabRows';

const IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80';
const VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

function Eyebrow({children}: {children: string}) {
  return <Text type="eyebrow-lines">{children}</Text>;
}

export function PageDemo() {
  return (
    <VStack className="page-demo">
      {/* 0 · en-tête fixé, tonalité sombre car posé sur un hero image */}
      <SiteHeader {...SITE_HEADER} tone="dark" />

      {/* 1 · image pleine largeur, colonne de 8 centrée (maquette 13 : contenu à 900 px) */}
      <Section background="image" image={{src: IMG, alt: ''}} overlay={0.3} spacing="lg" minHeight={600}>
        <Container>
          <Grid columns={12} gap={6} className="page-grid">
            <GridSpan style={{gridColumn: '3 / span 8'}}>
              <VStack gap={4} align="center" style={{textAlign: 'center'}}>
                <Heading level={2} type="display-3">
                  Gérez tout votre chantier en un seul outil. <Text type="serif" style={{'--serif-color': 'var(--color-editorial)'} as React.CSSProperties}>Mise en place en moins de 24 heures.</Text>
                </Heading>
                <Text type="large" color="secondary">Sans engagement. Notre équipe vous rappelle dans la journée.</Text>
                <OrbitaButton variant="primary" size="lg" arrow label="Demander un rappel" />
              </VStack>
            </GridSpan>
          </Grid>
        </Container>
      </Section>

      {/* 1b · barre de chiffres (maquette 04) */}
      <StatsBar {...STATS_BARS[0]} />

      {/* 2 · clair + texture grid, en-tête centré sur 8, quatre cartes sur 3 */}
      <Section background="grid" spacing="md">
        <Container gap={10}>
          <Grid columns={12} gap={6} className="page-grid">
            <GridSpan style={{gridColumn: '3 / span 8'}}>
              <VStack gap={3} align="center" style={{textAlign: 'center'}}>
                <Eyebrow>Une plateforme</Eyebrow>
                <Heading level={2} type="display-2">
                  Une plateforme, <Text type="serif">tout le chantier.</Text>
                </Heading>
                <Text type="large" color="secondary">{LOREM}</Text>
              </VStack>
            </GridSpan>
          </Grid>
          <Grid columns={12} gap={6} className="page-grid" align="stretch">
            {([['clipboard-check', 'Chiffrage instantané'], ['gauge', 'Suivi des coûts'], ['table', 'Devis structurés'], ['shield', 'Données sécurisées']] as const).map(([k, t]) => (
              <GridSpan key={k} columns={3}>
                <OrbitaCard media={{type: 'icon', iconKey: k}} title={t} text={LOREM} cta={{label: 'Découvrir', href: '#'}} />
              </GridSpan>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 3 · nuit : texte sur 5, FAQ sur 7 */}
      <Section background="night" spacing="md">
        <Container>
          <Grid columns={12} gap={8} className="page-grid" align="start">
            <GridSpan columns={5}>
              <VStack gap={4}>
                <Eyebrow>Questions fréquentes</Eyebrow>
                <Heading level={2} type="display-3">
                  Tout ce qu'on nous demande <Text type="serif">avant de signer.</Text>
                </Heading>
                <Text type="large" color="secondary">{LOREM}</Text>
                <HStack gap={3}>
                  <OrbitaButton variant="primary" size="lg" label="Nous contacter" />
                  <OrbitaButton variant="ghost" size="lg" label="Voir la doc" />
                </HStack>
              </VStack>
            </GridSpan>
            <GridSpan columns={7}>
              <OrbitaCollapsibleGroup columns={1} defaultValue="page-0">
                {FAQ.slice(0, 4).map((f, i) => (
                  <OrbitaCollapsible key={i} value={`page-${i}`} question={f.q}>
                    <Text type="body">{f.a}</Text>
                  </OrbitaCollapsible>
                ))}
              </OrbitaCollapsibleGroup>
            </GridSpan>
          </Grid>
        </Container>
      </Section>

      {/* 4 · clair + points : tête sur 8 centrée, onglets sur 9 + carte icône sur 3, même hauteur */}
      <Section background="dots" spacing="md">
        <Container gap={10}>
          <Grid columns={12} gap={6} className="page-grid">
            <GridSpan style={{gridColumn: '3 / span 8'}}>
              <VStack gap={3} align="center" style={{textAlign: 'center'}}>
                <Eyebrow>Au quotidien</Eyebrow>
                <Heading level={2} type="display-2">
                  Ce qui se passe <Text type="serif">vraiment.</Text>
                </Heading>
              </VStack>
            </GridSpan>
          </Grid>
          <Grid columns={12} gap={6} className="page-grid" align="stretch">
            <GridSpan columns={9}>
              <TabsWithPanel id="page-tabs" />
            </GridSpan>
            <GridSpan columns={3}>
              <OrbitaCard media={{type: 'icon', iconKey: 'gauge'}} title="Un seul tableau de bord" text="Chiffrage, suivi, devis et validation au même endroit, pour tous les sites." cta={{label: 'Découvrir', href: '#'}} />
            </GridSpan>
          </Grid>
        </Container>
      </Section>

      {/* 5 · vidéo : appel à l'action sur 8 centré */}
      <Section background="video" video={{src: VIDEO, poster: IMG}} overlay={0.3} spacing="lg" minHeight={520}>
        <Container>
          <Grid columns={12} gap={6} className="page-grid">
            <GridSpan style={{gridColumn: '3 / span 8'}}>
              <VStack gap={4} align="center" style={{textAlign: 'center'}}>
                <Eyebrow>Démarrer</Eyebrow>
                <Heading level={2} type="display-2">
                  Votre premier chiffrage <Text type="serif" style={{'--serif-color': 'var(--color-editorial)'} as React.CSSProperties}>en 20 minutes.</Text>
                </Heading>
                <HStack gap={3} justify="center" wrap="wrap">
                  <OrbitaButton variant="primary" size="lg" arrow label="Faire mon chiffrage" />
                  <OrbitaButton variant="ghost" size="lg" label="Demander une démo" />
                </HStack>
              </VStack>
            </GridSpan>
          </Grid>
        </Container>
      </Section>

      {/* 6 · clair + losanges : trois colonnes de 4 */}
      <Section background="losange" spacing="md">
        <Container>
          <Grid columns={12} gap={6} className="page-grid">
              {[['1 000', 'm²', "Seuil d'application"], ['40', '%', 'Objectif 2030'], ['850', '', 'Courtiers équipés']].map(([v, s, t]) => (
                <GridSpan key={t} columns={4}>
                  <OrbitaCard media={{type: 'number', value: v, suffix: s || undefined}} title={t} text={LOREM} />
                </GridSpan>
              ))}
          </Grid>
        </Container>
      </Section>
    </VStack>
  );
}
