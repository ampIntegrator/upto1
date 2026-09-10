import {Badge} from '@astryxdesign/core/Badge';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Link} from '@astryxdesign/core/Link';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

/** Un composant du catalogue : titre ancré, état (habillé ou démo d'origine), lien doc Astryx, démo dans une carte. */
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
  /** slug de la page de doc astryx.atmeta.com/components/<doc> ; null = composant propre au DS */
  doc: string | null;
  /** composant parent quand il s'agit d'une sous-partie (ex. TabMenu → TabList) */
  parent?: string;
  /** habillé Orbita : démo maison à la place de celle d'Astryx */
  dressed?: boolean;
  /** catégorie (affichée en eyebrow) */
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
            <Badge label={dressed ? 'Habillé Orbita' : 'Démo Astryx'} variant={dressed ? 'success' : 'neutral'} />
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
