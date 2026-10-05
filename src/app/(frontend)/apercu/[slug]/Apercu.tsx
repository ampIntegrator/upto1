'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React, {useLayoutEffect, useRef, useState} from 'react';

import {ButtonGroup} from '@/components/ButtonGroup';
import {Card, type CardProps} from '@/components/Card';
import {Collapsible, CollapsibleGroup} from '@/components/Collapsible';
import {Collection} from '@/components/Collection';
import {CompareCard} from '@/components/CompareCard';
import {CtaBand} from '@/components/CtaBand';
import {Gallery} from '@/components/Gallery';
import {KeyPoints} from '@/components/KeyPoints';
import {Media} from '@/components/Media';
import {MediaQuote} from '@/components/MediaQuote';
import {PlanCard} from '@/components/PlanCard';
import {PriceCard} from '@/components/PriceCard';
import {ProcessSteps} from '@/components/ProcessSteps';
import {QuoteCard} from '@/components/QuoteCard';
import type {RichTextDocument, RichTextNode} from '@/components/rich-text';
import {SectionHeading} from '@/components/SectionHeading';
import {SiteForm} from '@/components/SiteForm';
import {StatsBand} from '@/components/StatsBand';
import {Tabs} from '@/components/Tabs';
import {TestimonialCard} from '@/components/TestimonialCard';
import {TextBox} from '@/components/TextBox';
import {BUTTON_GROUP_SLUG} from '@/fields/blocks/buttonGroupBlock';
import {CARD_VARIANTS} from '@/fields/blocks/cardBlocks';
import {CASE_CARD_SLUG} from '@/fields/blocks/caseCardBlock';
import {COLLECTION_SLUG} from '@/fields/blocks/collectionBlock';
import {COMPARE_CARD_SLUG} from '@/fields/blocks/compareCardBlock';
import {FAQ_SLUG} from '@/fields/blocks/faqBlock';
import {FORM_SLUG} from '@/fields/blocks/formBlock';
import {MEDIA_SLUG} from '@/fields/blocks/mediaBlock';
import {MEDIA_QUOTE_SLUG} from '@/fields/blocks/mediaQuoteBlock';
import {PLAN_SLUG} from '@/fields/blocks/planBlock';
import {POST_CARD_SLUG} from '@/fields/blocks/postCardBlock';
import {PREVIEW_STAGE, WIDE_PREVIEWS} from '@/fields/blocks/previews';
import {PRICE_SINGLE_SLUG} from '@/fields/blocks/priceSingleBlock';
import {PROCESS_STEPS_SLUG} from '@/fields/blocks/processStepsBlock';
import {CTA_BAND_SLUG, GALLERY_SLUG, KEY_POINTS_SLUG, QUOTE_CARD_SLUG, STATS_BAND_SLUG} from '@/fields/blocks/prose/slugs';
import {SECTION_HEADING_SLUG} from '@/fields/blocks/sectionHeadingBlock';
import {TABS_SLUG} from '@/fields/blocks/tabsSlug';
import {TESTIMONIAL_SLUG} from '@/fields/blocks/testimonialBlock';
import {TEXT_BOX_SLUG} from '@/fields/blocks/textBoxSlug';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';
import {GALLERY} from '../../design/_showcases/post.shared';

/*
 * Demo data of the picker previews: neutral lorem ipsum (the thumbnails show a component's shape,
 * not a message), at realistic lengths, and short enough for each component to fill its stage.
 */
const IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';
const PHOTO = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80';
const TITLE = 'Lorem ipsum dolor';
const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.';

const t = (text: string, format = 0) => ({type: 'text', text, format});
const p = (...children: object[]) => ({type: 'paragraph', children});
const li = (...children: object[]) => ({type: 'listitem', children});
const doc = (...children: object[]): RichTextDocument => ({root: {children: children as RichTextNode[]}});

const LOREM_DOC = doc(
  p(t('Lorem ipsum dolor sit amet, '), t('consectetur adipiscing elit', 1), t('. Sed do eiusmod tempor.')),
  {type: 'list', listType: 'bullet', children: [li(t('Ut enim ad minim veniam')), li(t('Quis nostrud '), t('exercitation', 1))]},
);
const TAB_DOC = doc(p(t('Lorem ipsum dolor sit amet, '), t('consectetur adipiscing elit', 1), t('. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.')));
const KEY_POINTS_DOC = doc({type: 'list', listType: 'bullet', children: [li(t('Lorem ipsum dolor sit amet, '), t('consectetur adipiscing', 1), t(' elit.')), li(t('Sed do eiusmod tempor incididunt ut labore et dolore.')), li(t('Ut enim ad minim veniam, '), t('quis nostrud', 1), t(' exercitation.'))]});

const TESTIMONIALS = [
  {quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', name: 'Lorem I.', role: 'Dolor · Sit amet', result: '+ 12 000 €'},
  {quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.', name: 'Ipsum D.', role: 'Amet · Consectetur', result: '× 2'},
  {quote: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', name: 'Dolor S.', role: 'Elit · Tempor', result: '+ 28 %'},
];
const FAQ = [
  {q: 'Lorem ipsum dolor sit amet consectetur ?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'},
  {q: 'Quis nostrud exercitation ullamco laboris ?', a: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.'},
];
const PRICE_SINGLE = {
  featuresLabel: 'Lorem ipsum dolor',
  priceLabel: 'Lorem ipsum',
  features: [
    {label: 'Lorem ipsum dolor sit', end: '97 €'},
    {label: 'Consectetur adipiscing', end: '147 €'},
    {label: 'Sed do eiusmod tempor', end: '47 €'},
    {label: 'Ut labore et dolore', end: '27 €'},
  ],
  total: {label: 'Lorem ipsum', value: '318 € / mois'},
  price: {value: '79', period: 'lorem ipsum · 2,60 € / dolor'},
  cta: {label: 'Lorem ipsum dolor', href: '#'},
  mention: 'Lorem ipsum · Dolor sit amet',
};
const PLAN = {name: 'Lorem', badge: 'Lorem', featuresLabel: 'Lorem ipsum dolor', tagline: 'Lorem ipsum dolor sit', price: {value: '79'}, cta: {label: 'Lorem ipsum', href: '#'}, featured: true, features: ['Lorem ipsum dolor sit', 'Consectetur adipiscing', 'Sed do eiusmod tempor']};
const COMPARE = {chip: {label: 'LOREM', tone: 'high' as const}, meta: 'Lorem ipsum', quote: '« Lorem ipsum dolor sit amet, consectetur. »', featured: true, items: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor']};
const STEPS = [
  {title: 'Lorem ipsum', duration: '5 min', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.', checks: ['Ut enim ad minim veniam', 'Quis nostrud exercitation']},
  {title: 'Dolor sit amet', duration: '48 h', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.', checks: ['Excepteur sint occaecat', 'Sunt in culpa qui officia']},
];

/**
 * Width at which a component is rendered (CSS px) before it is fitted in its stage (scaled down or
 * up until it touches two facing edges). Default: the stage's width. A component that comes out
 * taller than the stage is rendered wider here, so that it fills more of the stage once fitted.
 */
const RENDER_WIDTH: Record<string, number> = {
  [PRICE_SINGLE_SLUG]: 760,
  [GALLERY_SLUG]: 800,
  [PLAN_SLUG]: 640,
  [TEXT_BOX_SLUG]: 600,
  [FORM_SLUG]: 600,
};

/** Demo data for a card variant. */
function demoCard(slug: string): CardProps {
  const v = CARD_VARIANTS[slug];
  const media: CardProps['media'] =
    v.media === 'image' ? {type: 'image', src: IMG, alt: ''}
    : v.media === 'icon' ? {type: 'icon', iconKey: 'calculator'}
    : v.media === 'number' ? {type: 'number', value: '34', prefix: '+', suffix: '%'}
    : {type: 'none'};
  return {
    preset: 'bloc',
    media,
    accentTitle: v.media === 'title',
    title: TITLE,
    text: TEXT,
    cta: v.clickable ? {label: 'Lorem ipsum', href: '#'} : undefined,
  };
}

/** The demo component of a block. */
function demo(slug: string): React.ReactNode {
  switch (slug) {
    case SECTION_HEADING_SLUG:
      return <SectionHeading eyebrow="Lorem ipsum" title="Lorem ipsum <span>dolor sit amet.</span>" size="display-3" text="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore." />;
    case POST_CARD_SLUG:
      return <Card preset="article" media={{type: 'image', src: IMG, alt: ''}} chip={{label: 'Lorem'}} date="12 septembre 2026" title="Lorem ipsum dolor sit amet, consectetur adipiscing" cta={{label: 'Lorem ipsum', href: '#'}} />;
    case CASE_CARD_SLUG:
      return <Card preset="realisation" media={{type: 'image', src: IMG, alt: ''}} chip={{label: 'Lorem', tone: 'high'}} result="−68 % ipsum" title="Lorem ipsum dolor sit amet, consectetur" client={{name: 'Lorem Ipsum', location: 'Dolor (44)'}} cta={{label: 'Lorem ipsum', href: '#'}} />;
    case BUTTON_GROUP_SLUG:
      return (
        <VStack gap={6}>
          <ButtonGroup mode="attached" label="Lorem" buttons={[{label: 'Lorem ipsum', href: '#', variant: 'secondary', iconKey: 'home'}, {label: 'Dolor sit', href: '#', variant: 'secondary', iconKey: 'calculator'}, {label: 'Amet elit', href: '#', variant: 'secondary', iconKey: 'building'}]} />
          <ButtonGroup mode="spaced" width="full" buttons={[{label: 'Lorem ipsum dolor', href: '#', variant: 'primary', arrow: true}, {label: 'Sit amet', href: '#', variant: 'high', arrow: true}]} />
        </VStack>
      );
    case TABS_SLUG:
      return <Tabs items={['Lorem ipsum dolor', 'Sit amet consectetur', 'Adipiscing elit sed'].map((label) => ({label, content: TAB_DOC}))} label="Lorem" />;
    case TEXT_BOX_SLUG:
      return <TextBox badges={[{label: 'Lorem', tone: 'high'}]} title={TITLE} titleTag="h2" titleSize="heading-1" content={LOREM_DOC} buttons={[{label: 'Lorem ipsum', href: '#', arrow: true}]} framed />;
    case FORM_SLUG:
      return (
        <SiteForm
          id="apercu-form"
          title="Lorem <span>ipsum dolor</span>"
          steps={[{fields: [{type: 'text', name: 'nom', label: 'Lorem', required: true}, {type: 'email', name: 'email', label: 'Ipsum', required: true}, {type: 'consent', name: 'ok', label: 'Lorem ipsum dolor sit amet.'}]}]}
          submitLabel="Lorem ipsum"
          submitAction={async () => ({ok: true})}
          confirmation={{type: 'message', content: null}}
        />
      );
    case COLLECTION_SLUG:
      return (
        <Collection layout="carousel" perView={3} label="Lorem">
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </Collection>
      );
    case PRICE_SINGLE_SLUG:
      return <PriceCard {...PRICE_SINGLE} />;
    case PLAN_SLUG:
      return <PlanCard {...PLAN} />;
    case FAQ_SLUG:
      return (
        <CollapsibleGroup type="single" defaultValue="apercu-0">
          {FAQ.map((f, i) => (
            <Collapsible key={i} value={`apercu-${i}`} question={f.q}>
              <Text type="body">{f.a}</Text>
            </Collapsible>
          ))}
        </CollapsibleGroup>
      );
    case TESTIMONIAL_SLUG:
      return <TestimonialCard {...TESTIMONIALS[0]} />;
    case COMPARE_CARD_SLUG:
      return <CompareCard {...COMPARE} />;
    case PROCESS_STEPS_SLUG:
      return <ProcessSteps steps={STEPS} />;
    case MEDIA_QUOTE_SLUG:
      return <MediaQuote image={{src: IMG, alt: ''}} text="Lorem ipsum." size="display-3" overlay={0.45} minHeight={240} sizes="480px" />;
    case MEDIA_SLUG:
      return <Media image={{src: IMG, alt: ''}} minHeight={240} sizes="480px" />;
    case KEY_POINTS_SLUG:
      return <KeyPoints eyebrow="Lorem ipsum" content={KEY_POINTS_DOC} />;
    case CTA_BAND_SLUG:
      return <CtaBand variant="icon" iconKey="calculator" title="Lorem ipsum dolor sit amet" text="Consectetur adipiscing elit, sed do eiusmod tempor." button={{label: 'Lorem ipsum', href: '#', variant: 'high', arrow: true}} />;
    case STATS_BAND_SLUG:
      return <StatsBand items={[{value: '−68 %', label: 'Lorem ipsum'}, {value: '×2,4', label: 'Dolor sit amet'}, {value: '+31 %', label: 'Consectetur'}]} />;
    case QUOTE_CARD_SLUG:
      return <QuoteCard quote="« Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. »" name="Lorem Ipsum" role="Dolor · Sit amet" photo={{src: PHOTO}} />;
    case GALLERY_SLUG:
      return <Gallery images={GALLERY.slice(1, 3)} wideFirst={false} caption="Lorem ipsum dolor sit amet." />;
    case EMPTY_SLUG:
      // empty cell: a dashed placeholder, the height of a card
      return (
        <VStack hAlign="center" vAlign="center" style={{minHeight: 'calc(var(--spacing-12) * 5)', border: 'var(--border-width) dashed var(--color-border-emphasized)'}}>
          <Text type="label" color="secondary">Case vide</Text>
        </VStack>
      );
    default:
      return <Card {...demoCard(slug)} />;
  }
}

/**
 * The stage: a fixed box on the page background (standard or wide, same height) with the component
 * centred in it, rendered at its width then scaled uniformly to fit the stage (no padding).
 * `data-apercu` targets the capture; `data-ready` and `data-scale` are read by `pnpm previews:build`.
 */
function Stage({slug, children}: {slug: string; children: React.ReactNode}) {
  const wide = WIDE_PREVIEWS.has(slug);
  const stageWidth = wide ? PREVIEW_STAGE.wideWidth : PREVIEW_STAGE.width;
  const innerWidth = stageWidth;
  const innerHeight = PREVIEW_STAGE.height;
  const width = RENDER_WIDTH[slug] ?? innerWidth;
  const content = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = content.current;
    if (!el) return;
    const fit = () => setScale(Math.min(innerWidth / Math.max(el.offsetWidth, el.scrollWidth), innerHeight / Math.max(el.offsetHeight, el.scrollHeight)));
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    // ready once the fonts and the images are in (they change the component's size)
    let alive = true;
    const loaded = (img: HTMLImageElement) =>
      new Promise<void>((done) => {
        if (img.complete) return done();
        img.addEventListener('load', () => done(), {once: true});
        img.addEventListener('error', () => done(), {once: true});
      });
    const images = [...el.querySelectorAll('img')].map(loaded);
    Promise.all([document.fonts.ready, ...images]).then(() =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!alive) return;
          fit();
          setReady(true);
        }),
      ),
    );
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [innerHeight, innerWidth]);

  // (the plan card's badge sits astride its top edge: it gets room, so that it is not cut)
  return (
    <VStack data-apercu data-ready={ready || undefined} data-scale={scale.toFixed(3)} style={{position: 'relative', width: stageWidth, height: PREVIEW_STAGE.height, overflow: 'hidden', background: 'var(--color-background-body)'}}>
      <VStack ref={content} style={{position: 'absolute', insetInlineStart: '50%', insetBlockStart: '50%', width, paddingBlockStart: slug === PLAN_SLUG ? 'var(--spacing-3)' : undefined, transform: `translate(-50%, -50%) scale(${scale})`}}>
        {children}
      </VStack>
    </VStack>
  );
}

/** The block alone, centred in its stage on the page background, blue silo, light mode. */
export function Apercu({slug}: {slug: string}) {
  return (
    <OrbitaThemeProvider fixedSilo="blue" initialMode="light">
      <Stage slug={slug}>{demo(slug)}</Stage>
    </OrbitaThemeProvider>
  );
}
