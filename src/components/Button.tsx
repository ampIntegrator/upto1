'use client';

/**
 * Button — the site button, built on the Astryx Button.
 *
 * Takes all Astryx Button props (label, variant, size, href, icon,
 * isLoading, isDisabled…) and adds the Orbita signature:
 *   - `arrow`  : split-button — full-height arrow cell on the right
 *                (Nucleo arrow-right icon), inner frame animated on hover;
 *   - `block`  : full width, label on the left, arrow against the right edge;
 *   - `iconKey`: Nucleo icon left of the label, by key (a string storable
 *                in Payload, so editable in the admin); the gap to the text
 *                is half the horizontal padding (theme, per size);
 *   - `high` variant: highlight background, night text (declared by the theme);
 *   - `secondary` variant: accent → ink gradient label that slides toward
 *                the dark accent on hover (the only silo touch on this button).
 *
 * Without `arrow` or `block`, it is a plain Astryx Button: the Orbita theme
 * already gives it sharp corners, weight, accent glow and outlined ghost.
 */
import {Button as AstryxButton, type ButtonProps as AstryxButtonProps} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import React, {useId} from 'react';

import {NUCLEO_GRID} from '@/theme/icons/keys';
import {ArrowRightIcon, NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';
import {newTabProps} from './link-target';
import styles from './Button.module.css';

export type ButtonProps = Omit<AstryxButtonProps, 'endContent' | 'width' | 'size'> & {
  /** Only two sizes (Orbita): md 48 px, lg 56 px. */
  size?: 'md' | 'lg';
  /** Split-button: arrow cell on the right. */
  arrow?: boolean;
  /** Full width, arrow at the right edge. */
  block?: boolean;
  /** Leading Nucleo icon, by key (e.g. 'search'). Takes precedence over `icon`. */
  iconKey?: NucleoIconKey;
  /** Opens `href` in a new tab (target _blank, rel noopener noreferrer). */
  newTab?: boolean;
};

export function Button({arrow = false, block = false, iconKey, icon, className, variant = 'primary', size = 'md', newTab, ...rest}: ButtonProps) {
  const isSecondary = variant === 'secondary';
  const gradId = useId();
  const nucleoIcon = iconKey ? <Icon icon={NUCLEO_ICONS[iconKey]} /> : null;
  /** Ink → accent SVG gradient (stops driven by button hover), stretched over the icon grid. */
  const gradientDefs = (id: string, grid: number) => (
    <svg width={0} height={0} aria-hidden="true" style={{position: 'absolute'}}>
      <defs>
        {/* userSpaceOnUse: a bounding-box gradient disappears on a straight
            stroke (zero height), e.g. the arrow shaft. */}
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={grid} y2="0">
          <stop offset="0" className={styles.stopA} />
          <stop offset="1" className={styles.stopB} />
        </linearGradient>
      </defs>
    </svg>
  );
  // secondary: the Nucleo icon gets an SVG gradient (ink → accent), defined
  // locally so the button hover drives its stops.
  const leadingIcon =
    nucleoIcon && isSecondary ? (
      <span className={styles.iconGrad} style={{'--orbita-grad': `url(#${gradId})`} as React.CSSProperties}>
        {gradientDefs(gradId, iconKey ? NUCLEO_GRID[iconKey] : 18)}
        {nucleoIcon}
      </span>
    ) : (
      nucleoIcon ?? icon
    );
  const classes = [
    className,
    arrow ? styles.arrow : null,
    block ? styles.block : null,
    leadingIcon ? styles.withIcon : null,
    isSecondary ? styles.secondary : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <AstryxButton
      {...rest}
      {...newTabProps(newTab)}
      variant={variant}
      size={size}
      icon={leadingIcon}
      className={classes}
      // visible label overridden for the gradient; `label` remains the accessible name
      {...(isSecondary && !rest.children ? {children: <span className={styles.secondaryLabel}>{rest.label}</span>} : {})}
      width={block ? '100%' : undefined}
      endContent={
        arrow ? (
          <Icon
            icon={(p) => (
              <span
                className={styles.cell}
                aria-hidden="true"
                style={isSecondary ? ({'--orbita-grad': `url(#${gradId}-arrow)`} as React.CSSProperties) : undefined}>
                {isSecondary ? gradientDefs(`${gradId}-arrow`, NUCLEO_GRID['arrow-right']) : null}
                <ArrowRightIcon {...p} />
              </span>
            )}
            size="sm"
          />
        ) : undefined
      }
    />
  );
}
