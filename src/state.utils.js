export const getPreloadedState = () => {
  let currentLang = 'EN';

  var userLang = navigator.language || navigator.userLanguage;
  if (userLang && userLang.toLowerCase().startsWith('pl')) {
    document.title = 'Kółko i krzyżyk';
    currentLang = 'PL';
  }

  return { lang: { language: currentLang } };
};
