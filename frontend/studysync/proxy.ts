import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isGuestRoute = pathname === '/' || pathname === '/signin';
  const isProtectedRoute = pathname.startsWith('/home') || pathname.startsWith('/profile');

  if (token && isGuestRoute) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!token && isProtectedRoute) {
    const signinUrl = new URL('/signin', request.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/home/:path*',
    '/profile/:path*',
  ],
};