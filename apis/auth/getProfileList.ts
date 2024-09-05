import ProfileType from '@/types/types';

export const getProfileList = async (page: number, pageSize: number, name: string): Promise<ProfileType[]> => {
  const query = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    name,
  }).toString();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles?${query}`);
  if (!response.ok) {
    return [];
  }
  const result = await response.json();
  return result.list;
};
