

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { authService } from '@/features/auth/services/authService';
import type {
  ResetPasswordRequest,
} from '@/features/auth/types/auth.types';

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