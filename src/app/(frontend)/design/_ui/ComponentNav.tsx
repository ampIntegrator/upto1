import {Link} from '@astryxdesign/core/Link';
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CATALOG} from './catalog.generated';

/** Précédent / suivant dans la catégorie, sous la démo d'un composant. */
export function ComponentNav({category, current}: {category: string; current: string}) {
  const cat = CATALOG.find((c) => c.slug === category);
  if (!cat) return null;
  const i = cat.items.findIndex((it) => it.slug === current);
  const prev = cat.items[i - 1];
  const next = cat.items[i + 1];
  return (
    <HStack hAlign="between" vAlign="center" gap={4} wrap="wrap">
      <Text type="supporting">{prev ? <Link href={prev.href}>← {prev.label}</Link> : <Link href={cat.href}>← {cat.label}</Link>}</Text>
      <Text type="supporting">
        {i + 1} / {cat.items.length} · {cat.label}
      </Text>
      <Text type="supporting">{next ? <Link href={next.href}>{next.label} →</Link> : <Link href={cat.href}>{cat.label} →</Link>}</Text>
    </HStack>
  );
}
