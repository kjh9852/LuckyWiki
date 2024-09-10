import { Notification } from '@/types/types';
import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

export const getNotifications = async (): Promise<Notification[] | undefined> => {
  const query = new URLSearchParams({
    pageSize: '999',
  });

  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response) {
    return undefined;
  }

  return response.list;
};
