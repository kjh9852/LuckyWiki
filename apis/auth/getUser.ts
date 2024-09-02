interface getUserProps {
  accessToken: string;
  refreshToken: string;
}

interface getUserReturn {
  profile: {
    code: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  teamId: string;
  name: string;
  id: number;
}

export const getUser = async ({ accessToken, refreshToken }: getUserProps): Promise<getUserReturn | undefined> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${refreshToken}` },
    });

    if (!retryResponse.ok) {
      return undefined;
    }

    const retryResult = await retryResponse.json();
    return retryResult;
  }

  const result = await response.json();
  return result;
};
