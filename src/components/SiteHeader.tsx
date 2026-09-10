'use client';

/**
 * SiteHeader — l'en-tête du site (maquette 01-header, 16-heroFullscreen).
 *
 * Assemblage des composants Astryx : TopNav (+ TopNavHeading, TopNavItem,
 * TopNavMenu, TopNavMegaMenu, TopNavMegaMenuItem, TopNavMegaMenuFeaturedCard),
 * IconButton, DropdownMenu, Divider, Button, MobileNav + SideNav. Ce composant
 * n'ajoute que ce qu'Astryx n'a pas :
 *   - le bandeau utilitaire (coordonnées, horaires, réseaux) ;
 *   - le repli au défilement (bandeau qui disparaît, barre plus basse, fond papier + ombre) ;
 *   - la tonalité : `tone="dark"` quand l'en-tête est posé sur un hero média ou nuit
 *     (fond translucide sombre, textes blancs), jusqu'au premier défilement ;
 *   - la navigation mobile (burger + tiroir MobileNav) sous 1280 px.
 * Les données (SiteHeaderData) sont celles que le back-office remplira.
 */
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';
import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';
import {IconButton} from '@astryxdesign/core/IconButton';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TopNav, TopNavHeading, TopNavItem, TopNavMegaMenu, TopNavMegaMenuFeaturedCard, TopNavMegaMenuItem, TopNavMenu} from '@astryxdesign/core/TopNav';
import React, {useEffect, useState} from 'react';

import {ClockIcon, MailIcon, MenuIcon, NUCLEO_ICONS, PhoneIcon, SearchIcon} from '@/theme/icons/nucleo';
import {Container} from './Container';
import type {SiteHeaderData, SiteNavEntry, SiteNavLeaf} from './site-nav';
import styles from './SiteHeader.module.css';


export type SiteHeaderProps = SiteHeaderData & {
  /** sombre : posé sur un hero média ou nuit (textes blancs jusqu'au défilement) */
  tone?: 'light' | 'dark';
  /** fixé en haut de la fenêtre (défaut) ; false pour le catalogue */
  fixed?: boolean;
  /** entrée sélectionnée (href courant) */
  currentHref?: string;
};

function LeafIcon({iconKey}: {iconKey?: SiteNavLeaf['iconKey']}) {
  if (!iconKey) return null;
  const Glyph = NUCLEO_ICONS[iconKey];
  return <Glyph width={24} height={24} />;
}

function NavEntries({nav, currentHref}: {nav: SiteNavEntry[]; currentHref?: string}) {
  return (
    <>
      {nav.map((e) => {
        if (e.kind === 'link') return <TopNavItem key={e.label} label={e.label} href={e.href} isSelected={e.href === currentHref} />;
        if (e.kind === 'menu') {
          return <TopNavMenu key={e.label} label={e.label} items={e.items.map((it) => ({title: it.title, description: it.description, icon: <LeafIcon iconKey={it.iconKey} />, href: it.href}))} />;
        }
        return (
          <TopNavMegaMenu
            key={e.label}
            label={e.label}
            items={
              <HStack gap={8} align="start" className={styles.megaGroups}>
                {e.groups.map((g) => (
                  <VStack key={g.title} gap={1.5} className={styles.megaGroup}>
                    <Text type="eyebrow" className={styles.megaTitle}>{g.title}</Text>
                    {g.items.map((it) => (
                      <TopNavMegaMenuItem key={it.title} title={it.title} description={it.description} icon={<LeafIcon iconKey={it.iconKey} />} href={it.href} />
                    ))}
                  </VStack>
                ))}
              </HStack>
            }
            featured={
              e.featured ? (
                <TopNavMegaMenuFeaturedCard title={e.featured.title} description={e.featured.description} image={e.featured.image} linkLabel={e.featured.linkLabel} linkHref={e.featured.linkHref} />
              ) : undefined
            }
          />
        );
      })}
    </>
  );
}

export function SiteHeader({brand, strip, nav, actions, languages = ['FR'], tone = 'light', fixed = true, currentHref}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState(languages[0]);

  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [fixed]);

  return (
    <VStack as="header" className={styles.header} data-tone={tone} data-scrolled={scrolled || undefined} data-fixed={fixed || undefined}>
      {strip ? (
        <VStack className={styles.strip}>
          <Container>
            <HStack className={styles.stripRow} vAlign="center" hAlign="between" gap={4}>
              <HStack gap={4} vAlign="center">
                {strip.phone ? <a className={styles.stripLink} href={strip.phone.href}><PhoneIcon width={14} height={14} />{strip.phone.label}</a> : null}
                {strip.email ? <><i className={styles.stripSep} aria-hidden="true" /><a className={styles.stripLink} href={strip.email.href}><MailIcon width={14} height={14} />{strip.email.label}</a></> : null}
                {strip.hours ? <><i className={styles.stripSep} aria-hidden="true" /><span className={styles.stripText}><ClockIcon width={14} height={14} />{strip.hours}</span></> : null}
              </HStack>
              {strip.socials?.length ? (
                <HStack gap={2} vAlign="center">
                  <Text type="tag" className={styles.stripFollow}>Suivez-nous</Text>
                  {strip.socials.map((s) => {
                    const Glyph = NUCLEO_ICONS[s.iconKey];
                    return <a key={s.label} className={styles.social} href={s.href} aria-label={s.label}><Glyph width={14} height={14} /></a>;
                  })}
                </HStack>
              ) : null}
            </HStack>
          </Container>
        </VStack>
      ) : null}

      <VStack className={styles.main}>
        <Container>
          <TopNav
            label="Navigation principale"
            heading={<TopNavHeading logo={<i className={styles.logoMark} aria-hidden="true" />} heading={brand.name} headingHref={brand.href} />}
            startContent={<HStack className={styles.desktopNav} vAlign="stretch"><NavEntries nav={nav} currentHref={currentHref} /></HStack>}
            endContent={
              <HStack gap={2} vAlign="center" className={styles.actions}>
                <IconButton label="Rechercher" icon={<SearchIcon />} variant="ghost" size="sm" />
                <DropdownMenu
                  button={{label: lang, variant: 'ghost', size: 'sm'}}
                  items={languages.map((l) => ({label: l, onClick: () => setLang(l)}))}
                  alignment="end"
                />
                <HStack height={26} className={styles.actionsSep}><Divider orientation="vertical" /></HStack>
                {actions?.login ? <Button label={actions.login.label} href={actions.login.href} variant="ink" size="sm" className={styles.login} /> : null}
                {actions?.cta ? <Button label={actions.cta.label} href={actions.cta.href} variant="primary" size="sm" className={styles.cta} /> : null}
                <IconButton label="Menu" icon={<MenuIcon />} variant="ghost" size="sm" className={styles.burger} onClick={() => setMenuOpen(true)} />
              </HStack>
            }
          />
        </Container>
      </VStack>

      <MobileNav isOpen={menuOpen} onOpenChange={setMenuOpen} header={brand.name}>
        {nav.map((e) =>
          e.kind === 'link' ? (
            <SideNavItem key={e.label} label={e.label} href={e.href} isSelected={e.href === currentHref} />
          ) : (
            <SideNavSection key={e.label} title={e.label}>
              {(e.kind === 'menu' ? e.items : e.groups.flatMap((g) => g.items)).map((it) => (
                <SideNavItem key={it.title} label={it.title} href={it.href} />
              ))}
            </SideNavSection>
          ),
        )}
        {actions?.login || actions?.cta ? (
          <SideNavSection title="Compte">
            {actions.login ? <SideNavItem label={actions.login.label} href={actions.login.href} /> : null}
            {actions.cta ? <SideNavItem label={actions.cta.label} href={actions.cta.href} /> : null}
          </SideNavSection>
        ) : null}
      </MobileNav>
    </VStack>
  );
}
