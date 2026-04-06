import { AppProviders } from './shared/providers'
import { Router } from './Router'
import { Toaster } from '@/components/ui/sonner'

export function App() {
  return (
    <AppProviders>
      <Router />
      <Toaster />
    </AppProviders>
  )
}
