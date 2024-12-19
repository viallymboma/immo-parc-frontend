// import jwt from 'jsonwebtoken';

// import { JWT_SECRET } from '../api/constants';

// export const verifyJWT = (token: string) => jwt.verify(token, JWT_SECRET);

// utils/jwt.ts
import jwt from 'jsonwebtoken';

export async function verifyJWT(token: string): Promise<any> {
  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}