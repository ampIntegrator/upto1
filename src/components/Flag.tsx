/**
 * Flag — petit drapeau SVG (18 × 12) pour le sélecteur de langue. Dessiné en SVG, pas
 * en emoji : Windows n'affiche pas les drapeaux emoji. Codes connus : FR, EN, DE, ES ;
 * un code inconnu ne rend rien.
 */
import React from 'react';

export type FlagCode = string;

const W = 18;
const H = 12;

function paint(code: string): React.ReactNode {
  switch (code.toUpperCase()) {
    case 'FR':
      return (
        <>
          <rect width={6} height={H} fill="#0055A4" />
          <rect x={6} width={6} height={H} fill="#FFFFFF" />
          <rect x={12} width={6} height={H} fill="#EF4135" />
        </>
      );
    case 'DE':
      return (
        <>
          <rect width={W} height={4} fill="#000000" />
          <rect y={4} width={W} height={4} fill="#DD0000" />
          <rect y={8} width={W} height={4} fill="#FFCE00" />
        </>
      );
    case 'ES':
      return (
        <>
          <rect width={W} height={H} fill="#AA151B" />
          <rect y={3} width={W} height={6} fill="#F1BF00" />
        </>
      );
    case 'EN':
    case 'GB':
    case 'UK':
      return (
        <>
          <rect width={W} height={H} fill="#012169" />
          <path d="M0 0L18 12M18 0L0 12" stroke="#FFFFFF" strokeWidth={2.4} />
          <path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" strokeWidth={0.8} />
          <path d="M9 0V12M0 6H18" stroke="#FFFFFF" strokeWidth={4} />
          <path d="M9 0V12M0 6H18" stroke="#C8102E" strokeWidth={2.4} />
        </>
      );
    default:
      return null;
  }
}

export function Flag({code, className}: {code: FlagCode; className?: string}) {
  const shapes = paint(code);
  if (!shapes) return null;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false" className={className} style={{flex: '0 0 auto', display: 'block'}}>
      {shapes}
    </svg>
  );
}
