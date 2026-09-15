/**
 * TitleText — renders a title entered in a textarea (future Payload field).
 *
 * Deliberately minimal syntax, the one the administrator will type:
 *   - a line break (or <br>)              → line break in the title
 *   - <span>…</span>                       → serif accent (Cormorant italic, silo color;
 *                                            editorial gold where --serif-color asks for it)
 * Any other markup is displayed as is: nothing is injected as raw HTML, the text is
 * split then rendered as React nodes (Text type="serif", <br />).
 *
 * Example (textarea):
 *   Toute la chaîne bâtiment,
 *   <span>d'un seul outil.</span>
 *   Du chiffrage à la maintenance.
 *
 * Used by Hero (h1) and SiteFooter (newsletter title). Payload side: a
 * `textarea` field with these two rules in its description.
 */
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

/** An entered title: plain text + line breaks + <span> for the serif accent. */
export type TitleText = string;

const TOKENS = /(<span(?:\s[^>]*)?>[\s\S]*?<\/span>|<br\s*\/?>|\n)/gi;
const SPAN = /^<span(?:\s[^>]*)?>([\s\S]*?)<\/span>$/i;

/** Splits the title and renders each piece: text, <br />, or serif Text. */
export function renderTitle(text: TitleText | undefined | null, serifClassName?: string): React.ReactNode {
  if (!text) return null;
  const parts = text.replace(/\r\n?/g, '\n').trim().split(TOKENS).filter(Boolean);
  return parts.map((part, i) => {
    if (part === '\n' || /^<br\s*\/?>$/i.test(part)) return <br key={i} />;
    const m = part.match(SPAN);
    if (m) return <Text key={i} type="serif" className={serifClassName}>{m[1]}</Text>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
