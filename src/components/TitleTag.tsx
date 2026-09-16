/**
 * Title — a title whose HTML element is chosen (h1 to h6, p or span) without
 * changing its look. The look comes from an Astryx heading `type` (display-1…3,
 * card, or another type declared in the theme) and from the caller's class, never
 * from the heading level: a heading renders the Astryx Heading with that type, a
 * p or span renders the same element with the theme's heading classes.
 * Used by every component whose title tag is set in the admin (Card, ProcessSteps,
 * PlanCard, Callout, SectionHeading); `TITLE_TAGS` feeds the shared Payload field.
 */
import {Heading} from '@astryxdesign/core/Heading';
import React from 'react';

import styles from './TitleTag.module.css';

export const TITLE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;
export type TitleTag = (typeof TITLE_TAGS)[number];
/** The tags offered in the admin: never h1 (the page title). */
export const CONTENT_TITLE_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;
export type ContentTitleTag = (typeof CONTENT_TITLE_TAGS)[number];

type HeadingProps = React.ComponentProps<typeof Heading>;

export type TitleProps = {
  tag?: TitleTag;
  /** Astryx heading type (theme): sets the look whatever the tag */
  type?: HeadingProps['type'];
  color?: HeadingProps['color'];
  className?: string;
  id?: string;
  children: React.ReactNode;
} & Pick<React.HTMLAttributes<HTMLElement>, 'style'>;

const LEVELS: Record<string, 1 | 2 | 3 | 4 | 5 | 6> = {h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6};

/** Any stored value → a title tag (fallback given by the component). */
export const toTitleTag = (v: unknown, fallback: TitleTag): TitleTag => ((TITLE_TAGS as readonly string[]).includes(String(v)) ? (v as TitleTag) : fallback);

export function Title({tag = 'h3', type, color, className, id, style, children}: TitleProps) {
  const level = LEVELS[tag];
  if (level) {
    return (
      <Heading level={level} type={type} color={color} className={className} id={id} style={style}>
        {children}
      </Heading>
    );
  }
  // p or span: the theme's heading classes (base + type + colour), no level class
  const classes = ['astryx-heading', type, color, styles.plain, className].filter(Boolean).join(' ');
  return React.createElement(tag, {className: classes, id, style}, children);
}
