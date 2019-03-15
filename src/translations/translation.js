import common_pl from '../translations/pl/common.json';
import common_en from '../translations/en/common.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const initTranslations = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          common: common_en // 'common' is our custom namespace
        },
        pl: {
          common: common_pl
        }
      },
      lng: 'en',
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false
      }
    });
};
