'use client';

/**
 * SlugField — the slug of an entry, written from its title as it is typed (Nicolas, 24 Sept.
 * 2026: no empty slug while a title is being entered). It follows the title (`from`, « title » by
 * default; the serif accent's <span> is dropped) as long as it has not been edited by hand: a
 * value typed in the slug stops the following, an emptied slug resumes it. A saved entry keeps
 * its address: its slug only follows the title while empty.
 */
import {TextField, useDocumentInfo, useField, useFormFields} from '@payloadcms/ui';
import type {TextFieldClientProps} from 'payload';
import React, {useEffect, useRef} from 'react';

import {slugify} from '@/components/rich-text';

const stripTags = (s: string) => s.replace(/<[^>]*>/g, ' ');

export function SlugField({from = 'title', ...props}: TextFieldClientProps & {from?: string}) {
  const {id} = useDocumentInfo();
  const title = useFormFields(([fields]) => fields[from]?.value);
  const {value, setValue} = useField<string>({path: props.path});
  /** the last slug written from the title: a different value means the slug was edited by hand */
  const lastAuto = useRef<string | null>(null);
  useEffect(() => {
    const text = stripTags(typeof title === 'string' ? title : '').trim();
    const auto = text ? slugify(text) : '';
    const untouched = !value || value === lastAuto.current;
    if (!untouched) return;
    if (id && value) return;
    if (auto !== (value ?? '')) {
      lastAuto.current = auto;
      setValue(auto);
    }
    // only a title change writes the slug; the slug's own edits must not re-trigger it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  return <TextField {...props} />;
}
