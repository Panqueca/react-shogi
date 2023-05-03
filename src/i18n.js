import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import common_en from '@translations/en/common.json'

// the translations
const resources = {
  en: { common: common_en },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    ns: 'common',
    defaultNS: 'common',
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
