import { apiRequest } from '@/shared/lib/api';
import type { LoginRequest, LoginResponse } from '../login/types/login.types';
import type { RegisterRequest, RegisterResponse } from '../register/types/register.types';
import type { ForgotPasswordRequest, ForgotPasswordResponse } from '../password/types/forgotPassword.types';
import type { ResetPasswordRequest, ResetPasswordResponse } from '../reset/types/resetPassword.types';

export function login(data: LoginRequest) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function register(data: RegisterRequest) {
  return apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function forgotPassword(data: ForgotPasswordRequest) {
  return apiRequest<ForgotPasswordResponse>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function resetPassword(data: ResetPasswordRequest) {
  return apiRequest<ResetPasswordResponse>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function logout() {
  return apiRequest<void>('/auth/logout', {
    method: 'POST',
  });
}

export function getCurrentUser(token: string) {
  return apiRequest<LoginResponse['user']>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}