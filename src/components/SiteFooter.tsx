'use client';

/**
 * SiteFooter — le pied de page du site (maquette 21-footer), identique partout.
 *
 * Assemblage des composants Astryx (Theme dark, Grid, Stack, Text, Heading,
 * Link, Divider) et du design system (Container, Field, Button, Card « brief »,
 * BackToTop). Quatre niveaux sur nuit profonde :
 *   1. lettre d'information (bandeau clair) ;
 *   2. derniers articles en bref (bandeau plus discret) ;
 *   3. marque + coordonnées + réseaux, puis piles de liens ;
 *   4. barre basse (copyright, ligne légale, liens).
 * Les données : SiteFooterData (global « Pied de page ») + SiteStrip
 * (global « Coordonnées et réseaux », le même que l'en-tête).
 */
import {Divider} from '@astryxdesign/core/Divider';
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {Link} from '@astryxdesign/core/Link';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React, {useState} from 'react';

import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import {ArrowRightIcon, MailIcon, NUCLEO_ICONS, PhoneIcon, PinIcon, ShieldIcon} from '@/theme/icons/nucleo';
import {BackToTop} from './BackToTop';
import {Button} from './Button';
import {Card} from './Card';
import {Container} from './Container';
import {Field} from './Field';
import type {SiteFooterData, SiteStrip} from './site-nav';
import styles from './SiteFooter.module.css';

export type SiteFooterProps = SiteFooterData & {
  strip?: SiteStrip;
  /** bouton fixe « haut de page » (défaut : oui) */
  backToTop?: boolean;
  onSubscribe?: (email: string) => void;
};

function Newsletter({newsletter, onSubscribe}: {newsletter: NonNullable<SiteFooterData['newsletter']>; onSubscribe?: (email: string) => void}) {
  const [email, setEmail] = useState('');
  return (
    <VStack className={styles.band} data-band="top">
      <Container>
        <Grid columns={12} gap={8} className="page-grid" align="center">
          <GridSpan columns={6}>
            <VStack gap={2}>
              <Text type="eyebrow" className={styles.eyebrow}>{newsletter.eyebrow}</Text>
              <Heading level={2} className={styles.newsTitle}>
                {newsletter.title.before}{' '}
                {newsletter.title.accent ? <Text type="serif" className={styles.newsAccent}>{newsletter.title.accent}</Text> : null}
              </Heading>
              {newsletter.text ? <Text type="body" color="secondary" className={styles.newsText}>{newsletter.text}</Text> : null}
            </VStack>
          </GridSpan>
          <GridSpan columns={6}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                onSubscribe?.(email);
              }}>
              <HStack gap={3} align="stretch" wrap="wrap" className={styles.formRow}>
                <Field label={newsletter.fieldLabel} type="email" iconKey="mail" value={email} onChange={setEmail} style={{flex: '1 1 260px'}} />
                <Button type="submit" variant="primary" size="lg" arrow label={newsletter.buttonLabel} className={styles.submit} />
              </HStack>
              {newsletter.mention ? (
                <HStack gap={2} vAlign="center" className={styles.mention}>
                  <ShieldIcon width={14} height={14} />
                  <span>{newsletter.mention}</span>
                </HStack>
              ) : null}
            </form>
          </GridSpan>
        </Grid>
      </Container>
    </VStack>
  );
}

function Articles({articles}: {articles: NonNullable<SiteFooterData['articles']>}) {
  return (
    <VStack className={styles.band} data-band="articles">
      <Container gap={4}>
        <HStack hAlign="between" vAlign="center" gap={6}>
          <Text type="eyebrow" className={styles.eyebrow}>{articles.eyebrow}</Text>
          <Link href={articles.allHref} color="secondary" weight="semibold" isStandalone className={styles.allLink}>
            {articles.allLabel}
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </HStack>
        <Grid columns={12} gap={0} className={`page-grid ${styles.articles}`}>
          {articles.items.slice(0, 4).map((a) => (
            <GridSpan key={a.href + a.title} columns={3} className={styles.article}>
              <Card preset="brief" chip={{label: a.category, tone: 'high'}} title={a.title} date={a.date} cta={{label: a.title, href: a.href}} />
            </GridSpan>
          ))}
        </Grid>
      </Container>
    </VStack>
  );
}

function Brand({brand, strip}: {brand: SiteFooterData['brand']; strip?: SiteStrip}) {
  return (
    <VStack gap={4} align="start">
      <a href={brand.href} className={styles.brand}>
        <i className={styles.logoMark} aria-hidden="true" />
        <span className={styles.brandName}>{brand.name}</span>
      </a>
      {brand.description ? <Text type="body" color="secondary" className={styles.brandText}>{brand.description}</Text> : null}
      {strip?.phone || strip?.email || strip?.address ? (
        <VStack gap={2} align="start">
          {strip.phone ? <a className={styles.contact} href={strip.phone.href}><PhoneIcon width={16} height={16} />{strip.phone.label}</a> : null}
          {strip.email ? <a className={styles.contact} href={strip.email.href}><MailIcon width={16} height={16} />{strip.email.label}</a> : null}
          {strip.address ? <span className={styles.contact}><PinIcon width={16} height={16} />{strip.address}</span> : null}
        </VStack>
      ) : null}
      {strip?.socials?.length ? (
        <HStack gap={2}>
          {strip.socials.map((s) => {
            const Glyph = NUCLEO_ICONS[s.iconKey];
            return (
              <a key={s.label} className={styles.social} href={s.href} aria-label={s.label}>
                <Glyph width={16} height={16} />
              </a>
            );
          })}
        </HStack>
      ) : null}
    </VStack>
  );
}

export function SiteFooter({brand, strip, newsletter, articles, columns, legal, backToTop = true, onSubscribe}: SiteFooterProps) {
  const {theme} = useOrbitaTheme();
  return (
    <Theme theme={theme} mode="dark">
      <VStack as="footer" className={styles.footer}>
        <i className={styles.rule} aria-hidden="true" />
        {newsletter ? <Newsletter newsletter={newsletter} onSubscribe={onSubscribe} /> : null}
        {articles?.items.length ? (
          <>
            <Divider />
            <Articles articles={articles} />
          </>
        ) : null}
        <Divider />
        <VStack className={styles.cols}>
          <Container>
            <Grid columns={12} gap={10} className={`page-grid ${styles.colsGrid}`} align="start">
              <GridSpan columns={3}>
                <Brand brand={brand} strip={strip} />
              </GridSpan>
              {columns.map((col) => (
                <GridSpan key={col.title} columns={3}>
                  <VStack as="nav" gap={4} aria-label={col.title}>
                    <Heading level={3} className={styles.colHead}>{col.title}</Heading>
                    <VStack as="ul" gap={3} className={styles.pile}>
                      {col.links.map((l) => (
                        <li key={l.href + l.label}>
                          <Link href={l.href} color="secondary" isStandalone className={styles.pileLink}>
                            <ArrowRightIcon width={14} height={14} />
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </VStack>
                  </VStack>
                </GridSpan>
              ))}
            </Grid>
          </Container>
        </VStack>
        <VStack className={styles.bottom}>
          <Container>
            <HStack hAlign="between" vAlign="center" gap={4} wrap="wrap" className={styles.bottomRow}>
              <HStack gap={5} vAlign="center" wrap="wrap">
                <span className={styles.copyright}>{legal.copyright}</span>
                {legal.line ? (
                  <>
                    <i className={styles.sep} aria-hidden="true" />
                    <Text type="tag" className={styles.legalLine}>{legal.line}</Text>
                  </>
                ) : null}
              </HStack>
              <HStack gap={6} vAlign="center" wrap="wrap">
                {legal.links.map((l) => (
                  <Link key={l.href + l.label} href={l.href} color="secondary" isStandalone className={styles.legalLink}>{l.label}</Link>
                ))}
              </HStack>
            </HStack>
          </Container>
        </VStack>
        {backToTop ? <BackToTop /> : null}
      </VStack>
    </Theme>
  );
}
