import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';

export interface Notification {
  content: string;
  createdAt: Date;
  id: number;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const query = new URLSearchParams({
    pageSize: '10',
  });
  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};
