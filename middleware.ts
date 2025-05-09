import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;
  
  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/accountDetails', '/market'];
  
  // Check if the requested path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // If no token is present, redirect to login
    if (!token) {
      const response = NextResponse.redirect(new URL('/signIn', request.url));
      response.cookies.set('redirectTo', pathname, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 300 // 5 minutes
      });
      return response;
    }
  }
  
  // If user is logged in and tries to access login/signup pages
  if ((pathname.startsWith('/signIn') || pathname.startsWith('/signUp')) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/accountDetails/:path*',
    '/market/:path*',
    '/signIn',
    '/signUp'
  ]
};
