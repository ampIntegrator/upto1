/* Showcase habillé Orbita — remplace Selector et MultiSelector. Composant : src/components/Select */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React, {useState} from 'react';

import {Select, type OrbitaOption} from '@/components/Select';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

/* Jeux de la maquette 17-forms : m4 (4 options, sans recherche) et m8 (8 options, recherche). */
const M4: OrbitaOption[] = [
  {value: 'archi', label: 'Architecte'},
  {value: 'moe', label: "Maître d'œuvre"},
  {value: 'promo', label: 'Promoteur'},
  {value: 'gest', label: 'Gestionnaire de sites'},
];
const M8: OrbitaOption[] = [
  ...M4,
  {value: 'be', label: "Bureau d'études"},
  {value: 'eg', label: 'Entreprise générale'},
  {value: 'bailleur', label: 'Bailleur social'},
  {value: 'collectivite', label: 'Collectivité'},
];

function Section({title, note, children}: {title: string; note?: string; children: React.ReactNode}) {
  return (
    <VStack gap={3}>
      <Heading level={3}>{title}</Heading>
      {note ? <Text type="supporting">{note}</Text> : null}
      {children}
    </VStack>
  );
}

function Quartet({prefix}: {prefix: string}) {
  const [s1, setS1] = useState<string | null>(null);
  const [s2, setS2] = useState<string | null>(null);
  const [m1, setM1] = useState<string[]>([]);
  const [m2, setM2] = useState<string[]>([]);
  return (
    <Grid columns={{minWidth: 280, max: 2}} gap={6}>
      <Select label="Votre métier" options={M4} value={s1} onChange={setS1} />
      <Select label="Votre métier" options={M8} value={s2} onChange={setS2} />
      <Select mode="multiple" label="Vos métiers" options={M4} value={m1} onChange={setM1} />
      <Select mode="multiple" label="Vos métiers" options={M8} value={m2} onChange={setM2} />
      <Text type="supporting" style={{gridColumn: '1 / -1'}}>
        {prefix} 1 choix · 4 options — 1 choix · 8 options, recherche — multiple · 4 options — multiple · 8 options, recherche
      </Text>
    </Grid>
  );
}

export default function SelectShowcase() {
  const {theme} = useOrbitaTheme();
  const [pre, setPre] = useState<string | null>('moe');
  const [preM, setPreM] = useState<string[]>(['archi', 'promo']);

  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">Sélecteur simple et multiple réunis en un composant (maquette 17-forms) : un choix ou plusieurs, label flottant, chevron qui pivote, panneau sous le champ, recherche dès six options, badges accent pour le multiple.</Text>

      <Section title="Clair" note="Cliquez pour ouvrir : le label remonte en accent, le panneau se place sous le champ.">
        <Card padding={6}>
          <Quartet prefix="Haut en bas :" />
        </Card>
      </Section>

      <Section title="Avec valeur" note="Label remonté, valeur ou badges dans le champ.">
        <Card padding={6}>
          <Grid columns={{minWidth: 280, max: 2}} gap={6}>
            <Select label="Votre métier" options={M8} value={pre} onChange={setPre} />
            <Select mode="multiple" label="Vos métiers" options={M8} value={preM} onChange={setPreM} />
          </Grid>
        </Card>
      </Section>

      <Section title="États" note="Obligatoire, erreur, succès, désactivé.">
        <Card padding={6}>
          <Grid columns={{minWidth: 240, max: 2}} gap={6}>
            <Select label="Votre métier" options={M4} value={null} onChange={() => {}} isRequired />
            <Select label="Votre métier" options={M4} value={null} onChange={() => {}} status={{type: 'error', message: 'Choisissez un métier.'}} />
            <Select label="Votre métier" options={M4} value="archi" onChange={() => {}} status={{type: 'success', message: 'Profil reconnu.'}} />
            <Select label="Votre métier" options={M4} value="moe" onChange={() => {}} isDisabled />
          </Grid>
        </Card>
      </Section>

      <Section title="Nuit" note="Même quatuor sur fond nuit : label et focus en highlight, badges en voile blanc.">
        <Theme theme={theme} mode="dark">
          <Card padding={6}>
            <Quartet prefix="Nuit :" />
          </Card>
        </Theme>
      </Section>
    </VStack>
  );
}
