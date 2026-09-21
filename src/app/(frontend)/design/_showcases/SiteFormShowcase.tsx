/* Design-system-specific component: src/components/SiteForm (a site form, mockup 17-forms). */
'use client';

import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Container} from '@/components/Container';
import {Section} from '@/components/Section';
import {type FormStep, type FormSubmitInput, type FormSubmitResult, SiteForm} from '@/components/SiteForm';

const METIERS = [
  {value: 'courtier', label: 'Courtier'},
  {value: 'agent', label: 'Agent immobilier'},
  {value: 'architecte', label: 'Architecte'},
  {value: 'entreprise', label: 'Entreprise du bâtiment'},
];

/** the mockup's « Demander une démo » form */
const DEMO: FormStep[] = [
  {
    fields: [
      {type: 'text', name: 'prenom', label: 'Prénom', required: true, width: 'half'},
      {type: 'text', name: 'nom', label: 'Nom', required: true, width: 'half'},
      {type: 'email', name: 'email', label: 'E-mail professionnel', required: true, width: 'half'},
      {type: 'tel', name: 'telephone', label: 'Téléphone', width: 'half'},
      {type: 'select', name: 'metier', label: 'Votre métier', options: METIERS, width: 'full'},
      {type: 'textarea', name: 'projet', label: 'Votre projet (facultatif)', width: 'full'},
      {type: 'consent', name: 'consent', label: 'J’accepte d’être recontacté par l’équipe.', link: {label: 'Politique de confidentialité', href: '#'}},
    ],
  },
];

/** three steps: contact, project, consent */
const STEPS: FormStep[] = [
  {title: 'Vous', fields: [
    {type: 'text', name: 'prenom', label: 'Prénom', required: true, width: 'half'},
    {type: 'text', name: 'nom', label: 'Nom', required: true, width: 'half'},
    {type: 'email', name: 'email', label: 'E-mail', required: true, width: 'half'},
    {type: 'tel', name: 'telephone', label: 'Téléphone', width: 'half'},
  ]},
  {title: 'Votre projet', fields: [
    {type: 'radio', name: 'taille', label: 'Taille de l’équipe', required: true, options: [{value: '1', label: '1 à 5'}, {value: '6', label: '6 à 20'}, {value: '21', label: 'Plus de 20'}]},
    {type: 'number', name: 'chantiers', label: 'Chantiers par an', width: 'half'},
    {type: 'date', name: 'date', label: 'Date souhaitée', width: 'half'},
    {type: 'checkbox', name: 'rappel', label: 'Je préfère être rappelé'},
  ]},
  {title: 'Envoi', fields: [
    {type: 'message', name: 'recap', content: <Text type="body" color="secondary">Nous revenons vers vous sous 24 h ouvrées.</Text>},
    {type: 'consent', name: 'consent', label: 'J’accepte d’être recontacté par l’équipe.'},
  ]},
];

/** the catalogue never sends anything: a short wait, then the confirmation */
async function fakeSubmit(_input: FormSubmitInput): Promise<FormSubmitResult> {
  await new Promise((r) => setTimeout(r, 600));
  return {ok: true};
}
async function failingSubmit(_input: FormSubmitInput): Promise<FormSubmitResult> {
  await new Promise((r) => setTimeout(r, 400));
  return {ok: false};
}

const thanks = {type: 'message' as const, content: <VStack gap={2}><Heading level={3}>Merci !</Heading><Text type="body" color="secondary">Votre demande est bien partie. Réponse sous 24 h ouvrées.</Text></VStack>};
const head = {eyebrow: 'Formulaire assemblé', title: 'Demander <span>une démo</span>', intro: 'Réponse sous 24 h ouvrées. Sans engagement.'};

export default function SiteFormShowcase() {
  return (
    <VStack gap={10}>
      <Text type="body" color="secondary">
        Un formulaire du site (maquette 17), simple ou en plusieurs étapes. La largeur de la colonne décide : une colonne de champs jusqu’à 7/12, deux à partir de 8/12, où un champ « demi » prend une colonne. Carte encadrée ou non ; surtitre, titre et chapô facultatifs. Chaque étape est vérifiée avant de passer à la suivante ; un seul envoi à la fin, puis le message de confirmation remplace le formulaire. Le catalogue n’envoie rien.
      </Text>
      <VStack gap={3}>
        <Heading level={3}>Sur 12 colonnes : deux colonnes de champs</Heading>
        <SiteForm id="demo-12" {...head} steps={DEMO} submitLabel="Envoyer ma demande" submitAction={fakeSubmit} confirmation={thanks} />
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Sur 6 et 4 colonnes : une seule colonne</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="start">
          <GridSpan columns={6}>
            <SiteForm id="demo-6" {...head} steps={DEMO} submitLabel="Envoyer ma demande" submitAction={fakeSubmit} confirmation={thanks} />
          </GridSpan>
          <GridSpan columns={4}>
            <SiteForm id="demo-4" title="Être rappelé" steps={[{fields: DEMO[0].fields.slice(0, 4)}]} submitLabel="Envoyer" submitAction={fakeSubmit} confirmation={thanks} />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>En trois étapes, sur 8 colonnes</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="start">
          <GridSpan columns={8}>
            <SiteForm id="demo-steps" title="Parlons de <span>votre projet</span>" steps={STEPS} submitLabel="Envoyer" submitAction={fakeSubmit} confirmation={thanks} />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Sans carte, envoi en échec</Heading>
        <Grid columns={12} gap={6} className="page-grid" align="start">
          <GridSpan columns={6}>
            <SiteForm id="demo-fail" framed={false} steps={[{fields: DEMO[0].fields.slice(2, 3)}]} submitLabel="S’inscrire" submitAction={failingSubmit} confirmation={thanks} />
          </GridSpan>
        </Grid>
      </VStack>
      <VStack gap={3}>
        <Heading level={3}>Nuit</Heading>
        <Section background="night-halo" spacing="sm">
          <Container>
            <Grid columns={12} gap={6} className="page-grid" align="start">
              <GridSpan style={{gridColumn: '3 / span 8'}}>
                <SiteForm id="demo-night" {...head} steps={DEMO} submitLabel="Envoyer ma demande" submitAction={fakeSubmit} confirmation={thanks} />
              </GridSpan>
            </Grid>
          </Container>
        </Section>
      </VStack>
    </VStack>
  );
}
