import React from 'react';

import {PageDemo} from './PageDemo';

export const metadata = {title: 'Mise en page — hero média plein écran (maquette 16)'};

/** Page autonome, sans le catalogue : une pile de sections pleine largeur,
 *  assemblée uniquement avec les composants du design system. */
export default function Page() {
  return <PageDemo />;
}
