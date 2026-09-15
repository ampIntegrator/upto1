/**
 * Les sections d'une page Payload → données prêtes pour le composant PageSections.
 * Une section partagée (bloc « sharedSection ») est dépliée comme une section construite
 * sur place : même forme, mêmes règles. Les réglages d'admin (mode, couleur, texture,
 * style de nuit, média) se résolvent en un seul fond du composant Section.
 */
import type {CardProps} from '@/components/Card';
import type {MediaProps} from '@/components/Media';
import type {SectionBackground, SectionTint} from '@/components/Section';
import type {ColumnSpan} from '@/components/content-specs';
import {CARD_VARIANTS} from '@/fields/sections/cardBlocks';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {type Gaps, sectionGaps, siteGaps} from '@/fields/sections/gaps';
import {MEDIA_SLUG} from '@/fields/sections/mediaBlock';
import {hasMobileOrder, mobileRanks} from '@/fields/sections/mobileOrder';
import {toSpan} from '@/fields/sections/presets';
import type {NucleoIconKey} from '@/theme/icons/nucleo';
import type {Media, Page, Section as SharedSection, Setting} from '@/payload-types';

type PageSection = NonNullable<Page['sections']>[number];
type SectionBlock = Extract<PageSection, {blockType: 'section'}>;
type SectionSource = Omit<SectionBlock, 'blockType' | 'id' | 'blockName' | 'saveAsShared' | 'sharedTitle'> | SharedSection;
type ContentBlock = NonNullable<NonNullable<NonNullable<SectionBlock['rows']>[number]['columns']>[number]['contents']>[number];

export type ContentData = {type: 'text'; text: string} | {type: 'card'; card: CardProps} | {type: 'media'; media: MediaProps};

/**
 * mobileRank : rang sous 768 px quand la section a un ordre mobile ; empty : masquée sur mobile ;
 * stretch : la colonne s'étire à la hauteur de la rangée (elle contient une image)
 */
export type ColumnData = {span: ColumnSpan; contents: ContentData[]; empty: boolean; stretch?: boolean; mobileRank?: number};

export type SectionData = {
  key: string;
  id?: string;
  background: SectionBackground;
  tint?: SectionTint;
  image?: {src: string; alt?: string};
  video?: {src: string; poster?: string};
  overlay: number;
  spacingTop: number;
  spacingBottom: number;
  /** écarts de la grille, en pixels (section, sinon réglage du site) */
  gaps: Gaps;
  rows: ColumnData[][];
};

const mediaUrl = (m: Media | number | null | undefined): string | undefined => (m && typeof m === 'object' ? (m.url ?? undefined) : undefined);
const mediaAlt = (m: Media | number | null | undefined): string | undefined => (m && typeof m === 'object' ? m.alt : undefined);

function background(s: SectionSource): SectionBackground {
  if (s.mode === 'dark') return s.darkStyle === 'night-halo' ? 'night-halo' : 'night';
  if (s.mode === 'media') return s.mediaType === 'video' ? 'video' : 'image';
  return s.texture && s.texture !== 'none' ? s.texture : 'light';
}

/** Champs possibles d'un bloc Carte (les huit variantes partagent titre et texte). */
type CardBlockData = {
  blockType: string;
  title: string;
  text?: string | null;
  image?: Media | number | null;
  iconKey?: string | null;
  value?: string | null;
  prefix?: string | null;
  suffix?: string | null;
  cta?: {label?: string | null; href?: string | null} | null;
};

function toCard(b: CardBlockData): CardProps {
  const v = CARD_VARIANTS[b.blockType];
  const media: CardProps['media'] =
    v.media === 'image' ? {type: 'image', src: mediaUrl(b.image) ?? '', alt: mediaAlt(b.image)}
    : v.media === 'icon' ? {type: 'icon', iconKey: (b.iconKey ?? 'shield') as NucleoIconKey}
    : v.media === 'number' ? {type: 'number', value: b.value ?? '', prefix: b.prefix ?? undefined, suffix: b.suffix ?? undefined}
    : {type: 'none'};
  return {
    preset: 'bloc',
    media,
    accentTitle: v.media === 'title',
    title: b.title,
    text: b.text ?? undefined,
    cta: v.clickable && b.cta?.label && b.cta?.href ? {label: b.cta.label, href: b.cta.href} : undefined,
  };
}

/** Champs d'un bloc Image. */
type MediaBlockData = {blockType: string; image?: Media | number | null; minHeight?: string | null; minHeightMobile?: string | null; overlay?: number | null};

const toHeight = (v: string | null | undefined): number | undefined => {
  const n = Number(v);
  return v && Number.isFinite(n) && n > 0 ? n : undefined;
};

function toMedia(b: MediaBlockData): ContentData | null {
  const src = mediaUrl(b.image);
  if (!src) return null; // image absente (supprimée de la médiathèque) : colonne vide
  return {
    type: 'media',
    media: {image: {src, alt: mediaAlt(b.image) ?? ''}, minHeight: toHeight(b.minHeight), minHeightMobile: toHeight(b.minHeightMobile), overlay: b.overlay ?? 0},
  };
}

/** Largeur affichée d'une colonne selon l'écran, pour que le navigateur télécharge la bonne taille. */
const columnSizes = (span: number): string => `(max-width: 767px) 100vw, (max-width: 1440px) ${Math.round((span / 12) * 100)}vw, ${Math.round((span / 12) * 1440)}px`;

function toContent(block: ContentBlock): ContentData | null {
  // case vide : aucun contenu, la colonne est traitée comme vide (masquée sur mobile)
  if (block.blockType === EMPTY_SLUG) return null;
  if (block.blockType === MEDIA_SLUG) return toMedia(block as unknown as MediaBlockData);
  if (block.blockType in CARD_VARIANTS) return {type: 'card', card: toCard(block as unknown as CardBlockData)};
  switch (block.blockType) {
    case 'text':
      return {type: 'text', text: block.text};
    default:
      return null;
  }
}

function toSection(s: SectionSource, key: string, site: Gaps): SectionData {
  const isMedia = s.mode === 'media';
  return {
    key,
    id: s.anchor || undefined,
    background: background(s),
    tint: s.mode === 'light' && s.tint === 'highlight' ? 'highlight' : undefined,
    image: isMedia && s.mediaType !== 'video' ? {src: mediaUrl(s.image) ?? '', alt: mediaAlt(s.image)} : undefined,
    video: isMedia && s.mediaType === 'video' ? {src: mediaUrl(s.video) ?? '', poster: mediaUrl(s.poster)} : undefined,
    overlay: isMedia ? (s.overlay ?? 0.3) : 0,
    spacingTop: Number(s.spacingTop ?? 80),
    spacingBottom: Number(s.spacingBottom ?? 80),
    gaps: sectionGaps(s, site),
    rows: sectionRows(s.rows),
  };
}

/** Rangées d'une section, avec le rang mobile de chaque colonne calculé sur toute la section. */
function sectionRows(rows: SectionSource['rows']): ColumnData[][] {
  const built = (rows ?? []).map((r) => {
    const columns = (r.columns ?? []).map((c) => {
      const contents = (c.contents ?? []).map(toContent).filter((x): x is ContentData => x !== null);
      return {span: toSpan(c.span), contents, empty: contents.length === 0, mobileOrder: c.mobileOrder};
    });
    // une image ne fixe sa hauteur desktop que si la rangée n'a aucun autre contenu
    const otherContent = columns.some((c) => c.contents.some((x) => x.type !== 'media'));
    return columns.map((c) => {
      const stretch = c.contents.some((x) => x.type === 'media');
      const contents = c.contents.map((x): ContentData => (x.type === 'media' ? {...x, media: {...x.media, minHeight: otherContent ? undefined : x.media.minHeight, sizes: columnSizes(c.span)}} : x));
      return {...c, contents, stretch};
    });
  });
  const flat = built.flat();
  const ranks = hasMobileOrder(flat) ? mobileRanks(flat) : null;
  let k = 0;
  return built.map((columns) => columns.map(({mobileOrder: _m, ...c}) => ({...c, mobileRank: ranks?.[k++] ?? undefined})));
}

/**
 * Les blocs « sections » d'une page (chargée avec depth ≥ 2 pour les médias des sections partagées).
 * `settings` : Réglages du site, pour les écarts par défaut de la grille (Mise en page).
 */
export function toSections(blocks: Page['sections'], settings?: Pick<Setting, 'sectionGrid'> | null): SectionData[] {
  const site = siteGaps(settings?.sectionGrid);
  const out: SectionData[] = [];
  (blocks ?? []).forEach((b, i) => {
    const key = b.id ?? String(i);
    if (b.blockType === 'section') out.push(toSection(b, key, site));
    else if (b.blockType === 'sharedSection' && b.section && typeof b.section === 'object') out.push(toSection(b.section, key, site));
  });
  return out;
}
