import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTranslation } from '@/i18n';
import { useRegister, useAuthStore } from '../hooks';
import { registerSchema, type RegisterFormData } from '../schemas';

export function RegisterForm() {
  const { t } = useTranslation();
  const { mutate: register, isPending } = useRegister();
  const { error } = useAuthStore();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    register({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-full max-w-md p-6 space-y-8 border border-border rounded-xl bg-card shadow-sm">      <div className="flex justify-start">
    </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('auth.register.title')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('auth.register.subtitle')}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.register.name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('auth.register.namePlaceholder')}
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.name?.message &&
                    t(form.formState.errors.name.message, { min: 2 })}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.register.email')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('auth.register.emailPlaceholder')}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.register.password')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('auth.register.passwordPlaceholder')}
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
                <FormLabel>{t('auth.register.confirmPassword')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('auth.register.confirmPasswordPlaceholder')}
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

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                    {t('auth.register.terms')}
                  </FormLabel>
                  <FormMessage>
                    {form.formState.errors.acceptTerms?.message &&
                      t(form.formState.errors.acceptTerms.message)}
                  </FormMessage>
                </div>
              </FormItem>
            )}
          />

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {t('auth.register.error')}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {t('auth.register.submit')}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        {t('auth.register.hasAccount')}{' '}
        <Link
          to="/auth/login"
          className="font-medium text-primary hover:underline"
        >
          {t('auth.register.signIn')}
        </Link>
      </p>
    </div>
  );
}
