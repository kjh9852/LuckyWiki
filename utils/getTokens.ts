import { CookieValueTypes, getCookie } from 'cookies-next';

export const getTokens = (): { accessToken: CookieValueTypes; refreshToken: CookieValueTypes } => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  return {
    accessToken,
    refreshToken,
  };
};
