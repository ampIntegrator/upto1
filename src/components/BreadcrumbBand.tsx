/**
 * BreadcrumbBand — the breadcrumb band below a page header (mockup 25):
 * paper Section with dividers, 44 px tall, content on one line (horizontal scrolling
 * if the trail is too long, handled by the theme), home as a house icon or as text (site setting).
 * Astryx assembly (Breadcrumbs, VisuallyHidden); used by the upcoming page header block.
 */
import {BreadcrumbItem, Breadcrumbs} from '@astryxdesign/core/Breadcrumbs';
import {HStack} from '@astryxdesign/core/Stack';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import React from 'react';

import {ChevronRightIcon, HomeIcon} from '@/theme/icons/nucleo';
import {Container} from './Container';
import {Section} from './Section';

export type BreadcrumbBandProps = {
  /** intermediate links (home is prepended) */
  items: Array<{label: string; href?: string}>;
  /** current page (last link, not clickable) */
  current: string;
  homeHref?: string;
  /** home label: shown if `homeStyle="text"`, otherwise screen readers only (site setting) */
  homeLabel?: string;
  homeStyle?: 'icon' | 'text';
};

export function BreadcrumbBand({items, current, homeHref = '/', homeLabel = 'Accueil', homeStyle = 'icon'}: BreadcrumbBandProps) {
  return (
    <Section background="paper" spacing="none" dividers>
      <Container>
        <HStack height={44} vAlign="center">
          <Breadcrumbs label="Fil d'Ariane" separator={<ChevronRightIcon width={12} height={12} />}>
            {homeStyle === 'text' ? (
              <BreadcrumbItem href={homeHref}>{homeLabel}</BreadcrumbItem>
            ) : (
              <BreadcrumbItem href={homeHref} startIcon={<HomeIcon width={14} height={14} />}>
                <VisuallyHidden>{homeLabel}</VisuallyHidden>
              </BreadcrumbItem>
            )}
            {items.map((it) => (
              <BreadcrumbItem key={it.label} href={it.href}>
                {it.label}
              </BreadcrumbItem>
            ))}
            <BreadcrumbItem isCurrent>{current}</BreadcrumbItem>
          </Breadcrumbs>
        </HStack>
      </Container>
    </Section>
  );
}
