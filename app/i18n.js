/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import fiLocaleData from 'react-intl/locale-data/fi';
import moment from 'moment';

import enTranslationMessages from './translations/en';
import fiTranslationMessages from './translations/fi';

export const DEFAULT_LOCALE = 'fi';

export const appLocales = [
  'en',
  'fi',
];

addLocaleData(enLocaleData);
addLocaleData(fiLocaleData);
moment.locale(DEFAULT_LOCALE);

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  fi: formatTranslationMessages('fi', fiTranslationMessages),
};
