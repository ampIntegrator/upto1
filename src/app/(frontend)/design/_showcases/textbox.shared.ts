/* Demo Lexical document for the text box and the rich text (what the editor stores). */
import type {RichTextDocument} from '@/components/RichText';

const t = (text: string, format = 0) => ({type: 'text', text, format});
const p = (...children: object[]) => ({type: 'paragraph', children});
const li = (...children: object[]) => ({type: 'listitem', children});

export const LOREM_DOC: RichTextDocument = {
  root: {
    children: [
      p(t('Lorem ipsum dolor sit amet, '), t('consectetur adipiscing elit', 1), t('. Sed do eiusmod tempor incididunt ut labore et '), {type: 'link', fields: {url: '#', linkType: 'custom'}, children: [t('dolore magna aliqua')]}, t('.')),
      {type: 'list', listType: 'bullet', children: [li(t('Chiffrage travaux en 20 min')), li(t('Rapport certifié '), t('expert BTP', 1)), li(t('Note de calcul détaillée'))]},
      p(t('Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')),
      {type: 'list', listType: 'number', children: [li(t('Vous décrivez')), li(t('Vous recevez')), li(t('Vous signez'))]},
    ] as RichTextDocument['root']['children'],
  },
};
