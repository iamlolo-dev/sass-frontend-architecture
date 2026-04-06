import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTranslation } from '@/i18n';
import { useForgotPassword, useAuthStore } from '../hooks';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas';

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();
  const { error } = useAuthStore();
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    setSubmittedEmail(data.email);
    forgotPassword({ email: data.email });
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md p-6 space-y-8 border border-border rounded-xl bg-card shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t('auth.forgotPassword.success')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {submittedEmail}
          </p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link to="/auth/login">
            <ArrowLeft className="h-4 w-4" />
            {t('auth.forgotPassword.backToLogin')}
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
          {t('auth.forgotPassword.title')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('auth.forgotPassword.subtitle')}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.forgotPassword.email')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('auth.forgotPassword.emailPlaceholder')}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message &&
                    t(form.formState.errors.email.message)}
                </FormMessage>
              </FormItem>
            )}
          />

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {t('auth.forgotPassword.error')}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {t('auth.forgotPassword.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
