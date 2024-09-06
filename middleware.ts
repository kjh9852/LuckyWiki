import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;
  const loggedInUserPages = ['/mypage', '/wiki/:path'];
  const notLoggedInUserPages = ['/login', '/signup', '/landing'];

  if (loggedInUserPages.includes(pathname) && !accessToken) {
    // 로그인이 필요한 페이지에 왔지만 accessToken이 없다면
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (notLoggedInUserPages.includes(pathname) && accessToken) {
    // 로그인 후에는 들어올 수 없는 페이지에 accessToken이 있다면
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // 이 Middleware가 동작할 경로들
  matcher: ['/login', '/signup', '/landing', '/mypage', '/wiki/:path'],
};
