/* Composant propre au design system : src/components/Hero (haut de page, 3 dispositions / 5 maquettes). */
'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Hero} from '@/components/Hero';

const IMG = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=70&auto=format&fit=crop';

export default function HeroShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le haut de page, un seul composant à trois dispositions : plein écran sur média (maquette 16), plein écran texte et image (maquette 02), haut de page de 500 px (maquette 25) avec trois fonds. Chaque page de démonstration du menu en montre une en situation, sous l'en-tête. Ici, sans réserve d'en-tête et à hauteur réduite pour le catalogue.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Haut de page · image (25 A)</Heading>
        <Hero variant="page" background="image" image={{src: IMG}} overlay={0.5} underHeader={false} eyebrow="Plateforme" title={'Le chiffrage,\n<span>de A à Z.</span>'} lead="Du métré au devis signé, une seule plateforme pour estimer juste." primary={{label: 'Demander une démo', href: '#'}} secondary={{label: 'Voir la vidéo', href: '#', iconKey: 'play'}} breadcrumb={{items: [], current: 'Nos solutions'}} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Haut de page · clair à lueur (25 B)</Heading>
        <Hero variant="page" background="glow" underHeader={false} eyebrow="Tarification" title={'Un prix clair,\n<span>sans surprise.</span>'} lead="Sans engagement, sans frais cachés, résiliable en un clic." primary={{label: 'Voir les tarifs', href: '#'}} secondary={{label: 'Parler à un conseiller', href: '#', iconKey: 'phone'}} breadcrumb={{items: [], current: 'Tarifs & offres'}} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Haut de page · nuit à halos (25 C)</Heading>
        <Hero variant="page" background="night-halo" underHeader={false} eyebrow="Support" title={'Une question ?\n<span>On vous répond.</span>'} lead="Trouvez la réponse en quelques minutes, ou parlez à un humain." primary={{label: "Centre d'aide", href: '#'}} secondary={{label: 'Nous écrire', href: '#', iconKey: 'mail'}} breadcrumb={{items: [], current: 'Support'}} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Plein écran · texte et image (02)</Heading>
        <Text type="supporting">Ici la hauteur suit le contenu ; en page, 100 vh.</Text>
        <Hero variant="split" underHeader={false} eyebrow="850+ courtiers actifs · Mis à jour aujourd'hui" title={'Chiffrez les travaux\n<span>en 20 minutes.</span>\nSans artisan.'} lead="Estimation détaillée, validée expert, livrable client en moins de 48 heures." primary={{label: 'Faire mon 1er chiffrage', href: '#'}} secondary={{label: 'Voir un exemple', href: '#'}} reassurance={['1er chiffrage offert', 'Sans carte bancaire']} media={{src: IMG, badges: [{label: '20 min chrono', tone: 'night'}, {label: '+34 % closing', tone: 'accent'}]}} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Plein écran · média (16)</Heading>
        <Text type="supporting">Voir la page « hero média » du menu pour la version 100 vh avec l'en-tête.</Text>
        <Hero variant="media" background="image" image={{src: IMG}} overlay={0.3} eyebrow="L'IA au service du bâtiment" title={"Toute la chaîne bâtiment,\n<span>d'un seul outil.</span>\nDu chiffrage à la maintenance."} lead="Du chiffrage de travaux à la maintenance multitechnique." primary={{label: 'Demander une démo', href: '#'}} secondary={{label: 'Voir la vidéo', href: '#', iconKey: 'play'}} scrollHint="Défiler" />
      </VStack>
    </VStack>
  );
}
