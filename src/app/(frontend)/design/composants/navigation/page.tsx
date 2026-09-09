/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import BreadcrumbsShowcase from '../../_showcases/BreadcrumbsShowcase';
import BreadcrumbItemShowcase from '../../_showcases/BreadcrumbItemShowcase';
import MobileNavShowcase from '../../_showcases/MobileNavShowcase';
import MobileNavToggleShowcase from '../../_showcases/MobileNavToggleShowcase';
import NavHeadingMenuShowcase from '../../_showcases/NavHeadingMenuShowcase';
import NavIconShowcase from '../../_showcases/NavIconShowcase';
import OutlineShowcase from '../../_showcases/OutlineShowcase';
import SideNavShowcase from '../../_showcases/SideNavShowcase';
import SideNavCollapseButtonShowcase from '../../_showcases/SideNavCollapseButtonShowcase';
import SideNavHeadingShowcase from '../../_showcases/SideNavHeadingShowcase';
import SideNavItemShowcase from '../../_showcases/SideNavItemShowcase';
import SideNavSectionShowcase from '../../_showcases/SideNavSectionShowcase';
import StepShowcase from '../../_showcases/StepShowcase';
import StepperShowcase from '../../_showcases/StepperShowcase';
import TabShowcase from '../../_showcases/TabShowcase';
import TabListShowcase from '../../_showcases/TabListShowcase';
import TabMenuShowcase from '../../_showcases/TabMenuShowcase';
import TopNavShowcase from '../../_showcases/TopNavShowcase';
import TopNavHeadingShowcase from '../../_showcases/TopNavHeadingShowcase';
import TopNavItemShowcase from '../../_showcases/TopNavItemShowcase';
import TopNavMegaMenuShowcase from '../../_showcases/TopNavMegaMenuShowcase';
import TopNavMegaMenuFeaturedCardShowcase from '../../_showcases/TopNavMegaMenuFeaturedCardShowcase';
import TopNavMegaMenuItemShowcase from '../../_showcases/TopNavMegaMenuItemShowcase';
import TopNavMenuShowcase from '../../_showcases/TopNavMenuShowcase';

export const metadata = {title: 'Navigation — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 24" title="Navigation" lead="Se déplacer dans le site ou dans la page." />
      <ShowcaseBlock name="Breadcrumbs" id="breadcrumbs" doc="breadcrumbs">
        <BreadcrumbsShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="BreadcrumbItem" id="breadcrumb-item" doc="breadcrumbs" parent="Breadcrumbs">
        <BreadcrumbItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="MobileNav" id="mobile-nav" doc="mobile-nav">
        <MobileNavShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="MobileNavToggle" id="mobile-nav-toggle" doc="mobile-nav" parent="MobileNav">
        <MobileNavToggleShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="NavHeadingMenu" id="nav-heading-menu" doc="side-nav" parent="SideNav">
        <NavHeadingMenuShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="NavIcon" id="nav-icon" doc="nav-icon">
        <NavIconShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Outline" id="outline" doc="outline">
        <OutlineShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SideNav" id="side-nav" doc="side-nav">
        <SideNavShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SideNavCollapseButton" id="side-nav-collapse-button" doc="side-nav" parent="SideNav">
        <SideNavCollapseButtonShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SideNavHeading" id="side-nav-heading" doc="side-nav" parent="SideNav">
        <SideNavHeadingShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SideNavItem" id="side-nav-item" doc="side-nav" parent="SideNav">
        <SideNavItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="SideNavSection" id="side-nav-section" doc="side-nav" parent="SideNav">
        <SideNavSectionShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Step" id="step" doc="stepper" parent="Stepper">
        <StepShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Stepper" id="stepper" doc="stepper">
        <StepperShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Tab" id="tab" doc="tab-list" parent="TabList">
        <TabShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TabList" id="tab-list" doc="tab-list">
        <TabListShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TabMenu" id="tab-menu" doc="tab-list" parent="TabList">
        <TabMenuShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TopNav" id="top-nav" doc="top-nav">
        <TopNavShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TopNavHeading" id="top-nav-heading" doc="top-nav" parent="TopNav">
        <TopNavHeadingShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TopNavItem" id="top-nav-item" doc="top-nav" parent="TopNav">
        <TopNavItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TopNavMegaMenu" id="top-nav-mega-menu" doc="top-nav" parent="TopNav">
        <TopNavMegaMenuShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TopNavMegaMenuFeaturedCard" id="top-nav-mega-menu-featured-card" doc="top-nav-mega-menu" parent="TopNavMegaMenu">
        <TopNavMegaMenuFeaturedCardShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TopNavMegaMenuItem" id="top-nav-mega-menu-item" doc="top-nav-mega-menu" parent="TopNavMegaMenu">
        <TopNavMegaMenuItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TopNavMenu" id="top-nav-menu" doc="top-nav" parent="TopNav">
        <TopNavMenuShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
