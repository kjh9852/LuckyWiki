import ProfileType from '@/types/types';

export const getProfileList = async (params: { name?: string } = {}): Promise<ProfileType[]> => {
  const query = new URLSearchParams(params as string).toString();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles?${query}`);
  if (!response.ok) {
    return [];
  }
  const result = await response.json();
  return result.list;
};
