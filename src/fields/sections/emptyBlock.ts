import type {Block} from 'payload';

/**
 * Case vide : un bloc sans champ qui réserve l'emplacement d'une colonne sans rien afficher.
 * Ce n'est pas un composant : sur le site, la colonne se comporte comme une colonne sans
 * contenu (place gardée sur desktop, masquée sous 768 px, grisée dans l'ordre mobile).
 * Premier du sélecteur, dans le groupe « Structure ».
 */
export const EMPTY_SLUG = 'empty';

export const emptyBlock: Block = {
  slug: EMPTY_SLUG,
  labels: {singular: 'Case vide', plural: 'Cases vides'},
  imageURL: `/apercus/${EMPTY_SLUG}.png`,
  imageAltText: 'Case vide',
  admin: {group: 'Structure'},
  fields: [],
};
