/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import EmptyStateShowcase from '../../_showcases/EmptyStateShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'Empty State — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="EmptyState" id="empty-state" doc="empty-state" category="Contenu">
        <EmptyStateShowcase />
      </ShowcaseBlock>
      <ComponentNav category="contenu" current="empty-state" />
    </VStack>
  );
}
