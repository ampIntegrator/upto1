/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/Upload */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React, {useState} from 'react';

import {Upload} from '@/components/Upload';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

export default function FileInputShowcase() {
  const {theme} = useOrbitaTheme();
  const [file, setFile] = useState<File | File[] | null>(null);
  const [fileN, setFileN] = useState<File | File[] | null>(null);
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Zone de dépôt : cadre pointillé qui passe en accent au survol, carré icône, titre et sous-titre. Le nom du fichier remplace le titre une fois déposé.</Text>
      <Card padding={6}>
        <VStack maxWidth={520}>
          <Upload label="Déposez votre cahier des charges" hint="PDF, DOCX — 10 Mo max." accept=".pdf,.doc,.docx" value={file} onChange={setFile} />
        </VStack>
      </Card>
      <Theme theme={theme} mode="dark">
        <Card padding={6}>
          <VStack maxWidth={520}>
            <Upload label="Déposez votre cahier des charges" hint="PDF, DOCX — 10 Mo max." accept=".pdf,.doc,.docx" value={fileN} onChange={setFileN} />
          </VStack>
        </Card>
      </Theme>
    </VStack>
  );
}
