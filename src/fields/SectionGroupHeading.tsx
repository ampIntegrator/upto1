'use client';

/**
 * SectionGroupHeading — the site's heading for a group of section settings (src/sections.config.ts
 * and the section builder): the neutral heading plus a Nucleo icon before the title.
 */
import React from 'react';

import {type GroupHeadingProps, groupHeadingStyle} from '@/fields/sections/GroupHeading';
import type {Text} from '@/i18n/admin/languages';
import {useAdminText} from '@/i18n/admin/useAdminText';
import {NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';

export function SectionGroupHeading({label, icon, first}: GroupHeadingProps) {
  const {t} = useAdminText();
  const Icon = icon && icon in NUCLEO_ICONS ? NUCLEO_ICONS[icon as NucleoIconKey] : null;
  return (
    <p style={groupHeadingStyle(first)}>
      {Icon ? <Icon width={16} height={16} aria-hidden="true" /> : null}
      {t(label as Text)}
    </p>
  );
}
