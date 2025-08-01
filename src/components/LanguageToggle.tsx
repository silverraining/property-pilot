"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const languages = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => setOpen((o) => !o)}
          className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg bg-white dark:bg-neutral-800 text-black dark:text-white shadow-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xl border border-gray-200 dark:border-gray-700 transition-colors duration-150"
          aria-label="Change language"
        >
          🌐
        </button>
        {open && (
          <div className="absolute bottom-14 mb-2 flex flex-col bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-colors duration-200 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur overflow-hidden">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setOpen(false);
                }}
                className={`cursor-pointer min-w-[48px] w-12 h-10 flex items-center justify-center border-b last:border-b-0 border-gray-100 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white text-sm font-medium transition-colors duration-150
                  ${
                    i18n.language === lang.code
                      ? "font-bold bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }
                `}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
