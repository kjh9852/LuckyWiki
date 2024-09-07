import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

interface CreateProfileParams {
  securityQuestion: string;
  securityAnswer: string;
}

export const createProfile = async ({ securityQuestion, securityAnswer }: CreateProfileParams) => {
  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ securityQuestion, securityAnswer }),
  });

  return response;
};
