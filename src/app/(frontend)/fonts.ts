/**
 * Polices Orbita, chargées par next/font (auto-hébergées, sans requête Google
 * au runtime). Chaque police expose une variable CSS consommée par le thème
 * Astryx (src/theme/orbita.ts) :
 *   --font-geist      → corps de texte, étiquettes, boutons
 *   --font-schibsted  → titres / display
 *   --font-cormorant  → accent serif éditorial (italique 600)
 *   --font-geist-mono → repères techniques (type tag) et code — réadoptée le 11 sept. 2026
 */
import {Cormorant_Garamond, Geist, Geist_Mono, Schibsted_Grotesk} from 'next/font/google';

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const fontVariables = [geist.variable, schibsted.variable, cormorant.variable, geistMono.variable].join(' ');
