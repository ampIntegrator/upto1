/* Demo Lexical documents for the text box, the tabs and the rich text (what the editor stores). */
import type {RichTextDocument, RichTextNode} from '@/components/rich-text';

const t = (text: string, format = 0) => ({type: 'text', text, format});
const p = (...children: object[]) => ({type: 'paragraph', children});
const li = (...children: object[]) => ({type: 'listitem', children});
const h = (tag: string, text: string) => ({type: 'heading', tag, children: [t(text)]});
const cell = (text: string, headerState = 0) => ({type: 'tablecell', headerState, children: [p(t(text))]});
const row = (cells: string[], header = false) => ({type: 'tablerow', children: cells.map((c) => cell(c, header ? 1 : 0))});

export const LOREM_DOC: RichTextDocument = {
  root: {
    children: [
      p(t('Lorem ipsum dolor sit amet, '), t('consectetur adipiscing elit', 1), t('. Sed do eiusmod tempor incididunt ut labore et '), {type: 'link', fields: {url: '#', linkType: 'custom'}, children: [t('dolore magna aliqua')]}, t('.')),
      {type: 'list', listType: 'bullet', children: [li(t('Chiffrage travaux en 20 min')), li(t('Rapport certifié '), t('expert BTP', 1)), li(t('Note de calcul détaillée'))]},
      p(t('Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')),
      {type: 'list', listType: 'number', children: [li(t('Vous décrivez')), li(t('Vous recevez')), li(t('Vous signez'))]},
    ] as RichTextNode[],
  },
};

/** A post's prose: headings, quote with attribution, table, rule, lists. */
export const PROSE_DOC: RichTextDocument = {
  root: {
    children: [
      h('h2', 'Le cycle commercial, ce maillon qui fuit'),
      p(t('Entre l’estimation envoyée et le paiement encaissé, le temps se perd en '), t('ressaisies', 1), t(', en relances et en allers-retours. Chaque étape '), t('isolée', 2), t(' fonctionne ; c’est la chaîne qui casse.')),
      h('h3', 'Là où le temps se perd'),
      {type: 'list', listType: 'bullet', children: [li(t('Le devis part en retard, faute de métré')), li(t('La relance dépend de la mémoire du commercial')), li(t('La facture ressaisit ce que le devis savait déjà'))]},
      {type: 'quote', children: [t('« On ne pilote bien que ce qu’on rend visible. Tant que le cycle reste dans des tableurs, personne ne le voit. »'), {type: 'linebreak'}, t('— Marie Lefebvre, responsable produit')]},
      h('h2', 'Trois leviers d’industrialisation'),
      {type: 'list', listType: 'number', children: [li(t('Standardiser le devis', 1), t(' : un modèle unique, des postes pré-chiffrés.')), li(t('Automatiser la relance', 1), t(' : J+3, J+7, J+15, sans y penser.')), li(t('Relier devis et facture', 1), t(' : la donnée saisie une fois circule jusqu’au paiement.'))]},
      {type: 'table', children: [row(['Levier', 'Effort', 'Gain de temps', 'Délai de retour'], true), row(['Devis standardisé', 'Faible', '−35 %', '2 sem.']), row(['Relance automatisée', 'Faible', '−48 %', '1 sem.']), row(['Devis → facture reliés', 'Moyen', '−21 %', '6 sem.'])]},
      {type: 'horizontalrule'},
      h('h4', 'Pour aller plus loin'),
      p(t('Mesurez le délai devis → facture avant tout autre indicateur.')),
    ] as RichTextNode[],
  },
};
