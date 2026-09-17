/* Demo case study (mockups 23 and 24): hero, fact sheet, story with inserted figures,
   realisation cards. Shared by the catalogue showcases and the « réalisation » and
   « réalisations » demo pages. */
import type {CardProps} from '@/components/Card';
import type {CaseHeroProps} from '@/components/CaseHero';
import type {CaseSheetProps} from '@/components/CaseSheet';
import type {RichTextDocument, RichTextNode} from '@/components/rich-text';
import {GALLERY, IMG, STATS} from './post.shared';

const t = (text: string, format = 0) => ({type: 'text', text, format});
const p = (...children: object[]) => ({type: 'paragraph', children});
const h2 = (text: string) => ({type: 'heading', tag: 'h2', children: [t(text)]});
const li = (...children: object[]) => ({type: 'listitem', children});
const block = (fields: Record<string, unknown>) => ({type: 'block', fields});

export const CASE_HERO: CaseHeroProps = {
  cover: {src: IMG('1503387762-592deb58ef4e', 1920), alt: ''},
  chips: [{label: 'Étude de cas', tone: 'cat'}, {label: 'Rénovation', tone: 'high'}],
  title: 'Comment Vasseur Construction a <span>divisé par trois</span> son temps de chiffrage',
  lead: 'Estimer un chantier de rénovation prenait jusqu’à trois jours. En six semaines, l’équipe a ramené ce délai à quelques heures, sans embaucher, sans rogner sur la précision.',
};

export const CASE_SHEET: CaseSheetProps = {
  rows: [
    {label: 'Client', value: 'Vasseur Construction', href: 'https://example.com', hrefLabel: 'Site de Vasseur Construction'},
    {label: 'Catégorie', value: 'Rénovation & gros œuvre'},
    {label: 'Localisation', value: 'Nantes (44)'},
    {label: 'Déploiement', value: '6 semaines · mars 2025'},
    {label: 'Modules Orbita', value: 'Chiffrage instantané, métré automatique, devis client'},
  ],
  results: [
    {value: '−68 %', label: 'Temps de chiffrage'},
    {value: '×2,4', label: 'Devis envoyés'},
  ],
  cta: {label: 'Réserver une démo', href: '#'},
};

/** The story of mockup 23: the blog's prose and figures, nothing specific. */
export const CASE_DOC: RichTextDocument = {
  root: {
    children: [
      p(t('Vasseur Construction signe une centaine de chantiers par an, de la rénovation énergétique au gros œuvre. Mais derrière chaque affaire signée, un même goulot d’étranglement : le chiffrage.')),
      h2('Le contexte : un seul métreur, cent chantiers'),
      p(t('Comme beaucoup d’entreprises de sa taille, Vasseur reposait sur l’expérience d’un unique métreur. Quand les demandes s’accumulaient, les devis partaient en retard, et les '), t('meilleures affaires filaient chez le concurrent le plus réactif', 1), t('.')),
      {type: 'list', listType: 'bullet', children: [li(t('Un seul métreur expérimenté pour toute l’agence')), li(t('Trois jours de délai moyen entre la visite et le devis')), li(t('Près d’une affaire sur quatre perdue, faute de réactivité'))]},
      {type: 'quote', children: [t('« On perdait des chantiers non pas sur le prix, mais sur le délai. Le premier qui chiffre, c’est souvent celui qui signe. »'), {type: 'linebreak'}, t('— Julien Vasseur, gérant')]},
      h2('Le déploiement, étape par étape'),
      p(t('Inutile de tout changer d’un coup. Le déploiement s’est fait en six semaines, levier après levier, sans interrompre l’activité :')),
      {type: 'list', listType: 'number', children: [li(t('Reprise de la bibliothèque de prix', 1), t(' existante, telle quelle.')), li(t('Paramétrage des ouvrages types', 1), t(' les plus fréquents.')), li(t('Métré automatique', 1), t(' connecté aux plans PDF et DWG.')), li(t('Formation de l’équipe', 1), t(' en deux demi-journées.'))]},
      block({blockType: 'statsBand', items: STATS}),
      h2('Sur le terrain'),
      p(t('Six mois après la bascule, le métreur n’est plus un goulot mais un chef d’orchestre : il valide, ajuste, arbitre, pendant que les estimations courantes sortent en quelques heures.')),
      block({blockType: 'gallery', images: GALLERY, caption: 'Chantiers chiffrés avec Orbita (Nantes, 2025).'}),
      block({blockType: 'keyPoints'}),
      h2('Les résultats, six mois après'),
      p(t('Le délai moyen d’envoi d’un devis est passé de trois jours à moins de quarante-huit heures. Le volume de devis émis a plus que doublé, sans embauche.')),
      block({blockType: 'quoteCard', quote: '« En six semaines, on a transformé notre point faible en avantage commercial. »', name: 'Julien Vasseur', role: 'Gérant · Vasseur Construction', photo: {src: IMG('1560250097-0b93528c311a', 96), alt: ''}}),
    ] as RichTextNode[],
  },
};

const WORK = [
  {photo: '1503387762-592deb58ef4e', category: 'Rénovation', title: 'Vasseur Construction : le chiffrage divisé par trois', client: 'Vasseur Construction', location: 'Nantes (44)', result: '−68 % délai'},
  {photo: '1541888946425-d81bb19240f5', category: 'Gros œuvre', title: 'Bâti Méridien fiabilise ses métrés directement sur plans', client: 'Bâti Méridien', location: 'Lyon (69)', result: '×2,4 devis'},
  {photo: '1504307651254-35680f356dfd', category: 'Couverture', title: 'Toitures Caron sécurise ses marges sur chaque chantier', client: 'Toitures Caron', location: 'Rennes (35)', result: '+18 pts marge'},
  {photo: '1590725140246-20acdee442be', category: 'Aménagement', title: 'Atelier Lhomme répond aux appels d’offres en 24 heures', client: 'Atelier Lhomme', location: 'Lille (59)', result: '24 h délai'},
  {photo: '1523217582562-09d0def993a6', category: 'Charpente', title: 'Bois & Cie standardise ses devis les plus complexes', client: 'Bois & Cie', location: 'Annecy (74)', result: '+31 % closing'},
  {photo: '1581094794329-c8112a89af12', category: 'CVC', title: 'Réseau Calé pilote quarante chantiers en parallèle', client: 'Réseau Calé', location: 'Bordeaux (33)', result: '40 chantiers/mois'},
];

export const CASE_CARDS: CardProps[] = WORK.map((w) => ({
  preset: 'realisation',
  media: {type: 'image', src: IMG(w.photo, 800), alt: ''},
  chip: {label: w.category, tone: 'high'},
  result: w.result,
  title: w.title,
  client: {name: w.client, location: w.location},
  cta: {label: 'Voir l’étude', href: '#'},
}));

export const CASE_CATEGORIES = ['Rénovation', 'Gros œuvre', 'Couverture', 'Aménagement'];
