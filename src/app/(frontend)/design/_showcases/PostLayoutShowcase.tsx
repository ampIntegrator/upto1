/* Design-system-specific component: src/components/PostLayout (sidebar and prose, mockups 18 and 23). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {PostLayout} from '@/components/PostLayout';
import {PostToc} from '@/components/PostToc';
import {RichText} from '@/components/RichText';
import {richTextHeadings} from '@/components/rich-text';
import {POST_DOC, renderDemoBlock} from './post.shared';

export default function PostLayoutShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Le corps d’un article : barre latérale à gauche (sommaire, ou fiche d’une réalisation), texte à droite sur 760 px au plus, avec les figures insérées (bandeau de chiffres, « À retenir », bandeau d’appel, carte citation, galerie). Sous 1024 px, la barre passe au-dessus.</Text>
      <PostLayout sidebar={<PostToc items={richTextHeadings(POST_DOC)} />}>
        <RichText content={POST_DOC} size="prose" renderBlock={renderDemoBlock} />
      </PostLayout>
    </VStack>
  );
}
