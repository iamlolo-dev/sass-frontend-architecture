

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useTranslation } from '@/shared/i18n/hooks/useTranslation';
import { supportedLanguages, type SupportedLanguage } from '@/shared/i18n/i18n';

const languageLabels: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Espanol',
};

const languageFlags: Record<SupportedLanguage, string> = {
  en: 'EN',
  es: 'ES',
};

export function LanguageSwitcher() {
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent default until mounted
  const displayLanguage = mounted ? (currentLanguage as SupportedLanguage) : 'en';
  const ariaLabel = mounted ? t('language.select') : 'Select language';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" aria-label={ariaLabel}>
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languageFlags[displayLanguage] || 'EN'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => changeLanguage(lang)}
            className="flex items-center gap-2"
          >
            <span className="font-mono text-xs">{languageFlags[lang]}</span>
            <span>{languageLabels[lang]}</span>
            {mounted && currentLanguage === lang && (
              <span className="ml-auto text-primary">&#10003;</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
