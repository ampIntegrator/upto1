'use client';

import {useRowLabel} from '@payloadcms/ui';
import React from 'react';

/** Libellé de ligne : nom du réseau plutôt que « Réseau 01 ». */
export function SocialRowLabel() {
  const {data, rowNumber} = useRowLabel<{label?: string}>();
  return <span>{data?.label || `Réseau ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>;
}
