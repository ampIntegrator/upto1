'use client';

/**
 * Card — the site card, a single chassis and three presets
 * (mockups 12 cardBlocks / 14 mosaic, 19 blogCards, 24 portfolioCards).
 *
 *   preset="bloc"        media (image, icon, number or none) + centered title
 *                        with ornament + text + action bar
 *   preset="article"     16/10 image, chip + date, title (2 lines), action bar
 *   preset="realisation" 16/10 image, chip + result, title, client · city, bar
 *   preset="brief"       no image or frame: chip, title (2 lines), date — the brief
 *                        article in the footer (mockup 21)
 *
 * The title is a heading of type `card` (Title): its style does not depend on the
 * tag chosen in the admin (h2 to h6, p or span; h3 by default). The diamond ornament is
 * part of the title (bloc preset). With `cta`, the whole card is clickable and
 * hovering it fills the action bar; without `cta`, no bar and no link.
 * Night: place the card inside a <Theme mode="dark">.
 */
import {Text} from '@astryxdesign/core/Text';
import NextLink from 'next/link';
import React from 'react';

import {ArrowRightIcon, PinIcon, type NucleoIconKey} from '@/theme/icons/nucleo';
import {IconSquare} from './IconSquare';
import {Chip, type ChipTone} from './Chip';
import {Stat} from './Stat';
import {Title, type TitleTag} from './TitleTag';
import styles from './Card.module.css';

export type CardMedia =
  | {type: 'image'; src: string; alt?: string}
  | {type: 'icon'; iconKey: NucleoIconKey}
  | {type: 'number'; value: string; prefix?: string; suffix?: string}
  | {type: 'none'};

export type CardProps = {
  preset?: 'bloc' | 'article' | 'realisation' | 'brief';
  media?: CardMedia;
  title: string;
  /** HTML element of the title (SEO); appearance does not change */
  tag?: TitleTag;
  /** @deprecated use `tag` */
  level?: 3 | 4;
  /** bloc: title in silo color (« titre seul » case) */
  accentTitle?: boolean;
  text?: string;
  /** article / realisation: category chip */
  chip?: {label: string; tone?: ChipTone};
  /** article: displayed date */
  date?: string;
  /** realisation: numeric result (« +34 % closing ») */
  result?: string;
  /** realisation: client and city */
  client?: {name: string; location?: string};
  /** action bar */
  cta?: {label: string; href: string};
  style?: React.CSSProperties;
};

export function Card({preset = 'bloc', media = {type: 'none'}, title, tag, level, accentTitle, text, chip, date, result, client, cta, style}: CardProps) {
  const editorial = preset !== 'bloc';
  // brief: the link goes through the title only, no action bar
  const showBar = Boolean(cta) && preset !== 'brief';

  const mediaNode = (() => {
    switch (media.type) {
      case 'image':
        return editorial ? (
          <div className={styles.postImg}>
            <img src={media.src} alt={media.alt ?? ''} loading="lazy" />
          </div>
        ) : (
          <div className={styles.img} role={media.alt ? 'img' : undefined} aria-label={media.alt} style={{backgroundImage: `url("${media.src}")`}} />
        );
      case 'icon':
        return <div className={styles.iconMedia}><IconSquare iconKey={media.iconKey} size={64} iconSize={28} /></div>;
      case 'number':
        return (
          <div className={styles.numberMedia}>
            <Stat value={media.value} prefix={media.prefix} suffix={media.suffix} size="card" align="center" />
          </div>
        );
      default:
        return null;
    }
  })();

  // editorial: the title carries the card link, only when there is a call to action
  const titleNode = editorial && cta ? (
    <NextLink href={cta.href} className={styles.titleLink}>
      {title}
    </NextLink>
  ) : (
    title
  );

  return (
    <article className={styles.card} data-preset={preset} data-link={cta ? 'true' : undefined} style={style}>
      <div className={styles.body}>
        {media.type === 'image' ? mediaNode : null}
        <div className={styles.inner}>
          {media.type !== 'image' ? mediaNode : null}
          {editorial && (chip || date || result) ? (
            <div className={styles.meta}>
              {chip ? <Chip label={chip.label} tone={chip.tone ?? 'high'} /> : <span />}
              {preset === 'article' && date ? <Text type="date">{date}</Text> : null}
              {preset === 'realisation' && result ? <Text type="result">{result}</Text> : null}
            </div>
          ) : null}
          <Title tag={tag ?? (level === 4 ? 'h4' : 'h3')} type="card" color={accentTitle && !editorial ? 'accent' : 'primary'} className={styles.title}>
            {titleNode}
          </Title>
          {!editorial ? (
            <div className={styles.ornament} aria-hidden="true">
              <i />
            </div>
          ) : null}
          {text ? <p className={styles.text}>{text}</p> : null}
          {preset === 'brief' && date ? <Text type="date" className={styles.briefDate}>{date}</Text> : null}
          {preset === 'realisation' && client ? (
            <div className={styles.client}>
              <PinIcon />
              <span>
                {client.name}
                {client.location ? ` · ${client.location}` : ''}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      {cta && showBar ? (
        <NextLink href={cta.href} className={styles.cta} tabIndex={editorial ? -1 : undefined} aria-hidden={editorial || undefined}>
          <span>{cta.label}</span>
          <ArrowRightIcon />
        </NextLink>
      ) : null}
    </article>
  );
}

/** Content icons offered by default to the editor for the « icône » media. */
