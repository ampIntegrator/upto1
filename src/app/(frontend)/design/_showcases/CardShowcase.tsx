/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/Card (sans cta) */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {BlocRows, Night} from '../_ui/CardRows';

export default function CardShowcase() {
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        La carte sans lien : un châssis, quatre médias au choix (image, icône, nombre, rien), titre centré avec son ornement au losange, texte. Ni barre d'action, ni survol, ni clic. Pour la version cliquable, voir Clickable Card. Le titre est un Heading de type card : h3 ou h4 en admin, même rendu.
      </Text>

      <BlocRows linked={false} />

      <Night>
        <BlocRows linked={false} seed="-n" />
      </Night>
    </VStack>
  );
}
