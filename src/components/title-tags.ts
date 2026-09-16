/**
 * Title tags — the HTML elements a title can take (h1 to h6, p or span), shared by the
 * Title component, the Payload « tag » field and the data conversion. No CSS import
 * here: this module is loaded by the Payload config on the server.
 */
export const TITLE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;
export type TitleTag = (typeof TITLE_TAGS)[number];
/** The tags offered in the admin: never h1 (the page title). */
export const CONTENT_TITLE_TAGS = ['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;
export type ContentTitleTag = (typeof CONTENT_TITLE_TAGS)[number];

/** Any stored value → a title tag (fallback given by the component). */
export const toTitleTag = (v: unknown, fallback: TitleTag): TitleTag => ((TITLE_TAGS as readonly string[]).includes(String(v)) ? (v as TitleTag) : fallback);
