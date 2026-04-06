import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { authService } from '@/features/auth/services/authService';
import type { ForgotPasswordRequest } from '@/features/auth/types/auth.types';

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
