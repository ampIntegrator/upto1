/**
 * SiteFormBlock — a form of the Formulaires collection on the site, server side: its rich texts
 * (message fields, confirmation) rendered here, the submission through the server action. Used by
 * the « Formulaire » column block (PageSections) and the form inserted in a modal's body.
 */
import React from 'react';

import {submitForm} from '@/app/(frontend)/actions/submitForm';
import type {FormData} from '@/lib/forms';
import {RichText} from './RichText';
import {type FormField, SiteForm} from './SiteForm';

export function SiteFormBlock({form}: {form: FormData}) {
  const steps = form.steps.map((s) => ({
    title: s.title,
    fields: s.fields.map((f): FormField => (f.type === 'message' ? {type: 'message', name: f.name, width: f.width, content: <RichText content={f.content} />} : f)),
  }));
  const confirmation = form.confirmation.type === 'redirect' ? form.confirmation : {type: 'message' as const, content: <RichText content={form.confirmation.content} />};
  return <SiteForm id={form.id} formId={form.formId} eyebrow={form.eyebrow} eyebrowStyle={form.eyebrowStyle} title={form.title} tag={form.tag} intro={form.intro} framed={form.framed} steps={steps} submitLabel={form.submitLabel} confirmation={confirmation} submitAction={submitForm} />;
}
