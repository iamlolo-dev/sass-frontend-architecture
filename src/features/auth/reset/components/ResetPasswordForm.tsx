
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { useTranslation } from '@/shared/i18n';
import { useResetPassword, useAuthStore } from '../hooks';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas';

export function ResetPasswordForm() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();
  const { error } = useAuthStore();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword({
      token,
      password: data.password,
    });
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md p-6 space-y-8 border border-border rounded-xl bg-card shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t('auth.resetPassword.success')}
          </h1>
        </div>
        <Button asChild className="w-full">
          <Link to="/auth/login">
            {t('auth.login.submit')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-6 space-y-8 border border-border rounded-xl bg-card shadow-sm">
      <div className="flex justify-start">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.backToHome')}
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('auth.resetPassword.title')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('auth.resetPassword.subtitle')}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.resetPassword.password')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('auth.resetPassword.passwordPlaceholder')}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message &&
                    t(form.formState.errors.password.message, { min: 8 })}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.resetPassword.confirmPassword')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.confirmPassword?.message &&
                    t(form.formState.errors.confirmPassword.message)}
                </FormMessage>
              </FormItem>
            )}
          />

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {t('auth.resetPassword.error')}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {t('auth.resetPassword.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
