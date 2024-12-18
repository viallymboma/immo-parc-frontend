import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Access the jwt token from cookies
  const token = request.cookies.get('jwt')?.value;

  // URLs for redirection
  const loginUrl = new URL('/auth/signin', request.url);
  const homeUrl = new URL('/backoffice', request.url);

  // Debugging logs
  console.log('Request Path:', request.nextUrl.pathname);
  console.log('Token Present:', !!token);

  // Routes that do not require authentication
  const publicRoutes = [
    '/auth/signin',
    '/auth/signup',
    '/forgot-password',
    '/change-password',
    '/success-page',
  ];

  // Check if the route is public and the user has a token
  if (publicRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (token) {
      console.log('Redirecting to home because user is logged in');
      return NextResponse.redirect(homeUrl);
    }
    console.log('Allowing access to public route');
    return NextResponse.next();
  }

  // If no token is present, redirect to login for protected routes
  if (!token) {
    console.log('No token found, redirecting to login');
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('jwt'); // Clear any invalid or stale cookies
    return response;
  }

  // Allow access to protected routes if token exists
  console.log('Token found, allowing access to protected route');
  return NextResponse.next();
}

// Match middleware to specific routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};




















// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const token = !!request.cookies.get('jwt'); // Adjust the cookie name as needed

//   const loginUrl = new URL('/auth/signin', request.url);
//   const registerUrl = new URL ('/auth/signup', request.url)
//   const forgotPasswordUrl = new URL('/forgot-password', request.url); 
//   const changePasswordUrl = new URL('/change-password', request.url); 
//   const successPageUrl = new URL('/success-page', request.url); 
//   const homeUrl = new URL('/backoffice', request.url); // Redirect logged-in users away from login and forgot-password pages

//   // If user is on the login or forgot-password page and has a token, redirect to home or dashboard
//   if (
//     (request.nextUrl.pathname.startsWith('/auth/signin') || 
//     request.nextUrl.pathname.startsWith('/auth/signup') || 
//     request.nextUrl.pathname.startsWith('/forgot-password') || 
//     request.nextUrl.pathname.startsWith('/change-password') || 
//     request.nextUrl.pathname.startsWith('/success-page')) && token

//   ) {
//     console.log("go to next pages")
//     return NextResponse.redirect(homeUrl);
//   }

//   // Allow access to the login and forgot-password pages without a token
//   if (
//     request.nextUrl.pathname.startsWith('/auth/signin') || 
//     request.nextUrl.pathname.startsWith('/auth/signup') || 
//     request.nextUrl.pathname.startsWith('/forgot-password') || 
//     request.nextUrl.pathname.startsWith('/change-password') || 
//     request.nextUrl.pathname.startsWith('/success-page')
//   ) {
//     return NextResponse.next();
//   }

//   // No token, redirect to login for other pages
//   if (!token) {
//     console.log("No token")
//     // const response = NextResponse.redirect(new URL('/auth/signin', request.url));
//     // response.cookies.delete('jwt');
//     // return response;
//     return NextResponse.redirect(loginUrl);
//   }

//   // Token exists, allow access to protected pages
//   return NextResponse.next();
// }


// // Match the middleware to specific paths (adjust as necessary)
// export const config = {
//   // matcher: ['/backoffice/:path*', '/login/auth/:path*', '/pages/:path*'],
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
