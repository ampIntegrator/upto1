'use client';

/**
 * SiloMark — writes the page's silo on <html> (`data-page-silo`), so what renders outside the page's
 * theme (a modal opened over the page, in the layout's modal slot) can take the same silo. Renders
 * nothing. Mounted by SitePage.
 */
import {useEffect} from 'react';

import type {SiloName} from '@/theme/index';

export const PAGE_SILO_ATTRIBUTE = 'data-page-silo';

export function SiloMark({silo}: {silo: SiloName}) {
  useEffect(() => {
    document.documentElement.setAttribute(PAGE_SILO_ATTRIBUTE, silo);
  }, [silo]);
  return null;
}
