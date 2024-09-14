import { getTokens } from '@/utils/getTokens';
import { getNewAccessToken } from './getNewAccessToken';
import { CookieValueTypes, deleteCookie, setCookie } from 'cookies-next';

interface FetchOptions {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: BodyInit;
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
  const { accessToken, refreshToken } = getTokens();

  if (!accessToken) {
    // accessToken이 없는 경우 fetch 요청 없이 undefined 반환
    return undefined;
  }

  const authorizationOptions = insertAuthorization(options, accessToken);

  // accessToken 넣은 options로 fetch 요청
  const response = await fetch(fetchUrl, authorizationOptions);

  if (!response.ok) {
    if (response.status !== 401) {
      return undefined;
    }
    // accessToken이 만료된 경우인 401 에러라면 refreshToken으로 accessToken 재발급
    const newAccessToken = await getNewAccessToken(refreshToken);

    if (!newAccessToken) {
      // refreshToken도 만료되었다면, 쿠키 전체 삭제하고 undefined 반환
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return undefined;
    }

    // 쿠키 업데이트
    setCookie('accessToken', newAccessToken);

    // 새 accessToken을 주입한 options
    const newOptions = insertAuthorization(options, newAccessToken);

    // 재발급한 accessToken으로 다시 유저 정보 요청
    const newResponse = await fetch(fetchUrl, newOptions);

    if (!newResponse.ok) {
      // 재발급 후에도 실패한다면 undefined 반환
      return undefined;
    }

    return await newResponse.json();
  }

  // 기존 accessToken으로 문제 없이 요청이 완료될 경우
  return await response.json();
};
