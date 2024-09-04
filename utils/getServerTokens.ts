import { CookieValueTypes, getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

export const getServerTokens = (
  req: NextRequest,
): { accessToken: CookieValueTypes; refreshToken: CookieValueTypes } => {
  const res = NextResponse.next();
  const accessToken = getCookie('accessToken', { res, req });
  const refreshToken = getCookie('refreshToken', { res, req });

  return {
    accessToken,
    refreshToken,
  };
};
