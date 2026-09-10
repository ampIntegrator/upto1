'use client';

/* Page de démonstration : sections empilées, chacune = Section > Container > Grid 12 > GridSpan > composants. */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {BreadcrumbBand} from '@/components/BreadcrumbBand';
import {Container} from '@/components/Container';
import {Hero, type HeroProps} from '@/components/Hero';
import {Button} from '@/components/Button';
import {Card} from '@/components/Card';
import {Collapsible, CollapsibleGroup} from '@/components/Collapsible';
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

export type DemoHero = 'media' | 'split' | 'page-image' | 'page-glow' | 'page-night';

/** Les cinq hauts de page (maquettes 16, 02 et 25 A/B/C), sur le même composant Hero. */
const HEROES: Record<DemoHero, HeroProps> = {
  media: {
    variant: 'media', background: 'image', image: {src: IMG, alt: ''}, overlay: 0.3,
    eyebrow: "L'IA au service du bâtiment & de l'immobilier",
    title: {before: 'Toute la chaîne bâtiment,', accent: "d'un seul outil.", after: 'Du chiffrage à la maintenance.'},
    lead: "Éditeur de logiciels pour les pros de l'immobilier et les gestionnaires de sites, du chiffrage de travaux à la maintenance multitechnique.",
    primary: {label: 'Demander une démo', href: '#demo'}, secondary: {label: 'Voir la vidéo', href: '#video', iconKey: 'play'},
    scrollHint: 'Défiler',
  },
  split: {
    variant: 'split',
    eyebrow: "850+ courtiers actifs · Mis à jour aujourd'hui",
    title: {before: 'Chiffrez les travaux', accent: 'en 20 minutes.', after: 'Sans artisan.'},
    lead: 'Le devis arrive jamais. Le client signe ailleurs. Chiffrage Pro vous sort de cette dépendance : estimation détaillée, validée expert, livrable client en moins de 48 heures.',
    primary: {label: 'Faire mon 1er chiffrage gratuit', href: '#chiffrage'}, secondary: {label: 'Voir un exemple de rapport', href: '#rapport'},
    reassurance: ['1er chiffrage offert', 'Sans carte bancaire', 'Première estimation en 20 min'],
    media: {src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1100&auto=format&fit=crop', alt: '', badges: [{label: '20 min chrono', tone: 'night'}, {label: '+34 % closing', tone: 'accent'}]},
  },
  'page-image': {
    variant: 'page', background: 'image', image: {src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80&auto=format&fit=crop', alt: ''}, overlay: 0.5,
    eyebrow: 'Plateforme',
    title: {before: 'Le chiffrage,', accent: 'de A à Z.'},
    lead: 'Du métré au devis signé, une seule plateforme pour estimer juste et répondre plus vite que la concurrence.',
    primary: {label: 'Demander une démo', href: '#demo'}, secondary: {label: 'Voir la vidéo', href: '#video', iconKey: 'play'},
    breadcrumb: {items: [], current: 'Nos solutions'},
  },
  'page-glow': {
    variant: 'page', background: 'glow',
    eyebrow: 'Tarification',
    title: {before: 'Un prix clair,', accent: 'sans surprise.'},
    lead: "Choisissez l'offre adaptée à votre volume de chantiers. Sans engagement, sans frais cachés, résiliable en un clic.",
    primary: {label: 'Voir les tarifs', href: '#tarifs'}, secondary: {label: 'Parler à un conseiller', href: '#conseiller', iconKey: 'phone'},
    breadcrumb: {items: [], current: 'Tarifs & offres'},
  },
  'page-night': {
    variant: 'page', background: 'night-halo',
    eyebrow: 'Support',
    title: {before: 'Une question ?', accent: 'On vous répond.'},
    lead: "Centre d'aide, documentation et équipe support : trouvez la réponse en quelques minutes, ou parlez à un humain.",
    primary: {label: "Centre d'aide", href: '#aide'}, secondary: {label: 'Nous écrire', href: '#contact', iconKey: 'mail'},
    breadcrumb: {items: [], current: 'Support'},
  },
};

export function PageDemo({hero = 'media'}: {hero?: DemoHero}) {
  return (
    <VStack className="page-demo">
      {/* 0 · en-tête fixé ; tonalité déduite du premier bloc (ici image → sombre) */}
      <SiteHeader {...SITE_HEADER} />

      {/* 1 · haut de page : un seul composant Hero, cinq variantes (fil d'Ariane inclus pour « page ») */}
      <Hero {...HEROES[hero]} />
      {hero === 'media' || hero === 'split' ? <BreadcrumbBand items={[{label: 'Solutions', href: '#'}]} current="Chiffrage instantané" /> : null}

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
                <Card media={{type: 'icon', iconKey: k}} title={t} text={LOREM} cta={{label: 'Découvrir', href: '#'}} />
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
                  <Button variant="primary" size="lg" label="Nous contacter" />
                  <Button variant="ghost" size="lg" label="Voir la doc" />
                </HStack>
              </VStack>
            </GridSpan>
            <GridSpan columns={7}>
              <CollapsibleGroup columns={1} defaultValue="page-0">
                {FAQ.slice(0, 4).map((f, i) => (
                  <Collapsible key={i} value={`page-${i}`} question={f.q}>
                    <Text type="body">{f.a}</Text>
                  </Collapsible>
                ))}
              </CollapsibleGroup>
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
              <Card media={{type: 'icon', iconKey: 'gauge'}} title="Un seul tableau de bord" text="Chiffrage, suivi, devis et validation au même endroit, pour tous les sites." cta={{label: 'Découvrir', href: '#'}} />
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
                  <Button variant="primary" size="lg" arrow label="Faire mon chiffrage" />
                  <Button variant="ghost" size="lg" label="Demander une démo" />
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
                  <Card media={{type: 'number', value: v, suffix: s || undefined}} title={t} text={LOREM} />
                </GridSpan>
              ))}
          </Grid>
        </Container>
      </Section>
    </VStack>
  );
}
