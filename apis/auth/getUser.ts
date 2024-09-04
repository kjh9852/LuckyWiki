import { getTokens } from '@/utils/getTokens';
import { getProfile } from './getProfile';
import { setCookie } from 'cookies-next';

interface getUserReturn {
  profile: {
    code: string;
    id: number;
    image: string;
  };
  updatedAt: string;
  createdAt: string;
  teamId: string;
  name: string;
  id: number;
}

export const getUser = async (): Promise<getUserReturn | undefined> => {
  const { accessToken, refreshToken } = getTokens();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const refreshTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    if (!refreshTokenResponse.ok) {
      return undefined;
    }

    const refreshedResponse: { accessToken: string } = await refreshTokenResponse.json();
    setCookie('accessToken', refreshedResponse.accessToken);

    const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${refreshedResponse.accessToken}` },
    });

    const retryResult = await retryResponse.json();
    return retryResult;
  }

  const resultUser = await response.json();
  const profile = await getProfile(resultUser.profile.code);

  return {
    ...resultUser,
    profile: {
      ...resultUser.profile,
      image: profile?.image,
    },
  };
};
