import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

interface UpdateSecurityQuizParams {
  code: string;
  securityAnswer: string;
  securityQuestion: string;
}

export const updateSecurityQuiz = async ({ code, securityQuestion, securityAnswer }: UpdateSecurityQuizParams) => {
  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${code}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ securityQuestion, securityAnswer }),
  });

  return response;
};
