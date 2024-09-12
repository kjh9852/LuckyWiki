import { getTokens } from '@/utils/getTokens';

export const postPing = async (code: string, answer: string) => {
  const tokens = getTokens();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${code}/ping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.accessToken}`,
    },
    body: JSON.stringify({ securityAnswer: answer }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '에러가 발생했습니다.');
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

  const data = await response.json();
  return data;
};
