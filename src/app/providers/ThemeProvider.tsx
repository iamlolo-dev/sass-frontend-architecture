
import * as React from 'react'
import { ThemeProvider as LocalThemeProvider } from '@/shared/theme/ThemeProvider'

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  return <LocalThemeProvider {...props}>{children}</LocalThemeProvider>
}
