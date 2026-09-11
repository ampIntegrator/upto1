/**
 * BreadcrumbBand — la bande fil d'Ariane sous un haut de page (maquette 25) :
 * Section papier à filets, 44 px de haut, contenu sur une ligne (défilement latéral
 * si le fil est trop long, réglé par le thème), accueil en icône maison ou en texte (réglage du site).
 * Assemblage Astryx (Breadcrumbs, VisuallyHidden) ; utilisé par le futur bloc Haut de page.
 */
import {BreadcrumbItem, Breadcrumbs} from '@astryxdesign/core/Breadcrumbs';
import {HStack} from '@astryxdesign/core/Stack';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import React from 'react';

import {ChevronRightIcon, HomeIcon} from '@/theme/icons/nucleo';
import {Container} from './Container';
import {Section} from './Section';

export type BreadcrumbBandProps = {
  /** maillons intermédiaires (l'accueil est ajouté devant) */
  items: Array<{label: string; href?: string}>;
  /** page courante (dernier maillon, sans lien) */
  current: string;
  homeHref?: string;
  /** libellé de l'accueil : affiché si `homeStyle="text"`, sinon réservé aux lecteurs d'écran (réglage du site) */
  homeLabel?: string;
  homeStyle?: 'icon' | 'text';
};

export function BreadcrumbBand({items, current, homeHref = '/', homeLabel = 'Accueil', homeStyle = 'icon'}: BreadcrumbBandProps) {
  return (
    <Section background="paper" spacing="none" dividers>
      <Container>
        <HStack height={44} vAlign="center">
          <Breadcrumbs label="Fil d'Ariane" separator={<ChevronRightIcon width={12} height={12} />}>
            {homeStyle === 'text' ? (
              <BreadcrumbItem href={homeHref}>{homeLabel}</BreadcrumbItem>
            ) : (
              <BreadcrumbItem href={homeHref} startIcon={<HomeIcon width={14} height={14} />}>
                <VisuallyHidden>{homeLabel}</VisuallyHidden>
              </BreadcrumbItem>
            )}
            {items.map((it) => (
              <BreadcrumbItem key={it.label} href={it.href}>
                {it.label}
              </BreadcrumbItem>
            ))}
            <BreadcrumbItem isCurrent>{current}</BreadcrumbItem>
          </Breadcrumbs>
        </HStack>
      </Container>
    </Section>
  );
}
