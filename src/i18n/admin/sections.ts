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
  },
  settings: {
    collapsible: {fr: 'Réglages de la section', en: 'Section settings'},
    // headings of the setting groups (a rule and a title, nothing stored)
    groupBackground: {fr: 'Fond de la section', en: 'Section background'},
    groupEdge: {fr: 'Liseré', en: 'Edge line'},
    groupSpacing: {fr: 'Espaces intérieurs', en: 'Inner spacing'},
    groupGaps: {fr: 'Écarts de la grille', en: 'Grid gaps'},
    // what each group does: shown in the « i » bubble beside its heading
    groupBackgroundHelp: {
      fr: 'Le fond de la section : clair, nuit ou média (une image ou une vidéo derrière le contenu). Sur un fond clair, la nuance donne la couleur et la texture ajoute un motif discret.',
      en: 'The section’s background: light, night or media (an image or a video behind the content). On a light background, the shade sets the colour and the texture adds a discreet pattern.',
    },
    groupEdgeHelp: {fr: 'Marque la jonction avec la section du dessus. Automatique : seulement entre deux fonds clairs de même nuance dont la texture change.', en: 'Marks the junction with the section above. Automatic: only between two light backgrounds of the same shade whose texture changes.'},
    groupSpacingHelp: {
      fr: 'L’espace laissé à l’intérieur de la section, au-dessus et au-dessous de son contenu (son « padding ») : il éloigne le contenu des sections voisines.',
      en: 'The room left inside the section, above and below its content (its padding): it keeps the content away from the neighbouring sections.',
    },
    groupGapsHelp: {
      fr: 'L’écart entre les colonnes d’une rangée, et entre les rangées. « Réglage du site » reprend la valeur par défaut du site. Écart vertical mobile : sous 768 px, entre tous les blocs empilés.',
      en: 'The gap between the columns of a row, and between the rows. “Site setting” takes the site’s default value. Mobile vertical gap: below 768 px, between all stacked blocks.',
    },
    backgroundLight: {fr: 'Clair', en: 'Light'},
    backgroundDark: {fr: 'Nuit', en: 'Night'},
    // short: the three choices stay on one line in the dialog's column (the next field asks image or video)
    backgroundMedia: {fr: 'Média', en: 'Media'},
    tint: {fr: 'Nuance', en: 'Shade'},
    tintBody: {fr: 'Fond de page (background-body)', en: 'Page background (background-body)'},
    tintLight: {fr: 'Silo clair (background-light)', en: 'Light silo (background-light)'},
    tintHighlight: {fr: 'Highlight clair (highlight-light)', en: 'Light highlight (highlight-light)'},
    texture: {fr: 'Texture', en: 'Texture'},
    edgeTopAuto: {fr: 'Automatique', en: 'Automatic'},
    edgeTopAlways: {fr: 'Toujours', en: 'Always'},
    edgeTopNever: {fr: 'Jamais', en: 'Never'},
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
    siteGap: {fr: 'Réglage du site', en: 'Site setting'},
    saveAsShared: {fr: 'Enregistrer dans les sections partagées', en: 'Save to shared sections'},
    saveAsSharedDescription: {fr: 'Coché : à l’enregistrement de la page, la section est copiée dans « Sections partagées » sous le nom de la section (son en-tête) et la page y fait référence.', en: 'Checked: when the page is saved, the section is copied to “Shared sections” under the section’s name (its header) and the page refers to it.'},
  },
  rows: {
    collapsible: {fr: 'Rangées', en: 'Rows'},
    label: {fr: 'Rangées', en: 'Rows'},
    singular: {fr: 'Rangée', en: 'Row'},
    plural: {fr: 'Rangées', en: 'Rows'},
    description: {
      fr: 'Chaque rangée découpe la largeur en colonnes dont les largeurs font 12. Une colonne peut rester vide. Sous 768 px, les colonnes passent en pleine largeur, dans l’ordre mobile de la section ; les colonnes vides y sont masquées.',
      en: 'Each row splits the width into columns whose widths add up to 12. A column can stay empty. Below 768 px, columns go full width, in the section’s mobile order; empty columns are hidden there.',
    },
    columns: {fr: 'Colonnes', en: 'Columns'},
    column: {fr: 'Colonne', en: 'Column'},
    width: {fr: 'Largeur', en: 'Width'},
    contents: {fr: 'Contenu', en: 'Content'},
    component: {fr: 'Composant', en: 'Component'},
    components: {fr: 'Composants', en: 'Components'},
    contentsDescription: {fr: 'Un seul composant par colonne. Pour en changer, vide la colonne puis choisis-en un autre.', en: 'One component per column. To change it, empty the column and then pick another one.'},
  },
  builder: {
    layout: {fr: 'Disposition', en: 'Layout'},
    tileTitle: {
      fr: ({label}: {label: string}) => `${label} · à glisser sur la ligne des rangées (Entrée : ajoute la rangée à la fin)`,
      en: ({label}: {label: string}) => `${label} · drag onto the line of rows (Enter: adds the row at the end)`,
    },
    cellAria: {
      fr: ({n, span, contents}: {n: number; span: number; contents: string | null}) => `Colonne ${n}, ${span} sur 12, ${contents ?? 'vide'}`,
      en: ({n, span, contents}: {n: number; span: number; contents: string | null}) => `Column ${n}, ${span} of 12, ${contents ?? 'empty'}`,
    },
    cellEmptyTitle: {fr: 'Vide · double clic : choisir un composant', en: 'Empty · double click: choose a component'},
    cellEditTitle: {
      fr: ({contents}: {contents: string}) => `${contents} · double clic : modifier le contenu`,
      en: ({contents}: {contents: string}) => `${contents} · double click: edit the content`,
    },
    moveColumnTitle: {fr: 'Glisser pour déplacer la colonne', en: 'Drag to move the column'},
    narrow: {
      fr: ({min}: {min: number}) => `Trop étroit : ${min} colonnes min.`,
      en: ({min}: {min: number}) => `Too narrow: ${min} columns min.`,
    },
    wide: {
      fr: ({max}: {max: number}) => `Trop large : ${max} colonnes max.`,
      en: ({max}: {max: number}) => `Too wide: ${max} columns max.`,
    },
    help: {
      fr: 'Glisse une disposition sur la ligne du dessous : entre deux rangées ou à la fin, elle ajoute une rangée ; sur une rangée, elle remplace son découpage. Double clic sur une colonne : ouvre son contenu.',
      en: 'Drag a layout onto the line below: between two rows or at the end it adds a row; on a row it replaces its layout. Double click a column: opens its content.',
    },
    helpLabel: {fr: 'Mode d’emploi', en: 'How it works'},
    dropHere: {fr: 'Dépose une disposition ici', en: 'Drop a layout here'},
    helpUnavailable: {fr: 'Choisis d’abord un fond (onglet Fond et espaces) : les rangées se règlent ensuite ici.', en: 'Choose a background first (Background and spacing tab): the rows are then set here.'},
    rowHasError: {fr: 'Une rangée contient une erreur : double-clique ses colonnes pour la corriger.', en: 'A row contains an error: double-click its columns to fix it.'},
    rowAria: {
      fr: ({n, selected}: {n: number; selected: boolean}) => `Rangée ${n}${selected ? ', sélectionnée' : ''}`,
      en: ({n, selected}: {n: number; selected: boolean}) => `Row ${n}${selected ? ', selected' : ''}`,
    },
    rowNameEdit: {
      fr: ({n}: {n: number}) => `Nommer la rangée ${n}`,
      en: ({n}: {n: number}) => `Name row ${n}`,
    },
    rowNameTitle: {
      fr: ({max}: {max: number}) => `Cliquer pour nommer la rangée (${max} caractères au plus)`,
      en: ({max}: {max: number}) => `Click to name the row (${max} characters at most)`,
    },
    rowNamePlaceholder: {fr: 'Nom de la rangée', en: 'Row name'},
    loading: {fr: 'Chargement…', en: 'Loading…'},
    emptyRow: {fr: 'Glisse une disposition sur cette rangée.', en: 'Drag a layout onto this row.'},
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
      fr: ({n}: {n: number}) => `Sous 768 px, toutes les colonnes de la section s’empilent dans cet ordre, rangées confondues : glisse une ligne par sa poignée pour la déplacer. Les colonnes vides sont masquées. En évidence : la rangée ${n}.`,
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
  manager: {
    open: {fr: 'Gérer', en: 'Manage'},
    openDescription: {fr: 'Fond, découpage et blocs de la section, avec l’aperçu en direct.', en: 'Background, layout and blocks of the section, with the live preview.'},
    title: {fr: 'Gérer la section', en: 'Manage the section'},
    summaryLabel: {fr: 'Section', en: 'Section'},
    close: {fr: 'Fermer', en: 'Close'},
    save: {fr: 'Enregistrer', en: 'Save'},
    saveAndClose: {fr: 'Enregistrer et fermer', en: 'Save and close'},
    errors: {
      fr: ({n}: {n: number}) => (n > 1 ? `${n} champs à corriger` : '1 champ à corriger'),
      en: ({n}: {n: number}) => (n > 1 ? `${n} fields to fix` : '1 field to fix'),
    },
    panelSettings: {fr: 'Fond et espaces', en: 'Background and spacing'},
    panelLayout: {fr: 'Découpage', en: 'Layout'},
    panelBlocks: {fr: 'Composants', en: 'Components'},
    panelContent: {fr: 'Contenu', en: 'Content'},
    libraryGuide: {
      fr: 'Glisse un composant sur une colonne de l’aperçu. Le curseur « interdit » signale une colonne trop étroite ou trop large pour lui. Un clic le place dans la colonne sélectionnée.',
      en: 'Drag a component onto a column of the preview. The “not allowed” cursor marks a column too narrow or too wide for it. A click places it in the selected column.',
    },
    libraryMin: {
      fr: ({min}: {min: number}) => `dès ${min} / 12`,
      en: ({min}: {min: number}) => `from ${min} / 12`,
    },
    libraryRange: {
      fr: ({min, max}: {min: number; max: number}) => (min === max ? `${min} / 12` : `de ${min} à ${max} / 12`),
      en: ({min, max}: {min: number; max: number}) => (min === max ? `${min} / 12` : `${min} to ${max} / 12`),
    },
    contentNone: {
      fr: 'Aucun composant à modifier : double-clique une colonne remplie dans un carré de l’onglet Découpage, ou clique le crayon d’une colonne dans l’aperçu.',
      en: 'No component to edit: double-click a filled column in a square of the Layout tab, or click the pencil of a column in the preview.',
    },
    contentEmpty: {fr: 'Cette colonne est vide : double-clique-la pour choisir un composant, ou glisses-en un depuis l’onglet Composants.', en: 'This column is empty: double-click it to choose a component, or drag one from the Components tab.'},
    pickTitle: {fr: 'Choisir un composant', en: 'Choose a component'},
    pickNone: {fr: 'Aucun composant ne tient dans cette largeur : élargis la colonne dans l’onglet Découpage.', en: 'No component fits this width: widen the column in the Layout tab.'},
    contentTitle: {
      fr: ({row, col, span}: {row: number; col: number; span: number}) => `Rangée ${row} · colonne ${col} · ${span} / 12`,
      en: ({row, col, span}: {row: number; col: number; span: number}) => `Row ${row} · column ${col} · ${span} / 12`,
    },
    replaceHeading: {fr: 'Remplacer le composant ?', en: 'Replace the component?'},
    replaceBody: {
      fr: ({from, to}: {from: string; to: string}) => `Cette colonne contient « ${from} ». Le remplacer par « ${to} » efface son contenu.`,
      en: ({from, to}: {from: string; to: string}) => `This column holds “${from}”. Replacing it with “${to}” erases its content.`,
    },
    replace: {fr: 'Remplacer', en: 'Replace'},
    cancel: {fr: 'Annuler', en: 'Cancel'},
    fieldClose: {fr: 'Fermer', en: 'Close'},
    dropZone: {
      fr: ({row, col}: {row: number; col: number}) => `Rangée ${row}, colonne ${col}`,
      en: ({row, col}: {row: number; col: number}) => `Row ${row}, column ${col}`,
    },
    preview: {fr: 'Aperçu en direct', en: 'Live preview'},
    width: {fr: 'Largeur de l’aperçu', en: 'Preview width'},
    widthFull: {fr: 'Pleine largeur', en: 'Full width'},
    resize: {fr: 'Ajuster la hauteur des réglages et de l’aperçu (double clic : hauteur d’origine)', en: 'Adjust the height of the settings and of the preview (double click: original height)'},
  },
  drawer: {
    clear: {fr: 'Vider la colonne', en: 'Empty the column'},
  },
  // texts drawn inside the preview frame (the host's preview page), in the admin's language
  preview: {
    columns: {fr: 'Colonnes', en: 'Columns'},
    toComplete: {
      fr: ({label}: {label: string}) => `${label} · à compléter`,
      en: ({label}: {label: string}) => `${label} · to complete`,
    },
    emptyTitle: {fr: 'Rien à afficher pour l’instant', en: 'Nothing to show yet'},
    emptyDescription: {fr: 'Choisis un fond pour la section.', en: 'Choose a background for the section.'},
    errorTitle: {fr: 'L’aperçu n’a pas pu s’afficher', en: 'The preview could not be shown'},
    errorDescription: {fr: 'Continue la saisie : l’aperçu réessaie à la prochaine modification.', en: 'Keep typing: the preview tries again at the next change.'},
    adminOnlyTitle: {fr: 'Aperçu réservé à l’admin', en: 'Preview for the admin only'},
    adminOnlyDescription: {fr: 'Reconnecte-toi à l’administration pour voir l’aperçu.', en: 'Log in to the admin again to see the preview.'},
    editColumn: {fr: 'Modifier le contenu de la colonne', en: 'Edit the column’s content'},
    editColumnShort: {fr: 'Modifier le contenu', en: 'Edit the content'},
  },
  validation: {
    sharedNameTaken: {
      fr: ({name}: {name: string}) => `Une section partagée s’appelle déjà « ${name} » : renomme la section.`,
      en: ({name}: {name: string}) => `A shared section is already named “${name}”: rename the section.`,
    },
    sharedNeedsName: {fr: 'Nomme la section (son en-tête) pour l’enregistrer dans les sections partagées.', en: 'Name the section (its header) to save it to the shared sections.'},
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
    hiddenBlock: {
      fr: ({name}: {name: string}) => `« ${name} » n’est plus proposé dans les colonnes.`,
      en: ({name}: {name: string}) => `« ${name} » is no longer offered in columns.`,
    },
    nameTooLong: {
      fr: ({max}: {max: number}) => `Nom affiché trop long : ${max} caractères au plus.`,
      en: ({max}: {max: number}) => `Display name too long: ${max} characters at most.`,
    },
    anchor: {fr: 'Minuscules, chiffres et tirets uniquement.', en: 'Lowercase letters, digits and hyphens only.'},
  },
});
