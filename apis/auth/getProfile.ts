import ProfileType from '@/types/types';

export const getProfile = async (code: string): Promise<ProfileType | undefined> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${code}`);
  if (!response.ok) {
    return undefined;
  }
  const result = await response.json();
  return result;
};
