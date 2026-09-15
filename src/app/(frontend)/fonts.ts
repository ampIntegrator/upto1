/**
 * Orbita fonts, loaded by next/font (self-hosted, no Google request
 * at runtime). Each font exposes a CSS variable consumed by the Astryx
 * theme (src/theme/orbita.ts):
 *   --font-geist      → body text, labels, buttons
 *   --font-schibsted  → headings / display
 *   --font-cormorant  → editorial serif accent (italic 600)
 *   --font-geist-mono → technical markers (tag type) and code — readopted on Sept 11, 2026
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
