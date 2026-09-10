/* Composant propre au design system : src/components/SiteFooter (pied de page, assemblage sur nuit profonde). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {SiteFooter} from '@/components/SiteFooter';
import {SITE_FOOTER, SITE_HEADER} from '../_ui/siteNav';

export default function SiteFooterShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le pied de page complet, identique sur toutes les pages : lettre d'information (champ + bouton), derniers articles en bref (Card « brief »), marque avec coordonnées et réseaux (les mêmes que le bandeau de l'en-tête), trois piles de liens, barre basse. Le bouton fixe « haut de page » apparaît après 200 px de défilement (voir les pages « Mise en page »). Deux jeux de données : le pied de page lui-même et les coordonnées partagées.
      </Text>
      <VStack style={{border: 'var(--border-width) solid var(--color-border)'}}>
        <SiteFooter {...SITE_FOOTER} strip={SITE_HEADER.strip} backToTop={false} />
      </VStack>
    </VStack>
  );
}
