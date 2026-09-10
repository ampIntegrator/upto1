import React from 'react';

import {PageDemo} from '../PageDemo';

export const metadata = {title: 'Mise en page — hero clair'};

/** Même page assemblée, avec un haut de page clair (sans média) : l'en-tête reste clair. */
export default function Page() {
  return <PageDemo hero="light" />;
}
