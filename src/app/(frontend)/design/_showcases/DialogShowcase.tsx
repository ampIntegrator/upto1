/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/OrbitaDialog */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {OrbitaButton} from '@/components/OrbitaButton';
import {OrbitaDialog, type OrbitaDialogSize, type OrbitaDialogTone} from '@/components/OrbitaDialog';
import {OrbitaField} from '@/components/OrbitaField';
import {OrbitaSelect} from '@/components/OrbitaSelect';

type Demo = {
  id: string;
  size: OrbitaDialogSize;
  tone: OrbitaDialogTone;
  tag: string;
  name: string;
  desc: string;
};

const DEMOS: Demo[] = [
  {id: 'sm', size: 'sm', tone: 'light', tag: 'SM · 420', name: 'Confirmation', desc: 'Une question, deux choix.'},
  {id: 'md', size: 'md', tone: 'light', tag: 'MD · 620', name: 'Formulaire', desc: 'Quelques champs, sans quitter la page.'},
  {id: 'lg', size: 'lg', tone: 'light', tag: 'LG · 840', name: 'Document long', desc: 'Corps défilant, en-tête et pied fixes.'},
  {id: 'sm-d', size: 'sm', tone: 'night', tag: 'SM · nuit', name: 'Confirmation', desc: 'Même modale, sur fond nuit.'},
  {id: 'md-d', size: 'md', tone: 'night', tag: 'MD · nuit', name: 'Formulaire', desc: 'Champs sur fond nuit.'},
  {id: 'lg-d', size: 'lg', tone: 'night', tag: 'LG · nuit', name: 'Document long', desc: 'Défilement, version nuit.'},
];

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export default function DialogShowcase() {
  const [open, setOpen] = useState<string | null>(null);
  const [withEyebrow, setWithEyebrow] = useState(true);
  const [projet, setProjet] = useState('Réhabilitation — 14 rue des Lilas');
  const [bien, setBien] = useState<string | null>('collectif');
  const [surface, setSurface] = useState('320');
  const close = () => setOpen(null);
  const eyebrow = withEyebrow ? 'Nouveau chiffrage' : undefined;

  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">Le dialogue : trois largeurs, clair ou nuit, eyebrow optionnel, bouton fermer Nucleo, pied avec filet dégradé qui suit le silo. L'en-tête garde la même hauteur avec ou sans eyebrow.</Text>

      <VStack gap={3}>
        <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
          <Heading level={3}>Six cas de la maquette</Heading>
          <OrbitaButton
            label={withEyebrow ? 'Eyebrow : affiché' : 'Eyebrow : masqué'}
            variant="ghost"
           
            onClick={() => setWithEyebrow((v) => !v)}
          />
        </HStack>
        <Grid columns={{minWidth: 220}} gap={3}>
          {DEMOS.map((d) => (
            <Card key={d.id} padding={5} variant={d.tone === 'night' ? 'muted' : 'default'}>
              <VStack gap={2} hAlign="start">
                <Text type="tag" color="secondary">{d.tag}</Text>
                <Heading level={3}>{d.name}</Heading>
                <Text type="supporting">{d.desc}</Text>
                <OrbitaButton label="Ouvrir" variant="secondary" onClick={() => setOpen(d.id)} />
              </VStack>
            </Card>
          ))}
        </Grid>
      </VStack>

      {/* SM : confirmation */}
      {(['sm', 'sm-d'] as const).map((id) => (
        <OrbitaDialog
          key={id}
          isOpen={open === id}
          onOpenChange={(o) => !o && close()}
         
          tone={id.endsWith('-d') ? 'night' : 'light'}
          eyebrow={eyebrow}
          title="Supprimer ce chiffrage ?"
          actions={
            <>
              <OrbitaButton label="Annuler" variant="ghost" onClick={close} />
              <OrbitaButton label="Supprimer" variant="destructive" onClick={close} />
            </>
          }>
          <Text type="body">Le chiffrage et ses postes seront définitivement supprimés. Cette action est irréversible.</Text>
        </OrbitaDialog>
      ))}

      {/* MD : formulaire */}
      {(['md', 'md-d'] as const).map((id) => (
        <OrbitaDialog
          key={id}
          isOpen={open === id}
          onOpenChange={(o) => !o && close()}
          size="md"
          tone={id.endsWith('-d') ? 'night' : 'light'}
          purpose="form"
          eyebrow={eyebrow}
          title="Démarrer une estimation"
          actions={
            <>
              <OrbitaButton label="Annuler" variant="ghost" onClick={close} />
              <OrbitaButton label="Créer le chiffrage" variant="primary" onClick={close} />
            </>
          }>
          <Text type="body">Renseignez les bases du projet, vous pourrez affiner chaque poste ensuite.</Text>
          <OrbitaField label="Intitulé du projet" value={projet} onChange={setProjet} />
          <Grid columns={2} gap={4}>
            <OrbitaSelect
              label="Type de bien"
              options={[
                {value: 'collectif', label: 'Logement collectif'},
                {value: 'maison', label: 'Maison individuelle'},
                {value: 'tertiaire', label: 'Tertiaire'},
              ]}
              value={bien}
              onChange={setBien}
            />
            <OrbitaField label="Surface (m²)" value={surface} onChange={setSurface} />
          </Grid>
        </OrbitaDialog>
      ))}

      {/* LG : document long */}
      {(['lg', 'lg-d'] as const).map((id) => (
        <OrbitaDialog
          key={id}
          isOpen={open === id}
          onOpenChange={(o) => !o && close()}
          size="lg"
          tone={id.endsWith('-d') ? 'night' : 'light'}
          eyebrow={withEyebrow ? 'Conditions' : undefined}
          title="Conditions générales d'utilisation"
          actions={
            <>
              <OrbitaButton label="Refuser" variant="ghost" onClick={close} />
              <OrbitaButton label="Accepter" variant="primary" onClick={close} />
            </>
          }>
          {Array.from({length: 6}, (_, i) => (
            <VStack key={i} gap={2}>
              <Heading level={3}>Article {i + 1}</Heading>
              <Text type="body">{LOREM}</Text>
              <Text type="body">{LOREM}</Text>
            </VStack>
          ))}
        </OrbitaDialog>
      ))}
    </VStack>
  );
}
