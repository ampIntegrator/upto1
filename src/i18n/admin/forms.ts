import {texts} from './languages';

/**
 * Admin texts of the forms (plugin-form-builder, « Formulaires » group): the two collections, the
 * fields and field blocks added to the plugin's, and the « Formulaire » column block. The plugin's
 * own fields carry its translations (French included).
 */
export const formsText = texts({
  forms: {singular: {fr: 'Formulaire', en: 'Form'}, plural: {fr: 'Formulaires', en: 'Forms'}},
  submissions: {singular: {fr: 'Réponse', en: 'Submission'}, plural: {fr: 'Réponses', en: 'Submissions'}},
  title: {fr: 'Titre', en: 'Title'},
  titleDescription: {fr: 'Affiché au-dessus des champs et dans la liste des formulaires. Un mot entre <span>…</span> passe en serif accentué sur le site.', en: 'Shown above the fields and in the forms list. A word between <span>…</span> is set in accent serif on the site.'},
  eyebrow: {fr: 'Surtitre (facultatif)', en: 'Eyebrow (optional)'},
  eyebrowStyle: {fr: 'Style du surtitre', en: 'Eyebrow style'},
  eyebrowText: {fr: 'Texte (petites capitales)', en: 'Text (small caps)'},
  eyebrowBadge: {fr: 'Badge', en: 'Badge'},
  intro: {fr: 'Chapô (facultatif)', en: 'Lead (optional)'},
  tabs: {
    form: {fr: 'Formulaire', en: 'Form'},
    after: {fr: 'Après l’envoi', en: 'After sending'},
    emails: {fr: 'E-mails', en: 'Emails'},
  },
  afterDescription: {fr: 'Ce que voit le visiteur une fois le formulaire envoyé : un message à la place du formulaire, ou une autre page.', en: 'What the visitor sees once the form is sent: a message in place of the form, or another page.'},
  emailsDescription: {fr: 'Envoyés à chaque réponse, une fois le service d’envoi configuré (tech lead). En attendant, les réponses sont rangées dans Formulaires › Réponses.', en: 'Sent with every submission once the email service is set up (tech lead). Meanwhile, submissions are stored in Forms › Submissions.'},
  newForm: {fr: 'Nouveau formulaire', en: 'New form'},
  newPage: {fr: 'Nouvelle page', en: 'New page'},
  newPost: {fr: 'Nouvel article', en: 'New post'},
  newCase: {fr: 'Nouvelle réalisation', en: 'New case study'},
  multiple: {fr: 'Choix multiple (les choix s’affichent en badges dans le champ)', en: 'Several choices (shown as badges in the field)'},
  search: {fr: 'Recherche dans la liste', en: 'Search in the list'},
  searchAuto: {fr: 'Au-delà de 5 options', en: 'Beyond 5 options'},
  searchAlways: {fr: 'Toujours', en: 'Always'},
  searchNever: {fr: 'Jamais', en: 'Never'},
  fieldsDescription: {fr: 'Un bloc « Nouvelle étape » coupe le formulaire en étapes ; placé tout en haut, il nomme la première. Largeur « demi » : deux champs côte à côte quand la colonne fait 8/12 ou plus.', en: 'A « New step » block splits the form into steps; at the very top it names the first one. « Half » width: two fields side by side when the column is 8/12 or wider.'},
  duplicateName: {
    fr: ({name}: {name: string}) => `Le nom « ${name} » est utilisé par deux champs : chaque champ doit avoir un nom unique.`,
    en: ({name}: {name: string}) => `The name « ${name} » is used by two fields: each field needs a unique name.`,
  },
  width: {fr: 'Largeur', en: 'Width'},
  widthHalf: {fr: 'Demi (côte à côte dès 8/12)', en: 'Half (side by side from 8/12)'},
  widthFull: {fr: 'Pleine', en: 'Full'},
  name: {fr: 'Nom (technique, unique)', en: 'Name (technical, unique)'},
  label: {fr: 'Libellé', en: 'Label'},
  required: {fr: 'Obligatoire', en: 'Required'},
  tel: {singular: {fr: 'Téléphone', en: 'Telephone'}, plural: {fr: 'Téléphones', en: 'Telephones'}},
  consent: {singular: {fr: 'Consentement', en: 'Consent'}, plural: {fr: 'Consentements', en: 'Consents'}},
  consentDescription: {fr: 'Case toujours obligatoire, à cocher pour envoyer (RGPD).', en: 'Always required box, ticked to send (GDPR).'},
  consentDefault: {fr: 'J’accepte d’être recontacté.', en: 'I agree to be contacted.'},
  privacyLabel: {fr: 'Texte du lien (facultatif)', en: 'Link text (optional)'},
  privacyHref: {fr: 'Lien vers la politique de confidentialité', en: 'Link to the privacy policy'},
  step: {singular: {fr: 'Nouvelle étape', en: 'New step'}, plural: {fr: 'Nouvelles étapes', en: 'New steps'}},
  stepTitle: {fr: 'Titre de l’étape', en: 'Step title'},
  stepDescription: {fr: 'Les champs placés après ce bloc forment une nouvelle étape, jusqu’au bloc suivant.', en: 'The fields after this block form a new step, up to the next one.'},
  // the plugin's field blocks, named as the site calls them (the plugin leaves some in English)
  blocks: {
    text: {singular: {fr: 'Texte court', en: 'Short text'}, plural: {fr: 'Textes courts', en: 'Short texts'}},
    email: {singular: {fr: 'E-mail', en: 'Email'}, plural: {fr: 'E-mails', en: 'Emails'}},
    textarea: {singular: {fr: 'Texte long', en: 'Long text'}, plural: {fr: 'Textes longs', en: 'Long texts'}},
    select: {singular: {fr: 'Liste déroulante', en: 'Dropdown'}, plural: {fr: 'Listes déroulantes', en: 'Dropdowns'}},
    radio: {singular: {fr: 'Choix unique (radios)', en: 'Single choice (radios)'}, plural: {fr: 'Choix uniques', en: 'Single choices'}},
    checkbox: {singular: {fr: 'Case à cocher', en: 'Checkbox'}, plural: {fr: 'Cases à cocher', en: 'Checkboxes'}},
    number: {singular: {fr: 'Nombre', en: 'Number'}, plural: {fr: 'Nombres', en: 'Numbers'}},
    date: {singular: {fr: 'Date', en: 'Date'}, plural: {fr: 'Dates', en: 'Dates'}},
    message: {singular: {fr: 'Texte libre (entre les champs)', en: 'Free text (between fields)'}, plural: {fr: 'Textes libres', en: 'Free texts'}},
  },
  submitLabel: {fr: 'Texte du bouton d’envoi', en: 'Submit button label'},
  // column block
  block: {singular: {fr: 'Formulaire', en: 'Form'}, plural: {fr: 'Formulaires', en: 'Forms'}},
  form: {fr: 'Formulaire', en: 'Form'},
  formDescription: {fr: 'Créé dans Formulaires. Plus de 3 étapes : préférez une colonne de 6 ou plus.', en: 'Created in Forms. More than 3 steps: prefer a column of 6 or wider.'},
  framed: {fr: 'Dans une carte encadrée', en: 'In a framed card'},
  showHeading: {fr: 'Afficher le surtitre, le titre et l’introduction', en: 'Show the eyebrow, title and intro'},
});
