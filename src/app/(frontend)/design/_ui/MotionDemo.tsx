'use client';

import {Button} from '@astryxdesign/core/Button';
import {Collapsible} from '@astryxdesign/core/Collapsible';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Switch} from '@astryxdesign/core/Switch';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

/** Démo interactive des transitions (survol, bascule, repli). */
export function MotionDemo() {
  const [on, setOn] = useState(true);
  return (
    <VStack gap={5}>
      <HStack gap={3} wrap="wrap" vAlign="center">
        <Button label="Primaire" variant="primary" />
        <Button label="Secondaire" variant="secondary" />
        <Button label="Fantôme" variant="ghost" />
        <Switch label="Interrupteur" value={on} onChange={setOn} />
      </HStack>
      <Collapsible trigger={<Text type="label">Ouvrir / fermer (durée medium)</Text>} defaultIsOpen={false}>
        <Text type="body">Contenu replié qui s'ouvre avec la durée medium et la courbe standard.</Text>
      </Collapsible>
    </VStack>
  );
}
