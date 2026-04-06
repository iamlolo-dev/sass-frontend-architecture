import { AppProviders } from '@/shared/providers'
import { Router } from './router'
import { Toaster } from '@/shared/ui/sonner'

export function App() {
  return (
    <AppProviders>
      <Router />
      <Toaster />
    </AppProviders>
  )
}
