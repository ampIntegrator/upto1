import type {Field} from 'payload';

/**
 * Gives every described field of the section builder an « i » after its label that holds the
 * description (`HelpLabel`), in the place of Payload's line of text under the field: the dialog's
 * panels are low, a line under each field cost too much. Returns new field objects (the host's
 * configs are not touched: Payload mutates what it is given).
 */
const LABEL = '@/fields/sections/HelpLabel#HelpLabel';
const DESCRIPTION = '@/fields/sections/HelpLabel#NoDescription';

export function withHelpBubbles(fields: Field[]): Field[] {
  return fields.map((field): Field => {
    const inner = 'fields' in field && Array.isArray(field.fields) ? {fields: withHelpBubbles(field.fields)} : null;
    const tabs = field.type === 'tabs' ? {tabs: field.tabs.map((tab) => ({...tab, fields: withHelpBubbles(tab.fields)}))} : null;
    const blocks = field.type === 'blocks' && Array.isArray(field.blocks) ? {blocks: field.blocks.map((block) => ({...block, fields: withHelpBubbles(block.fields)}))} : null;
    const description = 'admin' in field && field.admin && 'description' in field.admin ? field.admin.description : undefined;
    // a description that is a function (it reads the document) stays Payload's line: the « i » shows static texts
    const help = description !== undefined && typeof description !== 'function' ? description : undefined;
    const admin = help !== undefined ? {...field.admin, components: {...(field.admin as {components?: object})?.components, Label: {path: LABEL, clientProps: {help}}, Description: {path: DESCRIPTION}}} : field.admin;
    return {...field, ...(inner ?? {}), ...(tabs ?? {}), ...(blocks ?? {}), admin} as Field;
  });
}
