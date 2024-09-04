import { CookieValueTypes, setCookie } from 'cookies-next';

export const getNewAccessToken = async (refreshToken: CookieValueTypes): Promise<string | undefined> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    return undefined;
  }

  const { accessToken } = await response.json();
  setCookie('accessToken', accessToken);

  return accessToken;
};
