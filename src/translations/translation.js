import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_en from '../translations/en/common.json';
import common_pl from '../translations/pl/common.json';

const useDebug = process.env.NODE_ENV !== 'production';

i18next.use(initReactI18next).init({
  debug: useDebug,
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
i18next.on('languageChanged', () => {
  document.title = i18next.t('document title');
});

export default i18next;
