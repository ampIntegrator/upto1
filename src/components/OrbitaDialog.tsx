'use client';

/**
 * OrbitaDialog — modale du site, sur le Dialog Astryx.
 *
 * Signature Orbita (maquette 20-modal) : en-tête avec eyebrow doré optionnel
 * et titre display en accent, bouton fermer carré (icône Nucleo `close`),
 * corps défilant, pied sur fond teinté surmonté d'un filet dégradé
 * highlight → accent → highlight qui suit le silo. Variante nuit par `tone`.
 *
 * L'en-tête garde une hauteur constante avec ou sans eyebrow : le bloc
 * eyebrow + titre est centré verticalement dans une zone de hauteur fixe,
 * puisqu'en back-office l'éditeur pourra remplir l'eyebrow ou non.
 */
import {Dialog} from '@astryxdesign/core/Dialog';
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
import styles from './OrbitaDialog.module.css';

export type OrbitaDialogSize = 'sm' | 'md' | 'lg';
export type OrbitaDialogTone = 'light' | 'night';

/** Largeurs Orbita : 420 / 620 / 840 px. */
const WIDTH: Record<OrbitaDialogSize, number> = {sm: 420, md: 620, lg: 840};

/** Hauteur réservée à l'en-tête (eyebrow + titre + bouton fermer), constante. */
const HEADER_MIN_HEIGHT = 92;

export type OrbitaDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  /** Titre (obligatoire : il nomme la modale pour l'accessibilité). */
  title: string;
  /** Petite capitale dorée au-dessus du titre. Optionnelle, pilotable depuis Payload. */
  eyebrow?: string;
  /** Largeur : sm 420, md 620, lg 840 px. */
  size?: OrbitaDialogSize;
  /** Clair (défaut) ou nuit. */
  tone?: OrbitaDialogTone;
  /** Comportement de fermeture Astryx : info (défaut), form, required. */
  purpose?: 'info' | 'form' | 'required';
  /** Boutons du pied, alignés à droite. Sans `actions`, pas de pied. */
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function OrbitaDialog({
  isOpen,
  onOpenChange,
  title,
  eyebrow,
  size = 'md',
  tone = 'light',
  purpose = 'info',
  actions,
  children,
}: OrbitaDialogProps) {
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
          <Text type="eyebrow" className={styles.eyebrow}>
            {eyebrow}
          </Text>
        ) : null}
        <Heading level={2} id={titleId} color="accent" style={{fontSize: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.12}}>
          {title}
        </Heading>
      </VStack>
      <IconButton
        label="Fermer"
        variant="secondary"
        icon={<Icon icon={CloseIcon} />}
        onClick={() => onOpenChange(false)}
        className={styles.close}
        style={{flex: '0 0 auto'}}
      />
    </HStack>
  );

  const footer = actions ? (
    <VStack gap={0} style={{background: 'var(--color-background-muted)'}}>
      {/* filet dégradé highlight → accent → highlight, suit le silo */}
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
    <Dialog
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
    </Dialog>
  );

  // Variante nuit : même silo, mode sombre forcé sur la modale seule.
  if (tone === 'night' && mode !== 'dark') {
    return (
      <Theme theme={theme} mode="dark">
        {dialog}
      </Theme>
    );
  }
  return dialog;
}
