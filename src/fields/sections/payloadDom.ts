/**
 * The class names of Payload's admin that the section builder's scripts look for (the stylesheets'
 * own list is `_payload.scss`). Internal to @payloadcms/ui: check them after an upgrade.
 */
export const PAYLOAD_DOM = {
  /** a field's wrapper (given to the builder's own field-like boxes, for Payload's spacing) */
  field: 'field-type',
  /** a select's opened menu, its list of options and its control (react-select) */
  selectMenu: '.rs__menu',
  selectMenuList: '.rs__menu-list',
  selectControl: '.rs__control',
} as const;
