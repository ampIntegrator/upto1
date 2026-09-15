/**
 * Compiles the Orbita themes (src/theme/silos/*.ts) with the Astryx CLI, then
 * moves the artifacts (.css/.js/.d.ts) into src/theme/built/, kept apart from
 * the sources so the app imports the compiled version (SSR without flash).
 *
 *   pnpm theme:build
 */
import {execSync} from 'node:child_process';
import {mkdirSync, readdirSync, renameSync} from 'node:fs';
import {join} from 'node:path';

const SRC = 'src/theme/silos';
const OUT = 'src/theme/built';

const sources = readdirSync(SRC).filter((f) => /^orbita-[a-z]+\.ts$/.test(f));
if (sources.length === 0) throw new Error(`No theme in ${SRC}`);

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
console.log(`\n→ ${moved} artifacts moved to ${OUT}/`);
