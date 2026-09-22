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
import type {TabsItem} from '@/components/Tabs';
import type {ButtonGroupProps} from '@/components/ButtonGroup';
import type {SectionHeadingProps} from '@/components/SectionHeading';
import type {TextBoxButton, TextBoxProps} from '@/components/TextBox';
import type {RichTextDocument} from '@/components/rich-text';
import {type TitleTag, toTitleTag} from '@/components/title-tags';
import {caseCard, postCard} from '@/lib/cards';
import {type BlogConfig, blogConfig, type CasesConfig, casesConfig, listingPath} from '@/lib/listings';
import type {CheckListItem} from '@/components/CheckList';
import type {ChipTone} from '@/components/Chip';
import type {MediaQuoteProps, MediaQuoteSize, MediaQuoteTag} from '@/components/MediaQuote';
import type {SectionBackground, SectionTint} from '@/components/Section';
import {BUTTON_GROUP_SLUG} from '@/fields/blocks/buttonGroupBlock';
import {CASE_CARD_SLUG} from '@/fields/blocks/caseCardBlock';
import {POST_CARD_SLUG} from '@/fields/blocks/postCardBlock';
import {CTA_BAND_SLUG, GALLERY_SLUG, KEY_POINTS_SLUG, QUOTE_CARD_SLUG, STATS_BAND_SLUG} from '@/fields/blocks/prose/slugs';
import {SECTION_HEADING_SLUG} from '@/fields/blocks/sectionHeadingBlock';
import {CARD_VARIANTS} from '@/fields/blocks/cardBlocks';
import {COLLECTION_SLUG} from '@/fields/blocks/collectionBlock';
import {COMPARE_CARD_SLUG} from '@/fields/blocks/compareCardBlock';
import {FAQ_SLUG} from '@/fields/blocks/faqBlock';
import {FORM_SLUG} from '@/fields/blocks/formBlock';
import {type FormData, formData} from '@/lib/forms';
import {PLAN_SLUG} from '@/fields/blocks/planBlock';
import {PRICE_SINGLE_SLUG} from '@/fields/blocks/priceSingleBlock';
import {PROCESS_STEPS_SLUG} from '@/fields/blocks/processStepsBlock';
import {TESTIMONIAL_SLUG} from '@/fields/blocks/testimonialBlock';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {type Gaps, sectionGaps, siteGaps} from '@/fields/sections/gaps';
import {MEDIA_SLUG} from '@/fields/blocks/mediaBlock';
import {MEDIA_QUOTE_SLUG} from '@/fields/blocks/mediaQuoteBlock';
import {TABS_SLUG} from '@/fields/blocks/tabsSlug';
import {TEXT_BOX_SLUG} from '@/fields/blocks/textBoxSlug';
import {sections as siteSections} from '@/sections.config';
import {hasMobileOrder, mobileRanks} from '@/fields/sections/mobileOrder';
import {type ColumnSpan, toSpan} from '@/fields/sections/grid';
import type {NucleoIconKey} from '@/theme/icons/nucleo';
import type {CaseStudy, Form, Media, Page, Post, Section as SharedSection, Setting} from '@/payload-types';

type PageSection = NonNullable<Page['sections']>[number];
type SectionBlock = Extract<PageSection, {blockType: 'section'}>;
type SectionSource = Omit<SectionBlock, 'blockType' | 'id' | 'blockName' | 'saveAsShared' | 'sharedTitle'> | SharedSection;
type ContentBlock = NonNullable<NonNullable<NonNullable<SectionBlock['rows']>[number]['columns']>[number]['contents']>[number];

/** A FAQ block: mode, columns, whether the first question starts open, and the questions. */
export type FaqData = {mode: 'single' | 'multiple'; columns: 1 | 2; firstOpen: boolean; tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'; items: {question: string; answer: string}[]};

/** A collection: identical items side by side, swipe or carousel. */
export type CollectionData = {layout: 'swipe' | 'carousel'; perView: 2 | 3 | 4; step: 'page' | 'item'; arrows: boolean; indicator: 'segments' | 'dots' | 'numbers' | 'none'; items: ContentData[]; more?: {label: string; href: string}};

export type ContentData =
  | {type: 'textBox'; textBox: TextBoxProps}
  | {type: 'tabs'; items: TabsItem[]}
  | {type: 'buttonGroup'; buttonGroup: ButtonGroupProps}
  | {type: 'sectionHeading'; heading: SectionHeadingProps}
  /** a post figure placed in a column: rendered by ProseBlock like in a post */
  | {type: 'figure'; fields: Record<string, unknown>}
  | {type: 'collection'; collection: CollectionData}
  | {type: 'form'; form: FormData}
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
  /** edge line at the top: the junction with the section above */
  edgeTop?: boolean;
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
/** A button row of the text box or the button group (buttonFields.ts). */
export type ButtonData = {label: string; href: string; shape?: string | null; variant?: string | null; size?: string | null; iconKey?: string | null};
const BUTTON_VARIANTS = ['primary', 'high', 'secondary', 'ghost'] as const;
export function toButton(x: ButtonData): TextBoxButton {
  const variant = (BUTTON_VARIANTS as readonly string[]).includes(x.variant ?? '') ? (x.variant as TextBoxButton['variant']) : 'primary';
  const split = x.shape === 'split';
  return {label: x.label, href: x.href, arrow: split, variant, size: x.size === 'lg' ? 'lg' : 'md', iconKey: split ? undefined : ((x.iconKey || undefined) as NucleoIconKey | undefined)};
}

type ButtonGroupData = {mode?: string | null; width?: string | null; align?: string | null; buttons?: ButtonData[] | null};
function toButtonGroup(b: ButtonGroupData): ContentData | null {
  const buttons = (b.buttons ?? []).filter((x) => x.label && x.href).slice(0, 4).map(toButton);
  if (!buttons.length) return null;
  return {
    type: 'buttonGroup',
    buttonGroup: {buttons, mode: b.mode === 'attached' ? 'attached' : 'spaced', width: b.width === 'full' ? 'full' : 'natural', align: b.align === 'center' || b.align === 'end' ? b.align : 'start'},
  };
}

type TabsData = {items?: {label?: string | null; content?: RichTextDocument | null}[] | null};

/** Tabs with a label; a tab without text keeps an empty panel. */
function toTabs(b: TabsData): ContentData | null {
  const items = (b.items ?? []).filter((i) => i.label).map((i) => ({label: i.label as string, content: i.content?.root?.children?.length ? i.content : null}));
  return items.length ? {type: 'tabs', items} : null;
}

type TextBoxData = {
  badges?: {label: string; tone?: string | null}[] | null;
  title?: string | null;
  titleTag?: string | null;
  titleSize?: string | null;
  content?: RichTextDocument | null;
  buttons?: ButtonData[] | null;
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
      buttons: (b.buttons ?? []).slice(0, 2).map(toButton),
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

type CollectionBlockData = {id?: string | null; layout?: string | null; perView?: string | null; step?: string | null; arrows?: boolean | null; indicator?: string | null; source?: string | null; items?: ContentBlock[] | null; postsLimit?: number | null; postsCategory?: number | {id: number} | null; postsCta?: string | null; casesLimit?: number | null; casesCategory?: number | {id: number} | null; casesCta?: string | null; moreLink?: string | null; moreLabel?: string | null; moreHref?: string | null};

/** Loads the latest entries of a listing for a collection block (the page gives it, with the locale). */
export type EntriesLoader<T> = (q: {limit: number; category?: number}) => Promise<T[]>;
export type SectionsContext = {
  locale?: string;
  /** the blog and the case studies (their settings): entry URLs under their page, cards' link label */
  blog?: BlogConfig;
  cases?: CasesConfig;
  posts?: EntriesLoader<Post>;
  caseStudies?: EntriesLoader<CaseStudy>;
  /** entries chosen in post cards and case cards, loaded with their cover and category */
  postsByIds?: (ids: number[]) => Promise<Post[]>;
  caseStudiesByIds?: (ids: number[]) => Promise<CaseStudy[]>;
  /** forms chosen in the « Formulaire » blocks, loaded with their redirect page */
  formsByIds?: (ids: number[]) => Promise<Form[]>;
};

/** A blog post as an article card, a case study as a realisation card. */
const postContent = (p: Post, ctaLabel?: string): ContentData => ({type: 'card', card: postCard(p, sectionsCtx.blog ?? blogConfig(null), sectionsCtx.locale ?? 'fr', ctaLabel)});
const caseContent = (c: CaseStudy, ctaLabel?: string): ContentData => ({type: 'card', card: caseCard(c, sectionsCtx.cases ?? casesConfig(null), ctaLabel)});

/** Items of the collections fed by a listing, keyed by block id, loaded before the (synchronous) conversion. */
type EntryItems = Map<string, ContentData[]>;

function toCollection(b: CollectionBlockData, entries: EntryItems): ContentData | null {
  const items = b.source === 'posts' || b.source === 'cases' ? (entries.get(b.id ?? '') ?? []) : (b.items ?? []).map(toContent).filter((x): x is ContentData => x !== null);
  if (items.length < 2) return null;
  const perView = Math.min(Math.max(Number(b.perView ?? 3), 2), 4) as 2 | 3 | 4;
  return {
    type: 'collection',
    collection: {layout: b.layout === 'carousel' ? 'carousel' : 'swipe', perView, step: b.step === 'item' ? 'item' : 'page', arrows: b.arrows !== false, indicator: (b.indicator ?? 'segments') as CollectionData['indicator'], items, more: collectionMore(b)},
  };
}

/** The « see all » button: the blog or the case studies (label from their settings unless typed), or a custom link. */
function collectionMore(b: CollectionBlockData): CollectionData['more'] {
  const listing = b.moreLink === 'blog' ? (sectionsCtx.blog ?? blogConfig(null)) : b.moreLink === 'cases' ? (sectionsCtx.cases ?? casesConfig(null)) : null;
  if (listing) return {label: b.moreLabel || listing.labels.more, href: listingPath(listing)};
  if (b.moreLink === 'custom' && b.moreLabel && b.moreHref) return {label: b.moreLabel, href: b.moreHref};
  return undefined;
}


const refId = (ref: number | {id: number} | null | undefined): number | null => (typeof ref === 'object' && ref ? ref.id : typeof ref === 'number' ? ref : null);

/** Every content block of the sources, collection items included. */
function eachBlock(sources: SectionSource[], visit: (block: ContentBlock) => void) {
  const walk = (block: ContentBlock) => {
    visit(block);
    if (block.blockType === COLLECTION_SLUG) for (const item of (block as unknown as CollectionBlockData).items ?? []) walk(item);
  };
  for (const s of sources) for (const r of s.rows ?? []) for (const c of r.columns ?? []) for (const block of c.contents ?? []) walk(block);
}

/** Latest entries of every listing-fed collection of the sections, loaded once. */
async function loadEntryItems(sources: SectionSource[], ctx: SectionsContext): Promise<EntryItems> {
  const out: EntryItems = new Map();
  const jobs: Promise<void>[] = [];
  eachBlock(sources, (block) => {
    if (block.blockType !== COLLECTION_SLUG) return;
    const b = block as unknown as CollectionBlockData;
    const id = b.id;
    if (!id) return;
    if (b.source === 'posts' && ctx.posts) {
      jobs.push(ctx.posts({limit: b.postsLimit ?? 6, category: refId(b.postsCategory) ?? undefined}).then((docs) => void out.set(id, docs.map((p) => postContent(p, b.postsCta || undefined)))));
    }
    if (b.source === 'cases' && ctx.caseStudies) {
      jobs.push(ctx.caseStudies({limit: b.casesLimit ?? 6, category: refId(b.casesCategory) ?? undefined}).then((docs) => void out.set(id, docs.map((c) => caseContent(c, b.casesCta || undefined)))));
    }
  });
  await Promise.all(jobs);
  return out;
}

let entryItems: EntryItems = new Map();
/** the context of the current conversion (set by toSections) */
let sectionsCtx: SectionsContext = {};
/** entries chosen in post cards and case cards, loaded by toSections */
let chosenPosts = new Map<number, Post>();
let chosenCases = new Map<number, CaseStudy>();
let chosenForms = new Map<number, Form>();

type FormBlockData = {id?: string | null; form?: number | Form | null; framed?: boolean | null; showHeading?: boolean | null};

function toForm(b: FormBlockData): ContentData | null {
  const id = refId(b.form as number | {id: number} | null);
  const doc = (id !== null ? chosenForms.get(id) : undefined) ?? (typeof b.form === 'object' && b.form ? b.form : null);
  const form = doc ? formData(doc, {id: `form-${b.id ?? doc.id}`, framed: b.framed !== false, showHeading: b.showHeading !== false}) : null;
  return form ? {type: 'form', form} : null;
}

/** The forms chosen in « Formulaire » blocks, loaded once. */
async function loadChosenForms(sources: SectionSource[], ctx: SectionsContext): Promise<Map<number, Form>> {
  const ids = new Set<number>();
  eachBlock(sources, (block) => {
    if (block.blockType !== FORM_SLUG) return;
    const id = refId((block as unknown as FormBlockData).form as number | {id: number} | null);
    if (id !== null) ids.add(id);
  });
  const forms = ids.size && ctx.formsByIds ? await ctx.formsByIds([...ids]) : [];
  return new Map(forms.map((f) => [f.id, f]));
}

type PostCardData = {post?: number | Post | null};
type CaseCardData = {caseStudy?: number | CaseStudy | null};

function toPostCard(b: PostCardData): ContentData | null {
  const id = refId(b.post);
  const doc = (id !== null ? chosenPosts.get(id) : undefined) ?? (typeof b.post === 'object' && b.post ? b.post : null);
  return doc ? postContent(doc) : null;
}

function toCaseCard(b: CaseCardData): ContentData | null {
  const id = refId(b.caseStudy);
  const doc = (id !== null ? chosenCases.get(id) : undefined) ?? (typeof b.caseStudy === 'object' && b.caseStudy ? b.caseStudy : null);
  return doc ? caseContent(doc) : null;
}

/** The entries chosen in post cards and case cards (columns and collection items), loaded once with their relations. */
async function loadChosenEntries(sources: SectionSource[], ctx: SectionsContext): Promise<[Map<number, Post>, Map<number, CaseStudy>]> {
  const postIds = new Set<number>();
  const caseIds = new Set<number>();
  eachBlock(sources, (block) => {
    if (block.blockType === POST_CARD_SLUG) {
      const id = refId((block as unknown as PostCardData).post);
      if (id !== null) postIds.add(id);
    }
    if (block.blockType === CASE_CARD_SLUG) {
      const id = refId((block as unknown as CaseCardData).caseStudy);
      if (id !== null) caseIds.add(id);
    }
  });
  const [posts, cases] = await Promise.all([
    postIds.size && ctx.postsByIds ? ctx.postsByIds([...postIds]) : Promise.resolve([] as Post[]),
    caseIds.size && ctx.caseStudiesByIds ? ctx.caseStudiesByIds([...caseIds]) : Promise.resolve([] as CaseStudy[]),
  ]);
  return [new Map(posts.map((p) => [p.id, p])), new Map(cases.map((c) => [c.id, c]))];
}

type SectionHeadingData = {eyebrow?: string | null; title?: string | null; tag?: string | null; lead?: string | null; align?: string | null};
function toSectionHeading(b: SectionHeadingData): ContentData | null {
  if (!b.title) return null;
  return {type: 'sectionHeading', heading: {eyebrow: orUndefined(b.eyebrow), title: b.title, tag: toTitleTag(b.tag, 'h2'), size: 'display-3', text: orUndefined(b.lead), align: b.align === 'start' ? 'start' : 'center'}};
}

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
      return toCollection(block as unknown as CollectionBlockData, entryItems);
    case TEXT_BOX_SLUG:
      return toTextBox(block as unknown as TextBoxData);
    case TABS_SLUG:
      return toTabs(block as unknown as TabsData);
    case BUTTON_GROUP_SLUG:
      return toButtonGroup(block as unknown as ButtonGroupData);
    case POST_CARD_SLUG:
      return toPostCard(block as unknown as PostCardData);
    case CASE_CARD_SLUG:
      return toCaseCard(block as unknown as CaseCardData);
    case FORM_SLUG:
      return toForm(block as unknown as FormBlockData);
    case SECTION_HEADING_SLUG:
      return toSectionHeading(block as unknown as SectionHeadingData);
    case KEY_POINTS_SLUG:
    case CTA_BAND_SLUG:
    case STATS_BAND_SLUG:
    case QUOTE_CARD_SLUG:
    case GALLERY_SLUG:
      return {type: 'figure', fields: block as unknown as Record<string, unknown>};
    default:
      return null;
  }
}

/**
 * The edge line at the top of a light section: always, never, or automatic = the section above is
 * light too, of the same shade, and the texture changes (the two backgrounds would meet badly).
 * Never on the first section (the page top has its own edge) nor on night and media backgrounds.
 */
function edgeTop(s: SectionSource, above: SectionSource | undefined): boolean {
  const mode = (s as {edgeTop?: string | null}).edgeTop ?? 'auto';
  if (s.mode !== 'light' || mode === 'never' || !above) return false;
  if (mode === 'always') return true;
  const shade = (x: SectionSource) => (x.tint === 'highlight' ? 'highlight' : 'body');
  const texture = (x: SectionSource) => x.texture ?? 'none';
  return above.mode === 'light' && shade(above) === shade(s) && texture(above) !== texture(s);
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
 * `ctx`: the locale, the listings and their entry loaders (collections fed by a listing, post and case cards).
 */
export async function toSections(blocks: Page['sections'], settings?: Pick<Setting, 'sectionGrid'> | null, ctx: SectionsContext = {}): Promise<SectionData[]> {
  const site = siteGaps(settings?.sectionGrid);
  const sources: {source: SectionSource; key: string}[] = [];
  (blocks ?? []).forEach((b, i) => {
    const key = b.id ?? String(i);
    if (b.blockType === 'section') sources.push({source: b, key});
    else if (b.blockType === 'sharedSection' && b.section && typeof b.section === 'object') sources.push({source: b.section, key});
  });
  sectionsCtx = ctx;
  const list = sources.map((s) => s.source);
  [entryItems, [chosenPosts, chosenCases], chosenForms] = await Promise.all([loadEntryItems(list, ctx), loadChosenEntries(list, ctx), loadChosenForms(list, ctx)]);
  return sources.map((s, i) => ({...toSection(s.source, s.key, site), edgeTop: edgeTop(s.source, sources[i - 1]?.source)}));
}
