import {texts} from './languages';

/** Admin texts of page sections: settings, rows builder, mobile order, drawer, validation. */
export const sectionsText = texts({
  blocks: {
    section: {
      singular: {fr: 'Section', en: 'Section'},
      plural: {fr: 'Sections', en: 'Sections'},
    },
    sharedSection: {
      singular: {fr: 'Section partagée', en: 'Shared section'},
      plural: {fr: 'Sections partagées', en: 'Shared sections'},
    },
    sectionField: {fr: 'Section', en: 'Section'},
    sectionsField: {fr: 'Sections', en: 'Sections'},
    sectionsDescription: {fr: 'Les sections s’empilent de haut en bas sous le haut de page.', en: 'Sections stack from top to bottom below the page header.'},
    text: {
      name: {fr: 'Texte', en: 'Text'},
      plural: {fr: 'Textes', en: 'Texts'},
      group: {fr: 'Texte', en: 'Text'},
      field: {fr: 'Texte', en: 'Text'},
      description: {fr: 'Une ligne vide sépare deux paragraphes.', en: 'A blank line separates two paragraphs.'},
    },
  },
  settings: {
    collapsible: {fr: 'Réglages de la section', en: 'Section settings'},
    background: {fr: 'Fond', en: 'Background'},
    backgroundLight: {fr: 'Clair', en: 'Light'},
    backgroundDark: {fr: 'Nuit', en: 'Night'},
    backgroundMedia: {fr: 'Média (image ou vidéo)', en: 'Media (image or video)'},
    tint: {fr: 'Nuance', en: 'Shade'},
    tintBody: {fr: 'Fond de page', en: 'Page background'},
    tintHighlight: {fr: 'Highlight clair du silo', en: 'Silo light highlight'},
    texture: {fr: 'Texture', en: 'Texture'},
    textureNone: {fr: 'Aucune', en: 'None'},
    textureGrid: {fr: 'Trame', en: 'Grid'},
    textureDots: {fr: 'Points', en: 'Dots'},
    textureLosange: {fr: 'Losanges', en: 'Diamonds'},
    darkNight: {fr: 'Nuit', en: 'Night'},
    darkNightHalo: {fr: 'Nuit avec halo', en: 'Night with halo'},
    mediaType: {fr: 'Type de média', en: 'Media type'},
    mediaImage: {fr: 'Image', en: 'Image'},
    mediaVideo: {fr: 'Vidéo', en: 'Video'},
    image: {fr: 'Image de fond', en: 'Background image'},
    video: {fr: 'Vidéo de fond (mp4)', en: 'Background video (mp4)'},
    poster: {fr: "Image d'attente de la vidéo", en: 'Video poster image'},
    overlay: {fr: 'Calque noir sur le média (0 à 1)', en: 'Black overlay on the media (0 to 1)'},
    spacingTop: {fr: 'Espace en haut', en: 'Top spacing'},
    spacingBottom: {fr: 'Espace en bas', en: 'Bottom spacing'},
    anchor: {fr: 'Ancre (optionnelle)', en: 'Anchor (optional)'},
    anchorDescription: {fr: 'Identifiant pour un lien #ancre : minuscules, chiffres, tirets.', en: 'Identifier for an #anchor link: lowercase letters, digits, hyphens.'},
    gapX: {fr: 'Écart entre colonnes', en: 'Column gap'},
    gapY: {fr: 'Écart entre rangées', en: 'Row gap'},
    gapYMobile: {fr: 'Écart vertical mobile', en: 'Mobile vertical gap'},
    gapYMobileDescription: {fr: 'Sous 768 px, entre tous les blocs empilés.', en: 'Below 768 px, between all stacked blocks.'},
    siteGap: {fr: 'Réglage du site', en: 'Site setting'},
    saveAsShared: {fr: 'Enregistrer dans les sections partagées', en: 'Save to shared sections'},
    saveAsSharedDescription: {fr: 'À l’enregistrement, la section est copiée dans « Sections partagées » et la page y fait référence.', en: 'On save, the section is copied to “Shared sections” and the page references it.'},
    sharedTitle: {fr: 'Nom de la section partagée', en: 'Shared section name'},
    /** Title of a section saved as shared without a name. */
    sharedDefaultTitle: {
      fr: ({page, n}: {page: string | null; n: number}) => `${page ?? 'Page'} · section ${n}`,
      en: ({page, n}: {page: string | null; n: number}) => `${page ?? 'Page'} · section ${n}`,
    },
  },
  rows: {
    collapsible: {fr: 'Rangées', en: 'Rows'},
    label: {fr: 'Rangées', en: 'Rows'},
    singular: {fr: 'Rangée', en: 'Row'},
    plural: {fr: 'Rangées', en: 'Rows'},
    description: {
      fr: 'Chaque rangée découpe la largeur en colonnes dont les largeurs font 12. Une colonne peut rester vide. Sous 768 px, les colonnes passent en pleine largeur, dans l’ordre mobile de la section (bouton téléphone) ; les colonnes vides y sont masquées.',
      en: 'Each row splits the width into columns whose widths add up to 12. A column can stay empty. Below 768 px, columns go full width, in the section’s mobile order (phone button); empty columns are hidden there.',
    },
    columns: {fr: 'Colonnes', en: 'Columns'},
    column: {fr: 'Colonne', en: 'Column'},
    width: {fr: 'Largeur', en: 'Width'},
    contents: {fr: 'Contenu', en: 'Content'},
    component: {fr: 'Composant', en: 'Component'},
    components: {fr: 'Composants', en: 'Components'},
    contentsDescription: {fr: 'Un seul composant par colonne. Pour en changer, videz la colonne puis choisissez-en un autre.', en: 'One component per column. To change it, empty the column and then pick another one.'},
  },
  builder: {
    layout: {fr: 'Disposition', en: 'Layout'},
    tileTitle: {
      fr: ({label}: {label: string}) => `${label} · clic : remplacer la rangée sélectionnée · double clic : ajouter une rangée`,
      en: ({label}: {label: string}) => `${label} · click: replace the selected row · double click: add a row`,
    },
    cellAria: {
      fr: ({n, span, contents}: {n: number; span: number; contents: string | null}) => `Colonne ${n}, ${span} sur 12, ${contents ?? 'vide'}`,
      en: ({n, span, contents}: {n: number; span: number; contents: string | null}) => `Column ${n}, ${span} of 12, ${contents ?? 'empty'}`,
    },
    cellEmptyTitle: {fr: 'Vide, cliquer pour remplir', en: 'Empty, click to fill'},
    cellEditTitle: {
      fr: ({contents}: {contents: string}) => `${contents} · cliquer pour modifier`,
      en: ({contents}: {contents: string}) => `${contents} · click to edit`,
    },
    cellSelectTitle: {fr: 'Cliquer pour sélectionner la rangée, puis cliquer la colonne pour la modifier', en: 'Click to select the row, then click the column to edit it'},
    moveColumnAria: {
      fr: ({n}: {n: number}) => `Déplacer la colonne ${n}`,
      en: ({n}: {n: number}) => `Move column ${n}`,
    },
    moveColumnTitle: {fr: 'Glisser pour déplacer la colonne', en: 'Drag to move the column'},
    empty: {fr: 'Vide', en: 'Empty'},
    narrow: {
      fr: ({min}: {min: number}) => `Trop étroit : ${min} colonnes min.`,
      en: ({min}: {min: number}) => `Too narrow: ${min} columns min.`,
    },
    wide: {
      fr: ({max}: {max: number}) => `Trop large : ${max} colonnes max.`,
      en: ({max}: {max: number}) => `Too wide: ${max} columns max.`,
    },
    helpNoSelection: {
      fr: 'Double clic sur une disposition : ajoute une rangée. Clic sur une rangée : la sélectionne ; ensuite, un clic sur une de ses colonnes l’ouvre, un clic sur une disposition la remplace.',
      en: 'Double click a layout: adds a row. Click a row: selects it; then clicking one of its columns opens it, clicking a layout replaces it.',
    },
    helpSelected: {
      fr: ({n}: {n: number}) => `Rangée ${n} sélectionnée. Clic sur une de ses colonnes : l’ouvre. Clic sur une disposition : la remplace (après confirmation). Double clic : ajoute une rangée dessous.`,
      en: ({n}: {n: number}) => `Row ${n} selected. Click one of its columns: opens it. Click a layout: replaces it (after confirmation). Double click: adds a row below.`,
    },
    rowHasError: {fr: 'Une rangée contient une erreur : ouvrez ses colonnes.', en: 'A row contains an error: open its columns.'},
    rowAria: {
      fr: ({n, selected}: {n: number; selected: boolean}) => `Rangée ${n}${selected ? ', sélectionnée' : ''}`,
      en: ({n, selected}: {n: number; selected: boolean}) => `Row ${n}${selected ? ', selected' : ''}`,
    },
    loading: {fr: 'Chargement…', en: 'Loading…'},
    emptyRow: {fr: 'Sélectionnez cette rangée puis une disposition.', en: 'Select this row, then a layout.'},
    moveRowAria: {
      fr: ({n}: {n: number}) => `Déplacer la rangée ${n}`,
      en: ({n}: {n: number}) => `Move row ${n}`,
    },
    moveRowTitle: {fr: 'Glisser pour déplacer', en: 'Drag to move'},
    duplicateAria: {
      fr: ({n}: {n: number}) => `Dupliquer la rangée ${n}`,
      en: ({n}: {n: number}) => `Duplicate row ${n}`,
    },
    duplicate: {fr: 'Dupliquer', en: 'Duplicate'},
    mobileOrderAria: {
      fr: ({n}: {n: number}) => `Ordre mobile de la section (depuis la rangée ${n})`,
      en: ({n}: {n: number}) => `Section mobile order (from row ${n})`,
    },
    mobileOrder: {fr: 'Ordre mobile de la section', en: 'Section mobile order'},
    removeAria: {
      fr: ({n}: {n: number}) => `Supprimer la rangée ${n}`,
      en: ({n}: {n: number}) => `Delete row ${n}`,
    },
    remove: {fr: 'Supprimer', en: 'Delete'},
  },
  confirm: {
    cancel: {fr: 'Annuler', en: 'Cancel'},
    remove: {fr: 'Supprimer', en: 'Delete'},
    replace: {fr: 'Remplacer', en: 'Replace'},
    removeHeading: {
      fr: ({n}: {n: number}) => `Supprimer la rangée ${n} ?`,
      en: ({n}: {n: number}) => `Delete row ${n}?`,
    },
    /** columns: number of columns of the row; filled: how many hold a component. */
    removeBody: {
      fr: ({columns, filled}: {columns: number; filled: number}) => {
        const subject = columns === 1 ? 'Sa colonne' : `Ses ${columns} colonnes`;
        const components = filled ? ` et ${filled} composant${filled > 1 ? 's' : ''}` : '';
        // agreement: feminine for columns alone, masculine as soon as there are components
        const verb = filled ? 'seront supprimés' : columns === 1 ? 'sera supprimée' : 'seront supprimées';
        return `${subject}${components} ${verb}. Définitif à l’enregistrement de la page.`;
      },
      en: ({columns, filled}: {columns: number; filled: number}) => {
        const subject = columns === 1 ? 'Its column' : `Its ${columns} columns`;
        const components = filled ? ` and ${filled} component${filled > 1 ? 's' : ''}` : '';
        return `${subject}${components} will be deleted. Permanent once the page is saved.`;
      },
    },
    replaceHeading: {
      fr: ({n}: {n: number}) => `Remplacer la disposition de la rangée ${n} ?`,
      en: ({n}: {n: number}) => `Replace the layout of row ${n}?`,
    },
    replaceWidthsBody: {
      fr: ({from, to}: {from: string; to: string}) => `Les largeurs passent de ${from} à ${to}. Les composants restent dans leurs colonnes.`,
      en: ({from, to}: {from: string; to: string}) => `Widths change from ${from} to ${to}. Components stay in their columns.`,
    },
    replaceColumnsBody: {
      fr: ({from, to, filled}: {from: string; to: string; filled: number}) =>
        `La rangée passe de ${from} à ${to} : ses colonnes sont recréées vides${filled ? `, ${filled} composant${filled > 1 ? 's' : ''} ${filled > 1 ? 'seront supprimés' : 'sera supprimé'}` : ''}. Définitif à l’enregistrement de la page.`,
      en: ({from, to, filled}: {from: string; to: string; filled: number}) =>
        `The row changes from ${from} to ${to}: its columns are recreated empty${filled ? `, ${filled} component${filled > 1 ? 's' : ''} will be deleted` : ''}. Permanent once the page is saved.`,
    },
  },
  mobileOrder: {
    heading: {fr: 'Ordre mobile de la section', en: 'Section mobile order'},
    intro: {
      fr: ({n}: {n: number}) => `Sous 768 px, toutes les colonnes de la section s’empilent dans cet ordre, rangées confondues : glissez une ligne par sa poignée pour la déplacer. Les colonnes vides sont masquées. En évidence : la rangée ${n}.`,
      en: ({n}: {n: number}) => `Below 768 px, all the section’s columns stack in this order, across rows: drag a line by its handle to move it. Empty columns are hidden. Highlighted: row ${n}.`,
    },
    where: {
      fr: ({row, col, span}: {row: number; col: number; span: number}) => `rangée ${row} · colonne ${col} · ${span}/12`,
      en: ({row, col, span}: {row: number; col: number; span: number}) => `row ${row} · column ${col} · ${span}/12`,
    },
    moveAria: {
      fr: ({where}: {where: string}) => `Déplacer sur mobile : ${where}`,
      en: ({where}: {where: string}) => `Move on mobile: ${where}`,
    },
    moveTitle: {fr: 'Glisser pour changer l’ordre mobile', en: 'Drag to change the mobile order'},
    nothing: {fr: 'Aucune colonne remplie : rien ne s’affiche sur mobile.', en: 'No filled column: nothing shows on mobile.'},
    /** emptyCell: the column holds an « empty cell » block (otherwise it has nothing). */
    hidden: {
      fr: ({emptyCell}: {emptyCell: boolean}) => `${emptyCell ? 'case vide' : 'vide'}, masquée sur mobile`,
      en: ({emptyCell}: {emptyCell: boolean}) => `${emptyCell ? 'empty cell' : 'empty'}, hidden on mobile`,
    },
    reset: {fr: 'Reprendre l’ordre desktop', en: 'Use the desktop order'},
    close: {fr: 'Fermer', en: 'Close'},
  },
  drawer: {
    title: {
      fr: ({row, col, span}: {row: number; col: number; span: number}) => `Rangée ${row} · colonne ${col} · ${span} / 12`,
      en: ({row, col, span}: {row: number; col: number; span: number}) => `Row ${row} · column ${col} · ${span} / 12`,
    },
    fallbackTitle: {fr: 'Colonne', en: 'Column'},
    clear: {fr: 'Vider la colonne', en: 'Empty the column'},
    close: {fr: 'Fermer', en: 'Close'},
    blockName: {fr: 'Nom affiché dans le constructeur', en: 'Name shown in the builder'},
    blockNameDescription: {
      fr: ({label, length, max}: {label: string; length: number; max: number}) => `Remplace « ${label} » dans la case. ${length}/${max} caractères.`,
      en: ({label, length, max}: {label: string; length: number; max: number}) => `Replaces “${label}” in the cell. ${length}/${max} characters.`,
    },
  },
  validation: {
    tooNarrow: {
      fr: ({block, min, span}: {block: string; min: number; span: number}) => `« ${block} » a besoin d'au moins ${min} colonnes ; cette colonne en fait ${span}.`,
      en: ({block, min, span}: {block: string; min: number; span: number}) => `“${block}” needs at least ${min} columns; this column has ${span}.`,
    },
    tooWide: {
      fr: ({block, max, span}: {block: string; max: number; span: number}) => `« ${block} » ne dépasse pas ${max} colonnes ; cette colonne en fait ${span}.`,
      en: ({block, max, span}: {block: string; max: number; span: number}) => `“${block}” must not exceed ${max} columns; this column has ${span}.`,
    },
    rowTotal: {
      fr: ({total}: {total: number}) => `Les largeurs des colonnes font ${total} ; il en faut 12.`,
      en: ({total}: {total: number}) => `Column widths add up to ${total}; 12 are needed.`,
    },
    rowEmpty: {fr: 'Une rangée contient au moins une colonne.', en: 'A row has at least one column.'},
    oneComponent: {fr: 'Un seul composant par colonne.', en: 'Only one component per column.'},
    nameTooLong: {
      fr: ({max}: {max: number}) => `Nom affiché trop long : ${max} caractères au plus.`,
      en: ({max}: {max: number}) => `Display name too long: ${max} characters at most.`,
    },
    anchor: {fr: 'Minuscules, chiffres et tirets uniquement.', en: 'Lowercase letters, digits and hyphens only.'},
  },
});
