# Orbita — Inventaire des icônes (remplacement police d'icônes)

Référence pour remplacer les `<svg>` inline par une police d'icônes (type Font Awesome, autre).
**29 signatures distinctes · 154 occurrences** dans les 19 composants.

> Convention couleur : tous les SVG actuels héritent de `currentColor` (`stroke="currentColor"`).
> Une police d'icônes hérite aussi de `color` → les comportements de hover (flèche qui passe en blanc, etc.) restent identiques.

---

## 1. Icônes de BASE du site (chrome fixe)

Présentes en dur dans l'UI structurelle (boutons, header, formulaires, navigation, footer).
Ce sont elles qu'il faut mapper **en priorité**.

| Clé | Icône | Tracé SVG actuel (`d=`) | Occ. | Composants |
|-----|-------|--------------------------|------|------------|
| `arrow-right` | Flèche droite | `M5 12h14M13 6l6 6-6 6` | **32** | partout : split-button, CTA cartes, « voir plus », liens, hero, forms |
| `check` | Coche | `M20 6 9 17l-5-5` | 22 | compareCards, priceList, priceListDark, forms |
| `chevron-down` | Chevron bas | `M2.5 4.5 6 8l3.5-3.5` (+ variante hero `m6 9 6 6 6-6`) | 12 | header (nav, langue), forms (select), hero (scroll) |
| `search` | Loupe | `<circle r=7>` + `m21 21-4.3-4.3` | 7 | header, hero, forms |
| `close` | Croix / fermer | `M18 6 6 18M6 6l12 12` | 6 | header (recherche), compareCards, hero |
| `clock` | Horloge | `<circle>` + `M12 7v5l3 2` | 6 | header (strip horaires), process, hero |
| `phone` | Téléphone | `M22 16.9v3a2 2 0 0 1-2.2 2 …` | 5 | header (strip), hero, forms |
| `mail` | Enveloppe | `<rect>` + `m2 6 10 7L22 6` | 3 | header (strip), hero |
| `chevron-right` | Chevron droit | `m9 6 6 6-6 6` | 2 | post de blog (breadcrumb) |
| `arrow-left` | Flèche gauche | `M19 12H5M11 18l-6-6 6-6` | 1 | testimonials (carousel) |
| `play` | Lecture (triangle) | `M8 5v14l11-7z` | 1 | hero (vidéo) |
| `info` | Info (i cerclé) | `<circle>` + `M12 8h.01M11 12h1v4h1` | 2 | forms (message d'aide) |
| `alert` | Alerte (! cerclé) | `<circle>` + `M12 8v5M12 16h.01` | 2 | forms (erreur) |
| `upload` | Upload | `M12 16V4M7 9l5-5 5 5` + `M5 20h14` | 2 | forms (zone d'upload) |

### Réseaux sociaux (chrome fixe — remplacer si la police les fournit, sinon garder en SVG)

| Clé | Icône | Occ. | Composants |
|-----|-------|------|------------|
| `linkedin` | LinkedIn | 3 | header (strip), hero |
| `x-twitter` | X / Twitter | 3 | header (strip), hero |
| `youtube` | YouTube | 3 | header (strip), hero |

---

## 2. Icônes BACK-OFFICE (choisies par les éditeurs, plus tard)

Icônes **liées au contenu** : elles illustrent des entrées de menu, des cartes produit, des
items éditoriaux. Elles seront **sélectionnées dans le back-office** au cas par cas.
Aujourd'hui codées en dur uniquement dans le **header (01)**, le **hero (16)** et les
**cartes de démo (12 & 14)** — c'est-à-dire des exemples, pas de l'UI fixe.

| Clé | Icône | Tracé SVG actuel (`d=`) | Occ. | Composants |
|-----|-------|--------------------------|------|------------|
| `clipboard-check` | Presse-papier coché (chiffrage instantané) | `M9 11 12 14 22 4` + `M21 12v7a2 2 …` | 4 | header, hero |
| `trending-up` | Graphique en hausse (suivi des coûts) | `M3 3v18h18` + `m7 14 3-3 3 3 5-5` | 4 | header, hero |
| `table` | Tableau / devis | `<rect>` + `M3 9h18M8 4v16` | 4 | header, hero |
| `building` | Bâtiment (architectes) | `M2 20h20M4 20V8l8-5 8 5v12M9 20v-6h6v6` | 4 | header, hero |
| `file` | Fichier (maîtres d'œuvre) | `M14 3v4a2 2 0 0 0 2 2h4` + `M5 3h9l6 6v10 …` | 4 | header, hero |
| `user` | Utilisateur (promoteurs) | `<circle>` + `M4 21a8 8 0 0 1 16 0` | 4 | header, hero |
| `book` | Livre (guides & livres blancs) | `M4 19.5A2.5 2.5 0 0 1 6.5 17H20` + `M6.5 2H20v20 …` | 4 | header, hero |
| `monitor` | Écran (webinaires) | `<rect>` + `M8 21h8M12 17v4` | 4 | header, hero |
| `edit` | Crayon (blog / édition) | `M12 20h9` + `M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z` | 4 | header, hero |
| `shield-check` | Bouclier coché (validation expert) | `M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z` + `m9 12 2 2 4-4` | 2 | cartes démo 12 & 14 |

> Note : `clipboard-check` / `trending-up` / `file` apparaissent **aussi** dans les cartes de
> démo 12 & 14 (objet `ICONS` : `check`, `chart`, `doc`, `shield`). Même mapping.

---

## 3. À NE PAS remplacer

- **Glyphe logo Orbita** — l'anneau d'orbite (`<circle r=7>` seul, 4× dans 00/01/16/18). C'est la **marque**, reste en SVG.
- **Losange animé** du séparateur de carte (`.card-sep`) et **petits diamants** des badges / puces de liste : ce sont des **formes CSS** (`transform: rotate(45deg)`), pas des SVG.
- **Boutons +/− de la FAQ** : pseudo-éléments CSS animés, pas des icônes.

---

## 4. Pour lancer le remplacement

Fournir :
1. La **police** (`.woff2` + `@font-face`, ou lien CDN).
2. Le **tableau de correspondance** : pour chaque clé ci-dessus → la classe de la police
   (ex. `arrow-right` → `xx-arrow-right`).

Je signalerai toute clé sans équivalent dans la police. Les animations portées sur les `<svg>`
(`arwPop` du split-button, rotation du chevron, `translateX` de la flèche) seront rebasculées
sur l'élément `<i>` — mêmes sélecteurs.
