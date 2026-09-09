/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaCard */
'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {OrbitaCard} from '@/components/OrbitaCard';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

const IMG = (seed: string) => `https://picsum.photos/seed/${seed}/800/500`;
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

function Section({title, note, children}: {title: string; note?: string; children: React.ReactNode}) {
  return (
    <VStack gap={3}>
      <Heading level={3}>{title}</Heading>
      {note ? <Text type="supporting">{note}</Text> : null}
      {children}
    </VStack>
  );
}

function Articles() {
  return (
    <Grid columns={{minWidth: 240, max: 4}} gap={4}>
      <OrbitaCard preset="article" media={{type: 'image', src: IMG('post1')}} chip={{label: 'Chiffrage'}} date="12 sept. 2026" title="Du devis à la facturation : industrialiser le cycle commercial" cta={{label: 'Voir plus', href: '#'}} />
      <OrbitaCard preset="article" media={{type: 'image', src: IMG('post2')}} chip={{label: 'Chantier'}} date="4 sept. 2026" title="Suivre un chantier multi-sites sans perdre le fil" cta={{label: 'Voir plus', href: '#'}} />
      <OrbitaCard preset="article" media={{type: 'image', src: IMG('post3')}} chip={{label: 'Méthode', tone: 'cat'}} date="28 août 2026" title="Trois erreurs de chiffrage qui coûtent cher aux promoteurs" cta={{label: 'Voir plus', href: '#'}} />
    </Grid>
  );
}

function Realisations() {
  return (
    <Grid columns={{minWidth: 240, max: 4}} gap={4}>
      <OrbitaCard preset="realisation" media={{type: 'image', src: IMG('work1')}} chip={{label: 'Réhabilitation', tone: 'accent'}} result="+34 % closing" title="14 logements, rue des Lilas" client={{name: 'Habitat Rhône', location: 'Lyon'}} cta={{label: "Voir l'étude", href: '#'}} />
      <OrbitaCard preset="realisation" media={{type: 'image', src: IMG('work2')}} chip={{label: 'Tertiaire', tone: 'accent'}} result="−20 min / devis" title="Siège régional, 3 200 m²" client={{name: 'Groupe Alma', location: 'Nantes'}} cta={{label: "Voir l'étude", href: '#'}} />
      <OrbitaCard preset="realisation" media={{type: 'image', src: IMG('work3')}} chip={{label: 'Industriel', tone: 'accent'}} result="48 h de délai" title="Extension d'atelier, 900 m²" client={{name: 'Mécanique Vallée', location: 'Grenoble'}} cta={{label: "Voir l'étude", href: '#'}} />
    </Grid>
  );
}

export default function CardShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Un seul châssis de carte, trois préréglages. Bloc : quatre médias au choix, titre centré avec son ornement au losange, texte, barre d'action qui se remplit au survol. Article et réalisation : image 16/10, métadonnées, titre sur deux lignes, carte entière cliquable. Le titre est un Heading de type card : h3 ou h4 en admin, même rendu.
      </Text>

      <Section title="Bloc · quatre médias" note="Image pleine largeur, icône, nombre, titre seul en couleur silo.">
        <Grid columns={{minWidth: 220, max: 4}} gap={4}>
          <OrbitaCard media={{type: 'image', src: IMG('bloc1')}} title="Chiffrage instantané" text={LOREM} cta={{label: 'Découvrir', href: '#'}} />
          <OrbitaCard media={{type: 'icon', iconKey: 'clipboard-check'}} title="Devis en 20 minutes" text={LOREM} cta={{label: 'Découvrir', href: '#'}} />
          <OrbitaCard media={{type: 'number', value: '850', sign: '+'}} title="Courtiers équipés" text={LOREM} cta={{label: 'Découvrir', href: '#'}} />
          <OrbitaCard media={{type: 'none'}} accentTitle title="Suivi de chantier" text={LOREM} cta={{label: 'Découvrir', href: '#'}} />
        </Grid>
      </Section>

      <Section title="Article" note="Chip de catégorie, date, titre limité à deux lignes. Chip pleine (cat) sur la troisième.">
        <Articles />
      </Section>

      <Section title="Réalisation" note="Chip accent, résultat chiffré, client et ville.">
        <Realisations />
      </Section>

      <Section title="Nuit" note="Mêmes cartes dans une section nuit.">
        <Theme theme={theme} mode="dark">
          <VStack gap={6} padding={6} style={{background: 'var(--color-background-body)'}}>
            <Grid columns={{minWidth: 220, max: 4}} gap={4}>
              <OrbitaCard media={{type: 'icon', iconKey: 'gauge'}} title="Devis en 20 minutes" text={LOREM} cta={{label: 'Découvrir', href: '#'}} />
              <OrbitaCard media={{type: 'number', value: '34', sign: '%'}} title="De closing en plus" text={LOREM} cta={{label: 'Découvrir', href: '#'}} />
            </Grid>
            <Realisations />
          </VStack>
        </Theme>
      </Section>
    </VStack>
  );
}
