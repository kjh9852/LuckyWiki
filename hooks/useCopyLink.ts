import { useCallback } from 'react';

export const useCopyLink = () => {
  const copyLink = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, []);

  return { copyLink };
};
