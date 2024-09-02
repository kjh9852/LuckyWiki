export const getTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  return {
    accessToken,
    refreshToken,
  };
};
