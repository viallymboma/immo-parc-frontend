import {
  NextRequest,
  NextResponse,
} from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // // Clear the `jwt` cookie
  // response.cookies.set('jwt', '', {
  //   httpOnly: true, // Ensure the cookie cannot be accessed via JavaScript
  //   maxAge: 0, // Expire the cookie immediately
  //   // sameSite: 'strict', // Uncomment if needed
  //   secure: true, // Uncomment if your app is served over HTTPS
  // });
  // Manually set the Set-Cookie header to clear the cookie
  response.headers.set('Set-Cookie', `jwt=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`);

  return response;
}
