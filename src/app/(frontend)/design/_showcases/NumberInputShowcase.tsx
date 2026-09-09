/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaNumberField */
'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {OrbitaNumberField} from '@/components/OrbitaNumberField';

export default function NumberInputShowcase() {
  const [qte, setQte] = useState<number | null>(null);
  const [surface, setSurface] = useState<number | null>(320);
  return (
    <VStack gap={4}>
      <Text type="body" color="secondary">Champ numérique Orbita : label flottant, flèches Nucleo dans deux cases carrées empilées sur toute la hauteur, couleur silo.</Text>
      <Grid columns={{minWidth: 240, max: 2}} gap={6} style={{maxWidth: 400 * 2 + 24}}>
        <OrbitaNumberField label="Quantité" value={qte} onChange={setQte} formatValue={(n) => `${n} lot${n > 1 ? 's' : ''}`} />
        <OrbitaNumberField label="Surface (m²)" value={surface} onChange={setSurface} step={10} />
      </Grid>
    </VStack>
  );
}
