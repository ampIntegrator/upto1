// Démo d'origine (composant Astryx, pas encore habillé).

'use client';

import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Toolbar} from '@astryxdesign/core/Toolbar';

export default function ToolbarShowcase() {
  return (
    <Toolbar
      label="Actions du tableau"
      dividers={['bottom']}
      startContent={<Text weight="semibold">12 chantiers</Text>}
      endContent={
        <HStack gap={2}>
          <Button label="Exporter" variant="ghost" size="sm" />
          <Button label="Nouveau chantier" variant="primary" size="sm" />
        </HStack>
      }
    />
  );
}
