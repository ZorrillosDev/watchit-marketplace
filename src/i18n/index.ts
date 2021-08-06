import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Languages
import en from './langs/en.json'
import es from './langs/es.json'

// default lang
export const defaultLang = 'en';

// Translation
const resources = {
    en: {translation: en},
    es: {translation: es}
}


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: defaultLang,
        interpolation: {
            escapeValue: false
        }
    })

// Humanize displaying
export const lang = [
    {value: "en", name: "English"},
    {value: "es", name: "Spanish"}

]

export default i18n;
