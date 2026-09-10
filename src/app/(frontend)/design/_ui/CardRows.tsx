/* Rangées de cartes partagées (_showcases) entre CardShowcase (sans lien) et ClickableCardShowcase (avec lien). */
'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React from 'react';

import {Card} from '@/components/Card';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

export const IMG = (seed: string) => `https://picsum.photos/seed/${seed}/800/500`;
export const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export function Section({title, note, children}: {title: string; note?: string; children: React.ReactNode}) {
  return (
    <VStack gap={3}>
      <Heading level={3}>{title}</Heading>
      {note ? <Text type="supporting">{note}</Text> : null}
      {children}
    </VStack>
  );
}

/** Section nuit : même contenu dans un <Theme mode="dark">. */
export function Night({children}: {children: React.ReactNode}) {
  const {theme} = useOrbitaTheme();
  return (
    <Theme theme={theme} mode="dark">
      <VStack gap={8} padding={6} style={{background: 'var(--color-background-body)'}}>
        {children}
      </VStack>
    </Theme>
  );
}

type Cta = {label: string; href: string} | undefined;
const cta = (linked: boolean, label: string): Cta => (linked ? {label, href: '#'} : undefined);

/** Les quatre types de haut de carte, une rangée de quatre par type. */
export function BlocRows({linked, seed = ''}: {linked: boolean; seed?: string}) {
  return (
    <>
      <Section title="Bloc · image" note="Image pleine largeur de 230 px, titre centré avec son ornement, texte.">
        <Grid columns={{minWidth: 220, max: 4}} gap={4}>
          {[['bloc-a', 'Chiffrage instantané'], ['bloc-b', 'Suivi de chantier'], ['bloc-c', 'Devis client'], ['bloc-d', 'Maintenance multitechnique']].map(([s, t]) => (
            <Card key={s} media={{type: 'image', src: IMG(s + seed)}} title={t} text={LOREM} cta={cta(linked, 'Découvrir')} />
          ))}
        </Grid>
      </Section>

      <Section title="Bloc · icône" note="Icône Nucleo de 28 px dans son carré de 64 px, couleur silo.">
        <Grid columns={{minWidth: 220, max: 4}} gap={4}>
          {([['clipboard-check', 'Chiffrage instantané'], ['gauge', 'Suivi des coûts'], ['table', 'Devis structurés'], ['shield', 'Données sécurisées']] as const).map(([k, t]) => (
            <Card key={k} media={{type: 'icon', iconKey: k}} title={t} text={LOREM} cta={cta(linked, 'Découvrir')} />
          ))}
        </Grid>
      </Section>

      <Section title="Bloc · nombre" note="Grand nombre en Schibsted 800 couleur silo, préfixe et suffixe en highlight, espacés.">
        <Grid columns={{minWidth: 220, max: 4}} gap={4}>
          <Card media={{type: 'number', value: '1 000', suffix: 'm²'}} title="Seuil d'application" text={LOREM} cta={cta(linked, 'En savoir plus')} />
          <Card media={{type: 'number', value: '40', prefix: '−', suffix: '%'}} title="Objectif 2030" text={LOREM} cta={cta(linked, 'En savoir plus')} />
          <Card media={{type: 'number', value: '30/09'}} title="Date limite annuelle" text={LOREM} cta={cta(linked, 'En savoir plus')} />
          <Card media={{type: 'number', value: '850', prefix: '+'}} title="Courtiers équipés" text={LOREM} cta={cta(linked, 'En savoir plus')} />
        </Grid>
      </Section>

      <Section title="Bloc · titre seul" note="Sans média : le titre passe en couleur silo.">
        <Grid columns={{minWidth: 220, max: 4}} gap={4}>
          {['Architectes', "Maîtres d'œuvre", 'Promoteurs', 'Bailleurs sociaux'].map((t) => (
            <Card key={t} media={{type: 'none'}} accentTitle title={t} text={LOREM} cta={cta(linked, 'Découvrir')} />
          ))}
        </Grid>
      </Section>
    </>
  );
}

/** Trois articles et trois réalisations, sur trois colonnes. Toujours cliquables. */
export function EditorialRows({seed = ''}: {seed?: string}) {
  return (
    <>
      <Section title="Article" note="Chip de catégorie, date, titre limité à deux lignes. Chip pleine (cat) sur la troisième.">
        <Grid columns={{minWidth: 240, max: 3}} gap={4}>
          <Card preset="article" media={{type: 'image', src: IMG('post1' + seed)}} chip={{label: 'Chiffrage'}} date="12 sept. 2026" title="Du devis à la facturation : industrialiser le cycle commercial" cta={{label: 'Voir plus', href: '#'}} />
          <Card preset="article" media={{type: 'image', src: IMG('post2' + seed)}} chip={{label: 'Chantier'}} date="4 sept. 2026" title="Suivre un chantier multi-sites sans perdre le fil" cta={{label: 'Voir plus', href: '#'}} />
          <Card preset="article" media={{type: 'image', src: IMG('post3' + seed)}} chip={{label: 'Méthode', tone: 'cat'}} date="28 août 2026" title="Trois erreurs de chiffrage qui coûtent cher aux promoteurs" cta={{label: 'Voir plus', href: '#'}} />
        </Grid>
      </Section>

      <Section title="Réalisation" note="Chip accent, résultat chiffré, client et ville.">
        <Grid columns={{minWidth: 240, max: 3}} gap={4}>
          <Card preset="realisation" media={{type: 'image', src: IMG('work1' + seed)}} chip={{label: 'Réhabilitation', tone: 'accent'}} result="+34 % closing" title="14 logements, rue des Lilas" client={{name: 'Habitat Rhône', location: 'Lyon'}} cta={{label: "Voir l'étude", href: '#'}} />
          <Card preset="realisation" media={{type: 'image', src: IMG('work2' + seed)}} chip={{label: 'Tertiaire', tone: 'accent'}} result="−20 min / devis" title="Siège régional, 3 200 m²" client={{name: 'Groupe Alma', location: 'Nantes'}} cta={{label: "Voir l'étude", href: '#'}} />
          <Card preset="realisation" media={{type: 'image', src: IMG('work3' + seed)}} chip={{label: 'Industriel', tone: 'accent'}} result="48 h de délai" title="Extension d'atelier, 900 m²" client={{name: 'Mécanique Vallée', location: 'Grenoble'}} cta={{label: "Voir l'étude", href: '#'}} />
        </Grid>
      </Section>

      <Section title="En bref" note="Ni image ni cadre : chip, titre sur deux lignes, date. Le lien passe par le titre (pied de page).">
        <Grid columns={{minWidth: 240, max: 3}} gap={8}>
          <Card preset="brief" chip={{label: 'Chiffrage'}} date="02 / 06 / 2026" title="Du devis à la facturation : industrialiser le cycle commercial" cta={{label: 'Lire', href: '#'}} />
          <Card preset="brief" chip={{label: 'Méthode'}} date="27 / 05 / 2026" title="Métré automatique : fiabiliser ses quantités dès l'esquisse" cta={{label: 'Lire', href: '#'}} />
          <Card preset="brief" chip={{label: 'Terrain'}} date="19 / 05 / 2026" title="Suivi de chantier : garder le budget sous contrôle en temps réel" cta={{label: 'Lire', href: '#'}} />
        </Grid>
      </Section>
    </>
  );
}
