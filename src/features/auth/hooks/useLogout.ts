import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { authService } from '@/features/auth/services';

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