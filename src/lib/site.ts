/**
 * Lecture des données Payload pour le site (côté serveur) : réglages, en-tête, pied de page,
 * articles en bref, pages. Les données Payload sont converties ici vers les types des
 * composants (SiteHeaderData, SiteFooterData, HeroProps) : le design system ne connaît pas
 * Payload, et Payload ne connaît pas le design system.
 */
import config, {LOCALES, type Locale} from '@payload-config';
import {cookies} from 'next/headers';
import {getPayload} from 'payload';

import type {HeroProps} from '@/components/Hero';
import type {SiteFooterData, SiteHeaderData, SiteNavEntry, SiteStrip} from '@/components/site-nav';
import type {NucleoIconKey} from '@/theme/icons/nucleo';
import type {SiloName} from '@/theme/index';
import type {Footer, Header, Media, Page, Post, Setting as Settings} from '@/payload-types';

export const LOCALE_COOKIE = 'locale';

/** Langue de lecture : cookie posé par le sélecteur de langue, sinon le français. */
export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const v = jar.get(LOCALE_COOKIE)?.value;
  return (LOCALES as readonly string[]).includes(v ?? '') ? (v as Locale) : 'fr';
}

const mediaUrl = (m: Media | number | string | null | undefined): string | undefined => (m && typeof m === 'object' ? (m.url ?? undefined) : undefined);
const mediaAlt = (m: Media | number | string | null | undefined): string | undefined => (m && typeof m === 'object' ? m.alt : undefined);
const icon = (k?: string | null): NucleoIconKey | undefined => (k ? (k as NucleoIconKey) : undefined);

export async function getSite(locale: Locale) {
  const payload = await getPayload({config});
  const [settings, header, footer, posts] = await Promise.all([
    payload.findGlobal({slug: 'settings', locale, depth: 1}),
    payload.findGlobal({slug: 'header', locale, depth: 2}),
    payload.findGlobal({slug: 'footer', locale, depth: 1}),
    payload.find({collection: 'posts', locale, depth: 1, limit: 3, sort: '-publishedAt'}),
  ]);
  return {settings, header, footer, posts: posts.docs};
}

export function toStrip(s: Settings): SiteStrip {
  return {
    phone: s.phone ? {label: s.phone, href: s.phoneHref || `tel:${s.phone.replace(/\s/g, '')}`} : undefined,
    email: s.email ? {label: s.email, href: `mailto:${s.email}`} : undefined,
    hours: s.hours ?? undefined,
    address: s.address ?? undefined,
    socials: (s.socials ?? []).map((x) => ({label: x.label, href: x.href, iconKey: x.iconKey as NucleoIconKey})),
  };
}

export function toHeader(s: Settings, h: Header): SiteHeaderData {
  const nav: SiteNavEntry[] = (h.nav ?? []).map((b): SiteNavEntry => {
    if (b.blockType === 'link') return {kind: 'link', label: b.label, href: b.href};
    if (b.blockType === 'menu') return {kind: 'menu', label: b.label, items: (b.items ?? []).map((it) => ({title: it.title, description: it.description ?? undefined, iconKey: icon(it.iconKey), href: it.href}))};
    const post = b.featured && typeof b.featured === 'object' ? (b.featured as Post) : null;
    return {
      kind: 'mega',
      label: b.label,
      groups: (b.groups ?? []).map((g) => ({title: g.title, items: (g.items ?? []).map((it) => ({title: it.title, description: it.description ?? undefined, iconKey: icon(it.iconKey), href: it.href}))})),
      featured: post ? {title: post.title, description: post.excerpt ?? undefined, image: mediaUrl(post.cover), linkLabel: b.featuredLinkLabel || "Lire l'article", linkHref: `/blog/${post.slug}`} : undefined,
    };
  });
  return {
    brand: {name: s.brandName, href: '/'},
    strip: toStrip(s),
    nav,
    actions: {
      login: h.login?.label && h.login?.href ? {label: h.login.label, href: h.login.href} : undefined,
      cta: h.cta?.label && h.cta?.href ? {label: h.cta.label, href: h.cta.href} : undefined,
    },
    languages: (s.languages ?? ['fr']).map((l) => l.toUpperCase()),
  };
}

export function toFooter(s: Settings, f: Footer, posts: Post[], locale: Locale): SiteFooterData {
  const fmt = new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'long', year: 'numeric'});
  const n = f.newsletter;
  return {
    brand: {name: s.brandName, href: '/', description: s.baseline ?? undefined},
    newsletter: f.newsletterEnabled !== false && n?.title ? {eyebrow: n.eyebrow ?? '', title: n.title, text: n.text ?? undefined, fieldLabel: n.fieldLabel ?? 'Votre adresse e-mail', buttonLabel: n.buttonLabel ?? "S'abonner", mention: n.mention ?? undefined} : undefined,
    articles: f.articlesEnabled !== false && posts.length ? {
      eyebrow: f.articles?.eyebrow ?? 'En bref',
      allLabel: f.articles?.allLabel ?? 'Tous les articles',
      allHref: f.articles?.allHref ?? '/blog',
      items: posts.map((p) => ({category: typeof p.category === 'object' ? p.category.title : '', title: p.title, date: fmt.format(new Date(p.publishedAt)), href: `/blog/${p.slug}`})),
    } : undefined,
    columns: (f.columns ?? []).map((c) => ({title: c.title, links: (c.links ?? []).map((l) => ({label: l.label, href: l.href}))})),
    legal: {copyright: f.copyright ?? '', line: f.legalLine ?? undefined, links: (f.legalLinks ?? []).map((l) => ({label: l.label, href: l.href}))},
  };
}

/** Fil d'Ariane affiché ? réglage du site, surchargé par la page ; jamais sur l'accueil. */
export function showBreadcrumb(page: Page, s: Settings): boolean {
  if (page.slug === 'accueil') return false;
  const mode = page.hero?.breadcrumbMode ?? 'inherit';
  if (mode === 'show') return true;
  if (mode === 'hide') return false;
  return s.breadcrumb?.enabled !== false;
}

/** Props du fil d'Ariane d'une page : accueil en icône ou en texte selon le réglage. */
export function breadcrumbProps(page: Page, s: Settings) {
  return {items: [], current: page.title, homeLabel: s.breadcrumb?.homeLabel ?? 'Accueil', homeStyle: (s.breadcrumb?.homeStyle ?? 'icon') as 'icon' | 'text'};
}

/** Le haut de page d'une page Payload → props du composant Hero. */
export function toHero(page: Page, s: Settings): HeroProps {
  const h = page.hero;
  const action = (a?: {label?: string | null; href?: string | null; iconKey?: string | null} | null) => (a?.label && a?.href ? {label: a.label, href: a.href, iconKey: icon(a.iconKey)} : undefined);
  const base = {eyebrow: h.eyebrow ?? undefined, title: h.title, lead: h.lead ?? undefined, primary: action(h.primary), secondary: action(h.secondary)};
  switch (h.variant) {
    case 'media-image':
      return {...base, variant: 'media', background: 'image', image: {src: mediaUrl(h.image) ?? '', alt: mediaAlt(h.image)}, overlay: h.overlay ?? 0.3, scrollHint: h.scrollHint ?? undefined};
    case 'media-video':
      return {...base, variant: 'media', background: 'video', video: {src: mediaUrl(h.video) ?? '', poster: mediaUrl(h.poster)}, overlay: h.overlay ?? 0.3, scrollHint: h.scrollHint ?? undefined};
    case 'split':
      return {...base, variant: 'split', reassurance: (h.reassurance ?? []).map((r) => r.text), media: h.media ? {src: mediaUrl(h.media) ?? '', alt: mediaAlt(h.media), badges: (h.badges ?? []).map((b) => ({label: b.label, tone: (b.tone ?? 'accent') as 'accent' | 'night'}))} : undefined};
    case 'page-image':
    case 'page-glow':
    case 'page-night': {
      const background = h.variant === 'page-image' ? 'image' : h.variant === 'page-glow' ? 'glow' : 'night-halo';
      return {...base, variant: 'page', background, image: background === 'image' ? {src: mediaUrl(h.image) ?? '', alt: mediaAlt(h.image)} : undefined, overlay: h.overlay ?? 0.3, breadcrumb: showBreadcrumb(page, s) ? breadcrumbProps(page, s) : undefined};
    }
  }
}

/** Silo effectif d'une page : le sien, sinon celui des réglages (pages anciennes sans valeur ou « inherit »). */
export function pageSilo(page: Page | null, s: Settings): SiloName {
  const raw = (page?.silo ?? null) as string | null;
  const own = raw && raw !== 'inherit' ? (raw as SiloName) : null;
  return own ?? (s.silo as SiloName);
}
