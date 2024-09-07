import { getTokens } from '@/utils/getTokens';

export const uploadImages = async (image: File) => {
  const tokens = getTokens();
  const formData = new FormData();
  formData.append('image', image);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
    body: formData,
  });
  const data = await response.json();
  return data.url;
};
