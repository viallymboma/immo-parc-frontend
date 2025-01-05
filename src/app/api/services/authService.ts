import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { connectToDatabase } from '@/app/lib/mongodb';

import { JWT_SECRET } from '../constants';
import { User } from '../models';
import Package from '../models/Package';

// Utility to validate credentials and generate a token
export const validateUser = async (phone: string, password: string) => {
  const user = await User.findOne({ phone }).populate(['parent', 'package', 'userWallet']);
  
  if (!user) {
    console.log(user, "User with the given phone number does not exist"); 
    // User with the given phone number does not exist
    throw new Error('Numero introuvable dans le system.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log(user, "Incorrect password"); 
    // Password is incorrect
    throw new Error('Mauvais mot de passe.');
  }
  return user;
};

export const loginUser = async (user: any) => {

  await connectToDatabase (); 
  const packageEle = await Package.findById(user.package).exec();

  const payload = {
    _id: user._id.toString(),
    children: user.children || [],
    funds: user.funds || 0,
    accountType: user.accountType || 'regular',
    role: user.role || 'user',
    status: user.status || 'inactive',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    parent: user.parent || null,
    package: packageEle || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    userWallet: user.userWallet,
  };

  return await jwt.sign(payload, JWT_SECRET!, { expiresIn: '20m' }); // Adjust expiration as needed

};


/**
 * Fetches children of a user up to the third generation with necessary population.
 * @param userId - The ID of the user whose children are to be fetched.
 * @returns - The user with children up to the third generation populated.
 */
export const getChildrenUpToThirdGeneration = async (userId: string) => {
  await connectToDatabase(); // Ensure the database connection is established.

  try {
    const userWithChildren = await User.findById(userId)
      .populate([
        {
          path: 'children',
          model: 'User',
          populate: [
            {
              path: 'parent',
              model: 'User',
            },
            {
              path: 'package',
              model: 'Package',
            },
            {
              path: 'userWallet',
              model: 'Wallet',
            },
            {
              path: 'children',
              model: 'User',
              populate: [
                {
                  path: 'parent',
                  model: 'User',
                },
                {
                  path: 'package',
                  model: 'Package',
                },
                {
                  path: 'userWallet',
                  model: 'Wallet',
                },
                {
                  path: 'children',
                  model: 'User',
                  populate: [
                    {
                      path: 'parent',
                      model: 'User',
                    },
                    {
                      path: 'package',
                      model: 'Package',
                    },
                    {
                      path: 'userWallet',
                      model: 'Wallet',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]).populate(['package', 'parent', 'userWallet']);

    if (!userWithChildren) {
      console.log("User not found"); 
      throw new Error('Utilisateur introuvable');
    }

    return userWithChildren;
  } catch (error) {
    console.error('Error fetching children up to the third generation:', error);
    throw new Error('Failed to fetch children. Please try again.');
  }
};