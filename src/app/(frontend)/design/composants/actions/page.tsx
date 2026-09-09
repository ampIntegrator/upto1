/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import ButtonShowcase from '../../_showcases/ButtonShowcase';
import ButtonGroupShowcase from '../../_showcases/ButtonGroupShowcase';
import DropdownMenuShowcase from '../../_showcases/DropdownMenuShowcase';
import DropdownMenuItemShowcase from '../../_showcases/DropdownMenuItemShowcase';
import IconButtonShowcase from '../../_showcases/IconButtonShowcase';
import LinkShowcase from '../../_showcases/LinkShowcase';
import MoreMenuShowcase from '../../_showcases/MoreMenuShowcase';
import SegmentedControlShowcase from '../../_showcases/SegmentedControlShowcase';
import SegmentedControlItemShowcase from '../../_showcases/SegmentedControlItemShowcase';
import ToggleButtonShowcase from '../../_showcases/ToggleButtonShowcase';
import ToggleButtonGroupShowcase from '../../_showcases/ToggleButtonGroupShowcase';

export const metadata = {title: 'Actions — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 11" title="Actions" lead="Boutons, menus et contrôles qui déclenchent une action." />
      <ShowcaseBlock name="Button" id="button" doc="button" dressed>
        <ButtonShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ButtonGroup" id="button-group" doc="button-group">
        <ButtonGroupShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="DropdownMenu" id="dropdown-menu" doc="dropdown-menu">
        <DropdownMenuShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="DropdownMenuItem" id="dropdown-menu-item" doc="dropdown-menu" parent="DropdownMenu">
        <DropdownMenuItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="IconButton" id="icon-button" doc="icon-button">
        <IconButtonShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Link" id="link" doc="link">
        <LinkShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="MoreMenu" id="more-menu" doc="more-menu">
        <MoreMenuShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SegmentedControl" id="segmented-control" doc="segmented-control">
        <SegmentedControlShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SegmentedControlItem" id="segmented-control-item" doc="segmented-control" parent="SegmentedControl">
        <SegmentedControlItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ToggleButton" id="toggle-button" doc="toggle-button">
        <ToggleButtonShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ToggleButtonGroup" id="toggle-button-group" doc="toggle-button-group">
        <ToggleButtonGroupShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
