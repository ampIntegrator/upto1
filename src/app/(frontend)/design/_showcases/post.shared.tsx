/* Demo post (mockup 18): prose with inserted figure blocks, author, article cards. Shared by the
   catalogue showcases and the « article » and « blog » demo pages. */
import React from 'react';

import type {CardProps} from '@/components/Card';
import {CtaBand} from '@/components/CtaBand';
import {Gallery} from '@/components/Gallery';
import {KeyPoints} from '@/components/KeyPoints';
import type {PostAuthor} from '@/components/PostHeader';
import {QuoteCard} from '@/components/QuoteCard';
import type {RichTextDocument, RichTextNode} from '@/components/rich-text';
import {StatsBand} from '@/components/StatsBand';
import {PROSE_DOC} from './textbox.shared';

export const IMG = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export const COVER = IMG('1454165804606-c3d57bc86b40');
const PHOTO = IMG('1494790108377-be9c29b29330', 96);
export const AUTHOR: PostAuthor = {name: 'Marie Lefebvre', role: 'Responsable produit · Vidomia', photo: {src: PHOTO, alt: ''}};

const t = (text: string, format = 0) => ({type: 'text', text, format});
const li = (...children: object[]) => ({type: 'listitem', children});
const block = (fields: Record<string, unknown>) => ({type: 'block', fields});

export const KEY_POINTS_DOC: RichTextDocument = {
  root: {children: [{type: 'list', listType: 'bullet', children: [li(t('Le gain le plus rapide vient de la '), t('relance automatisée', 1), t(', pas de l’outil le plus complexe.')), li(t('Une donnée saisie deux fois est une donnée qui finira par diverger.')), li(t('Mesurez le '), t('délai devis → facture', 1), t(' avant tout autre indicateur.'))]}] as RichTextNode[]},
};

export const STATS = [
  {value: '−68 %', label: 'Temps de chiffrage'},
  {value: '×2,4', label: 'Devis envoyés / mois'},
  {value: '+31 %', label: 'Taux de signature'},
  {value: '48 h', label: 'Délai moyen d’envoi'},
];

export const GALLERY = [
  {src: IMG('1541888946425-d81bb19240f5', 1200), alt: ''},
  {src: IMG('1504307651254-35680f356dfd', 800), alt: ''},
  {src: IMG('1503387762-592deb58ef4e', 800), alt: ''},
];

/** The demo post: the prose of the RichText showcase with figures inserted between its parts. */
const prose = PROSE_DOC.root.children;
export const POST_DOC: RichTextDocument = {
  root: {
    children: [
      ...prose.slice(0, 5),
      block({blockType: 'statsBand', items: STATS}),
      ...prose.slice(5, 7),
      block({blockType: 'keyPoints'}),
      block({blockType: 'ctaBand', variant: 'icon', iconKey: 'calculator', title: 'Estimez votre gain de temps', text: 'Quelques chiffres suffisent pour projeter l’impact sur votre cycle commercial.', button: {label: 'Lancer le calcul', href: '#', variant: 'high', arrow: true}}),
      ...prose.slice(7, 8),
      block({blockType: 'quoteCard', quote: '« En six semaines, on a transformé notre point faible en avantage commercial. Aujourd’hui, on répond plus vite que tout le monde. »', name: 'Julien Vasseur', role: 'Gérant · Vasseur Construction', photo: {src: IMG('1500648767791-00dcc994a43e', 96), alt: ''}}),
      {type: 'heading', tag: 'h2', children: [t('Sur le terrain')]},
      {type: 'paragraph', children: [t('Six mois après la bascule, le métreur n’est plus un goulot mais un chef d’orchestre : il valide, ajuste, arbitre, pendant que les estimations courantes sortent en quelques heures.')]},
      block({blockType: 'gallery', images: GALLERY, caption: 'Chantier Vasseur, Nantes : métré automatique sur plans.'}),
      block({blockType: 'ctaBand', variant: 'arrow', title: 'Lire le guide du chiffrage en visite', button: {label: 'En savoir plus', href: '#', variant: 'high', arrow: true}}),
      ...prose.slice(8),
    ] as RichTextNode[],
  },
};

/** How the site renders the demo's inserted blocks (the Payload host does the same with real data). */
export function renderDemoBlock(node: RichTextNode): React.ReactNode {
  const f = (node.fields ?? {}) as Record<string, never>;
  switch (f.blockType as string) {
    case 'statsBand':
      return <StatsBand items={f.items} />;
    case 'keyPoints':
      return <KeyPoints content={KEY_POINTS_DOC} />;
    case 'ctaBand':
      return <CtaBand variant={f.variant} iconKey={f.iconKey} title={f.title} text={f.text} button={f.button} />;
    case 'quoteCard':
      return <QuoteCard quote={f.quote} name={f.name} role={f.role} photo={f.photo} />;
    case 'gallery':
      return <Gallery images={f.images} caption={f.caption} />;
    default:
      return null;
  }
}

const CATEGORIES = ['Chiffrage', 'Chantier', 'Métier', 'Produit'];
const TITLES = ['Du devis à la facturation : industrialiser le cycle commercial', 'Chiffrer un mur porteur : IPN ou HEB ?', 'Suivi de chantier : les cinq indicateurs qui comptent', 'Chiffrage Pro : ce qui arrive à la rentrée', 'Trois erreurs de chiffrage qui coûtent cher aux promoteurs', 'Relancer un devis sans relancer le client', 'Le métré sur plans, mode d’emploi', 'Rénovation énergétique : chiffrer juste'];
const PHOTOS = ['1454165804606-c3d57bc86b40', '1504307651254-35680f356dfd', '1541888946425-d81bb19240f5', '1460925895917-afdab827c52f', '1503387762-592deb58ef4e', '1497366216548-37526070297c', '1486406146926-c627a92ad1ab', '1581094794329-c8112a89af12'];

export const ARTICLE_CARDS: CardProps[] = TITLES.map((title, i) => ({
  preset: 'article',
  media: {type: 'image', src: IMG(PHOTOS[i], 800), alt: ''},
  chip: {label: CATEGORIES[i % 4]},
  date: `${12 - i} septembre 2026`,
  title,
  cta: {label: 'Lire l’article', href: '#'},
}));
