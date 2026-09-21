'use client';

/**
 * SiteForm — a site form (mockup 17-forms, « Demander une démo »), plain or in several steps.
 *
 *   - Fields: the site inputs (Field, Select, NumberField, DateField) and the Astryx RadioList and
 *     CheckboxInput dressed by the theme; a « message » is free rich content between fields.
 *   - Layout: one column of fields up to 840 px of container width (a column of 7 at most), two
 *     from there (8/12 and wider): a « half » field then takes one column, a « full » one both;
 *     below the threshold every field is full width. A container query, so the column width
 *     decides, not the screen. DOM order = reading and tab order.
 *   - Card: `framed` = paper card (the surface colour, night card on night), 48 px padding, 24 px
 *     under 520 px of container; optional eyebrow (mono text or badge), title (tag chosen, look
 *     fixed) and intro.
 *   - Steps: more than one step = Astryx Stepper above the fields, « Retour » / « Continuer » on a
 *     full row, the submit button on the last step only. Each step is validated before moving on,
 *     values are kept when going back, focus moves to the step title. One submission at the end.
 *   - Sending: `submitAction` (a server action given by the page) receives the form id, the values,
 *     a honeypot and the time the form was shown; the server decides what is spam. After success the confirmation
 *     replaces the form in the card, or the browser goes to `confirmation.href`.
 * No Payload here: the page converts a form document into these props (src/lib/forms.ts).
 */
import {Banner} from '@astryxdesign/core/Banner';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Link} from '@astryxdesign/core/Link';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Step, Stepper} from '@astryxdesign/core/Stepper';
import {Text} from '@astryxdesign/core/Text';
import React, {useEffect, useId, useRef, useState} from 'react';

import {Button} from './Button';
import {Chip} from './Chip';
import {DateField} from './DateField';
import {Field} from './Field';
import {NumberField} from './NumberField';
import {Select} from './Select';
import {Title} from './TitleTag';
import {renderTitle} from './TitleText';
import type {TitleTag} from './title-tags';
import styles from './SiteForm.module.css';

export type FormFieldWidth = 'half' | 'full';
type Base = {name: string; label: string; required?: boolean; width?: FormFieldWidth};
export type FormField =
  | (Base & {type: 'text' | 'email' | 'tel' | 'textarea'; defaultValue?: string})
  | (Base & {type: 'number'; defaultValue?: number})
  | (Base & {type: 'date'; defaultValue?: string})
  | (Base & {type: 'radio'; options: {value: string; label: string}[]; defaultValue?: string})
  /** a dropdown: several choices shown as badges in the field (`multiple`); search from `searchFrom` options (5; 0 = always) */
  | (Base & {type: 'select'; options: {value: string; label: string}[]; defaultValue?: string; multiple?: boolean; searchFrom?: number})
  | (Base & {type: 'checkbox'; defaultValue?: boolean})
  | (Base & {type: 'consent'; link?: {label: string; href: string}})
  | {type: 'message'; name: string; content: React.ReactNode; width?: FormFieldWidth};

export type FormStep = {title?: string; fields: FormField[]};
export type FormValue = string | string[] | number | boolean | null;
export type FormValues = Record<string, FormValue>;
export type FormSubmitInput = {formId?: number; values: FormValues; honeypot: string; startedAt: number};
export type FormSubmitResult = {ok: true} | {ok: false; errors?: Record<string, string>; message?: string};

export type FormLabels = {
  required: string;
  email: string;
  consent: string;
  back: string;
  next: string;
  sending: string;
  error: string;
  /** accessible name of the steps list */
  progress: string;
};

const LABELS: FormLabels = {
  required: 'Ce champ est obligatoire.',
  email: 'Saisissez une adresse e-mail valide.',
  consent: 'Votre accord est nécessaire pour envoyer le formulaire.',
  back: 'Retour',
  next: 'Continuer',
  sending: 'Envoi…',
  error: 'L’envoi a échoué. Vérifiez votre connexion et réessayez.',
  progress: 'Étapes du formulaire',
};

export type SiteFormProps = {
  /** unique on the page (field ids, anchors) */
  id: string;
  /** the form document, sent back with the values */
  formId?: number;
  eyebrow?: string;
  /** the eyebrow as mono text (mockup) or as a badge */
  eyebrowStyle?: 'eyebrow' | 'badge';
  /** a word between <span>…</span> is set in serif */
  title?: string;
  tag?: TitleTag;
  intro?: string;
  framed?: boolean;
  steps: FormStep[];
  submitLabel: string;
  /** a server action (a name ending in « Action »: Next.js lets it cross to this client component) */
  submitAction: (input: FormSubmitInput) => Promise<FormSubmitResult>;
  confirmation: {type: 'message'; content: React.ReactNode} | {type: 'redirect'; href: string};
  labels?: Partial<FormLabels>;
};

/** « * » after a required label, like the text fields (Astryx would add « · Obligatoire »); the
 *  consent box is always required and carries no mark, as in the mockup */
const mark = (f: {label: string; required?: boolean}) => (f.required ? `${f.label} *` : f.label);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialValue = (f: FormField): FormValue => {
  if (f.type === 'message') return null;
  if (f.type === 'checkbox') return f.defaultValue ?? false;
  if (f.type === 'consent') return false;
  if (f.type === 'number') return f.defaultValue ?? null;
  if (f.type === 'select' && f.multiple) return f.defaultValue ? [f.defaultValue] : [];
  return f.defaultValue ?? '';
};

/** the error of one field, or null */
function fieldError(f: FormField, v: FormValue, l: FormLabels): string | null {
  if (f.type === 'message') return null;
  if (f.type === 'consent') return v === true ? null : l.consent;
  const empty = v === null || v === '' || v === false || (Array.isArray(v) && v.length === 0);
  if (f.required && empty) return l.required;
  if (f.type === 'email' && typeof v === 'string' && v && !EMAIL.test(v.trim())) return l.email;
  return null;
}

export function SiteForm({id, formId, eyebrow, eyebrowStyle = 'eyebrow', title, tag = 'h3', intro, framed = true, steps, submitLabel, submitAction, confirmation, labels}: SiteFormProps) {
  const l = {...LABELS, ...labels};
  const all = steps.flatMap((s) => s.fields);
  const [values, setValues] = useState<FormValues>(() => Object.fromEntries(all.map((f) => [f.name, initialValue(f)])));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [failure, setFailure] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(0);
  const stepTitle = useRef<HTMLElement>(null);
  const root = useRef<HTMLElement>(null);
  // the telephone is a text input with the phone icon (the Astryx TextInput has no tel type)
  const uid = useId();
  const multi = steps.length > 1;
  const last = step === steps.length - 1;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (name: string, v: FormValue) => {
    setValues((prev) => ({...prev, [name]: v}));
    if (errors[name]) setErrors((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => k !== name)));
  };

  /** validates the fields of the given steps; returns true when they are fine */
  const validate = (indexes: number[]): boolean => {
    const found: Record<string, string> = {};
    for (const i of indexes) for (const f of steps[i].fields) {
      const e = fieldError(f, values[f.name] ?? null, l);
      if (e) found[f.name] = e;
    }
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const goTo = (next: number) => {
    setStep(next);
    // after the render: the new step's title takes the focus (screen readers announce it)
    requestAnimationFrame(() => stepTitle.current?.focus());
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!last) {
      if (validate([step])) goTo(step + 1);
      return;
    }
    if (!validate(steps.map((_, i) => i))) {
      // an error in an earlier step: go back to it
      const first = steps.findIndex((s) => s.fields.some((f) => fieldError(f, values[f.name] ?? null, l)));
      if (first >= 0 && first !== step) goTo(first);
      return;
    }
    setStatus('sending');
    setFailure(null);
    try {
      const res = await submitAction({formId, values, honeypot, startedAt: startedAt.current});
      if (res.ok) {
        if (confirmation.type === 'redirect') {
          window.location.assign(confirmation.href);
          return;
        }
        setStatus('sent');
        requestAnimationFrame(() => root.current?.focus());
        return;
      }
      if (res.errors) setErrors(res.errors);
      setFailure(res.message ?? l.error);
      setStatus('failed');
    } catch {
      setFailure(l.error);
      setStatus('failed');
    }
  };

  const heading = (
    <>
      {eyebrow && eyebrowStyle === 'badge' ? (
        <HStack hAlign="center" className={styles.badge}>
          <Chip label={eyebrow} tone="accent" />
        </HStack>
      ) : eyebrow ? (
        <Text type="eyebrow-mono" color="primary" className={styles.center}>{eyebrow}</Text>
      ) : null}
      {title ? <Title tag={tag} className={styles.title}>{renderTitle(title)}</Title> : null}
      {intro ? <Text type="body" color="secondary" className={styles.center}>{intro}</Text> : null}
    </>
  );

  if (status === 'sent' && confirmation.type === 'message') {
    return (
      <VStack ref={root} tabIndex={-1} className={styles.root} data-framed={framed ? 'true' : undefined} aria-live="polite">
        <VStack gap={4} className={styles.card}>
          {confirmation.content}
        </VStack>
      </VStack>
    );
  }

  const field = (f: FormField) => {
    const v = values[f.name] ?? null;
    const err = errors[f.name];
    const status = err ? {type: 'error' as const, message: err} : undefined;
    switch (f.type) {
      case 'message':
        return <VStack gap={2} className={styles.message}>{f.content}</VStack>;
      case 'text':
      case 'email':
      case 'textarea':
        return <Field label={f.label} value={String(v ?? '')} onChange={(x) => set(f.name, x)} type={f.type === 'email' ? 'email' : 'text'} multiline={f.type === 'textarea'} isRequired={f.required} status={status} />;
      case 'tel':
        return <Field label={f.label} value={String(v ?? '')} onChange={(x) => set(f.name, x)} iconKey="phone" isRequired={f.required} status={status} />;
      case 'number':
        return <NumberField label={f.label} value={typeof v === 'number' ? v : null} onChange={(x) => set(f.name, x)} isRequired={f.required} status={status} />;
      case 'date':
        return <DateField label={f.label} value={typeof v === 'string' && v ? (v as never) : undefined} onChange={(x) => set(f.name, x ?? '')} isRequired={f.required} status={status} />;
      case 'select':
        return f.multiple ? (
          <Select mode="multiple" label={f.label} options={f.options} value={Array.isArray(v) ? v : []} onChange={(x) => set(f.name, x)} searchFrom={f.searchFrom} isRequired={f.required} status={status} />
        ) : (
          <Select label={f.label} options={f.options} value={typeof v === 'string' && v ? v : null} onChange={(x) => set(f.name, x)} searchFrom={f.searchFrom} isRequired={f.required} status={status} />
        );
      case 'radio':
        return (
          <RadioList label={mark(f)} value={String(v ?? '')} onChange={(x) => set(f.name, x)} status={status} htmlName={`${id}-${f.name}`}>
            {f.options.map((o) => <RadioListItem key={o.value} value={o.value} label={o.label} />)}
          </RadioList>
        );
      case 'checkbox':
        return <CheckboxInput label={mark(f)} value={v === true} onChange={(c) => set(f.name, c)} status={status} />;
      case 'consent':
        return (
          <VStack gap={1}>
            <CheckboxInput label={f.label} value={v === true} onChange={(c) => set(f.name, c)} status={status} />
            {f.link ? <Link href={f.link.href} className={styles.consentLink}>{f.link.label}</Link> : null}
          </VStack>
        );
    }
  };

  const current = steps[step];
  return (
    <VStack ref={root} tabIndex={-1} className={styles.root} data-framed={framed ? 'true' : undefined}>
      <VStack gap={2} className={styles.card}>
        {heading}
        <form className={styles.form} onSubmit={submit} noValidate aria-labelledby={title ? undefined : `${uid}-step`} data-steps={steps.length}>
          {multi ? (
            <VStack className={styles.full}>
              <Stepper activeStep={step} label={l.progress} horizontalOptions={{minimumStepWidth: 112, collapsedVariant: 'withLabel'}}>
                {steps.map((s, i) => <Step key={i} step={i} label={s.title || `${i + 1}`} />)}
              </Stepper>
            </VStack>
          ) : null}
          {multi && current.title ? (
            <Text as="p" type="large" weight="bold" ref={stepTitle} tabIndex={-1} id={`${uid}-step`} className={`${styles.full} ${styles.stepTitle}`} aria-live="polite">
              {current.title}
            </Text>
          ) : null}
          {current.fields.map((f) => (
            <VStack key={f.name} className={styles.cell} data-width={f.width ?? 'full'}>
              {field(f)}
            </VStack>
          ))}
          {/* honeypot: invisible to people, filled by bots; the server ignores the submission then */}
          <input className={styles.trap} type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          {failure ? (
            <VStack className={styles.full} role="alert">
              <Banner status="error" title={failure} />
            </VStack>
          ) : null}
          <HStack gap={3} wrap="wrap" vAlign="center" className={`${styles.full} ${styles.actions}`}>
            {multi && step > 0 ? <Button label={l.back} variant="ghost" type="button" onClick={() => goTo(step - 1)} className={styles.button} /> : null}
            <Button label={last ? (status === 'sending' ? l.sending : submitLabel) : l.next} variant="primary" arrow type="submit" isDisabled={status === 'sending'} className={`${styles.button} ${styles.submit}`} />
          </HStack>
        </form>
      </VStack>
    </VStack>
  );
}
