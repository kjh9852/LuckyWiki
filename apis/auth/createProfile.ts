import { getTokens } from '@/utils/getTokens';

interface CreateProfileParams {
  quizQuestion: string;
  quizAnswer: string;
}

export const createProfile = async ({ quizQuestion, quizAnswer }: CreateProfileParams) => {
  const { accessToken } = getTokens();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ securityQuestion: quizQuestion, securityAnswer: quizAnswer }),
  });

  if (!response.ok) {
    return undefined;
  }
  const result = await response.json();

  return result;
};
