/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION (méga-menu, maquette 01) */
'use client';

import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TopNav, TopNavHeading, TopNavItem, TopNavMegaMenu, TopNavMegaMenuFeaturedCard, TopNavMegaMenuItem} from '@astryxdesign/core/TopNav';
import React from 'react';

import {CalculatorIcon, RulerIcon, ShieldIcon} from '@/theme/icons/nucleo';

export default function TopNavMegaMenuShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le méga-menu : des items à icône, titre et description, et une carte mise en avant avec image sur fond nuit. Survolez Solutions. Dans SiteHeader, les items sont groupés en colonnes sous un eyebrow.</Text>
      <VStack style={{border: 'var(--border-width) solid var(--color-border)', minHeight: 420}}>
        <TopNav
          label="Méga-menu"
          heading={<TopNavHeading heading="Vidomia" />}
          startContent={
            <HStack vAlign="stretch">
              <TopNavMegaMenu
                label="Solutions"
                items={
                  <>
                    <TopNavMegaMenuItem title="Chiffrage instantané" description="Estimez vos travaux en 20 minutes, sans artisan." icon={<ShieldIcon width={24} height={24} />} href="#" />
                    <TopNavMegaMenuItem title="Suivi de chantier" description="Pilotez l'avancement et les coûts en temps réel." icon={<CalculatorIcon width={24} height={24} />} href="#" />
                    <TopNavMegaMenuItem title="Devis client" description="Générez un livrable pro, validé par un expert." icon={<RulerIcon width={24} height={24} />} href="#" />
                  </>
                }
                featured={<TopNavMegaMenuFeaturedCard title="Chiffrer juste, gagner plus." description="Comment 1 200 pros ont réduit leurs délais de devis de 40 % en six mois." image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=70&auto=format&fit=crop" linkLabel="Lire l'étude" linkHref="#" />}
              />
              <TopNavItem label="Tarifs" href="#" />
            </HStack>
          }
        />
      </VStack>
    </VStack>
  );
}
