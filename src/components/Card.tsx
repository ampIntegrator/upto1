'use client';

/**
 * Card — la carte du site, un seul châssis et trois préréglages
 * (maquettes 12 cardBlocks / 14 mosaic, 19 blogCards, 24 portfolioCards).
 *
 *   preset="bloc"        média (image, icône, nombre ou rien) + titre centré
 *                        avec ornement + texte + barre d'action
 *   preset="article"     image 16/10, chip + date, titre (2 lignes), barre d'action
 *   preset="realisation" image 16/10, chip + résultat, titre, client · ville, barre
 *
 * Le titre est un Heading Astryx de type `card` : son style ne dépend pas du
 * niveau (h3 par défaut, h4 possible en admin). L'ornement au losange fait
 * partie du titre (preset bloc). Avec `cta`, la carte entière est cliquable et
 * son survol remplit la barre d'action ; sans `cta`, pas de barre ni de lien.
 * Nuit : poser la carte dans un <Theme mode="dark">.
 */
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import NextLink from 'next/link';
import React from 'react';

import {ArrowRightIcon, PinIcon, type NucleoIconKey} from '@/theme/icons/nucleo';
import {IconSquare} from './IconSquare';
import {Chip, type ChipTone} from './Chip';
import {Stat} from './Stat';
import styles from './Card.module.css';

export type CardMedia =
  | {type: 'image'; src: string; alt?: string}
  | {type: 'icon'; iconKey: NucleoIconKey}
  | {type: 'number'; value: string; prefix?: string; suffix?: string}
  | {type: 'none'};

export type CardProps = {
  preset?: 'bloc' | 'article' | 'realisation';
  media?: CardMedia;
  title: string;
  /** niveau HTML du titre (SEO) ; l'apparence ne change pas */
  level?: 3 | 4;
  /** bloc : titre en couleur silo (cas « titre seul ») */
  accentTitle?: boolean;
  text?: string;
  /** article / réalisation : chip de catégorie */
  chip?: {label: string; tone?: ChipTone};
  /** article : date affichée */
  date?: string;
  /** réalisation : résultat chiffré (« +34 % closing ») */
  result?: string;
  /** réalisation : client et ville */
  client?: {name: string; location?: string};
  /** barre d'action */
  cta?: {label: string; href: string};
  style?: React.CSSProperties;
};

export function Card({preset = 'bloc', media = {type: 'none'}, title, level = 3, accentTitle, text, chip, date, result, client, cta, style}: CardProps) {
  const editorial = preset !== 'bloc';

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

  // éditorial : le titre porte le lien de la carte, seulement s'il y a un appel à l'action
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
          <Heading level={level} type="card" color={accentTitle && !editorial ? 'accent' : 'primary'} className={styles.title}>
            {titleNode}
          </Heading>
          {!editorial ? (
            <div className={styles.ornament} aria-hidden="true">
              <i />
            </div>
          ) : null}
          {text ? <p className={styles.text}>{text}</p> : null}
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
      {cta ? (
        <NextLink href={cta.href} className={styles.cta} tabIndex={editorial ? -1 : undefined} aria-hidden={editorial || undefined}>
          <span>{cta.label}</span>
          <ArrowRightIcon />
        </NextLink>
      ) : null}
    </article>
  );
}

/** Icônes de contenu proposées par défaut à l'éditeur pour le média « icône ». */
