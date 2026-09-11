import type {TextField} from 'payload';

import {NUCLEO_KEYS} from '@/theme/icons/keys';

/**
 * Champ « icône » : une clé du jeu Nucleo (icons/astryx + icons/vidomia), choisie dans un
 * tiroir à grille de six icônes de large avec recherche (IconPicker). Stocke la clé (texte),
 * jamais le SVG : le front rend l'icône compilée par `pnpm icons:build`.
 */
export function iconField(overrides: Partial<TextField> & {name: string}): TextField {
  const {admin, ...rest} = overrides;
  return {
    type: 'text',
    label: 'Icône',
    validate: (value: unknown) => {
      if (!value) return true;
      return (NUCLEO_KEYS as string[]).includes(String(value)) || `Icône inconnue : ${String(value)}`;
    },
    ...rest,
    admin: {
      ...admin,
      components: {Field: '@/fields/IconPicker#IconPicker'},
    },
  } as TextField;
}
