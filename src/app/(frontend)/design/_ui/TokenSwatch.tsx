import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

/** Pastille de couleur lisant un token CSS du thème actif. */
export function ColorSwatch({token, label}: {token: string; label?: string}) {
  return (
    <VStack gap={1.5}>
      <VStack
        style={{
          height: 72,
          background: `var(${token})`,
          border: '1px solid var(--color-border)',
        }}
      />
      <Text type="label">{label ?? token.replace(/^--color-/, '')}</Text>
      <Text type="code" color="secondary" size="sm">
        {token}
      </Text>
    </VStack>
  );
}

/** Groupe de pastilles sous un titre. */
export function SwatchGroup({title, tokens, note}: {title: string; tokens: string[]; note?: string}) {
  return (
    <VStack gap={3}>
      <VStack gap={0.5}>
        <Heading level={2}>{title}</Heading>
        {note ? <Text type="supporting">{note}</Text> : null}
      </VStack>
      <Card padding={5}>
        <Grid columns={{minWidth: 150}} gap={4}>
          {tokens.map((t) => (
            <ColorSwatch key={t} token={t} />
          ))}
        </Grid>
      </Card>
    </VStack>
  );
}
