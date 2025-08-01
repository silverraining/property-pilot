"use client";
import { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../i18n/locales/en.json";
import ko from "../i18n/locales/ko.json";
import fr from "../i18n/locales/fr.json";

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
  fr: {
    translation: fr,
  },
};

// Initialize i18n only on client side with consistent default
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: "en", // Force English as default to avoid hydration mismatch
      fallbackLng: "en",
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure i18n is initialized on client side
    if (!i18n.isInitialized) {
      i18n.init({
        resources,
        lng: "en", // Force English as default
        fallbackLng: "en",
        debug: false,
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ["localStorage", "navigator"],
          caches: ["localStorage"],
        },
      });
    }
  }, []);

  return <>{children}</>;
}
