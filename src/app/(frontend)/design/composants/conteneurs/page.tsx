/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import CardShowcase from '../../_showcases/CardShowcase';
import CarouselShowcase from '../../_showcases/CarouselShowcase';
import ClickableCardShowcase from '../../_showcases/ClickableCardShowcase';
import CollapsibleShowcase from '../../_showcases/CollapsibleShowcase';
import CollapsibleGroupShowcase from '../../_showcases/CollapsibleGroupShowcase';
import SelectableCardShowcase from '../../_showcases/SelectableCardShowcase';

export const metadata = {title: 'Conteneurs — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 6" title="Conteneurs" lead="Cartes et surfaces qui regroupent du contenu." />
      <ShowcaseBlock name="Card" id="card" doc="card">
        <CardShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Carousel" id="carousel" doc="carousel">
        <CarouselShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ClickableCard" id="clickable-card" doc="clickable-card">
        <ClickableCardShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Collapsible" id="collapsible" doc="collapsible">
        <CollapsibleShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CollapsibleGroup" id="collapsible-group" doc="collapsible" parent="Collapsible">
        <CollapsibleGroupShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SelectableCard" id="selectable-card" doc="selectable-card">
        <SelectableCardShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
