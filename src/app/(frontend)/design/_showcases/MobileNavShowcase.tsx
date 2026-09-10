/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION (tiroir mobile) */
'use client';

import {IconButton} from '@astryxdesign/core/IconButton';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {MenuIcon} from '@/theme/icons/nucleo';

export default function MobileNavShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <VStack gap={6} align="start">
      <Text type="body" color="secondary">Le tiroir de navigation mobile, ouvert par le burger de SiteHeader sous 1280 px. Il reprend la navigation : liens directs, puis une section par menu.</Text>
      <IconButton label="Ouvrir le menu" icon={<MenuIcon />} variant="ghost" onClick={() => setIsOpen(true)} />
      <MobileNav isOpen={isOpen} onOpenChange={setIsOpen} header="Vidomia">
        <SideNavSection title="Solutions">
          <SideNavItem label="Chiffrage instantané" href="#" />
          <SideNavItem label="Suivi de chantier" href="#" />
          <SideNavItem label="Devis client" href="#" />
        </SideNavSection>
        <SideNavSection title="Ressources">
          <SideNavItem label="Guides & livres blancs" href="#" />
          <SideNavItem label="Webinaires" href="#" />
          <SideNavItem label="Blog" href="#" />
        </SideNavSection>
        <SideNavItem label="Tarifs" href="#" isSelected />
        <SideNavItem label="À propos" href="#" />
      </MobileNav>
    </VStack>
  );
}
