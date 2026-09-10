'use client';

import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {ASTRYX_SEMANTIC_MAP} from '@/theme/icons/astryx-icons';
import {NUCLEO_ICONS, NUCLEO_KEYS, NUCLEO_SETS, type NucleoIconKey} from '@/theme/icons/nucleo';
import {PageIntro} from '../../_ui/PageIntro';

/** clé Nucleo → nom sémantique Astryx (quand la clé en remplace un). */
const SEMANTIC_BY_KEY = Object.fromEntries(Object.entries(ASTRYX_SEMANTIC_MAP).map(([name, key]) => [key, name]));

const BASE_KEYS = NUCLEO_KEYS.filter((k) => NUCLEO_SETS[k] === 'astryx');
const VIDOMIA_KEYS = NUCLEO_KEYS.filter((k) => NUCLEO_SETS[k] === 'vidomia');

function Cell({name}: {name: NucleoIconKey}) {
  const semantic = SEMANTIC_BY_KEY[name];
  return (
    <VStack gap={1.5} hAlign="center" padding={2}>
      <Icon icon={NUCLEO_ICONS[name]} size="lg" color="primary" />
      <Text type="tag" color="secondary">{name}</Text>
      {semantic ? <Text type="supporting" size="sm">Astryx · {semantic}</Text> : null}
    </VStack>
  );
}

function IconSet({keys}: {keys: NucleoIconKey[]}) {
  return (
    <Grid columns={{minWidth: 128}} gap={3}>
      {keys.map((k) => <Cell key={k} name={k} />)}
    </Grid>
  );
}

export default function Page() {
  return (
    <VStack gap={10}>
      <PageIntro
        eyebrow="Fondations"
        title="Icônes"
        lead="Jeu Nucleo, grille 18 px, trait 1, en currentColor. Les SVG déposés dans icons/ sont convertis en composants React par pnpm icons:build. Astryx n'utilise pas de police d'icônes : ses composants reçoivent ces composants SVG."
      />

      <VStack gap={3}>
        <Heading level={2}>Jeu de base · {BASE_KEYS.length}</Heading>
        <Text type="supporting">
          Dossier icons/astryx. Contient les {Object.keys(ASTRYX_SEMANTIC_MAP).length} noms sémantiques Astryx, que le thème remplace par ces tracés dans tous les composants (sélecteurs, modales, cases, carrousels…), plus le chrome du site, les réseaux sociaux et les icônes de contenu de départ. La mention « Astryx · nom » indique la clé sémantique remplacée.
        </Text>
        <Card padding={5}><IconSet keys={BASE_KEYS} /></Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Vidomia · {VIDOMIA_KEYS.length}</Heading>
        <Text type="supporting">
          Dossier icons/vidomia. Icônes ajoutées au fil du projet, pictos métier et contenu éditorial. Ce bloc se remplit tout seul après pnpm icons:build.
        </Text>
        <Card padding={5}>
          {VIDOMIA_KEYS.length > 0 ? (
            <IconSet keys={VIDOMIA_KEYS} />
          ) : (
            <Text type="body" color="secondary">Aucune icône pour l'instant. Déposer un SVG dans icons/vidomia puis lancer pnpm icons:build.</Text>
          )}
        </Card>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Dans les composants</Heading>
        <Text type="supporting">Usage : Icon reçoit le composant, les props size et color font le reste. Les composants Astryx (Button, IconButton…) prennent un Icon en prop.</Text>
        <Card padding={5}>
          <HStack gap={3} wrap="wrap" vAlign="center">
            <Button label="Découvrir" variant="primary" endContent={<Icon icon={NUCLEO_ICONS['arrow-right']} />} />
            <Button label="Rechercher" variant="secondary" icon={<Icon icon={NUCLEO_ICONS['search']} />} />
            <IconButton label="Menu" icon={<Icon icon={NUCLEO_ICONS['menu']} />} />
            <IconButton label="Fermer" icon={<Icon icon={NUCLEO_ICONS['close']} />} />
            <Icon icon={NUCLEO_ICONS['success']} color="success" size="md" />
            <Icon icon={NUCLEO_ICONS['error']} color="error" size="md" />
            <Icon icon={NUCLEO_ICONS['info']} color="accent" size="md" />
            <Icon icon={NUCLEO_ICONS['linkedin']} color="secondary" size="lg" />
          </HStack>
        </Card>
      </VStack>
    </VStack>
  );
}
