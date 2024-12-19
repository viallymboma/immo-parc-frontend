import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';
import { User } from '../models';

// Utility to validate credentials and generate a token
export const validateUser = async (phone: string, password: string) => {
  const user = await User.findOne({ phone }).populate(['parent', 'children', 'package']);
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  throw new Error('Invalid credentials');
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

    return await jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }); // Adjust expiration as needed

};

// // Next.js API Route handler
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         if (req.method === 'POST') {
//             const { phone, password } = req.body;

//             if (!phone || !password) {
//                 return res.status(400).json({ error: 'Phone and password are required' });
//             }

//             // Connect to the database
//             await connectToDatabase();

//             // Validate the user
//             const user = await validateUser(phone, password);

//             // Generate JWT
//             const token = loginUser(user);

//             return res.status(200).json({ token, user });
//         } else {
//             return res.status(405).json({ error: 'Method not allowed' });
//         }
//     } catch (error: any) {
//         return res.status(401).json({ error: error.message });
//     }
// }
