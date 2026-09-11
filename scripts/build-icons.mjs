/**
 * Convertit les SVG Nucleo déposés dans icons/{astryx,vidomia}/ en composants
 * React (src/theme/icons/nucleo.tsx), normalisés :
 *   - width/height retirés, viewBox conservé (grille 18) ;
 *   - <title>, class, data-* retirés ; couleurs en dur → currentColor ;
 *   - attributs SVG passés en camelCase JSX ;
 *   - `data-icon="nucleo"` sur la racine : crochet du réglage global d'épaisseur
 *     de trait (token --icon-stroke-width du thème, règle dans styles.css).
 *
 *   pnpm icons:build
 */
import {mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SETS = [
  {dir: join(ROOT, 'icons/astryx'), set: 'astryx'},
  {dir: join(ROOT, 'icons/vidomia'), set: 'vidomia'},
];
const OUT = join(ROOT, 'src/theme/icons/nucleo.tsx');
const OUT_KEYS = join(ROOT, 'src/theme/icons/keys.ts');

const pascal = (k) => k.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
const camelAttr = (a) => a.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function toJsx(inner) {
  return inner
    .replace(/<title>.*?<\/title>/gs, '')
    .replace(/\s(class|data-[a-z0-9-]+)="[^"]*"/g, '')
    .replace(/\s(stroke|fill)="(?!none|currentColor)[^"]*"/g, ' $1="currentColor"')
    .replace(/\s([a-z]+-[a-z-]+)=/g, (_, a) => ` ${camelAttr(a)}=`)
    .replace(/<(\w+)([^>]*)><\/\1>/g, '<$1$2 />')
    .trim();
}

const icons = [];
for (const {dir, set} of SETS) {
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.svg')).sort();
  } catch {
    continue;
  }
  for (const f of files) {
    // clé = nom du fichier sans extension ni préfixe de taille des exports Nucleo (« 18-bed-empty.svg »)
    const key = f.replace(/\.svg$/, '').replace(/^\d+-/, '');
    const svg = readFileSync(join(dir, f), 'utf8');
    const viewBox = (svg.match(/viewBox="([^"]+)"/) || [, '0 0 18 18'])[1];
    const inner = (svg.match(/<svg[^>]*>(.*)<\/svg>/s) || [, ''])[1];
    if (icons.some((i) => i.key === key)) {
      console.warn(`doublon ignoré : ${set}/${key}`);
      continue;
    }
    icons.push({key, set, viewBox, jsx: toJsx(inner)});
  }
}

const L = [];
L.push(`/* @generated par scripts/build-icons.mjs — ne pas éditer. Sources : icons/astryx, icons/vidomia */`);
L.push(`import type {SVGProps} from 'react';\n`);
L.push(`type P = SVGProps<SVGSVGElement>;\n`);
for (const i of icons) {
  L.push(`/** ${i.set}/${i.key} */`);
  L.push(`export const ${pascal(i.key)}Icon = (p: P) => (`);
  L.push(`  <svg xmlns="http://www.w3.org/2000/svg" viewBox="${i.viewBox}" data-icon="nucleo" aria-hidden="true" {...p}>`);
  L.push(`    ${i.jsx}`);
  L.push(`  </svg>`);
  L.push(`);\n`);
}
L.push(`/** Toutes les icônes Nucleo par clé (nom de fichier). */`);
L.push(`export const NUCLEO_ICONS = {`);
for (const i of icons) L.push(`  '${i.key}': ${pascal(i.key)}Icon,`);
L.push(`} as const;\n`);
L.push(`export type {NucleoIconKey, NucleoIconSet} from './keys';`);
L.push(`export {NUCLEO_KEYS, NUCLEO_SETS} from './keys';`);

// Manifeste sans React : clés et jeu d'origine, importable côté Payload
// (options d'un champ select) sans tirer les composants SVG.
const K = [];
K.push(`/* @generated par scripts/build-icons.mjs — ne pas éditer. Manifeste des icônes (clés + jeu). */`);
K.push(`export type NucleoIconSet = 'astryx' | 'vidomia';\n`);
K.push(`export const NUCLEO_SETS = {`);
for (const i of icons) K.push(`  '${i.key}': '${i.set}',`);
K.push(`} as const satisfies Record<string, NucleoIconSet>;\n`);
K.push(`export type NucleoIconKey = keyof typeof NUCLEO_SETS;`);
K.push(`/** Largeur de grille (viewBox) par icône : 18 en général, 12 ou 32 pour certaines. */`);
K.push(`export const NUCLEO_GRID: Record<NucleoIconKey, number> = {`);
for (const i of icons) K.push(`  '${i.key}': ${Number(i.viewBox.split(/\s+/)[2]) || 18},`);
K.push(`};`);
K.push(`export const NUCLEO_KEYS = Object.keys(NUCLEO_SETS) as NucleoIconKey[];`);
K.push(`/** Options prêtes pour un champ select Payload : {label, value}. */`);
K.push(`export const NUCLEO_SELECT_OPTIONS = NUCLEO_KEYS.map((value) => ({label: value, value}));`);
writeFileSync(OUT_KEYS, K.join('\n') + '\n');

mkdirSync(dirname(OUT), {recursive: true});
writeFileSync(OUT, L.join('\n') + '\n');
console.log(`${icons.length} icônes → ${OUT.replace(ROOT + '/', '')} + ${OUT_KEYS.replace(ROOT + '/', '')}`);
