/* Showcase habillé Orbita — remplace la démo Astryx d'origine. Composant : src/components/Field */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React, {useState} from 'react';

import {Field} from '@/components/Field';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';

function Gallery() {
  const [nom, setNom] = useState('');
  const [mail, setMail] = useState('contact@');
  const [societe, setSociete] = useState('Orbita Systèmes');
  const [tel, setTel] = useState('');
  const [search, setSearch] = useState('');
  return (
    <Grid columns={{minWidth: 280, max: 2}} gap={6}>
      <Field label="Nom complet" value={nom} onChange={setNom} />
      <Field label="Adresse e-mail" type="email" value={mail} onChange={setMail} />
      <Field label="Société" value={societe} onChange={setSociete} help="Tel qu'il apparaîtra sur vos devis." />
      <Field label="Téléphone" value={tel} onChange={setTel} iconKey="phone" />
      <Field label="Adresse e-mail" type="email" value="contact@orbita" onChange={() => {}} status={{type: 'error', message: 'Adresse e-mail invalide.'}} />
      <Field label="N° SIRET" value="vérifié" onChange={() => {}} status={{type: 'success', message: 'Entreprise validée.'}} />
      <Field label="Rechercher un chantier" value={search} onChange={setSearch} iconKey="search" />
      <Field label="Identifiant" value="Champ verrouillé" onChange={() => {}} isDisabled />
    </Grid>
  );
}

export default function TextInputShowcase() {
  const {theme} = useOrbitaTheme();
  return (
    <VStack gap={8}>
      <Text type="body" color="secondary">
        Le champ texte (maquette 17-forms) : champ de 58 px, label flottant qui remonte en couleur silo au focus ou dès qu'il y a une valeur, icône de tête, états erreur et succès avec icône centrée et message sous le champ, aide, désactivé. Cliquez dans un champ vide pour voir le label monter.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Clair</Heading>
        <Card padding={6}><Gallery /></Card>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Theme theme={theme} mode="dark">
          <Card padding={6}><Gallery /></Card>
        </Theme>
      </VStack>
    </VStack>
  );
}
