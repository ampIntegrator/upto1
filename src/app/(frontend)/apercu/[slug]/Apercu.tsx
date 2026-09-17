'use client';

import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {ButtonGroup} from '@/components/ButtonGroup';
import {Card, type CardProps} from '@/components/Card';
import {SectionHeading} from '@/components/SectionHeading';
import {GALLERY, renderDemoBlock} from '../../design/_showcases/post.shared';
import {CTA_BAND_SLUG, GALLERY_SLUG, KEY_POINTS_SLUG, QUOTE_CARD_SLUG, STATS_BAND_SLUG} from '@/fields/blocks/prose/slugs';
import {Collapsible, CollapsibleGroup} from '@/components/Collapsible';
import {Collection} from '@/components/Collection';
import {CompareCard} from '@/components/CompareCard';
import {Media} from '@/components/Media';
import {MediaQuote} from '@/components/MediaQuote';
import {PlanCard} from '@/components/PlanCard';
import {PriceCard} from '@/components/PriceCard';
import {ProcessSteps} from '@/components/ProcessSteps';
import {TestimonialCard} from '@/components/TestimonialCard';
import {Tabs} from '@/components/Tabs';
import {TextBox} from '@/components/TextBox';
import {BUTTON_GROUP_SLUG} from '@/fields/blocks/buttonGroupBlock';
import {CARD_VARIANTS} from '@/fields/blocks/cardBlocks';
import {CASE_CARD_SLUG} from '@/fields/blocks/caseCardBlock';
import {POST_CARD_SLUG} from '@/fields/blocks/postCardBlock';
import {SECTION_HEADING_SLUG} from '@/fields/blocks/sectionHeadingBlock';
import {COLLECTION_SLUG} from '@/fields/blocks/collectionBlock';
import {COMPARE_CARD_SLUG} from '@/fields/blocks/compareCardBlock';
import {FAQ_SLUG} from '@/fields/blocks/faqBlock';
import {PLAN_SLUG} from '@/fields/blocks/planBlock';
import {PRICE_SINGLE_SLUG} from '@/fields/blocks/priceSingleBlock';
import {PROCESS_STEPS_SLUG} from '@/fields/blocks/processStepsBlock';
import {TESTIMONIAL_SLUG} from '@/fields/blocks/testimonialBlock';
import {TABS_SLUG} from '@/fields/blocks/tabsSlug';
import {TEXT_BOX_SLUG} from '@/fields/blocks/textBoxSlug';
import {EMPTY_SLUG} from '@/fields/sections/emptyBlock';
import {MEDIA_SLUG} from '@/fields/blocks/mediaBlock';
import {MEDIA_QUOTE_SLUG} from '@/fields/blocks/mediaQuoteBlock';
import {OrbitaThemeProvider} from '@/theme/OrbitaThemeProvider';
import {APRES, PLANS, PRICE_SINGLE, PROCESS_STEPS, TESTIMONIALS} from '../../design/_showcases/blocks.shared';
import {FAQ} from '../../design/_showcases/faq.shared';
import {LOREM_DOC} from '../../design/_showcases/textbox.shared';

/** Wider box for the blocks that need several columns (single price, FAQ, steps). */
/** the demo post's figures, as they appear in a post */
const FIGURE_DEMOS: Record<string, Record<string, unknown>> = {
  [KEY_POINTS_SLUG]: {blockType: 'keyPoints'},
  [CTA_BAND_SLUG]: {blockType: 'ctaBand', variant: 'icon', iconKey: 'calculator', title: 'Estimez votre gain de temps', text: 'Quelques chiffres suffisent pour projeter l’impact.', button: {label: 'Lancer le calcul', href: '#', variant: 'high', arrow: true}},
  [STATS_BAND_SLUG]: {blockType: 'statsBand', items: [{value: '−68 %', label: 'Temps de chiffrage'}, {value: '×2,4', label: 'Devis envoyés'}, {value: '+31 %', label: 'Signature'}]},
  [QUOTE_CARD_SLUG]: {blockType: 'quoteCard', quote: '« En six semaines, on a transformé notre point faible en avantage commercial. »', name: 'Julien Vasseur', role: 'Gérant · Vasseur Construction', photo: {src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80'}},
  [GALLERY_SLUG]: {blockType: 'gallery', caption: 'Chantier Vasseur, Nantes.', images: GALLERY},
};

const WIDE = new Set([CTA_BAND_SLUG, STATS_BAND_SLUG, GALLERY_SLUG, KEY_POINTS_SLUG, QUOTE_CARD_SLUG, SECTION_HEADING_SLUG, PRICE_SINGLE_SLUG, FAQ_SLUG, PROCESS_STEPS_SLUG, COLLECTION_SLUG, TABS_SLUG, BUTTON_GROUP_SLUG]);

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
        {FIGURE_DEMOS[slug] ? (
          renderDemoBlock({type: 'block', fields: FIGURE_DEMOS[slug]})
        ) : slug === SECTION_HEADING_SLUG ? (
          <SectionHeading eyebrow="Le blog" title="Pour continuer <span>sur le sujet.</span>" size="display-3" text="Chiffrage, chantier, métier : ce que nous apprenons avec nos clients." />
        ) : slug === POST_CARD_SLUG ? (
          <Card preset="article" media={{type: 'image', src: IMG, alt: ''}} chip={{label: 'Chiffrage'}} date="12 septembre 2026" title="Du devis à la facturation : industrialiser le cycle commercial" cta={{label: 'Lire l’article', href: '#'}} />
        ) : slug === CASE_CARD_SLUG ? (
          <Card preset="realisation" media={{type: 'image', src: IMG, alt: ''}} chip={{label: 'Rénovation', tone: 'high'}} result="−68 % délai" title="Vasseur Construction : le chiffrage divisé par trois" client={{name: 'Vasseur Construction', location: 'Nantes (44)'}} cta={{label: 'Voir l’étude', href: '#'}} />
        ) : slug === BUTTON_GROUP_SLUG ? (
          <VStack gap={6}>
            <ButtonGroup mode="attached" label="Profils" buttons={[{label: 'Particuliers', href: '#', variant: 'secondary', iconKey: 'home'}, {label: 'Professionnels', href: '#', variant: 'secondary', iconKey: 'calculator'}, {label: 'Collectivités', href: '#', variant: 'secondary', iconKey: 'building'}]} />
            <ButtonGroup mode="spaced" width="full" buttons={[{label: 'Demander une démo', href: '#', variant: 'primary', arrow: true}, {label: 'Voir les tarifs', href: '#', variant: 'high', arrow: true}]} />
          </VStack>
        ) : slug === TABS_SLUG ? (
          <Tabs items={['Le standard se perd en route', 'Le reporting est introuvable', 'Les pannes deviennent des incidents'].map((label) => ({label, content: LOREM_DOC}))} label="Situations" />
        ) : slug === TEXT_BOX_SLUG ? (
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
