/* Showcase habillé Orbita — thème : orbita.ts section NAVIGATION */
'use client';

import {BreadcrumbItem, Breadcrumbs} from '@astryxdesign/core/Breadcrumbs';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {ChevronRightIcon, HomeIcon} from '@/theme/icons/nucleo';

export default function BreadcrumbItemShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Un maillon du fil : lien vers un ancêtre, ou texte de la page courante avec isCurrent.</Text>
      <Breadcrumbs label="Fil d'Ariane" separator={<ChevronRightIcon width={12} height={12} />}>
        <BreadcrumbItem href="#" startIcon={<HomeIcon width={14} height={14} />}><span className="visually-hidden">Accueil</span></BreadcrumbItem>
        <BreadcrumbItem isCurrent>Tarifs & offres</BreadcrumbItem>
      </Breadcrumbs>
    </VStack>
  );
}
