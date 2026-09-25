import type {Field, GlobalConfig} from 'payload';

import {linkTarget, linkTargetFields} from '@/fields/linkTarget';
import {titleField} from '@/fields/shared';
import {footerText, settingsText} from '@/i18n/admin/globals';

/** A footer link: label, then its target (an address or a content of the site, new tab box). A factory. */
const link = (): Field[] => {
  const [kind, href, doc, newTab] = linkTargetFields({required: true, kindWidth: '50%'});
  return [{type: 'row', fields: [{name: 'label', type: 'text', label: footerText.link.label, required: true, localized: true, admin: {width: '50%'}}, kind]}, href, doc, newTab];
};

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: footerText.label,
  admin: {group: settingsText.group, description: footerText.description},
  access: {read: () => true},
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: footerText.tabs.newsletter,
          fields: [
            {name: 'newsletterEnabled', type: 'checkbox', label: footerText.newsletter.enabled, defaultValue: true},
            {name: 'newsletter', type: 'group', label: footerText.newsletter.label, admin: {condition: (_d, s) => s?.newsletterEnabled !== false}, fields: [
              {name: 'eyebrow', type: 'text', label: footerText.newsletter.eyebrow, localized: true},
              titleField({name: 'title'}),
              {name: 'text', type: 'textarea', label: footerText.newsletter.text, localized: true, admin: {rows: 2}},
              {type: 'row', fields: [
                {name: 'fieldLabel', type: 'text', label: footerText.newsletter.fieldLabel, localized: true, defaultValue: 'Votre adresse e-mail'},
                {name: 'buttonLabel', type: 'text', label: footerText.newsletter.buttonLabel, localized: true, defaultValue: "S'abonner"},
              ]},
              {name: 'mention', type: 'text', label: footerText.newsletter.mention, localized: true},
            ]},
          ],
        },
        {
          label: footerText.tabs.articles,
          fields: [
            {name: 'articlesEnabled', type: 'checkbox', label: footerText.articles.enabled, defaultValue: true},
            {name: 'articles', type: 'group', label: footerText.articles.label, admin: {condition: (_d, s) => s?.articlesEnabled !== false}, fields: [
              {name: 'eyebrow', type: 'text', label: footerText.newsletter.eyebrow, localized: true, defaultValue: 'En bref'},
              {name: 'allLabel', type: 'text', label: footerText.articles.allLabel, localized: true, defaultValue: 'Tous les articles'},
              // « Tous les articles »: an address (the blog by default) or a content of the site
              {name: 'allTarget', type: 'group', label: footerText.link.href, fields: linkTarget().map((f) => ('name' in f && f.name === 'href' ? {...f, defaultValue: '/blog'} : f)) as Field[]},
            ]},
          ],
        },
        {
          label: footerText.tabs.columns,
          fields: [
            {
              name: 'columns', type: 'array', label: footerText.columns.label, maxRows: 4, labels: {singular: footerText.columns.singular, plural: footerText.columns.plural},
              fields: [
                {name: 'title', type: 'text', label: footerText.columns.title, required: true, localized: true},
                {name: 'links', type: 'array', label: footerText.columns.links, maxRows: 4, labels: {singular: footerText.link.singular, plural: footerText.link.plural}, fields: link()},
              ],
            },
          ],
        },
        {
          label: footerText.tabs.legal,
          fields: [
            {name: 'copyright', type: 'text', label: footerText.legal.copyright, localized: true, defaultValue: '© Vidomia'},
            {name: 'legalLine', type: 'text', label: footerText.legal.legalLine},
            {name: 'legalLinks', type: 'array', label: footerText.legal.legalLinks, maxRows: 4, labels: {singular: footerText.link.singular, plural: footerText.link.plural}, fields: link()},
          ],
        },
      ],
    },
  ],
};
