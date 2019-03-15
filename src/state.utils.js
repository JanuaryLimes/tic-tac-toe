import i18next from 'i18next';

export const getPreloadedState = () => {
  let currentLang = 'en';

  var userLang = navigator.language || navigator.userLanguage;
  if (userLang && userLang.toLowerCase().startsWith('pl')) {
    document.title = 'Kółko i krzyżyk';
    currentLang = 'pl';
  }
  i18next.changeLanguage(currentLang);

  return { lang: { language: currentLang } };
};
