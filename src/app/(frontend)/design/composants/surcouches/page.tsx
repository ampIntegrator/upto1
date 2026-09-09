/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import BottomSheetShowcase from '../../_showcases/BottomSheetShowcase';
import BottomSheetSwitcherShowcase from '../../_showcases/BottomSheetSwitcherShowcase';
import CommandPaletteShowcase from '../../_showcases/CommandPaletteShowcase';
import CommandPaletteEmptyShowcase from '../../_showcases/CommandPaletteEmptyShowcase';
import CommandPaletteFooterShowcase from '../../_showcases/CommandPaletteFooterShowcase';
import CommandPaletteGroupShowcase from '../../_showcases/CommandPaletteGroupShowcase';
import CommandPaletteInputShowcase from '../../_showcases/CommandPaletteInputShowcase';
import CommandPaletteItemShowcase from '../../_showcases/CommandPaletteItemShowcase';
import CommandPaletteListShowcase from '../../_showcases/CommandPaletteListShowcase';
import ContextMenuShowcase from '../../_showcases/ContextMenuShowcase';
import ContextMenuItemShowcase from '../../_showcases/ContextMenuItemShowcase';
import DialogShowcase from '../../_showcases/DialogShowcase';
import DialogHeaderShowcase from '../../_showcases/DialogHeaderShowcase';
import HoverCardShowcase from '../../_showcases/HoverCardShowcase';
import LightboxShowcase from '../../_showcases/LightboxShowcase';
import OverlayShowcase from '../../_showcases/OverlayShowcase';
import PopoverShowcase from '../../_showcases/PopoverShowcase';
import TooltipShowcase from '../../_showcases/TooltipShowcase';

export const metadata = {title: 'Surcouches — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 18" title="Surcouches" lead="Dialogues, popovers, infobulles et panneaux flottants." />
      <ShowcaseBlock name="BottomSheet" id="bottom-sheet" doc="bottom-sheet">
        <BottomSheetShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="BottomSheetSwitcher" id="bottom-sheet-switcher" doc="bottom-sheet-switcher">
        <BottomSheetSwitcherShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CommandPalette" id="command-palette" doc="command-palette">
        <CommandPaletteShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CommandPaletteEmpty" id="command-palette-empty" doc="command-palette" parent="CommandPalette">
        <CommandPaletteEmptyShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CommandPaletteFooter" id="command-palette-footer" doc="command-palette" parent="CommandPalette">
        <CommandPaletteFooterShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CommandPaletteGroup" id="command-palette-group" doc="command-palette" parent="CommandPalette">
        <CommandPaletteGroupShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CommandPaletteInput" id="command-palette-input" doc="command-palette" parent="CommandPalette">
        <CommandPaletteInputShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CommandPaletteItem" id="command-palette-item" doc="command-palette" parent="CommandPalette">
        <CommandPaletteItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="CommandPaletteList" id="command-palette-list" doc="command-palette" parent="CommandPalette">
        <CommandPaletteListShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ContextMenu" id="context-menu" doc="context-menu">
        <ContextMenuShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ContextMenuItem" id="context-menu-item" doc="context-menu" parent="ContextMenu">
        <ContextMenuItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Dialog" id="dialog" doc="dialog" dressed>
        <DialogShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="DialogHeader" id="dialog-header" doc="dialog" parent="Dialog">
        <DialogHeaderShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="HoverCard" id="hover-card" doc="hover-card">
        <HoverCardShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Lightbox" id="lightbox" doc="lightbox">
        <LightboxShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Overlay" id="overlay" doc="overlay">
        <OverlayShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Popover" id="popover" doc="popover">
        <PopoverShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Tooltip" id="tooltip" doc="tooltip">
        <TooltipShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
