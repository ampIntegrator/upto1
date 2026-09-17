'use client';

/**
 * SiteHeader — the site header (mockup 01-header, 16-heroFullscreen).
 *
 * Assembly of Astryx components: TopNav (+ TopNavHeading, TopNavItem,
 * TopNavMenu, TopNavMegaMenu, TopNavMegaMenuItem, TopNavMegaMenuFeaturedCard),
 * IconButton, DropdownMenu, Divider, Button, MobileNav + SideNav. This component
 * only adds what Astryx lacks:
 *   - the utility strip (contact details, opening hours, social networks);
 *   - collapse on scroll (strip disappears, lower bar, paper background + shadow);
 *   - the tone: `tone="dark"` when the header sits on a media or night hero
 *     (dark translucent background, white text), until the first scroll;
 *   - mobile navigation (burger + MobileNav drawer) below 1280 px.
 * The data (SiteHeaderData) is what the back office will fill in.
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
import React, {useEffect, useState, useSyncExternalStore} from 'react';

import {ClockIcon, MailIcon, MenuIcon, NUCLEO_ICONS, PhoneIcon, SearchIcon} from '@/theme/icons/nucleo';
import {Container} from './Container';
import {Flag} from './Flag';
import type {SiteHeaderData, SiteNavEntry, SiteNavLeaf} from './site-nav';
import styles from './SiteHeader.module.css';


const subscribeNoop = () => () => {};
function detectTone(): 'light' | 'dark' {
  const first = document.querySelector<HTMLElement>('header ~ section[data-background], header + * section[data-background], main section[data-background]');
  const bg = first?.dataset.background;
  return bg === 'image' || bg === 'video' || bg === 'night' || bg === 'night-halo' ? 'dark' : 'light';
}

export type SiteHeaderProps = SiteHeaderData & {
  /** tone: 'auto' (default) infers it from the page's first block (image, video
   *  or night Section → dark); 'dark' / 'light' to force */
  tone?: 'auto' | 'light' | 'dark';
  /** fixed to the top of the window (default); false for the catalog */
  fixed?: boolean;
  /** selected entry (current href) */
  currentHref?: string;
};

function LeafIcon({iconKey}: {iconKey?: SiteNavLeaf['iconKey']}) {
  if (!iconKey) return null;
  const Glyph = NUCLEO_ICONS[iconKey];
  return <Glyph width={24} height={24} />;
}

/** true when the current page is one of the entry's sub-items: its label takes the silo colour */
const holdsCurrent = (e: SiteNavEntry, currentHref?: string): boolean =>
  Boolean(currentHref) && (e.kind === 'menu' ? e.items.some((it) => it.href === currentHref) : e.kind === 'mega' ? e.groups.some((g) => g.items.some((it) => it.href === currentHref)) : false);

function NavEntries({nav, currentHref}: {nav: SiteNavEntry[]; currentHref?: string}) {
  return (
    <>
      {nav.map((e) => {
        if (e.kind === 'link') return <TopNavItem key={e.label} label={e.label} href={e.href} isSelected={e.href === currentHref} />;
        if (e.kind === 'menu') {
          return (
            <HStack key={e.label} className={styles.menuWrap} vAlign="stretch" data-current={holdsCurrent(e, currentHref) || undefined}>
              <TopNavMenu label={e.label} items={e.items.map((it) => ({title: it.title, description: it.description, icon: <LeafIcon iconKey={it.iconKey} />, href: it.href}))} />
            </HStack>
          );
        }
        return (
          <HStack key={e.label} className={styles.megaWrap} vAlign="stretch" data-current={holdsCurrent(e, currentHref) || undefined}>
          <TopNavMegaMenu
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
          </HStack>
        );
      })}
    </>
  );
}

export function SiteHeader({brand, strip, nav, actions, languages = ['FR'], tone = 'auto', fixed = true, currentHref}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState(languages[0]);
  // automatic tone: the first page block under the header decides (DOM read
  // after hydration; 'light' on the server)
  const detected = useSyncExternalStore(subscribeNoop, detectTone, () => 'light' as const);
  const resolvedTone = tone === 'auto' ? detected : tone;

  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [fixed]);

  return (
    <VStack as="header" className={styles.header} data-tone={resolvedTone} data-scrolled={scrolled || undefined} data-fixed={fixed || undefined}>
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
                {/* search: trigger only for now (site search will come with Payload) */}
                <IconButton label="Rechercher" icon={<SearchIcon />} variant="ghost" size="sm" onClick={() => undefined} />
                <DropdownMenu
                  button={{label: lang, variant: 'ghost', size: 'sm'}}
                  items={languages.map((l) => ({id: l, label: <HStack gap={2} vAlign="center"><Flag code={l} />{l}</HStack>, onClick: () => setLang(l)}))}
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
