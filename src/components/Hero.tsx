'use client';

/**
 * Hero — le haut de page, en trois dispositions qui couvrent les cinq maquettes :
 *
 *   variant="media"  plein écran sur image ou vidéo (maquette 16) : chip translucide,
 *                    titre sur trois lignes (accent serif or au milieu), chapô, deux
 *                    boutons, invitation à défiler.
 *   variant="split"  plein écran clair, texte à gauche sur 7 colonnes et image à droite
 *                    sur 5 (maquette 02) : chip live, titre sur trois lignes (accent
 *                    serif silo), paragraphe, deux boutons, ligne de réassurance,
 *                    image avec deux étiquettes qui débordent des coins.
 *   variant="page"   haut de page de 500 px (maquette 25) : eyebrow à tirets, titre sur
 *                    deux lignes, chapô, deux boutons ; fond image (A), clair à lueur (B)
 *                    ou nuit à halos (C) ; fil d'Ariane en bande dessous.
 *
 * Assemblage : Section (fond, hauteur, réserve de l'en-tête) > Container > Grid 12 >
 * Heading, Text, Chip, Button, BreadcrumbBand. Les données sont celles du futur bloc
 * Payload « Haut de page » (une variante + champs communs).
 */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

import {CheckIcon, ChevronDownIcon, type NucleoIconKey} from '@/theme/icons/nucleo';
import {BreadcrumbBand, type BreadcrumbBandProps} from './BreadcrumbBand';
import {Button} from './Button';
import {Chip} from './Chip';
import {Container} from './Container';
import {Section, type SectionBackground} from './Section';
import styles from './Hero.module.css';

export type HeroAction = {label: string; href: string; iconKey?: NucleoIconKey};

export type HeroProps = {
  variant: 'media' | 'split' | 'page';
  /** media : image | video · split : light (fixe) · page : image | glow | night-halo */
  background?: SectionBackground;
  image?: {src: string; alt?: string};
  video?: {src: string; poster?: string};
  /** calque noir sur le média (0–1) */
  overlay?: number;
  /** petit texte au-dessus du titre : chip (media, split) ou tirets (page) */
  eyebrow?: string;
  /** titre : avant / accent serif (sur sa ligne) / après */
  title: {before?: string; accent?: string; after?: string};
  lead?: string;
  primary?: HeroAction;
  secondary?: HeroAction;
  /** split : ligne de réassurance sous les boutons */
  reassurance?: string[];
  /** split : image de droite et ses étiquettes */
  media?: {src: string; alt?: string; badges?: Array<{label: string; tone: 'night' | 'accent'}>};
  /** media : libellé de l'invitation à défiler (rien = pas d'invitation) */
  scrollHint?: string;
  /** page : fil d'Ariane sous le haut de page */
  breadcrumb?: BreadcrumbBandProps;
  /** premier bloc sous l'en-tête fixe : réserve sa hauteur (défaut : oui) */
  underHeader?: boolean;
};

function Title({title, level = 1, type}: {title: HeroProps['title']; level?: 1 | 2; type: 'display-1' | 'display-3'}) {
  return (
    <Heading level={level} type={type} className={styles.title}>
      {title.before}
      {title.accent ? <Text type="serif" className={styles.accent}>{title.accent}</Text> : null}
      {title.after}
    </Heading>
  );
}

function Actions({primary, secondary, center}: {primary?: HeroAction; secondary?: HeroAction; center?: boolean}) {
  if (!primary && !secondary) return null;
  return (
    <HStack gap={3} wrap="wrap" hAlign={center ? 'center' : 'start'}>
      {primary ? <Button variant="primary" size="lg" arrow label={primary.label} href={primary.href} /> : null}
      {secondary ? <Button variant="ghost" size="lg" label={secondary.label} href={secondary.href} iconKey={secondary.iconKey} /> : null}
    </HStack>
  );
}

export function Hero(props: HeroProps) {
  const {variant, image, video, overlay = 0.3, eyebrow, title, lead, primary, secondary, reassurance, media, scrollHint, breadcrumb, underHeader = true} = props;

  if (variant === 'media') {
    const background = props.background === 'video' ? 'video' : 'image';
    return (
      <Section
        background={background}
        image={image}
        video={video}
        overlay={overlay}
        spacing="lg"
        minHeight="100vh"
        foot={
          scrollHint ? (
            <a href="#contenu" className={styles.scrollHint}>
              <Text type="tag" className={styles.scrollLabel}>{scrollHint}</Text>
              <ChevronDownIcon width={16} height={16} />
            </a>
          ) : null
        }>
        <Container>
          <Grid columns={12} gap={6} className="page-grid">
            <GridSpan style={{gridColumn: '3 / span 8'}}>
              <VStack gap={5} align="center" className={styles.center} style={{'--serif-color': 'var(--color-editorial)'} as React.CSSProperties}>
                {eyebrow ? <Chip label={eyebrow} tone="live-dark" /> : null}
                <Title title={title} type="display-3" />
                {lead ? <Text type="large" color="secondary" className={styles.lead}>{lead}</Text> : null}
                <Actions primary={primary} secondary={secondary} center />
              </VStack>
            </GridSpan>
          </Grid>
        </Container>
      </Section>
    );
  }

  if (variant === 'split') {
    return (
      <Section background="light" spacing="md" minHeight="100vh" underHeader={underHeader} centered>
        <Container>
          <Grid columns={12} gap={8} className="page-grid" align="center">
            <GridSpan columns={7}>
              <VStack gap={6} align="start">
                {eyebrow ? <Chip label={eyebrow} tone="live" /> : null}
                <Title title={title} type="display-1" />
                {lead ? <Text type="large" color="secondary" className={styles.paragraph}>{lead}</Text> : null}
                <Actions primary={primary} secondary={secondary} />
                {reassurance?.length ? (
                  <HStack gap={6} wrap="wrap" className={styles.reassurance}>
                    {reassurance.map((r) => (
                      <HStack key={r} gap={1.5} vAlign="center">
                        <CheckIcon width={14} height={14} className={styles.check} />
                        <Text size="sm" color="secondary">{r}</Text>
                      </HStack>
                    ))}
                  </HStack>
                ) : null}
              </VStack>
            </GridSpan>
            <GridSpan columns={5}>
              {media ? (
                <VStack className={styles.mediaBox}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- source distante libre (next/image viendra avec Payload) */}
                  <img className={styles.mediaImg} src={media.src} alt={media.alt ?? ''} />
                  {media.badges?.map((b, i) => (
                    <Text key={b.label} type="tag" className={styles.mediaBadge} data-tone={b.tone} data-corner={i === 0 ? 'top-right' : 'bottom-left'}>
                      {b.label}
                    </Text>
                  ))}
                </VStack>
              ) : null}
            </GridSpan>
          </Grid>
        </Container>
      </Section>
    );
  }

  // variant === 'page'
  const background = props.background === 'image' || props.background === 'night-halo' ? props.background : 'glow';
  return (
    <>
      <Section background={background} image={image} overlay={overlay} spacing="none" minHeight={underHeader ? 'calc(500px + var(--site-header-height))' : 500} underHeader={underHeader} centered edge>
        <Container>
          <Grid columns={12} gap={6} className="page-grid">
            <GridSpan style={{gridColumn: '3 / span 8'}}>
              <VStack gap={5} align="center" className={`${styles.center} ${styles.pageInner}`}>
                {eyebrow ? <Text type="eyebrow-lines">{eyebrow}</Text> : null}
                <Title title={title} type="display-3" />
                {lead ? <Text type="large" color="secondary" className={styles.lead}>{lead}</Text> : null}
                <Actions primary={primary} secondary={secondary} center />
              </VStack>
            </GridSpan>
          </Grid>
        </Container>
      </Section>
      {breadcrumb ? <BreadcrumbBand {...breadcrumb} /> : null}
    </>
  );
}
