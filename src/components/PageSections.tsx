/**
 * PageSections — the sections of a page, stacked under the page header.
 * Each section: Section (background, paddings) > Container > a single 12-column Grid for
 * all its rows (page-grid class) > one GridSpan per column, at its width and on the line
 * of its row > stacked contents. A single grid, so the mobile order can mix the
 * columns of several rows: below 768 px, all the section's columns stack
 * in --mobile-order order and empty columns disappear (styles.css). Gaps:
 * variables --section-gap-x, --section-gap-y and --section-gap-y-mobile, in pixels (section
 * setting, otherwise Site settings › Layout), read by .section-grid (styles.css).
 * A column containing an image stretches to its row's height (the image fills it).
 */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import {submitForm} from '@/app/(frontend)/actions/submitForm';
import type {FormData} from '@/lib/forms';
import type {ContentData, FaqData, SectionData} from '@/lib/sections';
import {ButtonGroup} from './ButtonGroup';
import {Card} from './Card';
import {Collapsible, CollapsibleGroup} from './Collapsible';
import {Collection} from './Collection';
import {CompareCard} from './CompareCard';
import {Container} from './Container';
import {FaqAnswer} from './EntryFaq';
import {Media} from './Media';
import {MediaQuote} from './MediaQuote';
import {PlanCard} from './PlanCard';
import {PriceCard} from './PriceCard';
import {ProcessSteps} from './ProcessSteps';
import {RichText} from './RichText';
import {Section} from './Section';
import {type FormField, SiteForm} from './SiteForm';
import {renderProseBlock} from './ProseBlock';
import {SectionHeading} from './SectionHeading';
import {TestimonialCard} from './TestimonialCard';
import {Tabs} from './Tabs';
import {TextBox} from './TextBox';

/** A FAQ: one group, values indexed, the first question open when asked, questions in the chosen tag. */
function Faq({faq, id}: {faq: FaqData; id: string}) {
  const first = `${id}-0`;
  return (
    <CollapsibleGroup type={faq.mode} columns={faq.columns} defaultValue={faq.firstOpen ? (faq.mode === 'multiple' ? [first] : first) : undefined}>
      {faq.items.map((q, i) => (
        <Collapsible key={i} value={`${id}-${i}`} question={q.question} tag={faq.tag}>
          <FaqAnswer text={q.answer} />
        </Collapsible>
      ))}
    </CollapsibleGroup>
  );
}

/** A form block: its rich texts rendered here, the submission through the server action. */
function Form({form}: {form: FormData}) {
  const steps = form.steps.map((s) => ({
    title: s.title,
    fields: s.fields.map((f): FormField => (f.type === 'message' ? {type: 'message', name: f.name, width: f.width, content: <RichText content={f.content} />} : f)),
  }));
  const confirmation = form.confirmation.type === 'redirect' ? form.confirmation : {type: 'message' as const, content: <RichText content={form.confirmation.content} />};
  return <SiteForm id={form.id} formId={form.formId} eyebrow={form.eyebrow} eyebrowStyle={form.eyebrowStyle} title={form.title} tag={form.tag} intro={form.intro} framed={form.framed} steps={steps} submitLabel={form.submitLabel} confirmation={confirmation} submitAction={submitForm} />;
}

function Content({content, id}: {content: ContentData; id: string}) {
  switch (content.type) {
    case 'textBox':
      return <TextBox {...content.textBox} />;
    case 'sectionHeading':
      return <SectionHeading {...content.heading} />;
    case 'figure':
      return renderProseBlock({type: 'block', fields: content.fields});
    case 'tabs':
      return <Tabs items={content.items} />;
    case 'buttonGroup':
      return <ButtonGroup {...content.buttonGroup} />;
    case 'collection':
      return (
        <Collection layout={content.collection.layout} perView={content.collection.perView} step={content.collection.step} arrows={content.collection.arrows} indicator={content.collection.indicator} more={content.collection.more}>
          {content.collection.items.map((item, k) => (
            <Content key={k} content={item} id={`${id}-${k}`} />
          ))}
        </Collection>
      );
    case 'priceSingle':
      return <PriceCard {...content.price} />;
    case 'plan':
      return <PlanCard {...content.plan} />;
    case 'faq':
      return <Faq faq={content.faq} id={id} />;
    case 'testimonial':
      return <TestimonialCard {...content.testimonial} />;
    case 'compareCard':
      return <CompareCard {...content.compareCard} />;
    case 'processSteps':
      return <ProcessSteps steps={content.steps} tag={content.tag} />;
    case 'card':
      return <Card {...content.card} />;
    case 'media':
      return <Media {...content.media} />;
    case 'mediaQuote':
      return <MediaQuote {...content.mediaQuote} />;
    case 'form':
      return <Form form={content.form} />;
    default:
      return null;
  }
}

export function PageSections({sections}: {sections: SectionData[]}) {
  return (
    <>
      {sections.map((s) => (
        <Section key={s.key} id={s.id} edgeTop={s.edgeTop} background={s.background} tint={s.tint} image={s.image} video={s.video} overlay={s.overlay} spacingTop={s.spacingTop} spacingBottom={s.spacingBottom}>
          <Container>
            <Grid
              columns={12}
              className="page-grid section-grid"
              align="start"
              style={{'--section-gap-x': `${s.gaps.gapX}px`, '--section-gap-y': `${s.gaps.gapY}px`, '--section-gap-y-mobile': `${s.gaps.gapYMobile}px`} as React.CSSProperties}>
              {s.rows.flatMap((columns, r) =>
                columns.map((c, i) => (
                  <GridSpan
                    key={`${r}-${i}`}
                    columns={c.span}
                    data-empty={c.empty ? 'true' : undefined}
                    style={{gridRow: r + 1, ...(c.stretch ? {alignSelf: 'stretch'} : null), ...(c.mobileRank !== undefined ? {'--mobile-order': c.mobileRank} : null)} as React.CSSProperties}>
                    {c.contents.length ? (
                      <VStack gap={6} style={c.stretch ? {height: '100%'} : undefined}>
                        {c.contents.map((content, j) => (
                          <Content key={j} content={content} id={`${s.key}-${r}-${i}-${j}`} />
                        ))}
                      </VStack>
                    ) : null}
                  </GridSpan>
                )),
              )}
            </Grid>
          </Container>
        </Section>
      ))}
    </>
  );
}
