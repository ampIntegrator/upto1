/**
 * Compile les thèmes Orbita (src/theme/silos/*.ts) avec le CLI Astryx puis
 * déplace les artefacts (.css/.js/.d.ts) dans src/theme/built/, séparés des
 * sources pour que l'app importe bien la version compilée (SSR sans flash).
 *
 *   pnpm theme:build
 */
import {execSync} from 'node:child_process';
import {mkdirSync, readdirSync, renameSync} from 'node:fs';
import {join} from 'node:path';

const SRC = 'src/theme/silos';
const OUT = 'src/theme/built';

const sources = readdirSync(SRC).filter((f) => /^orbita-[a-z]+\.ts$/.test(f));
if (sources.length === 0) throw new Error(`Aucun thème dans ${SRC}`);

execSync(`pnpm exec astryx theme build ${sources.map((f) => join(SRC, f)).join(' ')}`, {
  stdio: 'inherit',
});

mkdirSync(OUT, {recursive: true});
let moved = 0;
for (const f of readdirSync(SRC)) {
  if (/\.(css|js|d\.ts)$/.test(f)) {
    renameSync(join(SRC, f), join(OUT, f));
    moved++;
  }
}
console.log(`\n→ ${moved} artefacts déplacés dans ${OUT}/`);
