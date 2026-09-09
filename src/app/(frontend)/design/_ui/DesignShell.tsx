'use client';

import {AppShell} from '@astryxdesign/core/AppShell';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {SideNav, SideNavHeading, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {Icon} from '@astryxdesign/core/Icon';
import {VStack} from '@astryxdesign/core/Stack';
import {TextInput} from '@astryxdesign/core/TextInput';
import {usePathname} from 'next/navigation';
import React, {useMemo, useState} from 'react';

import {SearchIcon} from '@/theme/icons/nucleo';

import {type ColorMode, SILO_LABELS, SILO_NAMES, type SiloName} from '@/theme';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import styles from './DesignShell.module.css';
import {CATALOG} from './catalog.generated';
import {FOUNDATIONS} from './nav';

/** Comparaison sans accents ni casse. */
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function ThemeControls({query, onQuery}: {query: string; onQuery: (q: string) => void}) {
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
      <TextInput
        label="Filtrer le catalogue"
        isLabelHidden
        placeholder="Filtrer…"
        value={query}
        onChange={onQuery}
        startIcon={<Icon icon={SearchIcon} />}
        hasClear
        size="sm"
      />
    </VStack>
  );
}

export function DesignShell({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const q = norm(query.trim());
  const foundations = useMemo(() => (q ? FOUNDATIONS.filter((e) => norm(e.label).includes(q)) : FOUNDATIONS), [q]);
  const catalog = useMemo(
    () =>
      q
        ? CATALOG.map((c) => ({...c, items: c.items.filter((it) => norm(it.label).includes(q) || norm(it.name).includes(q))})).filter((c) => c.items.length > 0)
        : CATALOG,
    [q],
  );
  const nothing = q && foundations.length === 0 && catalog.length === 0;
  return (
    <AppShell
      className={styles.shell}
      variant="section"
      contentPadding={8}
      sideNav={
        <SideNav
          header={<SideNavHeading heading="Orbita × Astryx" headingHref="/design" />}
          topContent={<ThemeControls query={query} onQuery={setQuery} />}>
          {nothing ? <span className={styles.empty}>Aucun résultat pour « {query} »</span> : null}
          <SideNavSection title="Fondations" isHeaderHidden={q !== '' && foundations.length === 0}>
            {!q ? <SideNavItem label="Vue d'ensemble" href="/design" isSelected={pathname === '/design'} /> : null}
            {foundations.map((e) => (
              <SideNavItem key={e.slug} label={e.label} href={e.href} isSelected={pathname === e.href} />
            ))}
          </SideNavSection>
          <SideNavSection title="Composants" isHeaderHidden={q !== '' && catalog.length === 0}>
            {!q ? <SideNavItem label="Vue d'ensemble" href="/design/composants" isSelected={pathname === '/design/composants'} /> : null}
            {catalog.map((cat) => (
              <React.Fragment key={cat.slug}>
                <span className={styles.groupLabel}>{cat.label}</span>
                {cat.items.map((it) => (
                  <SideNavItem key={it.slug} label={it.label} href={it.href} isSelected={pathname === it.href} />
                ))}
              </React.Fragment>
            ))}
          </SideNavSection>
        </SideNav>
      }>
      {children}
    </AppShell>
  );
}
