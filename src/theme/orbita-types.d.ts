/**
 * Augmentations TypeScript pour les types de texte ajoutés par le thème Orbita
 * (voir `components.text` dans src/theme/orbita.ts). Mécanisme documenté par
 * Astryx (theme/types.d.ts) ; le CLI ne le génère que pour Heading.
 */
import '@astryxdesign/core/theme';

declare module '@astryxdesign/core/theme' {
  interface CustomTextTypes {
    /** Petite capitale espacée, or éditorial — au-dessus d'un titre */
    eyebrow: true;
    /** Eyebrow de tête de section : un tiret de 40 px de chaque côté (maquette .c-head-eyebrow) */
    'eyebrow-lines': true;
    /** Eyebrow en Geist Mono 500, 12 px — modale, pied de page */
    'eyebrow-mono': true;
    /** Cormorant Garamond italique 600, couleur accent — mot « signature » dans un titre */
    serif: true;
    /** Cormorant Garamond droit 500, couleur silo — numéros d'étape, guillemet des témoignages */
    'serif-upright': true;
    /** Étiquette technique espacée (ex-Geist Mono) */
    tag: true;
    /** Grand nombre de carte, Schibsted 800, couleur silo */
    number: true;
    /** Résultat chiffré d'une réalisation */
    result: true;
    /** Date d'article */
    date: true;
  }
}
