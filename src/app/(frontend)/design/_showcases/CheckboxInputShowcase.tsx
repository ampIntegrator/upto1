/* Showcase habillé Orbita — CheckboxInput Astryx, apparence par le thème (maquette 17-forms .opt.check) */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

export default function CheckboxInputShowcase() {
  const [v, setV] = useState({chiffrage: true, suivi: true, maintenance: false});
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Case à cocher : carré de 22 px à angles vifs ; cochée, fond accent et coche Nucleo centrée, libellé en couleur silo. Composant CheckboxInput Astryx, thème seul.</Text>
      <Card padding={6}>
        <VStack gap={3}>
          <CheckboxInput label="Chiffrage de travaux" value={v.chiffrage} onChange={(c) => setV({...v, chiffrage: c})} />
          <CheckboxInput label="Suivi de chantier" value={v.suivi} onChange={(c) => setV({...v, suivi: c})} />
          <CheckboxInput label="Maintenance multitechnique" value={v.maintenance} onChange={(c) => setV({...v, maintenance: c})} />
          <CheckboxInput label="Module API (désactivé)" value={false} onChange={() => {}} isDisabled />
        </VStack>
      </Card>
    </VStack>
  );
}
