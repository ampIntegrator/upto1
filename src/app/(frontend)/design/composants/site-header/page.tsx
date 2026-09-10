/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import SiteHeaderShowcase from '../../_showcases/SiteHeaderShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Site Header — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="SiteHeader" id="site-header" doc={null} dressed category="Navigation">
        <SiteHeaderShowcase />
      </ShowcaseBlock>
      <ComponentNav category="navigation" current="site-header" />
    </VStack>
  );
}
