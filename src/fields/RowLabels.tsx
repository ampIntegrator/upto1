'use client';

import {useRowLabel} from '@payloadcms/ui';
import React from 'react';

import {fieldsText} from '@/i18n/admin/fields';
import {useAdminText} from '@/i18n/admin/useAdminText';

/** Row label: the network name rather than « Réseau 01 ». */
export function SocialRowLabel() {
  const {data, rowNumber} = useRowLabel<{label?: string}>();
  const {t} = useAdminText();
  return <span>{data?.label || t(fieldsText.rowLabels.social, {n: String((rowNumber ?? 0) + 1).padStart(2, '0')})}</span>;
}
