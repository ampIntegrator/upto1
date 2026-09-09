/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import TopNavMegaMenuFeaturedCardShowcase from '../../../_showcases/TopNavMegaMenuFeaturedCardShowcase';
import {ShowcaseBlock} from '../../../_ui/ShowcaseBlock';
import {ComponentNav} from '../../../_ui/ComponentNav';

export const metadata = {title: 'Top Nav Mega Menu Featured Card — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="TopNavMegaMenuFeaturedCard" id="top-nav-mega-menu-featured-card" doc="top-nav-mega-menu" parent="TopNavMegaMenu" category="Navigation">
        <TopNavMegaMenuFeaturedCardShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="top-nav-mega-menu-featured-card" />
    </VStack>
  );
}
