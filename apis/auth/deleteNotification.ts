import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

export const deleteNotifications = async (id: number) => {
  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};
