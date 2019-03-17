import i18next from 'i18next';

export const getPreloadedState = () => {
  let currentLang = 'en';

  const userLang = navigator.language || navigator.userLanguage;
  if (userLang && userLang.toLowerCase().startsWith('pl')) {
    document.title = 'Kółko i krzyżyk';
    currentLang = 'pl';
  }
  i18next.changeLanguage(currentLang);

  return { lang: { language: currentLang } };
};

export const devConsole = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};
