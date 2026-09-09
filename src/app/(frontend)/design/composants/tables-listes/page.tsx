/* Page générée par scripts/gen-catalog.mjs (pnpm catalog:build). Démos Astryx d'origine, ou habillées Orbita (badge). */
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {PageIntro} from '../../_ui/PageIntro';
import {ShowcaseBlock} from '../../_ui/ShowcaseBlock';
import ItemShowcase from '../../_showcases/ItemShowcase';
import ListShowcase from '../../_showcases/ListShowcase';
import ListItemShowcase from '../../_showcases/ListItemShowcase';
import MetadataListShowcase from '../../_showcases/MetadataListShowcase';
import MetadataListItemShowcase from '../../_showcases/MetadataListItemShowcase';
import OverflowListShowcase from '../../_showcases/OverflowListShowcase';
import TableShowcase from '../../_showcases/TableShowcase';
import TreeListShowcase from '../../_showcases/TreeListShowcase';

export const metadata = {title: 'Tables & listes — Orbita × Astryx'};

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro eyebrow="Composants · 8" title="Tables & listes" lead="Données en lignes : tables, listes, arborescences." />
      <ShowcaseBlock name="Item" id="item" doc="item">
        <ItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="List" id="list" doc="list">
        <ListShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="ListItem" id="list-item" doc="list" parent="List">
        <ListItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="MetadataList" id="metadata-list" doc="metadata-list">
        <MetadataListShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="MetadataListItem" id="metadata-list-item" doc="metadata-list" parent="MetadataList">
        <MetadataListItemShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="OverflowList" id="overflow-list" doc="overflow-list">
        <OverflowListShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="Table" id="table" doc="table">
        <TableShowcase />
      </ShowcaseBlock>
      <ShowcaseBlock name="TreeList" id="tree-list" doc="tree-list">
        <TreeListShowcase />
      </ShowcaseBlock>
    </VStack>
  );
}
