'use client';

import {ChevronIcon, Popup, PopupList, useTranslation} from '@payloadcms/ui';
import React from 'react';

import {ADMIN_LANGUAGE_CODES, ADMIN_LANGUAGES, texts} from './languages';
import {useAdminText} from './useAdminText';

const switcherText = texts({
  label: {fr: 'Interface', en: 'Interface'},
  aria: {fr: 'Langue de l’interface', en: 'Interface language'},
});

/**
 * Interface language selector, registered in admin.components.actions (payload.config.ts).
 * Sits in the header next to Payload's content language selector and reuses its look
 * (localizer-button classes). Payload stores the choice in a cookie and refreshes the page.
 */
export function LanguageSwitcher() {
  const {switchLanguage} = useTranslation();
  const {language, t} = useAdminText();

  return (
    <Popup
      horizontalAlign="right"
      size="large"
      button={
        <div className="localizer-button" aria-label={t(switcherText.aria)}>
          <div className="localizer-button__label">{t(switcherText.label)}:&nbsp;</div>
          <div className="localizer-button__current">
            <span className="localizer-button__current-label">{ADMIN_LANGUAGES[language]}</span>
            <ChevronIcon className="localizer-button__chevron" />
          </div>
        </div>
      }
      render={({close}) => (
        <PopupList.ButtonGroup>
          {ADMIN_LANGUAGE_CODES.map((code) => (
            <PopupList.Button
              key={code}
              active={code === language}
              disabled={code === language}
              onClick={() => {
                close();
                void switchLanguage?.(code);
              }}
            >
              {ADMIN_LANGUAGES[code]}
            </PopupList.Button>
          ))}
        </PopupList.ButtonGroup>
      )}
    />
  );
}
