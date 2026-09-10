/**
 * Données de l'en-tête du site — la forme que Payload remplira plus tard
 * (global « En-tête » : coordonnées, réseaux, navigation, actions).
 */
import type {NucleoIconKey} from '@/theme/icons/nucleo';

export type SiteNavLeaf = {title: string; description?: string; iconKey?: NucleoIconKey; href: string};

export type SiteNavEntry =
  | {kind: 'link'; label: string; href: string}
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
  /** adresse postale (pied de page) */
  address?: string;
  socials?: Array<{label: string; href: string; iconKey: NucleoIconKey}>;
};

export type SiteActions = {
  login?: {label: string; href: string};
  cta?: {label: string; href: string};
};

export type SiteHeaderData = {
  brand: {name: string; href: string};
  strip?: SiteStrip;
  nav: SiteNavEntry[];
  actions?: SiteActions;
  languages?: string[];
};

/** Article en bref du pied de page (alimenté par la collection Articles). */
export type SiteFooterArticle = {category: string; title: string; date: string; href: string};

/**
 * Données du pied de page — global Payload « Pied de page ». Coordonnées et
 * réseaux viennent du global « Coordonnées et réseaux » (SiteStrip), pas d'ici.
 */
export type SiteFooterData = {
  brand: {name: string; href: string; description?: string};
  newsletter?: {
    eyebrow: string;
    title: {before: string; accent?: string};
    text?: string;
    fieldLabel: string;
    buttonLabel: string;
    mention?: string;
  };
  articles?: {eyebrow: string; allLabel: string; allHref: string; items: SiteFooterArticle[]};
  columns: Array<{title: string; links: Array<{label: string; href: string}>}>;
  legal: {copyright: string; line?: string; links: Array<{label: string; href: string}>};
};
