import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

export const deleteNotifications = async (id: number) => {
  const query = new URLSearchParams({
    id: id.toString(),
    pageSize: '10',
  });
  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications?${query}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};
