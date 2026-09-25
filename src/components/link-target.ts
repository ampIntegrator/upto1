/**
 * Link target — the attributes of a link or button that opens in a new tab (the « Ouvrir dans un
 * nouvel onglet » box of every link field, src/fields/linkTarget.ts). Pure: no React, no CSS.
 */

/** a link as the components receive it: an address, and whether it opens in a new tab */
export type LinkTarget = {href: string; newTab?: boolean};

/** `target` and `rel` for a link that opens in a new tab, nothing otherwise */
export const newTabProps = (newTab?: boolean): {target?: '_blank'; rel?: string} => (newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {});
