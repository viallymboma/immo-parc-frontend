import { z } from 'zod';

// Zod schema for UpdateUserDto
export const UpdateUserDto = z.object({
  name: z.string().optional(), // Optional string for name
  email: z.string().email().optional(), // Optional string for email, with email format validation
  phone: z.string().optional(), // Optional string for phone, can add further validation if needed
  password: z.string().min(6).optional(), // Optional password with minimum length of 6
  status: z.string().optional(), // Optional string for status
  firstName: z.string().optional(), // Optional string for firstName
  lastName: z.string().optional(), // Optional string for lastName
});
