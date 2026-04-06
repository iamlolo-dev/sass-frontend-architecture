

import { useTranslation as useI18nTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../i18n';

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language as SupportedLanguage;

  return {
    t,
    i18n,
    changeLanguage,
    currentLanguage,
  };
}
