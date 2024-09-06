import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

interface CreateProfileParams {
  quizQuestion: string;
  quizAnswer: string;
}

export const createProfile = async ({ quizQuestion, quizAnswer }: CreateProfileParams) => {
  const result = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ securityQuestion: quizQuestion, securityAnswer: quizAnswer }),
  });

  return result;
};
