import {Token} from '@astryxdesign/core/Token';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Link} from '@astryxdesign/core/Link';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

/** A catalog component: anchored title, status (styled by the theme or original demo), doc link, demo inside a card. */
export function ShowcaseBlock({
  name,
  id,
  doc,
  parent,
  dressed = false,
  category,
  children,
}: {
  name: string;
  id: string;
  /** slug of the doc page astryx.atmeta.com/components/<doc>; null = DS-specific component */
  doc: string | null;
  /** parent component when this is a sub-part (e.g. TabMenu → TabList) */
  parent?: string;
  /** styled by the theme: custom demo instead of the original one */
  dressed?: boolean;
  /** category (shown as eyebrow) */
  category?: string;
  children: React.ReactNode;
}) {
  return (
    <VStack gap={3}>
      <HStack gap={3} vAlign="center" hAlign="between" wrap="wrap">
        <VStack gap={0.5}>
          {category ? <Text type="eyebrow">{category}</Text> : null}
          <HStack gap={3} vAlign="center">
            <Heading level={1} type="display-3" id={id}>
              {name}
            </Heading>
            <Token label={dressed ? 'Habillé' : 'À habiller'} color={dressed ? 'green' : 'gray'} size="sm" />
          </HStack>
          {parent ? <Text type="supporting">Sous-composant de {parent}</Text> : null}
        </VStack>
        {doc ? (
          <Link href={`https://astryx.atmeta.com/components/${doc}`} target="_blank" rel="noreferrer">
            Doc Astryx
          </Link>
        ) : (
          <Text type="supporting">Composant du design system</Text>
        )}
      </HStack>
      <Card padding={6}>{children}</Card>
    </VStack>
  );
}
