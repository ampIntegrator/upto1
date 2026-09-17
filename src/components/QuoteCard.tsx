/**
 * QuoteCard — the quote card (mockup 23 .case-quote, capture _c23-quote): a paper card with a
 * shadow and a 4 px gold bar, the quote in serif italic, then the person: a 48 px square
 * avatar (Astryx Avatar, dressed by the theme), the name in semibold and the role.
 */
import {Avatar} from '@astryxdesign/core/Avatar';
import {Blockquote} from '@astryxdesign/core/Blockquote';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import styles from './QuoteCard.module.css';

export type QuoteCardProps = {
  quote: string;
  name: string;
  role?: string;
  photo?: {src: string; alt?: string};
};

export function QuoteCard({quote, name, role, photo}: QuoteCardProps) {
  return (
    <VStack as="figure" gap={5} className={styles.root}>
      <Blockquote className={styles.quote}>{quote}</Blockquote>
      <HStack as="figcaption" gap={3} vAlign="center">
        {photo?.src ? <Avatar src={photo.src} alt={photo.alt ?? name} name={name} size={48} shape="square" tooltip={false} /> : null}
        <VStack gap={0.5}>
          <Text className={styles.name}>{name}</Text>
          {role ? <Text className={styles.role}>{role}</Text> : null}
        </VStack>
      </HStack>
    </VStack>
  );
}
