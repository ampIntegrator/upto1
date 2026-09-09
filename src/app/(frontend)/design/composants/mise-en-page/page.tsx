/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import AppShellShowcase from '../../_showcases/AppShellShowcase';
import AspectRatioShowcase from '../../_showcases/AspectRatioShowcase';
import CenterShowcase from '../../_showcases/CenterShowcase';
import DividerShowcase from '../../_showcases/DividerShowcase';
import GridShowcase from '../../_showcases/GridShowcase';
import GridSpanShowcase from '../../_showcases/GridSpanShowcase';
import HStackShowcase from '../../_showcases/HStackShowcase';
import LayoutShowcase from '../../_showcases/LayoutShowcase';
import LayoutContentShowcase from '../../_showcases/LayoutContentShowcase';
import LayoutFooterShowcase from '../../_showcases/LayoutFooterShowcase';
import LayoutHeaderShowcase from '../../_showcases/LayoutHeaderShowcase';
import LayoutPanelShowcase from '../../_showcases/LayoutPanelShowcase';
import ResizableShowcase from '../../_showcases/ResizableShowcase';
import StackItemShowcase from '../../_showcases/StackItemShowcase';
import VStackShowcase from '../../_showcases/VStackShowcase';

export const metadata = {title: 'Mise en page — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 15" title="Mise en page" lead="Coquille d'application, grilles, piles et sections." />
      <ShowcaseBlock name="AppShell" id="app-shell" doc="app-shell">
        <AppShellShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="AspectRatio" id="aspect-ratio" doc="aspect-ratio">
        <AspectRatioShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Center" id="center" doc="center">
        <CenterShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Divider" id="divider" doc="divider">
        <DividerShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Grid" id="grid" doc="grid">
        <GridShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="GridSpan" id="grid-span" doc="grid" parent="Grid">
        <GridSpanShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="HStack" id="hstack" doc="stack" parent="Stack">
        <HStackShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Layout" id="layout" doc="layout">
        <LayoutShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="LayoutContent" id="layout-content" doc="layout" parent="Layout">
        <LayoutContentShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="LayoutFooter" id="layout-footer" doc="layout" parent="Layout">
        <LayoutFooterShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="LayoutHeader" id="layout-header" doc="layout" parent="Layout">
        <LayoutHeaderShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="LayoutPanel" id="layout-panel" doc="layout" parent="Layout">
        <LayoutPanelShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Resizable" id="resizable" doc="resizable">
        <ResizableShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="StackItem" id="stack-item" doc="stack" parent="Stack">
        <StackItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="VStack" id="vstack" doc="stack" parent="Stack">
        <VStackShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
