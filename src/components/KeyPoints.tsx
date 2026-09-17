/**
 * KeyPoints — « À retenir » (mockup 18, captures 01/02-_blog-newblocks): a bordered, shadowed
 * panel with an eyebrow after a gold dash, then the points as a rich text list (diamond
 * bullets, bold runs). Inserted in a post's prose or placed in a column.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {RichText, type RichTextDocument} from './RichText';
import styles from './KeyPoints.module.css';

export type KeyPointsProps = {
  eyebrow?: string;
  /** the points: a rich text document (a list) or any node */
  content: RichTextDocument | React.ReactNode;
};

const isDocument = (c: KeyPointsProps['content']): c is RichTextDocument => Boolean(c && typeof c === 'object' && 'root' in (c as object));

export function KeyPoints({eyebrow = 'À retenir', content}: KeyPointsProps) {
  return (
    <VStack as="aside" gap={4} className={styles.root}>
      {eyebrow ? (
        <HStack gap={3} vAlign="center" className={styles.eyebrow}>
          <Text type="eyebrow-mono" className={styles.eyebrowText}>{eyebrow}</Text>
        </HStack>
      ) : null}
      {isDocument(content) ? <RichText content={content} /> : <VStack gap={3}>{content}</VStack>}
    </VStack>
  );
}
