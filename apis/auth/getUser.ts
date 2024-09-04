import { getTokens } from '@/utils/getTokens';
import { getProfile } from './getProfile';
import { getNewAccessToken } from './getNewAccessToken';
import { CookieValueTypes } from 'cookies-next';

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

const fetchUser = async (accessToken: CookieValueTypes) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });

  return response;
};

export const getUser = async (): Promise<getUserReturn | undefined> => {
  const { accessToken, refreshToken } = getTokens();

  let response;
  response = await fetchUser(accessToken);

  if (!response.ok && refreshToken) {
    // accessToken이 만료된 경우라면 refreshToken으로 재발급
    const newAccessToken = await getNewAccessToken(refreshToken);

    if (!newAccessToken) {
      return undefined;
    }

    // 재발급한 accessToken으로 다시 유저 정보 요청
    response = await fetchUser(newAccessToken);

    if (!response) {
      return undefined;
    }
  }

  const resultUser = await response.json();

  if (resultUser.profile) {
    // 생성된 프로필 정보가 있다면
    const profile = await getProfile(resultUser.profile.code);
    return {
      ...resultUser,
      profile: {
        ...resultUser.profile,
        image: profile?.image,
      },
    };
  }

  return resultUser;
};
