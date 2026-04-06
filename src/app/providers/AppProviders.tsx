import { QueryProvider } from './QueryProvider'
import { ThemeProvider } from '@/shared/theme/ThemeProvider'
import { I18nProvider } from '@/shared/i18n/I18nProvider'

interface AppProvidersProps {
  children: React.ReactNode
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
  )
}
