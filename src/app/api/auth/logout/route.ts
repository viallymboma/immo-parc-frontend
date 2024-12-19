import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the `jwt` cookie
  response.cookies.set('jwt', '', {
    httpOnly: true, // Ensure the cookie cannot be accessed via JavaScript
    maxAge: 0, // Expire the cookie immediately
    // sameSite: 'strict', // Uncomment if needed
    // secure: true, // Uncomment if your app is served over HTTPS
  });

  return response;
}
