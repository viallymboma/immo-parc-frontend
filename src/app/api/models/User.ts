import {
  Document,
  model,
  models,
  Schema,
  Types,
} from 'mongoose';

export interface IUser extends Document {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
    parent?: Types.ObjectId;
    children?: Types.ObjectId[];
    funds?: number;
    selectedTasksCount?: number;
    accountType?: 'internship' | 'regular';
    role?: 'super_admin' | 'regular_user';
    status?: 'active' | 'inactive';
    package?: Types.ObjectId | null;
    internshipExpiry?: Date;
    error?: string;
}

// Define the schema
const UserSchema = new Schema<IUser>(
    {
        username: { type: String, unique: true, required: false },
        email: { type: String, unique: true, required: false },
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        phone: { type: String, default: '0', required: false },
        password: { type: String, required: true },
        parent: { type: Types.ObjectId, ref: 'User' },
        children: { type: [Types.ObjectId], ref: 'User', default: [] },
        funds: { type: Number, default: 0 },
        selectedTasksCount: { type: Number, default: 5 },
        accountType: {
            type: String,
            enum: ['internship', 'regular'],
            default: 'internship',
        },
        role: {
            type: String,
            enum: ['super_admin', 'regular_user'],
            default: 'regular_user',
        },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
        package: { type: Types.ObjectId, ref: 'Package', required: false },
        internshipExpiry: { type: Date },
    },
    {
        timestamps: true, // Add createdAt and updatedAt fields
    }
);

// Export the model
const User = models.User || model<IUser>('User', UserSchema);

export default User;
