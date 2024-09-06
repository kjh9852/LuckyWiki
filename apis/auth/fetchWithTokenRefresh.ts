import { getTokens } from '@/utils/getTokens';
import { getNewAccessToken } from './getNewAccessToken';

interface fetchWithTokenRefreshParams {
  fetchUrl: string;
  options: {
    method: 'GET' | 'POST' | 'PATCH';
    headers: Record<string, string>;
    body: string;
  };
}

export const fetchWithTokenRefresh = async ({ fetchUrl, options }: fetchWithTokenRefreshParams) => {
  const response = await fetch(fetchUrl, options);

  if (response.status === 401) {
    // accessToken이 만료된 경우인 401 에러라면 refreshToken으로 accessToken 재발급
    const { refreshToken } = getTokens();
    const newAccessToken = await getNewAccessToken(refreshToken);

    if (!newAccessToken) {
      // refreshToken 도 만료되었다면 undefined 반환
      return undefined;
    }

    // 새 토큰으로 헤더 업데이트
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${newAccessToken}`,
    };

    // 재발급한 accessToken으로 다시 유저 정보 요청
    const newResponse = await fetch(fetchUrl, options);
    return await newResponse.json();
  }

  // 기존 accessToken으로 문제 없이 요청이 완료될 경우
  return await response.json();
};
