/**
 * Smoke test of the blog (pnpm smoke:blog): creates a throwaway category, author, post (every
 * prose element and every figure block), sets a throwaway address for the blog for the time of
 * the test, checks the blog page, the post and the category archive, then deletes everything
 * and restores the Blog settings. Never touches a real page or post. The dev server must be running.
 *   SMOKE_SHOTS=<dir>: also saves captures of the blog page and the post (1440 and 390 px).
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
const cell = (text: string, headerState = 0) => el('tablecell', [p(t(text))], {headerState, colSpan: 1, rowSpan: 1, backgroundColor: null});

async function main() {
  const payload = await getPayload({config});
  const log = (m: string) => payload.logger.info(m);
  let failures = 0;
  const check = (ok: boolean, label: string) => {
    log(`${ok ? 'OK ' : 'KO '} ${label}`);
    if (!ok) failures += 1;
  };
  const blogSettings = await payload.findGlobal({slug: 'blog', depth: 0});
  const previous = {slug: blogSettings.slug, title: blogSettings.title, lead: blogSettings.lead ?? null, faqEyebrow: blogSettings.faqEyebrow ?? null, faqTitle: blogSettings.faqTitle ?? null, faqTag: blogSettings.faqTag ?? 'h2', relatedEyebrow: blogSettings.relatedEyebrow ?? null, relatedTitle: blogSettings.relatedTitle ?? null, relatedTag: blogSettings.relatedTag ?? 'h2', relatedCount: blogSettings.relatedCount ?? '3'};
  const image = (await payload.find({collection: 'media', limit: 1, where: {mimeType: {contains: 'image'}}})).docs[0];
  const created: {collection: 'posts' | 'authors' | 'categories'; id: number}[] = [];
  try {
    const category = await payload.create({collection: 'categories', data: {title: 'Catégorie smoke', slug: `zz-smoke-cat-${stamp}`}});
    created.push({collection: 'categories', id: category.id});
    const author = await payload.create({collection: 'authors', data: {name: 'Auteur Smoke', role: 'Rôle smoke', photo: image?.id}});
    created.push({collection: 'authors', id: author.id});
    const page = {slug: `zz-smoke-blog-${stamp}`};
    await payload.updateGlobal({slug: 'blog', data: {slug: page.slug, title: 'Actualités <span>smoke</span>', lead: 'Chapô smoke du blog.', faqEyebrow: 'Surtitre FAQ smoke', faqTitle: 'FAQ titre smoke', faqTag: 'h2', relatedEyebrow: 'Surtitre liés smoke', relatedTitle: 'Liés titre smoke', relatedTag: 'h3', relatedCount: '4'}});

    const content = {
      root: el('root', [
        h('h2', 'Titre deux smoke'),
        p(t('Paragraphe smoke avec '), t('gras', 1), t(' et '), t('italique', 2), t('.')),
        h('h3', 'Titre trois smoke'),
        el('list', [li(1, t('Puce smoke une')), li(2, t('Puce smoke deux'))], {listType: 'bullet', start: 1, tag: 'ul'}),
        el('list', [li(1, t('Numéro smoke un')), li(2, t('Numéro smoke deux'))], {listType: 'number', start: 1, tag: 'ol'}),
        el('quote', [t('Citation smoke.'), {type: 'linebreak', version: 1}, t('— Attribution smoke')]),
        el('table', [el('tablerow', [cell('Entête smoke', 1), cell('Colonne', 1)]), el('tablerow', [cell('Cellule smoke'), cell('42')])]),
        ...(image ? [{type: 'upload', version: 3, format: '', relationTo: 'media', value: image.id, fields: {caption: 'Légende smoke'}}] : []),
        block({blockType: 'keyPoints', eyebrow: 'À retenir smoke', content: {root: el('root', [el('list', [li(1, t('Point smoke'))], {listType: 'bullet', start: 1, tag: 'ul'})])}}),
        block({blockType: 'ctaBand', variant: 'icon', iconKey: 'calculator', title: 'Bandeau smoke', text: 'Texte bandeau smoke', button: {label: 'Bouton bandeau smoke', href: '#', shape: 'split', variant: 'high', size: 'md'}}),
        block({blockType: 'statsBand', items: [{value: '−68 %', label: 'Chiffre smoke'}, {value: '×2', label: 'Autre chiffre'}]}),
        block({blockType: 'quoteCard', quote: 'Carte citation smoke.', name: 'Témoin carte smoke', role: 'Rôle carte', photo: image?.id}),
        ...(image ? [block({blockType: 'gallery', images: [{image: image.id}, {image: image.id}], wideFirst: true, caption: 'Galerie smoke'})] : []),
        h('h4', 'Titre quatre smoke'),
      ]),
    };
    const post = await payload.create({
      collection: 'posts',
      data: {faq: {show: true, items: [{question: 'Question FAQ smoke', answer: 'Réponse FAQ smoke.'}, {question: 'Deuxième question smoke', answer: 'Deuxième réponse.'}]}, title: 'Article <span>smoke</span>', slug: `zz-smoke-post-${stamp}`, excerpt: 'Chapô smoke de l’article.', coverCaption: 'Légende couverture smoke', cover: image?.id, author: author.id, category: category.id, publishedAt: new Date().toISOString(), content} as never,
    });
    created.push({collection: 'posts', id: post.id});
    log(`created: blog at /${page.slug}, post ${post.id}, category ${category.id}, author ${author.id}`);

    const get = async (path: string) => {
      const res = await fetch(`${BASE}${path}`);
      return {status: res.status, html: await res.text()};
    };
    const blogPage = await get(`/${page.slug}`);
    check(blogPage.status === 200, `blog page /${page.slug} → ${blogPage.status}`);
    for (const m of ['Actualités <span', 'Chapô smoke du blog.', 'Article smoke', 'Catégorie smoke', 'Lire l’article', `/${page.slug}/${post.slug}`]) check(blogPage.html.includes(m), `blog page shows « ${m} »`);

    const postPage = await get(`/${page.slug}/${post.slug}`);
    check(postPage.status === 200, `post /${page.slug}/${post.slug} → ${postPage.status}`);
    for (const m of ['id="titre-deux-smoke"', 'id="titre-trois-smoke"', '<strong>gras</strong>', '<em>italique</em>', 'Puce smoke une', 'Numéro smoke deux', 'Attribution smoke', 'Entête smoke', 'Cellule smoke', 'À retenir smoke', 'Bandeau smoke', 'Bouton bandeau smoke', 'Chiffre smoke', 'Témoin carte smoke', 'Auteur Smoke', 'Rôle smoke', 'Chapô smoke de l’article.', 'Légende couverture smoke', 'Titre quatre smoke']) check(postPage.html.includes(m), `post shows « ${m} »`);
    if (image) for (const m of ['Légende smoke', 'Galerie smoke']) check(postPage.html.includes(m), `post shows « ${m} »`);
    check(!/Unhandled Runtime Error|Build Error/.test(postPage.html), 'post without runtime error');

    // under the post: the FAQ and the related posts, headings from the settings
    for (const m of ['Surtitre FAQ smoke', 'FAQ titre smoke', 'Question FAQ smoke', 'Réponse FAQ smoke.', 'Surtitre liés smoke', 'Liés titre smoke']) check(postPage.html.includes(m), `post shows « ${m} »`);
    check(/<h3[^>]*>(?:(?!<\/h3>).)*Question FAQ smoke/s.test(postPage.html), 'FAQ questions are h3 under the h2 title');
    check(/<h3[^>]*>(?:(?!<\/h3>).)*Liés titre smoke/s.test(postPage.html), 'related title in the chosen tag (h3)');
    const cards = (html: string) => (html.match(/data-preset="article"/g) ?? []).length;
    const relatedSection = postPage.html.slice(postPage.html.indexOf('Liés titre smoke'));
    check(cards(relatedSection) === 4, `4 related posts (settings) → ${cards(relatedSection)}`);
    await payload.updateGlobal({slug: 'blog', data: {faqTitle: '', relatedTitle: ''}});
    const untitled = await get(`/${page.slug}/${post.slug}`);
    check(!/FAQ titre smoke|Surtitre FAQ smoke|Liés titre smoke|Surtitre liés smoke/.test(untitled.html) && untitled.html.includes('Question FAQ smoke') && cards(untitled.html) === cards(postPage.html), 'empty titles: FAQ and related without heading');
    await payload.update({collection: 'posts', id: post.id, data: {faq: {show: false}, related: {mode: 'hidden'}} as never});
    const bare = await get(`/${page.slug}/${post.slug}`);
    check(!bare.html.includes('Question FAQ smoke') && cards(bare.html) === cards(postPage.html) - 4, 'FAQ unticked and related hidden: neither shown');

    const archive = await get(`/${page.slug}/categorie/${category.slug}`);
    check(archive.status === 200, `category archive → ${archive.status}`);
    check(archive.html.includes('Catégorie smoke') && archive.html.includes(`/${page.slug}/${post.slug}`), 'archive lists the post under its category');

    if (process.env.SMOKE_SHOTS) {
      const {chromium} = await import('@playwright/test');
      const browser = await chromium.launch();
      for (const [path, name] of [[`/${page.slug}`, 'blog'], [`/${page.slug}/${post.slug}`, 'post']] as const) {
        for (const [width, scale] of [[1440, 0.5], [390, 0.6]] as const) {
          const tab = await browser.newPage({viewport: {width, height: 900}, deviceScaleFactor: scale});
          await tab.goto(`${BASE}${path}`, {waitUntil: 'networkidle'});
          await tab.addStyleTag({content: 'nextjs-portal { display: none !important; }'});
          // load the lazy images before the full-page capture
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

    const wrong = await get(`/not-the-blog-${stamp}/${post.slug}`);
    check(wrong.status === 404, `a post under another first segment → ${wrong.status}`);
  } finally {
    await payload.updateGlobal({slug: 'blog', data: previous});
    for (const c of created.reverse()) await payload.delete({collection: c.collection, id: c.id});
    log('cleanup done, Blog settings restored');
  }
  log(failures ? `${failures} check(s) failed` : 'all checks passed');
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
