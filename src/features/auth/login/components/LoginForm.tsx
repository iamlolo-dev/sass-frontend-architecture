import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Checkbox } from '@/shared/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { useTranslation } from '@/shared/i18n/hooks/useTranslation'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useLogin } from '@/features/auth/login/hooks/useLogin'
import { loginSchema, type LoginFormData } from '@/features/auth/login/schema/login.schema'

export function LoginForm() {
  const { t } = useTranslation()
  const { mutate: login, isPending } = useLogin()
  const { error } = useAuthStore()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  return (
    <div className="w-full max-w-md p-6 space-y-8 border border-border rounded-xl bg-card shadow-sm">
      
      {/* Back */}
      {/* <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.backToHome')}
        </Link>
      </div> */}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>{t('auth.login.email')}</FormLabel>
                <FormControl>
                  <Input
                    className="h-10"
                    type="email"
                    placeholder={t('auth.login.emailPlaceholder')}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel>{t('auth.login.password')}</FormLabel>
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    {t('auth.login.forgotPassword')}
                  </Link>
                </div>

                <FormControl>
                  <Input
                    className="h-10"
                    type="password"
                    placeholder={t('auth.login.passwordPlaceholder')}
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember + forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {t('auth.login.rememberMe')}
              </label>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              {t('auth.login.error')}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('auth.login.submit')}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        {t('auth.login.noAccount')}{' '}
        <Link
          to="/auth/register"
          className="font-medium text-primary hover:underline"
        >
          {t('auth.login.signUp')}
        </Link>
      </p>
    </div>
  )
}
