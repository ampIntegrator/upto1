'use client';

/**
 * Dialog — the site modal, built on the Astryx Dialog.
 *
 * Orbita signature (mockup 20-modal): header with optional gold eyebrow
 * and display title in accent, square close button (Nucleo `close` icon),
 * scrolling body, footer on a tinted background topped by a gradient divider
 * highlight → accent → highlight that follows the silo. Night variant via `tone`.
 *
 * The header keeps a constant height with or without eyebrow: the
 * eyebrow + title block is vertically centered in a fixed-height area,
 * since in the back office the editor may or may not fill in the eyebrow.
 */
import {Dialog as AstryxDialog} from '@astryxdesign/core/Dialog';
import {Heading} from '@astryxdesign/core/Heading';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Layout, LayoutContent} from '@astryxdesign/core/Layout';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Theme} from '@astryxdesign/core/theme';
import React, {useId} from 'react';

import {CloseIcon} from '@/theme/icons/nucleo';
import {useOrbitaTheme} from '@/theme/OrbitaThemeProvider';
import styles from './Dialog.module.css';

export type OrbitaDialogSize = 'sm' | 'md' | 'lg';
export type DialogTone = 'light' | 'night';

/** Orbita widths: 420 / 620 / 840 px. */
const WIDTH: Record<OrbitaDialogSize, number> = {sm: 420, md: 620, lg: 840};

/** Height reserved for the header (eyebrow + title + close button), constant. */
const HEADER_MIN_HEIGHT = 92;

export type DialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  /** Title (required: it names the modal for accessibility). */
  title: string;
  /** Small gold caps above the title. Optional, controllable from Payload. */
  eyebrow?: string;
  /** Width: sm 420, md 620, lg 840 px. */
  size?: OrbitaDialogSize;
  /** Light (default) or night. */
  tone?: DialogTone;
  /** Astryx close behavior: info (default), form, required (no Escape, no backdrop, no close button). */
  purpose?: 'info' | 'form' | 'required';
  /** Footer buttons, right-aligned. Without `actions`, no footer. */
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function Dialog({
  isOpen,
  onOpenChange,
  title,
  eyebrow,
  size = 'md',
  tone = 'light',
  purpose = 'info',
  actions,
  children,
}: DialogProps) {
  const titleId = useId();
  const {theme, mode} = useOrbitaTheme();

  const header = (
    <HStack
      gap={6}
      vAlign="center"
      hAlign="between"
      style={{
        minHeight: HEADER_MIN_HEIGHT,
        padding: 'var(--spacing-4) var(--spacing-6)',
        borderBottom: 'var(--border-width) solid var(--color-border)',
        background: 'var(--color-background-surface)',
      }}>
      <VStack gap={1} vAlign="center">
        {eyebrow ? (
          <Text type="eyebrow-mono" className={styles.eyebrow}>
            {eyebrow}
          </Text>
        ) : null}
        <Heading level={2} id={titleId} color="accent" className={styles.title} style={{fontSize: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.12}}>
          {title}
        </Heading>
      </VStack>
      {/* required: the footer buttons are the only way out, no close button */}
      {purpose === 'required' ? null : (
        <IconButton
          label="Fermer"
          variant="secondary"
          icon={<Icon icon={CloseIcon} />}
          onClick={() => onOpenChange(false)}
          className={styles.close}
          style={{flex: '0 0 auto'}}
        />
      )}
    </HStack>
  );

  const footer = actions ? (
    <VStack gap={0} className={styles.footer}>
      {/* gradient divider highlight → accent → highlight, follows the silo */}
      <VStack
        aria-hidden="true"
        style={{
          height: 3,
          background:
            'linear-gradient(90deg, var(--color-highlight) 0%, var(--color-accent) 50%, var(--color-highlight) 100%)',
        }}
      />
      <HStack gap={3} hAlign="end" vAlign="center" wrap="wrap" style={{padding: 'var(--spacing-3) var(--spacing-6)'}}>
        {actions}
      </HStack>
    </VStack>
  ) : null;

  const dialog = (
    <AstryxDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      width={WIDTH[size]}
      maxHeight="min(86dvh, 760px)"
      purpose={purpose}
      padding={0}
      aria-labelledby={titleId}>
      <Layout
        header={header}
        content={
          <LayoutContent padding={6}>
            <VStack gap={4}>{children}</VStack>
          </LayoutContent>
        }
        footer={footer}
      />
    </AstryxDialog>
  );

  // Night variant: same silo, dark mode forced on the modal only.
  if (tone === 'night' && mode !== 'dark') {
    return (
      <Theme theme={theme} mode="dark">
        {dialog}
      </Theme>
    );
  }
  return dialog;
}
