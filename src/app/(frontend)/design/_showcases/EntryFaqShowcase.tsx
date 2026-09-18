/* Design-system-specific component: src/components/EntryFaq (the FAQ under a post or a case study, mockup 18). */
'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {EntryFaq} from '@/components/EntryFaq';

const ITEMS = [
  {question: 'Combien de temps pour déployer le premier levier ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  {question: 'Faut-il changer d’outil de facturation ?', answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'},
  {question: 'Mes équipes vont-elles devoir tout ressaisir ?', answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.\n\nTotam rem aperiam, eaque ipsa quae ab illo inventore veritatis.'},
  {question: 'Comment mesurer le retour sur investissement ?', answer: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'},
];

export default function EntryFaqShowcase() {
  return (
    <VStack gap={6}>
      <Text type="body" color="secondary">Sous un article ou une réalisation, avant les contenus liés : section nuit pleine largeur, surtitre et titre facultatifs (communs à tous les articles, balise h2 par défaut ; sans titre, pas d’en-tête), accordéon sur deux colonnes, une question ouverte à la fois, la première ouverte. Les questions prennent le niveau sous le titre.</Text>
      <EntryFaq eyebrow="FAQ" title="Questions <span>fréquentes</span>" items={ITEMS} id="faq-demo" />
      <Text type="body" color="secondary">Sans titre (comme la maquette 18) :</Text>
      <EntryFaq items={ITEMS.slice(0, 2)} id="faq-demo-2" />
    </VStack>
  );
}
