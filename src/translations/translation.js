import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_pl from '../translations/pl/common.json';
import common_en from '../translations/en/common.json';

i18next.use(initReactI18next).init({
  debug: true,
  ns: ['common'],
  resources: {
    en: { common: common_en },
    pl: { common: common_pl }
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  }
});

export default i18next;
