import React from 'react';

import {PageDemo} from './PageDemo';

export const metadata = {title: 'Mise en page — plein écran · image (maquette 16)'};

/** Standalone page, without the catalog: a stack of full-width sections,
 *  built only with design system components. */
export default function Page() {
  return <PageDemo blocks="light" />;
}
