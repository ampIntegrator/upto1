import {createBreadcrumbsField, createParentField} from '@payloadcms/plugin-nested-docs';
import type {CollectionAfterChangeHook, CollectionBeforeChangeHook, Field, PayloadRequest} from 'payload';

import {tr} from '@/i18n/admin/languages';
import {pageTreeText as t} from '@/i18n/admin/pageTree';
import {childPath, HOME_SLUG, MAX_PAGE_DEPTH, pagePath, pathDepth} from '@/lib/page-paths';

/**
 * The page tree (nested docs plugin, pages only): a parent page, the breadcrumb the plugin keeps
 * up to date, and the page's full address `path` (/services/renovation), one value for every
 * language, unique, recomputed on each save: the plugin re-saves the children when a parent moves,
 * so their paths follow. When a page's path changes, a redirect from the old one is created (a
 * reference to the page: it follows later moves, no chain), and any redirect from the new one is
 * removed. Rules on the parent: the home page stays at the root and is nobody's parent, no loop,
 * MAX_PAGE_DEPTH levels at most, sub-pages included. A factory: fresh field objects on each call.
 */
type Ref = number | {id: number} | null | undefined;
const refId = (v: unknown): number | null => (typeof v === 'number' ? v : typeof v === 'object' && v && 'id' in v ? Number((v as {id: number}).id) : null);

/** the sub-pages of a path (any depth) */
async function descendants(req: PayloadRequest, path: string) {
  const res = await req.payload.find({collection: 'pages', where: {path: {like: `${path}/`}}, depth: 0, limit: 0, pagination: false, req});
  return res.docs.filter((d) => typeof d.path === 'string' && d.path.startsWith(`${path}/`));
}

const parentValidate = async (value: unknown, {data, req, id}: {data: Partial<{slug: string}>; req: PayloadRequest; id?: number | string}) => {
  const parentId = refId(value);
  if (parentId === null) return true;
  const lang = req.i18n?.language;
  if (data?.slug === HOME_SLUG) return tr(t.homeNoParent, lang);
  if (id !== undefined && parentId === Number(id)) return tr(t.cycle, lang);
  const parent = await req.payload.findByID({collection: 'pages', id: parentId, depth: 0, req}).catch(() => null);
  if (!parent) return true;
  if (parent.slug === HOME_SLUG) return tr(t.homeNotParent, lang);
  const parentPath = pagePath(parent);
  const self = id !== undefined ? await req.payload.findByID({collection: 'pages', id, depth: 0, req}).catch(() => null) : null;
  const ownPath = self ? pagePath(self) : null;
  if (ownPath && ownPath !== '/' && (parentPath === ownPath || parentPath.startsWith(`${ownPath}/`))) return tr(t.cycle, lang);
  // the deepest level the page or its sub-pages would reach under this parent
  const height = ownPath && ownPath !== '/' ? Math.max(0, ...(await descendants(req, ownPath)).map((d) => pathDepth(String(d.path)) - pathDepth(ownPath))) : 0;
  const depth = pathDepth(parentPath) + 1 + height;
  return depth <= MAX_PAGE_DEPTH || tr(t.tooDeep, lang, {max: MAX_PAGE_DEPTH, depth});
};

export const pageTreeFields = (): Field[] => [
  createParentField('pages', {
    label: t.parent,
    admin: {position: 'sidebar', description: {fr: t.parentDescription.fr({max: MAX_PAGE_DEPTH}), en: t.parentDescription.en({max: MAX_PAGE_DEPTH})}},
    validate: parentValidate as never,
  }) as Field,
  {name: 'path', type: 'text', label: t.path, unique: true, index: true, admin: {position: 'sidebar', readOnly: true, description: t.pathDescription}},
  createBreadcrumbsField('pages', {label: t.breadcrumbs, admin: {hidden: true}}) as Field,
];

/** the page's path from its parent's (read fresh: a moved parent re-saves its children) */
export const computePagePath: CollectionBeforeChangeHook = async ({data, originalDoc, req}) => {
  const slug = (data.slug ?? originalDoc?.slug) as string | undefined;
  if (!slug) return data;
  const parentId = refId(('parent' in data ? data.parent : originalDoc?.parent) as Ref);
  const parent = parentId !== null ? await req.payload.findByID({collection: 'pages', id: parentId, depth: 0, req}).catch(() => null) : null;
  data.path = childPath(slug, parent ? pagePath(parent) : null);
  return data;
};

/** a page whose address changes leaves a redirect behind */
export const redirectOldPath: CollectionAfterChangeHook = async ({doc, previousDoc, operation, req}) => {
  if (operation !== 'update') return doc;
  const before = typeof previousDoc?.path === 'string' ? previousDoc.path : null;
  const after = typeof doc.path === 'string' ? doc.path : null;
  if (!before || !after || before === after || before === '/') return doc;
  // the new address is a page again
  await req.payload.delete({collection: 'redirects', where: {from: {equals: after}}, req});
  const to = {type: 'reference' as const, reference: {relationTo: 'pages' as const, value: doc.id}};
  const existing = (await req.payload.find({collection: 'redirects', where: {from: {equals: before}}, limit: 1, depth: 0, req})).docs[0];
  if (existing) await req.payload.update({collection: 'redirects', id: existing.id, data: {to}, req});
  else await req.payload.create({collection: 'redirects', data: {from: before, to}, req});
  return doc;
};
