import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../api/constants';

export async function verifyJWT(token: string): Promise<any> {
  try {
    const secret = JWT_SECRET!;
    const verifiedToken: any = jwt.verify(token, secret);
    if (verifiedToken.exp && (Date.now() >= verifiedToken.exp * 1000)) {
      throw new Error('Token has expired');
    }
    return verifiedToken; 
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}