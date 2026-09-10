// Démo d'origine (composant Astryx, pas encore habillé).

'use client';

import {Pagination} from '@astryxdesign/core/Pagination';
import {VStack} from '@astryxdesign/core/Stack';
import {useState} from 'react';

export default function PaginationShowcase() {
  const [page, setPage] = useState(3);
  return (
    <VStack gap={4} align="start">
      <Pagination page={page} onChange={setPage} totalPages={12} label="Pagination" />
      <Pagination page={page} onChange={setPage} totalItems={240} pageSize={20} hasFirstLast label="Pagination avec premier et dernier" />
    </VStack>
  );
}
