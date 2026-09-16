/**
 * The sections of a Payload page → data ready for the PageSections component.
 * A shared section (« sharedSection » block) is expanded like a section built
 * in place: same shape, same rules. Admin settings (mode, colour, texture,
 * night style, media) resolve into a single Section component background.
 */
import type {CardProps} from '@/components/Card';
import type {CompareCardProps} from '@/components/CompareCard';
import type {MediaProps} from '@/components/Media';
import type {PlanCardProps} from '@/components/PlanCard';
import type {PriceCardProps} from '@/components/PriceCard';
import type {ProcessStep} from '@/components/ProcessSteps';
import type {Testimonial} from '@/components/TestimonialCard';
import type {TextBoxProps} from '@/components/TextBox';
import type {RichTextDocument} from '@/components/RichText';
import {type TitleTag, toTitleTag} from '@/components/title-tags';
import type {CheckListItem} from '@/components/CheckList';
import type {ChipTone} from '@/components/Chip';
import type {MediaQuoteProps, MediaQuoteSize, MediaQuoteTag} from '@/components/MediaQuote';
import type {SectionBackground, SectionTint} from '@/components/Section';
import {CARD_VARIANTS} from '@/fields/blocks/cardBlocks';
import {COLLECTION_SLUG} from '@/fields/blocks/collectionBlock';
import {COMPARE_CARD_SLUG} from '@/fields/blocks/compareCardBlock';
import {FAQ_SLUG} from '@/fields/blocks/faqBlock';
import {PLAN_SLUG} from '@/fields/blocks/planBlock';
import {PRICE_SINGLE_SLUG} from '@/fields/blocks/priceSingleBlock';
import {PROCESS_STEPS_SLUG} from '@/fields/blocks/processStepsBlock';
import {TESTIMONIAL_SLUG} from '@/fields/blocks/testimonialBlock';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {type Gaps, sectionGaps, siteGaps} from '@/fields/sections/gaps';
import {MEDIA_SLUG} from '@/fields/blocks/mediaBlock';
import {MEDIA_QUOTE_SLUG} from '@/fields/blocks/mediaQuoteBlock';
import {TEXT_BOX_SLUG} from '@/fields/blocks/textBoxSlug';
import {sections as siteSections} from '@/sections.config';
import {hasMobileOrder, mobileRanks} from '@/fields/sections/mobileOrder';
import {type ColumnSpan, toSpan} from '@/fields/sections/grid';
import type {NucleoIconKey} from '@/theme/icons/nucleo';
import type {Media, Page, Post, Section as SharedSection, Setting} from '@/payload-types';

type PageSection = NonNullable<Page['sections']>[number];
type SectionBlock = Extract<PageSection, {blockType: 'section'}>;
type SectionSource = Omit<SectionBlock, 'blockType' | 'id' | 'blockName' | 'saveAsShared' | 'sharedTitle'> | SharedSection;
type ContentBlock = NonNullable<NonNullable<NonNullable<SectionBlock['rows']>[number]['columns']>[number]['contents']>[number];

/** A FAQ block: mode, columns, whether the first question starts open, and the questions. */
export type FaqData = {mode: 'single' | 'multiple'; columns: 1 | 2; firstOpen: boolean; tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'; items: {question: string; answer: string}[]};

/** A collection: identical items side by side, swipe or carousel. */
export type CollectionData = {layout: 'swipe' | 'carousel'; perView: 2 | 3 | 4; step: 'page' | 'item'; arrows: boolean; indicator: 'segments' | 'dots' | 'numbers' | 'none'; items: ContentData[]};

export type ContentData =
  | {type: 'textBox'; textBox: TextBoxProps}
  | {type: 'collection'; collection: CollectionData}
  | {type: 'card'; card: CardProps}
  | {type: 'media'; media: MediaProps}
  | {type: 'mediaQuote'; mediaQuote: MediaQuoteProps}
  | {type: 'priceSingle'; price: PriceCardProps}
  | {type: 'plan'; plan: PlanCardProps}
  | {type: 'faq'; faq: FaqData}
  | {type: 'testimonial'; testimonial: Testimonial}
  | {type: 'compareCard'; compareCard: CompareCardProps}
  | {type: 'processSteps'; steps: ProcessStep[]; tag: TitleTag};

/**
 * mobileRank: rank below 768 px when the section has a mobile order; empty: hidden on mobile;
 * stretch: the column stretches to the row's height (it contains an image)
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
  /** grid gaps, in pixels (section, otherwise site setting) */
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

/** Possible fields of a Card block (the eight variants share title and text). */
type CardBlockData = {
  blockType: string;
  title: string;
  tag?: string | null;
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
    tag: toTitleTag(b.tag, 'h3'),
    text: b.text ?? undefined,
    cta: v.clickable && b.cta?.label && b.cta?.href ? {label: b.cta.label, href: b.cta.href} : undefined,
  };
}

/** Fields of an Image block. */
type MediaBlockData = {blockType: string; image?: Media | number | null; minHeight?: string | null; minHeightMobile?: string | null; overlay?: number | null};

const toHeight = (v: string | null | undefined): number | undefined => {
  const n = Number(v);
  return v && Number.isFinite(n) && n > 0 ? n : undefined;
};

function toMedia(b: MediaBlockData): ContentData | null {
  const src = mediaUrl(b.image);
  if (!src) return null; // missing image (deleted from the media library): empty column
  return {
    type: 'media',
    media: {image: {src, alt: mediaAlt(b.image) ?? ''}, minHeight: toHeight(b.minHeight), minHeightMobile: toHeight(b.minHeightMobile), overlay: b.overlay ?? 0},
  };
}

/** Fields of an Image with quote block. */
type MediaQuoteBlockData = MediaBlockData & {text?: string | null; tag?: string | null; size?: string | null};

function toMediaQuote(b: MediaQuoteBlockData): ContentData | null {
  const image = toMedia(b);
  if (!image || image.type !== 'media' || !b.text) return null;
  return {type: 'mediaQuote', mediaQuote: {...image.media, text: b.text, tag: (b.tag ?? 'h2') as MediaQuoteTag, size: (b.size ?? 'display-3') as MediaQuoteSize}};
}

/** Blocks whose column stretches to the row's height (declared by the site's ContentBlocks). */
const FILL_SLUGS = new Set(siteSections.blocks.filter((b) => b.fill).map((b) => b.block.slug));

/** Displayed width of a column depending on the screen, so the browser downloads the right size. */
const columnSizes = (span: number): string => `(max-width: 767px) 100vw, (max-width: 1440px) ${Math.round((span / 12) * 100)}vw, ${Math.round((span / 12) * 1440)}px`;

/** Pricing sub-fields shared by the single price and the tier. */
type PricingData = {
  features?: {label?: string | null; end?: string | null}[] | null;
  price?: {value?: string | null; currency?: string | null; period?: string | null} | null;
  cta?: {label?: string | null; href?: string | null} | null;
  mention?: string | null;
  guarantee?: {title?: string | null; titleTag?: string | null; text?: string | null} | null;
};
type PriceSingleData = PricingData & {featuresLabel?: string | null; totalLabel?: string | null; totalValue?: string | null; priceLabel?: string | null};
type PlanData = PricingData & {name: string; nameTag?: string | null; tagline?: string | null; featured?: boolean | null; badge?: string | null; inherits?: string | null; featuresLabel?: string | null};
type FaqBlockData = {mode?: string | null; columns?: string | null; firstOpen?: boolean | null; tag?: string | null; items?: {question: string; answer: string}[] | null};
const FAQ_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;
type TestimonialData = {quote: string; name: string; role?: string | null; result?: string | null};
type CompareCardData = {chipLabel: string; chipTone?: string | null; meta?: string | null; quote: string; items?: {label: string}[] | null; tone?: string | null; featured?: boolean | null};
type TextBoxData = {
  badges?: {label: string; tone?: string | null}[] | null;
  title?: string | null;
  titleTag?: string | null;
  titleSize?: string | null;
  content?: RichTextDocument | null;
  buttons?: {label: string; href: string; shape?: string | null; variant?: string | null; size?: string | null; iconKey?: string | null}[] | null;
  framed?: boolean | null;
  center?: boolean | null;
  vAlign?: string | null;
};

function toTextBox(b: TextBoxData): ContentData | null {
  const hasText = Boolean(b.content?.root?.children?.length);
  if (!b.title && !hasText && !(b.buttons ?? []).length) return null;
  return {
    type: 'textBox',
    textBox: {
      badges: (b.badges ?? []).slice(0, 2).map((x) => ({label: x.label, tone: (x.tone ?? 'high') as ChipTone})),
      title: orUndefined(b.title),
      titleTag: toTitleTag(b.titleTag, 'h2'),
      titleSize: (b.titleSize ?? 'heading-1') as TextBoxProps['titleSize'],
      content: hasText ? (b.content as RichTextDocument) : undefined,
      buttons: (b.buttons ?? []).slice(0, 2).map((x) => ({label: x.label, href: x.href, arrow: x.shape === 'split', variant: (x.variant ?? 'primary') as 'primary', size: x.size === 'lg' ? 'lg' : 'md', iconKey: (x.iconKey || undefined) as NucleoIconKey | undefined})),
      framed: Boolean(b.framed),
      center: Boolean(b.center),
      vAlign: (b.vAlign === 'center' || b.vAlign === 'end' ? b.vAlign : 'start') as TextBoxProps['vAlign'],
    },
  };
}

type StepsData = {tag?: string | null; steps?: {title: string; text: string; duration?: string | null; checks?: {label: string}[] | null; asterisk?: boolean | null}[] | null};

const orUndefined = (v: string | null | undefined): string | undefined => (v ? v : undefined);
const toFeatures = (items: PricingData['features']): CheckListItem[] => (items ?? []).filter((f) => f.label).map((f) => (f.end ? {label: f.label as string, end: f.end} : (f.label as string)));
const toGuarantee = (g: PricingData['guarantee']): PriceCardProps['guarantee'] => (g?.text ? {title: orUndefined(g.title), titleTag: toTitleTag(g.titleTag, 'p'), text: g.text} : undefined);
const toPricing = (b: PricingData) => ({
  features: toFeatures(b.features),
  price: {value: b.price?.value ?? '', currency: orUndefined(b.price?.currency), period: orUndefined(b.price?.period)},
  cta: {label: b.cta?.label ?? '', href: b.cta?.href ?? '#'},
  mention: orUndefined(b.mention),
  guarantee: toGuarantee(b.guarantee),
});

function toPriceSingle(b: PriceSingleData): ContentData {
  return {
    type: 'priceSingle',
    price: {
      ...toPricing(b),
      featuresLabel: orUndefined(b.featuresLabel),
      total: b.totalLabel && b.totalValue ? {label: b.totalLabel, value: b.totalValue} : undefined,
      priceLabel: orUndefined(b.priceLabel),
    },
  };
}

function toPlan(b: PlanData): ContentData {
  return {
    type: 'plan',
    plan: {
      ...toPricing(b),
      name: b.name,
      nameTag: toTitleTag(b.nameTag, 'p'),
      tagline: orUndefined(b.tagline),
      featured: Boolean(b.featured),
      badge: orUndefined(b.badge),
      inherits: orUndefined(b.inherits),
      featuresLabel: orUndefined(b.featuresLabel),
    },
  };
}

function toFaq(b: FaqBlockData): ContentData | null {
  const items = (b.items ?? []).filter((q) => q.question && q.answer);
  if (!items.length) return null;
  const tag = (FAQ_TAGS as readonly string[]).includes(b.tag ?? '') ? (b.tag as FaqData['tag']) : 'h3';
  return {type: 'faq', faq: {mode: b.mode === 'multiple' ? 'multiple' : 'single', columns: b.columns === '2' ? 2 : 1, firstOpen: b.firstOpen !== false, tag, items}};
}

function toTestimonial(b: TestimonialData): ContentData {
  return {type: 'testimonial', testimonial: {quote: b.quote, name: b.name, role: orUndefined(b.role), result: orUndefined(b.result)}};
}

function toCompareCard(b: CompareCardData): ContentData {
  return {
    type: 'compareCard',
    compareCard: {
      chip: {label: b.chipLabel, tone: (b.chipTone ?? 'accent') as ChipTone},
      meta: orUndefined(b.meta),
      quote: b.quote,
      items: (b.items ?? []).map((i) => i.label),
      tone: b.tone === 'cross' ? 'cross' : 'check',
      featured: Boolean(b.featured),
    },
  };
}

function toSteps(b: StepsData): ContentData | null {
  const steps = (b.steps ?? []).slice(0, 4).map((s) => ({title: s.title, text: s.text, duration: orUndefined(s.duration), checks: (s.checks ?? []).map((c) => c.label), asterisk: Boolean(s.asterisk)}));
  return steps.length ? {type: 'processSteps', steps, tag: toTitleTag(b.tag, 'h3')} : null;
}

type CollectionBlockData = {id?: string | null; layout?: string | null; perView?: string | null; step?: string | null; arrows?: boolean | null; indicator?: string | null; source?: string | null; items?: ContentBlock[] | null; postsLimit?: number | null; postsCategory?: number | {id: number} | null; postsCta?: string | null};

/** Loads posts for a collection with the « latest posts » source (the page gives it, with the locale). */
export type PostsLoader = (q: {limit: number; category?: number}) => Promise<Post[]>;
export type SectionsContext = {locale?: string; posts?: PostsLoader};

/** A blog post as an article card. */
function postCard(p: Post, locale: string, ctaLabel: string): ContentData {
  const fmt = new Intl.DateTimeFormat(locale, {day: 'numeric', month: 'long', year: 'numeric'});
  const cover = mediaUrl(p.cover);
  return {
    type: 'card',
    card: {
      preset: 'article',
      media: cover ? {type: 'image', src: cover, alt: mediaAlt(p.cover)} : {type: 'none'},
      chip: typeof p.category === 'object' && p.category ? {label: p.category.title} : undefined,
      date: fmt.format(new Date(p.publishedAt)),
      title: p.title,
      cta: {label: ctaLabel, href: `/blog/${p.slug}`},
    },
  };
}

/** Items of the collections fed by the blog, keyed by block id, loaded before the (synchronous) conversion. */
type PostItems = Map<string, ContentData[]>;

function toCollection(b: CollectionBlockData, posts: PostItems): ContentData | null {
  const items = b.source === 'posts' ? (posts.get(b.id ?? '') ?? []) : (b.items ?? []).map(toContent).filter((x): x is ContentData => x !== null);
  if (items.length < 2) return null;
  const perView = Math.min(Math.max(Number(b.perView ?? 3), 2), 4) as 2 | 3 | 4;
  return {
    type: 'collection',
    collection: {layout: b.layout === 'carousel' ? 'carousel' : 'swipe', perView, step: b.step === 'item' ? 'item' : 'page', arrows: b.arrows !== false, indicator: (b.indicator ?? 'segments') as CollectionData['indicator'], items},
  };
}

/** Posts of every blog-fed collection of the sections, loaded once. */
async function loadPostItems(sources: SectionSource[], ctx: SectionsContext): Promise<PostItems> {
  const out: PostItems = new Map();
  if (!ctx.posts) return out;
  const jobs: Promise<void>[] = [];
  for (const s of sources) {
    for (const r of s.rows ?? []) {
      for (const c of r.columns ?? []) {
        for (const block of c.contents ?? []) {
          if (block.blockType !== COLLECTION_SLUG) continue;
          const b = block as unknown as CollectionBlockData;
          if (b.source !== 'posts' || !b.id) continue;
          const category = typeof b.postsCategory === 'object' && b.postsCategory ? b.postsCategory.id : (b.postsCategory ?? undefined);
          const id = b.id;
          jobs.push(ctx.posts({limit: b.postsLimit ?? 6, category: category ?? undefined}).then((docs) => {
            out.set(id, docs.map((p) => postCard(p, ctx.locale ?? 'fr', b.postsCta || 'Lire')));
          }));
        }
      }
    }
  }
  await Promise.all(jobs);
  return out;
}

let postItems: PostItems = new Map();

function toContent(block: ContentBlock): ContentData | null {
  // empty cell: no content, the column is treated as empty (hidden on mobile)
  if (block.blockType === EMPTY_SLUG) return null;
  if (block.blockType === MEDIA_SLUG) return toMedia(block as unknown as MediaBlockData);
  if (block.blockType === MEDIA_QUOTE_SLUG) return toMediaQuote(block as unknown as MediaQuoteBlockData);
  if (block.blockType in CARD_VARIANTS) return {type: 'card', card: toCard(block as unknown as CardBlockData)};
  switch (block.blockType) {
    case PRICE_SINGLE_SLUG:
      return toPriceSingle(block as unknown as PriceSingleData);
    case PLAN_SLUG:
      return toPlan(block as unknown as PlanData);
    case FAQ_SLUG:
      return toFaq(block as unknown as FaqBlockData);
    case TESTIMONIAL_SLUG:
      return toTestimonial(block as unknown as TestimonialData);
    case COMPARE_CARD_SLUG:
      return toCompareCard(block as unknown as CompareCardData);
    case PROCESS_STEPS_SLUG:
      return toSteps(block as unknown as StepsData);
    case COLLECTION_SLUG:
      return toCollection(block as unknown as CollectionBlockData, postItems);
    case TEXT_BOX_SLUG:
      return toTextBox(block as unknown as TextBoxData);
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

/** Rows of a section, with each column's mobile rank computed across the whole section. */
function sectionRows(rows: SectionSource['rows']): ColumnData[][] {
  const built = (rows ?? []).map((r) => {
    const columns = (r.columns ?? []).map((c) => {
      const contents = (c.contents ?? []).map(toContent).filter((x): x is ContentData => x !== null);
      const fill = (c.contents ?? []).some((b) => FILL_SLUGS.has(b.blockType));
      return {span: toSpan(c.span), contents, empty: contents.length === 0, mobileOrder: c.mobileOrder, fill};
    });
    // an image (with or without quote) only sets its desktop height if the row has no other content
    const isImage = (x: ContentData) => x.type === 'media' || x.type === 'mediaQuote';
    const otherContent = columns.some((c) => c.contents.some((x) => !isImage(x)));
    return columns.map((c) => {
      const stretch = c.fill || c.contents.some(isImage);
      const fit = <T extends {minHeight?: number; sizes?: string}>(p: T): T => ({...p, minHeight: otherContent ? undefined : p.minHeight, sizes: columnSizes(c.span)});
      const contents = c.contents.map((x): ContentData => (x.type === 'media' ? {...x, media: fit(x.media)} : x.type === 'mediaQuote' ? {...x, mediaQuote: fit(x.mediaQuote)} : x));
      return {...c, contents, stretch};
    });
  });
  const flat = built.flat();
  const ranks = hasMobileOrder(flat) ? mobileRanks(flat) : null;
  let k = 0;
  return built.map((columns) => columns.map(({mobileOrder: _m, fill: _f, ...c}) => ({...c, mobileRank: ranks?.[k++] ?? undefined})));
}

/**
 * The « sections » blocks of a page (loaded with depth ≥ 2 for shared section media).
 * `settings`: site settings, for the grid's default gaps (Mise en page).
 * `ctx`: the locale and the posts loader, for collections fed by the blog.
 */
export async function toSections(blocks: Page['sections'], settings?: Pick<Setting, 'sectionGrid'> | null, ctx: SectionsContext = {}): Promise<SectionData[]> {
  const site = siteGaps(settings?.sectionGrid);
  const sources: {source: SectionSource; key: string}[] = [];
  (blocks ?? []).forEach((b, i) => {
    const key = b.id ?? String(i);
    if (b.blockType === 'section') sources.push({source: b, key});
    else if (b.blockType === 'sharedSection' && b.section && typeof b.section === 'object') sources.push({source: b.section, key});
  });
  postItems = await loadPostItems(sources.map((s) => s.source), ctx);
  return sources.map((s) => toSection(s.source, s.key, site));
}
