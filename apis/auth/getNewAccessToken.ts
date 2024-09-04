export const getNewAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  const newAccessToken = await response.json();
  return newAccessToken;
};
