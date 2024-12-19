import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { verifyJWT } from '@/app/lib/jwt';

// import { JWT_SECRET } from '@/config/constants'; // Replace with your JWT secret environment variable

export async function GET(request: NextRequest) {
  try {
    // Extract the token from the cookies
    const token = request.cookies.get('jwt')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token found' }, { status: 401 });
    }

    // Verify the token
    const userInfo = await verifyJWT(token); 
    return NextResponse.json({ message: 'Login successful', userInfo });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
