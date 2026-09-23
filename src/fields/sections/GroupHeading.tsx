'use client';

/**
 * GroupHeading — the neutral heading of a group of section settings: a rule and a small title.
 * Stores nothing (a `ui` field). The host may replace it with its own component (an icon, for
 * instance) through `sectionGroup({component})`: this one knows no icon set and no theme.
 */
import React from 'react';

import type {Text} from '@/i18n/admin/languages';
import {useAdminText} from '@/i18n/admin/useAdminText';

export type GroupHeadingProps = {label: Text; icon?: string; first?: boolean};

/** shared by this heading and the host's own (same rule, same type) */
export const groupHeadingStyle = (first?: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  margin: 0,
  marginBlockStart: first ? 0 : 'calc(var(--base, 20px) * 1.5)',
  marginBlockEnd: 'calc(var(--base, 20px) * 0.6)',
  paddingBlockStart: first ? 0 : 'calc(var(--base, 20px) * 0.9)',
  borderBlockStart: first ? 'none' : '1px solid var(--theme-elevation-150)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--theme-elevation-600)',
});

export function GroupHeading({label, first}: GroupHeadingProps) {
  const {t} = useAdminText();
  return <p style={groupHeadingStyle(first)}>{t(label)}</p>;
}
