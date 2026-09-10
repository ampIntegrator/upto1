/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import AppShellShowcase from '../../_showcases/AppShellShowcase';
import {ComponentNav} from '../../_ui/ComponentNav';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';

export const metadata = {title: 'App Shell — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={8}>
      <ShowcaseBlock name="AppShell" id="app-shell" doc={"app-shell"} category="Mise en page">
        <AppShellShowcase />
      </ShowcaseBlock>
      <ComponentNav category="mise-en-page" current="app-shell" />
    </VStack>
  );
}
