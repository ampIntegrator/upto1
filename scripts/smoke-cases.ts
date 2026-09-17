/**
 * Smoke test of the case studies (pnpm smoke:cases): creates a throwaway case category, two case
 * studies (every fact sheet field, prose and figures) and a page, sets that page as the case
 * studies page for the time of the test, checks the list, a case study (hero, sheet, story,
 * related case studies) and the category archive, then deletes everything and restores the
 * settings. Never touches a real page or case study. The dev server must be running.
 *   SMOKE_SHOTS=<dir>: also saves captures of the list and the case study (1440 and 390 px).
 */
import config from '@payload-config';
import {getPayload} from 'payload';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:3000';
const stamp = Date.now();

const t = (text: string, format = 0) => ({type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1});
const el = (type: string, children: object[], extra: object = {}) => ({type, children, direction: 'ltr', format: '', indent: 0, version: 1, ...extra});
const p = (...children: object[]) => el('paragraph', children, {textFormat: 0, textStyle: ''});
const h = (tag: string, text: string) => el('heading', [t(text)], {tag});
const li = (value: number, ...children: object[]) => el('listitem', children, {value});
const block = (fields: Record<string, unknown>) => ({type: 'block', version: 2, format: '', fields: {id: `smoke${Math.random().toString(16).slice(2, 10)}`, blockName: '', ...fields}});

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };
  const settings = await payload.findGlobal({slug: 'portfolio', depth: 0});
  const previous = {page: settings.page ?? null, title: settings.title, lead: settings.lead ?? null, cta: {label: settings.cta?.label ?? null, href: settings.cta?.href ?? null}};
  const image = (await payload.find({collection: 'media', limit: 1, where: {mimeType: {contains: 'image'}}})).docs[0];
  const created: {collection: 'case-studies' | 'pages' | 'case-categories'; id: number}[] = [];
  try {
    const category = await payload.create({collection: 'case-categories', data: {title: 'Catégorie réalisation smoke', slug: `zz-smoke-case-cat-${stamp}`}});
    created.push({collection: 'case-categories', id: category.id});
    const page = await payload.create({collection: 'pages', data: {title: 'Réalisations smoke', slug: `zz-smoke-cases-${stamp}`, hero: {variant: 'page-glow', title: 'Réalisations smoke'}} as never});
    created.push({collection: 'pages', id: page.id});
    await payload.updateGlobal({slug: 'portfolio', data: {page: page.id, title: 'Réalisations <span>smoke</span>', lead: 'Chapô smoke des réalisations.', cta: {label: 'Bouton global smoke', href: '/contact'}}});

    const content = {
      root: el('root', [
        h('h2', 'Contexte smoke'),
        p(t('Récit smoke avec '), t('gras', 1), t('.')),
        el('list', [li(1, t('Puce réalisation smoke'))], {listType: 'bullet', start: 1, tag: 'ul'}),
        block({blockType: 'statsBand', items: [{value: '−68 %', label: 'Chiffre récit smoke'}, {value: '×2,4', label: 'Autre chiffre'}]}),
        block({blockType: 'quoteCard', quote: 'Citation réalisation smoke.', name: 'Témoin réalisation smoke', role: 'Gérant', photo: image?.id}),
        ...(image ? [block({blockType: 'gallery', images: [{image: image.id}, {image: image.id}], wideFirst: true, caption: 'Galerie réalisation smoke'})] : []),
      ]),
    };
    const sheet = {
      client: 'Client Smoke SA', clientUrl: 'https://example.com',
      location: 'Nantes smoke', deployment: 'Six semaines smoke', deploymentLabel: 'Durée smoke', modules: 'Modules texte smoke',
      results: [{value: '−42 %', label: 'Mini chiffre smoke'}, {value: '×3', label: 'Second mini chiffre'}],
      cardResult: 'Résultat carte smoke',
    };
    const main = await payload.create({
      collection: 'case-studies',
      data: {title: 'Réalisation <span>smoke</span>', slug: `zz-smoke-case-${stamp}`, excerpt: 'Chapô smoke de la réalisation.', cover: image?.id, category: category.id, publishedAt: new Date().toISOString(), content, sheet} as never,
    });
    created.push({collection: 'case-studies', id: main.id});
    const other = await payload.create({
      collection: 'case-studies',
      data: {title: 'Autre réalisation smoke', slug: `zz-smoke-case-b-${stamp}`, cover: image?.id, category: category.id, publishedAt: new Date(Date.now() - 86400000).toISOString(), sheet: {client: 'Autre client smoke', location: 'Lyon', results: [{value: '+18 pts', label: 'Marge'}], cta: {label: 'Bouton local smoke', href: '/demo'}}} as never,
    });
    created.push({collection: 'case-studies', id: other.id});
    log(`created: page ${page.id}, case studies ${main.id} and ${other.id}, category ${category.id}`);

    const get = async (path: string) => {
      const res = await fetch(`${BASE}${path}`);
      return {status: res.status, html: await res.text()};
    };
    const list = await get(`/${page.slug}`);
    check(list.status === 200, `case studies page /${page.slug} → ${list.status}`);
    for (const m of ['Réalisations <span', 'Chapô smoke des réalisations.', 'Réalisation smoke', 'Catégorie réalisation smoke', 'Résultat carte smoke', 'Client Smoke SA', 'Nantes smoke', 'Voir l’étude', `/${page.slug}/${main.slug}`, '+18 pts']) check(list.html.includes(m), `list shows « ${m} »`);

    const casePage = await get(`/${page.slug}/${main.slug}`);
    check(casePage.status === 200, `case study /${page.slug}/${main.slug} → ${casePage.status}`);
    for (const m of ['Étude de cas', 'Chapô smoke de la réalisation.', 'Client Smoke SA', 'https://example.com', 'Nantes smoke', 'Durée smoke', 'Six semaines smoke', 'Modules texte smoke', 'Modules Orbita', '−42 %', 'Mini chiffre smoke', 'Bouton global smoke', 'id="contexte-smoke"', 'Puce réalisation smoke', 'Chiffre récit smoke', 'Témoin réalisation smoke', 'Autre réalisation smoke', 'Voir toutes les réalisations']) check(casePage.html.includes(m), `case study shows « ${m} »`);
    if (image) check(casePage.html.includes('Galerie réalisation smoke'), 'case study shows the gallery');
    check(!casePage.html.includes('Déploiement'), 'the local label replaces the global one');
    check(!/Unhandled Runtime Error|Build Error/.test(casePage.html), 'case study without runtime error');

    const otherPage = await get(`/${page.slug}/${other.slug}`);
    check(otherPage.status === 200 && otherPage.html.includes('Bouton local smoke') && !otherPage.html.includes('Bouton global smoke'), 'a case study button replaces the global one');

    const archive = await get(`/${page.slug}/categorie/${category.slug}`);
    check(archive.status === 200, `category archive → ${archive.status}`);
    check(archive.html.includes('Catégorie réalisation smoke') && archive.html.includes(`/${page.slug}/${main.slug}`), 'archive lists the case study under its category');
    const wrongSegment = await get(`/${page.slug}/pas-categorie/${category.slug}`);
    check(wrongSegment.status === 404, `another archive segment → ${wrongSegment.status}`);

    if (process.env.SMOKE_SHOTS) {
      const {chromium} = await import('@playwright/test');
      const browser = await chromium.launch();
      for (const [path, name] of [[`/${page.slug}`, 'cases'], [`/${page.slug}/${main.slug}`, 'case']] as const) {
        for (const [width, scale] of [[1440, 0.5], [390, 0.6]] as const) {
          const tab = await browser.newPage({viewport: {width, height: 900}, deviceScaleFactor: scale});
          await tab.goto(`${BASE}${path}`, {waitUntil: 'networkidle'});
          await tab.addStyleTag({content: 'nextjs-portal { display: none !important; }'});
          for (let y = 0; y < (await tab.evaluate(() => document.body.scrollHeight)); y += 700) {
            await tab.evaluate((v) => window.scrollTo(0, v), y);
            await tab.waitForTimeout(120);
          }
          await tab.evaluate(() => window.scrollTo(0, 0));
          await tab.waitForTimeout(600);
          await tab.screenshot({path: `${process.env.SMOKE_SHOTS}/real-${name}-${width}.png`, fullPage: true});
          await tab.close();
        }
      }
      await browser.close();
      log(`captures saved in ${process.env.SMOKE_SHOTS}`);
    }

    const wrong = await get(`/not-the-cases-${stamp}/${main.slug}`);
    check(wrong.status === 404, `a case study under another first segment → ${wrong.status}`);
    const blog = await payload.findGlobal({slug: 'blog', depth: 1});
    const blogSlug = blog.page && typeof blog.page === 'object' ? blog.page.slug : null;
    if (blogSlug) {
      const underBlog = await get(`/${blogSlug}/${main.slug}`);
      check(underBlog.status === 404, `a case study under the blog page → ${underBlog.status}`);
    }
  } finally {
    await payload.updateGlobal({slug: 'portfolio', data: previous});
    for (const c of created.reverse()) await payload.delete({collection: c.collection, id: c.id});
    log('cleanup done, case studies settings restored');
  }
  log(failures ? `${failures} check(s) failed` : 'all checks passed');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
