import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

/** En-tête de page du catalogue : eyebrow Orbita + titre display + chapô. */
export function PageIntro({eyebrow, title, lead}: {eyebrow: string; title: React.ReactNode; lead?: string}) {
  return (
    <VStack gap={2}>
      <Text type="eyebrow">{eyebrow}</Text>
      <Heading level={1} type="display-3">
        {title}
      </Heading>
      {lead ? (
        <Text type="large" color="secondary">
          {lead}
        </Text>
      ) : null}
    </VStack>
  );
}
