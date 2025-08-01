import { useTranslation } from "react-i18next";

export const useLanguageStyles = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const isKorean = currentLanguage === "ko";

  return {
    koreanTextClass: isKorean ? "word-break-keep-all" : "",
    koreanTitleClass: isKorean ? "word-break-keep-all leading-relaxed" : "",
  };
};
