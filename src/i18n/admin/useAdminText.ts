'use client';

import {useTranslation} from '@payloadcms/ui';

import {type Message, type Text, toAdminLanguage, tr} from './languages';

/** Client components: the current admin language and a translate function bound to it. */
export function useAdminText() {
  const {i18n} = useTranslation();
  const language = toAdminLanguage(i18n.language);

  function t(text: Text): string;
  function t<P>(text: Message<P>, params: P): string;
  function t(text: Text | Message<unknown>, params?: unknown): string {
    return tr(text as Message<unknown>, language, params);
  }

  return {language, t};
}
