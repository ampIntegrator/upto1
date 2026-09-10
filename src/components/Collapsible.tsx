'use client';

/**
 * Collapsible — l'item d'accordéon de la maquette 11-faq : boîte bordée,
 * question en Geist 600, icône plus/moins dessinée en CSS. Ouvert, la boîte se
 * remplit en couleur silo (texte et icône blancs). Nuit : fond translucide,
 * plus en highlight, ouvert = même remplissage silo.
 *
 * Enveloppe le Collapsible Astryx (accessibilité, coordination de groupe,
 * état contrôlé ou non). Le chevron Astryx est masqué, la réponse s'anime en
 * hauteur (grille 0fr → 1fr) comme dans la maquette.
 *
 * CollapsibleGroup — plusieurs items reliés : `type="single"` (accordéon
 * strict, une seule ouverte) ou `"multiple"` (libres), empilés ou sur deux
 * colonnes. Deux groupes sur une même page sont indépendants.
 */
import {Collapsible as AstryxCollapsible, CollapsibleGroup as AstryxCollapsibleGroup} from '@astryxdesign/core/Collapsible';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import React from 'react';

import styles from './Collapsible.module.css';

export type CollapsibleProps = {
  /** la question (contenu du déclencheur) */
  question: React.ReactNode;
  /** identifiant dans le groupe (obligatoire dans un CollapsibleGroup) */
  value?: string;
  /** la réponse */
  children: React.ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isDisabled?: boolean;
};

export function Collapsible({question, value, children, defaultIsOpen = false, isOpen, onOpenChange, isDisabled}: CollapsibleProps) {
  return (
    <VStack className={styles.item}>
      <AstryxCollapsible
        trigger={<span className={styles.question}>{question}<i className={styles.icon} aria-hidden="true" /></span>}
        value={value}
        defaultIsOpen={defaultIsOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDisabled={isDisabled}
      >
        <VStack className={styles.answer}>{children}</VStack>
      </AstryxCollapsible>
    </VStack>
  );
}

export type CollapsibleGroupProps = {
  /** accordéon strict (une seule ouverte) ou libre */
  type?: 'single' | 'multiple';
  /** item(s) ouvert(s) au départ : `value` d'un item, ou tableau en mode multiple */
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  /** disposition : empilée ou deux colonnes (une seule sous ~900 px) */
  columns?: 1 | 2;
  children: React.ReactNode;
};

export function CollapsibleGroup({type = 'single', defaultValue, value, onChange, columns = 1, children}: CollapsibleGroupProps) {
  return (
    <AstryxCollapsibleGroup type={type} defaultValue={defaultValue} value={value} onChange={onChange}>
      {columns === 2 ? (
        <Grid columns={{minWidth: 420, max: 2}} rowGap={4} columnGap={6} align="start">
          {children}
        </Grid>
      ) : (
        <VStack gap={4}>{children}</VStack>
      )}
    </AstryxCollapsibleGroup>
  );
}
