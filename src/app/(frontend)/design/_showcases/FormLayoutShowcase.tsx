/* Showcase habillé Orbita — FormLayout Astryx avec les champs Field (label flottant). */
'use client';

import {FormLayout} from '@astryxdesign/core/FormLayout';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {Field} from '@/components/Field';

export default function FormLayoutShowcase() {
  const [prenom, setPrenom] = useState('Priya');
  const [nom, setNom] = useState('Sharma');
  const [email, setEmail] = useState('priya.sharma@exemple.fr');
  const [ville, setVille] = useState('Lyon');
  const [cp, setCp] = useState('69002');
  return (
    <VStack gap={4}>
      <Text type="body" color="secondary">Mise en page de formulaire Astryx, lignes et colonnes, avec les champs Orbita : label flottant qui remonte au focus, 58 px de haut.</Text>
      <VStack maxWidth={640}>
        <FormLayout>
          <FormLayout direction="horizontal">
            <Field label="Prénom" value={prenom} onChange={setPrenom} />
            <Field label="Nom" value={nom} onChange={setNom} />
          </FormLayout>
          <Field label="E-mail" type="email" value={email} onChange={setEmail} />
          <FormLayout direction="horizontal">
            <Field label="Ville" value={ville} onChange={setVille} />
            <Field label="Code postal" value={cp} onChange={setCp} />
          </FormLayout>
        </FormLayout>
      </VStack>
    </VStack>
  );
}
