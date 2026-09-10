/* Onglets de démonstration (maquette 06-tabs) : liste + panneau de contenu. */
'use client';

import {Tab, TabList} from '@astryxdesign/core/TabList';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

export const TABS = [
  {value: 'standard', label: 'Le standard se perd en route', text: "Le contrat cadre est négocié au siège, mais l'intervention se fait sur site, souvent par un sous-traitant régional. Le franchisé ou le gérant de magasin n'a aucun moyen de vérifier que la prestation correspond à ce que vous avez payé."},
  {value: 'reporting', label: 'Le reporting est introuvable', text: "Chaque mainteneur a son propre outil, son propre format. Consolider l'activité de 200 sites devient un travail manuel de plusieurs jours, et les chiffres sont déjà périmés quand ils arrivent."},
  {value: 'pannes', label: 'Les pannes deviennent des incidents', text: "Sans astreinte structurée ni priorisation claire, une fuite ou une panne de froid attend le prochain passage planifié. Le petit problème devient un sinistre, et le client final ne voit que la fermeture du magasin."},
  {value: 'refacturation', label: 'La refacturation tourne mal', text: "Refacturer la maintenance à chaque site ou franchisé suppose un détail précis par poste. Sans données fiables, la refacturation est contestée, retardée, parfois abandonnée."},
] as const;

/** Liste d'onglets à largeur égale + panneau (fond silo 10 %, carte, liseré dégradé). */
export function TabsWithPanel({id}: {id: string}) {
  const [value, setValue] = useState<string>(TABS[0].value);
  const current = TABS.find((t) => t.value === value) ?? TABS[0];
  return (
    <VStack style={{border: 'var(--border-width) solid var(--color-border)', background: 'var(--color-background-surface)', boxShadow: 'var(--shadow-md)'}}>
      <TabList value={value} onChange={setValue} layout="fill" hasDivider role="tablist" aria-label="Situations">
        {TABS.map((t) => <Tab key={t.value} value={t.value} label={t.label} panelId={`${id}-${t.value}`} />)}
      </TabList>
      <VStack padding={10} style={{background: 'light-dark(var(--color-accent-muted), rgba(255,255,255,.04))'}}>
        <VStack id={`${id}-${current.value}`} role="tabpanel" className="orbita-tab-panel" align="center" style={{background: 'var(--color-background-surface)', padding: '44px 56px'}}>
          <Text type="body" style={{fontSize: '16.5px', lineHeight: 1.65, maxWidth: '880px'}} color="secondary">{current.text}</Text>
        </VStack>
      </VStack>
    </VStack>
  );
}
