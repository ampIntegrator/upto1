/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaUpload */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React, {useState} from 'react';

import {OrbitaUpload} from '@/components/OrbitaUpload';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

export default function FileInputShowcase() {
  const {theme} = useOrbitaTheme();
  const [file, setFile] = useState<File | File[] | null>(null);
  const [fileN, setFileN] = useState<File | File[] | null>(null);
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Zone de dépôt Orbita sur le FileInput Astryx : cadre pointillé qui passe en accent au survol, carré icône, titre et sous-titre. Le nom du fichier remplace le titre une fois déposé.</Text>
      <Card padding={6}>
        <VStack style={{maxWidth: 520}}>
          <OrbitaUpload label="Déposez votre cahier des charges" hint="PDF, DOCX — 10 Mo max." accept=".pdf,.doc,.docx" value={file} onChange={setFile} />
        </VStack>
      </Card>
      <Theme theme={theme} mode="dark">
        <Card padding={6}>
          <VStack style={{maxWidth: 520}}>
            <OrbitaUpload label="Déposez votre cahier des charges" hint="PDF, DOCX — 10 Mo max." accept=".pdf,.doc,.docx" value={fileN} onChange={setFileN} />
          </VStack>
        </Card>
      </Theme>
    </VStack>
  );
}
