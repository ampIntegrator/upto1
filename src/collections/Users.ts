import type {CollectionAfterReadHook, CollectionConfig} from 'payload'

import {collectionsText as ct} from '@/i18n/admin/collections';
import {ADMIN_LANGUAGE_CODES, type Text} from '@/i18n/admin/languages';

/**
 * Session length chosen by each user (« Rester connecté », 17 Sept. 2026): 0 (2 hours without
 * activity), 10, 20 or 30 days, 10 by default. The token and its cookie last SESSION_MAX_DAYS
 * (the longest choice); the user's own length is enforced on the server session: every read
 * of a user drops the sessions whose last activity (login or refresh) is older than the
 * chosen length, and Payload's JWT strategy then refuses the token (it requires the session).
 */
export const SESSION_DAY_CHOICES = ['0', '10', '20', '30'] as const;
const SESSION_MAX_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;
const NO_STAY_MS = 2 * 60 * 60 * 1000;

const sessionLabel = (days: number): Text =>
  days === 0 ? ct.users.fields.sessionNone : (Object.fromEntries(ADMIN_LANGUAGE_CODES.map((l) => [l, ct.users.fields.sessionDaysOption[l]({days})])) as Text);

/** Drops the sessions older than the user's chosen length (not persisted: the next login or refresh cleans the database). */
const enforceSessionLength: CollectionAfterReadHook = ({doc}) => {
  if (!doc || !Array.isArray(doc.sessions)) return doc;
  const days = Number(doc.sessionDays ?? 10);
  const windowMs = days > 0 ? days * DAY_MS : NO_STAY_MS;
  const now = Date.now();
  doc.sessions = doc.sessions.filter((s: {expiresAt?: string | Date}) => {
    const expires = new Date(s.expiresAt ?? 0).getTime();
    // expiresAt = last activity + SESSION_MAX_DAYS
    const lastActivity = expires - SESSION_MAX_DAYS * DAY_MS;
    return lastActivity + windowMs > now;
  });
  return doc;
};

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {singular: ct.users.singular, plural: ct.users.plural},
  admin: {
    useAsTitle: 'name',
    group: ct.groups.site,
  },
  auth: {tokenExpiration: SESSION_MAX_DAYS * 24 * 60 * 60},
  hooks: {afterRead: [enforceSessionLength]},
  fields: [
    // email is added by default
    {name: 'name', type: 'text', label: ct.users.fields.name, required: true},
    {
      name: 'sessionDays',
      type: 'select',
      label: ct.users.fields.sessionDays,
      defaultValue: '10',
      options: SESSION_DAY_CHOICES.map((v) => ({label: sessionLabel(Number(v)), value: v})),
      admin: {description: ct.users.fields.sessionDaysDescription},
    },
  ],
}
