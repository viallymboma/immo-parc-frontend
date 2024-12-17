import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = !!request.cookies.get('jwt'); // Adjust the cookie name as needed

  const loginUrl = new URL('/auth/signin', request.url);
  const registerUrl = new URL ('/auth/signup', request.url)
  const forgotPasswordUrl = new URL('/forgot-password', request.url); 
  const changePasswordUrl = new URL('/change-password', request.url); 
  const successPageUrl = new URL('/success-page', request.url); 
  const homeUrl = new URL('/backoffice', request.url); // Redirect logged-in users away from login and forgot-password pages

  // If user is on the login or forgot-password page and has a token, redirect to home or dashboard
  if (
    (request.nextUrl.pathname.startsWith('/auth/signin') || 
    request.nextUrl.pathname.startsWith('/auth/signup') || 
    request.nextUrl.pathname.startsWith('/forgot-password') || 
    request.nextUrl.pathname.startsWith('/change-password') || 
    request.nextUrl.pathname.startsWith('/success-page')) && token

  ) {
    return NextResponse.redirect(homeUrl);
  }

  // Allow access to the login and forgot-password pages without a token
  if (
    request.nextUrl.pathname.startsWith('/auth/signin') || 
    request.nextUrl.pathname.startsWith('/auth/signup') || 
    request.nextUrl.pathname.startsWith('/forgot-password') || 
    request.nextUrl.pathname.startsWith('/change-password') || 
    request.nextUrl.pathname.startsWith('/success-page')
  ) {
    return NextResponse.next();
  }

  // No token, redirect to login for other pages
  if (!token) {
    console.log("No token")
    // return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow access to protected pages
  return NextResponse.next();
}


// Match the middleware to specific paths (adjust as necessary)
export const config = {
  // matcher: ['/backoffice/:path*', '/login/auth/:path*', '/pages/:path*'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
