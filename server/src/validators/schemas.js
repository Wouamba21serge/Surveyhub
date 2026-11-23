import { z } from 'zod';

// Zod validates every request body before it reaches the controller.
export const signupSchema = z.object({
  name: z.string().trim().min(2, 'Name must have at least 2 characters').max(80),
  email: z.string().trim().toLowerCase().email('Enter a valid email address').max(160),
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(72)
    .regex(/[A-Za-z]/, 'Password needs at least one letter')
    .regex(/[0-9]/, 'Password needs at least one digit'),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});
