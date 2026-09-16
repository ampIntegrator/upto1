'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Card, type CardProps} from '@/components/Card';
import {Collapsible, CollapsibleGroup} from '@/components/Collapsible';
import {Collection} from '@/components/Collection';
import {CompareCard} from '@/components/CompareCard';
import {Media} from '@/components/Media';
import {MediaQuote} from '@/components/MediaQuote';
import {PlanCard} from '@/components/PlanCard';
import {PriceCard} from '@/components/PriceCard';
import {ProcessSteps} from '@/components/ProcessSteps';
import {TestimonialCard} from '@/components/TestimonialCard';
import {TextBox} from '@/components/TextBox';
import {CARD_VARIANTS} from '@/fields/blocks/cardBlocks';
import {COLLECTION_SLUG} from '@/fields/blocks/collectionBlock';
import {COMPARE_CARD_SLUG} from '@/fields/blocks/compareCardBlock';
import {FAQ_SLUG} from '@/fields/blocks/faqBlock';
import {PLAN_SLUG} from '@/fields/blocks/planBlock';
import {PRICE_SINGLE_SLUG} from '@/fields/blocks/priceSingleBlock';
import {PROCESS_STEPS_SLUG} from '@/fields/blocks/processStepsBlock';
import {TESTIMONIAL_SLUG} from '@/fields/blocks/testimonialBlock';
import {TEXT_BOX_SLUG} from '@/fields/blocks/textBoxSlug';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {MEDIA_SLUG} from '@/fields/blocks/mediaBlock';
import {MEDIA_QUOTE_SLUG} from '@/fields/blocks/mediaQuoteBlock';
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';
import {APRES, PLANS, PRICE_SINGLE, PROCESS_STEPS, TESTIMONIALS} from '../../design/_showcases/blocks.shared';
import {FAQ} from '../../design/_showcases/faq.shared';
import {LOREM_DOC} from '../../design/_showcases/textbox.shared';

/** Wider box for the blocks that need several columns (single price, FAQ, steps). */
const WIDE = new Set([PRICE_SINGLE_SLUG, FAQ_SLUG, PROCESS_STEPS_SLUG, COLLECTION_SLUG]);

const IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';
const TEXT = 'Une phrase de présentation courte, deux lignes au plus, pour situer le contenu de la carte.';

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
    title: 'Titre de la carte',
    text: TEXT,
    cta: v.clickable ? {label: 'Découvrir', href: '#'} : undefined,
  };
}

/** The block alone, in a fixed-width box on the page background; data-apercu targets the capture. */
export function Apercu({slug}: {slug: string}) {
  return (
    <OrbitaThemeProvider fixedSilo="blue" initialMode="light">
      <VStack data-apercu style={{width: WIDE.has(slug) ? 'var(--apercu-width-wide, 900px)' : 'var(--apercu-width, 360px)', padding: 'var(--spacing-6)', background: 'var(--color-background-body)'}}>
        {slug === TEXT_BOX_SLUG ? (
          <TextBox badges={[{label: 'Nouveau', tone: 'high'}]} title="Le chiffrage juste" titleTag="h2" titleSize="heading-1" content={LOREM_DOC} buttons={[{label: 'Commencer', href: '#', arrow: true}]} framed />
        ) : slug === COLLECTION_SLUG ? (
          <Collection layout="carousel" perView={3} label="Témoignages">
            {TESTIMONIALS.slice(0, 5).map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Collection>
        ) : slug === PRICE_SINGLE_SLUG ? (
          <PriceCard {...PRICE_SINGLE} />
        ) : slug === PLAN_SLUG ? (
          <PlanCard {...PLANS[1]} />
        ) : slug === FAQ_SLUG ? (
          <CollapsibleGroup type="single" defaultValue="apercu-0">
            {FAQ.slice(0, 3).map((f, i) => (
              <Collapsible key={i} value={`apercu-${i}`} question={f.q}>
                <Text type="body">{f.a}</Text>
              </Collapsible>
            ))}
          </CollapsibleGroup>
        ) : slug === TESTIMONIAL_SLUG ? (
          <TestimonialCard {...TESTIMONIALS[0]} />
        ) : slug === COMPARE_CARD_SLUG ? (
          <CompareCard {...APRES} />
        ) : slug === PROCESS_STEPS_SLUG ? (
          <ProcessSteps steps={PROCESS_STEPS.slice(0, 2)} />
        ) : slug === MEDIA_QUOTE_SLUG ? (
          <MediaQuote image={{src: IMG, alt: ''}} text="Le chiffrage juste." size="display-3" overlay={0.45} minHeight={240} sizes="360px" />
        ) : slug === MEDIA_SLUG ? (
          <Media image={{src: IMG, alt: ''}} minHeight={240} sizes="360px" />
        ) : slug === EMPTY_SLUG ? (
          // empty cell: a dashed placeholder, the height of a card
          <VStack hAlign="center" vAlign="center" style={{minHeight: 'calc(var(--spacing-12) * 6)', border: 'var(--border-width) dashed var(--color-border-emphasized)'}}>
            <Text type="label" color="secondary">Case vide</Text>
          </VStack>
        ) : (
          <Card {...demoCard(slug)} />
        )}
      </VStack>
    </OrbitaThemeProvider>
  );
}
