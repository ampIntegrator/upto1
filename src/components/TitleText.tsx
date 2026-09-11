/**
 * TitleText — rendu d'un titre saisi dans un textarea (futur champ Payload).
 *
 * Syntaxe volontairement minimale, celle que l'administrateur tapera :
 *   - un retour à la ligne (ou <br>)      → saut de ligne dans le titre
 *   - <span>…</span>                       → accent serif (Cormorant italique, couleur silo ;
 *                                            or éditorial là où --serif-color le demande)
 * Tout autre balisage est affiché tel quel : rien n'est injecté en HTML brut, le texte est
 * découpé puis rendu en nœuds React (Text type="serif", <br />).
 *
 * Exemple (textarea) :
 *   Toute la chaîne bâtiment,
 *   <span>d'un seul outil.</span>
 *   Du chiffrage à la maintenance.
 *
 * Utilisé par Hero (h1) et SiteFooter (titre newsletter). Côté Payload : un champ
 * `textarea` avec, en description, ces deux règles.
 */
import {Text} from '@astryxdesign/core/Text';
import React from 'react';

/** Un titre saisi : texte brut + retours à la ligne + <span> pour l'accent serif. */
export type TitleText = string;

const TOKENS = /(<span(?:\s[^>]*)?>[\s\S]*?<\/span>|<br\s*\/?>|\n)/gi;
const SPAN = /^<span(?:\s[^>]*)?>([\s\S]*?)<\/span>$/i;

/** Découpe le titre et rend chaque morceau : texte, <br />, ou Text serif. */
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
