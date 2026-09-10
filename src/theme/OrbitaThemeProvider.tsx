'use client';

/**
 * Fournisseur de thème Orbita.
 *
 * - Monte le <Theme> Astryx avec le silo d'accent et le mode (clair / sombre /
 *   système) courants ;
 * - branche next/link dans tous les liens Astryx (LinkProvider) ;
 * - passe les composants Astryx en français (InternationalizationProvider) ;
 * - expose `useOrbitaTheme()` pour changer de silo (catalogue, futur sélecteur
 *   back-office). Le silo est mémorisé dans localStorage.
 *
 * Le site n'a qu'un mode : clair. Les sections « nuit » sont des blocs qui
 * imbriquent leur propre <Theme mode="dark"> (voir les composants habillés).
 * `mode` reste dans l'API pour ces imbrications, mais n'est plus changé
 * globalement.
 *
 * Les 7 CSS compilés sont chargés ici : ~48 Ko chacun. En production, une page
 * n'a besoin que de son silo — à affiner quand le silo sera fixé par Payload.
 */
import {InternationalizationProvider} from '@astryxdesign/core/i18n';
import {LinkProvider} from '@astryxdesign/core/Link';
import {type DefinedTheme, Theme} from '@astryxdesign/core/theme';
import NextLink from 'next/link';
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {ASTRYX_NUCLEO_ICONS} from './icons/astryx-icons';
import {type ColorMode, DEFAULT_SILO, ORBITA_THEMES, SILO_NAMES, type SiloName} from './index';

import frFR from '@astryxdesign/core/locales/fr-FR.json';

import './built/orbita-blue.css';
import './built/orbita-green.css';
import './built/orbita-orange.css';
import './built/orbita-violet.css';
import './built/orbita-brique.css';
import './built/orbita-magenta.css';
import './built/orbita-ambre.css';

type OrbitaThemeContextValue = {
  /** Objet thème Astryx courant (tokens compilés + icônes Nucleo), pour un <Theme> imbriqué (section nuit…). */
  theme: DefinedTheme;
  silo: SiloName;
  setSilo: (silo: SiloName) => void;
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
};

const OrbitaThemeContext = createContext<OrbitaThemeContextValue | null>(null);

const STORAGE_KEY = 'orbita:theme';

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
}: {
  children: React.ReactNode;
  initialSilo?: SiloName;
  initialMode?: ColorMode;
}) {
  const [silo, setSiloState] = useState<SiloName>(initialSilo);
  const [mode, setModeState] = useState<ColorMode>(initialMode);

  // Restauration du silo mémorisé (après hydratation, pour rester SSR-safe).
  useEffect(() => {
    const stored = readStored();
    if (stored.silo) setSiloState(stored.silo);
  }, []);

  const persist = useCallback((next: {silo: SiloName; mode: ColorMode}) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* stockage indisponible : on ignore */
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

  // Thème compilé (tokens, CSS) + icônes Nucleo (React, donc hors compilation CLI).
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
