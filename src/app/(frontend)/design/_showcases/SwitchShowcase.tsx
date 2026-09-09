/* Showcase habillé Orbita — Switch Astryx, apparence par le thème (maquette 17-forms .switch) */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/Stack';
import {Switch} from '@astryxdesign/core/Switch';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

export default function SwitchShowcase() {
  const [news, setNews] = useState(true);
  const [sms, setSms] = useState(false);
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Interrupteur Orbita : piste de 46 × 26 px, curseur blanc de 20 px, piste accent quand actif.</Text>
      <Card padding={6}>
        <VStack gap={3}>
          <Switch label="Recevoir la newsletter" value={news} onChange={setNews} />
          <Switch label="Activer les rappels SMS" value={sms} onChange={setSms} />
          <Switch label="Option verrouillée" value={true} onChange={() => {}} isDisabled />
        </VStack>
      </Card>
    </VStack>
  );
}
