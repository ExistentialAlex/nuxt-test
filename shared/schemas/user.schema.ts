import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  jobTitle: z
    .string()
    .min(1, 'Job title is required')
    .max(100, 'Job title must be less than 100 characters'),
});
export type UserSchema = z.infer<typeof userSchema>;

export const createUserSchema = userSchema.omit({ id: true });
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = userSchema.partial().omit({ id: true });
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
