import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/app/lib/mongodb';

import { JWT_SECRET } from '../../constants';
import {
  loginUser,
  validateUser,
} from '../../services/authService';

// Login Route
export async function POST(request: Request) {
  try {
    const { phone, password } = await request.json();
    console.log(phone, password, "accessttoken:============")

    if (!phone || !password) {
      return NextResponse.json({ error: 'Phone and password are required' }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Validate the user and generate a token
    const user = await validateUser(phone, password);
    const accessToken = await loginUser(user);

    console.log(accessToken, "accessttoken:============")

    const response = NextResponse.json({ message: 'Login successful', user });
    
    // Set the JWT in an HTTP-only cookie in production
    // response.cookies.set('jwt', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 3600, // 1 hour
    //   sameSite: 'none',
    // });

    // Set the cookie with the token on dev env
    response.cookies.set('jwt', accessToken, {
      httpOnly: true, // Ensures the cookie is accessible only by the web server
      // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      // secure: true,
      // maxAge: 24 * 60 * 60 * 1000, // Set expiration for the cookie (1 day in ms)
      maxAge: 3600000, // Cookie expiration time (e.g., 1 hour)
      // sameSite: 'strict', // Restrict cookie usage to same site
    });

    return response;
  } catch (error: any) {
    // return NextResponse.json({ error: error.message }, { status: 401 });
    // Handle errors from validateUser function
    const errorMessage = error.message;

    if (errorMessage === 'Numero introuvable dans le system.') {
      return NextResponse.json({ error: 'Numero introuvable dans le system.' }, { status: 400 });
    }

    if (errorMessage === 'Incorrect password.') {
      return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 400 });
    }

    // Generic error handling
    return NextResponse.json({ error: 'Une erreur inattendu est survenue.' }, { status: 500 });
  }
}

// Get Profile (protected route)
export async function GET(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('jwt=')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ message: 'Vous etes connecté', user });
  } catch (error) {
    return NextResponse.json({ error: "Session Terminée. Veillez vous connecter a nouveau s'il vous plait" }, { status: 401 });
  }
}

// Verify Token
export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const validToken = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ valid: true, message: 'Session active. Bienvenu', user: validToken });
  } catch (error) {
    return NextResponse.json({ error: "Session Terminée. Veillez vous connecter a nouveau s'il vous plait" }, { status: 401 });
  }
}

// // Logout
// export async function DELETE(respon: Response) {
//     const response = NextResponse.json({ message: 'Logged out successfully' });
//     // response.cookies.delete('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'none' });
//     // response.headers.ge('jwt', { 
//     //     httpOnly: true, s
//     //     ecure: process.env.NODE_ENV === 'production', 
//     //     sameSite: 'none' 
//     // });
//     return response;
// }

































// import {
//   JWT_SECRET,
// } from '@/config/constants'; // Store your JWT secret in an environment variable
// import Users from '@/models/Users'; // Replace with the path to your User model
// import {
//   connectToDatabase,
// } from '@/utils/database'; // Database connection utility

// // Helper to validate a user's credentials
// async function validateUser(phone: string, password: string) {
//   const user = await User.findOne({ phone }).populate(['parent', 'children', 'package']);
//   if (user && (await bcrypt.compare(password, user.password))) {
//     return user;
//   }
//   throw new Error('Invalid credentials');
// }

// // Helper to create a JWT
// function createToken(user: any) {
//   const payload = {
//     children: user.children || [],
//     funds: user.funds || 0,
//     accountType: user.accountType || 'regular',
//     role: user.role || 'user',
//     status: user.status || 'inactive',
//     firstName: user.firstName || '',
//     lastName: user.lastName || '',
//     _id: user._id.toString(),
//     email: user.email || '',
//     phone: user.phone || '',
//     parent: user.parent || null,
//     package: user.package || null,
//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt,
//   };

//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
// }