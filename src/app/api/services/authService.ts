import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';
import { User } from '../models';

// Utility to validate credentials and generate a token
export const validateUser = async (phone: string, password: string) => {
  const user = await User.findOne({ phone }).populate(['parent', 'children', 'package']);
  // if (user && (await bcrypt.compare(password, user.password))) {
  //   return user;
  // }
  // throw new Error('Invalid credentials');
  if (!user) {
    // User with the given phone number does not exist
    throw new Error('Numero introuvable dans le system.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    // Password is incorrect
    throw new Error('Incorrect password.');
  }
  return user;
};

export const loginUser = async (user: any) => {

    const payload = {
        children: user.children || [],
        funds: user.funds || 0,
        accountType: user.accountType || 'regular',
        role: user.role || 'user',
        status: user.status || 'inactive',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        _id: user._id.toString(),
        email: user.email || '',
        phone: user.phone || '',
        parent: user.parent || null,
        package: user.package || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };

    return await jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' }); // Adjust expiration as needed

};
