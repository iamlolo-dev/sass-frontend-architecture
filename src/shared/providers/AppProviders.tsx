import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from '@/theme';
import { I18nProvider } from '@/i18n';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <I18nProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  );
}
