/**
 * TypeScript augmentations for the text types added by the Orbita theme
 * (see `components.text` in src/theme/orbita.ts). Mechanism documented by
 * Astryx (theme/types.d.ts); the CLI only generates it for Heading.
 */
import '@astryxdesign/core/theme';

declare module '@astryxdesign/core/theme' {
  interface CustomTextTypes {
    /** Spaced small caps, editorial gold — above a heading */
    eyebrow: true;
    /** Section heading eyebrow: a 40 px dash on each side (mockup .c-head-eyebrow) */
    'eyebrow-lines': true;
    /** Eyebrow in Geist Mono 500, 12 px — modal, footer */
    'eyebrow-mono': true;
    /** Cormorant Garamond italic 600, accent color — « signature » word in a heading */
    serif: true;
    /** Cormorant Garamond upright 500, silo color — step numbers, testimonial quote mark */
    'serif-upright': true;
    /** Spaced technical label (formerly Geist Mono) */
    tag: true;
    /** Large card number, Schibsted 800, silo color */
    number: true;
    /** Numeric result of a case study */
    result: true;
    /** Article date */
    date: true;
  }
}
