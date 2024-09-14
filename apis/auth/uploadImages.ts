import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

export const uploadImages = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/images/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data.url;
};
