'use client';

/**
 * TextBox — the text box (« Encart texte »): in a page column of 3 to 9, top to bottom,
 * one or two badges, a title with the animated diamond separator centred under it,
 * rich text (paragraphs, bold, links, lists), one or two buttons. Options: a frame
 * (border and surface background, like the cards) or no background; content centred;
 * vertical alignment inside its row (top, centre, bottom). The title's tag (h2 to h6,
 * p or span) and size (display-1 to 3, heading-1 and 2) are independent; the two
 * display sizes need 6 columns at least (content-specs.ts). Night via the Section.
 */
import {HStack, VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import type {NucleoIconKey} from '@/theme/icons/nucleo';
import {Button} from './Button';
import {Chip, type ChipTone} from './Chip';
import {RichText, type RichTextDocument} from './RichText';
import {Title, type TitleTag} from './TitleTag';
import styles from './TextBox.module.css';

export type TextBoxTitleSize = 'display-1' | 'display-2' | 'display-3' | 'heading-1' | 'heading-2';
export type TextBoxButton = {label: string; href: string; variant?: 'primary' | 'secondary' | 'ghost' | 'high'; size?: 'md' | 'lg'; arrow?: boolean; iconKey?: NucleoIconKey};

export type TextBoxProps = {
  badges?: {label: string; tone?: ChipTone}[];
  title?: string;
  titleTag?: TitleTag;
  titleSize?: TextBoxTitleSize;
  /** Lexical document from the editor, or ready-made nodes (catalogue) */
  content?: RichTextDocument | React.ReactNode;
  buttons?: TextBoxButton[];
  framed?: boolean;
  center?: boolean;
  vAlign?: 'start' | 'center' | 'end';
};

const isDocument = (c: TextBoxProps['content']): c is RichTextDocument => Boolean(c && typeof c === 'object' && 'root' in (c as object));

export function TextBox({badges = [], title, titleTag = 'h2', titleSize = 'heading-1', content, buttons = [], framed = false, center = false, vAlign = 'start'}: TextBoxProps) {
  const align = center ? 'center' : 'start';
  return (
    <VStack className={styles.root} data-framed={framed || undefined} data-center={center || undefined} data-valign={vAlign} vAlign={vAlign}>
      <VStack gap={5} hAlign={align} className={styles.inner}>
        {badges.length ? (
          <HStack gap={2} wrap="wrap" hAlign={align}>
            {badges.slice(0, 2).map((b, i) => (
              <Chip key={i} label={b.label} tone={b.tone ?? 'high'} />
            ))}
          </HStack>
        ) : null}
        {title ? (
          <VStack gap={4} hAlign={align} className={styles.head}>
            <Title tag={titleTag} className={styles.title} data-size={titleSize}>
              {title}
            </Title>
            <VStack className={styles.ornament} aria-hidden="true">
              <i />
            </VStack>
          </VStack>
        ) : null}
        {isDocument(content) ? <RichText content={content} className={styles.prose} /> : content ? <VStack className={styles.prose}>{content}</VStack> : null}
        {buttons.length ? (
          <HStack gap={3} wrap="wrap" hAlign={align} className={styles.buttons}>
            {buttons.slice(0, 2).map((b, i) => (
              <Button key={i} label={b.label} href={b.href} variant={b.variant ?? 'primary'} size={b.size ?? 'md'} arrow={b.arrow} iconKey={b.iconKey} />
            ))}
          </HStack>
        ) : null}
      </VStack>
    </VStack>
  );
}
