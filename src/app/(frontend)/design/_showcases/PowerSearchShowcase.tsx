/* Showcase habillé Orbita — PowerSearch Astryx aux codes des champs Orbita (58 px, label flottant, jetons accent). */
'use client';

import {PowerSearch, type PowerSearchConfig, type PowerSearchFilter} from '@astryxdesign/core/PowerSearch';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useState} from 'react';

const config: PowerSearchConfig = {
  name: 'RechercheChantiers',
  fields: [
    {
      key: 'statut',
      label: 'Statut',
      defaultOperator: 'est',
      operators: [
        {
          key: 'est',
          label: 'est',
          value: {
            type: 'enum',
            values: [
              {value: 'ouvert', label: 'Ouvert'},
              {value: 'en_cours', label: 'En cours'},
              {value: 'clos', label: 'Clos'},
            ],
          },
        },
      ],
    },
    {
      key: 'titre',
      label: 'Titre',
      defaultOperator: 'contient',
      operators: [{key: 'contient', label: 'contient', value: {type: 'string'}}],
    },
  ],
};

const initial: PowerSearchFilter[] = [
  {field: 'statut', operator: 'est', value: {type: 'enum', value: 'ouvert'}},
  {field: 'titre', operator: 'contient', value: {type: 'string', value: 'lilas'}},
];

export default function PowerSearchShowcase() {
  const [filters, setFilters] = useState<PowerSearchFilter[]>(initial);
  const [empty, setEmpty] = useState<PowerSearchFilter[]>([]);
  return (
    <VStack gap={4}>
      <Text type="body" color="secondary">Recherche à filtres Astryx, aux codes des champs Orbita : 58 px, label « Rechercher » flottant, jetons de filtre en badges couleur silo, panneau de suggestions habillé comme les sélecteurs.</Text>
      <VStack gap={4} style={{maxWidth: 640}}>
        <PowerSearch label="Rechercher" config={config} filters={filters} onChange={(next) => setFilters([...next])} placeholder=" " />
        <PowerSearch label="Rechercher un chantier" config={config} filters={empty} onChange={(next) => setEmpty([...next])} placeholder=" " />
      </VStack>
    </VStack>
  );
}
