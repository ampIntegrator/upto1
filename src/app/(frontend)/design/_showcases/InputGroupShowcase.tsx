/* Showcase habillé Orbita — InputGroup Astryx : préfixe icône euro (Nucleo), préfixe et suffixe texte. */
'use client';

import {Icon} from '@astryxdesign/core/Icon';
import {InputGroup, InputGroupText} from '@astryxdesign/core/InputGroup';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import React, {useState} from 'react';

import {CurrencyEuroIcon} from '@/theme/icons/nucleo';

export default function InputGroupShowcase() {
  const [prix, setPrix] = useState('');
  const [url, setUrl] = useState('');
  return (
    <VStack gap={4}>
      <Text type="body" color="secondary">Champ avec préfixe ou suffixe accolés : icône euro Nucleo pour un montant (dollar disponible, bascule à venir), texte pour une adresse web.</Text>
      <VStack gap={4} style={{maxWidth: 400}}>
        <InputGroup label="Prix">
          <InputGroupText>
            <Icon icon={CurrencyEuroIcon} size="sm" color="accent" />
          </InputGroupText>
          <TextInput label="Montant" isLabelHidden value={prix} onChange={setPrix} placeholder="0,00" />
        </InputGroup>
        <InputGroup label="Site web">
          <InputGroupText>https://</InputGroupText>
          <TextInput label="Adresse" isLabelHidden value={url} onChange={setUrl} placeholder="exemple" />
          <InputGroupText>.fr</InputGroupText>
        </InputGroup>
      </VStack>
    </VStack>
  );
}
