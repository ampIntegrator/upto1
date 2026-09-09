'use client';

import {AppShell} from '@astryxdesign/core/AppShell';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {SideNav, SideNavHeading, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {VStack} from '@astryxdesign/core/Stack';
import {usePathname} from 'next/navigation';
import React from 'react';

import {type ColorMode, SILO_LABELS, SILO_NAMES, type SiloName} from '@/theme';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import styles from './DesignShell.module.css';
import {CATEGORIES, FOUNDATIONS} from './nav';

function ThemeControls() {
  const {silo, setSilo, mode, setMode} = useOrbitaTheme();
  return (
    <VStack gap={2} padding={2}>
      <Selector
        label="Silo d'accent"
        value={silo}
        onChange={(v) => setSilo(v as SiloName)}
        options={SILO_NAMES.map((s) => ({value: s, label: SILO_LABELS[s]}))}
        size="sm"
      />
      <SegmentedControl label="Mode" value={mode} onChange={(v) => setMode(v as ColorMode)}>
        <SegmentedControlItem value="light" label="Clair" />
        <SegmentedControlItem value="dark" label="Nuit" />
        <SegmentedControlItem value="system" label="Auto" />
      </SegmentedControl>
    </VStack>
  );
}

export function DesignShell({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  return (
    <AppShell
      className={styles.shell}
      variant="section"
      contentPadding={8}
      sideNav={
        <SideNav
          header={<SideNavHeading heading="Orbita × Astryx" headingHref="/design" />}
          topContent={<ThemeControls />}>
          <SideNavSection title="Fondations">
            <SideNavItem label="Vue d'ensemble" href="/design" isSelected={pathname === '/design'} />
            {FOUNDATIONS.map((e) => (
              <SideNavItem key={e.slug} label={e.label} href={e.href} isSelected={pathname === e.href} />
            ))}
          </SideNavSection>
          <SideNavSection title="Composants">
            {CATEGORIES.map((e) => (
              <SideNavItem key={e.slug} label={e.label} href={e.href} isSelected={pathname === e.href} />
            ))}
          </SideNavSection>
        </SideNav>
      }>
      {children}
    </AppShell>
  );
}
