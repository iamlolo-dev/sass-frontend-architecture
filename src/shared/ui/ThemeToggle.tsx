import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useThemeStore } from '@/shared/theme/theme.store';
import { useTranslation } from '@/shared/i18n/hooks/useTranslation';
import type { Theme } from '@/shared/theme/theme.types';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by using consistent defaults until mounted
  const displayTheme = mounted ? resolvedTheme : 'light';
  const selectedTheme = mounted ? theme : 'system';
  const ariaLabel = mounted ? t('theme.toggle') : 'Toggle theme';

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: mounted ? t('theme.light') : 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: mounted ? t('theme.dark') : 'Dark', icon: <Moon className="h-4 w-4" /> },
    { value: 'system', label: mounted ? t('theme.system') : 'System', icon: <Monitor className="h-4 w-4" /> },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={ariaLabel}>
          {displayTheme === 'dark' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => setTheme(item.value)}
            className="flex items-center gap-2"
          >
            {item.icon}
            <span>{item.label}</span>
            {selectedTheme === item.value && (
              <span className="ml-auto text-primary">&#10003;</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
