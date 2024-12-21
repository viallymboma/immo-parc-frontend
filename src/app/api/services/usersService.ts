// services/usersService.ts
import bcrypt from 'bcryptjs';

import { connectToDatabase } from '@/app/lib/mongodb';

import { INITIAL_SELECTED_TASKCOUNT } from '../constants';
import { Packages } from '../models';
import User, { IUser } from '../models/User';

// Ensure mongoose connection is made
// async function connectToDatabase() {
//   if (mongoose.connections[0].readyState) {
//     return;
//   }
//   await mongoose.connect(process.env.MONGODB_URI!);
// }

export const usersService = {
  async createUser(
    phone: string,
    password: string,
    packageId?: string,
    parentId?: string,
    email?: string,
    firstName?: string,
    lastName?: string
  ): Promise<IUser | any> {
    console.log(phone, password, packageId, parentId, email, firstName, lastName, "good")
    await connectToDatabase();

    // Check if Ce numero existe deja dans le system
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return { error: 'Ce numero existe deja dans le system' };
    }

    const parent: any = parentId ? await this.findByPhone(parentId) : null;
    if (!parent) throw new Error('Parent not found');

    let pkg = null;
    if (packageId) {
      pkg = await Packages.findById(packageId);
      if (!pkg) throw new Error('Package not found');
    } else {
      pkg = await Packages.findOne().sort({ level: 1 });
      if (!pkg) throw new Error('No packages available');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword, "hased pass")

    const user = new User({
      username: `user_${Date.now()}`,
      email,
      phone,
      password: hashedPassword,
      status: 'active',
      accountType: 'internship',
      firstName,
      lastName,
      selectedTasksCount: INITIAL_SELECTED_TASKCOUNT,
      parent: parent ? parent?._id.toString() : null,
      package: pkg ? pkg._id : null,
      internshipExpiry: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      children: []
    });

    console.log(user, "user thing")

    await user.save();

    if (parent) {
      console.log("has a parent")
      parent?.children.push(user._id);
      await parent.save();
    }

    return user;
  },

  async createSuperAdmin(phone: string, password: string, email?: string): Promise<IUser> {
    await connectToDatabase();
    const existingAdmin = await User.findOne({ role: 'super_admin' });
    if (existingAdmin) throw new Error('Super admin already exists');

    const packages = await Packages.find().sort({ level: -1 });
    if (!packages || packages.length === 0) throw new Error('No packages found');
    const highestPackage = packages[0];

    const hashedPassword = await bcrypt.hash(password, 10);
    const superAdmin = new User({
      email,
      password: hashedPassword,
      phone,
      status: 'active',
      accountType: 'regular',
      role: 'super_admin',
      parentId: null,
      children: [],
      package: highestPackage._id
    });

    return superAdmin.save();
  },

  async updateStatus(userId: string, status: 'internship' | 'regular'): Promise<IUser> {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    user.accountType = status;
    return user.save();
  },

  async findAllUsers(): Promise<IUser[]> {
    await connectToDatabase();
    return User.find();
  },

  async findByPhone(phone: string): Promise<IUser | null> {
    await connectToDatabase();
    return User.findOne({ phone }).populate('parent').populate('children').populate('package');
  },

  async findByEmail(email: string): Promise<IUser | null> {
    await connectToDatabase();
    return User.findOne({ email });
  },

  async findUserById(userId: string): Promise<IUser | null> {
    await connectToDatabase();
    return User.findById(userId);
  },

  async deleteUser(userId: string): Promise<void> {
    await connectToDatabase();
    await User.findByIdAndDelete(userId);
  }
};
