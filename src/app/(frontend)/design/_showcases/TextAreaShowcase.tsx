/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaField (multiline) */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {OrbitaField} from '@/components/OrbitaField';

export default function TextAreaShowcase() {
  const [besoin, setBesoin] = useState('');
  const [projet, setProjet] = useState('Réhabilitation de 14 logements, livraison T2.');
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Même champ en zone de texte : 128 px minimum, redimensionnable en hauteur, label flottant.</Text>
      <Card padding={6}>
        <Grid columns={{minWidth: 280, max: 2}} gap={6}>
          <OrbitaField multiline label="Décrivez votre besoin" value={besoin} onChange={setBesoin} />
          <OrbitaField multiline label="Votre projet (facultatif)" value={projet} onChange={setProjet} help="Quelques lignes suffisent." />
        </Grid>
      </Card>
    </VStack>
  );
}
