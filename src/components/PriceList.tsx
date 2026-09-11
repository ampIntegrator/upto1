'use client';

/**
 * PriceList — la liste de prix (maquettes 08 et 09), un contenu comme Stat, en deux variantes :
 *
 *   variant="single"   un prix unique : carte en deux colonnes, détail de l'offre à gauche
 *                      (liste avec valeurs barrées, valeur totale), prix, bouton, mention et
 *                      garantie à droite sur fond atténué ; une colonne sous 1024 px, prix en
 *                      premier. 900 px maximum, centrée.
 *   variant="columns"  plusieurs paliers côte à côte (2 à 4) : nom, accroche, prix, liste
 *                      « Tout Solo, plus », bouton, mention, garantie ; le palier mis en avant
 *                      porte le chip « Populaire », un cadre silo et le bouton split.
 *
 * Le prix lui-même (montant Schibsted 800 silo, devise, période) et l'encadré de garantie
 * (Callout) sont les briques internes. L'en-tête de section vient du bloc, pas d'ici.
 * Nuit via la Section (fond « nuit à faisceau » pour la maquette 09).
 */
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import React from 'react';

import {PlanCard, type PlanCardProps} from './PlanCard';
import {PriceCard, type PriceCardProps} from './PriceCard';

export type {PlanCardProps as PriceListPlan, PriceCardProps as PriceListSingle};

export type PriceListProps =
  | ({variant: 'single'} & PriceCardProps)
  | {variant: 'columns'; plans: PlanCardProps[]};

export function PriceList(props: PriceListProps) {
  if (props.variant === 'columns') {
    const span = props.plans.length >= 4 ? 3 : props.plans.length === 2 ? 6 : 4;
    return (
      <Grid columns={12} gap={6} className="page-grid" align="stretch">
        {props.plans.map((p) => (
          <GridSpan key={p.name} columns={span}>
            <PlanCard {...p} />
          </GridSpan>
        ))}
      </Grid>
    );
  }
  const {variant: _variant, ...single} = props;
  return <PriceCard {...single} />;
}
