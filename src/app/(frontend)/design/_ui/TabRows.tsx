/* Onglets de démonstration (maquette 06-tabs) : liste + panneau de contenu. */
'use client';

import {Tab, TabList} from '@astryxdesign/core/TabList';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

export const TABS = [
  {value: 'standard', label: 'Le standard se perd en route', text: "Le contrat cadre est négocié au siège, mais l'intervention se fait sur site, souvent par un sous-traitant régional. Le franchisé ou le gérant de magasin n'a aucun moyen de vérifier que la prestation correspond à ce que vous avez payé.", more: "Résultat : des écarts de qualité d'un site à l'autre, des litiges à la réception, et une image de marque qui dépend du technicien du jour. Un standard n'existe que s'il est vérifié à chaque intervention, avec les mêmes points de contrôle partout."},
  {value: 'reporting', label: 'Le reporting est introuvable', text: "Chaque mainteneur a son propre outil, son propre format. Consolider l'activité de 200 sites devient un travail manuel de plusieurs jours, et les chiffres sont déjà périmés quand ils arrivent.", more: "Le comité de direction arbitre sur des tableaux reconstitués à la main, sans historique fiable ni comparaison entre régions. Impossible de savoir quel site coûte cher, lequel dérive, et pourquoi."},
  {value: 'pannes', label: 'Les pannes deviennent des incidents', text: "Sans astreinte structurée ni priorisation claire, une fuite ou une panne de froid attend le prochain passage planifié. Le petit problème devient un sinistre, et le client final ne voit que la fermeture du magasin.", more: "Chaque heure de retard se paie en stock perdu, en chiffre d'affaires manqué et en pénalités. La priorisation doit être décidée à la demande d'intervention, pas découverte à l'arrivée du technicien."},
  {value: 'refacturation', label: 'La refacturation tourne mal', text: "Refacturer la maintenance à chaque site ou franchisé suppose un détail précis par poste. Sans données fiables, la refacturation est contestée, retardée, parfois abandonnée.", more: "Les écarts entre devis, bon d'intervention et facture finissent en avoirs, en relances et en tension commerciale. Une seule chaîne de données, du chiffrage à la facture, évite d'y revenir."},
] as const;

/** Liste d'onglets à largeur égale + panneau (thème orbita.ts section ONGLETS ; panneau : classes .orbita-tab-stack / .orbita-tab-panel de styles.css). */
export function TabsWithPanel({id}: {id: string}) {
  const [value, setValue] = useState<string>(TABS[0].value);
  const current = TABS.find((t) => t.value === value) ?? TABS[0];
  return (
    <VStack style={{boxShadow: 'var(--shadow-med)'}}>
      <TabList value={value} onChange={setValue} layout="fill" role="tablist" aria-label="Situations">
        {TABS.map((t) => <Tab key={t.value} value={t.value} label={t.label} panelId={`${id}-${t.value}`} />)}
      </TabList>
      <VStack className="orbita-tab-stack">
        <VStack id={`${id}-${current.value}`} role="tabpanel" className="orbita-tab-panel" align="center">
          <VStack gap={4}>
            <Text type="body" style={{fontSize: '16.5px', lineHeight: 1.65}} color="secondary">{current.text}</Text>
            <Text type="body" style={{fontSize: '16.5px', lineHeight: 1.65}} color="secondary">{current.more}</Text>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
