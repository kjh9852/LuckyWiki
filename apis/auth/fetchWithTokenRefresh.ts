import { getTokens } from '@/utils/getTokens';
import { getNewAccessToken } from './getNewAccessToken';
import { CookieValueTypes, setCookie } from 'cookies-next';

interface FetchOptions {
  method: 'GET' | 'POST' | 'PATCH';
  headers: Record<string, string>;
  body?: string;
}

const insertAuthorization = (options: FetchOptions, accessToken: string | CookieValueTypes) => {
  // headers에 accessToken 주입
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return options;
};

export const fetchWithTokenRefresh = async (fetchUrl: string, options: FetchOptions) => {
  const { refreshToken, accessToken } = getTokens();
  const authorizationOptions = insertAuthorization(options, accessToken);

  // accessToken 넣은 options로 fetch 요청
  const response = await fetch(fetchUrl, authorizationOptions);

  if (response.status === 401) {
    // accessToken이 만료된 경우인 401 에러라면 refreshToken으로 accessToken 재발급
    const newAccessToken = await getNewAccessToken(refreshToken);

    if (!newAccessToken) {
      // refreshToken도 만료되었다면 undefined 반환
      return undefined;
    }

    // 쿠키 업데이트
    setCookie('accessToken', newAccessToken);

    // 새 accessToken을 주입한 options
    const newOptions = insertAuthorization(options, newAccessToken);

    // 재발급한 accessToken으로 다시 유저 정보 요청
    const newResponse = await fetch(fetchUrl, newOptions);
    return await newResponse.json();
  }

  // 기존 accessToken으로 문제 없이 요청이 완료될 경우
  return await response.json();
};
