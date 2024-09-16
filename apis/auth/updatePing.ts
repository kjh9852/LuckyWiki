import { fetchWithTokenRefresh } from './fetchWithTokenRefresh';
import { getServerTime } from '../getServerTime';

export const postPing = async (code: string, answer: string) => {
  const response = await fetchWithTokenRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${code}/ping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ securityAnswer: answer }),
  });

  if (response) {
    getServerTime();
    const registeredAt = new Date(response?.registeredAt);
    const dateIsoString = registeredAt.getTime().toString();
    localStorage.setItem('lastPingTime', dateIsoString);
  }

  return response;
};

export const getPing = async (code: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${code}/ping`);
  if (response.status === 204) {
    return {
      message: '5분 이상 글을 쓰지 않아 접속이 끊어졌어요.',
      subMessage: '위키 참여하기를 통해 다시 위키를 수정해 주세요.',
    };
  }
  getServerTime();
  const data = await response.json();
  return data;
};
