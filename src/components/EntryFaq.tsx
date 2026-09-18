/**
 * EntryFaq — the FAQ under a blog post or a case study (mockup 18): a full-width night section,
 * an optional centred title (display-3, tag h2 by default), then an accordion in two columns
 * from about 900 px, one open at a time, the first one open. The questions take the heading
 * level under the title (h3 under an h2), h3 without a heading title.
 */
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {Collapsible, CollapsibleGroup, type CollapsibleTag} from './Collapsible';
import {Container} from './Container';
import {Section, type SectionBackground} from './Section';
import {SectionHeading} from './SectionHeading';
import type {TitleTag} from './title-tags';

export type FaqItem = {question: string; answer: string};

export type EntryFaqProps = {
  /** optional; a word between <span>…</span> is set in serif */
  title?: string;
  tag?: TitleTag;
  items: FaqItem[];
  background?: SectionBackground;
  /** prefix of the items' values, unique on the page */
  id?: string;
};

/** Paragraphs of an answer (blank line = new paragraph), as <p>: their colour comes from the collapsible. */
export function FaqAnswer({text}: {text: string}) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <Text key={i} as="p" type="body">
            {p}
          </Text>
        ))}
    </>
  );
}

const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/** the questions' tag: one level under a heading title, h3 otherwise */
const questionTag = (title: string | undefined, tag: TitleTag): CollapsibleTag => {
  const level = HEADINGS.indexOf(tag);
  return (title && level >= 0 ? HEADINGS[Math.min(level + 1, 5)] : 'h3') as CollapsibleTag;
};

export function EntryFaq({title, tag = 'h2', items, background = 'night', id = 'faq'}: EntryFaqProps) {
  if (!items.length) return null;
  const qTag = questionTag(title, tag);
  return (
    <Section background={background} spacing="md">
      <Container gap={10}>
        {title ? <SectionHeading title={title} tag={tag} size="display-3" /> : null}
        <CollapsibleGroup type="single" columns={2} defaultValue={`${id}-0`}>
          {items.map((q, i) => (
            <Collapsible key={i} value={`${id}-${i}`} question={q.question} tag={qTag}>
              <FaqAnswer text={q.answer} />
            </Collapsible>
          ))}
        </CollapsibleGroup>
      </Container>
    </Section>
  );
}
