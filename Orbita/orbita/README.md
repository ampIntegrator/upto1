# Orbita — Design System & bibliothèque de composants

Maquettes HTML haute-fidélité du design system **Orbita**, prêtes à servir de
référence pour l'intégration **Next.js**. Chaque fichier est un composant
autonome et directement ouvrable dans un navigateur.

---

## 1. Principes du système

### Les 4 silos d'accent
Un socle unique se décline en **4 accents** pilotés par l'attribut
`data-theme` sur `<html>`/`<body>` : **bleu** (défaut), **vert**, **orange**,
**violet**. Chaque silo redéfinit le même jeu de variables :

```
--bg, --bg-2        fonds clairs (teintés par l'accent)
--primary, --primary-deep, --primary-soft
--highlight, --highlight-deep        couleur secondaire / signal
--night                              fond sombre du silo
```

Constantes **partagées par tous les silos** (jamais teintées par l'accent) :

```
--ink / --ink-2 / --ink-3    texte
--line / --line-2            filets
--editorial / --editorial-deep   OR éditorial (accents serif)
--paper                      blanc
--danger / --ok              états (form)
--header-h                   hauteur réservée du header
```

**Transitions — centralisées en 2 tokens** (dans `orbita.css`) :

```
--t-dur:  .25s;        /* vitesse de TOUTES les transitions */
--t-ease: ease-in-out; /* courbe de TOUTES les transitions */
```

Tout le DS pointe dessus, en CSS (`transition: … var(--t-dur) var(--t-ease)`)
comme en markup Tailwind (`duration-[var(--t-dur)] ease-[var(--t-ease)]`).
Changer ces 2 lignes = toute l'animation du DS suit.

**Tous ces tokens vivent dans `orbita.css`** (voir §2) — définis une seule fois,
partagés par les 17 composants. Changer la couleur d'un accent = **une ligne**.

Un sélecteur d'accent (« Accent : Bleu / Vert / Orange / Violet ») est présent
dans chaque maquette **à des fins de démonstration uniquement** — ce n'est pas
un élément de production.

### Typographie
- **Schibsted Grotesk** — display / titres
- **Geist** — texte courant
- **Cormorant Garamond** *italique 600* — accent serif éditorial
- **Geist Mono** — étiquettes, eyebrows mono

### Signature visuelle
Angles vifs (rayon zéro), **split-button** à liseré intérieur (`::before`),
eyebrows dorés à filets, textures blueprint / points / losanges, sections
« nuit » avec halos.

**Séparateur de carte** (`.card-sep`, composants 12 & 14) : deux filets
`line-2` encadrant un petit losange central **animé** (`@keyframes sepMorph` —
morphe carré ⇄ cercle et highlight ⇄ primaire en tournant ; coupé par
`prefers-reduced-motion`).

---

## 2. Stack & architecture CSS

- **HTML + Tailwind**. Les maquettes chargent le **build navigateur**
  `@tailwindcss/browser@4` (pratique pour la démo).

### `orbita.css` — la fondation partagée (le cœur du DS)
Un **seul fichier** `orbita/orbita.css`, linké par tous les composants, centralise :
- **les tokens** : `:root` (constantes + transitions) + les 4 silos `[data-theme]` ;
- **la signature & les contrôles** : boutons (`.c-btn-split` + `.lbl`/`.arw`/`::before`/`:hover`,
  `.c-btn-split--ondark`, `.c-btn-solid`, `.c-btn-ghost`), séparateur animé (`.card-sep` + `sepMorph`),
  eyebrow (`.c-head-eyebrow`), textures (`.c-blueprint`/`.c-tex-*`/`.tex-target`),
  fond dégradé dark (`.c-darkbg`), chrome de header partagé (mega/lang/search/drawer/burger),
  `.silo-btn`, titre tag-agnostique (`.o-headline`), **et tout le kit de formulaires**
  (`.field-*`, `.selectx-*`, `.opt-*`, `.switch-*`, `.upload-*`, light + dark).

Règle de centralisation : **un sélecteur va dans `orbita.css` s'il est partagé
(≥2 composants) et identique partout**. Le reste — propre à un composant ou en
collision — reste **inline** dans son fichier.

### Ce qui reste inline (volontairement)
- CSS spécifique : `.hero-*` (16), `.fwti-*` (13), `.price-*`/`.tier-*` (08/09),
  `.tab-*` (06), `.faq-*` (11), `.statsbar`/`.stat-*` (04)…
- **Collisions** : le header transparent du 16 (`.hdr-main` etc.) vs le header
  standard du 01 ; `.c-blueprint` des prix ; `prefers-reduced-motion` (contenu
  différent par fichier). Ces valeurs **diffèrent** entre composants — les
  centraliser casserait l'un des deux.

### Pont vers Tailwind
- Les **tokens sont exposés à Tailwind** via `@theme inline` (bloc
  `<style type="text/tailwindcss">`, **inline & incompressible** — c'est de la
  config Tailwind, pas du CSS standard, donc non déplaçable vers `orbita.css`),
  ce qui rend utilisables `text-primary`, `bg-night`, `border-line`…
- **Markup = utilitaires Tailwind** (layout, espacements, breakpoints, valeurs
  arbitraires). **Aucune classe générée dynamiquement en JS.**

### Convention : titres indépendants de la balise
Sauf le hero, le style d'un titre dépend **de la classe, jamais de la balise**
(`.o-headline`, `.fwti-title`, etc.). Le back-office peut donc mettre `h2`,
`h6`, `p` ou `span` pour le SEO **sans changer l'apparence**. La ligne d'accent
est un `<span>` en `display:block`.
→ **Exception : le hero (16)** porte le **`<h1>` unique et fixe** de la page.

### Convention : images
Deux approches selon le besoin :
- **`background-image`** pour les panneaux/fonds pleins (mosaïque 14, hero, etc.) —
  transposable en `<Image fill>` côté Next.js.
- **`<img>` en `position:absolute`** dans un conteneur `overflow:hidden` quand on
  doit caler finement le cadrage — cas de l'**effet « image splitée »** du form
  (17) : une image coupée en deux dont les moitiés se rejoignent derrière la carte
  (côtés ancrés `left:-100%` / `left:-200%`, largeur `400%`).

### Convention : espacements responsive
Conteneur unique sur **tous** les blocs :
`max-w-[1280px] mx-auto px-5 sm:px-8` → **20px** de marge latérale en mobile,
**32px** dès 640px. Vertical des sections réduit en mobile :
`py-14 sm:py-20` (56/80px) et `py-16 sm:py-24` (64/96px). Padding des cartes
de formulaire `p-5 sm:p-9`, carte split `p-6 sm:p-9 md:p-12`.

---

## 3. Composants

| # | Fichier | Rôle |
|---|---------|------|
| 00 | `00-fondations.html` | Tokens, couleurs, typo, textures |
| 01 | `01-header.html` | Header complet (strip, mega-menu, sous-menu, recherche, langue, drawer mobile, condensation au scroll) |
| 02 | `02-topPageText.html` | Hero texte + image (split classique) |
| 03 | `03-process.html` | Étapes / process |
| 04 | `04-statsBar.html` | Barre de statistiques (gradient latéral dark) |
| 05 | `05-compareCards.html` | Cartes avant / après |
| 06 | `06-tabs.html` | Onglets |
| 07 | `07-testimonials.html` | Avis (carousel à puces) |
| 08 | `08-priceList.html` | Prix — 1 carte (light) + 3 cartes (light), séparées par une bande |
| 09 | `09-priceListDark.html` | Prix — version dark (gradient latéral) |
| 10 | `10-finalCtaDark.html` | CTA final, section nuit |
| 11 | `11-faq.html` | FAQ accordéon (light + dark) |
| 12 | `12-cardBlocks.html` | Cartes en 4 apparences : image / icône / chiffre / titre seul |
| 13 | `13-fullwidthTextImage.html` | Bandeau image pleine largeur + parallax, texte centré |
| 14 | `14-mosaic.html` | Mosaïque : cartes (du 12) + panneaux-image, largeurs variables |
| 15 | `15-sectionHeading.html` | En-tête de section : eyebrow + titre + texte + CTA centré |
| 16 | `16-heroFullscreen.html` | Hero plein écran (100vh), vidéo + poster, header transparent → opaque |
| 17 | `17-forms.html` | Formulaires & contrôles (light + dark) : champs à label flottant, états (focus/erreur/succès/désactivé), **select custom** (1 choix / multiple / recherche), radio à disque, checkbox à carré, toggle, upload, formulaire de démo en « image splitée » |

Fichier partagé : **`orbita.css`** (toute la fondation — voir §2). Le composant 00
(`00-fondations.html`) reste autonome (page de référence du DS).

**Select custom (17)** : `<select>` natif masqué + UI stylée pilotée par JS
(data-driven via `data-set` / `data-multiple`). Recherche auto au-delà de
5 options, sélection multiple avec badges removables, navigation clavier,
événement `change` propagé sur le `<select>` natif (compatible form/React).

---

## 4. Notes d'intégration Next.js

1. **Tailwind** : remplacer le build navigateur par le plugin Tailwind
   (PostCSS/Vite). Les classes utilitaires se transfèrent **1:1** ; `orbita.css`
   + le `@theme inline` migrent dans `globals.css`.
2. **Tokens** : ils sont déjà centralisés dans `orbita.css` (`:root` +
   `[data-theme="…"]`). Le changement de silo se fait via `data-theme` sur un
   conteneur ; vitesse/courbe d'animation via `--t-dur` / `--t-ease`.
3. **Header (16)** : le markup et le JS sont **identiques au composant 01**.
   La transparence sur hero n'ajoute que :
   - 3 classes-crochets sur des éléments existants : `nav-ink` (logo),
     `nav-div` (séparateur), `btn-login` (Connexion) ;
   - un bloc CSS piloté par l'état existant `.hdr.is-scrolled`
     (voile rgba au repos → `paper` au scroll, bascule du texte).
   En prod, on peut remplacer les `!important` de ce bloc par une variante
   **`data-attribute`** (ex. `data-header="transparent"`) — purement cosmétique.
4. **Médias** : remplacer les URLs Unsplash/Pexels par vos assets ; pour le hero,
   brancher votre `<video>` (le `poster` sert de repli si la vidéo ne charge pas).
5. **Sélecteurs d'accent** : ce sont des aides de démo — à retirer à
   l'intégration (le silo est fixé par la page/marque).

---

## 5. Détection de scroll robuste (header)

Le composant 16 bascule transparent → opaque via **`IntersectionObserver`** sur
une sentinelle en haut de page, **plus** un fallback sur l'événement `scroll`.
L'IO est indépendant du conteneur de défilement (plus fiable que `scroll` seul).
