import { Suspense } from 'react'
import { ResetPasswordForm } from '@/features/auth/components'
import { Spinner } from '@/shared/components/ui/spinner'

function ResetPasswordContent() {
  return <ResetPasswordForm />
}

export function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Suspense fallback={<Spinner className="h-8 w-8" />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  )
}
