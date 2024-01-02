import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  en: { translation: {} },
  fr: { translation: {} },
};

const importAll = (r) => {
  r.keys().forEach((key) => {
    const language = key.split('/')[1];
    resources[language].translation = {
      ...resources[language].translation,
      ...r(key),
    };
  });
}

importAll(require.context('./locales/', true, /\.json$/));

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
