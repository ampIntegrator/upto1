/**
 * Loads the forms chosen in the « Formulaire » column blocks of a page, with their redirect page.
 * Server only (Payload local API).
 */
import config from '@payload-config';
import {getPayload} from 'payload';

import type {Locale} from '@/locales';
import type {Form} from '@/payload-types';

export async function loadFormsByIds(locale: Locale, ids: number[]): Promise<Form[]> {
  if (!ids.length) return [];
  const payload = await getPayload({config});
  const res = await payload.find({collection: 'forms', locale, depth: 1, limit: ids.length, where: {id: {in: ids}}});
  return res.docs;
}
