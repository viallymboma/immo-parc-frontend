import { z } from 'zod';

// Zod schema for CreateUserDto
export const CreateUserDto = z.object({
  name: z.string().min(1, 'Name is required'), // Ensures name is a non-empty string
  phone: z.string().refine((val) => /^[0-9]{10}$/.test(val), { message: 'Invalid phone number' }), // Custom phone number validation
  password: z.string().min(6, 'Password must be at least 6 characters long'), // Ensures password has at least 6 characters
  status: z.string().optional(), // Optional field
  firstName: z.string().optional(), // Optional field
  lastName: z.string().optional(), // Optional field
});
