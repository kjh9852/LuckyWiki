import { getProfile } from './getProfile';
import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';
import { UserProfile } from '@/types/types';

interface getUserReturn {
  profile: UserProfile;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  name: string;
  id: number;
}

export const getUser = async (): Promise<getUserReturn | undefined> => {
  const resultUser = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!resultUser) {
    return undefined;
  }

  if (resultUser.profile) {
    // 생성된 프로필 정보가 있다면
    const profile = await getProfile(resultUser.profile.code);
    return {
      ...resultUser,
      profile: {
        ...resultUser.profile,
        image: profile?.image,
        securityQuestion: profile?.securityQuestion,
      },
    };
  }

  return resultUser;
};
