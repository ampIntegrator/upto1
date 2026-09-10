'use client';

/**
 * Button — bouton du site, sur le Button Astryx.
 *
 * Reprend toutes les props du Button Astryx (label, variant, size, href, icon,
 * isLoading, isDisabled…) et ajoute la signature Orbita :
 *   - `arrow`  : split-button — cellule flèche pleine hauteur à droite
 *                (icône Nucleo arrow-right), cadre intérieur animé au survol ;
 *   - `block`  : pleine largeur, libellé à gauche, flèche collée au bord droit ;
 *   - `iconKey`: icône Nucleo à gauche du libellé, par sa clé (chaîne stockable
 *                dans Payload, donc modifiable en admin) ; l'écart avec le texte
 *                vaut la moitié du padding horizontal (thème, par taille) ;
 *   - variante `high` : fond highlight, texte nuit (déclarée par le thème) ;
 *   - variante `secondary` : libellé en dégradé accent → encre, qui glisse vers
 *                l'accent foncé au survol (seule touche de silo sur ce bouton).
 *
 * Sans `arrow` ni `block`, c'est un Button Astryx tel quel : le thème Orbita
 * lui donne déjà angles vifs, graisse, halo accent et fantôme bordé.
 */
import {Button as AstryxButton, type ButtonProps as AstryxButtonProps} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import React, {useId} from 'react';

import {NUCLEO_GRID} from '@/theme/icons/keys';
import {ArrowRightIcon, NUCLEO_ICONS, type NucleoIconKey} from '@/theme/icons/nucleo';
import styles from './Button.module.css';

export type ButtonProps = Omit<AstryxButtonProps, 'endContent' | 'width' | 'size'> & {
  /** Deux tailles seulement (Orbita) : md 48 px, lg 56 px. */
  size?: 'md' | 'lg';
  /** Split-button : cellule flèche à droite. */
  arrow?: boolean;
  /** Pleine largeur, flèche au bord droit. */
  block?: boolean;
  /** Icône Nucleo à gauche, par sa clé (ex. 'search'). Prioritaire sur `icon`. */
  iconKey?: NucleoIconKey;
};

export function Button({arrow = false, block = false, iconKey, icon, className, variant = 'primary', size = 'md', ...rest}: ButtonProps) {
  const isSecondary = variant === 'secondary';
  const gradId = useId();
  const nucleoIcon = iconKey ? <Icon icon={NUCLEO_ICONS[iconKey]} /> : null;
  /** Dégradé SVG encre → accent (stops pilotés par le survol du bouton), étiré sur la grille de l'icône. */
  const gradientDefs = (id: string, grid: number) => (
    <svg width={0} height={0} aria-hidden="true" style={{position: 'absolute'}}>
      <defs>
        {/* userSpaceOnUse : un dégradé en boîte englobante disparaît sur un trait
            droit (hauteur nulle), ex. la hampe de la flèche. */}
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={grid} y2="0">
          <stop offset="0" className={styles.stopA} />
          <stop offset="1" className={styles.stopB} />
        </linearGradient>
      </defs>
    </svg>
  );
  // secondary : l'icône Nucleo reçoit un dégradé SVG (encre → accent), défini
  // localement pour que le survol du bouton pilote ses stops.
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
      variant={variant}
      size={size}
      icon={leadingIcon}
      className={classes}
      // libellé visible surchargé pour le dégradé ; `label` reste le nom accessible
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
