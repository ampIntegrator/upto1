/**
 * Smoke test of the nested pages (pnpm smoke:pages, dev server running): throwaway pages on three
 * levels, their addresses and breadcrumb, the refusals (fourth level, a sub-tree pushed too deep,
 * the home page as a parent, a loop), then moves and a renaming: the old addresses redirect (308)
 * to the new ones, an old flat address finds its page, a page moved back drops the redirect that
 * pointed away from it. Deletes the pages and their redirects. Never touches real content.
 *   SMOKE_BASE: server address (default http://localhost:3000)
 */
import config from '@payload-config';
import {getPayload} from 'payload';

import {MAX_PAGE_DEPTH} from '@/lib/page-paths';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:3000';
const stamp = Date.now();
const hero = {variant: 'page-glow', title: 'Smoke pages', breadcrumbMode: 'show'};

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };
  const refused = async (label: string, run: () => Promise<unknown>, pattern: RegExp) => {
    try {
      await run();
      check(false, `${label}: accepted, expected a refusal`);
    } catch (e) {
      const details = JSON.stringify((e as {data?: unknown}).data ?? String(e));
      check(pattern.test(details), `${label} is refused (${details.slice(0, 120)})`);
    }
  };
  const get = async (path: string) => {
    const res = await fetch(`${BASE}${path}`, {redirect: 'manual'});
    return {status: res.status, location: res.headers.get('location'), html: res.status === 200 ? await res.text() : ''};
  };
  const make = (slug: string, title: string, parent?: number) => payload.create({collection: 'pages', data: {title, slug, hero: {...hero, title}, parent} as never});
  const path = async (id: number) => (await payload.findByID({collection: 'pages', id, depth: 0})).path;

  const s = (name: string) => `zz-${name}-${stamp}`;
  const created: number[] = [];
  try {
    const a = await make(s('a'), 'Smoke niveau A');
    const b = await make(s('b'), 'Smoke niveau B', a.id);
    const c = await make(s('c'), 'Smoke niveau C', b.id);
    const e = await make(s('e'), 'Smoke racine E');
    created.push(c.id, b.id, a.id, e.id);
    check(MAX_PAGE_DEPTH === 3, `MAX_PAGE_DEPTH = ${MAX_PAGE_DEPTH}`);
    check((await path(c.id)) === `/${s('a')}/${s('b')}/${s('c')}`, `level 3 address ${await path(c.id)}`);

    for (const p of [`/${s('a')}`, `/${s('a')}/${s('b')}`, `/${s('a')}/${s('b')}/${s('c')}`]) check((await get(p)).status === 200, `${p} → 200`);
    const cPage = await get(`/${s('a')}/${s('b')}/${s('c')}`);
    check(cPage.html.includes('Smoke niveau A') && cPage.html.includes('Smoke niveau B') && cPage.html.includes(`href="/${s('a')}/${s('b')}"`), 'breadcrumb of C: A and B, with their addresses');

    // refusals
    await refused('a fourth level', () => make(s('d'), 'Smoke niveau D', c.id), /niveau 4|level 4/);
    await refused('a sub-tree pushed to level 4', () => payload.update({collection: 'pages', id: a.id, data: {parent: e.id} as never}), /niveau 4|level 4/);
    const home = (await payload.find({collection: 'pages', where: {slug: {equals: 'accueil'}}, limit: 1, depth: 0})).docs[0];
    if (home) await refused('the home page as a parent', () => payload.update({collection: 'pages', id: e.id, data: {parent: home.id} as never}), /accueil|home page/);
    await refused('a loop (A under C)', () => payload.update({collection: 'pages', id: a.id, data: {parent: c.id} as never}), /elle-même|itself/);

    // move B (and C) to the root
    await payload.update({collection: 'pages', id: b.id, data: {parent: null} as never});
    check((await path(b.id)) === `/${s('b')}` && (await path(c.id)) === `/${s('b')}/${s('c')}`, 'B moved to the root, C follows');
    const oldB = await get(`/${s('a')}/${s('b')}`);
    const oldC = await get(`/${s('a')}/${s('b')}/${s('c')}`);
    check(oldB.status === 308 && oldB.location?.endsWith(`/${s('b')}`) === true, `old B address → ${oldB.status} ${oldB.location}`);
    check(oldC.status === 308 && oldC.location?.endsWith(`/${s('b')}/${s('c')}`) === true, `old C address → ${oldC.status} ${oldC.location}`);
    const redirects = await payload.find({collection: 'redirects', where: {from: {like: stamp.toString()}}, depth: 0, limit: 20});
    check(redirects.totalDocs === 2, `two redirects created (${redirects.docs.map((r) => r.from).join(', ')})`);

    // an old flat address finds its page by its slug
    const flat = await get(`/${s('c')}`);
    check(flat.status === 308 && flat.location?.endsWith(`/${s('b')}/${s('c')}`) === true, `flat address of C → ${flat.status} ${flat.location}`);

    // renaming A
    await payload.update({collection: 'pages', id: a.id, data: {slug: s('a2')} as never});
    const oldA = await get(`/${s('a')}`);
    check(oldA.status === 308 && oldA.location?.endsWith(`/${s('a2')}`) === true, `renamed A: old address → ${oldA.status} ${oldA.location}`);

    // B back under A: its old address is a page again, the redirect away from it goes
    await payload.update({collection: 'pages', id: b.id, data: {parent: a.id} as never});
    check((await path(c.id)) === `/${s('a2')}/${s('b')}/${s('c')}`, 'B back under A, C follows');
    const back = await get(`/${s('a2')}/${s('b')}`);
    check(back.status === 200, `/${s('a2')}/${s('b')} → ${back.status}`);
    const fromB = await payload.find({collection: 'redirects', where: {from: {equals: `/${s('b')}`}}, depth: 0});
    check(fromB.totalDocs === 1, 'the root address of B now redirects to its new place');
    const toSelf = await payload.find({collection: 'redirects', where: {from: {equals: `/${s('a2')}/${s('b')}`}}, depth: 0});
    check(toSelf.totalDocs === 0, 'no redirect from a live address');

    const deep = await get(`/${s('a2')}/${s('b')}/${s('c')}/extra`);
    check(deep.status === 404, `a fourth segment → ${deep.status}`);
  } finally {
    await payload.delete({collection: 'redirects', where: {from: {like: stamp.toString()}}});
    for (const id of created) await payload.delete({collection: 'pages', id}).catch(() => undefined);
    log('pages and redirects deleted');
  }
  log(failures ? `${failures} check(s) failed` : 'all checks passed');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
