/* Design-system-specific component: src/components/PostToc (table of contents, mockup 18). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PostToc} from '@/components/PostToc';
import {richTextHeadings} from '@/components/rich-text';
import {POST_DOC} from './post.shared';

export default function PostTocShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le sommaire d’un article : surtitre « Sommaire » avec filet or, puis l’Outline du thème sur les h2, h3 et h4 du texte (suivi de lecture intégré, indicateur glissant en silo). Collé 30 px sous le header replié ; sous 1024 px, un « Sommaire » repliable au-dessus du texte. Démonstration du suivi : Page · article de blog (18).</Text>
      <VStack style={{maxWidth: 300}}>
        <PostToc items={richTextHeadings(POST_DOC)} />
      </VStack>
    </VStack>
  );
}
