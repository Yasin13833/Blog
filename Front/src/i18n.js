import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fa from "./assets/TransLate/fa/translation.json";
import en from "./assets/TransLate/en/translation.json";
import tr from "./assets/TransLate/ar/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: {
        translation: fa,
      },
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },

    lng: "fa",

    fallbackLng: "fa",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;