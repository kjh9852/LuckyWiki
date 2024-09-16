import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useNavigate = () => {
  const router = useRouter();

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path, undefined, { shallow: true });
    },
    [router],
  );

  return { navigateTo };
};
