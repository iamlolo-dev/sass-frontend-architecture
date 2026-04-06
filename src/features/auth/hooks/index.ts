

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store';
import { authService } from '../services';
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../types';

export function useLogin() {
  const { login, setLoading, setError } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (response) => {
      login(response.user, response.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
    },
  });
}

export function useRegister() {
  const { login, setLoading, setError } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (response) => {
      login(response.user, response.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
    },
  });
}

export function useForgotPassword() {
  const { setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authService.forgotPassword(data),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}

export function useResetPassword() {
  const { setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
}

export function useLogout() {
  const { logout, setLoading } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      logout();
      queryClient.clear();
    },
  });
}

export { useAuthStore } from '../store';
