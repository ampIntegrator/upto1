# Icônes Nucleo — dépôt des SVG sources

Déposer ici les SVG Nucleo. Ils seront convertis en composants React
(`src/theme/icons/`) et branchés dans le thème Astryx et dans nos composants.

## Format attendu
- Un fichier par icône, nommé par sa clé : `chevron-down.svg`, `arrow-right.svg`…
- ViewBox carré 18 × 18 (grille Nucleo 18 px). Les attributs `width` / `height` sont retirés à la conversion.
- Traits et remplissages en `currentColor` (option d'export Nucleo). Une couleur en dur est corrigée à la conversion, mais autant l'éviter.
- Une seule épaisseur de trait pour tout le lot (1 ou 1,5), à choisir une fois pour toutes.
- Pas de `<title>` : l'accessibilité est gérée par le composant Icon.
- Pas de `<style>`, pas d'identifiants dupliqués, pas de police embarquée.

## `astryx/` — le jeu de base (64 icônes)
Toutes les icônes de socle : les 28 noms sémantiques Astryx (chevrons, croix,
coche, recherche, calendrier, états…), le chrome du site (flèches, téléphone,
mail, upload, pin, globe), les réseaux sociaux et les icônes de contenu de
départ. C'est le jeu livré avec le design system.

## `vidomia/` — les icônes ajoutées au fil du projet
Icônes propres au site Vidomia, déposées au fur et à mesure des besoins
(contenu éditorial, pictos métier…). Elles apparaissent automatiquement dans
le second bloc de la page `/design/fondations/icones` après `pnpm icons:build`.
Une clé déjà présente dans `astryx/` est ignorée (le jeu de base a priorité).

## Nommage
Nommer le fichier par la clé (`chevron-down.svg`, `arrow-right.svg`), sans le
préfixe de taille Nucleo (`18-`, `32-`). Le code utilise cette clé ; Payload
la stockera pour les icônes choisies par les éditeurs.
