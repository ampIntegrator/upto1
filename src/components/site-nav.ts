/**
 * Site header data — the shape Payload will fill in later
 * (« En-tête » global: contact details, social networks, navigation, actions).
 */
import type {NucleoIconKey} from '@/theme/icons/nucleo';

/** `newTab` on any link: it opens in a new tab (the « Ouvrir dans un nouvel onglet » box) */
export type SiteNavLeaf = {title: string; description?: string; iconKey?: NucleoIconKey; href: string; newTab?: boolean};

export type SiteNavEntry =
  | {kind: 'link'; label: string; href: string; newTab?: boolean}
  | {kind: 'menu'; label: string; items: SiteNavLeaf[]}
  | {
      kind: 'mega';
      label: string;
      groups: Array<{title: string; items: SiteNavLeaf[]}>;
      featured?: {title: string; description?: string; image?: string; linkLabel: string; linkHref: string};
    };

export type SiteStrip = {
  phone?: {label: string; href: string};
  email?: {label: string; href: string};
  hours?: string;
  /** postal address (footer) */
  address?: string;
  socials?: Array<{label: string; href: string; iconKey: NucleoIconKey; newTab?: boolean}>;
};

export type SiteActions = {
  login?: {label: string; href: string; newTab?: boolean};
  cta?: {label: string; href: string; newTab?: boolean};
};

export type SiteHeaderData = {
  brand: {name: string; href: string};
  strip?: SiteStrip;
  nav: SiteNavEntry[];
  actions?: SiteActions;
  languages?: string[];
};

/** Footer article brief (fed by the Articles collection). */
export type SiteFooterArticle = {category: string; title: string; date: string; href: string};

/**
 * Footer data — Payload global « Pied de page ». Contact details and
 * social networks come from the « Coordonnées et réseaux » global (SiteStrip), not from here.
 */
export type SiteFooterData = {
  brand: {name: string; href: string; description?: string};
  newsletter?: {
    eyebrow: string;
    /** title entered in a textarea (line breaks, <span> serif): see TitleText */
    title: string;
    text?: string;
    fieldLabel: string;
    buttonLabel: string;
    mention?: string;
  };
  articles?: {eyebrow: string; allLabel: string; allHref: string; allNewTab?: boolean; items: SiteFooterArticle[]};
  columns: Array<{title: string; links: Array<{label: string; href: string; newTab?: boolean}>}>;
  legal: {copyright: string; line?: string; links: Array<{label: string; href: string; newTab?: boolean}>};
};
