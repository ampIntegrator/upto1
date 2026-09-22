/* Orbita-styled showcase — replaces the original Astryx demo. Component: src/components/Dialog */
'use client';

import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

import {Button} from '@/components/Button';
import {Dialog, type OrbitaDialogSize, type DialogTone} from '@/components/Dialog';
import {Field} from '@/components/Field';
import {Select} from '@/components/Select';
import {type FormStep, type FormSubmitInput, type FormSubmitResult, SiteForm} from '@/components/SiteForm';

type Demo = {
  id: string;
  size: OrbitaDialogSize;
  tone: DialogTone;
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

/** The three modals of the site (Payload « Modales »): a sentence, terms to accept, a form. */
type SiteDemo = {id: string; tag: string; name: string; desc: string};
const SITE_DEMOS: SiteDemo[] = [
  {id: 'site-note', tag: 'SM · libre', name: 'Une phrase', desc: 'Un avis court, un bouton pour fermer.'},
  {id: 'site-terms', tag: 'LG · obligatoire', name: 'Conditions à accepter', desc: 'Texte long qui défile ; ni Échap ni clic à côté, seul le bouton ferme.'},
  {id: 'site-form', tag: 'MD · formulaire', name: 'Formulaire du site', desc: 'Le formulaire assemblé dans Payload, sans carte, dans le corps.'},
];

const SITE_FORM: FormStep[] = [
  {
    fields: [
      {type: 'text', name: 'prenom', label: 'Prénom', required: true, width: 'half'},
      {type: 'text', name: 'nom', label: 'Nom', required: true, width: 'half'},
      {type: 'email', name: 'email', label: 'E-mail professionnel', required: true, width: 'full'},
      {type: 'consent', name: 'consent', label: 'J’accepte d’être recontacté par l’équipe.'},
    ],
  },
];

/** the catalogue never sends anything: a short wait, then the confirmation */
async function fakeSubmit(_input: FormSubmitInput): Promise<FormSubmitResult> {
  await new Promise((r) => setTimeout(r, 600));
  return {ok: true};
}

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
          <Button
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
                <Button label="Ouvrir" variant="secondary" onClick={() => setOpen(d.id)} />
              </VStack>
            </Card>
          ))}
        </Grid>
      </VStack>

      <VStack gap={3}>
        <Heading level={3}>Modales du site</Heading>
        <Text type="body" color="secondary">Les modales écrites dans Payload (« Modales ») s'ouvrent par-dessus la page depuis un lien interne ou un bouton vers /modale/…. Trois cas : une phrase, un texte long à accepter, un formulaire. Boutons du pied simples, style destructif possible.</Text>
        <Grid columns={{minWidth: 220}} gap={3}>
          {SITE_DEMOS.map((d) => (
            <Card key={d.id} padding={5}>
              <VStack gap={2} hAlign="start">
                <Text type="tag" color="secondary">{d.tag}</Text>
                <Heading level={3}>{d.name}</Heading>
                <Text type="supporting">{d.desc}</Text>
                <Button label="Ouvrir" variant="secondary" onClick={() => setOpen(d.id)} />
              </VStack>
            </Card>
          ))}
        </Grid>
      </VStack>

      <Dialog isOpen={open === 'site-note'} onOpenChange={(o) => !o && close()} size="sm" title="Offre de lancement" actions={<Button label="Fermer" variant="primary" onClick={close} />}>
        <Text type="body">Jusqu'au 31 octobre, le premier mois est offert sur toutes les formules.</Text>
      </Dialog>

      <Dialog
        isOpen={open === 'site-terms'}
        onOpenChange={(o) => !o && close()}
        size="lg"
        purpose="required"
        eyebrow="Conditions"
        title="Conditions générales de vente"
        actions={<Button label="J'accepte" variant="primary" onClick={close} />}>
        {Array.from({length: 8}, (_, i) => (
          <VStack key={i} gap={2}>
            <Heading level={3}>Article {i + 1}</Heading>
            <Text type="body">{LOREM}</Text>
          </VStack>
        ))}
      </Dialog>

      <Dialog isOpen={open === 'site-form'} onOpenChange={(o) => !o && close()} size="md" purpose="form" eyebrow="Rappel gratuit" title="Demander une démo">
        <Text type="body">Laissez vos coordonnées, un conseiller vous rappelle sous 24 h ouvrées.</Text>
        <SiteForm
          id="dialog-site-form"
          framed={false}
          steps={SITE_FORM}
          submitLabel="Envoyer ma demande"
          submitAction={fakeSubmit}
          confirmation={{type: 'message', content: <Text type="body">Merci, votre demande est bien partie.</Text>}}
        />
      </Dialog>

      {/* SM: confirmation */}
      {(['sm', 'sm-d'] as const).map((id) => (
        <Dialog
          key={id}
          isOpen={open === id}
          onOpenChange={(o) => !o && close()}
         
          tone={id.endsWith('-d') ? 'night' : 'light'}
          eyebrow={eyebrow}
          title="Supprimer ce chiffrage ?"
          actions={
            <>
              <Button label="Annuler" variant="ghost" onClick={close} />
              <Button label="Supprimer" variant="destructive" onClick={close} />
            </>
          }>
          <Text type="body">Le chiffrage et ses postes seront définitivement supprimés. Cette action est irréversible.</Text>
        </Dialog>
      ))}

      {/* MD: form */}
      {(['md', 'md-d'] as const).map((id) => (
        <Dialog
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
              <Button label="Annuler" variant="ghost" onClick={close} />
              <Button label="Créer le chiffrage" variant="primary" onClick={close} />
            </>
          }>
          <Text type="body">Renseignez les bases du projet, vous pourrez affiner chaque poste ensuite.</Text>
          <Field label="Intitulé du projet" value={projet} onChange={setProjet} />
          <Grid columns={2} gap={4}>
            <Select
              label="Type de bien"
              options={[
                {value: 'collectif', label: 'Logement collectif'},
                {value: 'maison', label: 'Maison individuelle'},
                {value: 'tertiaire', label: 'Tertiaire'},
              ]}
              value={bien}
              onChange={setBien}
            />
            <Field label="Surface (m²)" value={surface} onChange={setSurface} />
          </Grid>
        </Dialog>
      ))}

      {/* LG: long document */}
      {(['lg', 'lg-d'] as const).map((id) => (
        <Dialog
          key={id}
          isOpen={open === id}
          onOpenChange={(o) => !o && close()}
          size="lg"
          tone={id.endsWith('-d') ? 'night' : 'light'}
          eyebrow={withEyebrow ? 'Conditions' : undefined}
          title="Conditions générales d'utilisation"
          actions={
            <>
              <Button label="Refuser" variant="ghost" onClick={close} />
              <Button label="Accepter" variant="primary" onClick={close} />
            </>
          }>
          {Array.from({length: 6}, (_, i) => (
            <VStack key={i} gap={2}>
              <Heading level={3}>Article {i + 1}</Heading>
              <Text type="body">{LOREM}</Text>
              <Text type="body">{LOREM}</Text>
            </VStack>
          ))}
        </Dialog>
      ))}
    </VStack>
  );
}
