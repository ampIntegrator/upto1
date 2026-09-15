'use client';

/**
 * PriceList — the price list (mockups 08 and 09), a content item like Stat, in two variants:
 *
 *   variant="single"   a single price: two-column card, offer details on the left
 *                      (list with struck-through values, total value), price, button, note and
 *                      guarantee on the right on a muted background; one column below 1024 px, price
 *                      first. 900 px max, centered.
 *   variant="columns"  several tiers side by side (2 to 4): name, tagline, price, list
 *                      « Tout Solo, plus », button, note, guarantee; the featured tier
 *                      carries the « Populaire » chip, a silo border and the split button.
 *
 * The price itself (Schibsted 800 silo amount, currency, period) and the guarantee box
 * (Callout) are the internal building blocks. The section header comes from the block, not from here.
 * Night via the Section (« nuit à faisceau » background for mockup 09).
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
