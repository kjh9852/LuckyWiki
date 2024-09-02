import ProfileType from '@/types/types';

export const getProfileList = async (): Promise<ProfileType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles`);
  if (!response.ok) {
    return [];
  }
  const result = await response.json();
  return result.list;
};
