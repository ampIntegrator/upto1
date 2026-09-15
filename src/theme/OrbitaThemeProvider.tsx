'use client';

/**
 * Orbita theme provider.
 *
 * - Mounts the Astryx <Theme> with the current accent silo and mode (light / dark /
 *   system);
 * - wires next/link into all Astryx links (LinkProvider);
 * - switches Astryx components to French (InternationalizationProvider);
 * - exposes `useOrbitaTheme()` to change silo (catalog, future back-office
 *   selector). The silo is persisted in localStorage.
 *
 * The site has only one mode: light. « Night » sections are blocks that
 * nest their own <Theme mode="dark"> (see the dressed components).
 * `mode` stays in the API for these nested themes, but is no longer changed
 * globally.
 *
 * The 7 compiled CSS files are loaded here: ~48 KB each. In production, a page
 * only needs its silo — to refine once the silo is set by Payload.
 */
import {InternationalizationProvider} from '@astryxdesign/core/i18n';
import {LinkProvider} from '@astryxdesign/core/Link';
import {type DefinedTheme, Theme} from '@astryxdesign/core/theme';
import NextLink from 'next/link';
import React, {createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore} from 'react';

import {ASTRYX_NUCLEO_ICONS} from './icons/astryx-icons';
import {type ColorMode, DEFAULT_SILO, ORBITA_THEMES, SILO_NAMES, type SiloName} from './index';

import frFR from '@astryxdesign/core/locales/fr-FR.json';

import './built/orbita-blue.css';
import './built/orbita-green.css';
import './built/orbita-orange.css';
import './built/orbita-violet.css';
import './built/orbita-magenta.css';
import './built/orbita-ambre.css';

type OrbitaThemeContextValue = {
  /** Current Astryx theme object (compiled tokens + Nucleo icons), for a nested <Theme> (night section…). */
  theme: DefinedTheme;
  silo: SiloName;
  setSilo: (silo: SiloName) => void;
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
};

const OrbitaThemeContext = createContext<OrbitaThemeContextValue | null>(null);

const STORAGE_KEY = 'orbita:theme';

/** Subscription to localStorage changes (other tabs + our own writes). */
const listeners = new Set<() => void>();
function subscribeStorage(cb: () => void) {
  listeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

function readStored(): {silo?: SiloName; mode?: ColorMode} {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as {silo?: string; mode?: string};
    return {
      silo: SILO_NAMES.includes(parsed.silo as SiloName) ? (parsed.silo as SiloName) : undefined,
      mode: ['light', 'dark', 'system'].includes(parsed.mode ?? '') ? (parsed.mode as ColorMode) : undefined,
    };
  } catch {
    return {};
  }
}

export function OrbitaThemeProvider({
  children,
  initialSilo = DEFAULT_SILO,
  initialMode = 'light',
  fixedSilo,
}: {
  children: React.ReactNode;
  initialSilo?: SiloName;
  initialMode?: ColorMode;
  /** forced silo (site: Payload setting or page silo) — ignores the catalog's local storage */
  fixedSilo?: SiloName;
}) {
  // Persisted silo: minimal store on localStorage, read after hydration (SSR: initialSilo).
  const storedSilo = useSyncExternalStore(subscribeStorage, () => readStored().silo ?? null, () => null);
  const [override, setSiloState] = useState<SiloName | null>(null);
  const silo: SiloName = fixedSilo ?? override ?? storedSilo ?? initialSilo;
  const [mode, setModeState] = useState<ColorMode>(initialMode);

  const persist = useCallback((next: {silo: SiloName; mode: ColorMode}) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      listeners.forEach((cb) => cb());
    } catch {
      /* storage unavailable: ignore */
    }
  }, []);

  const setSilo = useCallback(
    (next: SiloName) => {
      setSiloState(next);
      persist({silo: next, mode});
    },
    [mode, persist],
  );

  const setMode = useCallback(
    (next: ColorMode) => {
      setModeState(next);
      persist({silo, mode: next});
    },
    [silo, persist],
  );

  // Compiled theme (tokens, CSS) + Nucleo icons (React, hence outside CLI compilation).
  const theme = useMemo<DefinedTheme>(() => ({...ORBITA_THEMES[silo], icons: ASTRYX_NUCLEO_ICONS}), [silo]);

  const value = useMemo(() => ({theme, silo, setSilo, mode, setMode}), [theme, silo, setSilo, mode, setMode]);

  return (
    <OrbitaThemeContext.Provider value={value}>
      <InternationalizationProvider locale="fr-FR" messages={{'fr-FR': frFR}}>
        <Theme theme={theme} mode={mode}>
          <LinkProvider component={NextLink}>{children}</LinkProvider>
        </Theme>
      </InternationalizationProvider>
    </OrbitaThemeContext.Provider>
  );
}

export function useOrbitaTheme(): OrbitaThemeContextValue {
  const ctx = useContext(OrbitaThemeContext);
  if (!ctx) throw new Error('useOrbitaTheme() doit être utilisé sous <OrbitaThemeProvider>');
  return ctx;
}
