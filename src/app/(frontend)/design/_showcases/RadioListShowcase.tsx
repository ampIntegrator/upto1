/* Showcase habillé Orbita — RadioList Astryx, apparence par le thème (maquette 17-forms .opt.radio) */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

export default function RadioListShowcase() {
  const [taille, setTaille] = useState('1-10');
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Radio Orbita : disque de 22 px, bordure ligne, point accent de 8 px et libellé en couleur silo quand coché. Tout vient du thème, le composant est le RadioList Astryx.</Text>
      <Card padding={6}>
        <RadioList label="Taille du parc" value={taille} onChange={setTaille}>
          <RadioListItem value="1-10" label="1 à 10 sites" />
          <RadioListItem value="11-50" label="11 à 50 sites" />
          <RadioListItem value="50+" label="Plus de 50 sites" />
          <RadioListItem value="nsp" label="Je ne sais pas (désactivé)" isDisabled />
        </RadioList>
      </Card>
    </VStack>
  );
}
