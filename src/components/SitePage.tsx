/**
 * SitePage — the shell of a site page: theme set to the page's silo, header, content,
 * footer. Server: receives already-converted data (lib/site.ts).
 */
import React from 'react';

import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';
import type {SiloName} from '@/theme/index';
import {BackToTop} from './BackToTop';
import {SiteFooter} from './SiteFooter';
import {SiteHeader} from './SiteHeader';
import type {SiteFooterData, SiteHeaderData} from './site-nav';

export function SitePage({silo, header, footer, tone, currentHref, children}: {silo: SiloName; header: SiteHeaderData; footer: SiteFooterData; tone?: 'auto' | 'light' | 'dark'; currentHref?: string; children: React.ReactNode}) {
  return (
    <OrbitaThemeProvider fixedSilo={silo}>
      <SiteHeader {...header} tone={tone} currentHref={currentHref} />
      {children}
      <SiteFooter {...footer} />
      <BackToTop />
    </OrbitaThemeProvider>
  );
}
